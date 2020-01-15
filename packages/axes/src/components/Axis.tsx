/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment, ReactNode, useMemo } from 'react'
import { Motion, TransitionMotion, spring, SpringHelperConfig } from 'react-motion'
import { useTheme, useMotionConfig } from '@nivo/core'
import { computeCartesianTicks, getFormatter, TicksSpec } from '../compute'
import { AxisTick, AxisTickProps } from './AxisTick'

export type AxisLegendPosition = 'start' | 'middle' | 'end'

export interface AxisProp<Value extends number | string | Date> {
    ticksPosition?: 'before' | 'after'
    tickValues?: TicksSpec<Value>
    tickSize?: number
    tickPadding?: number
    tickRotation?: number
    format?: any
    renderTick?: any
    legend?: ReactNode
    legendPosition?: AxisLegendPosition
    legendOffset?: number
}

const willEnter = () => ({
    rotate: 0,
    opacity: 0,
    x: 0,
    y: 0,
})

const willLeave = (springConfig: SpringHelperConfig) => ({
    style: { x, y, rotate },
}: {
    style: {
        x: { val: number }
        y: { val: number }
        rotate: number
    }
}) => ({
    rotate,
    opacity: spring(0, springConfig),
    x: spring(x.val, springConfig),
    y: spring(y.val, springConfig),
})

const defaultTickRenderer = <Value extends number | string | Date>(props: AxisTickProps<Value>) => (
    <AxisTick<Value> {...props} />
)

export interface AxisProps<Value extends number | string | Date> {
    axis: 'x' | 'y'
    scale: any
    x?: number
    y?: number
    length: number
    ticksPosition: 'before' | 'after'
    tickValues?: TicksSpec<Value>
    tickSize?: number
    tickPadding?: number
    tickRotation?: number
    format?: any
    renderTick?: any
    legend?: ReactNode
    legendPosition?: 'start' | 'middle' | 'end'
    legendOffset?: number
    onClick?: any
}

export const Axis = <Value extends number | string | Date>({
    axis,
    scale,
    x = 0,
    y = 0,
    length,
    ticksPosition,
    tickValues,
    tickSize = 5,
    tickPadding = 5,
    tickRotation = 0,
    format,
    renderTick = defaultTickRenderer,
    legend,
    legendPosition = 'end',
    legendOffset = 0,
    onClick,
}: AxisProps<Value>) => {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()

    const formatValue = useMemo(() => getFormatter(format, scale), [format, scale])

    const { ticks, textAlign, textBaseline } = computeCartesianTicks<Value>({
        axis,
        scale,
        ticksPosition,
        tickValues,
        tickSize,
        tickPadding,
        tickRotation,
    })

    let legendNode: ReactNode = null
    if (legend !== undefined) {
        let legendX = 0
        let legendY = 0
        let legendRotation = 0
        let textAnchor

        if (axis === 'y') {
            legendRotation = -90
            legendX = legendOffset
            if (legendPosition === 'start') {
                textAnchor = 'start'
                legendY = length
            } else if (legendPosition === 'middle') {
                textAnchor = 'middle'
                legendY = length / 2
            } else if (legendPosition === 'end') {
                textAnchor = 'end'
            }
        } else {
            legendY = legendOffset
            if (legendPosition === 'start') {
                textAnchor = 'start'
            } else if (legendPosition === 'middle') {
                textAnchor = 'middle'
                legendX = length / 2
            } else if (legendPosition === 'end') {
                textAnchor = 'end'
                legendX = length
            }
        }

        legendNode = (
            <text
                transform={`translate(${legendX}, ${legendY}) rotate(${legendRotation})`}
                textAnchor={textAnchor}
                style={{
                    dominantBaseline: 'central',
                    ...theme.axis.legend.text,
                }}
            >
                {legend}
            </text>
        )
    }

    if (!animate) {
        return (
            <g transform={`translate(${x},${y})`}>
                {ticks.map((tick, tickIndex) =>
                    React.createElement(renderTick, {
                        tickIndex,
                        format: formatValue,
                        rotate: tickRotation,
                        textBaseline,
                        textAnchor: textAlign,
                        ...tick,
                        ...(onClick ? { onClick } : {}),
                    } as any)
                )}
                <line
                    style={theme.axis.domain.line}
                    x1={0}
                    x2={axis === 'x' ? length : 0}
                    y1={0}
                    y2={axis === 'x' ? 0 : length}
                />
                {legendNode}
            </g>
        )
    }

    return (
        <Motion style={{ x: spring(x, springConfig), y: spring(y, springConfig) }}>
            {xy => (
                <g transform={`translate(${xy.x},${xy.y})`}>
                    <TransitionMotion
                        willEnter={willEnter}
                        willLeave={willLeave(springConfig) as any}
                        styles={ticks.map(tick => ({
                            key: `${tick.key}`,
                            data: tick,
                            style: {
                                opacity: spring(1, springConfig),
                                x: spring(tick.x, springConfig),
                                y: spring(tick.y, springConfig),
                                rotate: spring(tickRotation, springConfig),
                            },
                        }))}
                    >
                        {interpolatedStyles => (
                            <Fragment>
                                {interpolatedStyles.map(({ style, data: tick }, tickIndex) =>
                                    React.createElement(renderTick, {
                                        tickIndex,
                                        format: formatValue,
                                        textBaseline,
                                        textAnchor: textAlign,
                                        ...tick,
                                        ...style,
                                        ...(onClick ? { onClick } : {}),
                                    })
                                )}
                            </Fragment>
                        )}
                    </TransitionMotion>
                    <Motion
                        style={{
                            x2: spring(axis === 'x' ? length : 0, springConfig),
                            y2: spring(axis === 'x' ? 0 : length, springConfig),
                        }}
                    >
                        {values => (
                            <line style={theme.axis.domain.line} x1={0} y1={0} {...values} />
                        )}
                    </Motion>
                    {legendNode}
                </g>
            )}
        </Motion>
    )
}
