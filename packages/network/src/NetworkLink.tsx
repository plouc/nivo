import { animated } from '@react-spring/web'
import { NetworkInputNode, NetworkLinkProps } from './types'

export const NetworkLink = <N extends NetworkInputNode>({
    link,
    animated: animatedProps,
}: NetworkLinkProps<N>) => {
    return (
        <animated.line
            stroke={animatedProps.color}
            strokeWidth={link.thickness}
            strokeLinecap="round"
            x1={animatedProps.x1}
            y1={animatedProps.y1}
            x2={animatedProps.x2}
            y2={animatedProps.y2}
        />
    )
}
