import { createElement, MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react'
import { useTransition } from '@react-spring/web'
import { line as d3Line, curveLinearClosed } from 'd3-shape'
import { useMotionConfig, useTheme, useValueFormatter } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import {
    InheritedColorConfig,
    OrdinalColorScaleConfig,
    useInheritedColor,
    useOrdinalColorScale,
} from '@nivo/colors'
import { generateGrid, GridCell, GridFillDirection, Vertex, getCellsPolygons } from '@nivo/grid'
import {
    CommonProps,
    ComputedDatum,
    Datum,
    DataProps,
    EmptyCell,
    Cell,
    DataCell,
    isDataCell,
    MouseHandlers,
    TooltipComponent,
    LegendDatum,
    WaffleSvgProps,
    CustomLayerProps,
    CellAnimatedProps,
} from './types'
import { commonDefaultProps } from './defaults'

/**
 * Computes empty cells according to dimensions/layout/padding.
 * At this stage the cells aren't bound to any data.
 */
export const computeGrid = (
    width: number,
    height: number,
    rows: number,
    columns: number,
    fillDirection: GridFillDirection,
    emptyColor: string,
    emptyOpacity: number
) => {
    const extend = (cell: GridCell, origin: [number, number]): EmptyCell => ({
        ...cell,
        x: origin[0] + cell.x,
        y: origin[1] + cell.y,
        color: emptyColor,
        opacity: emptyOpacity,
    })

    // We do not apply the padding at this stage so that we can
    // easily compute the polygon surrounding each "area"
    // (all cells belonging to a specific datum), because they
    // need to touch.
    const { cells } = generateGrid<EmptyCell>({
        width,
        height,
        rows,
        columns,
        fillDirection,
        square: true,
        extend,
    })

    return cells
}

export const mergeCellsData = <RawDatum extends Datum>(
    cells: EmptyCell[],
    data: ComputedDatum<RawDatum>[]
) => {
    const cellsCopy: Cell<RawDatum>[] = cells.map(cell => ({ ...cell }))

    data.forEach(datum => {
        for (let index = datum.startAt; index < datum.endAt; index++) {
            const cell = cellsCopy[index]
            if (cell !== undefined) {
                const cellWithData = cell as DataCell<RawDatum>
                cellWithData.data = datum
                cellWithData.color = datum.color
                cellWithData.opacity = 1
            }
        }
    }, [])

    return cellsCopy
}

/**
 * Assumes that cells ares sorted by group.
 */
const findPolygons = <D extends Datum>(grid: DataCell<D>[]) => {
    const grouped = grid.reduce((acc, cell) => {
        ;(acc[cell.data.id] = acc[cell.data.id] || []).push(cell)
        return acc
    }, {} as Record<string | number, DataCell<D>[]>)

    const polygons: Partial<Record<D['id'], Vertex[][]>> = {}
    for (const [group, cells] of Object.entries(grouped)) {
        polygons[group as D['id']] = getCellsPolygons(cells)
    }

    return polygons
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
    colors = commonDefaultProps.colors as OrdinalColorScaleConfig<D>,
    emptyColor = commonDefaultProps.emptyColor,
    emptyOpacity = commonDefaultProps.emptyOpacity,
    borderColor = commonDefaultProps.borderColor as InheritedColorConfig<ComputedDatum<D>>,
    forwardLegendData,
}: // `defs` and `fill` are only supported for the SVG implementation
// defs = [],
// fill = [],
Pick<
    CommonProps<D>,
    | 'hiddenIds'
    | 'valueFormat'
    | 'fillDirection'
    | 'colors'
    | 'emptyColor'
    | 'emptyOpacity'
    | 'borderColor'
> &
    Pick<WaffleSvgProps<D>, 'defs' | 'fill'> &
    DataProps<D> & {
        width: number
        height: number
        forwardLegendData?: CommonProps<D>['forwardLegendData']
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
            const isHidden = hiddenIds.includes(datum.id)

            const startAt = currentPosition
            let endAt = startAt
            if (!isHidden) {
                endAt = startAt + Math.round(datum.value / unit)
            }
            currentPosition = endAt

            const color = getColor(datum)

            const enhancedDatum: ComputedDatum<D> = {
                id: datum.id,
                isHidden,
                label: datum.label,
                value: datum.value,
                formattedValue: formatValue(datum.value),
                groupIndex,
                startAt,
                endAt,
                color,
                // Temporary, it's re-computed later as the inherited color
                // needs the computed data.
                borderColor: color,
                data: datum,
                polygons: [],
            }
            enhancedDatum.borderColor = getBorderColor(enhancedDatum)

            enhancedData.push(enhancedDatum)
        })

        return enhancedData
    }, [data, hiddenIds, unit, formatValue, getColor, getBorderColor])

    const emptyCells = useMemo(
        () => computeGrid(width, height, rows, columns, fillDirection, emptyColor, emptyOpacity),
        [width, height, rows, columns, fillDirection, emptyColor, emptyOpacity]
    )

    const cells = useMemo(
        () => mergeCellsData(emptyCells, computedData),
        [emptyCells, computedData]
    )

    const polygons = useMemo(() => findPolygons(cells.filter(isDataCell)), [cells])
    computedData.forEach(datum => {
        if (datum.id in polygons) {
            datum.polygons = polygons[datum.id as D['id']]!
        }
    })

    const legendData: LegendDatum<D>[] = useMemo(() => {
        const _legendData = computedData.map(datum => ({
            id: datum.id,
            label: datum.label,
            color: datum.color,
            // fill: datum.fill,,
            data: datum,
        }))

        // Adjust the legend items order according to `fillDirection`
        // so that it's more natural to read.
        if (['top', 'left'].includes(fillDirection)) {
            _legendData.reverse()
        }

        return _legendData
    }, [computedData, fillDirection])

    // Forward the legends data if `forwardLegendData` is defined.
    const forwardLegendDataRef = useRef(forwardLegendData)
    useEffect(() => {
        if (typeof forwardLegendDataRef.current !== 'function') return
        forwardLegendDataRef.current(legendData)
    }, [forwardLegendDataRef, legendData])

    return {
        cells,
        computedData,
        legendData,
        getBorderColor,
    }
}

/**
 * This D3 path generator is used to compute the polygons
 * surrounding each group of cells attached to the same datum.
 */
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

export const useAnimatedCells = <D extends Datum>({
    cells,
    padding,
    motionStagger,
}: {
    cells: Cell<D>[]
    padding: number
    motionStagger: number
}) => {
    const { animate, config: springConfig } = useMotionConfig()

    const getAnimatedProps = useMemo(
        () =>
            (cell: Cell<D>): CellAnimatedProps => ({
                x: cell.x + padding / 2,
                y: cell.y + padding / 2,
                fill: cell.color,
                size: cell.width - padding,
                opacity: cell.opacity,
            }),
        [padding]
    )

    return useTransition<Cell<D>, CellAnimatedProps>(cells, {
        keys: cell => cell.key,
        initial: getAnimatedProps,
        enter: getAnimatedProps,
        update: getAnimatedProps,
        trail: animate ? motionStagger : undefined,
        config: springConfig,
        immediate: !animate,
    })
}

/**
 * Memoize custom layers props.
 */
export const useCustomLayerProps = <D extends Datum>({
    cells,
    computedData,
}: CustomLayerProps<D>): CustomLayerProps<D> =>
    useMemo(
        () => ({
            cells,
            computedData,
        }),
        [cells, computedData]
    )
