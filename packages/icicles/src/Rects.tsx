import { useTooltip } from '@nivo/tooltip'
import { createElement, useMemo } from 'react'
import * as React from 'react'
import { RectsLayer } from '@nivo/rects'
import { IciclesCommonProps, ComputedDatum, MouseHandlers } from './types'

export interface RectsProps<RawDatum> {
    borderColor: IciclesCommonProps<RawDatum>['borderColor']
    borderWidth: IciclesCommonProps<RawDatum>['borderWidth']
    data: ComputedDatum<RawDatum>[]
    isInteractive: IciclesCommonProps<RawDatum>['isInteractive']
    onClick?: MouseHandlers<RawDatum>['onClick']
    onMouseEnter?: MouseHandlers<RawDatum>['onMouseEnter']
    onMouseLeave?: MouseHandlers<RawDatum>['onMouseLeave']
    onMouseMove?: MouseHandlers<RawDatum>['onMouseMove']
    onWheel?: MouseHandlers<RawDatum>['onWheel']
    onContextMenu?: MouseHandlers<RawDatum>['onContextMenu']
    tooltip: IciclesCommonProps<RawDatum>['tooltip']
}

export const Rects = <RawDatum,>({
    data,
    borderWidth,
    borderColor,
    isInteractive,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onWheel,
    onContextMenu,
    tooltip,
}: RectsProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleClick = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGRectElement>) => {
            onClick?.(datum, event)
        }
    }, [isInteractive, onClick])

    const handleMouseEnter = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGRectElement>) => {
            showTooltipFromEvent(createElement(tooltip, datum), event)
            onMouseEnter?.(datum, event)
        }
    }, [isInteractive, showTooltipFromEvent, tooltip, onMouseEnter])

    const handleMouseMove = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGRectElement>) => {
            showTooltipFromEvent(createElement(tooltip, datum), event)
            onMouseMove?.(datum, event)
        }
    }, [isInteractive, showTooltipFromEvent, tooltip, onMouseMove])

    const handleMouseLeave = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGRectElement>) => {
            hideTooltip()
            onMouseLeave?.(datum, event)
        }
    }, [isInteractive, hideTooltip, onMouseLeave])

    const handleWheel = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.WheelEvent<SVGRectElement>) => {
            onWheel?.(datum, event)
        }
    }, [isInteractive, onWheel])

    const handleContextMenu = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: ComputedDatum<RawDatum>, event: React.MouseEvent<SVGRectElement>) => {
            onContextMenu?.(datum, event)
        }
    }, [isInteractive, onContextMenu])

    return (
        <RectsLayer<ComputedDatum<RawDatum>>
            data={data}
            borderWidth={borderWidth}
            borderColor={borderColor}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onWheel={handleWheel}
            onContextMenu={handleContextMenu}
        />
    )
}
