import { useMemo, useCallback } from 'react'
import {
    useTheme,
    usePropertyAccessor,
    useValueFormatter,
    // @ts-ignore
    getLabelGenerator,
} from '@nivo/core'
import { useInheritedColor, useContinuousColorScale } from '@nivo/colors'
import {
    ComputedCell,
    DefaultHeatMapDatum,
    HeatMapCommonProps,
    HeatMapDataProps,
    HeatMapDatum,
} from './types'
import { commonDefaultProps } from './defaults'
import { computeCells } from './compute'

export const useComputeCells = <Datum extends HeatMapDatum, ExtraProps extends object>({
    data,
    width,
    height,
    xInnerPadding,
    xOuterPadding,
    yInnerPadding,
    yOuterPadding,
}: {
    data: HeatMapDataProps<Datum, ExtraProps>['data']
    width: number
    height: number
    xInnerPadding: HeatMapCommonProps<Datum>['xInnerPadding']
    xOuterPadding: HeatMapCommonProps<Datum>['xOuterPadding']
    yInnerPadding: HeatMapCommonProps<Datum>['yInnerPadding']
    yOuterPadding: HeatMapCommonProps<Datum>['yOuterPadding']
}) =>
    useMemo(
        () =>
            computeCells<Datum, ExtraProps>({
                data,
                width,
                height,
                xInnerPadding,
                xOuterPadding,
                yInnerPadding,
                yOuterPadding,
            }),
        [data, width, height, xInnerPadding, xOuterPadding, yInnerPadding, yOuterPadding]
    )

const computeX = (column: number, cellWidth: number, padding: number) => {
    return column * cellWidth + cellWidth * 0.5 + padding * column + padding
}
const computeY = (row: number, cellHeight: number, padding: number) => {
    return row * cellHeight + cellHeight * 0.5 + padding * row + padding
}

const isHoverTargetByType = {
    cell: (cell: ComputedCell<object>, current: ComputedCell<object>) =>
        cell.xKey === current.xKey && cell.yKey === current.yKey,
    row: (cell: ComputedCell<object>, current: ComputedCell<object>) => cell.yKey === current.yKey,
    column: (cell: ComputedCell<object>, current: ComputedCell<object>) =>
        cell.xKey === current.xKey,
    rowColumn: (cell: ComputedCell<object>, current: ComputedCell<object>) =>
        cell.xKey === current.xKey || cell.yKey === current.yKey,
}

/*
const computeCells = <Datum extends object>({
    data,
    keys,
    getIndex,
    xScale,
    yScale,
    sizeScale,
    cellOpacity,
    cellWidth,
    cellHeight,
    colorScale,
    nanColor,
    getLabel,
    getLabelTextColor,
}: {
    data: HeatMapDataProps<Datum>['data']
    keys: HeatMapCommonProps<Datum>['keys']
    getIndex: (datum: Datum) => string | number
}) => {
    const cells = []
    data.forEach(datum => {
        keys.forEach(key => {
            const value = datum[key]
            const label = getLabel(datum, key)
            const index = getIndex(datum)
            const sizeMultiplier = sizeScale ? sizeScale(value) : 1
            const width = sizeMultiplier * cellWidth
            const height = sizeMultiplier * cellHeight

            const cell = {
                id: `${key}.${index}`,
                xKey: key,
                yKey: index,
                x: xScale(key),
                y: yScale(index),
                width,
                height,
                value,
                label,
                color: isNaN(value) ? nanColor : colorScale(value),
                opacity: cellOpacity,
            }
            cell.labelTextColor = getLabelTextColor(cell)

            cells.push(cell)
        })
    })

    return cells
}
*/

export const useHeatMap = <
    Datum extends HeatMapDatum = DefaultHeatMapDatum,
    ExtraProps extends object = Record<string, never>
