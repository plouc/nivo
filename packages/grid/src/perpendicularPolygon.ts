import { Vertex } from './types'

/**
 * A perpendicular polygon defined by left/right vertices.
 *
 * We split left/right vertices so that it's possible to generate
 * a path by traversing the right vertices and then the left ones.
 * This traversal is clockwise, meaning that right vertices are
 * sorted by y ascending, while left vertices are sorted by y descending.
 *
 * Please note that we don't close the polygon, the first vertex
 * is going to be the first right vertex, and the last one is going
 * to be the last left vertex, in order to close the polygon,
 * you could for example use `d3.line` with a `linearClosed` curve.
 */
export function perpendicularPolygon() {
    const left: Vertex[] = []
    const right: Vertex[] = []

    function polygon() {
        return [...right, ...left]
    }

    polygon.addRight = function (...vertices: Vertex[]) {
        right.push(...vertices)
    }

    polygon.addLeft = function (...vertices: Vertex[]) {
        left.unshift(...vertices)
    }

    polygon.debug = function () {
        return { right, left }
    }

    return polygon
}
