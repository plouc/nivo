/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useRef, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { getRelativeCursor } from '@nivo/core'
import { useVoronoiMesh } from './hooks'

const Mesh = ({
    nodes,
    width,
    height,
    x,
    y,
    debug,

    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}) => {
    const elementRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(null)

    const { delaunay, voronoi } = useVoronoiMesh({
        points: nodes,
        x,
        y,
        width,
        height,
        debug,
    })
    const voronoiPath = useMemo(() => (debug ? voronoi.render() : undefined))

    const getIndexAndNodeFromEvent = useCallback(
        event => {
            const [x, y] = getRelativeCursor(elementRef.current, event)
            const index = delaunay.find(x, y)

            return [index, index !== undefined ? nodes[index] : null]
        },
        [delaunay]
    )
    const handleMouseEnter = useCallback(
        event => {
            const [index, node] = getIndexAndNodeFromEvent(event)
            if (currentIndex !== index) setCurrentIndex(index)
            node && onMouseEnter && onMouseEnter(node, event)
        },
        [getIndexAndNodeFromEvent, setCurrentIndex]
    )
    const handleMouseMove = useCallback(
        event => {
            const [index, node] = getIndexAndNodeFromEvent(event)
            if (currentIndex !== index) setCurrentIndex(index)
            node && onMouseMove && onMouseMove(node, event)
        },
        [getIndexAndNodeFromEvent, setCurrentIndex]
    )
    const handleMouseLeave = useCallback(
        event => {
            setCurrentIndex(null)
            if (onMouseLeave) {
                let previousNode
                if (currentIndex !== undefined && currentIndex !== null) {
                    previousNode = nodes[currentIndex]
                }
                previousNode && onMouseLeave(previousNode, event)
            }
        },
        [setCurrentIndex, currentIndex, nodes]
    )
    const handleClick = useCallback(
        event => {
            const [index, node] = getIndexAndNodeFromEvent(event)
            if (currentIndex !== index) setCurrentIndex(index)
            onClick && onClick(node, event)
        },
        [getIndexAndNodeFromEvent, setCurrentIndex]
    )

    return (
        <g ref={elementRef}>
            {debug && <path d={voronoiPath} stroke="red" strokeWidth={1} opacity={0.75} />}
            {currentIndex !== null && debug && (
                <path fill="red" opacity={0.35} d={voronoi.renderCell(currentIndex)} />
            )}
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

Mesh.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    nodes: PropTypes.array.isRequired,
    x: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    debug: PropTypes.bool.isRequired,
}
Mesh.defaultProps = {
    x: 'x',
    y: 'y',
    debug: false,
}

export default Mesh
