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

export const useWaffleGridScales = ({
    width,
    height,
    xRange,
    yRange,
}: {
    width: number
    height: number
    xRange: WaffleGridDataProps['xRange']
    yRange: WaffleGridDataProps['yRange']
}) => {
    const xScale = useMemo(
        () => castBandScale<string>(scaleBand().range([0, width]).domain(xRange)),
        [width, xRange]
    )
    const yScale = useMemo(
        () => castBandScale<string>(scaleBand().range([0, height]).domain(yRange)),
        [height, yRange]
    )

    return {
        xScale,
        yScale,
    }
}

// assign colors to computed cells
export const useWaffleGridCells = ({
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
    const xLength = xRange.length
    const yLength = yRange.length

    const autoMaxValue = Math.max(...data.flat())
    const maxValue = _maxValue === 'auto' ? autoMaxValue : Math.max(_maxValue, autoMaxValue)
    const waffleCellCount = nearestSquare(maxValue / cellValue)
    const waffleCellSize = Math.sqrt(waffleCellCount)

    const dataRatio = xLength / yLength
    const dimensionsRatio = _width / _height

    let width = _width
    let height = _height
    let cellSize: number

    if (xLength > yLength) {
        if (dataRatio >= dimensionsRatio) {
            height = (_width / xLength) * yLength
            cellSize = (_width - spacing * xLength) / xLength / waffleCellSize
        } else {
            height = _width / dimensionsRatio
            width = (height / yLength) * xLength
            cellSize = (height / yLength - spacing) / waffleCellSize
        }
    } else {
        width = (_height / yLength) * xLength
        cellSize =
            ((_height - spacing * yLength) / yLength - cellSpacing * (waffleCellSize - 1)) /
            waffleCellSize
    }

    const originX = (_width - width) / 2
    const originY = (_height - height) / 2
    const waffleSize = cellSize * waffleCellSize + spacing + (waffleCellSize - 1) * cellSpacing

    const { xScale, yScale } = useWaffleGridScales({
        width,
        height,
        xRange,
        yRange,
    })

    const xAxis: WaffleGridAxisDataX = {
        ticks: xRange.map((xKey, index) => ({
            id: xKey,
            x: originX + waffleSize * index,
            width: waffleSize,
        })),
        y1: originY,
        y2: originY + height,
    }
    const yAxis: WaffleGridAxisDataY = {
        ticks: yRange.map((yKey, index) => ({
            id: yKey,
            y: originY + waffleSize * index,
            height: waffleSize,
        })),
        x1: originX,
        x2: originX + width,
    }

    const waffleArray = Array.from({ length: waffleCellSize })

    const cells: WaffleGridCellData[] = []
    let cellIndex = 0
    data.forEach((row, rowIndex) => {
        const waffleY = yAxis.ticks[rowIndex].y + spacing * 0.5

        row.forEach((blockValue, columnIndex) => {
            const waffleX = xAxis.ticks[columnIndex].x + spacing * 0.5

            const lastValueDotIndex = Math.min(Math.round(blockValue / cellValue), waffleCellCount)

            let cellWaffleIndex = 0
            waffleArray.forEach((_, dotRow) => {
                const cellY = waffleY + dotRow * cellSpacing + cellSize * dotRow

                waffleArray.forEach((__, dotColumn) => {
                    const cellX = waffleX + dotColumn * cellSpacing + cellSize * dotColumn
                    const hasValue = cellWaffleIndex <= lastValueDotIndex

                    cells.push({
                        key: `${columnIndex}.${rowIndex}.${dotColumn}.${dotRow}`,
                        index: cellIndex,
                        x: cellX,
                        y: cellY,
                        size: cellSize,
                        color: '',
                        hasValue,
                    })

                    cellWaffleIndex++
                    cellIndex++
                })
            })
        })
    })

    const { blankCells, valueCells } = useWaffleGridCells({
        cells,
        blankCellColor,
        valueCellColor,
    })

    return {
        xScale,
        yScale,
        blankCells,
        valueCells,
        xAxis,
        yAxis,
    }
}
