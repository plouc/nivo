import { createElement, useMemo, MouseEvent } from 'react'
import * as React from 'react'
import { useTransition, to, SpringValue } from '@react-spring/web'
import { useMotionConfig, useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
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
    borderWidth: CirclePackingCommonProps<RawDatum>['borderWidth']
    borderColor: CirclePackingCommonProps<RawDatum>['borderColor']
    component: CircleComponent<RawDatum>
    isInteractive: CirclePackingCommonProps<RawDatum>['isInteractive']
    tooltip: CirclePackingCommonProps<RawDatum>['tooltip']
} & MouseHandlers<RawDatum>

const getTransitionPhases = <RawDatum,>(
    getBorderColor: (node: ComputedDatum<RawDatum>) => string
) => ({
    enter: (node: ComputedDatum<RawDatum>) => ({
        x: node.x,
        y: node.y,
        radius: 0,
        color: node.color,
        borderColor: getBorderColor(node),
        opacity: 0,
    }),
    update: (node: ComputedDatum<RawDatum>) => ({
        x: node.x,
        y: node.y,
        radius: node.radius,
        color: node.color,
        borderColor: getBorderColor(node),
        opacity: 1,
    }),
    leave: (node: ComputedDatum<RawDatum>) => ({
        x: node.x,
        y: node.y,
        radius: 0,
        color: node.color,
        borderColor: getBorderColor(node),
        opacity: 0,
    }),
})

export const Circles = <RawDatum,>({
    nodes,
    borderWidth,
    borderColor,
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

    const theme = useTheme()
    const getBorderColor = useInheritedColor<ComputedDatum<RawDatum>>(borderColor, theme)

    const transitionPhases = useMemo(
        () => getTransitionPhases<RawDatum>(getBorderColor),
        [getBorderColor]
    )

    const transition = useTransition<
        ComputedDatum<RawDatum>,
        {
            x: number
            y: number
            radius: number
            color: string
            borderColor: string
            opacity: number
        }
    >(nodes, {
        keys: node => node.id,
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
                        borderWidth,
                    },
                    onMouseEnter: handleMouseEnter,
                    onMouseMove: handleMouseMove,
                    onMouseLeave: handleMouseLeave,
                    onClick: handleClick,
                })
            })}
        </>
    )
}
