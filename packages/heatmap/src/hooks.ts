import { useMemo, useCallback, useState } from 'react'
import { useTheme, usePropertyAccessor, useValueFormatter } from '@bitbloom/nivo-core'
import { useInheritedColor, getContinuousColorScale } from '@bitbloom/nivo-colors'
import { AnnotationMatcher, useAnnotations } from '@bitbloom/nivo-annotations'
import {
    ComputedCell,
    DefaultHeatMapDatum,
    HeatMapCommonProps,
    HeatMapDataProps,
    HeatMapDatum,
    SizeVariationConfig,
} from './types'
import { commonDefaultProps } from './defaults'
import {
    computeCells,
    computeSizeScale,
    getCellAnnotationPosition,
    getCellAnnotationDimensions,
} from './compute'

export const useComputeCells = <Datum extends HeatMapDatum, ExtraProps extends object>({
    data,
    width,
    height,
    xInnerPadding,
    xOuterPadding,
    yInnerPadding,
    yOuterPadding,
    forceSquare,
}: {
    data: HeatMapDataProps<Datum, ExtraProps>['data']
    width: number
    height: number
} & Pick<
    HeatMapCommonProps<Datum>,
    'xOuterPadding' | 'xInnerPadding' | 'yOuterPadding' | 'yInnerPadding' | 'forceSquare'
>) =>
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
                forceSquare,
            }),
        [
            data,
            width,
            height,
            xInnerPadding,
            xOuterPadding,
            yInnerPadding,
            yOuterPadding,
            forceSquare,
        ]
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
    useMemo(() => computeSizeScale(size, min, max), [size, min, max])

const useCellsStyle = <Datum extends HeatMapDatum = DefaultHeatMapDatum>({
    cells,
    minValue,
    maxValue,
    sizeVariation,
    colors,
    emptyColor,
    opacity,
    activeOpacity,
    inactiveOpacity,
    borderColor,
    label,
    labelTextColor,
    valueFormat,
    activeIds,
}: {
    cells: Omit<
        ComputedCell<Datum>,
        'formattedValue' | 'color' | 'opacity' | 'borderColor' | 'label' | 'labelTextColor'
    >[]
    minValue: number
    maxValue: number
    valueFormat?: HeatMapCommonProps<Datum>['valueFormat']
    activeIds: string[]
} & Pick<
    HeatMapCommonProps<Datum>,
    | 'sizeVariation'
    | 'colors'
    | 'emptyColor'
    | 'opacity'
    | 'activeOpacity'
    | 'inactiveOpacity'
    | 'borderColor'
    | 'label'
    | 'labelTextColor'
>) => {
    const getSize = useSizeScale(sizeVariation, minValue, maxValue)

    const colorScale = useMemo(() => {
        if (typeof colors === 'function') return null

        return getContinuousColorScale(colors, {
            min: minValue,
            max: maxValue,
        })
    }, [colors, minValue, maxValue])

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
    const theme = useTheme()
    const getBorderColor = useInheritedColor(borderColor, theme)
    const getLabelTextColor = useInheritedColor(labelTextColor, theme)

    const formatValue = useValueFormatter(valueFormat)
    const getLabel = usePropertyAccessor(label)

    const styledCells = useMemo(
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
        cells: styledCells,
        colorScale,
    }
}

export const useHeatMap = <
    Datum extends HeatMapDatum = DefaultHeatMapDatum,
    ExtraProps extends object = Record<string, never>
>({
    data,
    valueFormat,
    width: _width,
    height: _height,
    xOuterPadding = commonDefaultProps.xOuterPadding,
    xInnerPadding = commonDefaultProps.xInnerPadding,
    yOuterPadding = commonDefaultProps.yOuterPadding,
    yInnerPadding = commonDefaultProps.yInnerPadding,
    forceSquare = commonDefaultProps.forceSquare,
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
    width: number
    height: number
} & Partial<
    Pick<
        HeatMapCommonProps<Datum>,
        | 'valueFormat'
        | 'xOuterPadding'
        | 'xInnerPadding'
        | 'yOuterPadding'
        | 'yInnerPadding'
        | 'forceSquare'
        | 'sizeVariation'
        | 'colors'
        | 'emptyColor'
        | 'opacity'
        | 'activeOpacity'
        | 'inactiveOpacity'
        | 'borderColor'
        | 'label'
        | 'labelTextColor'
        | 'hoverTarget'
    >
>) => {
    const [activeCell, setActiveCell] = useState<ComputedCell<Datum> | null>(null)

    const { width, height, offsetX, offsetY, cells, xScale, yScale, minValue, maxValue } =
        useComputeCells<Datum, ExtraProps>({
            data,
            width: _width,
            height: _height,
            xOuterPadding,
            xInnerPadding,
            yOuterPadding,
            yInnerPadding,
            forceSquare,
        })

    const activeIds = useMemo(() => {
        if (!activeCell) return []

        const isHoverTarget = isHoverTargetByType[hoverTarget]

        return cells.filter(cell => isHoverTarget(cell, activeCell)).map(cell => cell.id)
    }, [cells, activeCell, hoverTarget])

    const { cells: computedCells, colorScale } = useCellsStyle<Datum>({
        cells,
        minValue,
        maxValue,
        sizeVariation,
        colors,
        emptyColor,
        opacity,
        activeOpacity,
        inactiveOpacity,
        borderColor,
        label,
        labelTextColor,
        valueFormat,
        activeIds,
    })

    return {
        width,
        height,
        offsetX,
        offsetY,
        cells: computedCells,
        xScale,
        yScale,
        colorScale,
        activeCell,
        setActiveCell,
    }
}

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
