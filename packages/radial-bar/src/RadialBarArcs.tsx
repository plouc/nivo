import { createElement, MouseEvent, useCallback } from 'react'
import { ArcsLayer, ArcGenerator } from '@nivo/arcs'
import { useTooltip } from '@nivo/tooltip'
import { ComputedBar, RadialBarCommonProps } from './types'

interface RadialBarArcsProps {
    center: [number, number]
    bars: ComputedBar[]
    arcGenerator: ArcGenerator
    isInteractive: RadialBarCommonProps['isInteractive']
    tooltip: RadialBarCommonProps['tooltip']
    onClick?: RadialBarCommonProps['onClick']
    onMouseEnter?: RadialBarCommonProps['onMouseEnter']
    onMouseMove?: RadialBarCommonProps['onMouseMove']
    onMouseLeave?: RadialBarCommonProps['onMouseLeave']
    transitionMode: RadialBarCommonProps['transitionMode']
}

export const RadialBarArcs = ({
    center,
    bars,
    arcGenerator,
    isInteractive,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    transitionMode,
}: RadialBarArcsProps) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleClick = useCallback(
        (bar: ComputedBar, event: MouseEvent) => {
            onClick?.(bar, event)
        },
        [onClick]
    )

    const handleMouseEnter = useCallback(
        (bar: ComputedBar, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { bar }), event)
            onMouseEnter?.(bar, event)
        },
        [showTooltipFromEvent, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (bar: ComputedBar, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { bar }), event)
            onMouseMove?.(bar, event)
        },
        [showTooltipFromEvent, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (bar: ComputedBar, event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(bar, event)
        },
        [hideTooltip, onMouseLeave]
    )

    return (
        <ArcsLayer<ComputedBar>
            center={center}
            data={bars}
            arcGenerator={arcGenerator}
            borderWidth={0}
            borderColor={'#000000'}
            transitionMode={transitionMode}
            onClick={isInteractive ? handleClick : undefined}
            onMouseEnter={isInteractive ? handleMouseEnter : undefined}
            onMouseMove={isInteractive ? handleMouseMove : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
        />
    )
}
