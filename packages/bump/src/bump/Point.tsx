import { SVGAttributes } from 'react'
import { useSpring, animated, to } from '@react-spring/web'
import { useMotionConfig } from '@bitbloom/nivo-core'
import { BumpDatum, BumpPoint, BumpSerieExtraProps } from './types'

const pointStyle: SVGAttributes<SVGCircleElement>['style'] = { pointerEvents: 'none' }

interface PointProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> {
    point: BumpPoint<Datum, ExtraProps>
}

export const Point = <Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>({
    point,
}: PointProps<Datum, ExtraProps>) => {
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
        radius: point.size / 2,
        color: point.color,
        borderWidth: point.borderWidth,
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
