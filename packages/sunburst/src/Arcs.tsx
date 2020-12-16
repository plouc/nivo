import React, { createElement, useMemo } from 'react'
import { ArcGenerator, ArcsLayer } from '@nivo/arcs'
import { ComputedDatum, CompleteSvgProps } from './types'
import { useTooltip } from '@nivo/tooltip'

interface ArcsProps<RawDatum> {
    center: [number, number]
    data: ComputedDatum<RawDatum>[]
    arcGenerator: ArcGenerator
    borderWidth: CompleteSvgProps<RawDatum>['borderWidth']
    borderColor: CompleteSvgProps<RawDatum>['borderColor']
    isInteractive: CompleteSvgProps<RawDatum>['isInteractive']
    onClick?: CompleteSvgProps<RawDatum>['onClick']
    onMouseEnter?: CompleteSvgProps<RawDatum>['onMouseEnter']
    onMouseMove?: CompleteSvgProps<RawDatum>['onMouseMove']
    onMouseLeave?: CompleteSvgProps<RawDatum>['onMouseLeave']
    tooltip: CompleteSvgProps<RawDatum>['tooltip']
    transitionMode: CompleteSvgProps<RawDatum>['transitionMode']
}

export const Arcs = <RawDatum,>({
    center,
    data,
    arcGenerator,
    borderWidth,
    borderColor,
    isInteractive,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    tooltip,
    transitionMode,
}: ArcsProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleClick = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            onClick?.(datum, event)
        }
    }, [isInteractive, onClick])

    const handleMouseEnter = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            showTooltipFromEvent(createElement(tooltip, datum), event)
            onMouseEnter?.(datum, event)
        }
    }, [isInteractive, showTooltipFromEvent, onMouseEnter])

    const handleMouseMove = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            showTooltipFromEvent(createElement(tooltip, datum), event)
            onMouseMove?.(datum, event)
        }
    }, [isInteractive, showTooltipFromEvent, onMouseMove])

    const handleMouseLeave = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            hideTooltip()
            onMouseLeave?.(datum, event)
        }
    }, [isInteractive, hideTooltip, onMouseLeave])

    return (
        <ArcsLayer<ComputedDatum<RawDatum>>
            center={center}
            data={data}
            arcGenerator={arcGenerator}
            borderWidth={borderWidth}
            borderColor={borderColor}
            transitionMode={transitionMode}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        />
    )
}
