import { createElement } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { ComputedNode, NodeComponent, NodeMouseEventHandler, NodeTooltip } from './types'

interface NodesProps<Datum extends object> {
    nodes: ComputedNode<Datum>[]
    nodeComponent: NodeComponent<Datum>
    isInteractive: boolean
    onMouseEnter?: NodeMouseEventHandler<Datum>
    onMouseMove?: NodeMouseEventHandler<Datum>
    onMouseLeave?: NodeMouseEventHandler<Datum>
    onClick?: NodeMouseEventHandler<Datum>
    tooltip?: NodeTooltip<Datum>
}

const regularTransition = <Datum extends object>(node: ComputedNode<Datum>) => ({
    x: node.x,
    y: node.y,
})
const leaveTransition = <Datum extends object>(node: ComputedNode<Datum>) => ({
    x: node.x,
    y: node.y,
})

export const Nodes = <Datum extends object>({
    nodes,
    nodeComponent,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
}: NodesProps<Datum>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transition = useTransition<
        ComputedNode<Datum>,
        {
            x: number
            y: number
        }
    >(nodes, {
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
                    onClick,
                    tooltip,
                    animatedProps,
                })
            )}
        </>
    )
}
