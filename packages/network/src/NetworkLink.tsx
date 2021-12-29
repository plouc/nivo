import { animated } from '@react-spring/web'
import { InputNode, LinkProps } from './types'

export const NetworkLink = <Node extends InputNode>({
    link,
    animated: animatedProps,
    blendMode,
}: LinkProps<Node>) => {
    return (
        <animated.line
            stroke={animatedProps.color}
            style={{ mixBlendMode: blendMode }}
            strokeWidth={link.thickness}
            strokeLinecap="round"
            x1={animatedProps.x1}
            y1={animatedProps.y1}
            x2={animatedProps.x2}
            y2={animatedProps.y2}
        />
    )
}
