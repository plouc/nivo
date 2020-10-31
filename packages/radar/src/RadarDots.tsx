/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { ReactElement } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { useTheme, useMotionConfig, getLabelGenerator, DotsItem } from '@nivo/core'
import { InheritedColor, getInheritedColorGenerator } from '@nivo/colors'
import { BaseRadarDatum, RadarSerie } from './hooks'

type RadarLabelAccessor<Datum> = (d: Datum) => string

export type RadarLabel<Datum> = string | RadarLabelAccessor<Datum>

export interface RadarDotsProps<Datum extends BaseRadarDatum> {
    series: Array<RadarSerie<Datum>>
    symbol: ReactElement
    size: number
    color: InheritedColor
    borderWidth: number
    borderColor: InheritedColor
    enableLabel: boolean
    label: RadarLabel<Datum>
    labelFormat?: string
    labelYOffset: number
}

interface ComputedPoint {
    key: string
    label: string | number | null
    style: {
        x: number
        y: number
        fill: string
        stroke: string
    }
    data: {
        index: string | number | Date
        serieId: string
        value: number
        color: string
    }
}

export function RadarDots<Datum extends BaseRadarDatum>({
    series,
    symbol,
    size,
    color,
    borderWidth,
    borderColor,
    enableLabel,
    label,
    labelFormat,
    labelYOffset,
}: RadarDotsProps<Datum>) {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()
    const fillColor = getInheritedColorGenerator(color, theme)
    const strokeColor = getInheritedColorGenerator(borderColor, theme)
    const getLabel = getLabelGenerator(label, labelFormat)

    const points: ComputedPoint[] = series.reduce((acc, serie, i) => {
        serie.data.forEach(datum => {
            const pointData: ComputedPoint['data'] = {
                serieId: serie.id,
                index: datum.data.x,
                value: datum.data.y,
                color: serie.color,
            }
            acc.push({
                key: `${serie.id}.${datum.data.x}`,
                label: enableLabel ? getLabel(pointData) : null,
                style: {
                    fill: fillColor(pointData),
                    stroke: strokeColor(pointData),
                    x: datum.x,
                    y: datum.y,
                },
                data: pointData,
            })
        })

        return acc
    }, [] as ComputedPoint[])

    if (!animate) {
        return (
            <g>
                {points.map(point => (
                    <DotsItem
                        key={point.key}
                        x={point.style.x}
                        y={point.style.y}
                        symbol={symbol as any}
                        size={size}
                        color={point.style.fill}
                        borderWidth={borderWidth}
                        borderColor={point.style.stroke}
                        label={point.label}
                        labelYOffset={labelYOffset}
                        theme={theme}
                        datum={point.data}
                    />
                ))}
            </g>
        )
    }

    return (
        <TransitionMotion
            styles={points.map(point => ({
                key: point.key,
                data: point,
                style: {
                    x: spring(point.style.x, springConfig),
                    y: spring(point.style.y, springConfig),
                    size: spring(size, springConfig),
                },
            }))}
        >
            {(interpolatedStyles: any) => (
                <g>
                    {interpolatedStyles.map(
                        ({
                            key,
                            style,
                            data: point,
                        }: {
                            key: string
                            style: {
                                x: number
                                y: number
                                size: number
                            }
                            data: ComputedPoint
                        }) => (
                            <DotsItem
                                key={key}
                                {...style}
                                symbol={symbol as any}
                                color={point.style.fill}
                                borderWidth={borderWidth}
                                borderColor={point.style.stroke}
                                label={point.label}
                                labelYOffset={labelYOffset}
                                theme={theme}
                                datum={point.data}
                            />
                        )
                    )}
                </g>
            )}
        </TransitionMotion>
    )
}
