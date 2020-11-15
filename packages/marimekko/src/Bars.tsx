import React, { useMemo } from 'react'
import { useTransition, config } from 'react-spring'
// @ts-ignore
import { useTheme } from '@nivo/core'
import { InheritedColorConfig, useInheritedColor } from '@nivo/colors'
import { ComputedDatum, DimensionDatum } from './types'
import { Bar } from './Bar'

interface BarsProps<RawDatum> {
    data: ComputedDatum<RawDatum>[]
    borderWidth: number
    borderColor: InheritedColorConfig<DimensionDatum<RawDatum>>
}

interface BarData<RawDatum> extends DimensionDatum<RawDatum> {
    key: string
    borderColor: string
}

export const Bars = <RawDatum,>({ data, borderWidth, borderColor }: BarsProps<RawDatum>) => {
    const theme = useTheme()
    const getBorderColor = useInheritedColor<DimensionDatum<RawDatum>>(borderColor, theme)

    const allBars = useMemo(() => {
        const all: BarData<RawDatum>[] = []
        data.forEach(datum => {
            datum.dimensions.forEach(dimension => {
                all.push({
                    key: `${datum.id}-${dimension.id}`,
                    ...dimension,
                    borderColor: getBorderColor(dimension),
                })
            })
        })

        return all
    }, [data, borderWidth, getBorderColor])

    const transition = useTransition<
        BarData<RawDatum>,
        {
            x: number
            y: number
            width: number
            height: number
            color: string
            opacity: number
            borderColor: string
        }
    >(allBars, {
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
                return (
                    <Bar<RawDatum>
                        key={bar.key}
                        datum={bar}
                        borderWidth={borderWidth}
                        borderColor={bar.borderColor}
                        animatedProps={style}
                    />
                )
            })}
        </>
    )
}
