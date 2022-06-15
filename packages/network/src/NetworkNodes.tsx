import { createElement, useCallback, useMemo, MouseEvent } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig, useTooltip } from '@nivo/core'
import { InputNode, ComputedNode, NodeAnimatedProps, NetworkSvgProps, InputLink } from './types'

interface NetworkNodesProps<Node extends InputNode, Link extends InputLink> {
    nodes: ComputedNode<Node>[]
    nodeComponent: NonNullable<NetworkSvgProps<Node, Link>['nodeComponent']>
    onMouseEnter: NetworkSvgProps<Node, Link>['onMouseEnter']
    onMouseMove: NetworkSvgProps<Node, Link>['onMouseMove']
    onMouseLeave: NetworkSvgProps<Node, Link>['onMouseLeave']
    onClick: NetworkSvgProps<Node, Link>['onClick']
    tooltip: NonNullable<NetworkSvgProps<Node, Link>['nodeTooltip']>
    setActiveNodeIds: (nodeIds: string[]) => void
    isInteractive: NonNullable<NetworkSvgProps<Node, Link>['isInteractive']>
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
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    setActiveNodeIds,
    isInteractive,
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

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (node: ComputedNode<Node>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { node }), event)
            setActiveNodeIds([node.id])
            onMouseEnter?.(node, event)
        },
        [showTooltipFromEvent, tooltip, setActiveNodeIds, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (node: ComputedNode<Node>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { node }), event)
            onMouseMove?.(node, event)
        },
        [showTooltipFromEvent, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (node: ComputedNode<Node>, event: MouseEvent) => {
            hideTooltip()
            setActiveNodeIds([])
            onMouseLeave?.(node, event)
        },
        [hideTooltip, setActiveNodeIds, onMouseLeave]
    )

    return (
        <>
            {transition((transitionProps, node) =>
                createElement(nodeComponent, {
                    key: node.id,
                    node,
                    animated: transitionProps,
                    onMouseEnter: isInteractive ? handleMouseEnter : undefined,
                    onMouseMove: isInteractive ? handleMouseMove : undefined,
                    onMouseLeave: isInteractive ? handleMouseLeave : undefined,
                    onClick: isInteractive ? onClick : undefined,
                })
            )}
        </>
    )
}
