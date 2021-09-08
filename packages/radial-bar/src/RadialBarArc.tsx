import { createElement, useCallback, MouseEvent } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { to, AnimatedProps, animated } from '@react-spring/web'
import { ComputedBar, RadialBarCommonProps, RadialBarArcGenerator } from './types'

interface RadialBarArcProps {
    bar: ComputedBar
    arcGenerator: RadialBarArcGenerator
    animated: AnimatedProps<{
        startAngle: number
        endAngle: number
        innerRadius: number
        outerRadius: number
        color: string
    }>
    isInteractive: RadialBarCommonProps['isInteractive']
    tooltip: RadialBarCommonProps['tooltip']
    onClick?: RadialBarCommonProps['onClick']
    onMouseEnter?: RadialBarCommonProps['onMouseEnter']
    onMouseMove?: RadialBarCommonProps['onMouseMove']
    onMouseLeave?: RadialBarCommonProps['onMouseLeave']
}

export const RadialBarArc = ({
    bar,
    arcGenerator,
    animated: animatedProps,
    isInteractive,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: RadialBarArcProps) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleClick = useCallback(
        (event: MouseEvent) => {
            onClick?.(bar, event)
        },
        [onClick]
    )

    const handleMouseEnter = useCallback(
        (event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { bar }), event)
            onMouseEnter?.(bar, event)
        },
        [showTooltipFromEvent, bar, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { bar }), event)
            onMouseMove?.(bar, event)
        },
        [hideTooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(bar, event)
        },
        [hideTooltip, onMouseLeave]
    )

    const path = to(
        [
            animatedProps.startAngle,
            animatedProps.endAngle,
            animatedProps.innerRadius,
            animatedProps.outerRadius,
        ],
        (startAngle, endAngle, innerRadius, outerRadius) => {
            return arcGenerator({
                startAngle,
                endAngle,
                innerRadius,
                outerRadius,
            })
        }
    )

    return (
        <animated.path
            d={path}
            fill={animatedProps.color}
            onClick={isInteractive ? handleClick : undefined}
            onMouseEnter={isInteractive ? handleMouseEnter : undefined}
            onMouseMove={isInteractive ? handleMouseMove : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
        />
    )
}
