import { MouseEvent } from 'react'
import { AnimatedProps, animated, to } from '@react-spring/web'
import { ComputedNode, NodeAnimatedProps } from './types'

interface NetworkNodeProps {
    node: ComputedNode
    animated: AnimatedProps<NodeAnimatedProps>
    scale?: number
    onClick?: (node: ComputedNode, event: MouseEvent) => void
    onMouseEnter?: (node: ComputedNode, event: MouseEvent) => void
    onMouseMove?: (node: ComputedNode, event: MouseEvent) => void
    onMouseLeave?: (node: ComputedNode, event: MouseEvent) => void
}

export const NetworkNode = ({
    node,
    animated: animatedProps,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: NetworkNodeProps) => {
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
