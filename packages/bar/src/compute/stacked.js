/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
// import flattenDepth from 'lodash/flattenDepth'
import { computeScale } from '@nivo/scales'
import { stack, stackOffsetDiverging } from 'd3-shape'
import { getIndexScale, filterNullValues, normalizeData } from './common'

const flattenDeep = (array, depth = 1) =>
    depth > 0
        ? array.reduce(
              (acc, value) =>
                  acc.concat(Array.isArray(value) ? flattenDeep(value, depth - 1) : value),
              []
          )
        : array.slice()

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
const generateVerticalStackedBars = (
    { getIndex, getColor, innerPadding, stackedData, xScale, yScale },
    barWidth,
    reverse
) => {
    const getY = d => yScale(d[reverse ? 0 : 1])
    const getHeight = (d, y) => yScale(d[reverse ? 1 : 0]) - y

    const bars = flattenDeep(
        stackedData.map(stackedDataItem =>
            xScale.domain().map((index, i) => {
                const d = stackedDataItem[i]
                const x = xScale(getIndex(d.data))
                const y = getY(d) + innerPadding * 0.5
                const barHeight = getHeight(d, y) - innerPadding

                const barData = {
                    id: stackedDataItem.key,
                    value: d.data[stackedDataItem.key],
                    index: i,
                    indexValue: index,
                    data: filterNullValues(d.data),
                }

                return {
                    key: `${stackedDataItem.key}.${index}`,
                    data: barData,
                    x,
                    y,
                    width: barWidth,
                    height: barHeight,
                    color: getColor(barData),
                }
            })
        )
    )

    return bars
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
const generateHorizontalStackedBars = (
    { getIndex, getColor, innerPadding, stackedData, xScale, yScale },
    barHeight,
    reverse
) => {
    const getX = d => xScale(d[reverse ? 1 : 0])
    const getWidth = (d, x) => xScale(d[reverse ? 0 : 1]) - x

    const bars = flattenDeep(
        stackedData.map(stackedDataItem =>
            yScale.domain().map((index, i) => {
                const d = stackedDataItem[i]
                const y = yScale(getIndex(d.data))
                const x = getX(d) + innerPadding * 0.5
                const barWidth = getWidth(d, x) - innerPadding

                const barData = {
                    id: stackedDataItem.key,
                    value: d.data[stackedDataItem.key],
                    index: i,
                    indexValue: index,
                    data: filterNullValues(d.data),
                }

                return {
                    key: `${stackedDataItem.key}.${index}`,
                    data: barData,
                    x,
                    y,
                    width: barWidth,
                    height: barHeight,
                    color: getColor(barData),
                }
            })
        )
    )

    return bars
}

/**
 * Generates x/y scales & bars for stacked bar chart.
 *
 * @param {Object} options
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export const generateStackedBars = ({
    data,
    keys,
    layout,
    minValue,
    maxValue,
    reverse,
    width,
    height,
    padding = 0,
    valueScale,
    indexScale: indexScaleConfig,
    ...props
}) => {
    const stackedData = stack().keys(keys).offset(stackOffsetDiverging)(normalizeData(data, keys))

    const [axis, range] = layout === 'vertical' ? ['y', [0, width]] : ['x', [height, 0]]
    const indexScale = getIndexScale(data, props.getIndex, range, padding, indexScaleConfig)

    const scaleSpec = {
        axis,
        max: maxValue,
        min: minValue,
        reverse,
        ...valueScale,
    }

    const values = flattenDeep(stackedData, 2)
    const min = Math.min(...values)
    const max = Math.max(...values)

    const scale = computeScale(scaleSpec, { [axis]: { min, max } }, width, height)

    const [xScale, yScale] = layout === 'vertical' ? [indexScale, scale] : [scale, indexScale]

    const innerPadding = props.innerPadding > 0 ? props.innerPadding : 0
    const bandwidth = indexScale.bandwidth()
    const params = [
        { ...props, innerPadding, stackedData, xScale, yScale },
        bandwidth,
        scaleSpec.reverse,
    ]

    const bars =
        bandwidth > 0
            ? layout === 'vertical'
                ? generateVerticalStackedBars(...params)
                : generateHorizontalStackedBars(...params)
            : []

    return { xScale, yScale, bars }
}
