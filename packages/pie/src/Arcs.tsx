import React, { createElement, useMemo } from 'react'
import { ArcGenerator, ArcsLayer } from '@nivo/arcs'
import { useTooltip } from '@nivo/tooltip'
import { ComputedDatum, CompletePieSvgProps } from './types'

interface ArcsProps<RawDatum> {
    center: [number, number]
    data: ComputedDatum<RawDatum>[]
    arcGenerator: ArcGenerator
    borderWidth: CompletePieSvgProps<RawDatum>['borderWidth']
    borderColor: CompletePieSvgProps<RawDatum>['borderColor']
    isInteractive: CompletePieSvgProps<RawDatum>['isInteractive']
    onClick?: CompletePieSvgProps<RawDatum>['onClick']
    onMouseEnter?: CompletePieSvgProps<RawDatum>['onMouseEnter']
    onMouseMove?: CompletePieSvgProps<RawDatum>['onMouseMove']
    onMouseLeave?: CompletePieSvgProps<RawDatum>['onMouseLeave']
    setActiveId: (id: null | string | number) => void
    tooltip: CompletePieSvgProps<RawDatum>['tooltip']
    transitionMode: CompletePieSvgProps<RawDatum>['transitionMode']
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
    setActiveId,
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
            showTooltipFromEvent(createElement(tooltip, { datum }), event)
            setActiveId(datum.id)
            onMouseEnter?.(datum, event)
        }
    }, [isInteractive, showTooltipFromEvent, setActiveId, onMouseEnter])

    const handleMouseMove = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            showTooltipFromEvent(createElement(tooltip, { datum }), event)
            onMouseMove?.(datum, event)
        }
    }, [isInteractive, showTooltipFromEvent, onMouseMove])

    const handleMouseLeave = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            hideTooltip()
            setActiveId(null)
            onMouseLeave?.(datum, event)
        }
    }, [isInteractive, hideTooltip, setActiveId, onMouseLeave])

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
