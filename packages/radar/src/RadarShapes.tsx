import { useMemo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { lineRadial, CurveFactory } from 'd3-shape'
import { ScaleLinear } from 'd3-scale'
import { useMotionConfig, useTheme, useAnimatedPath } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { RadarCommonProps } from './types'

interface RadarShapesProps<D extends Record<string, unknown>> {
    data: D[]
    item: string | number
    colorByKey: Record<string | number, string>
    radiusScale: ScaleLinear<number, number>
    angleStep: number
    curveFactory: CurveFactory
    borderWidth: RadarCommonProps['borderWidth']
    borderColor: RadarCommonProps['borderColor']
    fillOpacity: RadarCommonProps['fillOpacity']
    blendMode: RadarCommonProps['blendMode']
}

export const RadarShapes = <D extends Record<string, unknown>>({
    data,
    item: key,
    colorByKey,
    radiusScale,
    angleStep,
    curveFactory,
    borderWidth,
    borderColor,
    fillOpacity,
    blendMode,
}: RadarShapesProps<D>) => {
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
