import { GridFillDirection, GridCell, Vertex } from './types'

export const computeCellDimensions = ({
    width,
    height,
    rows,
    columns,
    padding,
    square,
}: {
    width: number
    height: number
    rows: number
    columns: number
    padding: number
    square: boolean
}) => {
    const cellWidth = (width - (columns - 1) * padding) / columns
    const cellHeight = (height - (rows - 1) * padding) / rows

    if (!square) return [cellWidth, cellHeight]

    const min = Math.min(cellWidth, cellHeight)
    return [min, min]
}

/**
 * Generate a grid of cells.
 */
export const generateGrid = <C extends GridCell = GridCell>({
    width,
    height,
    columns,
    rows,
    padding = 0,
    fillDirection = 'bottom',
    square = true,
    extend,
}: {
    width: number
    height: number
    columns: number
    rows: number
    padding?: number
    fillDirection?: GridFillDirection
    square?: boolean
    extend?: (cell: GridCell, origin: [number, number]) => C
}) => {
    const [cellWidth, cellHeight] = computeCellDimensions({
        width,
        height,
        rows,
        columns,
        padding,
        square,
    })

    const origin: Vertex = [
        (width - (cellWidth * columns + padding * (columns - 1))) / 2,
        (height - (cellHeight * rows + padding * (rows - 1))) / 2,
    ]

    const cells: GridCell[] = []

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            const x = column * cellWidth
            const y = row * cellHeight
            const key = `${row}.${column}`

            cells.push({
                key,
                // Adjusted later depending on `fillDirection`.
                index: 0,
                column,
                row,
                x,
                y,
                width: cellWidth,
                height: cellHeight,
            })
        }
    }

    switch (fillDirection) {
        case 'left':
            cells.sort((a, b) => {
                if (a.column !== b.column) {
                    return b.column - a.column
                }
                return b.row - a.row
            })
            break
        case 'top':
            cells.sort((a, b) => {
                if (a.row !== b.row) {
                    return b.row - a.row
                }
                return b.column - a.column
            })
            break
        case 'right':
            cells.sort((a, b) => {
                if (a.column !== b.column) {
                    return a.column - b.column
                }
                return a.row - b.row
            })
            break

        default: // bottom, nothing to do.
    }

    // Adjust the index depending on `fillDirection`.
    cells.forEach((cell, index) => {
        cell.index = index
    })

    // Optionally "augment" the cells via `extend`.
    const extendedCells: C[] =
        typeof extend === 'function' ? cells.map(cell => extend(cell, origin)) : (cells as C[])

    return {
        x: origin[0],
        y: origin[1],
        cellWidth,
        cellHeight,
        cells: extendedCells,
    }
}
