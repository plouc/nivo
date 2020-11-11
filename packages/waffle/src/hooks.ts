import { useMemo } from 'react'
import { range } from 'lodash'
// @ts-ignore
import { useTheme } from '@nivo/core'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import {
    CommonProps,
    ComputedDatum,
    Datum,
    DefaultRawDatum,
    DataProps,
    FillDirection,
    EmptyCell,
    Cell,
    DataCell,
} from './types'
import { defaultProps } from './props'

/**
 * Computes optimal cell size according to dimensions/layout/padding.
 */
const computeCellSize = (
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

/**
 * Computes empty cells according to dimensions/layout/padding.
 * At this stage the cells aren't bound to any data.
 */
const computeGrid = (
    width: number,
    height: number,
    rows: number,
    columns: number,
    fillDirection: FillDirection,
    padding: number,
    emptyColor: string
) => {
    const cellSize = computeCellSize(width, height, rows, columns, padding)

    const cells: EmptyCell[] = []
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

export const useWaffle = <RawDatum extends Datum = DefaultRawDatum>({
    width,
    height,
    data,
    total,
    rows,
    columns,
    fillDirection = defaultProps.fillDirection,
    padding = defaultProps.padding,
    colors = defaultProps.colors,
    emptyColor = defaultProps.emptyColor,
    borderColor = defaultProps.borderColor,
}: Pick<
    CommonProps<RawDatum>,
    'fillDirection' | 'padding' | 'colors' | 'emptyColor' | 'borderColor'
> &
    DataProps<RawDatum> & {
        width: number
        height: number
    }) => {
    const getColor = useOrdinalColorScale<RawDatum>(colors, 'id')
    const theme = useTheme()
    const getBorderColor = useInheritedColor<Cell<RawDatum>>(borderColor, theme)

    const unit = total / (rows * columns)

    const grid = useMemo(
        () => computeGrid(width, height, rows, columns, fillDirection, padding, emptyColor),
        [width, height, rows, columns, fillDirection, padding, emptyColor]
    )

    const computedData: Array<ComputedDatum<RawDatum>> = useMemo(() => {
        let currentPosition = 0

        return data.map((datum, groupIndex) => {
            const enhancedDatum: ComputedDatum<RawDatum> = {
                id: datum.id,
                label: datum.label,
                value: datum.value,
                formattedValue: datum.value,
                groupIndex,
                startAt: currentPosition,
                endAt: currentPosition + Math.round(datum.value / unit),
                color: getColor(datum),
                data: datum,
            }

            currentPosition = enhancedDatum.endAt

            return enhancedDatum

            /*
            if (!hiddenIds.includes(datum.id)) {
                const enhancedDatum = {
                    ...datum,
                    groupIndex,
                    startAt: currentPosition,
                    endAt: currentPosition + Math.round(datum.value / unit),
                    color: getColor(datum),
                }

                currentPosition = enhancedDatum.endAt

                return enhancedDatum
            }

            return {
                ...datum,
                groupIndex,
                startAt: currentPosition,
                endAt: currentPosition,
                color: getColor(datum),
            }
             */
        })
    }, [data, getColor, unit])

    const legendData = useMemo(
        () =>
            computedData.map(datum => ({
                id: datum.id,
                label: datum.id,
                color: datum.color,
                // fill: datum.fill,
            })),
        [computedData]
    )

    return {
        grid,
        computedData,
        legendData,
        getBorderColor,
    }
}

const mergeCellsData = <RawDatum extends Datum>(
    cells: EmptyCell[],
    data: ComputedDatum<RawDatum>[]
) => {
    const cellsCopy: Cell<RawDatum>[] = cells.map(cell => ({ ...cell }))

    data.forEach(datum => {
        range(datum.startAt, datum.endAt).forEach(position => {
            const cell = cellsCopy[position]
            if (cell !== undefined) {
                const cellWithData = cell as DataCell<RawDatum>
                cellWithData.data = datum
                cellWithData.color = datum.color
            }
        })
    }, [])

    return cellsCopy
}

export const useMergeCellsData = <RawDatum extends Datum = DefaultRawDatum>(
    cells: EmptyCell[],
    data: ComputedDatum<RawDatum>[]
) => useMemo(() => mergeCellsData(cells, data), [cells, data])
