import { createElement, useMemo } from 'react'
import * as React from 'react'
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
    isFocusable: CompletePieSvgProps<RawDatum>['isFocusable']
    onClick?: CompletePieSvgProps<RawDatum>['onClick']
    onMouseEnter?: CompletePieSvgProps<RawDatum>['onMouseEnter']
    onMouseMove?: CompletePieSvgProps<RawDatum>['onMouseMove']
    onMouseLeave?: CompletePieSvgProps<RawDatum>['onMouseLeave']
    onMouseDown?: CompletePieSvgProps<RawDatum>['onMouseDown']
    onMouseUp?: CompletePieSvgProps<RawDatum>['onMouseUp']
    onFocus?: CompletePieSvgProps<RawDatum>['onFocus']
    onBlur?: CompletePieSvgProps<RawDatum>['onBlur']
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
    isFocusable,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
    setActiveId,
    tooltip,
    transitionMode,
}: ArcsProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleFocus = useMemo(() => {
        if (!(isFocusable && isFocusable)) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.FocusEvent<SVGPathElement>) => {
            onFocus?.(datum, event)
        }
    }, [isFocusable, isFocusable , onFocus])

    const handleBlur = useMemo(() => {
        if (!(isInteractive && isFocusable)) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.FocusEvent<SVGPathElement>) => {
            onBlur?.(datum, event)
        }
    }, [isInteractive, isFocusable , onBlur])

    const handleClick = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            onClick?.(datum, event)
        }
    }, [isInteractive, onClick])

    const handleMouseDown = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            onMouseDown?.(datum, event)
        }
    }, [isInteractive, onMouseDown])

    const handleMouseUp = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            onMouseUp?.(datum, event)
        }
    }, [isInteractive, onMouseUp])

    const handleMouseEnter = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            showTooltipFromEvent(createElement(tooltip, { datum }), event)
            setActiveId(datum.id)
            onMouseEnter?.(datum, event)
        }
    }, [isInteractive, showTooltipFromEvent, setActiveId, onMouseEnter, tooltip])

    const handleMouseMove = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            showTooltipFromEvent(createElement(tooltip, { datum }), event)
            onMouseMove?.(datum, event)
        }
    }, [isInteractive, showTooltipFromEvent, onMouseMove, tooltip])

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
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onBlur={handleBlur}
            onFocus={handleFocus}
        />
    )
}
