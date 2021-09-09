import { SVGProps } from 'react'
import { ScaleBand, ScaleLinear } from 'd3-scale'
import { useTransition, animated } from '@react-spring/web'
import { useMotionConfig, useTheme } from '@nivo/core'

interface PolarGridProps {
    center: [number, number]
    enableAngles: boolean
    enableRadii: boolean
    angleScale: ScaleLinear<number, number>
    radiusScale: ScaleBand<string>
}

export const PolarGrid = ({ center, angleScale, radiusScale, enableAngles }: PolarGridProps) => {
    // const radiuses = radiusScale.ticks()
    const innerRadius = Math.min(...radiusScale.range())
    const outerRadius = Math.max(...radiusScale.range())

    const angleValues = angleScale.ticks()
    const angles = angleValues.map((angleValue, index) => ({
        id: index,
        angle: angleScale(angleValue) - 90,
    }))

    const theme = useTheme()

    const { animate, config: springConfig } = useMotionConfig()

    const anglesTransition = useTransition<
        { id: number; angle: number },
        { angle: number; opacity: number }
    >(angles, {
        keys: item => item.id,
        from: item => ({
            angle: item.angle,
            opacity: 1,
        }),
        update: item => ({
            angle: item.angle,
            opacity: 1,
        }),
        config: springConfig,
        immediate: !animate,
    })

    return (
        <g transform={`translate(${center[0]},${center[1]})`}>
            {enableAngles && (
                <>
                    {anglesTransition((style, angle) => {
                        return (
                            <animated.g
                                key={angle.id}
                                transform={style.angle.to(v => `rotate(${v})`)}
                            >
                                <line
                                    x1={innerRadius}
                                    x2={outerRadius}
                                    {...(theme.grid.line as SVGProps<SVGLineElement>)}
                                />
                            </animated.g>
                        )
                    })}
                </>
            )}
        </g>
    )
}
