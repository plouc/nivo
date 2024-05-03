import { MouseEvent } from 'react'
import { createElement, memo, useCallback } from 'react'
import { Margin } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
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
    tooltip?: NodeTooltip<Datum>
    detectionThreshold: number
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
    tooltip,
    detectionThreshold,
    debug,
}: MeshProps<Datum>) => {
    const { showTooltipAt, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (node: ComputedNode<Datum>, event: MouseEvent) => {
            setCurrentNode(node)
            if (tooltip !== undefined) {
                showTooltipAt(
                    createElement(tooltip, { node }),
                    [node.x + margin.left, node.y ?? 0 + margin.top],
                    'top'
                )
            }
            onMouseEnter && onMouseEnter(node, event)
        },
        [showTooltipAt, tooltip, margin.left, margin.top, setCurrentNode, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (node: ComputedNode<Datum>, event: MouseEvent) => {
            setCurrentNode(node)
            if (tooltip !== undefined) {
                showTooltipAt(
                    createElement(tooltip, { node }),
                    [node.x + margin.left, node.y ?? 0 + margin.top],
                    'top'
                )
            }
            onMouseMove && onMouseMove(node, event)
        },
        [showTooltipAt, tooltip, margin.left, margin.top, setCurrentNode, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (node: ComputedNode<Datum>, event: MouseEvent) => {
            setCurrentNode(null)
            hideTooltip()
            onMouseLeave && onMouseLeave(node, event)
        },
        [hideTooltip, setCurrentNode, onMouseLeave]
    )

    const handleClick = useCallback(
        (node: ComputedNode<Datum>, event: MouseEvent) => {
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
            detectionThreshold={detectionThreshold}
            debug={debug}
        />
    )
}

export const Mesh = memo(NonMemoizedMesh) as typeof NonMemoizedMesh
