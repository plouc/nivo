import { createElement, useCallback } from 'react'
import { useTooltip } from '@nivo/tooltip'
import { Mesh as BaseMesh } from '@nivo/voronoi'
import { ScatterPlotCommonProps, ScatterPlotDatum, ScatterPlotNodeData } from './types'

interface MeshProps<RawDatum extends ScatterPlotDatum> {
    nodes: ScatterPlotNodeData<RawDatum>[]
    width: number
    height: number
    onMouseEnter?: ScatterPlotCommonProps<RawDatum>['onMouseEnter']
    onMouseMove?: ScatterPlotCommonProps<RawDatum>['onMouseMove']
    onMouseLeave?: ScatterPlotCommonProps<RawDatum>['onMouseLeave']
    onClick?: ScatterPlotCommonProps<RawDatum>['onClick']
    tooltip: ScatterPlotCommonProps<RawDatum>['tooltip']
    debug: boolean
}

export const Mesh = <RawDatum extends ScatterPlotDatum>({
    nodes,
    width,
    height,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    debug,
}: MeshProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (node: ScatterPlotNodeData<RawDatum>, event) => {
            showTooltipFromEvent(createElement(tooltip, { node }), event)
            onMouseEnter && onMouseEnter(node, event)
        },
        [showTooltipFromEvent, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (node: ScatterPlotNodeData<RawDatum>, event) => {
            showTooltipFromEvent(createElement(tooltip, { node }), event)
            onMouseMove && onMouseMove(node, event)
        },
        [showTooltipFromEvent, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (node: ScatterPlotNodeData<RawDatum>, event) => {
            hideTooltip()
            onMouseLeave && onMouseLeave(node, event)
        },
        [hideTooltip, onMouseLeave]
    )

    const handleClick = useCallback(
        (node: ScatterPlotNodeData<RawDatum>, event) => {
            onClick && onClick(node, event)
        },
        [onClick]
    )

    return (
        <BaseMesh
            nodes={nodes}
            width={width}
            height={height}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            debug={debug}
        />
    )
}
