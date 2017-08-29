/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { min, max, isEqual } from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import { colorMotionSpring, getInterpolatedColor } from '../../../lib/colors'
import { HeatMapPropTypes } from './props'
import enhance from './enhance'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import Grid from '../../axes/Grid'
import Axes from '../../axes/Axes'
import HeatMapCellRect from './HeatMapCellRect'
import HeatMapCellCircle from './HeatMapCellCircle'

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

HeatMap.propTypes = HeatMapPropTypes

export default enhance(HeatMap)
