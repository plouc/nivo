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
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import shouldUpdate from 'recompose/shouldUpdate'
import { TransitionMotion, spring } from 'react-motion'
import { withMotion } from '../../hocs'
import AxisTick from './AxisTick'

const center = scale => {
    let offset = scale.bandwidth() / 2
    if (scale.round()) {
        offset = Math.round(offset)
    }

    return d => scale(d) + offset
}

const axisPositions = ['top', 'right', 'bottom', 'left']
const legendPositions = ['start', 'center', 'end']

export const axisPropType = PropTypes.shape({
    orient: PropTypes.oneOf(axisPositions),

    // ticks
    tickSize: PropTypes.number,
    tickPadding: PropTypes.number,
    format: PropTypes.func,

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

const willLeave = springConfig => ({ style }) => ({
    opacity: spring(0, springConfig),
    x: spring(style.x.val, springConfig),
    y: spring(style.y.val, springConfig),
})

const Axis = ({
    scale,
    width,
    height,
    position: _position,
    orient: _orient,
    tickSize,
    tickPadding,
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
}) => {
    let values
    if (scale.ticks) {
        values = scale.ticks()
    } else {
        values = scale.domain()
    }

    const orient = _orient || _position
    const position = scale.bandwidth ? center(scale) : scale

    let x = 0
    let y = 0
    let translate
    let textAnchor
    let textDY
    const tickLine = { x2: 0, y2: 0 }
    const textXY = { x: 0, y: 0 }

    if (['top', 'bottom'].includes(orient)) {
        translate = d => ({ x: position(d), y: 0 })

        textAnchor = 'middle'
        textDY = orient === 'top' ? '0em' : '0.71em'
        textXY.y = (tickSize + tickPadding) * (orient === 'bottom' ? 1 : -1)

        tickLine.y2 = tickSize * (orient === 'bottom' ? 1 : -1)

        if (orient === 'bottom') y = height
    } else if (['left', 'right'].includes(orient)) {
        translate = d => ({ x: 0, y: position(d) })

        textAnchor = orient === 'left' ? 'end' : 'start'
        textDY = '0.32em'
        textXY.x = (tickSize + tickPadding) * (orient === 'right' ? 1 : -1)

        tickLine.x2 = tickSize * (orient === 'right' ? 1 : -1)

        if (orient === 'right') x = width
    }

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

    const ticks = values.map(v => ({
        key: v,
        ...translate(v),
    }))

    let tickElements
    if (!animate) {
        tickElements = (
            <g>
                {ticks.map(tick =>
                    <AxisTick
                        key={tick.key}
                        value={tick.key}
                        format={format}
                        tickLine={tickLine}
                        textXY={textXY}
                        textDY={textDY}
                        textAnchor={textAnchor}
                        theme={theme}
                        x={tick.x}
                        y={tick.y}
                    />
                )}
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
                        data: tick.key,
                        style: {
                            opacity: spring(1, springConfig),
                            x: spring(tick.x, springConfig),
                            y: spring(tick.y, springConfig),
                        },
                    }
                })}
            >
                {interpolatedStyles =>
                    <g>
                        {interpolatedStyles.map(({ key, style }) =>
                            <AxisTick
                                key={key}
                                value={key}
                                format={format}
                                tickLine={tickLine}
                                textXY={textXY}
                                textDY={textDY}
                                textAnchor={textAnchor}
                                theme={theme}
                                {...style}
                            />
                        )}
                    </g>}
            </TransitionMotion>
        )
    }

    return (
        <g
            className={`nivo__axis nivo__axis--${_position}  nivo__axis--orient-${orient}`}
            transform={`translate(${x},${y})`}
        >
            {legend}
            {tickElements}
        </g>
    )
}

Axis.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    orient: PropTypes.oneOf(axisPositions),
    position: PropTypes.oneOf(axisPositions).isRequired,
    scale: PropTypes.func.isRequired,

    // ticks
    tickSize: PropTypes.number.isRequired,
    tickPadding: PropTypes.number.isRequired,
    format: PropTypes.func,

    // legend
    legend: PropTypes.string,
    legendPosition: PropTypes.oneOf(legendPositions).isRequired,
    legendOffset: PropTypes.number.isRequired,

    theme: PropTypes.object.isRequired,
}

Axis.defaultProps = {
    // ticks
    tickSize: 5,
    tickPadding: 5,

    // legend
    legendPosition: 'end',
    legendOffset: 0,
}

const enhance = compose(
    withMotion(),
    shouldUpdate((props, nextProps) => {
        //console.log('=> scale', props.scale === nextProps.scale)
        return true
    }),
    pure
)

export default enhance(Axis)
