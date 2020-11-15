import React, { createElement, MouseEvent } from 'react'
import { animated, SpringValues, to } from 'react-spring'
import { useTooltip } from '@nivo/tooltip'
import { BarDatum } from './types'
import { BarTooltip } from './BarTooltip'

interface BarProps<RawDatum> {
    bar: BarDatum<RawDatum>
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

export const Bar = <RawDatum,>({ bar, animatedProps }: BarProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handle = (event: MouseEvent) => {
        showTooltipFromEvent(
            createElement<{ bar: BarDatum<RawDatum> }>(BarTooltip, { bar }),
            event
        )
    }

    return (
        <animated.rect
            x={animatedProps.x}
            y={animatedProps.y}
            width={to(animatedProps.width, value => Math.max(value, 0))}
            height={to(animatedProps.height, value => Math.max(value, 0))}
            fill={animatedProps.color}
            stroke={animatedProps.borderColor}
            strokeWidth={bar.borderWidth}
            onMouseEnter={handle}
            onMouseMove={handle}
            onMouseLeave={hideTooltip}
        />
    )
}
