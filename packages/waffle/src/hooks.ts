import { createElement, MouseEvent, useCallback, useMemo } from 'react'
import { range } from 'lodash'
import { line as d3Line, curveLinearClosed } from 'd3-shape'
import { useTheme, useValueFormatter } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import {
    InheritedColorConfig,
    OrdinalColorScaleConfig,
    useInheritedColor,
    useOrdinalColorScale,
} from '@nivo/colors'
import {
    CommonProps,
    ComputedDatum,
    Datum,
    DataProps,
    FillDirection,
    EmptyCell,
    Cell,
    DataCell,
    isDataCell,
    MouseHandlers,
    TooltipComponent,
} from './types'
import { commonDefaultProps } from './defaults'
import { findPolygons } from './polygons'

/**
 * Computes optimal cell size according to dimensions/layout/padding.
 * Each cell is a square.
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

/**
 * Computes empty cells according to dimensions/layout/padding.
 * At this stage the cells aren't bound to any data.
 */
export const computeGrid = (
    width: number,
    height: number,
    rows: number,
    columns: number,
    fillDirection: FillDirection,
    padding: number,
    emptyColor: string
) => {
    const cellSize = computeCellSize(width, height, rows, columns, padding)
    const origin = {
        x: (width - (cellSize * columns + padding * (columns - 1))) / 2,
        y: (height - (cellSize * rows + padding * (rows - 1))) / 2,
    }

    const cells: EmptyCell[] = []
    switch (fillDirection) {
        case 'top':
            Array.from({ length: rows }, (_, row) => {
                return range(columns).forEach(column => {
                    cells.push({
                        key: `${row}.${column}`,
                        position: row * columns + column,
                        row,
                        column,
                        x: origin.x + column * (cellSize + padding),
                        y: origin.y + row * (cellSize + padding),
                        color: emptyColor,
                    })
                })
            })
            break

        case 'bottom':
            range(rows - 1, -1).forEach(row => {
                range(columns).forEach(column => {
                    cells.push({
                        key: `${row}.${column}`,
                        position: row * columns + column,
                        row,
                        column,
                        x: origin.x + column * (cellSize + padding),
                        y: origin.y + row * (cellSize + padding),
                        color: emptyColor,
                    })
                })
            })
            break

        case 'left':
            range(columns).forEach(column => {
                range(rows).forEach(row => {
                    cells.push({
                        key: `${row}.${column}`,
                        position: row * columns + column,
                        row,
                        column,
                        x: origin.x + column * (cellSize + padding),
                        y: origin.y + row * (cellSize + padding),
                        color: emptyColor,
                    })
                })
            })
            break

        case 'right':
            range(columns - 1, -1).forEach(column => {
                range(rows - 1, -1).forEach(row => {
                    cells.push({
                        key: `${row}.${column}`,
                        position: row * columns + column,
                        row,
                        column,
                        x: origin.x + column * (cellSize + padding),
                        y: origin.y + row * (cellSize + padding),
                        color: emptyColor,
                    })
                })
            })
            break

        default:
            throw new Error(`Invalid fill direction provided: ${fillDirection}`)
    }

    return { cells, cellSize, origin }
}

export const mergeCellsData = <RawDatum extends Datum>(
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

export const useWaffle = <D extends Datum = Datum>({
    width,
    height,
    data,
    hiddenIds,
    valueFormat,
    total,
    rows,
    columns,
    fillDirection = commonDefaultProps.fillDirection,
    padding = commonDefaultProps.padding,
    colors = commonDefaultProps.colors as OrdinalColorScaleConfig<D>,
    emptyColor = commonDefaultProps.emptyColor,
    borderColor = commonDefaultProps.borderColor as InheritedColorConfig<ComputedDatum<D>>,
}: Pick<
    CommonProps<D>,
    | 'hiddenIds'
    | 'valueFormat'
    | 'fillDirection'
    | 'padding'
    | 'colors'
    | 'emptyColor'
    | 'borderColor'
> &
    DataProps<D> & {
        width: number
        height: number
    }) => {
    const formatValue = useValueFormatter(valueFormat)

    const getColor = useOrdinalColorScale<D>(colors, 'id')
    const theme = useTheme()
    const getBorderColor = useInheritedColor(borderColor, theme)

    const unit = total / (rows * columns)

    const computedData: Array<ComputedDatum<D>> = useMemo(() => {
        let currentPosition = 0

        const enhancedData: ComputedDatum<D>[] = []

        data.forEach((datum, groupIndex) => {
            if (hiddenIds.includes(datum.id)) return false

            const color = getColor(datum)

            const enhancedDatum: ComputedDatum<D> = {
                id: datum.id,
                label: datum.label,
                value: datum.value,
                formattedValue: formatValue(datum.value),
                groupIndex,
                startAt: currentPosition,
                endAt: currentPosition + Math.round(datum.value / unit),
                color,
                // Temporary, it's re-computed later as the inherited color
                // needs the computed data.
                borderColor: color,
                data: datum,
                polygons: [],
            }
            enhancedDatum.borderColor = getBorderColor(enhancedDatum)

            currentPosition = enhancedDatum.endAt

            enhancedData.push(enhancedDatum)
        })

        return enhancedData
    }, [data, hiddenIds, unit, formatValue, getColor, getBorderColor])

    const grid = useMemo(
        () => computeGrid(width, height, rows, columns, fillDirection, padding, emptyColor),
        [width, height, rows, columns, fillDirection, padding, emptyColor]
    )

    const cells = useMemo(
        () => mergeCellsData(grid.cells, computedData),
        [grid.cells, computedData]
    )

    const polygons = findPolygons(cells.filter(isDataCell), grid.cellSize)
    computedData.forEach(datum => {
        if (datum.id in polygons) {
            datum.polygons = polygons[datum.id as D['id']]!
        }
    })

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
        cells,
        cellSize: grid.cellSize,
        computedData,
        legendData,
        getBorderColor,
    }
}

export const useAreaPathGenerator = () => useMemo(() => d3Line().curve(curveLinearClosed), [])

export const useAreaMouseHandlers = <D extends Datum, E extends Element>(
    data: ComputedDatum<D>,
    { onMouseEnter, onMouseMove, onMouseLeave, onClick }: Partial<MouseHandlers<D, E>>,
    tooltip: TooltipComponent<D>
) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        (event: MouseEvent<E>) => {
            showTooltipFromEvent(createElement(tooltip, { data }), event)
            onMouseEnter?.(data, event)
        },
        [showTooltipFromEvent, data, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent<E>) => {
            showTooltipFromEvent(createElement(tooltip, { data }), event)
            onMouseMove?.(data, event)
        },
        [showTooltipFromEvent, data, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent<E>) => {
            hideTooltip()
            onMouseLeave?.(data, event)
        },
        [hideTooltip, data, onMouseLeave]
    )

    const handleClick = useCallback(
        (event: MouseEvent<E>) => {
            hideTooltip()
            onClick?.(data, event)
        },
        [hideTooltip, data, onClick]
    )

    return {
        handleMouseEnter,
        handleMouseMove,
        handleMouseLeave,
        handleClick,
    }
}
