import React, { createElement, useCallback } from 'react'
// @ts-ignore
import { useTooltip } from '@nivo/tooltip'
import { ComputedDatum, CompletePieSvgProps } from './types'

interface PieSliceProps<RawDatum> {
    datum: ComputedDatum<RawDatum>
    path?: string
    borderWidth: CompletePieSvgProps<RawDatum>['borderWidth']
    borderColor: string
    isInteractive: CompletePieSvgProps<RawDatum>['isInteractive']
    tooltip: CompletePieSvgProps<RawDatum>['tooltip']
    onClick: CompletePieSvgProps<RawDatum>['onClick']
    onMouseEnter: CompletePieSvgProps<RawDatum>['onMouseEnter']
    onMouseMove: CompletePieSvgProps<RawDatum>['onMouseMove']
    onMouseLeave: CompletePieSvgProps<RawDatum>['onMouseLeave']
}

export const PieSlice = <RawDatum,>({
    datum,
    path,
    borderWidth,
    borderColor,
    isInteractive,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    tooltip,
}: PieSliceProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleTooltip = useCallback(
        event => showTooltipFromEvent(createElement(tooltip, { datum }), event),
        [showTooltipFromEvent, datum, tooltip]
    )

    const handleMouseEnter = useCallback(
        event => {
            onMouseEnter?.(datum, event)
            handleTooltip(event)
        },
        [onMouseEnter, handleTooltip, datum]
    )

    const handleMouseMove = useCallback(
        event => {
            onMouseMove?.(datum, event)
            handleTooltip(event)
        },
        [onMouseMove, handleTooltip, datum]
    )

    const handleMouseLeave = useCallback(
        event => {
            onMouseLeave?.(datum, event)
            hideTooltip()
        },
        [onMouseLeave, hideTooltip, datum]
    )

    const handleClick = useCallback(
        event => {
            onClick?.(datum, event)
        },
        [onClick, datum]
    )

    return (
        <path
            d={path ?? undefined}
            fill={datum.fill || datum.color}
            strokeWidth={borderWidth}
            stroke={borderColor}
            onMouseEnter={isInteractive ? handleMouseEnter : undefined}
            onMouseMove={isInteractive ? handleMouseMove : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
        />
    )
}
