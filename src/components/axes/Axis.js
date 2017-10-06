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
import { isFunction } from 'lodash'
import { format as d3Format } from 'd3-format'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { TransitionMotion, spring } from 'react-motion'
import { withMotion } from '../../hocs'
import { computeAxisTicks } from '../../lib/axes'
import AxisTick from './AxisTick'

const axisPositions = ['top', 'right', 'bottom', 'left']
const legendPositions = ['start', 'center', 'end']

export const axisPropType = PropTypes.shape({
    orient: PropTypes.oneOf(axisPositions),

    // ticks
    tickValues: PropTypes.array,
    tickSize: PropTypes.number,
    tickPadding: PropTypes.number,
    tickRotation: PropTypes.number,
    format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    // legend
    legend: PropTypes.string,
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

const Axis = ({
    // generic
    scale,
    width,
    height,
    position: _position,

    // ticks
    tickValues,
    tickCount,
    tickSize,
    tickPadding,
    tickRotation,
    format,

    // legend
    legend: _legend,
    legendPosition,
    legendOffset,

    // theming
    theme,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    onClick,
}) => {
    const { x, y, ticks, textAlign, textBaseline } = computeAxisTicks({
        width,
        height,
        scale,
        position: _position,
        tickValues,
        tickCount,
        tickSize,
        tickPadding,
        tickRotation,
    })

    let legend = null
    if (_legend !== undefined) {
        let legendX = 0
        let legendY = 0
        let legendRotation = 0
        let textAnchor

        if (['left', 'right'].includes(_position)) {
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
                fill={theme.axis.legendColor}
                transform={`translate(${legendX}, ${legendY}) rotate(${legendRotation})`}
                textAnchor={textAnchor}
                style={{ fontSize: theme.axis.legendFontSize }}
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
                        {...(onClick ? { onClick: () => onClick(value) } : {})}
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
                                {...(onClick ? { onClick: () => onClick(value) } : {})}
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
        </g>
    )
}

Axis.propTypes = {
    // generic
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    position: PropTypes.oneOf(axisPositions).isRequired,
    scale: PropTypes.func.isRequired,

    // ticks
    tickValues: PropTypes.array,
    tickCount: PropTypes.number,
    tickSize: PropTypes.number.isRequired,
    tickPadding: PropTypes.number.isRequired,
    tickRotation: PropTypes.number.isRequired,
    format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    // legend
    legend: PropTypes.string,
    legendPosition: PropTypes.oneOf(legendPositions).isRequired,
    legendOffset: PropTypes.number.isRequired,

    // theming
    theme: PropTypes.object.isRequired,

    // interactivity
    onClick: PropTypes.func,
}

Axis.defaultProps = {
    // ticks
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,

    // legend
    legendPosition: 'end',
    legendOffset: 0,
}

const enhance = compose(
    withMotion(),
    withPropsOnChange(['format'], ({ format }) => {
        if (!format || isFunction(format)) return { format }
        return { format: d3Format(format) }
    }),
    pure
)

export default enhance(Axis)
