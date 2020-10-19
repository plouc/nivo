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
import flattenDepth from 'lodash/flattenDepth'
import { scaleLinear } from 'd3-scale'
import { stack, stackOffsetDiverging } from 'd3-shape'
import { getIndexedScale } from './common'

/**
 * Generates scale for stacked bar chart.
 *
 * @param {Array.<Object>} data
 * @param {number|string}  _minValue
 * @param {number|string}  _maxValue
 * @param {Array.<number>} range
 * @returns {Function}
 */
export const getStackedScale = (data, _minValue, _maxValue, range) => {
    const allValues = flattenDepth(data, 2)

    let minValue = _minValue
    if (minValue === 'auto') {
        minValue = min(allValues)
    }

    let maxValue = _maxValue
    if (maxValue === 'auto') {
        maxValue = max(allValues)
    }

    return scaleLinear().rangeRound(range).domain([minValue, maxValue])
}

/**
 * Generates x/y scales & bars for vertical stacked bar chart.
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
export const generateVerticalStackedBars = ({
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
    const stackedData = stack().keys(keys).offset(stackOffsetDiverging)(data)

    const xScale = getIndexedScale(data, getIndex, [0, width], padding)
    const yRange = reverse ? [0, height] : [height, 0]
    const yScale = getStackedScale(stackedData, minValue, maxValue, yRange)

    const bars = []
    const barWidth = xScale.bandwidth()

    let getY = d => yScale(d[1])
    let getHeight = (d, y) => yScale(d[0]) - y
    if (reverse) {
        getY = d => yScale(d[0])
        getHeight = (d, y) => yScale(d[1]) - y
    }

    if (barWidth > 0) {
        stackedData.forEach(stackedDataItem => {
            xScale.domain().forEach((index, i) => {
                const d = stackedDataItem[i]
                const x = xScale(getIndex(d.data))

                let y = getY(d)
                let barHeight = getHeight(d, y)
                if (innerPadding > 0) {
                    y += innerPadding * 0.5
                    barHeight -= innerPadding
                }

                if (barHeight > 0) {
                    const barData = {
                        id: stackedDataItem.key,
                        value: d.data[stackedDataItem.key],
                        index: i,
                        indexValue: index,
                        data: d.data,
                    }

                    bars.push({
                        key: `${stackedDataItem.key}.${index}`,
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
 * Generates x/y scales & bars for horizontal stacked bar chart.
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
export const generateHorizontalStackedBars = ({
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
    const stackedData = stack().keys(keys).offset(stackOffsetDiverging)(data)

    const xRange = reverse ? [width, 0] : [0, width]
    const xScale = getStackedScale(stackedData, minValue, maxValue, xRange)
    const yScale = getIndexedScale(data, getIndex, [height, 0], padding)

    const bars = []
    const barHeight = yScale.bandwidth()

    let getX = d => xScale(d[0])
    let getWidth = (d, x) => xScale(d[1]) - x
    if (reverse) {
        getX = d => xScale(d[1])
        getWidth = (d, y) => xScale(d[0]) - y
    }

    if (barHeight > 0) {
        stackedData.forEach(stackedDataItem => {
            yScale.domain().forEach((index, i) => {
                const d = stackedDataItem[i]
                const y = yScale(getIndex(d.data))

                const barData = {
                    id: stackedDataItem.key,
                    value: d.data[stackedDataItem.key],
                    index: i,
                    indexValue: index,
                    data: d.data,
                }

                let x = getX(d)
                let barWidth = getWidth(d, x)
                if (innerPadding > 0) {
                    x += innerPadding * 0.5
                    barWidth -= innerPadding
                }

                if (barWidth > 0) {
                    bars.push({
                        key: `${stackedDataItem.key}.${index}`,
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
 * Generates x/y scales & bars for stacked bar chart.
 *
 * @param {Object} options
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export const generateStackedBars = options =>
    options.layout === 'vertical'
        ? generateVerticalStackedBars(options)
        : generateHorizontalStackedBars(options)
