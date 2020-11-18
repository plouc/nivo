/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { computeScale } from '@nivo/scales'
import { getIndexScale, filterNullValues, normalizeData } from './common'

const gt = (value, other) => value > other
const lt = (value, other) => value < other

const flatten = array => [].concat(...array)
const range = (start, end) => Array.from(' '.repeat(end - start), (_, index) => start + index)

const clampToZero = value => (gt(value, 0) ? 0 : value)

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
const generateVerticalGroupedBars = (
    { data, getIndex, keys, getColor, innerPadding, xScale, yScale },
    barWidth,
    reverse,
    yRef
) => {
    const compare = reverse ? lt : gt
    const getY = d => (compare(d, 0) ? yScale(d) : yRef)
    const getHeight = (d, y) => (compare(d, 0) ? yRef - y : yScale(d) - yRef)

    const bars = flatten(
        keys.map((key, i) =>
            range(0, xScale.domain().length).map(index => {
                const x = xScale(getIndex(data[index])) + barWidth * i + innerPadding * i
                const y = getY(data[index][key])
                const barHeight = getHeight(data[index][key], y)
                const barData = {
                    id: key,
                    value: data[index][key],
                    index,
                    indexValue: getIndex(data[index]),
                    data: filterNullValues(data[index]),
                }

                return {
                    key: `${key}.${barData.indexValue}`,
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
const generateHorizontalGroupedBars = (
    { data, getIndex, keys, getColor, innerPadding = 0, xScale, yScale },
    barHeight,
    reverse,
    xRef
) => {
    const compare = reverse ? lt : gt
    const getX = d => (compare(d, 0) ? xRef : xScale(d))
    const getWidth = (d, x) => (compare(d, 0) ? xScale(d) - xRef : xRef - x)

    const bars = flatten(
        keys.map((key, i) =>
            range(0, yScale.domain().length).map(index => {
                const x = getX(data[index][key])
                const y = yScale(getIndex(data[index])) + barHeight * i + innerPadding * i
                const barWidth = getWidth(data[index][key], x)
                const barData = {
                    id: key,
                    value: data[index][key],
                    index,
                    indexValue: getIndex(data[index]),
                    data: filterNullValues(data[index]),
                }

                return {
                    key: `${key}.${barData.indexValue}`,
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
 * Generates x/y scales & bars for grouped bar chart.
 *
 * @param {Object} options
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export const generateGroupedBars = ({
    layout,
    keys,
    minValue,
    maxValue,
    reverse,
    width,
    height,
    padding = 0,
    innerPadding = 0,
    valueScale,
    indexScale: indexScaleConfig,
    ...props
}) => {
    const data = normalizeData(props.data, keys)
    const [axis, range] = layout === 'vertical' ? ['y', [0, width]] : ['x', [height, 0]]
    const indexScale = getIndexScale(data, props.getIndex, range, padding, indexScaleConfig)

    const scaleSpec = {
        axis,
        max: maxValue,
        min: minValue,
        reverse,
        ...valueScale,
    }
    const clampMin = scaleSpec.min === 'auto' ? clampToZero : value => value

    const values = data
        .reduce((acc, entry) => [...acc, ...keys.map(k => entry[k])], [])
        .filter(Boolean)
    const min = clampMin(Math.min(...values))
    const max = Math.max(...values)

    const scale = computeScale(scaleSpec, { [axis]: { min, max } }, width, height)

    const [xScale, yScale] = layout === 'vertical' ? [indexScale, scale] : [scale, indexScale]

    const bandwidth = (indexScale.bandwidth() - innerPadding * (keys.length - 1)) / keys.length
    const params = [
        { ...props, data, keys, innerPadding, xScale, yScale },
        bandwidth,
        scaleSpec.reverse,
        scale(0),
    ]

    const bars =
        bandwidth > 0
            ? layout === 'vertical'
                ? generateVerticalGroupedBars(...params)
                : generateHorizontalGroupedBars(...params)
            : []

    return { xScale, yScale, bars }
}
