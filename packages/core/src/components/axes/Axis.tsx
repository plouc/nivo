/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import * as PropTypes from 'prop-types'
import { isFunction } from 'lodash'
import { format as d3Format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { compose, withPropsOnChange, pure } from 'recompose'
import { TransitionMotion, spring } from 'react-motion'
import { withMotion } from '../../hocs'
import { motionPropTypes } from '../../props'
import { computeAxisTicks } from '../../lib/cartesian/axes'
import { axisThemePropType, AxisTheme } from '../../theming'
import { AxisTick } from './AxisTick'

const axisPositions = ['top', 'right', 'bottom', 'left']
const legendPositions = ['start', 'center', 'end']

export const axisPropType = PropTypes.shape({
    orient: PropTypes.oneOf(axisPositions),
    tickValues: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
        ),
    ]),
    tickSize: PropTypes.number,
    tickPadding: PropTypes.number,
    tickRotation: PropTypes.number,
    format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    legend: PropTypes.node,
    legendPosition: PropTypes.oneOf(legendPositions),
    legendOffset: PropTypes.number,
})

const willEnter = () => ({
    opacity: 0,
    x: 0,
    y: 0,
})

const willLeave = springConfig => ({ style: { x, y } }) => ({
    opacity: spring(0, springConfig),
    x: spring(x.val, springConfig),
    y: spring(y.val, springConfig),
})

export interface AxisProps {
    scale: any
    width: number
    height: number
    position: string
    tickValues?: number | Array<number | string | Date>
    tickSize?: number
    tickPadding?: number
    tickRotation?: number
    format?: any
    legend?: React.ReactNode
    legendPosition?: string
    legendOffset?: number
    theme: {
        axis: AxisTheme
    }
    onClick: any
    animate: boolean
    motionStiffness: number
    motionDamping: number
}

const Axis: React.SFC<AxisProps> = ({
    scale,
    width,
    height,
    position: _position,
    tickValues,
    tickSize = 5,
    tickPadding = 5,
    tickRotation = 0,
    format,
    legend: _legend,
    legendPosition = 'end',
    legendOffset = 0,
    theme,
    animate,
    motionStiffness,
    motionDamping,
    onClick,
}) => {
    const { x, y, ticks, textAlign, textBaseline } = computeAxisTicks({
        width,
        height,
        scale,
        position: _position,
        tickValues,
        tickSize,
        tickPadding,
        tickRotation,
    })

    const isHorizontal = ['top', 'bottom'].includes(_position)
    const isVertical = !isHorizontal

    let legend = null
    if (_legend !== undefined) {
        let legendX = 0
        let legendY = 0
        let legendRotation = 0
        let textAnchor

        if (isVertical) {
            legendRotation = -90
            legendX = legendOffset
            if (legendPosition === 'start') {
                textAnchor = 'start'
                legendY = height
            } else if (legendPosition === 'center') {
                textAnchor = 'middle'
                legendY = height / 2
            } else if (legendPosition === 'end') {
                textAnchor = 'end'
            }
        } else {
            legendY = legendOffset
            if (legendPosition === 'start') {
                textAnchor = 'start'
            } else if (legendPosition === 'center') {
                textAnchor = 'middle'
                legendX = width / 2
            } else if (legendPosition === 'end') {
                textAnchor = 'end'
                legendX = width
            }
        }

        legend = (
            <text
                transform={`translate(${legendX}, ${legendY}) rotate(${legendRotation})`}
                textAnchor={textAnchor}
                style={theme.axis.legend.text}
            >
                {_legend}
            </text>
        )
    }

    let tickElements
    if (!animate) {
        tickElements = (
            <g>
                {ticks.map(tick => (
                    <AxisTick
                        key={tick.key}
                        value={tick.key}
                        format={format}
                        lineX={tick.lineX}
                        lineY={tick.lineY}
                        rotate={tickRotation}
                        textX={tick.textX}
                        textY={tick.textY}
                        textBaseline={textBaseline}
                        textAnchor={textAlign}
                        theme={theme}
                        x={tick.x}
                        y={tick.y}
                        {...(onClick ? { onClick } : {})}
                    />
                ))}
            </g>
        )
    } else {
        const springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        tickElements = (
            <TransitionMotion
                willEnter={willEnter}
                willLeave={willLeave(springConfig)}
                styles={ticks.map(tick => {
                    return {
                        key: `${tick.key}`,
                        data: tick,
                        style: {
                            opacity: spring(1, springConfig),
                            x: spring(tick.x, springConfig),
                            y: spring(tick.y, springConfig),
                        },
                    }
                })}
            >
                {interpolatedStyles => (
                    <g>
                        {interpolatedStyles.map(({ key, style, data: tick }) => (
                            <AxisTick
                                key={key}
                                value={key}
                                format={format}
                                lineX={tick.lineX}
                                lineY={tick.lineY}
                                rotate={tickRotation}
                                textX={tick.textX}
                                textY={tick.textY}
                                textBaseline={textBaseline}
                                textAnchor={textAlign}
                                theme={theme}
                                {...(onClick ? { onClick } : {})}
                                {...style}
                            />
                        ))}
                    </g>
                )}
            </TransitionMotion>
        )
    }

    return (
        <g transform={`translate(${x},${y})`}>
            {legend}
            {tickElements}
            <line
                style={theme.axis.domain.line}
                x1={0}
                x2={isHorizontal ? width : 0}
                y1={0}
                y2={isHorizontal ? 0 : height}
            />
        </g>
    )
}

Axis.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    position: PropTypes.oneOf(axisPositions).isRequired,
    scale: PropTypes.func.isRequired,
    tickValues: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
        ),
    ]),
    tickSize: PropTypes.number.isRequired,
    tickPadding: PropTypes.number.isRequired,
    tickRotation: PropTypes.number.isRequired,
    format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    legend: PropTypes.node,
    legendPosition: PropTypes.oneOf(legendPositions).isRequired,
    legendOffset: PropTypes.number.isRequired,
    theme: PropTypes.shape({
        axis: axisThemePropType.isRequired,
    }).isRequired as React.Requireable<{
        axis: AxisTheme
    }>,
    onClick: PropTypes.func,
    ...motionPropTypes,
}

const enhance = compose(
    withMotion(),
    withPropsOnChange(['format', 'scale'], ({ format, scale }) => {
        if (!format || isFunction(format)) {
            return { format }
        } else if (scale.type === 'time') {
            const f = timeFormat(format)
            return { format: d => f(new Date(d)) }
        } else {
            return { format: d3Format(format) }
        }
    }),
    pure
)

export default enhance(Axis)
