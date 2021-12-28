import { SVGAttributes } from 'react'
import { useSpring, animated, to } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { BumpDatum, BumpPoint } from './types'

const pointStyle: SVGAttributes<SVGCircleElement>['style'] = { pointerEvents: 'none' }

interface PointProps<D extends BumpDatum> {
    point: BumpPoint<D>
}

export const Point = <D extends BumpDatum>({ point }: PointProps<D>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring<{
        x: number
        y: number
        radius: number
        color: string
        borderWidth: number
    }>({
        x: point.x,
        y: point.y,
        radius: point.style.size / 2,
        color: point.color,
        borderWidth: point.style.borderWidth,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.circle
            data-testid={`point.${point.serie.id}.${point.data.x}`}
            cx={animatedProps.x}
            cy={animatedProps.y}
            r={to(animatedProps.radius, v => Math.max(v, 0))}
            fill={animatedProps.color}
            strokeWidth={animatedProps.borderWidth}
            stroke={point.borderColor}
            style={pointStyle}
        />
    )
}
