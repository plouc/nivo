import { scaleBand } from 'd3-scale'
import { castBandScale } from '@nivo/scales'
import { ComputedCell, HeatMapCommonProps, HeatMapDataProps, HeatMapDatum } from './types'

export const computeCells = <Datum extends HeatMapDatum, ExtraProps extends object>({
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
}) => {
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

    return {
        xScale,
        yScale,
        minValue: Math.min(...allValues),
        maxValue: Math.max(...allValues),
        cells: cellsWithPosition,
    }
}
