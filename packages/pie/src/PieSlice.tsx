import React, { createElement, useCallback } from 'react'
import { animated } from 'react-spring'
import { useTooltip } from '@nivo/tooltip'
import { useAnimatedArc, ArcGenerator } from '@nivo/arcs'
import { ComputedDatum, CompletePieSvgProps } from './types'

interface PieSliceProps<RawDatum> {
    datum: ComputedDatum<RawDatum>
    arcGenerator: ArcGenerator
    path?: string
    borderWidth: CompletePieSvgProps<RawDatum>['borderWidth']
    borderColor: string
    isInteractive: CompletePieSvgProps<RawDatum>['isInteractive']
    tooltip: CompletePieSvgProps<RawDatum>['tooltip']
    onClick: CompletePieSvgProps<RawDatum>['onClick']
    onMouseEnter: CompletePieSvgProps<RawDatum>['onMouseEnter']
    onMouseMove: CompletePieSvgProps<RawDatum>['onMouseMove']
    onMouseLeave: CompletePieSvgProps<RawDatum>['onMouseLeave']
    setActiveId: (id: null | string | number) => void
}

export const PieSlice = <RawDatum,>({
    datum,
    arcGenerator,
    borderWidth,
    borderColor,
    isInteractive,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    tooltip,
    setActiveId,
}: PieSliceProps<RawDatum>) => {
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

    const animatedArc = useAnimatedArc(datum, arcGenerator)

    return (
        <animated.path
            d={animatedArc.path}
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
