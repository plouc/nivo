import { memo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { CssMixBlendMode, useAnimatedPath, useMotionConfig } from '@nivo/core'
import { LineSeries, ComputedSeries, AreaGenerator } from './types'

const AreaPath = ({
    areaBlendMode,
    areaOpacity,
    color,
    fill,
    path,
}: {
    areaBlendMode: CssMixBlendMode
    areaOpacity: number
    color: string
    fill?: string
    path: string
}) => {
    const { animate, config: springConfig } = useMotionConfig()

    const animatedPath = useAnimatedPath(path)
    const animatedProps = useSpring({
        color,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.path
            d={animatedPath}
            fill={fill ? fill : animatedProps.color}
            fillOpacity={areaOpacity}
            strokeWidth={0}
            style={{
                mixBlendMode: areaBlendMode,
            }}
        />
    )
}

const NonMemoizedAreas = <Series extends LineSeries>({
    areaGenerator,
    areaOpacity,
    areaBlendMode,
    series,
}: {
    areaGenerator: AreaGenerator
    areaOpacity: number
    areaBlendMode: CssMixBlendMode
    series: readonly ComputedSeries<Series>[]
}) => {
    const reversedSeries = series.slice(0).reverse()

    return (
        <g>
            {reversedSeries.map(seriesItem => (
                <AreaPath
                    key={`${seriesItem.id}`}
                    path={areaGenerator(seriesItem.data.map(d => d.position))!}
                    {...{ areaOpacity, areaBlendMode, ...seriesItem }}
                />
            ))}
        </g>
    )
}

export const Areas = memo(NonMemoizedAreas) as typeof NonMemoizedAreas
