import { memo } from 'react'
import { animated, to } from '@react-spring/web'
import { InputLink, InputNode, NodeProps } from './types'

const NonMemoizedNetworkNode = <Node extends InputNode, Link extends InputLink>({
    node,
    animated: animatedProps,
    blendMode,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: NodeProps<Node, Link>) => (
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
        opacity={animatedProps.opacity}
        onClick={onClick ? event => onClick(node, event) : undefined}
        onMouseEnter={onMouseEnter ? event => onMouseEnter(node, event) : undefined}
        onMouseMove={onMouseMove ? event => onMouseMove(node, event) : undefined}
        onMouseLeave={onMouseLeave ? event => onMouseLeave(node, event) : undefined}
    />
)

export const NetworkNode = memo(NonMemoizedNetworkNode) as typeof NonMemoizedNetworkNode
