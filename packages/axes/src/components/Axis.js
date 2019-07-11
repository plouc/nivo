/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Motion, TransitionMotion, spring } from 'react-motion'
import { useTheme, useMotionConfig } from '@nivo/core'
import { computeCartesianTicks, getFormatter } from '../compute'
import { axisPropTypes } from '../props'
import AxisTick from './AxisTick'

const willEnter = () => ({
    rotate: 0,
    opacity: 0,
    x: 0,
    y: 0,
})

const willLeave = springConfig => ({ style: { x, y, rotate } }) => ({
    rotate,
    opacity: spring(0, springConfig),
    x: spring(x.val, springConfig),
    y: spring(y.val, springConfig),
})

const defaultTickRenderer = props => <AxisTick {...props} />

const Axis = ({
    axis,
    scale,
    x,
    y,
    length,
    ticksPosition,
    tickValues,
    tickSize,
    tickPadding,
    tickRotation,
    format,
    renderTick,
    legend,
    legendPosition,
    legendOffset,
    onClick,
}) => {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()

    const formatValue = useMemo(() => getFormatter(format, scale), [format, scale])

    const { ticks, textAlign, textBaseline } = computeCartesianTicks({
        axis,
        scale,
        ticksPosition,
        tickValues,
        tickSize,
        tickPadding,
        tickRotation,
    })

    let legendNode = null
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

    if (animate !== true) {
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
                    })
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
                        willLeave={willLeave(springConfig)}
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

Axis.propTypes = {
    axis: PropTypes.oneOf(['x', 'y']).isRequired,
    scale: PropTypes.func.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    ticksPosition: PropTypes.oneOf(['before', 'after']).isRequired,
    tickValues: axisPropTypes.tickValues,
    tickSize: PropTypes.number.isRequired,
    tickPadding: PropTypes.number.isRequired,
    tickRotation: PropTypes.number.isRequired,
    format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    renderTick: PropTypes.func.isRequired,
    legend: PropTypes.node,
    legendPosition: PropTypes.oneOf(['start', 'middle', 'end']).isRequired,
    legendOffset: PropTypes.number.isRequired,
    onClick: PropTypes.func,
}
Axis.defaultProps = {
    x: 0,
    y: 0,
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    renderTick: defaultTickRenderer,
    legendPosition: 'end',
    legendOffset: 0,
}

export default memo(Axis)
