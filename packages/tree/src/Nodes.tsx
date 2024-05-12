import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { Margin, useMotionConfig } from '@nivo/core'
import { TooltipAnchor, TooltipPosition } from '@nivo/tooltip'
import {
    ComputedNode,
    CurrentNodeSetter,
    NodeComponent,
    NodeMouseEventHandler,
    NodeTooltip,
    NodeAnimatedProps,
    NodesMap,
} from './types'
import { getFirstRemainingAncestorOrSelf, getPreviousCollapsedAncestorOrSelf } from './hooks'

interface NodesProps<Datum> {
    nodes: ComputedNode<Datum>[]
    nodeByUid: NodesMap<Datum>
    nodeComponent: NodeComponent<Datum>
    isInteractive: boolean
    onMouseEnter?: NodeMouseEventHandler<Datum>
    onMouseMove?: NodeMouseEventHandler<Datum>
    onMouseLeave?: NodeMouseEventHandler<Datum>
    onClick?: NodeMouseEventHandler<Datum>
    setCurrentNode: CurrentNodeSetter<Datum>
    toggleNode: (node: ComputedNode<Datum>) => void
    tooltip?: NodeTooltip<Datum>
    tooltipPosition: TooltipPosition
    tooltipAnchor: TooltipAnchor
    margin: Margin
}

const enterTransition =
    <Datum,>(previousCollapsedNodes: NodesMap<Datum>) =>
    (node: ComputedNode<Datum>): NodeAnimatedProps => {
        const ancestor = getPreviousCollapsedAncestorOrSelf(node, previousCollapsedNodes)

        return {
            x: ancestor.x,
            y: ancestor.y,
            size: node.size,
            color: node.color,
        }
    }

const regularTransition = <Datum,>(node: ComputedNode<Datum>): NodeAnimatedProps => ({
    x: node.x,
    y: node.y,
    size: node.size,
    color: node.color,
})

const leaveTransition =
    <Datum,>(nodeByUid: NodesMap<Datum>) =>
    (node: ComputedNode<Datum>): NodeAnimatedProps => {
        const ancestor = getFirstRemainingAncestorOrSelf(node, nodeByUid)

        return {
            x: ancestor.x,
            y: ancestor.y,
            size: node.size,
            color: node.color,
        }
    }

export const Nodes = <Datum,>({
    nodes,
    nodeByUid,
    nodeComponent,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    setCurrentNode,
    toggleNode,
    tooltip,
    tooltipPosition,
    tooltipAnchor,
    margin,
}: NodesProps<Datum>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<ComputedNode<Datum>, NodeAnimatedProps>(nodes, {
        keys: node => node.uid,
        initial: regularTransition,
        // from: enterTransition<Datum>(previousCollapsedNodes.current),
        enter: regularTransition,
        update: regularTransition,
        leave: leaveTransition<Datum>(nodeByUid),
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((animatedProps, node) => {
                return createElement(nodeComponent, {
                    node,
                    isInteractive,
                    onMouseEnter,
                    onMouseMove,
                    onMouseLeave,
                    onClick,
                    setCurrentNode,
                    toggleNode,
                    tooltip,
                    tooltipPosition,
                    tooltipAnchor,
                    margin,
                    animatedProps,
                })
            })}
        </>
    )
}
