import React from 'react'
import { useTransition, animated, to, SpringValue } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { ComputedDatum, CircleComponent } from './types'

/**
 * A negative radius value is invalid for an SVG circle,
 * this custom interpolation makes sure it's either
 * positive or zero.
 */
export const interpolateRadius = (radiusValue: SpringValue<number>) =>
    to([radiusValue], radius => Math.max(0, radius))

interface CirclesProps<RawDatum> {
    nodes: ComputedDatum<RawDatum>[]
    component: CircleComponent<RawDatum>
}

export const Circles = <RawDatum,>({ nodes, component }: CirclesProps<RawDatum>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const enter = (node: ComputedDatum<RawDatum>) => ({
        x: node.x,
        y: node.y,
        radius: 0,
        color: node.color,
        opacity: 0,
    })

    const update = (node: ComputedDatum<RawDatum>) => ({
        x: node.x,
        y: node.y,
        radius: node.radius,
        color: node.color,
        opacity: 1,
    })

    const leave = (node: ComputedDatum<RawDatum>) => ({
        x: node.x,
        y: node.y,
        radius: 0,
        color: node.color,
        opacity: 0,
    })

    const transition = useTransition<
        ComputedDatum<RawDatum>,
        {
            x: number
            y: number
            radius: number
            color: string
            opacity: number
        }
    >(data, {
        key: datum => datum.id,
        initial: update,
        from: enter,
        enter: update,
        update,
        leave,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <g>
            {transition((transitionProps, datum) => {
                return (
                    <animated.circle
                        key={datum.id}
                        cx={transitionProps.x}
                        cy={transitionProps.y}
                        r={interpolateRadius(transitionProps.radius)}
                        fill={transitionProps.color}
                        opacity={transitionProps.opacity}
                    />
                )
            })}
        </g>
    )
}
