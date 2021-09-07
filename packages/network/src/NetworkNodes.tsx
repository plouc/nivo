import { createElement, MouseEvent } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { NetworkNode } from './NetworkNode'
import { ComputedNode, NodeAnimatedProps } from './types'

interface NetworkNodesProps {
    nodes: ComputedNode[]
    color: (node: ComputedNode) => string
    borderWidth: number
    borderColor: (node: ComputedNode) => string
    onClick?: (node: ComputedNode, event: MouseEvent) => void
    onMouseEnter?: (node: ComputedNode, event: MouseEvent) => void
    onMouseMove?: (node: ComputedNode, event: MouseEvent) => void
    onMouseLeave?: (node: ComputedNode, event: MouseEvent) => void
}

export const NetworkNodes = ({
    nodes,
    color,
    borderColor,
    borderWidth,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
}: NetworkNodesProps) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<ComputedNode, NodeAnimatedProps>(nodes, {
        keys: node => node.id,
        initial: node => ({
            x: node.x,
            y: node.y,
            radius: node.radius,
            color: color(node),
            borderWidth,
            borderColor: borderColor(node),
            scale: 1,
        }),
        enter: node => ({
            x: node.x,
            y: node.y,
            radius: node.radius,
            color: color(node),
            borderWidth,
            borderColor: borderColor(node),
            scale: 1,
        }),
        update: node => ({
            x: node.x,
            y: node.y,
            radius: node.radius,
            color: color(node),
            borderWidth,
            borderColor: borderColor(node),
            scale: 1,
        }),
        leave: node => ({
            x: node.x,
            y: node.y,
            radius: node.radius,
            color: color(node),
            borderWidth,
            borderColor: borderColor(node),
            scale: 0,
        }),
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((transitionProps, node) =>
                createElement(NetworkNode, {
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
