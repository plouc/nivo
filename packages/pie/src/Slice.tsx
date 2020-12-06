import React, { createElement, useCallback } from 'react'
import { animated, Interpolation } from 'react-spring'
import { useTooltip } from '@nivo/tooltip'
import { ComputedDatum, CompletePieSvgProps } from './types'

interface SliceProps<RawDatum> {
    datum: ComputedDatum<RawDatum>
    path: string | Interpolation<string>
    borderWidth: number
    borderColor: string
    isInteractive: boolean
    tooltip: CompletePieSvgProps<RawDatum>['tooltip']
    onClick: CompletePieSvgProps<RawDatum>['onClick']
    onMouseEnter: CompletePieSvgProps<RawDatum>['onMouseEnter']
    onMouseMove: CompletePieSvgProps<RawDatum>['onMouseMove']
    onMouseLeave: CompletePieSvgProps<RawDatum>['onMouseLeave']
    setActiveId: (id: null | string | number) => void
}

export const Slice = <RawDatum,>({
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
    setActiveId,
}: SliceProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleTooltip = useCallback(
        event => showTooltipFromEvent(createElement(tooltip, { datum }), event),
        [showTooltipFromEvent, datum, tooltip]
    )

    const handleMouseEnter = useCallback(
        event => {
            onMouseEnter?.(datum, event)
            setActiveId(datum.id)
            handleTooltip(event)
        },
        [onMouseEnter, setActiveId, handleTooltip, datum]
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
            setActiveId(null)
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
        <animated.path
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
