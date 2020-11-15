import React, { createElement, useMemo, MouseEvent } from 'react'
// import { useTransition } from 'react-spring'
// @ts-ignore
import { useTheme } from '@nivo/core'
import { InheritedColorConfig, useInheritedColor } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { ComputedDatum, DimensionDatum } from './types'
import { BarTooltip } from './BarTooltip'

interface NodesProps<RawDatum> {
    data: ComputedDatum<RawDatum>[]
    borderWidth: number
    borderColor: InheritedColorConfig<DimensionDatum<RawDatum>>
}

interface BarData<RawDatum> extends DimensionDatum<RawDatum> {
    key: string
    borderColor: string
}

export const Bars = <RawDatum,>({ data, borderWidth, borderColor }: NodesProps<RawDatum>) => {
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

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handle = (datum: DimensionDatum<RawDatum>, event: MouseEvent) => {
        showTooltipFromEvent(
            createElement<{ datum: DimensionDatum<RawDatum> }>(BarTooltip, { datum }),
            event
        )
    }

    return (
        <>
            {allBars.map(bar => {
                return (
                    <rect
                        key={bar.key}
                        id={bar.key}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        stroke={bar.borderColor}
                        strokeWidth={borderWidth}
                        onMouseEnter={event => handle(bar, event)}
                        onMouseMove={event => handle(bar, event)}
                        onMouseLeave={hideTooltip}
                    />
                )
            })}
        </>
    )
}
