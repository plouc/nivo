import { useTooltip } from '@nivo/tooltip'
import { createElement, useMemo } from 'react'
import * as React from 'react'
import { RectsLayer } from '@nivo/rects'
import { IciclesCommonProps, IciclesComputedDatum, IciclesMouseHandlers } from './types'

interface RectsProps<RawDatum> {
    borderColor: IciclesCommonProps<RawDatum>['borderColor']
    borderWidth: IciclesCommonProps<RawDatum>['borderWidth']
    data: IciclesComputedDatum<RawDatum>[]
    isInteractive: IciclesCommonProps<RawDatum>['isInteractive']
    onClick?: IciclesMouseHandlers<RawDatum>['onClick']
    onMouseEnter?: IciclesMouseHandlers<RawDatum>['onMouseEnter']
    onMouseLeave?: IciclesMouseHandlers<RawDatum>['onMouseLeave']
    onMouseMove?: IciclesMouseHandlers<RawDatum>['onMouseMove']
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
    tooltip,
}: RectsProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleClick = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: IciclesComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            onClick?.(datum, event)
        }
    }, [isInteractive, onClick])

    const handleMouseEnter = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: IciclesComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            showTooltipFromEvent(createElement(tooltip, datum), event)
            onMouseEnter?.(datum, event)
        }
    }, [isInteractive, showTooltipFromEvent, tooltip, onMouseEnter])

    const handleMouseMove = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: IciclesComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            showTooltipFromEvent(createElement(tooltip, datum), event)
            onMouseMove?.(datum, event)
        }
    }, [isInteractive, showTooltipFromEvent, tooltip, onMouseMove])

    const handleMouseLeave = useMemo(() => {
        if (!isInteractive) return undefined

        return (datum: IciclesComputedDatum<RawDatum>, event: React.MouseEvent<SVGPathElement>) => {
            hideTooltip()
            onMouseLeave?.(datum, event)
        }
    }, [isInteractive, hideTooltip, onMouseLeave])

    return (
        <RectsLayer<IciclesComputedDatum<RawDatum>>
            data={data}
            borderWidth={borderWidth}
            borderColor={borderColor}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        />
    )
}
