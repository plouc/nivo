import { createElement, MouseEvent, useCallback } from 'react'
import { ArcsLayer, ArcGenerator } from '@nivo/arcs'
import { useTooltip } from '@nivo/tooltip'
import { ComputedBar, RadialBarCommonProps, RadialBarDatum } from './types'

interface RadialBarArcsProps<D extends RadialBarDatum> {
    center: [number, number]
    bars: ComputedBar<D>[]
    borderWidth: RadialBarCommonProps<D>['borderWidth']
    borderColor: RadialBarCommonProps<D>['borderColor']
    arcGenerator: ArcGenerator
    isInteractive: RadialBarCommonProps<D>['isInteractive']
    tooltip: RadialBarCommonProps<D>['tooltip']
    onClick?: RadialBarCommonProps<D>['onClick']
    onMouseEnter?: RadialBarCommonProps<D>['onMouseEnter']
    onMouseMove?: RadialBarCommonProps<D>['onMouseMove']
    onMouseLeave?: RadialBarCommonProps<D>['onMouseLeave']
    transitionMode: RadialBarCommonProps<D>['transitionMode']
}

export const RadialBarArcs = <D extends RadialBarDatum>({
    center,
    bars,
    borderWidth,
    borderColor,
    arcGenerator,
    isInteractive,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    transitionMode,
}: RadialBarArcsProps<D>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleClick = useCallback(
        (bar: ComputedBar<D>, event: MouseEvent) => {
            onClick?.(bar, event)
        },
        [onClick]
    )

    const handleMouseEnter = useCallback(
        (bar: ComputedBar<D>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { bar }), event)
            onMouseEnter?.(bar, event)
        },
        [showTooltipFromEvent, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (bar: ComputedBar<D>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { bar }), event)
            onMouseMove?.(bar, event)
        },
        [showTooltipFromEvent, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (bar: ComputedBar<D>, event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(bar, event)
        },
        [hideTooltip, onMouseLeave]
    )

    return (
        <ArcsLayer<ComputedBar<D>>
            center={center}
            data={bars}
            arcGenerator={arcGenerator}
            borderWidth={borderWidth}
            borderColor={borderColor}
            transitionMode={transitionMode}
            onClick={isInteractive ? handleClick : undefined}
            onMouseEnter={isInteractive ? handleMouseEnter : undefined}
            onMouseMove={isInteractive ? handleMouseMove : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
        />
    )
}
