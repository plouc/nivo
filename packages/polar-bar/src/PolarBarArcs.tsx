import { createElement, MouseEvent, useCallback } from 'react'
import { ArcsLayer, ArcGenerator } from '@nivo/arcs'
import { useTooltip } from '@nivo/tooltip'
import { PolarBarSvgProps, PolarBarDatum, PolarBarComputedDatum } from './types'

interface PolarBarArcsProps<RawDatum extends PolarBarDatum> {
    center: [number, number]
    arcs: any[]
    borderWidth: Exclude<PolarBarSvgProps<RawDatum>['borderWidth'], undefined>
    borderColor: Exclude<PolarBarSvgProps<RawDatum>['borderColor'], undefined>
    arcGenerator: ArcGenerator
    isInteractive: PolarBarSvgProps<RawDatum>['isInteractive']
    tooltip: Exclude<PolarBarSvgProps<RawDatum>['tooltip'], undefined>
    onClick?: PolarBarSvgProps<RawDatum>['onClick']
    onMouseEnter?: PolarBarSvgProps<RawDatum>['onMouseEnter']
    onMouseMove?: PolarBarSvgProps<RawDatum>['onMouseMove']
    onMouseLeave?: PolarBarSvgProps<RawDatum>['onMouseLeave']
    transitionMode: Exclude<PolarBarSvgProps<RawDatum>['transitionMode'], undefined>
}

export const PolarBarArcs = <RawDatum extends PolarBarDatum>({
    center,
    arcs,
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
}: PolarBarArcsProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleClick = useCallback(
        (arc: PolarBarComputedDatum, event: MouseEvent) => {
            onClick?.(arc, event)
        },
        [onClick]
    )

    const handleMouseEnter = useCallback(
        (arc: PolarBarComputedDatum, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { arc }), event)
            onMouseEnter?.(arc, event)
        },
        [showTooltipFromEvent, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (arc: PolarBarComputedDatum, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { arc }), event)
            onMouseMove?.(arc, event)
        },
        [showTooltipFromEvent, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (arc: PolarBarComputedDatum, event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(arc, event)
        },
        [hideTooltip, onMouseLeave]
    )

    return (
        <ArcsLayer<PolarBarComputedDatum>
            center={center}
            data={arcs}
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
