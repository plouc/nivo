import { animated, to } from '@react-spring/web'
import { NetworkInputNode, NetworkNodeProps } from './types'

export const NetworkNode = <N extends NetworkInputNode>({
    node,
    animated: animatedProps,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: NetworkNodeProps<N>) => {
    return (
        <animated.circle
            transform={to(
                [animatedProps.x, animatedProps.y, animatedProps.scale],
                (x, y, scale) => {
                    return `translate(${x},${y}) scale(${scale})`
                }
            )}
            r={animatedProps.radius}
            fill={animatedProps.color}
            strokeWidth={animatedProps.borderWidth}
            stroke={animatedProps.borderColor}
            onClick={onClick ? event => onClick(node, event) : undefined}
            onMouseEnter={onMouseEnter ? event => onMouseEnter(node, event) : undefined}
            onMouseMove={onMouseMove ? event => onMouseMove(node, event) : undefined}
            onMouseLeave={onMouseLeave ? event => onMouseLeave(node, event) : undefined}
        />
    )
}
