import { useMemo } from 'react'
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

    /*
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
    */

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
            onClick={onClick}
            tooltip={renderTooltip}
            tooltipPosition={tooltipPosition}
            tooltipAnchor={tooltipAnchor}
            debug={debug}
        />
    )
}

export const Mesh = memo(NonMemoizedMesh) as typeof NonMemoizedMesh
