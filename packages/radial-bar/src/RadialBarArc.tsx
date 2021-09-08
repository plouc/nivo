import { Arc } from 'd3-shape'
import { to, AnimatedProps, animated } from '@react-spring/web'
import { ComputedDatum } from './types'

interface RadialBarArcProps {
    bar: ComputedDatum
    arcGenerator: Arc<unknown, ComputedDatum>
    animated: AnimatedProps<{
        startAngle: number
        endAngle: number
        innerRadius: number
        outerRadius: number
        color: string
    }>
}

export const RadialBarArc = ({ arcGenerator, animated: animatedProps }: RadialBarArcProps) => {
    const path = to(
        [
            animatedProps.startAngle,
            animatedProps.endAngle,
            animatedProps.innerRadius,
            animatedProps.outerRadius,
        ],
        (startAngle, endAngle, innerRadius, outerRadius) => {
            return arcGenerator({
                startAngle,
                endAngle,
                innerRadius,
                outerRadius,
            })
        }
    )

    return <animated.path d={path} fill={animatedProps.color} />
}
