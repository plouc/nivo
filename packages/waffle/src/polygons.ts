import { perpendicularPolygon, Vertex } from '@nivo/grid'
import { DataCell, Datum } from './types'

interface BoundingBox {
    top: number
    right: number
    bottom: number
    left: number
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
