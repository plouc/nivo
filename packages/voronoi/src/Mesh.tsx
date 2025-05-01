import { useMemo, useRef } from 'react'
import { Margin } from '@nivo/core'
import { TooltipAnchor, TooltipPosition } from '@nivo/tooltip'
import { useVoronoiMesh, useMeshEvents } from './hooks'
import { NodeMouseHandler, NodePositionAccessor, NodeTouchHandler } from './types'
import { defaultMargin, defaultTooltipAnchor, defaultTooltipPosition } from './defaults'

interface MeshProps<Node> {
    nodes: Node[]
    width: number
    height: number
    margin?: Margin
    getNodePosition?: NodePositionAccessor<Node>
    // Can be used in case you want to keep track of the current node externally,
    // the current node being the last hovered node.
    setCurrent?: (node: Node | null) => void
    onMouseEnter?: NodeMouseHandler<Node>
    onMouseMove?: NodeMouseHandler<Node>
    onMouseLeave?: NodeMouseHandler<Node>
    onMouseDown?: NodeMouseHandler<Node>
    onMouseUp?: NodeMouseHandler<Node>
    onClick?: NodeMouseHandler<Node>
    onDoubleClick?: NodeMouseHandler<Node>
    onTouchStart?: NodeTouchHandler<Node>
    onTouchMove?: NodeTouchHandler<Node>
    onTouchEnd?: NodeTouchHandler<Node>
    enableTouchCrosshair?: boolean
    // Restrict the node detection to a given radius, default to `Infinity`.
    detectionRadius?: number
    // If specified, tooltips are going to be handled automatically.
    tooltip?: (node: Node) => JSX.Element
    tooltipPosition?: TooltipPosition
    tooltipAnchor?: TooltipAnchor
    // Display the voronoi mesh for debugging purpose.
    debug?: boolean
}

export const Mesh = <Node,>({
    nodes,
    width,
    height,
    margin = defaultMargin,
    getNodePosition,
    setCurrent,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    enableTouchCrosshair = false,
    detectionRadius = Infinity,
    tooltip,
    tooltipPosition = defaultTooltipPosition,
    tooltipAnchor = defaultTooltipAnchor,
    debug,
}: MeshProps<Node>) => {
    const elementRef = useRef<SVGRectElement | null>(null)

    const { delaunay, voronoi } = useVoronoiMesh<Node>({
        points: nodes,
        getNodePosition,
        width,
        height,
        margin,
        debug,
    })

    const {
        current,
        handleMouseEnter,
        handleMouseMove,
        handleMouseLeave,
        handleMouseDown,
        handleMouseUp,
        handleClick,
        handleDoubleClick,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    } = useMeshEvents<Node, SVGRectElement>({
        elementRef,
        nodes,
        delaunay,
        margin,
        detectionRadius,
        setCurrent,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onMouseDown,
        onMouseUp,
        onClick,
        onDoubleClick,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        enableTouchCrosshair,
        tooltip,
        tooltipPosition,
        tooltipAnchor,
    })

    const voronoiPath = useMemo(() => {
        if (debug && voronoi) return voronoi.render()
        return undefined
    }, [debug, voronoi])

    return (
        <g ref={elementRef} transform={`translate(${-margin.left},${-margin.top})`}>
            {debug && voronoi && (
                <>
                    <path d={voronoiPath} stroke="red" strokeWidth={1} opacity={0.75} />
                    {detectionRadius < Infinity && (
                        <path
                            stroke="red"
                            strokeWidth={0.35}
                            fill="none"
                            d={delaunay.renderPoints(undefined, detectionRadius)}
                        />
                    )}
                    {/* highlight the current cell */}
                    {current && (
                        <path fill="pink" opacity={0.35} d={voronoi.renderCell(current[0])} />
                    )}
                </>
            )}
            {/* transparent rect to intercept mouse events */}
            <rect
                data-ref="mesh-interceptor"
                width={margin.left + width + margin.right}
                height={margin.top + height + margin.bottom}
                fill="red"
                opacity={0}
                style={{ cursor: 'auto' }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
            />
        </g>
    )
}
