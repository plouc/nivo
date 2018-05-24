/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import range from 'lodash/range'

export const computeCellSize = (width, height, rows, columns, padding) => {
    const sizeX = (width - (columns - 1) * padding) / columns
    const sizeY = (height - (rows - 1) * padding) / rows

    return Math.min(sizeX, sizeY)
}

export const computeGrid = (width, height, rows, columns, padding) => {
    const cellSize = computeCellSize(width, height, rows, columns, padding)

    const cells = []
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

    const origin = {
        x: (width - (cellSize * columns + padding * (columns - 1))) / 2,
        y: (height - (cellSize * rows + padding * (rows - 1))) / 2,
    }

    return { cells, cellSize, origin }
}
