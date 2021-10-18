import { useMemo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { lineRadial, CurveFactory } from 'd3-shape'
import { ScaleLinear } from 'd3-scale'
import { useMotionConfig, useTheme, useAnimatedPath } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { RadarCommonProps } from './types'

interface RadarLayerProps<D extends Record<string, unknown>> {
    data: D[]
    item: string
    colorByKey: Record<string | number, string>
    fillByKey: Record<string, string | null>
    radiusScale: ScaleLinear<number, number>
    angleStep: number
    curveFactory: CurveFactory
    borderWidth: RadarCommonProps<D>['borderWidth']
    borderColor: RadarCommonProps<D>['borderColor']
    fillOpacity: RadarCommonProps<D>['fillOpacity']
    blendMode: RadarCommonProps<D>['blendMode']
}

export const RadarLayer = <D extends Record<string, unknown>>({
    data,
    item: key,
    colorByKey,
    fillByKey,
    radiusScale,
    angleStep,
    curveFactory,
    borderWidth,
    borderColor,
    fillOpacity,
    blendMode,
}: RadarLayerProps<D>) => {
    const theme = useTheme()
    const getBorderColor = useInheritedColor(borderColor, theme)

    const lineGenerator = useMemo(() => {
        return lineRadial<number>()
            .radius(d => radiusScale(d))
            .angle((_, i) => i * angleStep)
            .curve(curveFactory)
    }, [radiusScale, angleStep, curveFactory])

    const { animate, config: springConfig } = useMotionConfig()
    const animatedPath = useAnimatedPath(lineGenerator(data.map(d => d[key] as number)) as string)
    const animatedProps = useSpring<{ fill: string; stroke: string }>({
        fill: colorByKey[key],
        stroke: getBorderColor({ key, color: colorByKey[key] }),
        config: springConfig,
        immediate: !animate,
    })
    const fill = fillByKey[key] ?? animatedProps.fill

    return (
        <animated.path
            key={key}
            d={animatedPath}
            fill={fill}
            fillOpacity={fillOpacity}
            stroke={animatedProps.stroke}
            strokeWidth={borderWidth}
            style={{ mixBlendMode: blendMode }}
        />
    )
}
