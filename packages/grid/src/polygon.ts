import { Vertex, BoundingBox, GridCell } from './types'
import { areBoundingBoxTouching } from './boundingBoxes'

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

    polygon.addRight = (...vertices: Vertex[]) => {
        right.push(...vertices)
    }

    polygon.addLeft = (...vertices: Vertex[]) => {
        left.unshift(...vertices)
    }

    polygon.debug = () => {
        return { right, left }
    }

    return polygon
}

export const getCellsPolygons = <C extends GridCell>(cells: C[]) => {
    // 1. Sort cells by x and y coordinates.
    const sortedCells = [...cells].sort((a, b) => {
        if (a.y !== b.y) return a.y - b.y
        return a.x - b.x
    })

    // 2. Compute a box for each row.
    const rows: BoundingBox[] = []
    let currentBox: BoundingBox | undefined = undefined
    for (const cell of sortedCells) {
        if (currentBox === undefined || cell.y !== currentBox.top) {
            currentBox = {
                top: cell.y,
                right: cell.x + cell.width,
                bottom: cell.y + cell.height,
                left: cell.x,
            }
            rows.push(currentBox)
        } else {
            currentBox.right = cell.x + cell.width
        }
    }

    // 3. Compute polygons for each group of adjacent rows.
    const polygons: ReturnType<typeof perpendicularPolygon>[] = []
    let currentPolygon: ReturnType<typeof perpendicularPolygon> | undefined = undefined
    rows.forEach((row, index) => {
        const previousBox: BoundingBox | undefined = index > 0 ? rows[index - 1] : undefined
        if (previousBox === undefined || !areBoundingBoxTouching(row, previousBox)) {
            currentPolygon = perpendicularPolygon()
            currentPolygon.addLeft([row.left, row.top])
            currentPolygon.addRight([row.right, row.top])

            polygons.push(currentPolygon)
        }

        if (previousBox !== undefined && row.left !== previousBox.left) {
            currentPolygon!.addLeft([row.left, row.top])
        }
        if (previousBox !== undefined && row.right !== previousBox.right) {
            currentPolygon!.addRight([row.right, row.top])
        }

        currentPolygon!.addLeft([row.left, row.bottom])
        currentPolygon!.addRight([row.right, row.bottom])
    })

    return polygons.map(polygon => polygon())
}
