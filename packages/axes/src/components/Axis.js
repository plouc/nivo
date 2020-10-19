/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSpring, useTransition, animated } from 'react-spring'
import { useTheme, useMotionConfig } from '@nivo/core'
import { computeCartesianTicks, getFormatter } from '../compute'
import { axisPropTypes } from '../props'
import AxisTick from './AxisTick'

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
    ariaHidden,
}) => {
    const theme = useTheme()

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

    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        transform: `translate(${x},${y})`,
        lineX2: axis === 'x' ? length : 0,
        lineY2: axis === 'x' ? 0 : length,
        config: springConfig,
        immediate: !animate,
    })

    const transitions = useTransition(ticks, tick => tick.key, {
        initial: tick => ({
            opacity: 1,
            transform: `translate(${tick.x},${tick.y})`,
            textTransform: `translate(${tick.textX},${tick.textY}) rotate(${tickRotation})`,
        }),
        from: tick => ({
            opacity: 0,
            transform: `translate(${tick.x},${tick.y})`,
            textTransform: `translate(${tick.textX},${tick.textY}) rotate(${tickRotation})`,
        }),
        enter: tick => ({
            opacity: 1,
            transform: `translate(${tick.x},${tick.y})`,
            textTransform: `translate(${tick.textX},${tick.textY}) rotate(${tickRotation})`,
        }),
        update: tick => ({
            opacity: 1,
            transform: `translate(${tick.x},${tick.y})`,
            textTransform: `translate(${tick.textX},${tick.textY}) rotate(${tickRotation})`,
        }),
        leave: {
            opacity: 0,
        },
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.g transform={animatedProps.transform} aria-hidden={ariaHidden}>
            {transitions.map(({ item: tick, props: transitionProps, key }, tickIndex) => {
                return React.createElement(renderTick, {
                    tickIndex,
                    format: formatValue,
                    rotate: tickRotation,
                    textBaseline,
                    textAnchor: textAlign,
                    animatedProps: transitionProps,
                    ...tick,
                    ...(onClick ? { onClick } : {}),
                    key,
                })
            })}
            <animated.line
                style={theme.axis.domain.line}
                x1={0}
                x2={animatedProps.lineX2}
                y1={0}
                y2={animatedProps.lineY2}
            />
            {legendNode}
        </animated.g>
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
    ariaHidden: PropTypes.bool,
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
