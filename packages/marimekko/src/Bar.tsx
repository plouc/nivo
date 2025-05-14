import { createElement, useCallback, MouseEvent } from 'react'
import { animated, SpringValues, to } from '@react-spring/web'
import { useTooltip } from '@nivo/tooltip'
import { BarDatum, MarimekkoCommonProps, MouseEventHandlers } from './types'

interface BarProps<Datum> extends MouseEventHandlers<Datum, SVGRectElement> {
    bar: BarDatum<Datum>
    animatedProps: SpringValues<{
        x: number
        y: number
        width: number
        height: number
        opacity: number
        color: string
        borderColor: string
    }>
    isInteractive: boolean
    tooltip: MarimekkoCommonProps<Datum>['tooltip']
}

export const Bar = <Datum,>({
    bar,
    animatedProps,
    isInteractive,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: BarProps<Datum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const showTooltip = useCallback(
        (event: MouseEvent<SVGRectElement>) =>
            showTooltipFromEvent(createElement(tooltip, { bar }), event),
        [showTooltipFromEvent, tooltip, bar]
    )

    const handleClick = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onClick?.(bar, event)
        },
        [onClick, bar]
    )

    const handleMouseEnter = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onMouseEnter?.(bar, event)
            showTooltip(event)
        },
        [onMouseEnter, showTooltip, bar]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onMouseMove?.(bar, event)
            showTooltip(event)
        },
        [onMouseMove, showTooltip, bar]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            onMouseLeave?.(bar, event)
            hideTooltip()
        },
        [onMouseLeave, bar, hideTooltip]
    )

    return (
        <animated.rect
            x={animatedProps.x}
            y={animatedProps.y}
            width={to(animatedProps.width, value => Math.max(value, 0))}
            height={to(animatedProps.height, value => Math.max(value, 0))}
            fill={bar.fill ?? animatedProps.color}
            stroke={animatedProps.borderColor}
            strokeWidth={bar.borderWidth}
            onClick={isInteractive ? handleClick : undefined}
            onMouseEnter={isInteractive ? handleMouseEnter : undefined}
            onMouseMove={isInteractive ? handleMouseMove : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
        />
    )
}
