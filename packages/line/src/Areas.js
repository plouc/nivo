import { memo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useAnimatedPath, useMotionConfig } from '@nivo/core'

const AreaPath = ({ areaBlendMode, areaOpacity, color, fill, path }) => {
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

const Areas = ({ areaGenerator, areaOpacity, areaBlendMode, lines }) => {
    const computedLines = lines.slice(0).reverse()

    return (
        <g>
            {computedLines.map(line => (
                <AreaPath
                    key={line.id}
                    path={areaGenerator(line.data.map(d => d.position))}
                    {...{ areaOpacity, areaBlendMode, ...line }}
                />
            ))}
        </g>
    )
}

export default memo(Areas)
