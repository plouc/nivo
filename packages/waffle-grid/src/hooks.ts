import { useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import {
    WaffleGridDataProps,
    WaffleGridCommonProps,
    WaffleGridCellData,
    WaffleGridAxisDataX,
    WaffleGridAxisDataY,
} from './types'
import { svgDefaultProps } from './defaults'

const nearestSquare = (n: number) => Math.pow(Math.ceil(Math.sqrt(n)), 2)

export const useWaffleGrid = ({
    width: _width,
    height: _height,
    data,
    xRange,
    yRange,
    cellValue,
    maxValue: _maxValue,
    spacing = svgDefaultProps.spacing,
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
    blankCellColor: WaffleGridCommonProps['blankCellColor']
    valueCellColor: WaffleGridCommonProps['valueCellColor']
}) => {
    const xLength = xRange.length
    const yLength = yRange.length

    const autoMaxValue = Math.max(...data.flat())
    const maxValue = _maxValue === 'auto' ? autoMaxValue : Math.max(_maxValue, autoMaxValue)
    const waffleCellCount = nearestSquare(maxValue / cellValue)
    const waffleCellSize = Math.sqrt(waffleCellCount)

    let width = _width
    let height = _height
    let cellSize: number
    if (xLength > yLength) {
        height = (width / xLength) * yLength
        cellSize = (width - spacing * (xLength + 1)) / xLength / waffleCellSize
    } else {
        width = (height / yLength) * xLength
        cellSize = (height - spacing * (yLength + 1)) / yLength / waffleCellSize
    }

    const originX = (_width - width) / 2
    const originY = (_height - height) / 2
    const waffleSize = cellSize * waffleCellSize

    const xAxis: WaffleGridAxisDataX = {
        ticks: xRange.map((xKey, index) => ({
            id: xKey,
            x: originX + spacing * (index + 1) + waffleSize * index,
            width: waffleSize,
        })),
        y: originY + height,
    }
    const yAxis: WaffleGridAxisDataY = {
        ticks: yRange.map((yKey, index) => ({
            id: yKey,
            y: originY + spacing * (index + 1) + waffleSize * index,
            height: waffleSize,
        })),
        x: originX,
    }

    const waffleArray = Array.from({ length: waffleCellSize })

    const cells: WaffleGridCellData[] = []
    let cellIndex = 0
    data.forEach((row, rowIndex) => {
        const waffleY = yAxis.ticks[rowIndex].y

        row.forEach((blockValue, columnIndex) => {
            const waffleX = xAxis.ticks[columnIndex].x

            const lastValueDotIndex = Math.min(Math.round(blockValue / cellValue), waffleCellCount)

            let cellWaffleIndex = 0
            waffleArray.forEach((_, dotRow) => {
                const cellY = waffleY + cellSize * dotRow

                waffleArray.forEach((__, dotColumn) => {
                    const cellX = waffleX + cellSize * dotColumn
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

    const theme = useTheme()

    const getBlankCellColor = useInheritedColor(blankCellColor, theme)
    const blankCells = cells
        .filter(cell => !cell.hasValue)
        .map((cell, index) => ({
            ...cell,
            index,
            color: getBlankCellColor(cell),
        }))

    const getValueCellColor = useInheritedColor(valueCellColor, theme)
    const valueCells = cells
        .filter(cell => cell.hasValue)
        .map((cell, index) => ({
            ...cell,
            index,
            color: getValueCellColor(cell),
        }))

    return {
        blankCells,
        valueCells,
        xAxis,
        yAxis,
    }
}