>({
    data,
    minValue: _minValue = commonDefaultProps.minValue,
    maxValue: _maxValue = commonDefaultProps.maxValue,
    valueFormat,
    width,
    height,
    forceSquare = commonDefaultProps.forceSquare,
    xOuterPadding = commonDefaultProps.xOuterPadding,
    xInnerPadding = commonDefaultProps.xInnerPadding,
    yOuterPadding = commonDefaultProps.yOuterPadding,
    yInnerPadding = commonDefaultProps.yInnerPadding,
    sizeVariation,
    colors = commonDefaultProps.colors as HeatMapCommonProps<Datum>['colors'],
    nanColor,
    opacity,
    activeOpacity,
    inactiveOpacity,
    borderColor = commonDefaultProps.borderColor as HeatMapCommonProps<Datum>['borderColor'],
    label = commonDefaultProps.label as HeatMapCommonProps<Datum>['label'],
    labelTextColor = commonDefaultProps.labelTextColor as HeatMapCommonProps<Datum>['labelTextColor'],
    hoverTarget,
}: {
    data: HeatMapDataProps<Datum, ExtraProps>['data']
    minValue?: HeatMapCommonProps<Datum>['minValue']
    maxValue?: HeatMapCommonProps<Datum>['maxValue']
    valueFormat?: HeatMapCommonProps<Datum>['valueFormat']
    width: number
    height: number
    forceSquare?: HeatMapCommonProps<Datum>['forceSquare']
    xOuterPadding?: HeatMapCommonProps<Datum>['xOuterPadding']
    xInnerPadding?: HeatMapCommonProps<Datum>['xInnerPadding']
    yOuterPadding?: HeatMapCommonProps<Datum>['yOuterPadding']
    yInnerPadding?: HeatMapCommonProps<Datum>['yInnerPadding']
    sizeVariation?: HeatMapCommonProps<Datum>['sizeVariation']
    colors?: HeatMapCommonProps<Datum>['colors']
    nanColor?: HeatMapCommonProps<Datum>['nanColor']
    opacity?: HeatMapCommonProps<Datum>['opacity']
    activeOpacity?: HeatMapCommonProps<Datum>['activeOpacity']
    inactiveOpacity?: HeatMapCommonProps<Datum>['inactiveOpacity']
    borderColor?: HeatMapCommonProps<Datum>['borderColor']
    label?: HeatMapCommonProps<Datum>['label']
    labelTextColor?: HeatMapCommonProps<Datum>['labelTextColor']
    hoverTarget?: HeatMapCommonProps<Datum>['hoverTarget']
}) => {
    const { cells, xScale, yScale, minValue, maxValue } = useComputeCells<Datum, ExtraProps>({
        data,
        width,
        height,
        xOuterPadding,
        xInnerPadding,
        yOuterPadding,
        yInnerPadding,
    })

    const colorScale = useContinuousColorScale(colors, {
        min: minValue,
        max: maxValue,
    })

    const getColor = useCallback(
        (cell: Omit<ComputedCell<Datum>, 'color' | 'opacity' | 'borderColor'>) =>
            colorScale(cell.value),
        [colorScale]
    )
    const theme = useTheme()
    const getBorderColor = useInheritedColor(borderColor, theme)
    const getLabelTextColor = useInheritedColor(labelTextColor, theme)
    const formatValue = useValueFormatter(valueFormat)
    const getLabel = usePropertyAccessor(label)

    const computedCells = cells.map(cell => {
        const computedCell = {
            ...cell,
            formattedValue: formatValue(cell.value),
            opacity: 1,
        } as ComputedCell<Datum>

        computedCell.label = getLabel(computedCell)
        computedCell.color = getColor(computedCell)
        computedCell.borderColor = getBorderColor(computedCell)
        computedCell.labelTextColor = getLabelTextColor(computedCell)

        return computedCell
    })

    return {
        cells: computedCells,
        xScale,
        yScale,
        colorScale,
    }

    /*
    const [currentCellId, setCurrentCellId] = useState(null)

    const layoutConfig = useMemo(() => {
        const columns = keys.length
        const rows = data.length

        let cellWidth = Math.max((width - padding * (columns + 1)) / columns, 0)
        let cellHeight = Math.max((height - padding * (rows + 1)) / rows, 0)

        let offsetX = 0
        let offsetY = 0
        if (forceSquare === true) {
            const cellSize = Math.min(cellWidth, cellHeight)
            cellWidth = cellSize
            cellHeight = cellSize

            offsetX = (width - ((cellWidth + padding) * columns + padding)) / 2
            offsetY = (height - ((cellHeight + padding) * rows + padding)) / 2
        }

        return {
            cellWidth,
            cellHeight,
            offsetX,
            offsetY,
        }
    }, [data, keys, width, height, padding, forceSquare])

    const sizeScale = useMemo(() => {
        if (sizeVariation > 0) {
            return scaleLinear()
                .range([1 - sizeVariation, 1])
                .domain([values.min, values.max])
        }
    }, [sizeVariation, values])

    const getCellBorderColor = useInheritedColor(cellBorderColor, theme)
    const getLabelTextColor = useInheritedColor(labelTextColor, theme)

    const cells = useMemo(
        () =>
            computeCells<Datum>({
                data,
                keys,
                getIndex,
                xScale: scales.x,
                yScale: scales.y,
                sizeScale,
                cellOpacity,
                cellWidth: layoutConfig.cellWidth,
                cellHeight: layoutConfig.cellHeight,
                colorScale,
                nanColor,
                getLabel,
                getLabelTextColor,
            }),
        [
            data,
            keys,
            getIndex,
            scales,
            sizeScale,
            cellOpacity,
            layoutConfig,
            colorScale,
            nanColor,
            getLabel,
            getLabelTextColor,
        ]
    )

    const cellsWithCurrent = useMemo(() => {
        if (currentCellId === null) return cells

        const isHoverTarget = isHoverTargetByType[hoverTarget]
        const currentCell = cells.find(cell => cell.id === currentCellId)

        return cells.map(cell => {
            const opacity = isHoverTarget(cell, currentCell)
                ? cellHoverOpacity
                : cellHoverOthersOpacity

            if (opacity === cell.opacity) return cell

            return {
                ...cell,
                opacity,
            }
        })
    }, [cells, currentCellId, hoverTarget, cellHoverOpacity, cellHoverOthersOpacity])

    return {
        cells: cellsWithCurrent,
        getIndex,
        xScale: scales.x,
        yScale: scales.y,
        ...layoutConfig,
        sizeScale,
        currentCellId,
        setCurrentCellId,
        colorScale,
        getCellBorderColor,
        getLabelTextColor,
    }
    */
}
