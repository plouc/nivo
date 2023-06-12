import { scaleBand, scaleLinear } from 'd3-scale'
import { castBandScale } from '@bitbloom/nivo-scales'
import {
    ComputedCell,
    HeatMapCommonProps,
    HeatMapDataProps,
    HeatMapDatum,
    SizeVariationConfig,
} from './types'
import { arrayExtent } from '@bitbloom/nivo-core'

export const computeLayout = ({
    width: _width,
    height: _height,
    rows,
    columns,
    forceSquare,
}: {
    width: number
    height: number
    rows: number
    columns: number
    forceSquare: boolean
}) => {
    let width = _width
    let height = _height

    let offsetX = 0
    let offsetY = 0

    if (forceSquare) {
        const cellWidth = Math.max(_width / columns, 0)
        const cellHeight = Math.max(_height / rows, 0)
        const cellSize = Math.min(cellWidth, cellHeight)

        width = cellSize * columns
        height = cellSize * rows

        offsetX = (_width - width) / 2
        offsetY = (_height - height) / 2
    }

    return {
        offsetX,
        offsetY,
        width,
        height,
    }
}

export const computeCells = <Datum extends HeatMapDatum, ExtraProps extends object>({
    data,
    width: _width,
    height: _height,
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
>) => {
    const xValuesSet = new Set<Datum['x']>()
    const serieIds: string[] = []
    const allValues: number[] = []

    const cells: Pick<ComputedCell<Datum>, 'id' | 'serieId' | 'value' | 'data'>[] = []

    data.forEach(serie => {
        serieIds.push(serie.id)

        serie.data.forEach(datum => {
            xValuesSet.add(datum.x)

            let value: number | null = null
            if (datum.y !== undefined && datum.y !== null) {
                allValues.push(datum.y)
                value = datum.y
            }

            cells.push({
                id: `${serie.id}.${datum.x}`,
                serieId: serie.id,
                value,
                data: datum,
            })
        })
    })

    const xValues = Array.from(xValuesSet)

    const { width, height, offsetX, offsetY } = computeLayout({
        width: _width,
        height: _height,
        columns: xValues.length,
        rows: serieIds.length,
        forceSquare,
    })

    const xScale = castBandScale<Datum['x']>(
        scaleBand<Datum['x']>()
            .domain(xValues)
            .range([0, width])
            .paddingOuter(xOuterPadding)
            .paddingInner(xInnerPadding)
    )

    const yScale = castBandScale<string>(
        scaleBand<string>()
            .domain(serieIds)
            .range([0, height])
            .paddingOuter(yOuterPadding)
            .paddingInner(yInnerPadding)
    )

    const cellWidth = xScale.bandwidth()
    const cellHeight = yScale.bandwidth()

    const cellsWithPosition: Omit<
        ComputedCell<Datum>,
        'formattedValue' | 'color' | 'opacity' | 'borderColor' | 'label' | 'labelTextColor'
    >[] = cells.map(cell => ({
        ...cell,
        x: xScale(cell.data.x)! + cellWidth / 2,
        y: yScale(cell.serieId)! + cellHeight / 2,
        width: cellWidth,
        height: cellHeight,
    }))

    const [min,max] = arrayExtent(allValues)

    return {
        width,
        height,
        offsetX,
        offsetY,
        xScale,
        yScale,
        minValue: min,
        maxValue: max,
        cells: cellsWithPosition,
    }
}

export const computeSizeScale = (
    size: false | SizeVariationConfig,
    min: number,
    max: number
): ((value: number | null) => number) => {
    if (!size) return () => 1

    const scale = scaleLinear()
        .domain(size.values ? size.values : [min, max])
        .range(size.sizes)

    return (value: number | null) => {
        if (value === null) return 1
        return scale(value)
    }
}

export const getCellAnnotationPosition = <Datum extends HeatMapDatum>(
    cell: ComputedCell<Datum>
) => ({
    x: cell.x,
    y: cell.y,
})

export const getCellAnnotationDimensions = <Datum extends HeatMapDatum>(
    cell: ComputedCell<Datum>
) => ({
    size: Math.max(cell.width, cell.height),
    width: cell.width,
    height: cell.height,
})
