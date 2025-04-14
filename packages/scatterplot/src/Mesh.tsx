import { createElement, useCallback, MouseEvent } from 'react'
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
    onMouseDown?: ScatterPlotCommonProps<RawDatum>['onMouseDown']
    onMouseUp?: ScatterPlotCommonProps<RawDatum>['onMouseUp']
    onClick?: ScatterPlotCommonProps<RawDatum>['onClick']
    onDoubleClick?: ScatterPlotCommonProps<RawDatum>['onDoubleClick']
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
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
    tooltip,
    debug,
}: MeshProps<RawDatum>) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (node: ScatterPlotNodeData<RawDatum>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { node }), event)
            onMouseEnter && onMouseEnter(node, event)
        },
        [showTooltipFromEvent, tooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (node: ScatterPlotNodeData<RawDatum>, event: MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, { node }), event)
            onMouseMove && onMouseMove(node, event)
        },
        [showTooltipFromEvent, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (node: ScatterPlotNodeData<RawDatum>, event: MouseEvent) => {
            hideTooltip()
            onMouseLeave && onMouseLeave(node, event)
        },
        [hideTooltip, onMouseLeave]
    )

    const handleMouseDown = useCallback(
        (node: ScatterPlotNodeData<RawDatum>, event: MouseEvent) => {
            onMouseDown && onMouseDown(node, event)
        },
        [onMouseDown]
    )

    const handleMouseUp = useCallback(
        (node: ScatterPlotNodeData<RawDatum>, event: MouseEvent) => {
            onMouseUp && onMouseUp(node, event)
        },
        [onMouseUp]
    )

    const handleClick = useCallback(
        (node: ScatterPlotNodeData<RawDatum>, event: MouseEvent) => {
            onClick && onClick(node, event)
        },
        [onClick]
    )

    const handleDoubleClick = useCallback(
        (node: ScatterPlotNodeData<RawDatum>, event: MouseEvent) => {
            onDoubleClick && onDoubleClick(node, event)
        },
        [onDoubleClick]
    )

    return (
        <BaseMesh
            nodes={nodes}
            width={width}
            height={height}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            debug={debug}
        />
    )
}
