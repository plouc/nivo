/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import range from 'lodash.range'

/**
 * Computes optimal cell size according to dimensions/layout/padding.
 *
 * @param {number} width
 * @param {number} height
 * @param {number} rows
 * @param {number} columns
 * @param {number} padding
 *
 * @return {number}
 */
export const computeCellSize = (width, height, rows, columns, padding) => {
    const sizeX = (width - (columns - 1) * padding) / columns
    const sizeY = (height - (rows - 1) * padding) / rows

    return Math.min(sizeX, sizeY)
}

/**
 * Computes empty cells according to dimensions/layout/padding.
 *
 * @param {number}                        width
 * @param {number}                        height
 * @param {number}                        rows
 * @param {number}                        columns
 * @param {'top'|'right'|'bottom'|'left'} fillDirection
 * @param {number}                        padding
 *
 * @return {{ cells: Array, cellSize: number, origin: { x: number, y: number } } }
 */
export const computeGrid = (width, height, rows, columns, fillDirection, padding) => {
    const cellSize = computeCellSize(width, height, rows, columns, padding)

    const cells = []
    switch (fillDirection) {
        case 'top':
            range(rows).forEach(row => {
                range(columns).forEach(column => {
                    cells.push({
                        position: row * columns + column,
                        row,
                        column,
                        x: column * (cellSize + padding),
                        y: row * (cellSize + padding),
                    })
                })
            })
            break

        case 'bottom':
            range(rows - 1, -1).forEach(row => {
                range(columns).forEach(column => {
                    cells.push({
                        position: row * columns + column,
                        row,
                        column,
                        x: column * (cellSize + padding),
                        y: row * (cellSize + padding),
                    })
                })
            })
            break

        case 'left':
            range(columns).forEach(column => {
                range(rows).forEach(row => {
                    cells.push({
                        position: row * columns + column,
                        row,
                        column,
                        x: column * (cellSize + padding),
                        y: row * (cellSize + padding),
                    })
                })
            })
            break

        case 'right':
            range(columns - 1, -1).forEach(column => {
                range(rows - 1, -1).forEach(row => {
                    cells.push({
                        position: row * columns + column,
                        row,
                        column,
                        x: column * (cellSize + padding),
                        y: row * (cellSize + padding),
                    })
                })
            })
            break

        default:
            throw new Error(`Invalid fill direction provided: ${fillDirection}`)
    }

    const origin = {
        x: (width - (cellSize * columns + padding * (columns - 1))) / 2,
        y: (height - (cellSize * rows + padding * (rows - 1))) / 2,
    }

    return { cells, cellSize, origin }
}

export const applyDataToGrid = (_cells, data) => {
    const cells = _cells.map(cell => ({ ...cell }))

    data.forEach(datum => {
        range(datum.startAt, datum.endAt).forEach(position => {
            const cell = cells[position]
            if (cell !== undefined) {
                cell.data = datum
                cell.groupIndex = datum.groupIndex
                cell.color = datum.color
            }
        })
    })

    return cells
}
