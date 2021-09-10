import { animated, to, AnimatedProps } from '@react-spring/web'
import { ExtractProps } from '@nivo/core'
import { generateSvgArc } from './utils'

type ArcLineProps = {
    animated: AnimatedProps<{
        radius: number
        startAngle: number
        endAngle: number
        opacity: number
    }>
} & ExtractProps<typeof animated.path>

export const ArcLine = ({ animated: animatedProps, ...rest }: ArcLineProps) => (
    <animated.path
        d={to(
            [animatedProps.radius, animatedProps.startAngle, animatedProps.endAngle],
            (radius, start, end) => generateSvgArc(radius, start, end)
        )}
        {...rest}
    />
)
