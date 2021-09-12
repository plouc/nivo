import { AnimatedProps, animated } from '@react-spring/web'
import { ComputedLink, NetworkInputNode } from './types'

interface NetworkLinkProps<N extends NetworkInputNode> {
    link: ComputedLink<N>
    thickness: number
    animated: AnimatedProps<{
        x1: number
        y1: number
        x2: number
        y2: number
        color: string
    }>
}

export const NetworkLink = <N extends NetworkInputNode>({
    thickness,
    animated: animatedProps,
}: NetworkLinkProps<N>) => {
    return (
        <animated.line
            stroke={animatedProps.color}
            strokeWidth={thickness}
            strokeLinecap="round"
            x1={animatedProps.x1}
            y1={animatedProps.y1}
            x2={animatedProps.x2}
            y2={animatedProps.y2}
        />
    )
}
