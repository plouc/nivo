/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo } from 'react'
import { LineRadial, lineRadial } from 'd3-shape'
import { useMotionConfig, useAnimatedPath, useTheme, CssMixBlendMode } from '@nivo/core'
import { useInheritedColor, InheritedColor } from '@nivo/colors'
import { RadarSerie, BaseRadarDatum, RadarSerieDatum } from './hooks'
import { useSpring, animated } from 'react-spring'

export interface RadarShapesProps<Datum extends BaseRadarDatum> {
    data: Array<RadarSerie<Datum>>
    shapeGenerator: LineRadial<RadarSerieDatum<Datum>>
    colorByKey: Record<string, string>
    radiusScale: any
    angleStep: number
    curveInterpolator: any
    item: string
    borderWidth: number
    borderColor: InheritedColor
    fillOpacity: number
    blendMode: CssMixBlendMode
}

export function RadarShapes<Datum extends BaseRadarDatum>({
    data,
    item: key,
    colorByKey,
    radiusScale,
    angleStep,
    curveInterpolator,
    borderWidth,
    borderColor,
    fillOpacity,
    blendMode,
}: RadarShapesProps<Datum>) {
    const theme = useTheme()
    const getBorderColor = useInheritedColor(borderColor, theme)

    const lineGenerator = useMemo(() => {
        return lineRadial()
            .radius(d => radiusScale(d))
            .angle((d, i) => i * angleStep)
            .curve(curveInterpolator)
    }, [radiusScale, angleStep, curveInterpolator])

    const { animate, config: springConfig } = useMotionConfig()
    const animatedPath = useAnimatedPath(lineGenerator(data.map(d => d[key])))
    const animatedProps = useSpring({
        fill: colorByKey[key],
        stroke: getBorderColor({ key, color: colorByKey[key] }),
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.path
            key={key}
            d={animatedPath}
            fill={animatedProps.fill}
            fillOpacity={fillOpacity}
            stroke={animatedProps.stroke}
            strokeWidth={borderWidth}
            style={{ mixBlendMode: blendMode }}
        />
    )
}
