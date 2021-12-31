import { createElement, MouseEvent, useMemo } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import {
    InputNode,
    ComputedNode,
    NodeAnimatedProps,
    NodeComponent,
    NetworkSvgProps,
    InputLink,
} from './types'

interface NetworkNodesProps<Node extends InputNode, Link extends InputLink> {
    nodes: ComputedNode<Node>[]
    nodeComponent: NodeComponent<Node, Link>
    blendMode: NonNullable<NetworkSvgProps<Node, Link>['nodeBlendMode']>
    onClick?: (node: ComputedNode<Node>, event: MouseEvent) => void
    onMouseEnter?: (node: ComputedNode<Node>, event: MouseEvent) => void
    onMouseMove?: (node: ComputedNode<Node>, event: MouseEvent) => void
    onMouseLeave?: (node: ComputedNode<Node>, event: MouseEvent) => void
}

const getEnterTransition =
    <Node extends InputNode>() =>
    (node: ComputedNode<Node>) => ({
        x: node.x,
        y: node.y,
        size: node.size,
        color: node.color,
        borderWidth: node.borderWidth,
        borderColor: node.borderColor,
        scale: 0,
        opacity: 0,
    })

const getRegularTransition =
    <N extends InputNode>() =>
    (node: ComputedNode<N>) => ({
        x: node.x,
        y: node.y,
        size: node.size,
        color: node.color,
        borderWidth: node.borderWidth,
        borderColor: node.borderColor,
        scale: 1,
        opacity: 1,
    })

const getExitTransition =
    <Node extends InputNode>() =>
    (node: ComputedNode<Node>) => ({
        x: node.x,
        y: node.y,
        size: node.size,
        color: node.color,
        borderWidth: node.borderWidth,
        borderColor: node.borderColor,
        scale: 0,
        opacity: 0,
    })

export const NetworkNodes = <Node extends InputNode, Link extends InputLink>({
    nodes,
    nodeComponent,
    blendMode,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: NetworkNodesProps<Node, Link>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const [enterTransition, regularTransition, exitTransition] = useMemo(
        () => [getEnterTransition<Node>(), getRegularTransition<Node>(), getExitTransition<Node>()],
        []
    )

    const transition = useTransition<ComputedNode<Node>, NodeAnimatedProps>(nodes, {
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
                    blendMode,
                    onClick,
                    onMouseEnter,
                    onMouseMove,
                    onMouseLeave,
                })
            )}
        </>
    )
}
