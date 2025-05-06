import { createElement, useCallback, MouseEvent } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { RectsLayer } from '@nivo/rects'
import { IcicleSvgPropsWithDefaults, ComputedDatum, EventHandlers } from './types'

export interface RectsProps<Datum> {
    data: ComputedDatum<Datum>[]
    component: IcicleSvgPropsWithDefaults<Datum>['nodeComponent']
    borderRadius: IcicleSvgPropsWithDefaults<Datum>['borderRadius']
    borderWidth: IcicleSvgPropsWithDefaults<Datum>['borderWidth']
    borderColor: IcicleSvgPropsWithDefaults<Datum>['borderColor']
    isInteractive: IcicleSvgPropsWithDefaults<Datum>['isInteractive']
    enableZooming: IcicleSvgPropsWithDefaults<Datum>['enableZooming']
    zoom: (nodePath: string) => void
    onClick?: EventHandlers<Datum>['onClick']
    onMouseEnter?: EventHandlers<Datum>['onMouseEnter']
    onMouseLeave?: EventHandlers<Datum>['onMouseLeave']
    onMouseMove?: EventHandlers<Datum>['onMouseMove']
    onWheel?: EventHandlers<Datum>['onWheel']
    onContextMenu?: EventHandlers<Datum>['onContextMenu']
    tooltip: IcicleSvgPropsWithDefaults<Datum>['tooltip']
    transitionMode: IcicleSvgPropsWithDefaults<Datum>['rectsTransitionMode']
}

export const Rects = <Datum,>({
    data,
    component,
    borderRadius,
    borderWidth,
    borderColor,
    isInteractive,
    enableZooming,
    zoom,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onWheel,
    onContextMenu,
    tooltip,
    transitionMode,
}: RectsProps<Datum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleClick = useCallback(
        (datum: ComputedDatum<Datum>, event: MouseEvent) => {
            onClick?.(datum, event)
            if (enableZooming) zoom(datum.path)
        },
        [onClick, enableZooming, zoom]
    )

    const handleMouseEnter = useCallback(
        (datum: ComputedDatum<Datum>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, datum), event)
            onMouseEnter?.(datum, event)
        },
        [showTooltipFromEvent, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (datum: ComputedDatum<Datum>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, datum), event)
            onMouseMove?.(datum, event)
        },
        [showTooltipFromEvent, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (datum: ComputedDatum<Datum>, event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(datum, event)
        },
        [hideTooltip, onMouseLeave]
    )

    const getTestId = useCallback((datum: ComputedDatum<Datum>) => `icicle.rect.${datum.path}`, [])

    return (
        <RectsLayer<ComputedDatum<Datum>>
            data={data}
            component={component}
            uid="path"
            borderRadius={borderRadius}
            borderWidth={borderWidth}
            borderColor={borderColor}
            isInteractive={isInteractive}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onContextMenu={onContextMenu}
            onWheel={onWheel}
            getTestId={getTestId}
            transitionMode={transitionMode}
        />
    )
}
