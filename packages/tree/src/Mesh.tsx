import { useCallback, useMemo, MouseEvent } from 'react'
import { createElement, memo } from 'react'
import { Margin } from '@nivo/core'
import { TooltipAnchor, TooltipPosition } from '@nivo/tooltip'
import { Mesh as BaseMesh } from '@nivo/voronoi'
import { ComputedNode, CurrentNodeSetter, NodeMouseEventHandler, NodeTooltip } from './types'

interface MeshProps<Datum> {
    nodes: ComputedNode<Datum>[]
    width: number
    height: number
    margin: Margin
    onMouseEnter?: NodeMouseEventHandler<Datum>
    onMouseMove?: NodeMouseEventHandler<Datum>
    onMouseLeave?: NodeMouseEventHandler<Datum>
    onClick?: NodeMouseEventHandler<Datum>
    setCurrentNode: CurrentNodeSetter<Datum>
    toggleNode: (node: ComputedNode<Datum>) => void
    tooltip?: NodeTooltip<Datum>
    tooltipPosition?: TooltipPosition
    tooltipAnchor?: TooltipAnchor
    detectionRadius: number
    debug: boolean
}

const NonMemoizedMesh = <Datum,>({
    nodes,
    width,
    height,
    margin,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    setCurrentNode,
    toggleNode,
    tooltip,
    tooltipPosition,
    tooltipAnchor,
    detectionRadius,
    debug,
}: MeshProps<Datum>) => {
    const renderTooltip = useMemo(() => {
        if (!tooltip) return undefined
        return (node: ComputedNode<Datum>) => createElement(tooltip, { node })
    }, [tooltip])

    const handleClick = useCallback(
        (node: ComputedNode<Datum>, event: MouseEvent) => {
            if (!node.isLeaf) toggleNode(node)
            onClick?.(node, event)
        },
        [onClick, toggleNode]
    )

    return (
        <BaseMesh<ComputedNode<Datum>>
            nodes={nodes}
            width={width}
            height={height}
            margin={margin}
            detectionRadius={detectionRadius}
            setCurrent={setCurrentNode}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={handleClick}
            tooltip={renderTooltip}
            tooltipPosition={tooltipPosition}
            tooltipAnchor={tooltipAnchor}
            debug={debug}
        />
    )
}

export const Mesh = memo(NonMemoizedMesh) as typeof NonMemoizedMesh
