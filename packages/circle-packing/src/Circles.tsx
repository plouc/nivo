import React, { createElement, useMemo, MouseEvent } from 'react'
import { useTransition, to, SpringValue } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { ComputedDatum, CircleComponent, MouseHandlers, CirclePackingCommonProps } from './types'

/**
 * A negative radius value is invalid for an SVG circle,
 * this custom interpolation makes sure it's either
 * positive or zero.
 */
export const interpolateRadius = (radiusValue: SpringValue<number>) =>
    to([radiusValue], radius => Math.max(0, radius))

type CirclesProps<RawDatum> = {
    nodes: ComputedDatum<RawDatum>[]
    component: CircleComponent<RawDatum>
    isInteractive: CirclePackingCommonProps<RawDatum>['isInteractive']
    tooltip: CirclePackingCommonProps<RawDatum>['tooltip']
} & MouseHandlers<RawDatum>

const getTransitionPhases = <RawDatum,>() => ({
    enter: (node: ComputedDatum<RawDatum>) => ({
        x: node.x,
        y: node.y,
        radius: 0,
        color: node.color,
        opacity: 0,
    }),
    update: (node: ComputedDatum<RawDatum>) => ({
        x: node.x,
        y: node.y,
        radius: node.radius,
        color: node.color,
        opacity: 1,
    }),
    leave: (node: ComputedDatum<RawDatum>) => ({
        x: node.x,
        y: node.y,
        radius: 0,
        color: node.color,
        opacity: 0,
    }),
})

export const Circles = <RawDatum,>({
    nodes,
    component,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
}: CirclesProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useMemo(() => {
        if (!isInteractive) return undefined

        return (node: ComputedDatum<RawDatum>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, node), event)
            onMouseEnter?.(node, event)
        }
    }, [isInteractive, showTooltipFromEvent, tooltip, onMouseEnter])

    const handleMouseMove = useMemo(() => {
        if (!isInteractive) return undefined

        return (node: ComputedDatum<RawDatum>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, node), event)
            onMouseMove?.(node, event)
        }
    }, [isInteractive, showTooltipFromEvent, tooltip, onMouseMove])

    const handleMouseLeave = useMemo(() => {
        if (!isInteractive) return undefined

        return (node: ComputedDatum<RawDatum>, event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(node, event)
        }
    }, [isInteractive, hideTooltip, onMouseLeave])

    const handleClick = useMemo(() => {
        if (!isInteractive) return undefined

        return (node: ComputedDatum<RawDatum>, event: MouseEvent) => {
            onClick?.(node, event)
        }
    }, [isInteractive, onClick])

    const { animate, config: springConfig } = useMotionConfig()

    const transitionPhases = useMemo(() => getTransitionPhases<RawDatum>(), [])

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
        initial: transitionPhases.update,
        from: transitionPhases.enter,
        enter: transitionPhases.update,
        update: transitionPhases.update,
        leave: transitionPhases.leave,
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
                    onMouseEnter: handleMouseEnter,
                    onMouseMove: handleMouseMove,
                    onMouseLeave: handleMouseLeave,
                    onClick: handleClick,
                })
            })}
        </g>
    )
}
