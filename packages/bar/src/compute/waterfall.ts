/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import min from 'lodash/min'
import max from 'lodash/max'
import range from 'lodash/range'
import flattenDepth from 'lodash/flattenDepth'
import { scaleBand, scaleLinear } from 'd3-scale';
import { BarDatum, BarSvgProps, ComputedBarDatum, ComputedBarDatumWithValue, ComputedDatum } from '../types'
import { OrdinalColorScale } from '@bitbloom/nivo-colors';
import { AnyScale } from '@bitbloom/nivo-scales';

function getIndexedScale<RawDatum>(data: RawDatum[], getIndex: (d: RawDatum) => string, range: [number, number], padding: number) {
    return scaleBand().rangeRound(range).domain(data.map(getIndex)).padding(padding);
};

type WaterfallRawDatum = BarDatum & { columnType?: string };
type WaterfallDatum<RawDatum extends WaterfallRawDatum> = [number, number] & { data?: RawDatum };
type WaterfallData<RawDatum extends WaterfallRawDatum> = WaterfallDatum<RawDatum>[] & { key?: string };
/**
 * Set up data for waterfall bar chart.
 *
 * @param {Array.<Object>} data
 * @param key
 * @returns {Array.Array}
 */
export const generateWaterfallData = <RawDatum extends WaterfallRawDatum>(data: RawDatum[], key: string) => {
    let accumulativeVal = 0;
    let waterfallData: WaterfallData<RawDatum> = data.map(d => {
        let result: WaterfallDatum<RawDatum>;
        if (d.columnType === "total") {
            accumulativeVal = d[key] as number
            result = [0, accumulativeVal];
        } else
            result = [accumulativeVal, accumulativeVal += d[key] as number];
        result.data = d;
        return result;
    });
    waterfallData.key = key;
    return waterfallData;
}

/**
 * Generates scale for waterfall bar chart.
 *
 * @param {Array.<Object>} data
 * @param {number|string}  _minValue
 * @param {number|string}  _maxValue
 * @param {Array.<number>} range
 * @returns {Function}
 */
export const getWaterfallScale = (data: [number, number][], _minValue: number | 'auto', _maxValue: number | 'auto', range: number[]) => {
    const allValues = flattenDepth(data, 2);
    const minValue = _minValue === 'auto' ? min(allValues) || 0 : _minValue;
    const maxValue = _maxValue === 'auto' ? max(allValues) || 0 : _maxValue;

    return scaleLinear().rangeRound(range).domain([minValue, maxValue]);
}

interface WaterfallSvgProps<RawDatum extends WaterfallRawDatum> extends
    Required<Pick<BarSvgProps<RawDatum>, 'keys' | 'data' | 'minValue' | 'maxValue' | 'reverse' | 'width' | 'height' | 'padding'>> {
    layout: 'vertical' | 'horizontal'
    formatValue: (value: number) => string
    getIndex: (d: RawDatum) => string
    getColor: OrdinalColorScale<ComputedDatum<RawDatum>>
}

interface WaterfallResult<RawDatum> {
    xScale: AnyScale
    yScale: AnyScale
    bars: ComputedBarDatum<RawDatum>[]
}


