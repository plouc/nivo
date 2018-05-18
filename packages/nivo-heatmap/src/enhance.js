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
import isEqual from 'lodash/isEqual'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withState from 'recompose/withState'
import pure from 'recompose/pure'
import { scaleOrdinal, scaleLinear } from 'd3-scale'
import { withTheme, withDimensions, withMotion } from '@nivo/core'
import { getInheritedColorGenerator, guessQuantizeColorScale } from '@nivo/core'
import { getAccessorFor } from '@nivo/core'
import { HeatMapDefaultProps } from './props'

const computeX = (column, cellWidth, padding) => {
    return column * cellWidth + cellWidth * 0.5 + padding * column + padding
}
const computeY = (row, cellHeight, padding) => {
    return row * cellHeight + cellHeight * 0.5 + padding * row + padding
}

export default Component =>
    compose(
        defaultProps(HeatMapDefaultProps),
        withState('currentNode', 'setCurrentNode', null),
        withTheme(),
        withDimensions(),
        withMotion(),
        withPropsOnChange(['colors'], ({ colors }) => ({
            colorScale: guessQuantizeColorScale(colors),
        })),
        withPropsOnChange(['indexBy'], ({ indexBy }) => ({
            getIndex: getAccessorFor(indexBy),
        })),
        withPropsOnChange(
            ['data', 'keys', 'width', 'height', 'padding', 'forceSquare'],
            ({ data, keys, width, height, padding, forceSquare }) => {
                const columns = keys.length
                const rows = data.length

                let cellWidth = Math.max((width - padding * (columns + 1)) / columns, 0)
                let cellHeight = Math.max((height - padding * (rows + 1)) / rows, 0)

                let offsetX = 0
                let offsetY = 0
                if (forceSquare === true) {
                    const cellSize = Math.min(cellWidth, cellHeight)
                    cellWidth = cellSize
                    cellHeight = cellSize

                    offsetX = (width - ((cellWidth + padding) * columns + padding)) / 2
                    offsetY = (height - ((cellHeight + padding) * rows + padding)) / 2
                }

                return {
                    cellWidth,
                    cellHeight,
                    offsetX,
                    offsetY,
                }
            }
        ),
        withPropsOnChange(['data', 'getIndex'], ({ data, getIndex }) => ({
            indices: data.map(getIndex),
        })),
        withPropsOnChange(
            (prev, next) =>
                prev.keys !== next.keys ||
                prev.cellWidth !== next.cellWidth ||
                prev.cellHeight !== next.cellHeight ||
                prev.padding !== next.padding ||
                !isEqual(prev.indices, next.indices),
            ({ indices, keys, cellWidth, cellHeight, padding }) => ({
                xScale: scaleOrdinal(keys.map((key, i) => computeX(i, cellWidth, padding))).domain(
                    keys
                ),
                yScale: scaleOrdinal(
                    indices.map((d, i) => computeY(i, cellHeight, padding))
                ).domain(indices),
            })
        ),
        withPropsOnChange(
            ['data', 'keys', 'minValue', 'maxValue'],
            ({ data, keys, minValue: _minValue, maxValue: _maxValue }) => {
                let minValue = _minValue
                let maxValue = _maxValue
                if (minValue === 'auto' || maxValue === 'auto') {
                    const allValues = data.reduce(
                        (acc, row) => acc.concat(keys.map(key => row[key])),
                        []
                    )

                    if (minValue === 'auto') minValue = min(allValues)
                    if (maxValue === 'auto') maxValue = max(allValues)
                }

                return {
                    minValue: Math.min(minValue, maxValue),
                    maxValue: Math.max(maxValue, minValue),
                }
            }
        ),
        withPropsOnChange(
            ['colorScale', 'minValue', 'maxValue'],
            ({ colorScale, minValue, maxValue }) => ({
                colorScale: colorScale.domain([minValue, maxValue]),
            })
        ),
        withPropsOnChange(
            ['sizeVariation', 'minValue', 'maxValue'],
            ({ sizeVariation, minValue, maxValue }) => {
                let sizeScale
                if (sizeVariation > 0) {
                    sizeScale = scaleLinear()
                        .range([1 - sizeVariation, 1])
                        .domain([minValue, maxValue])
                }

                return { sizeScale }
            }
        ),
        withPropsOnChange(['cellBorderColor'], ({ cellBorderColor }) => ({
            getCellBorderColor: getInheritedColorGenerator(cellBorderColor),
        })),
        withPropsOnChange(['labelTextColor'], ({ labelTextColor }) => ({
            getLabelTextColor: getInheritedColorGenerator(labelTextColor),
        })),
        pure
    )(Component)
