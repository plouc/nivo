import { animated, to } from '@react-spring/web'
import { InputNode, NodeProps } from './types'

export const NetworkNode = <Node extends InputNode>({
    node,
    animated: animatedProps,
    blendMode,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: NodeProps<Node>) => (
    <animated.circle
        data-testid={`node.${node.id}`}
        transform={to([animatedProps.x, animatedProps.y, animatedProps.scale], (x, y, scale) => {
            return `translate(${x},${y}) scale(${scale})`
        })}
        r={to([animatedProps.size], size => size / 2)}
        fill={animatedProps.color}
        style={{ mixBlendMode: blendMode }}
        strokeWidth={animatedProps.borderWidth}
        stroke={animatedProps.borderColor}
        onClick={onClick ? event => onClick(node, event) : undefined}
        onMouseEnter={onMouseEnter ? event => onMouseEnter(node, event) : undefined}
        onMouseMove={onMouseMove ? event => onMouseMove(node, event) : undefined}
        onMouseLeave={onMouseLeave ? event => onMouseLeave(node, event) : undefined}
    />
)
