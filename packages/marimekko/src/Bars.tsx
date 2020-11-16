import React from 'react'
import { useTransition } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { BarDatum, CommonProps, MouseEventHandlers } from './types'
import { Bar } from './Bar'

interface BarsProps<RawDatum> extends MouseEventHandlers<RawDatum, SVGRectElement> {
    isInteractive: boolean
    bars: BarDatum<RawDatum>[]
    tooltip: CommonProps<RawDatum>['tooltip']
}

export const Bars = <RawDatum,>({
    bars,
    isInteractive,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: BarsProps<RawDatum>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<
        BarDatum<RawDatum>,
        {
            x: number
            y: number
            width: number
            height: number
            color: string
            opacity: number
            borderColor: string
        }
    >(bars, {
        key: bar => bar.key,
        initial: bar => ({
            x: bar.x,
            y: bar.y,
            width: bar.width,
            height: bar.height,
            color: bar.color,
            opacity: 1,
            borderColor: bar.borderColor,
        }),
        from: bar => ({
            x: bar.x,
            y: bar.y,
            width: bar.width,
            height: bar.height,
            color: bar.color,
            opacity: 0,
            borderColor: bar.borderColor,
        }),
        enter: bar => ({
            x: bar.x,
            y: bar.y,
            width: bar.width,
            height: bar.height,
            color: bar.color,
            opacity: 1,
            borderColor: bar.borderColor,
        }),
        update: bar => ({
            x: bar.x,
            y: bar.y,
            width: bar.width,
            height: bar.height,
            color: bar.color,
            opacity: 1,
            borderColor: bar.borderColor,
        }),
        leave: bar => ({
            opacity: 0,
            x: bar.x,
            y: bar.y,
            width: bar.width,
            height: bar.height,
            color: bar.color,
        }),
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((style, bar) => (
                <Bar<RawDatum>
                    key={bar.key}
                    bar={bar}
                    animatedProps={style}
                    isInteractive={isInteractive}
                    tooltip={tooltip}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                />
            ))}
        </>
    )
}