/**
 * Generates x/y scales & bars for vertical waterfall bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Function}       getIndex
 * @param {Array.<string>} keys
 * @param {number}         minValue
 * @param {number}         maxValue
 * @param {boolean}        reverse
 * @param {number}         width
 * @param {number}         height
 * @param {Function}       getColor
 * @param {number}         [padding=0]
 * @param {number}         [innerPadding=0]
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export const generateVerticalWaterfallBars = <RawDatum extends WaterfallRawDatum>({
    data,
    keys: [key],
    getIndex,
    minValue,
    maxValue,
    reverse,
    width,
    height,
    getColor,
    padding = 0,
}: WaterfallSvgProps<RawDatum>): WaterfallResult<RawDatum> => {
    const waterfallData = generateWaterfallData(data, key)

    const xScale = getIndexedScale(data, getIndex, [0, width], padding)
    const yRange = reverse ? [0, height] : [height, 0]
    const yScale = getWaterfallScale(waterfallData, minValue, maxValue, yRange)

    const bars: ComputedBarDatumWithValue<RawDatum>[] = []
    const barWidth = xScale.bandwidth()

    let getY = (d: [number, number]) => yScale(max(d) || 0)
    let getHeight = (d: [number, number], y: number) => yScale(min(d) || 0) - y;

    if (reverse) {
        getY = d => yScale(min(d) || 0)
        getHeight = (d, y) => yScale(max(d) || 0) - y;
    }

    range(xScale.domain().length).forEach((index: number) => {
        const x = xScale(getIndex(data[index])) || 0;
        const y = getY(waterfallData[index]);
        const barHeight = getHeight(waterfallData[index], y);

        if (barWidth > 0) {
            const barData: ComputedDatum<RawDatum> = {
                id: key,
                value: data[index][key] as number,
                index: index,
                indexValue: getIndex(data[index]),
                formattedValue: `${data[index][key]}`,
                data: { ...data[index], columnType: undefined } as any, // todo: fix this
                hidden: false
            };
            if (data[index + 1]) {
                barData.line = {
                    x1: x + barWidth,
                    x2: (data[index + 1][key] === 0 ? barWidth : 0) + (xScale(getIndex(data[index + 1]) || '') || 0),
                    y1: data[index][key] as number > 0 ? y : y + barHeight,
                    y2: data[index + 1].columnType === 'relative' ? (data[index][key] as number > 0 ? y : y + barHeight) : getY(waterfallData[index + 1])
                }
            }
            bars.push({
                key: "".concat(key, ".").concat(`${barData.indexValue}`),
                data: barData,
                x: x,
                y: y,
                width: barWidth,
                height: barHeight,
                color: getColor(barData)
            } as any);
        }
    });

    return { xScale: xScale as any, yScale: yScale as any, bars }
}

/**
 * Generates x/y scales & bars for horizontal waterfall bar chart.
 * Code is from horizontalStackedBars
 * @param {Array.<Object>} data
 * @param {Function}       getIndex
 * @param {Array.<string>} keys
 * @param {number}         minValue
 * @param {number}         maxValue
 * @param {boolean}        reverse
 * @param {number}         width
 * @param {number}         height
 * @param {Function}       getColor
 * @param {number}         [padding=0]
 * @param {number}         [innerPadding=0]
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export const generateHorizontalWaterfallBars = <RawDatum extends WaterfallRawDatum>({ data,
    getIndex,
    keys: [key],
    minValue,
    maxValue,
    reverse,
    width,
    height,
    getColor,
    formatValue,
    padding = 0,
}: WaterfallSvgProps<RawDatum>): WaterfallResult<RawDatum> => {
    const waterfallData = generateWaterfallData(data, key)

    const xRange = reverse ? [width, 0] : [0, width]
    const xScale = getWaterfallScale(waterfallData, minValue, maxValue, xRange)
    const yScale = getIndexedScale(data, getIndex, [height, 0], padding)

    const bars: ComputedBarDatumWithValue<RawDatum>[] = []
    const barHeight = yScale.bandwidth()

    let getX = (d: [number, number]) => xScale(min(d) || 0)
    let getWidth = (d: [number, number], x: number) => xScale(max(d) || 0) - x;

    if (reverse) {
        getX = d => xScale(max(d) || 0)
        getWidth = (d, x) => xScale(min(d) || 0) - x;
    }

    range(yScale.domain().length).forEach((index: number) => {
        const y = yScale(getIndex(data[index])) || 0;
        const x = getX(waterfallData[index]);
        const barWidth = getWidth(waterfallData[index], x);

        if (barHeight > 0) {
            const value = data[index][key] as number;
            const barData: ComputedDatum<RawDatum> = {
                id: key,
                value: data[index][key] as number,
                formattedValue: formatValue(value),
                hidden: false,
                index,
                indexValue: getIndex(data[index]),
                data: { ...data[index], columnType: undefined } as any, // todo: fix this
                line: { x1: 0, x2: 0, y1: 0, y2: 0 }
            };
            if (data[index + 1]) {
                barData.line = {
                    x1: data[index][key] || 0 >= 0 ? x + barWidth : x,
                    x2: data[index + 1].columnType === 'relative' ? (data[index][key] || 0 >= 0 ? x + barWidth : x) : getX(waterfallData[index + 1]) + getWidth(waterfallData[index + 1], getX(waterfallData[index + 1])),
                    y1: y,
                    y2: (data[index + 1][key] === 0 ? 0 : barHeight) + (yScale(getIndex(data[index + 1])) || 0)
                }
            }
            bars.push({
                key: "".concat(key, ".").concat(`${barData.indexValue}`),
                data: { ...barData.data, value: barData.data.value! },
                x: x,
                y: y!,
                width: barWidth,
                height: barHeight,
                color: getColor(barData)
            } as any);
        }
    });
    return { xScale: xScale as any, yScale: yScale as any, bars }
}

/**
 * Generates x/y scales & bars for waterfall bar chart.
 *
 * @param {Object} options
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export const generateWaterfallBars = <RawDatum extends BarDatum>(options: WaterfallSvgProps<RawDatum>): WaterfallResult<RawDatum> =>
    options.layout === 'vertical'
        ? generateVerticalWaterfallBars(options)
        : generateHorizontalWaterfallBars(options)