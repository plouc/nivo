import { createElement, SVGProps, useMemo } from 'react'
import { useSpring, useTransition } from '@react-spring/web'
import { useMotionConfig, useTheme, positionFromAngle, degreesToRadians } from '@nivo/core'
import { AnyScale, getScaleTicks } from '@nivo/scales'
import { ArcLine } from '@nivo/arcs'
import { CircularAxisConfig, CircularAxisTickAnimatedProps } from './types'
import { CircularAxisTick } from './CircularAxisTick'

type CircularAxisProps = {
    type: 'inner' | 'outer'
    center?: [number, number]
    radius: number
    startAngle: number
    endAngle: number
    scale: AnyScale
} & CircularAxisConfig

const getLinePositions = (angle: number, innerRadius: number, outerRadius: number) => {
    const start = positionFromAngle(degreesToRadians(angle), innerRadius)
    const end = positionFromAngle(degreesToRadians(angle), outerRadius)

    return {
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
    }
}

const getTextPosition = (angle: number, radius: number) => {
    const position = positionFromAngle(degreesToRadians(angle), radius)

    return {
        textX: position.x,
        textY: position.y,
    }
}

export const CircularAxis = ({
    type,
    center = [0, 0],
    radius,
    startAngle: originalStartAngle,
    endAngle: originalEndAngle,
    scale,
    tickSize = 5,
    tickPadding = 12,
    tickComponent = CircularAxisTick,
}: CircularAxisProps) => {
    const startAngle = originalStartAngle - 90
    const endAngle = originalEndAngle - 90

    const theme = useTheme()

    const { animate, config: springConfig } = useMotionConfig()
    const spring = useSpring<{
        radius: number
        startAngle: number
        endAngle: number
        opacity: number
    }>({
        radius,
        startAngle,
        endAngle,
        opacity: 1,
        immediate: !animate,
        config: springConfig,
    })

    const ticks = useMemo(() => {
        const values = getScaleTicks(scale)

        return values.map((value, index) => ({
            key: index,
            label: value,
            angle: scale(value) - 90,
        }))
    }, [scale])

    const outerRadius = type === 'inner' ? radius - tickSize : radius + tickSize
    const textRadius = type === 'inner' ? outerRadius - tickPadding : outerRadius + tickPadding

    const transition = useTransition<typeof ticks[0], CircularAxisTickAnimatedProps>(ticks, {
        keys: tick => tick.key,
        initial: tick => ({
            ...getLinePositions(tick.angle, radius, outerRadius),
            ...getTextPosition(tick.angle, textRadius),
            opacity: 1,
        }),
        from: tick => ({
            ...getLinePositions(tick.angle, radius, outerRadius),
            ...getTextPosition(tick.angle, textRadius),
            opacity: 0,
        }),
        enter: tick => ({
            ...getLinePositions(tick.angle, radius, outerRadius),
            ...getTextPosition(tick.angle, textRadius),
            opacity: 1,
        }),
        update: tick => ({
            ...getLinePositions(tick.angle, radius, outerRadius),
            ...getTextPosition(tick.angle, textRadius),
            opacity: 1,
        }),
        leave: tick => ({
            ...getLinePositions(tick.angle, radius, outerRadius),
            ...getTextPosition(tick.angle, textRadius),
            opacity: 0,
        }),
        immediate: !animate,
        config: springConfig,
    })

    return (
        <g transform={`translate(${center[0]}, ${center[1]})`}>
            <ArcLine
                animated={spring}
                {...(theme.axis.domain.line as Omit<SVGProps<SVGPathElement>, 'ref'>)}
                fill="none"
            />
            {transition((animatedProps, tick) =>
                createElement(tickComponent, {
                    key: tick.key,
                    label: tick.label,
                    animated: animatedProps,
                })
            )}
        </g>
    )
}
