import { scaleBand } from 'd3-scale'
import { useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { castBandScale } from '@nivo/scales'
import {
    WaffleGridDataProps,
    WaffleGridCommonProps,
    WaffleGridCellData,
    WaffleGridAxisDataX,
    WaffleGridAxisDataY,
} from './types'
import { svgDefaultProps } from './defaults'
import { useMemo } from 'react'

const nearestSquare = (n: number) => Math.pow(Math.ceil(Math.sqrt(n)), 2)

// compute the optimal dimensions and main grid cell size
// according to available dimensions and matrix.
const useDimensions = ({
    width: _width,
    height: _height,
    columns,
    rows,
    spacing,
    cellSpacing,
    waffleCellCountSqrt,
}: {
    width: number
    height: number
    columns: number
    rows: number
    spacing: number
    cellSpacing: number
    waffleCellCountSqrt: number
}) => {
    const dimensionsRatio = _width / _height
    const matrixRatio = columns / rows

    let waffleSize: number
    if (columns > rows) {
        if (matrixRatio >= dimensionsRatio) {
            waffleSize = _width / columns
        } else {
            waffleSize = _width / dimensionsRatio / rows
        }
    } else {
        waffleSize = _height / rows
    }

    const width = waffleSize * columns
    const height = waffleSize * rows

    const cellSize =
        (waffleSize - spacing - cellSpacing * (waffleCellCountSqrt - 1)) / waffleCellCountSqrt

    return {
        originX: (_width - width) / 2,
        originY: (_height - height) / 2,
        width,
        height,
        waffleSize,
        cellSize,
    }
}

export const useAxes = ({
    width,
    height,
    xRange,
    yRange,
    originX,
    originY,
    waffleSize,
}: {
    width: number
    height: number
    xRange: WaffleGridDataProps['xRange']
    yRange: WaffleGridDataProps['yRange']
    originX: number
    originY: number
    waffleSize: number
}) => {
    const xScale = useMemo(
        () => castBandScale<string>(scaleBand().range([0, width]).domain(xRange)),
        [width, xRange]
    )
    const yScale = useMemo(
        () => castBandScale<string>(scaleBand().range([0, height]).domain(yRange)),
        [height, yRange]
    )

    const xAxis: WaffleGridAxisDataX = {
        scale: xScale,
        ticks: xRange.map((xKey, index) => ({
            id: xKey,
            x: originX + waffleSize * index,
            width: waffleSize,
        })),
        y1: originY,
        y2: originY + height,
    }
    const yAxis: WaffleGridAxisDataY = {
        scale: yScale,
        ticks: yRange.map((yKey, index) => ({
            id: yKey,
            y: originY + waffleSize * index,
            height: waffleSize,
        })),
        x1: originX,
        x2: originX + width,
    }

    return {
        xScale,
        yScale,
        xAxis,
        yAxis,
    }
}

const computeCells = ({
    data,
    cellValue,
    cellSize,
    waffleCellCount,
    waffleCellCountSqrt,
    spacing,
    cellSpacing,
    xAxis,
    yAxis,
}: {
    data: WaffleGridDataProps['data']
    cellValue: number
    cellSize: number
    waffleCellCount: number
    waffleCellCountSqrt: number
    spacing: number
    cellSpacing: number
    xAxis: WaffleGridAxisDataX
    yAxis: WaffleGridAxisDataY
}): Omit<WaffleGridCellData, 'color'>[] => {
    const arrayTemplate = Array.from({ length: waffleCellCountSqrt })

    const cells: Omit<WaffleGridCellData, 'color'>[] = []

    let cellIndex = 0
    data.forEach((row, rowIndex) => {
        const waffleY = yAxis.ticks[rowIndex].y + spacing * 0.5

        row.forEach((blockValue, columnIndex) => {
            const waffleX = xAxis.ticks[columnIndex].x + spacing * 0.5

            const lastValueDotIndex = Math.min(Math.round(blockValue / cellValue), waffleCellCount)

            let cellWaffleIndex = 0
            arrayTemplate.forEach((_, dotRow) => {
                const cellY = waffleY + dotRow * cellSpacing + cellSize * dotRow

                arrayTemplate.forEach((__, dotColumn) => {
                    const cellX = waffleX + dotColumn * cellSpacing + cellSize * dotColumn
                    const hasValue = cellWaffleIndex <= lastValueDotIndex

                    cells.push({
                        key: `${columnIndex}.${rowIndex}.${dotColumn}.${dotRow}`,
                        index: cellIndex,
                        x: cellX,
                        y: cellY,
                        size: cellSize,
                        hasValue,
                    })

                    cellWaffleIndex++
                    cellIndex++
                })
            })
        })
    })

    return cells
}

const useCells = (config: {
    data: WaffleGridDataProps['data']
    cellValue: number
    cellSize: number
    waffleCellCount: number
    waffleCellCountSqrt: number
    spacing: number
    cellSpacing: number
    xAxis: WaffleGridAxisDataX
    yAxis: WaffleGridAxisDataY
}) =>
    useMemo(() => computeCells(config), [
        config.data,
        config.cellValue,
        config.cellSize,
        config.waffleCellCount,
        config.waffleCellCountSqrt,
        config.spacing,
        config.cellSpacing,
        config.xAxis,
        config.yAxis,
    ])

const useCellsClassification = ({
    cells,
    blankCellColor,
    valueCellColor,
}: {
    cells: Omit<WaffleGridCellData, 'color'>[]
    blankCellColor: WaffleGridCommonProps['blankCellColor']
    valueCellColor: WaffleGridCommonProps['valueCellColor']
}) => {
    // theme is required if color config comes from the theme
    const theme = useTheme()

    const getBlankCellColor = useInheritedColor(blankCellColor, theme)
    const blankCells: WaffleGridCellData[] = useMemo(
        () =>
            cells
                .filter(cell => !cell.hasValue)
                .map((cell, index) => ({
                    ...cell,
                    index,
                    color: getBlankCellColor(cell),
                })),
        [cells, getBlankCellColor]
    )

    const getValueCellColor = useInheritedColor(valueCellColor, theme)
    const valueCells: WaffleGridCellData[] = useMemo(
        () =>
            cells
                .filter(cell => cell.hasValue)
                .map((cell, index) => ({
                    ...cell,
                    index,
                    color: getValueCellColor(cell),
                })),
        [cells, getValueCellColor]
    )

    return {
        blankCells,
        valueCells,
    }
}

export const useWaffleGrid = ({
    width: _width,
    height: _height,
    data,
    xRange,
    yRange,
    cellValue,
    maxValue: _maxValue,
    spacing = svgDefaultProps.spacing,
    cellSpacing = svgDefaultProps.cellSpacing,
    blankCellColor,
    valueCellColor,
}: {
    width: number
    height: number
    data: WaffleGridDataProps['data']
    xRange: WaffleGridDataProps['xRange']
    yRange: WaffleGridDataProps['yRange']
    cellValue: WaffleGridDataProps['cellValue']
    maxValue: WaffleGridCommonProps['maxValue']
    spacing: WaffleGridCommonProps['spacing']
    cellSpacing: WaffleGridCommonProps['cellSpacing']
    blankCellColor: WaffleGridCommonProps['blankCellColor']
    valueCellColor: WaffleGridCommonProps['valueCellColor']
}) => {
    const columns = xRange.length
    const rows = yRange.length

    const autoMaxValue = Math.max(...data.flat())
    const maxValue = _maxValue === 'auto' ? autoMaxValue : Math.max(_maxValue, autoMaxValue)
    const waffleCellCount = nearestSquare(maxValue / cellValue)
    const waffleCellCountSqrt = Math.sqrt(waffleCellCount)

    const { originX, originY, width, height, waffleSize, cellSize } = useDimensions({
        width: _width,
        height: _height,
        columns,
        rows,
        spacing,
        cellSpacing,
        waffleCellCountSqrt,
    })

    const { xAxis, yAxis } = useAxes({
        width,
        height,
        xRange,
        yRange,
        originX,
        originY,
        waffleSize,
    })

    const cells = useCells({
        data,
        cellValue,
        cellSize,
        waffleCellCount,
        waffleCellCountSqrt,
        spacing,
        cellSpacing,
        xAxis,
        yAxis,
    })

    const { blankCells, valueCells } = useCellsClassification({
        cells,
        blankCellColor,
        valueCellColor,
    })

    return {
        blankCells,
        valueCells,
        xAxis,
        yAxis,
    }
}
