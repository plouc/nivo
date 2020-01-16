/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { LineRadial } from 'd3-shape'
import { useMotionConfig, SmartMotion, useTheme, CssMixBlendMode } from '@nivo/core'
import { useInheritedColor, InheritedColor } from '@nivo/colors'
import { RadarSerie, BaseRadarDatum } from './hooks'

export interface RadarShapesProps<Datum extends BaseRadarDatum> {
    series: Array<RadarSerie<Datum>>
    shapeGenerator: LineRadial<any>
    borderWidth: number
    borderColor: InheritedColor
    fillOpacity: number
    blendMode: CssMixBlendMode
}

export function RadarShapes<Datum extends BaseRadarDatum>({
    series,
    shapeGenerator,
    borderWidth,
    borderColor,
    fillOpacity,
    blendMode,
}: RadarShapesProps<Datum>) {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()
    const getBorderColor = useInheritedColor(borderColor, theme)

    if (!animate) {
        return (
            <g>
                {series.map(serie => (
                    <path
                        key={serie.id}
                        d={shapeGenerator(serie.data) as string}
                        fill={serie.color}
                        fillOpacity={fillOpacity}
                        stroke={getBorderColor(serie)}
                        strokeWidth={borderWidth}
                        style={{ mixBlendMode: blendMode }}
                    />
                ))}
            </g>
        )
    }

    return (
        <g>
            {series.map(serie => (
                <SmartMotion
                    key={serie.id}
                    style={(spring: any) => ({
                        d: spring(shapeGenerator(serie.data), springConfig),
                        fill: spring(serie.color, springConfig),
                        stroke: spring(
                            getBorderColor(serie),
                            springConfig
                        ),
                    })}
                >
                    {(style: { d: string; fill: string; stroke: string }) => (
                        <path
                            fillOpacity={fillOpacity}
                            strokeWidth={borderWidth}
                            style={{ mixBlendMode: blendMode }}
                            {...style}
                        />
                    )}
                </SmartMotion>
            ))}
        </g>
    )
}
