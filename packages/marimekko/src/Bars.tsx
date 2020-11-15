import React from 'react'
import { useTransition, config } from 'react-spring'
import { BarDatum } from './types'
import { Bar } from './Bar'

interface BarsProps<RawDatum> {
    bars: BarDatum<RawDatum>[]
}

export const Bars = <RawDatum,>({ bars }: BarsProps<RawDatum>) => {
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
        config: config.wobbly,
        //immediate: !animate,
    })

    return (
        <>
            {transition((style, bar) => {
                return <Bar<RawDatum> key={bar.key} bar={bar} animatedProps={style} />
            })}
        </>
    )
}
