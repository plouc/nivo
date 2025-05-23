import { animated, useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { BulletNodeTarget } from './types'

interface BulletTargetsLayerProps {
    targets: readonly BulletNodeTarget[]
}

export const BulletTargetsLayer = ({ targets }: BulletTargetsLayerProps) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<
        BulletNodeTarget,
        {
            x0: number
            y0: number
            x1: number
            y1: number
            color: string
        }
    >(targets, {
        keys: target => target.id,
        enter: ({ p0, p1, color }) => ({
            x0: p0.x,
            y0: p0.y,
            x1: p1.x,
            y1: p1.y,
            color,
        }),
        update: ({ p0, p1, color }) => ({
            x0: p0.x,
            y0: p0.y,
            x1: p1.x,
            y1: p1.y,
            color,
        }),
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition(({ x0, y0, x1, y1, color }, marker) => {
                return (
                    <animated.line
                        key={marker.id}
                        x1={x0}
                        y1={y0}
                        x2={x1}
                        y2={y1}
                        strokeWidth={4}
                        stroke={color}
                        fill="none"
                        style={{ pointerEvents: 'none' }}
                    />
                )
            })}
        </>
    )
}
