import { useRef, useState, useCallback, useMemo, MouseEvent, TouchEvent } from 'react'
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

    const getIndexAndNodeFromEvent = useCallback(
        (event: MouseEvent<SVGRectElement> | TouchEvent<SVGRectElement>) => {
            if (!elementRef.current) {
                return [null, null]
            }

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

            return [node ? index : null, node] as [null, null] | [number, Datum]
        },
        [delaunay, nodes, detectionThreshold]
    )

    const handleMouseEnter = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            const [index, node] = getIndexAndNodeFromEvent(event)
            setCurrentIndex(index)
            if (node) {
                onMouseEnter?.(node, event)
            }
        },
        [getIndexAndNodeFromEvent, setCurrentIndex, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent<SVGRectElement>) => {
            const [index, node] = getIndexAndNodeFromEvent(event)
            setCurrentIndex(index)
            if (node) {
                onMouseMove?.(node, event)
            }
        },
        [getIndexAndNodeFromEvent, setCurrentIndex, onMouseMove]
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
            const [index, node] = getIndexAndNodeFromEvent(event)
            setCurrentIndex(index)
            if (node) {
                onClick?.(node, event)
            }
        },
        [getIndexAndNodeFromEvent, setCurrentIndex, onClick]
    )

    const handleTouchStart = useCallback(
        (event: TouchEvent<SVGRectElement>) => {
            const [index, node] = getIndexAndNodeFromEvent(event)
            if (enableTouchCrosshair) {
                setCurrentIndex(index)
            }
            if (node) {
                onTouchStart?.(node, event)
            }
        },
        [getIndexAndNodeFromEvent, enableTouchCrosshair, onTouchStart]
    )

    const handleTouchMove = useCallback(
        (event: TouchEvent<SVGRectElement>) => {
            const [index, node] = getIndexAndNodeFromEvent(event)
            if (enableTouchCrosshair) {
                setCurrentIndex(index)
            }
            if (node) {
                onTouchMove?.(node, event)
            }
        },
        [getIndexAndNodeFromEvent, enableTouchCrosshair, onTouchMove]
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
                    {/* highlight the current cell */}
                    {currentIndex !== null && (
                        <path fill="pink" opacity={0.35} d={voronoi.renderCell(currentIndex)} />
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
