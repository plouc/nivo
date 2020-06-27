/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { CSSProperties, memo, useMemo } from 'react'
import { lineRadial } from 'd3-shape'
import { useSprings, animated, SpringConfig } from 'react-spring'
import { useMotionConfig, useTheme, CssMixBlendMode } from '@nivo/core'
import { useInheritedColor, InheritedColor } from '@nivo/colors'
import { RadarSerie, BaseRadarDatum } from './hooks'

export interface RadarShapesProps<Datum extends BaseRadarDatum> {
    series: Array<RadarSerie<Datum>>
    radiusScale: any
    angleStep: any
    curveInterpolator: any
    borderWidth: number
    borderColor: InheritedColor
    fillOpacity: number
    blendMode: CssMixBlendMode
}

export const RadarShapes = memo(
    <Datum extends BaseRadarDatum>({
        series,
        radiusScale,
        angleStep,
        curveInterpolator,
        borderWidth,
        borderColor,
        fillOpacity,
        blendMode,
    }: RadarShapesProps<Datum>) => {
        const theme = useTheme()
        const getBorderColor = useInheritedColor(borderColor, theme)

        const lineGenerator = useMemo(() => {
            return lineRadial()
                .radius(d => radiusScale(d))
                .angle((_d, i) => i * angleStep)
                .curve(curveInterpolator)
        }, [radiusScale, angleStep, curveInterpolator])

        const { animate, config: springConfig } = useMotionConfig()
        const springs = useSprings<
            {
                path: string | null
                fill: string
                stroke: string
                config?: Record<string, unknown> | SpringConfig
                immediate: boolean
            },
            CSSProperties & { path: string }
        >(
            series.length,
            series.map(serie => ({
                path: lineGenerator(serie as any),
                fill: serie.color,
                stroke: getBorderColor({ key: serie.id, color: serie.color }),
                config: springConfig,
                immediate: !animate,
            }))
        )

        return (
            <>
                {springs.map((animatedProps, index) => {
                    const key = series[index].id

                    return (
                        <animated.path
                            key={key}
                            d={animatedProps.path}
                            fill={animatedProps.fill}
                            fillOpacity={fillOpacity}
                            stroke={animatedProps.stroke}
                            strokeWidth={borderWidth}
                            style={{ mixBlendMode: blendMode }}
                        />
                    )
                })}
            </>
        )
    }
)

RadarShapes.displayName = 'RadarShapes'
