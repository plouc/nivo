import { useTransition } from '@react-spring/web'
import { CssMixBlendMode, useMotionConfig } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import {
    ScatterPlotCommonProps,
    ScatterPlotDatum,
    ScatterPlotNode,
    ScatterPlotNodeData,
} from './types'
import { createElement, useCallback } from 'react'

interface NodesProps<RawDatum extends ScatterPlotDatum> {
    nodes: ScatterPlotNodeData<RawDatum>[]
    nodeComponent: ScatterPlotNode<RawDatum>
    isInteractive: boolean
    onMouseEnter?: ScatterPlotCommonProps<RawDatum>['onMouseEnter']
    onMouseMove?: ScatterPlotCommonProps<RawDatum>['onMouseMove']
    onMouseLeave?: ScatterPlotCommonProps<RawDatum>['onMouseLeave']
    onClick?: ScatterPlotCommonProps<RawDatum>['onClick']
    tooltip: ScatterPlotCommonProps<RawDatum>['tooltip']
    blendMode: CssMixBlendMode
}

const getNodeKey = <RawDatum extends ScatterPlotDatum>(node: ScatterPlotNodeData<RawDatum>) =>
    node.id
const regularTransition = <RawDatum extends ScatterPlotDatum>(
    node: ScatterPlotNodeData<RawDatum>
) => ({
    x: node.x,
    y: node.y,
    size: node.size,
    color: node.color,
})
const leaveTransition = <RawDatum extends ScatterPlotDatum>(
    node: ScatterPlotNodeData<RawDatum>
) => ({
    x: node.x,
    y: node.y,
    size: 0,
    color: node.color,
})

export const Nodes = <RawDatum extends ScatterPlotDatum>({
    nodes,
    nodeComponent,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    blendMode,
}: NodesProps<RawDatum>) => {
    const { animate, config: springConfig } = useMotionConfig()
    const transition = useTransition<
        ScatterPlotNodeData<RawDatum>,
        {
            x: number
            y: number
            size: number
            color: string
        }
    >(nodes, {
        keys: getNodeKey,
        from: regularTransition,
        enter: regularTransition,
        update: regularTransition,
        leave: leaveTransition,
        config: springConfig,
        immediate: !animate,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const handleMouseEnter = useCallback(
        (node, event) => {
            showTooltipFromEvent(createElement(tooltip, { node }), event)
            onMouseEnter?.(node, event)
        },
        [tooltip, showTooltipFromEvent, onMouseEnter]
    )
    const handleMouseMove = useCallback(
        (node, event) => {
            showTooltipFromEvent(createElement(tooltip, { node }), event)
            onMouseMove?.(node, event)
        },
        [tooltip, showTooltipFromEvent, onMouseMove]
    )
    const handleMouseLeave = useCallback(
        (node, event) => {
            hideTooltip()
            onMouseLeave?.(node, event)
        },
        [hideTooltip, onMouseLeave]
    )
    const handleClick = useCallback((node, event) => onClick?.(node, event), [onClick])

    return (
        <>
            {transition((style, node) =>
                createElement(nodeComponent, {
                    node,
                    style,
                    blendMode,
                    isInteractive,
                    onMouseEnter: isInteractive ? handleMouseEnter : undefined,
                    onMouseMove: isInteractive ? handleMouseMove : undefined,
                    onMouseLeave: isInteractive ? handleMouseLeave : undefined,
                    onClick: isInteractive ? handleClick : undefined,
                })
            )}
        </>
    )
}
