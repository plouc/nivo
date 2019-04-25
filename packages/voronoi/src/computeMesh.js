/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Delaunay } from 'd3-delaunay'

const getAccessor = directive => (typeof directive === 'function' ? directive : d => d[directive])

/**
 * The delaunay generator requires an array
 * where each point is defined as an array
 * of 2 elements: [x: number, y: number].
 *
 * Points represent the raw input data
 * and x/y represent accessors to x & y.
 */
export const computeMeshPoints = ({ points, x = 'x', y = 'y' }) => {
    const getX = getAccessor(x)
    const getY = getAccessor(y)

    return points.map(p => [getX(p), getY(p)])
}

export const computeMesh = ({ points, width, height, debug }) => {
    const delaunay = Delaunay.from(points)
    const voronoi = debug === true ? delaunay.voronoi([0, 0, width, height]) : undefined

    return { delaunay, voronoi }
}
