import React, { useRef, useState, useCallback, useMemo } from 'react'
import { getRelativeCursor } from '@bitbloom/nivo-core'
import { useVoronoiMesh } from './hooks'
import { XYAccessor } from './computeMesh'

type MouseHandler<Datum> = (datum: Datum, event: React.MouseEvent) => void

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
        event => {
            if (!elementRef.current) {
                return [null, null]
            }

            const [x, y] = getRelativeCursor(elementRef.current, event)
            const index = delaunay.find(x, y)

            return [index, index !== undefined ? nodes[index] : null] as [number, Datum | null]
        },
        [elementRef, delaunay]
    )

    const handleMouseEnter = useCallback(
        (event: React.MouseEvent) => {
            const [index, node] = getIndexAndNodeFromEvent(event)
            setCurrentIndex(index)
            if (node) {
                onMouseEnter?.(node, event)
            }
        },
        [getIndexAndNodeFromEvent, setCurrentIndex, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (event: React.MouseEvent) => {
            const [index, node] = getIndexAndNodeFromEvent(event)
            setCurrentIndex(index)
            if (node) {
                onMouseMove?.(node, event)
            }
        },
        [getIndexAndNodeFromEvent, setCurrentIndex, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (event: React.MouseEvent) => {
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
        (event: React.MouseEvent) => {
            const [index, node] = getIndexAndNodeFromEvent(event)
            setCurrentIndex(index)
            if (node) {
                onClick?.(node, event)
            }
        },
        [getIndexAndNodeFromEvent, setCurrentIndex, onClick]
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
                width={width}
                height={height}
                fill="red"
                opacity={0}
                style={{ cursor: 'auto' }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            />
        </g>
    )
}
