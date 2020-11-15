import React, { createElement, MouseEvent } from 'react'
import { animated, SpringValues } from 'react-spring'
import { useTooltip } from '@nivo/tooltip'
import { DimensionDatum } from './types'
import { BarTooltip } from './BarTooltip'

interface BarProps<RawDatum> {
    datum: DimensionDatum<RawDatum>
    borderWidth: number
    borderColor: string
    animatedProps: SpringValues<{
        x: number
        y: number
        width: number
        height: number
        opacity: number
        color: string
        borderColor: string
    }>
}

export const Bar = <RawDatum,>({ datum, borderWidth, animatedProps }: BarProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handle = (event: MouseEvent) => {
        showTooltipFromEvent(
            createElement<{ datum: DimensionDatum<RawDatum> }>(BarTooltip, { datum }),
            event
        )
    }

    return (
        <animated.rect
            x={animatedProps.x}
            y={animatedProps.y}
            width={animatedProps.width}
            height={animatedProps.height}
            fill={animatedProps.color}
            stroke={animatedProps.borderColor}
            strokeWidth={borderWidth}
            onMouseEnter={handle}
            onMouseMove={handle}
            onMouseLeave={hideTooltip}
        />
    )
}
