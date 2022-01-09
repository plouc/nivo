import { useMemo, useCallback, useState } from 'react'
import { scaleLinear } from 'd3-scale'
import { useTheme, usePropertyAccessor, useValueFormatter } from '@nivo/core'
import { useInheritedColor, getContinuousColorScale } from '@nivo/colors'
import { AnnotationMatcher, useAnnotations } from '@nivo/annotations'
import {
    ComputedCell,
    DefaultHeatMapDatum,
    HeatMapCommonProps,
    HeatMapDataProps,
    HeatMapDatum,
    SizeVariationConfig,
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

const isHoverTargetByType = {
    cell: <Datum extends HeatMapDatum>(
        cell: Omit<
            ComputedCell<Datum>,
            'formattedValue' | 'color' | 'opacity' | 'borderColor' | 'label' | 'labelTextColor'
        >,
        current: ComputedCell<Datum>
    ) => cell.id === current.id,
    row: <Datum extends HeatMapDatum>(
        cell: Omit<
            ComputedCell<Datum>,
            'formattedValue' | 'color' | 'opacity' | 'borderColor' | 'label' | 'labelTextColor'
        >,
        current: ComputedCell<Datum>
    ) => cell.serieId === current.serieId,
    column: <Datum extends HeatMapDatum>(
        cell: Omit<
            ComputedCell<Datum>,
            'formattedValue' | 'color' | 'opacity' | 'borderColor' | 'label' | 'labelTextColor'
        >,
        current: ComputedCell<Datum>
    ) => cell.data.x === current.data.x,
    rowColumn: <Datum extends HeatMapDatum>(
        cell: Omit<
            ComputedCell<Datum>,
            'formattedValue' | 'color' | 'opacity' | 'borderColor' | 'label' | 'labelTextColor'
        >,
        current: ComputedCell<Datum>
    ) => cell.serieId === current.serieId || cell.data.x === current.data.x,
}

const useSizeScale = (
    size: false | SizeVariationConfig,
    min: number,
    max: number
): ((value: number | null) => number) =>
    useMemo(() => {
        if (!size) return () => 1

        const scale = scaleLinear()
            .domain(size.values ? size.values : [min, max])
            .range(size.sizes)

        return (value: number | null) => {
            if (value === null) return 1
            return scale(value)
        }
    }, [size, min, max])

export const useHeatMap = <
    Datum extends HeatMapDatum = DefaultHeatMapDatum,
    ExtraProps extends object = Record<string, never>
>({
    data,
    valueFormat,
    width,
    height,
    // forceSquare = commonDefaultProps.forceSquare,
    xOuterPadding = commonDefaultProps.xOuterPadding,
    xInnerPadding = commonDefaultProps.xInnerPadding,
    yOuterPadding = commonDefaultProps.yOuterPadding,
    yInnerPadding = commonDefaultProps.yInnerPadding,
    sizeVariation = commonDefaultProps.sizeVariation,
    colors = commonDefaultProps.colors as HeatMapCommonProps<Datum>['colors'],
    emptyColor = commonDefaultProps.emptyColor,
    opacity = commonDefaultProps.opacity,
    activeOpacity = commonDefaultProps.activeOpacity,
    inactiveOpacity = commonDefaultProps.inactiveOpacity,
    borderColor = commonDefaultProps.borderColor as HeatMapCommonProps<Datum>['borderColor'],
    label = commonDefaultProps.label as HeatMapCommonProps<Datum>['label'],
    labelTextColor = commonDefaultProps.labelTextColor as HeatMapCommonProps<Datum>['labelTextColor'],
    hoverTarget = commonDefaultProps.hoverTarget,
}: {
    data: HeatMapDataProps<Datum, ExtraProps>['data']
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
    emptyColor?: HeatMapCommonProps<Datum>['emptyColor']
    opacity?: HeatMapCommonProps<Datum>['opacity']
    activeOpacity?: HeatMapCommonProps<Datum>['activeOpacity']
    inactiveOpacity?: HeatMapCommonProps<Datum>['inactiveOpacity']
    borderColor?: HeatMapCommonProps<Datum>['borderColor']
    label?: HeatMapCommonProps<Datum>['label']
    labelTextColor?: HeatMapCommonProps<Datum>['labelTextColor']
    hoverTarget?: HeatMapCommonProps<Datum>['hoverTarget']
}) => {
    const [activeCell, setActiveCell] = useState<ComputedCell<Datum> | null>(null)

    const { cells, xScale, yScale, minValue, maxValue } = useComputeCells<Datum, ExtraProps>({
        data,
        width,
        height,
        xOuterPadding,
        xInnerPadding,
        yOuterPadding,
        yInnerPadding,
    })

    const colorScale = useMemo(() => {
        if (typeof colors === 'function') return null

        return getContinuousColorScale(colors, {
            min: minValue,
            max: maxValue,
        })
    }, [colors, minValue, maxValue])

    const activeIds = useMemo(() => {
        if (!activeCell) return []

        const isHoverTarget = isHoverTargetByType[hoverTarget]

        return cells.filter(cell => isHoverTarget(cell, activeCell)).map(cell => cell.id)
    }, [cells, activeCell, hoverTarget])

    const getColor = useCallback(
        (cell: Omit<ComputedCell<Datum>, 'color' | 'opacity' | 'borderColor'>) => {
            if (cell.value !== null) {
                if (typeof colors === 'function') return colors(cell)
                if (colorScale !== null) return colorScale(cell.value)
            }

            return emptyColor
        },
        [colors, colorScale, emptyColor]
    )
    const getSize = useSizeScale(sizeVariation, minValue, maxValue)
    const theme = useTheme()
    const getBorderColor = useInheritedColor(borderColor, theme)
    const getLabelTextColor = useInheritedColor(labelTextColor, theme)
    const formatValue = useValueFormatter(valueFormat)
    const getLabel = usePropertyAccessor(label)

    const computedCells = useMemo(
        () =>
            cells.map(cell => {
                let computedOpacity = opacity
                if (activeIds.length > 0) {
                    computedOpacity = activeIds.includes(cell.id) ? activeOpacity : inactiveOpacity
                }

                const sizeMultiplier = getSize(cell.value)

                const computedCell = {
                    ...cell,
                    width: cell.width * sizeMultiplier,
                    height: cell.height * sizeMultiplier,
                    formattedValue: cell.value !== null ? formatValue(cell.value) : null,
                    opacity: computedOpacity,
                } as ComputedCell<Datum>

                computedCell.label = getLabel(computedCell)
                computedCell.color = getColor(computedCell)
                computedCell.borderColor = getBorderColor(computedCell)
                computedCell.labelTextColor = getLabelTextColor(computedCell)

                return computedCell
            }),
        [
            cells,
            getSize,
            getColor,
            getBorderColor,
            getLabelTextColor,
            formatValue,
            getLabel,
            activeIds,
            opacity,
            activeOpacity,
            inactiveOpacity,
        ]
    )

    return {
        cells: computedCells,
        xScale,
        yScale,
        colorScale,
        activeCell,
        setActiveCell,
    }

    /*
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
    */
}

const getCellAnnotationPosition = <Datum extends HeatMapDatum>(cell: ComputedCell<Datum>) => ({
    x: cell.x,
    y: cell.y,
})

const getCellAnnotationDimensions = <Datum extends HeatMapDatum>(cell: ComputedCell<Datum>) => ({
    size: Math.max(cell.width, cell.height),
    width: cell.width,
    height: cell.height,
})

export const useCellAnnotations = <Datum extends HeatMapDatum>(
    cells: ComputedCell<Datum>[],
    annotations: AnnotationMatcher<ComputedCell<Datum>>[]
) =>
    useAnnotations<ComputedCell<Datum>>({
        data: cells,
        annotations,
        getPosition: getCellAnnotationPosition,
        getDimensions: getCellAnnotationDimensions,
    })
