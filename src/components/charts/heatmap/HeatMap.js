/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { min, max, isEqual } from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { scaleOrdinal, scaleLinear } from 'd3-scale'
import { withTheme, withDimensions, withMotion } from '../../../hocs'
import {
    getInheritedColorGenerator,
    colorMotionSpring,
    getInterpolatedColor,
    guessQuantizeColorScale,
} from '../../../lib/colors'
import { getAccessorFor } from '../../../lib/propertiesConverters'
import { quantizeColorScalePropType } from '../../../props'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import Grid from '../../axes/Grid'
import Axes from '../../axes/Axes'
import HeatMapCellRect from './HeatMapCellRect'
import HeatMapCellCircle from './HeatMapCellCircle'

const computeX = (column, cellWidth, padding) => {
    return column * cellWidth + cellWidth * 0.5 + padding * column + padding
}
const computeY = (row, cellHeight, padding) => {
    return row * cellHeight + cellHeight * 0.5 + padding * row + padding
}

const HeatMap = ({
    data,
    getIndex,
    keys,

    cellWidth,
    cellHeight,
    sizeScale,
    xScale,
    yScale,
    offsetX,
    offsetY,

    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    // cells
    cellShape,
    cellOpacity,
    cellBorderWidth,
    getCellBorderColor,

    // axes & grid
    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    enableGridX,
    enableGridY,

    // labels
    getLabelTextColor,

    // theming
    theme,
    colorScale,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,
}) => {
    let Cell
    if (cellShape === 'rect') {
        Cell = HeatMapCellRect
    } else if (cellShape === 'circle') {
        Cell = HeatMapCellCircle
    } else {
        Cell = cellShape
    }

    const nodes = data.reduce((acc, d) => {
        keys.forEach(key => {
            acc.push({
                key: `${key}.${getIndex(d)}`,
                xKey: key,
                yKey: getIndex(d),
                x: xScale(key),
                y: yScale(getIndex(d)),
                width: sizeScale ? Math.min(sizeScale(d[key]) * cellWidth, cellWidth) : cellWidth,
                height: sizeScale
                    ? Math.min(sizeScale(d[key]) * cellHeight, cellHeight)
                    : cellHeight,
                value: d[key],
                color: colorScale(d[key]),
            })
        })

        return acc
    }, [])

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }

    let cells
    if (animate === true) {
        cells = (
            <TransitionMotion
                styles={nodes.map(node => {
                    return {
                        key: node.key,
                        data: node,
                        style: {
                            x: spring(node.x, motionProps),
                            y: spring(node.y, motionProps),
                            width: spring(node.width, motionProps),
                            height: spring(node.height, motionProps),
                            ...colorMotionSpring(node.color, motionProps),
                        },
                    }
                })}
            >
                {interpolatedStyles => {
                    return (
                        <g>
                            {interpolatedStyles.map(({ key, style, data: node }) => {
                                const color = getInterpolatedColor(style)

                                return React.createElement(Cell, {
                                    key,
                                    value: node.value,
                                    x: style.x,
                                    y: style.y,
                                    width: Math.max(style.width, 0),
                                    height: Math.max(style.height, 0),
                                    color,
                                    opacity: cellOpacity,
                                    borderWidth: cellBorderWidth,
                                    borderColor: getCellBorderColor({ ...node, color }),
                                    textColor: getLabelTextColor({ ...node, color }),
                                })
                            })}
                        </g>
                    )
                }}
            </TransitionMotion>
        )
    } else {
        cells = nodes.map(node => {
            return React.createElement(Cell, {
                key: node.key,
                value: node.value,
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                color: node.color,
                opacity: cellOpacity,
                borderWidth: cellBorderWidth,
                borderColor: getCellBorderColor(node),
                textColor: getLabelTextColor(node),
            })
        })
    }

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => {
                return (
                    <SvgWrapper
                        width={outerWidth}
                        height={outerHeight}
                        margin={Object.assign({}, margin, {
                            top: margin.top + offsetY,
                            left: margin.left + offsetX,
                        })}
                    >
                        <Grid
                            theme={theme}
                            width={width - offsetX * 2}
                            height={height - offsetY * 2}
                            xScale={enableGridX ? xScale : null}
                            yScale={enableGridY ? yScale : null}
                            {...motionProps}
                        />
                        <Axes
                            xScale={xScale}
                            yScale={yScale}
                            width={width}
                            height={height}
                            theme={theme}
                            top={axisTop}
                            right={axisRight}
                            bottom={axisBottom}
                            left={axisLeft}
                            {...motionProps}
                        />
                        {cells}
                    </SvgWrapper>
                )
            }}
        </Container>
    )
}

HeatMap.propTypes = {
    // data
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    indexBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getIndex: PropTypes.func.isRequired, // computed
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,

    minValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
    maxValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,

    forceSquare: PropTypes.bool.isRequired,
    sizeVariation: PropTypes.number.isRequired,
    padding: PropTypes.number.isRequired,

    // cells
    cellShape: PropTypes.oneOfType([PropTypes.oneOf(['rect', 'circle']), PropTypes.func])
        .isRequired,
    cellOpacity: PropTypes.number.isRequired,
    cellHoverOpacity: PropTypes.number.isRequired,
    cellBorderWidth: PropTypes.number.isRequired,
    cellBorderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getCellBorderColor: PropTypes.func.isRequired, // computed

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // labels
    enableLabels: PropTypes.bool.isRequired,
    labelTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabelTextColor: PropTypes.func.isRequired, // computed

    // theming
    colors: quantizeColorScalePropType.isRequired,
    colorScale: PropTypes.func.isRequired, // computed

    // interactivityP
    isInteractive: PropTypes.bool,
}

export const HeatMapDefaultProps = {
    indexBy: 'id',

    minValue: 'auto',
    maxValue: 'auto',

    forceSquare: false,
    sizeVariation: 0,
    padding: 0,

    // cells
    cellShape: 'rect',
    cellOpacity: 0.85,
    cellHoverOpacity: 1,
    cellBorderWidth: 0,
    cellBorderColor: 'inherit',

    // axes & grid
    axisTop: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: false,

    // labels
    enableLabels: true,
    labelTextColor: 'inherit:darker(1.4)',

    // theming
    colors: 'nivo',

    // interactivity
    isInteractive: true,
}

HeatMap.defaultProps = HeatMapDefaultProps

const enhance = compose(
    defaultProps(HeatMapDefaultProps),
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
            yScale: scaleOrdinal(indices.map((d, i) => computeY(i, cellHeight, padding))).domain(
                indices
            ),
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
                sizeScale = scaleLinear().range([1 - sizeVariation, 1]).domain([minValue, maxValue])
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
)

export default enhance(HeatMap)
