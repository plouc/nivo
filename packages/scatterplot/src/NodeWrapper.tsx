import { createElement, useCallback } from 'react'
import { CssMixBlendMode } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import {
    ScatterPlotNodeData,
    ScatterPlotNode,
    ScatterPlotCommonProps,
    ScatterPlotDatum,
} from './types'

interface NodeWrapperProps<RawDatum extends ScatterPlotDatum> {
    node: ScatterPlotNodeData<RawDatum>
    renderNode: ScatterPlotNode<RawDatum>
    x: number
    y: number
    size: number
    color: string
    isInteractive: boolean
    onMouseEnter?: ScatterPlotCommonProps<RawDatum>['onMouseEnter']
    onMouseMove?: ScatterPlotCommonProps<RawDatum>['onMouseMove']
    onMouseLeave?: ScatterPlotCommonProps<RawDatum>['onMouseLeave']
    onClick?: ScatterPlotCommonProps<RawDatum>['onClick']
    tooltip: ScatterPlotCommonProps<RawDatum>['tooltip']
    blendMode: CssMixBlendMode
}

export const NodeWrapper = <RawDatum extends ScatterPlotDatum>({
    node,
    renderNode: NodeComponent,
    x,
    y,
    size,
    color,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    blendMode,
}: NodeWrapperProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { node }), event)
            onMouseEnter && onMouseEnter(node, event)
        },
        [node, tooltip, showTooltipFromEvent, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltipFromEvent(createElement(tooltip, { node }), event)
            onMouseMove && onMouseMove(node, event)
        },
        [node, tooltip, showTooltipFromEvent, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        event => {
            hideTooltip()
            onMouseLeave && onMouseLeave(node, event)
        },
        [node, hideTooltip, onMouseLeave]
    )

    const handleClick = useCallback(
        event => {
            onClick && onClick(node, event)
        },
        [node, onClick]
    )

    return createElement(NodeComponent, {
        node,
        x,
        y,
        size,
        color,
        blendMode,
        onMouseEnter: isInteractive ? handleMouseEnter : undefined,
        onMouseMove: isInteractive ? handleMouseMove : undefined,
        onMouseLeave: isInteractive ? handleMouseLeave : undefined,
        onClick: isInteractive && onClick ? handleClick : undefined,
    })
}
