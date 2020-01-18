/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { range } from 'lodash'
import { EnhancedWaffleDatum, WaffleFillDirection } from './hooks'

/**
 * Computes optimal cell size according to dimensions/layout/padding.
 */
export const computeCellSize = (
    width: number,
    height: number,
    rows: number,
    columns: number,
    padding: number
) => {
    const sizeX = (width - (columns - 1) * padding) / columns
    const sizeY = (height - (rows - 1) * padding) / rows

    return Math.min(sizeX, sizeY)
}

export interface WaffleCell {
    position: number
    row: number
    column: number
    x: number
    y: number
    color: string
}

export interface WaffleDataCell extends WaffleCell {
    data: EnhancedWaffleDatum
    groupIndex: number
}

export const isWaffleDataCell = (cell: WaffleCell | WaffleDataCell): cell is WaffleDataCell =>
    'data' in cell

/**
 * Computes empty cells according to dimensions/layout/padding.
 */
export const computeGrid = (
    width: number,
    height: number,
    rows: number,
    columns: number,
    fillDirection: WaffleFillDirection,
    padding: number,
    emptyColor: string
) => {
    const cellSize = computeCellSize(width, height, rows, columns, padding)

    const cells: WaffleCell[] = []
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
                        color: emptyColor,
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
                        color: emptyColor,
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
                        color: emptyColor,
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
                        color: emptyColor,
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

export const mergeCellsData = (cells: WaffleCell[], data: EnhancedWaffleDatum[]) => {
    const cellsCopy: Array<WaffleCell | WaffleDataCell> = cells.map(cell => ({ ...cell }))

    data.forEach(datum => {
        range(datum.startAt, datum.endAt).forEach(position => {
            const cell = cellsCopy[position]
            if (cell !== undefined) {
                const cellWithData = cell as WaffleDataCell
                cellWithData.data = datum
                cellWithData.groupIndex = datum.groupIndex
                cellWithData.color = datum.color
            }
        })
    }, [])

    return cellsCopy
}
