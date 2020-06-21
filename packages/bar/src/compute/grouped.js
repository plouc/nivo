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
import { scaleLinear } from 'd3-scale'
import { getIndexedScale } from './common'

/**
 * Generates scale for grouped bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Array.<string>} keys
 * @param {number}         _minValue
 * @param {number|string}  _maxValue
 * @param {Array.<number>} range
 * @returns {Function}
 */
export const getGroupedScale = (data, keys, _minValue, _maxValue, range) => {
    const allValues = data.reduce((acc, entry) => [...acc, ...keys.map(k => entry[k])], [])

    let maxValue = _maxValue
    if (maxValue === 'auto') {
        maxValue = max(allValues)
    }

    let minValue = _minValue
    if (minValue === 'auto') {
        minValue = min(allValues)
        if (minValue > 0) minValue = 0
    }

    return scaleLinear().rangeRound(range).domain([minValue, maxValue])
}

/**
 * Generates x/y scales & bars for vertical grouped bar chart.
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
export const generateVerticalGroupedBars = ({
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
    innerPadding = 0,
}) => {
    const xScale = getIndexedScale(data, getIndex, [0, width], padding)
    const yRange = reverse ? [0, height] : [height, 0]
    const yScale = getGroupedScale(data, keys, minValue, maxValue, yRange)

    const barWidth = (xScale.bandwidth() - innerPadding * (keys.length - 1)) / keys.length
    const yRef = yScale(0)

    let getY = d => (d > 0 ? yScale(d) : yRef)
    let getHeight = (d, y) => (d > 0 ? yRef - y : yScale(d) - yRef)
    if (reverse) {
        getY = d => (d < 0 ? yScale(d) : yRef)
        getHeight = (d, y) => (d < 0 ? yRef - y : yScale(d) - yRef)
    }

    const bars = []
    if (barWidth > 0) {
        keys.forEach((key, i) => {
            range(xScale.domain().length).forEach(index => {
                const x = xScale(getIndex(data[index])) + barWidth * i + innerPadding * i
                const y = getY(data[index][key])
                const barHeight = getHeight(data[index][key], y)

                if (barWidth > 0 && barHeight > 0) {
                    const barData = {
                        id: key,
                        value: data[index][key],
                        index,
                        indexValue: getIndex(data[index]),
                        data: data[index],
                    }

                    bars.push({
                        key: `${key}.${barData.indexValue}`,
                        data: barData,
                        x,
                        y,
                        width: barWidth,
                        height: barHeight,
                        color: getColor(barData),
                    })
                }
            })
        })
    }

    return { xScale, yScale, bars }
}

/**
 * Generates x/y scales & bars for horizontal grouped bar chart.
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
export const generateHorizontalGroupedBars = ({
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
    innerPadding = 0,
}) => {
    const xRange = reverse ? [width, 0] : [0, width]
    const xScale = getGroupedScale(data, keys, minValue, maxValue, xRange)
    const yScale = getIndexedScale(data, getIndex, [height, 0], padding)

    const barHeight = (yScale.bandwidth() - innerPadding * (keys.length - 1)) / keys.length
    const xRef = xScale(0)

    let getX = d => (d > 0 ? xRef : xScale(d))
    let getWidth = (d, x) => (d > 0 ? xScale(d) - xRef : xRef - x)
    if (reverse) {
        getX = d => (d < 0 ? xRef : xScale(d))
        getWidth = (d, x) => (d < 0 ? xScale(d) - xRef : xRef - x)
    }

    const bars = []
    if (barHeight > 0) {
        keys.forEach((key, i) => {
            range(yScale.domain().length).forEach(index => {
                const x = getX(data[index][key])
                const y = yScale(getIndex(data[index])) + barHeight * i + innerPadding * i
                const barWidth = getWidth(data[index][key], x)

                if (barWidth > 0) {
                    const barData = {
                        id: key,
                        value: data[index][key],
                        index,
                        indexValue: getIndex(data[index]),
                        data: data[index],
                    }

                    bars.push({
                        key: `${key}.${barData.indexValue}`,
                        data: barData,
                        x,
                        y,
                        width: barWidth,
                        height: barHeight,
                        color: getColor(barData),
                    })
                }
            })
        })
    }

    return { xScale, yScale, bars }
}

/**
 * Generates x/y scales & bars for grouped bar chart.
 *
 * @param {Object} options
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export const generateGroupedBars = options =>
    options.layout === 'vertical'
        ? generateVerticalGroupedBars(options)
        : generateHorizontalGroupedBars(options)
