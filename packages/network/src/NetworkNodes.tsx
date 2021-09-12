import { createElement, MouseEvent, useMemo } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import {
    NetworkComputedNode,
    NetworkInputNode,
    NetworkNodeAnimatedProps,
    NetworkNodeColor,
    NetworkNodeComponent,
} from './types'

interface NetworkNodesProps<N extends NetworkInputNode> {
    nodes: NetworkComputedNode<N>[]
    nodeComponent: NetworkNodeComponent<N>
    color: Exclude<NetworkNodeColor<N>, string>
    borderWidth: number
    borderColor: (node: NetworkComputedNode<N>) => string
    onClick?: (node: NetworkComputedNode<N>, event: MouseEvent) => void
    onMouseEnter?: (node: NetworkComputedNode<N>, event: MouseEvent) => void
    onMouseMove?: (node: NetworkComputedNode<N>, event: MouseEvent) => void
    onMouseLeave?: (node: NetworkComputedNode<N>, event: MouseEvent) => void
}

const getEnterTransition = <N extends NetworkInputNode>(
    color: NetworkNodesProps<N>['color'],
    borderWidth: number,
    borderColor: NetworkNodesProps<N>['borderColor']
) => (node: NetworkComputedNode<N>) => ({
    x: node.x,
    y: node.y,
    radius: node.radius,
    color: color(node),
    borderWidth,
    borderColor: borderColor(node),
    scale: 0,
})

const getRegularTransition = <N extends NetworkInputNode>(
    color: NetworkNodesProps<N>['color'],
    borderWidth: number,
    borderColor: NetworkNodesProps<N>['borderColor']
) => (node: NetworkComputedNode<N>) => ({
    x: node.x,
    y: node.y,
    radius: node.radius,
    color: color(node),
    borderWidth,
    borderColor: borderColor(node),
    scale: 1,
})

const getExitTransition = <N extends NetworkInputNode>(
    color: NetworkNodesProps<N>['color'],
    borderWidth: number,
    borderColor: NetworkNodesProps<N>['borderColor']
) => (node: NetworkComputedNode<N>) => ({
    x: node.x,
    y: node.y,
    radius: node.radius,
    color: color(node),
    borderWidth,
    borderColor: borderColor(node),
    scale: 0,
})

export const NetworkNodes = <N extends NetworkInputNode>({
    nodes,
    nodeComponent,
    color,
    borderColor,
    borderWidth,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: NetworkNodesProps<N>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const [enterTransition, regularTransition, exitTransition] = useMemo(
        () => [
            getEnterTransition(color, borderWidth, borderColor),
            getRegularTransition(color, borderWidth, borderColor),
            getExitTransition(color, borderWidth, borderColor),
        ],
        [color, borderWidth, borderColor]
    )

    const transition = useTransition<NetworkComputedNode<N>, NetworkNodeAnimatedProps>(nodes, {
        keys: node => node.id,
        initial: regularTransition,
        from: enterTransition,
        enter: regularTransition,
        update: regularTransition,
        leave: exitTransition,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((transitionProps, node) =>
                createElement(nodeComponent, {
                    key: node.id,
                    node,
                    animated: transitionProps,
                    onClick,
                    onMouseEnter,
                    onMouseMove,
                    onMouseLeave,
                })
            )}
        </>
    )
}
