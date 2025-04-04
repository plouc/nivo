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
} from './types'

interface NodesProps<Datum> {
    nodes: ComputedNode<Datum>[]
    nodeComponent: NodeComponent<Datum>
    isInteractive: boolean
    onMouseEnter?: NodeMouseEventHandler<Datum>
    onMouseMove?: NodeMouseEventHandler<Datum>
    onMouseLeave?: NodeMouseEventHandler<Datum>
    onMouseDown?: NodeMouseEventHandler<Datum>
    onMouseUp?: NodeMouseEventHandler<Datum>
    onClick?: NodeMouseEventHandler<Datum>
    onDoubleClick?: NodeMouseEventHandler<Datum>
    setCurrentNode: CurrentNodeSetter<Datum>
    tooltip?: NodeTooltip<Datum>
    tooltipPosition: TooltipPosition
    tooltipAnchor: TooltipAnchor
    margin: Margin
}

const regularTransition = <Datum,>(node: ComputedNode<Datum>): NodeAnimatedProps => ({
    x: node.x,
    y: node.y,
    size: node.size,
    color: node.color,
})
const leaveTransition = <Datum,>(node: ComputedNode<Datum>): NodeAnimatedProps => ({
    x: node.x,
    y: node.y,
    size: 0,
    color: node.color,
})

export const Nodes = <Datum,>({
    nodes,
    nodeComponent,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
    setCurrentNode,
    tooltip,
    tooltipPosition,
    tooltipAnchor,
    margin,
}: NodesProps<Datum>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<ComputedNode<Datum>, NodeAnimatedProps>(nodes, {
        keys: node => node.uid,
        from: regularTransition,
        enter: regularTransition,
        update: regularTransition,
        leave: leaveTransition,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {transition((animatedProps, node) =>
                createElement(nodeComponent, {
                    node,
                    isInteractive,
                    onMouseEnter,
                    onMouseMove,
                    onMouseLeave,
                    onMouseDown,
                    onMouseUp,
                    onClick,
                    onDoubleClick,
                    setCurrentNode,
                    tooltip,
                    tooltipPosition,
                    tooltipAnchor,
                    margin,
                    animatedProps,
                })
            )}
        </>
    )
}
