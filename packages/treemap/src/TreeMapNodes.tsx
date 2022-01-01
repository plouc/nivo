import { createElement, memo } from 'react'
import { useTransition } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { useInteractiveTreeMapNodes } from './hooks'
import {
    ComputedNode,
    NodeMouseEventHandler,
    TreeMapCommonProps,
    TreeMapDatum,
    NodeAnimatedProps,
    NodeComponent,
    ComputedNodeWithHandlers,
} from './types'

const getAnimatedNodeProps = <Datum extends TreeMapDatum>(
    node: ComputedNodeWithHandlers<Datum>
): NodeAnimatedProps => ({
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height,
    color: node.color,
    labelX: node.width / 2,
    labelY: node.height / 2,
    labelRotation: node.labelRotation,
    labelOpacity: 1,
    parentLabelX: node.parentLabelX,
    parentLabelY: node.parentLabelY,
    parentLabelRotation: node.parentLabelRotation,
    parentLabelOpacity: 1,
})

const getEndingAnimatedNodeProps = <Datum extends TreeMapDatum>(
    node: ComputedNodeWithHandlers<Datum>
): NodeAnimatedProps => {
    const x = node.x + node.width / 2
    const y = node.y + node.height / 2

    return {
        x,
        y,
        width: 0,
        height: 0,
        color: node.color,
        labelX: 0,
        labelY: 0,
        labelRotation: node.labelRotation,
        labelOpacity: 0,
        parentLabelX: 0,
        parentLabelY: 0,
        parentLabelRotation: node.parentLabelRotation,
        parentLabelOpacity: 0,
    }
}

interface TreeMapNodesProps<Datum extends TreeMapDatum> {
    nodes: ComputedNode<Datum>[]
    nodeComponent: NodeComponent<Datum>
    borderWidth: TreeMapCommonProps<Datum>['borderWidth']
    enableLabel: TreeMapCommonProps<Datum>['enableLabel']
    labelSkipSize: TreeMapCommonProps<Datum>['labelSkipSize']
    enableParentLabel: TreeMapCommonProps<Datum>['enableParentLabel']
    isInteractive: TreeMapCommonProps<Datum>['isInteractive']
    onMouseEnter?: NodeMouseEventHandler<Datum>
    onMouseMove?: NodeMouseEventHandler<Datum>
    onMouseLeave?: NodeMouseEventHandler<Datum>
    onClick?: NodeMouseEventHandler<Datum>
    tooltip: TreeMapCommonProps<Datum>['tooltip']
}

const NonMemoizedTreeMapNodes = <Datum extends TreeMapDatum>({
    nodes,
    nodeComponent,
    borderWidth,
    enableLabel,
    labelSkipSize,
    enableParentLabel,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
}: TreeMapNodesProps<Datum>) => {
    const nodesWithHandlers = useInteractiveTreeMapNodes<Datum>(nodes, {
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    })

    const { animate, config: springConfig } = useMotionConfig()
    const transition = useTransition<ComputedNodeWithHandlers<Datum>, NodeAnimatedProps>(
        nodesWithHandlers,
        {
            keys: node => node.path,
            initial: getAnimatedNodeProps,
            from: getEndingAnimatedNodeProps,
            enter: getAnimatedNodeProps,
            update: getAnimatedNodeProps,
            leave: getEndingAnimatedNodeProps,
            config: springConfig,
            immediate: !animate,
        }
    )

    return (
        <>
            {transition((animatedProps, node) =>
                createElement(nodeComponent, {
                    key: node.path,
                    node,
                    animatedProps,
                    borderWidth,
                    enableLabel,
                    labelSkipSize,
                    enableParentLabel,
                })
            )}
        </>
    )
}

export const TreeMapNodes = memo(NonMemoizedTreeMapNodes) as typeof NonMemoizedTreeMapNodes
