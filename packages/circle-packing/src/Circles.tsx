import React from 'react'
import { useTransition, to, SpringValue } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { ComputedDatum, CircleProps } from './types'

/**
 * A negative radius value is invalid for an SVG circle,
 * this custom interpolation makes sure it's either
 * positive or zero.
 */
const interpolateRadius = (radiusValue: SpringValue<number>) =>
    to([radiusValue], radius => Math.max(0, radius))

interface CirclesProps<DefaultRawDatum> {
    nodes: ComputedDatum<DefaultRawDatum>[]
    component: (props: CircleProps<DefaultRawDatum>) => JSX.Element
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
    >(nodes, {
        key: node => node.id,
        initial: update,
        from: enter,
        enter: update,
        update,
        leave,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((transitionProps, node) => {
                return React.createElement(component, {
                    key: node.id,
                    node,
                    style: {
                        ...transitionProps,
                        radius: interpolateRadius(transitionProps.radius),
                    },
                })
            })}
        </>
    )
}
