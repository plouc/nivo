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
    // Sort cells by x and y coordinates.
    const sortedCells = [...cells].sort((a, b) => {
        if (a.y !== b.y) return a.y - b.y
        return a.x - b.x
    })

    const polygons: ReturnType<typeof perpendicularPolygon>[] = []

    let currentBoundingBox: BoundingBox | undefined = undefined
    let currentPolygon: ReturnType<typeof perpendicularPolygon> | undefined = undefined

    const rows = []
    let currentY = undefined
    let currentBox: BoundingBox | undefined = undefined
    for (const cell of sortedCells) {
        if (currentBox === undefined || cell.y !== currentBox.top) {
            rows.push('ROW')
            currentBox = {
                top: cell.y,
                right: cell.x + cellSize,
                bottom: cell.y + cellSize,
                left: cell.x,
            }
            rows.push(currentBox)
        }
    }

    console.log('ROWS', rows)

    for (const cell of sortedCells) {
        const top = cell.y
        const right = cell.x + cellSize
        const bottom = cell.y + cellSize
        const left = cell.x

        if (currentBoundingBox === undefined) {
            currentBoundingBox = { top, right, bottom, left }

            currentPolygon = perpendicularPolygon()
            polygons.push(currentPolygon)
        } else {
            if (top === currentBoundingBox.top) {
                // Same row, keep extending right edge.
                currentBoundingBox.right = right
            } else {
                // New row, create a new box.
                const newBoundingBox: BoundingBox = { top, right, bottom, left }

                if (!isAdjacentBoundingBox(newBoundingBox, currentBoundingBox)) {
                    console.log('NOT ADJACENT!')
                    console.log('currentPolygon', currentPolygon.debug())

                    currentPolygon = perpendicularPolygon()
                    currentPolygon.addRight([right, top], [right, bottom])
                    currentPolygon.addLeft([left, bottom], [left, top])

                    polygons.push(currentPolygon)
                } else {
                    currentPolygon!.addRight(
                        [currentBoundingBox.right, currentBoundingBox.top],
                        [currentBoundingBox.right, currentBoundingBox.bottom]
                    )
                    currentPolygon!.addLeft(
                        [currentBoundingBox.left, currentBoundingBox.bottom],
                        [currentBoundingBox.left, currentBoundingBox.top]
                    )
                }

                currentBoundingBox = newBoundingBox
            }
        }
    }

    if (currentBoundingBox !== undefined) {
        currentPolygon!.addRight(
            [currentBoundingBox.right, currentBoundingBox.top],
            [currentBoundingBox.right, currentBoundingBox.bottom]
        )
        currentPolygon!.addLeft(
            [currentBoundingBox.left, currentBoundingBox.bottom],
            [currentBoundingBox.left, currentBoundingBox.top]
        )
    }

    return polygons.map(polygon => polygon())
}
