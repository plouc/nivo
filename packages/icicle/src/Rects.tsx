import { createElement, useCallback, MouseEvent, WheelEvent } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { RectsLayer } from '@nivo/rects'
import { IcicleSvgPropsWithDefaults, ComputedDatum, MouseHandlers } from './types'

export interface RectsProps<Datum> {
    data: ComputedDatum<Datum>[]
    borderRadius: IcicleSvgPropsWithDefaults<Datum>['borderRadius']
    borderWidth: IcicleSvgPropsWithDefaults<Datum>['borderWidth']
    borderColor: IcicleSvgPropsWithDefaults<Datum>['borderColor']
    isInteractive: IcicleSvgPropsWithDefaults<Datum>['isInteractive']
    enableZooming: IcicleSvgPropsWithDefaults<Datum>['enableZooming']
    zoom: (nodePath: string) => void
    onClick?: MouseHandlers<Datum>['onClick']
    onMouseEnter?: MouseHandlers<Datum>['onMouseEnter']
    onMouseLeave?: MouseHandlers<Datum>['onMouseLeave']
    onMouseMove?: MouseHandlers<Datum>['onMouseMove']
    onWheel?: MouseHandlers<Datum>['onWheel']
    onContextMenu?: MouseHandlers<Datum>['onContextMenu']
    tooltip: IcicleSvgPropsWithDefaults<Datum>['tooltip']
}

export const Rects = <Datum,>({
    data,
    borderRadius,
    borderWidth,
    borderColor,
    isInteractive,
    zoom,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onWheel,
    onContextMenu,
    tooltip,
}: RectsProps<Datum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleClick = useCallback(
        (datum: ComputedDatum<Datum>, event: MouseEvent<SVGRectElement>) => {
            onClick?.(datum, event)
            zoom(datum.path)
        },
        [onClick]
    )

    const handleMouseEnter = useCallback(
        (datum: ComputedDatum<Datum>, event: MouseEvent<SVGRectElement>) => {
            showTooltipFromEvent(createElement(tooltip, datum), event)
            onMouseEnter?.(datum, event)
        },
        [showTooltipFromEvent, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (datum: ComputedDatum<Datum>, event: MouseEvent<SVGRectElement>) => {
            showTooltipFromEvent(createElement(tooltip, datum), event)
            onMouseMove?.(datum, event)
        },
        [showTooltipFromEvent, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (datum: ComputedDatum<Datum>, event: MouseEvent<SVGRectElement>) => {
            hideTooltip()
            onMouseLeave?.(datum, event)
        },
        [hideTooltip, onMouseLeave]
    )

    const handleWheel = useCallback(
        (datum: ComputedDatum<Datum>, event: WheelEvent<SVGRectElement>) => {
            onWheel?.(datum, event)
        },
        [onWheel]
    )

    const handleContextMenu = useCallback(
        (datum: ComputedDatum<Datum>, event: MouseEvent<SVGRectElement>) => {
            onContextMenu?.(datum, event)
        },
        [onContextMenu]
    )

    return (
        <RectsLayer<ComputedDatum<Datum>>
            data={data}
            uid="path"
            borderRadius={borderRadius}
            borderWidth={borderWidth}
            borderColor={borderColor}
            onClick={isInteractive ? handleClick : undefined}
            onMouseEnter={isInteractive ? handleMouseEnter : undefined}
            onMouseMove={isInteractive ? handleMouseMove : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onWheel={isInteractive ? handleWheel : undefined}
            onContextMenu={isInteractive ? handleContextMenu : undefined}
        />
    )
}
