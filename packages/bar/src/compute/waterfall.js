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
/**
 * Set up data for waterfall bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Array.<String>} keys
 * @returns {Array.Array}
 */
export const generateWaterfallData = (data, keys) => {
    let accumulativeVal = 0;
    let [key] = keys;
    let waterfallData = data.map(d => {
        let result;
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
export const getWaterfallScale = (data, _minValue, _maxValue, range) => {
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
export const generateVerticalWaterfallBars = ({
    data,
    getIndex,
    keys,
    minValue,
    maxValue,
    reverse,
    width,
    height,
    getColor,
    padding = 0,
}) => {
    const key = keys[0]
    const waterfallData = generateWaterfallData(data, keys)

    const xScale = getIndexedScale(data, getIndex, [0, width], padding)
    const yRange = reverse ? [0, height] : [height, 0]
    const yScale = getWaterfallScale(waterfallData, minValue, maxValue, yRange)

    const bars = []
    const barWidth = xScale.bandwidth()

    let getY = d => yScale(max(d))
    let getHeight = (d, y) => yScale(min(d)) - y;

    if (reverse) {
        getY = d => yScale(min(d))
        getHeight = (d, y) => yScale(max(d)) - y;
    }

    range(xScale.domain().length).forEach(index => {
        const x = xScale(getIndex(data[index]));
        const y = getY(waterfallData[index]);
        const barHeight = getHeight(waterfallData[index], y);

        if (barWidth > 0) {
            const barData = {
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
                key: "".concat(key, ".").concat(barData.indexValue),
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
export const generateHorizontalWaterfallBars = ({data,
    getIndex,
    keys,
    minValue,
    maxValue,
    reverse,
    width,
    height,
    getColor,
    padding = 0,
}) => {
    const key = keys[0]
    const waterfallData = generateWaterfallData(data, keys)

    const xRange = reverse ? [width, 0] : [0, width]
    const xScale = getWaterfallScale(waterfallData, minValue, maxValue, xRange)
    const yScale = getIndexedScale(data, getIndex, [height, 0], padding)

    const bars = []
    const barHeight = yScale.bandwidth()

    let getX = d => xScale(min(d))
    let getWidth = (d, x) => xScale(max(d)) - x;

    if (reverse) {
        getX = d => xScale(max(d))
        getWidth = (d, x) => xScale(min(d)) - x;
    }

    range(yScale.domain().length).forEach(index => {
        const y = yScale(getIndex(data[index]));
        const x = getX(waterfallData[index]);
        const barWidth = getWidth(waterfallData[index], x);
        
        if (barHeight > 0) {
            const barData = {
                id: key,
                value: data[index][key],
                index: index,
                indexValue: getIndex(data[index]),
                data: data[index]
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
                key: "".concat(key, ".").concat(barData.indexValue),
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
export const generateWaterfallBars = options =>
    options.layout === 'vertical'
        ? generateVerticalWaterfallBars(options)
        : generateHorizontalWaterfallBars(options)