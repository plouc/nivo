import { memo, SVGProps, useMemo } from 'react'
import { lineRadial, curveLinearClosed } from 'd3-shape'
import { animated, useSpring, to } from '@react-spring/web'
import { useTheme, useAnimatedPath, useMotionConfig } from '@nivo/core'
import { RadarCommonProps } from './types'

interface RadarGridLevelCircularProps {
    radius: number
}

const RadarGridLevelCircular = memo(({ radius }: RadarGridLevelCircularProps) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        radius,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.circle
            fill="none"
            r={to(animatedProps.radius, value => Math.max(value, 0))}
            {...(theme.grid.line as Omit<SVGProps<SVGCircleElement>, 'ref'>)}
        />
    )
})

interface RadarGridLevelLinearProps {
    radius: number
    angleStep: number
    dataLength: number
}

const RadarGridLevelLinear = ({ radius, angleStep, dataLength }: RadarGridLevelLinearProps) => {
    const theme = useTheme()

    const radarLineGenerator = useMemo(
        () =>
            lineRadial<number>()
                .angle(i => i * angleStep)
                .radius(radius)
                .curve(curveLinearClosed),
        [angleStep, radius]
    )

    const points = Array.from({ length: dataLength }, (_, i) => i)
    const animatedPath = useAnimatedPath(radarLineGenerator(points) as string)

    return (
        <animated.path
            fill="none"
            d={animatedPath}
            {...(theme.grid.line as Omit<SVGProps<SVGPathElement>, 'ref'>)}
        />
    )
}

interface RadarGridLevelsProps<D extends Record<string, unknown>> {
    shape: RadarCommonProps<D>['gridShape']
    radius: number
    angleStep: number
    dataLength: number
}

export const RadarGridLevels = <D extends Record<string, unknown>>({
    shape,
    ...props
}: RadarGridLevelsProps<D>) => {
    return shape === 'circular' ? (
        <RadarGridLevelCircular radius={props.radius} />
    ) : (
        <RadarGridLevelLinear {...props} />
    )
}
