import { memo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useAnimatedPath, useMotionConfig, CssMixBlendMode } from '@nivo/core'
import { AreaGenerator, LineDatum } from './types'

const AreaPath = ({
    blendMode,
    opacity,
    color,
    fill,
    path,
}: {
    blendMode: CssMixBlendMode
    opacity: number
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
            fillOpacity={opacity}
            strokeWidth={0}
            style={{
                mixBlendMode: blendMode,
            }}
        />
    )
}

const NonMemoizedAreas = <Datum extends LineDatum>({
    areaGenerator,
    areaOpacity,
    areaBlendMode,
    lines,
}: {
    areaGenerator: AreaGenerator<Datum>
    areaOpacity: number
    areaBlendMode: CssMixBlendMode
    lines: any[]
}) => {
    const computedLines = lines.slice(0).reverse()

    return (
        <g>
            {computedLines.map(line => (
                <AreaPath
                    key={line.id}
                    path={areaGenerator(line.data.map(d => d.position))}
                    opacity={areaOpacity}
                    blendMode={areaBlendMode}
                    {...line}
                />
            ))}
        </g>
    )
}

export const Areas = memo(NonMemoizedAreas) as typeof NonMemoizedAreas
