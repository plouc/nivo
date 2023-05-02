import { DataCell, Datum } from './types'

interface BoundingBox {
    top: number
    right: number
    bottom: number
    left: number
}

export type Vertex = [
    // x component
    number,
    // y component
    number
]

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
function perpendicularPolygon() {
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

/**
 * Check if the provided bounding box is adjacent to the previous one (touching).
 *
 * Please keep in mind that we assume that:
 * - Boxes are sorted on y.
 * - There is no spacing between boxes.
 */
const isAdjacentBoundingBox = (box: BoundingBox, previous: BoundingBox) => {
    if (box.top > previous.bottom) return false

    return !(box.left > previous.right || box.right < previous.left)
}

export const getCellsPolygons = <RawDatum extends Datum>(
    cells: DataCell<RawDatum>[],
    cellSize: number
) => {
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
                right: cell.x + cellSize,
                bottom: cell.y + cellSize,
                left: cell.x,
            }
            rows.push(currentBox)
        } else {
            currentBox.right = cell.x + cellSize
        }
    }

    // 3. Compute polygons for each group of adjacent rows.
    const polygons: ReturnType<typeof perpendicularPolygon>[] = []
    let currentPolygon: ReturnType<typeof perpendicularPolygon> | undefined = undefined
    rows.forEach((row, index) => {
        const previousBox: BoundingBox | undefined = index > 0 ? rows[index - 1] : undefined
        if (previousBox === undefined || !isAdjacentBoundingBox(row, previousBox)) {
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

/**
 * Assumes that cells ares sorted by group.
 */
export const findPolygons = <RawDatum extends Datum>(grid: DataCell<RawDatum>[], size: number) => {
    const grouped = grid.reduce((acc, cell) => {
        ;(acc[cell.data.id] = acc[cell.data.id] || []).push(cell)
        return acc
    }, {} as Record<string | number, DataCell<RawDatum>[]>)

    const polygons: Partial<Record<RawDatum['id'], Vertex[][]>> = {}
    for (const [group, cells] of Object.entries(grouped)) {
        polygons[group as RawDatum['id']] = getCellsPolygons<RawDatum>(cells, size)
    }

    return polygons
}
