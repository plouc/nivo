import { useMemo, memo } from 'react'
import * as React from 'react'
import { useSpring, useTransition, animated } from '@react-spring/web'
import { useTheme, useMotionConfig } from '@nivo/core'
import { ScaleValue, AnyScale } from '@nivo/scales'
import { computeCartesianTicks, getFormatter } from '../compute'
import { AxisTick } from './AxisTick'
import { AxisProps } from '../types'

const Axis = <Value extends ScaleValue>({
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
    renderTick = AxisTick,
    legend,
    legendPosition = 'end',
    legendOffset = 0,
    onClick,
    ariaHidden,
}: AxisProps<Value> & {
    axis: 'x' | 'y'
    scale: AnyScale
    x?: number
    y?: number
    length: number
    onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>, value: Value | string) => void
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

    const transition = useTransition<
        typeof ticks[0],
        { opacity: number; transform: string; textTransform: string }
    >(ticks, {
        keys: tick => tick.key,
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
            {transition((transitionProps, tick, _state, tickIndex) => {
                return React.createElement(renderTick, {
                    tickIndex,
                    format: formatValue,
                    rotate: tickRotation,
                    textBaseline,
                    textAnchor: textAlign,
                    animatedProps: transitionProps,
                    ...tick,
                    ...(onClick ? { onClick } : {}),
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

const memoizedAxis = memo(Axis) as typeof Axis

export { memoizedAxis as Axis }
