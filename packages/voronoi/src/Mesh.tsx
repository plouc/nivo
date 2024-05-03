import { useRef, useState, useCallback, useMemo, useEffect, MouseEvent, TouchEvent } from 'react'
import { getRelativeCursor, getDistance } from '@nivo/core'
import { useVoronoiMesh } from './hooks'
import { XYAccessor } from './computeMesh'

type MouseHandler<Datum> = (datum: Datum, event: MouseEvent) => void
type TouchHandler<Datum> = (datum: Datum, event: TouchEvent) => void

interface MeshProps<Datum> {
    nodes: Datum[]
    width: number
    height: number
    x?: XYAccessor<Datum>
    y?: XYAccessor<Datum>
    onMouseEnter?: MouseHandler<Datum>
    onMouseMove?: MouseHandler<Datum>
    onMouseLeave?: MouseHandler<Datum>
    onClick?: MouseHandler<Datum>
    onTouchStart?: TouchHandler<Datum>
    onTouchMove?: TouchHandler<Datum>
    onTouchEnd?: TouchHandler<Datum>
    enableTouchCrosshair?: boolean
    detectionThreshold?: number
    debug?: boolean
}

export const Mesh = <Datum,>({
    nodes,
    width,
    height,
    x,
    y,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    enableTouchCrosshair = false,
    detectionThreshold = Infinity,
    debug,
}: MeshProps<Datum>) => {
    // Used to get the relative cursor position.
    const elementRef = useRef<SVGGElement>(null)
    // Store the index of the current point and the current node.
    const [current, setCurrent] = useState<[number, Datum] | null>(null)
    // Keep track of the previous index and node, this is needed as we don't have enter/leave events
    // for each nodes because we use a single rect element to capture events.
    const previous = useRef<[number, Datum] | null>(null)

    useEffect(() => {
        // Assign the latest current node to the ref, assigning a value to ref doesn't re-render.
        previous.current = current
    }, [current])

    const { delaunay, voronoi } = useVoronoiMesh({
        points: nodes,
        x,
        y,
        width,
        height,
        debug,
    })

    const voronoiPath = useMemo(() => {
        if (debug && voronoi) return voronoi.render()
        return undefined
    }, [debug, voronoi])

    const getIndexAndNodeFromEvent = useCallback(
        (
            event: MouseEvent<SVGRectElement> | TouchEvent<SVGRectElement>
        ): null | [number, Datum] => {
            if (!elementRef.current) return null

            const [x, y] = getRelativeCursor(elementRef.current, event)
            let index: number | null = delaunay.find(x, y)
            let node = index !== undefined ? nodes[index] : null
            if (node && detectionThreshold !== Infinity) {
                if (
                    getDistance(x, y, (node as any).x as number, (node as any).y as number) >
                    detectionThreshold
                ) {
                    index = null
                    node = null
                }
            }

            if (index === null || node === null) return null
            return [index, node]
        },
        [delaunay, nodes, detectionThreshold]
    )

    const handleMouseEnter = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            const match = getIndexAndNodeFromEvent(event)
            setCurrent(match)
            match && onMouseEnter?.(match[1], event)
        },
        [getIndexAndNodeFromEvent, setCurrent, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            const match = getIndexAndNodeFromEvent(event)
            setCurrent(match)

            if (match) {
                const [index, node] = match
                if (previous.current) {
                    const [previousIndex, previousNode] = previous.current
                    if (index !== previousIndex) {
                        // Simulate an enter event if the previous index is different.
                        onMouseLeave?.(previousNode, event)
                    } else {
                        // If it's the same, trigger a regular move event.
                        onMouseMove?.(node, event)
                    }
                } else {
                    onMouseEnter?.(node, event)
                }
            } else {
                if (previous.current) {
                    // Simulate a leave event if there's a previous node.
                    onMouseLeave?.(previous.current[1], event)
                }
            }
        },
        [getIndexAndNodeFromEvent, setCurrent, previous, onMouseEnter, onMouseMove, onMouseLeave]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            setCurrent(null)
            if (onMouseLeave && previous.current) {
                onMouseLeave(previous.current[1], event)
            }
        },
        [setCurrent, previous, onMouseLeave]
    )

    const handleClick = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            const match = getIndexAndNodeFromEvent(event)
            setCurrent(match)
            match && onClick?.(match[1], event)
        },
        [getIndexAndNodeFromEvent, setCurrent, onClick]
    )

    const handleTouchStart = useCallback(
        (event: TouchEvent<SVGRectElement>) => {
            const match = getIndexAndNodeFromEvent(event)
            enableTouchCrosshair && setCurrent(match)
            match && onTouchStart?.(match[1], event)
        },
        [getIndexAndNodeFromEvent, setCurrent, enableTouchCrosshair, onTouchStart]
    )

    const handleTouchMove = useCallback(
        (event: TouchEvent<SVGRectElement>) => {
            const match = getIndexAndNodeFromEvent(event)
            enableTouchCrosshair && setCurrent(match)
            match && onTouchMove?.(match[1], event)
        },
        [getIndexAndNodeFromEvent, setCurrent, enableTouchCrosshair, onTouchMove]
    )

    const handleTouchEnd = useCallback(
        (event: TouchEvent<SVGRectElement>) => {
            enableTouchCrosshair && setCurrent(null)
            if (onTouchEnd && previous.current) {
                onTouchEnd(previous.current[1], event)
            }
        },
        [enableTouchCrosshair, setCurrent, onTouchEnd, previous, nodes]
    )

    return (
        <g ref={elementRef}>
            {debug && voronoi && (
                <>
                    <path d={voronoiPath} stroke="red" strokeWidth={1} opacity={0.75} />
                    {/* highlight the current cell */}
                    {current && (
                        <path fill="pink" opacity={0.35} d={voronoi.renderCell(current[0])} />
                    )}
                </>
            )}
            {/* transparent rect to intercept mouse events */}
            <rect
                data-ref="mesh-interceptor"
                width={width}
                height={height}
                fill="red"
                opacity={0}
                style={{ cursor: 'auto' }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={handleClick}
            />
        </g>
    )
}
