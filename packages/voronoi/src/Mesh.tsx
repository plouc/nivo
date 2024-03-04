import { useRef, useState, useCallback, useMemo, MouseEvent, TouchEvent } from 'react'
import { getRelativeCursor } from '@nivo/core'
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
    debug,
}: MeshProps<Datum>) => {
    const elementRef = useRef<SVGGElement>(null)
    const [currentIndex, setCurrentIndex] = useState<number | null>(null)

    const { delaunay, voronoi } = useVoronoiMesh({
        points: nodes,
        x,
        y,
        width,
        height,
        debug,
    })

    const voronoiPath = useMemo(() => {
        if (debug && voronoi) {
            return voronoi.render()
        }

        return undefined
    }, [debug, voronoi])

    const getIndexAndNodeFromMouseEvent = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            if (!elementRef.current) {
                return [null, null]
            }

            const [x, y] = getRelativeCursor(elementRef.current, event)
            const index = delaunay.find(x, y)

            return [index, index !== undefined ? nodes[index] : null] as [number, Datum | null]
        },
        [delaunay, nodes]
    )

    const getIndexAndNodeFromTouchEvent = useCallback(
        (event: TouchEvent<SVGRectElement>) => {
            if (!elementRef.current) {
                return [null, null]
            }

            const [x, y] = getRelativeCursor(elementRef.current, event)
            const index = delaunay.find(x, y)

            return [index, index !== undefined ? nodes[index] : null] as [number, Datum | null]
        },
        [delaunay, nodes]
    )

    const handleMouseEnter = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            const [index, node] = getIndexAndNodeFromMouseEvent(event)
            setCurrentIndex(index)
            if (node) {
                onMouseEnter?.(node, event)
            }
        },
        [getIndexAndNodeFromMouseEvent, setCurrentIndex, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            const [index, node] = getIndexAndNodeFromMouseEvent(event)
            setCurrentIndex(index)
            if (node) {
                onMouseMove?.(node, event)
            }
        },
        [getIndexAndNodeFromMouseEvent, setCurrentIndex, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            setCurrentIndex(null)
            if (onMouseLeave) {
                let previousNode: Datum | undefined = undefined
                if (currentIndex !== null) {
                    previousNode = nodes[currentIndex]
                }
                previousNode && onMouseLeave(previousNode, event)
            }
        },
        [setCurrentIndex, currentIndex, onMouseLeave, nodes]
    )

    const handleClick = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            const [index, node] = getIndexAndNodeFromMouseEvent(event)
            setCurrentIndex(index)
            if (node) {
                onClick?.(node, event)
            }
        },
        [getIndexAndNodeFromMouseEvent, setCurrentIndex, onClick]
    )

    const handleTouchStart = useCallback(
        (event: TouchEvent<SVGRectElement>) => {
            const [index, node] = getIndexAndNodeFromTouchEvent(event)
            if (enableTouchCrosshair) {
                setCurrentIndex(index)
            }
            if (node) {
                onTouchStart?.(node, event)
            }
        },
        [getIndexAndNodeFromTouchEvent, enableTouchCrosshair, onTouchStart]
    )

    const handleTouchMove = useCallback(
        (event: TouchEvent<SVGRectElement>) => {
            const [index, node] = getIndexAndNodeFromTouchEvent(event)
            if (enableTouchCrosshair) {
                setCurrentIndex(index)
            }
            if (node) {
                onTouchMove?.(node, event)
            }
        },
        [getIndexAndNodeFromTouchEvent, enableTouchCrosshair, onTouchMove]
    )

    const handleTouchEnd = useCallback(
        (event: TouchEvent<SVGRectElement>) => {
            if (enableTouchCrosshair) {
                setCurrentIndex(null)
            }
            if (onTouchEnd) {
                let previousNode: Datum | undefined = undefined
                if (currentIndex !== null) {
                    previousNode = nodes[currentIndex]
                }
                previousNode && onTouchEnd(previousNode, event)
            }
        },
        [enableTouchCrosshair, onTouchEnd, currentIndex, nodes]
    )

    return (
        <g ref={elementRef}>
            {debug && voronoi && (
                <>
                    <path d={voronoiPath} stroke="red" strokeWidth={1} opacity={0.75} />
                    {/* highlight current cell */}
                    {currentIndex !== null && (
                        <path fill="pink" opacity={0.35} d={voronoi.renderCell(currentIndex)} />
                    )}
                </>
            )}
            {/* transparent rect to intercept mouse events */}
            <rect
                data-testid="mesh-interceptor"
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
