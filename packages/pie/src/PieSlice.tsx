import React, { createElement, useCallback } from 'react'
// @ts-ignore
import { useTooltip } from '@nivo/tooltip'
import { ComputedDatum, CompletePieSvgProps } from './types'

interface PieSliceProps<R> {
    datum: ComputedDatum<R>
    path: string
    borderWidth: CompletePieSvgProps<R>['borderWidth']
    borderColor: string
    isInteractive: CompletePieSvgProps<R>['isInteractive']
    tooltip: CompletePieSvgProps<R>['tooltip']
    onClick: CompletePieSvgProps<R>['onClick']
    onMouseEnter: CompletePieSvgProps<R>['onMouseEnter']
    onMouseMove: CompletePieSvgProps<R>['onMouseMove']
    onMouseLeave: CompletePieSvgProps<R>['onMouseLeave']
}

// prettier-ignore
export const PieSlice = <R, >({
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
}: PieSliceProps<R>) => {
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
            hideTooltip(event)
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
            d={path}
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
