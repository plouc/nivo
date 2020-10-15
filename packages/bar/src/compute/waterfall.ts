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

var getIndexedScale = function getIndexedScale(data, getIndex, range, padding) {
    return scaleBand().rangeRound(range).domain(data.map(getIndex)).padding(padding);
};

type WaterfallDatum<RawDatum extends Record<string, number> & { columnType?: string }> = [number, number] & { data?: RawDatum };
type WaterfallData<RawDatum extends Record<string, number> & { columnType?: string }> = WaterfallDatum<RawDatum>[] & { key?: string };
/**
 * Set up data for waterfall bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Array.<String>} keys
 * @returns {Array.Array}
 */
export const generateWaterfallData = <RawDatum extends Record<string, number> & { columnType?: string }>(data: RawDatum[], keys: string[]) => {
    let accumulativeVal = 0;
    let [key] = keys;
    let waterfallData: WaterfallData<RawDatum> = data.map(d => {
        let result: WaterfallDatum<RawDatum>;
        if (d.columnType === "total") {
            accumulativeVal = d[key]
            result = [0, accumulativeVal];
        } else
            result = [accumulativeVal, accumulativeVal += d[key]];
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
export const getWaterfallScale = <RawDatum extends object>(data: RawDatum[], _minValue: number | 'auto', _maxValue: number | 'auto', range: number[]) => {
    const allValues = flattenDepth(data, 2);
    let minValue = _minValue;
    if (minValue === 'auto') {
        minValue = min(allValues);
    }
    let maxValue = _maxValue;
    if (maxValue === 'auto') {
        maxValue = max(allValues);
    }

    return scaleLinear().rangeRound(range).domain([minValue, maxValue]);
}

interface WaterfallOptions<RawDatum extends Record<string, number> & { columnType?: string }> {
    layout: 'vertical' | 'horizontal'
    data: RawDatum[]
    keys: string[]
    getIndex: (d: RawDatum) => string | number
    minValue: number | 'auto'
    maxValue: number | 'auto'
    reverse: boolean
    width: number
    height: number
    getColor: (d: BarData) => string
    padding?: number
    innerPadding?: number
}

interface WaterfallResult {
    xScale: (d: string | number) => number
    yScale: (d: number) => number
    bars: Bar[]
}

interface BarData {
    id: string
    value: number
    index: number
    indexValue: string | number
    data: object
    line?: {
        x1: number
        x2: number
        y1: number
        y2: number
    }
}

interface Bar {
    key: string
    x: number
    y: number
    width: number
    height: number
    color: string
    data: BarData
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
export const generateVerticalWaterfallBars = <RawDatum extends Record<string, number> & { columnType?: string }>({
    data,
    keys,
    getIndex,
    minValue,
    maxValue,
    reverse,
    width,
    height,
    getColor,
    padding = 0,
}: WaterfallOptions<RawDatum>): WaterfallResult => {
    const key = keys[0]
    const waterfallData = generateWaterfallData(data, keys)

    const xScale = getIndexedScale(data, getIndex, [0, width], padding)
    const yRange = reverse ? [0, height] : [height, 0]
    const yScale = getWaterfallScale(waterfallData, minValue, maxValue, yRange)

    const bars: Bar[] = []
    const barWidth = xScale.bandwidth()

    let getY = (d: [number, number]) => yScale(max(d))
    let getHeight = (d: [number, number], y: number) => yScale(min(d)) - y;

    if (reverse) {
        getY = d => yScale(min(d))
        getHeight = (d, y) => yScale(max(d)) - y;
    }

    range(xScale.domain().length).forEach((index: number) => {
        const x = xScale(getIndex(data[index]));
        const y = getY(waterfallData[index]);
        const barHeight = getHeight(waterfallData[index], y);

        if (barWidth > 0) {
            const barData: BarData = {
                id: key,
                value: data[index][key],
                index: index,
                indexValue: getIndex(data[index]),
                data: data[index]
            };
            if (data[index + 1]) {
                barData.line = {
                    x1: x + barWidth,
                    x2: xScale(getIndex(data[index + 1])),
                    y1: data[index][key] > 0 ? y : y + barHeight,
                    y2: data[index + 1].columnType === 'relative' ? (data[index][key] > 0 ? y : y + barHeight) : getY(waterfallData[index + 1])
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
            });
        }
    });

    return { xScale, yScale, bars }
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
export const generateHorizontalWaterfallBars = <RawDatum extends Record<string, number> & { columnType?: string | undefined; }>({ data,
    getIndex,
    keys,
    minValue,
    maxValue,
    reverse,
    width,
    height,
    getColor,
    padding = 0,
}: WaterfallOptions<RawDatum>): WaterfallResult => {
    const key = keys[0]
    const waterfallData = generateWaterfallData(data, keys)

    const xRange = reverse ? [width, 0] : [0, width]
    const xScale = getWaterfallScale(waterfallData, minValue, maxValue, xRange)
    const yScale = getIndexedScale(data, getIndex, [height, 0], padding)

    const bars: Bar[] = []
    const barHeight = yScale.bandwidth()

    let getX = (d: [number, number]) => xScale(min(d))
    let getWidth = (d: [number, number], x: number) => xScale(max(d)) - x;

    if (reverse) {
        getX = d => xScale(max(d))
        getWidth = (d, x) => xScale(min(d)) - x;
    }

    range(yScale.domain().length).forEach((index: number) => {
        const y = yScale(getIndex(data[index]));
        const x = getX(waterfallData[index]);
        const barWidth = getWidth(waterfallData[index], x);

        if (barHeight > 0) {
            const barData = {
                id: key,
                value: data[index][key],
                index: index,
                indexValue: getIndex(data[index]),
                data: data[index],
                line: { x1: 0, x2: 0, y1: 0, y2: 0 }
            };
            if (data[index + 1]) {
                barData.line = {
                    x1: data[index][key] >= 0 ? x + barWidth : x,
                    x2: data[index + 1].columnType === 'relative' ? (data[index][key] >= 0 ? x + barWidth : x) : getX(waterfallData[index + 1]) + getWidth(waterfallData[index + 1], getX(waterfallData[index + 1])),
                    y1: y,
                    y2: yScale(getIndex(data[index + 1])) + barHeight
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
            });
        }
    });
    return { xScale, yScale, bars }
}

/**
 * Generates x/y scales & bars for waterfall bar chart.
 *
 * @param {Object} options
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export const generateWaterfallBars = <RawDatum extends Record<string, number> & { columnType?: string | undefined; }>(options: WaterfallOptions<RawDatum>): WaterfallResult =>
    options.layout === 'vertical'
        ? generateVerticalWaterfallBars(options)
        : generateHorizontalWaterfallBars(options)