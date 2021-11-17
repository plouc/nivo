import { createElement, useMemo } from 'react'
import { useSpring, useTransition, animated } from '@react-spring/web'
import { useMotionConfig, normalizeAngle } from '@nivo/core'
import { AnyScale, getScaleTicks } from '@nivo/scales'
import { RadialAxisConfig, RadialAxisTickAnimatedProps } from './types'
import { RadialAxisTick } from './RadialAxisTick'

type RadialAxisProps = {
    type: 'start' | 'end'
    center: [number, number]
    angle: number
    scale: AnyScale
} & RadialAxisConfig

export const RadialAxis = ({
    type,
    center,
    angle: rawAngle,
    scale,
    tickSize = 5,
    tickPadding = 5,
    tickRotation: extraRotation = 0,
    tickComponent = RadialAxisTick,
}: RadialAxisProps) => {
    const angle = normalizeAngle(rawAngle)

    let textAnchor: 'start' | 'end'
    let lineX: number
    let textX: number
    let tickRotation: number

    if (type === 'start') {
        tickRotation = 90 + extraRotation
        if (angle <= 90) {
            lineX = -tickSize
            textX = lineX - tickPadding
            textAnchor = 'end'
        } else if (angle < 270) {
            lineX = tickSize
            textX = lineX + tickPadding
            textAnchor = 'start'
            tickRotation -= 180
        } else {
            lineX = -tickSize
            textX = lineX - tickPadding
            textAnchor = 'end'
        }
    } else {
        tickRotation = 90 + extraRotation
        if (angle < 90) {
            lineX = tickSize
            textX = lineX + tickPadding
            textAnchor = 'start'
        } else if (angle < 270) {
            lineX = -tickSize
            textX = lineX - tickPadding
            textAnchor = 'end'
            tickRotation -= 180
        } else {
            lineX = tickSize
            textX = lineX + tickPadding
            textAnchor = 'start'
        }
    }

    const ticks = useMemo(() => {
        const values = getScaleTicks(scale)

        return values.map((value, index) => {
            let position = scale(value) as number
            if ('bandwidth' in scale) {
                position += scale.bandwidth() / 2
            }

            return {
                key: index,
                label: value,
                position,
            }
        })
    }, [scale])

    const { animate, config: springConfig } = useMotionConfig()

    const spring = useSpring<{ rotation: string }>({
        rotation: rawAngle - 90,
        immediate: !animate,
        config: springConfig,
    })

    const transition = useTransition<typeof ticks[0], RadialAxisTickAnimatedProps>(ticks, {
        keys: tick => tick.key,
        initial: tick => ({
            y: tick.position,
            textX,
            rotation: tickRotation,
            length: lineX,
            opacity: 1,
        }),
        from: tick => ({
            y: tick.position,
            textX,
            rotation: tickRotation,
            length: lineX,
            opacity: 0,
        }),
        enter: tick => ({
            y: tick.position,
            textX,
            rotation: tickRotation,
            length: lineX,
            opacity: 1,
        }),
        update: tick => ({
            y: tick.position,
            textX,
            rotation: tickRotation,
            length: lineX,
            opacity: 1,
        }),
        leave: tick => ({
            y: tick.position,
            textX,
            rotation: tickRotation,
            length: lineX,
            opacity: 0,
        }),
        immediate: !animate,
        config: springConfig,
    })

    return (
        <g transform={`translate(${center[0]}, ${center[1]})`}>
            <animated.g transform={spring.rotation.to(value => `rotate(${value})`)}>
                {transition((animatedProps, tick) =>
                    createElement(tickComponent, {
                        key: tick.key,
                        label: tick.label,
                        y: tick.position,
                        textX,
                        rotation: tickRotation,
                        length: lineX,
                        textAnchor,
                        animated: animatedProps,
                    })
                )}
            </animated.g>
        </g>
    )
}
