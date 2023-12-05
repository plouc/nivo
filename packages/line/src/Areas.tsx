import { useSpring, animated } from '@react-spring/web'
import { useAnimatedPath, useMotionConfig, CssMixBlendMode } from '@nivo/core'
import { AreaGenerator, ComputedSeries, LineSeries } from './types'

interface AreaPathProps {
    areaBlendMode: CssMixBlendMode
    areaOpacity: number
    color: string
    fill?: string
    path: string
}

const AreaPath = ({ areaBlendMode, areaOpacity, color, fill, path }: AreaPathProps) => {
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

interface AreasProps<Series extends LineSeries> {
    areaGenerator: AreaGenerator
    areaOpacity: number
    areaBlendMode: CssMixBlendMode
    lines: readonly ComputedSeries<Series>[]
}

export const Areas = <Series extends LineSeries>({
    areaGenerator,
    areaOpacity,
    areaBlendMode,
    lines,
}: AreasProps<Series>) => {
    const computedLines = lines.slice(0).reverse()

    return (
        <g>
            {computedLines.map(line => (
                <AreaPath
                    key={line.id}
                    path={areaGenerator(line.data.map(d => d.position)) as string}
                    {...{ areaOpacity, areaBlendMode, ...line }}
                />
            ))}
        </g>
    )
}
