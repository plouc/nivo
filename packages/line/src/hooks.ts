import { useCallback, useMemo, useState } from 'react'
import { area, line } from 'd3-shape'
import { curveFromProp, LineCurveFactoryId, useTheme, useValueFormatter } from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor, OrdinalColorScale } from '@nivo/colors'
import { AnyScale, computeXYScalesForSeries } from '@nivo/scales'
import {
    AreaGenerator,
    ComputedSeries,
    LegendDatum,
    LineCommonProps,
    LineDataProps,
    LineDatum,
    LineGenerator,
    LineSeries,
    PointDatum,
    PointPosition,
    SliceDatum,
} from './types'
import { commonDefaultProps } from './props'

export const useLineGenerator = ({ curve }: { curve: LineCurveFactoryId }): LineGenerator =>
    useMemo(
        () =>
            line<PointPosition>()
                .defined(d => d.x !== null && d.y !== null)
                .x(d => d.x as number)
                .y(d => d.y as number)
                .curve(curveFromProp(curve)),
        [curve]
    )

export const useAreaGenerator = <Datum extends LineDatum>({
    curve,
    yScale,
    areaBaselineValue,
}: {
    curve: LineCurveFactoryId
    yScale: AnyScale
    areaBaselineValue: Exclude<Datum['y'], null | undefined>
}): AreaGenerator =>
    useMemo(() => {
        return area<PointPosition>()
            .defined(d => d.x !== null && d.y !== null)
            .x(d => d.x as number)
            .y1(d => d.y as number)
            .curve(curveFromProp(curve))
            .y0(yScale(areaBaselineValue))
    }, [curve, yScale, areaBaselineValue])

const usePoints = <Series extends LineSeries>({
    series,
    getPointColor,
    getPointBorderColor,
    formatX,
    formatY,
}: {
    series: ComputedSeries<Series>[]
    getPointColor: (point: PointDatum<Series['data'][0]>) => string
    getPointBorderColor: (point: PointDatum<Series['data'][0]>) => string
    formatX: (value: Exclude<Series['data'][0]['x'], null | undefined>) => string
    formatY: (value: Exclude<Series['data'][0]['y'], null | undefined>) => string
}): PointDatum<Series['data'][0]>[] => {
    return useMemo(() => {
        return series.reduce((acc, serie) => {
            return [
                ...acc,
                ...serie.data
                    .filter(datum => datum.position.x !== null && datum.position.y !== null)
                    .map((datum, i) => {
                        const point: Omit<
                            PointDatum<Series['data'][0]>,
                            'color' | 'borderColor'
                        > = {
                            id: `${serie.id}.${i}`,
                            index: acc.length + i,
                            serieId: serie.id,
                            serieColor: serie.color,
                            x: datum.position.x as number,
                            y: datum.position.y as number,
                            data: {
                                ...datum.data,
                                xFormatted: formatX(datum.data.x),
                                yFormatted: formatY(datum.data.y),
                            },
                        }
                        point.color = getPointColor(serie)
                        point.borderColor = getPointBorderColor(point)

                        return point as PointDatum<Series['data'][0]>
                    }),
            ]
        }, [] as PointDatum<Series['data'][0]>[])
    }, [series, getPointColor, getPointBorderColor, formatX, formatY])
}

/**
 * Compute slices for a specific axis, either `x` or `y`.
 * We'll have one slice for each unique value on the specified axis.
 * We're also computing the dimension of each slice, as a rectangle.
 */
export const useSlices = <Datum extends LineDatum>({
    enableSlices,
    points,
    width,
    height,
}: {
    enableSlices: LineCommonProps<LineSeries>['enableSlices']
    points: PointDatum<Datum>[]
    width: number
    height: number
}): SliceDatum<Datum>[] => {
    return useMemo(() => {
        if (enableSlices === 'x') {
            const map = new Map()

            points.forEach(point => {
                if (point.data.x === null || point.data.y === null) return
                if (!map.has(point.x)) {
                    map.set(point.x, [point])
                } else {
                    map.get(point.x).push(point)
                }
            })

            return Array.from(map.entries())
                .sort((a, b) => a[0] - b[0])
                .map(([x, slicePoints], i, slices) => {
                    const prevSlice = slices[i - 1]
                    const nextSlice = slices[i + 1]

                    let x0
                    if (!prevSlice) x0 = x
                    else x0 = x - (x - prevSlice[0]) / 2

                    let sliceWidth
                    if (!nextSlice) sliceWidth = width - x0
                    else sliceWidth = x - x0 + (nextSlice[0] - x) / 2

                    return {
                        id: x,
                        x0,
                        x,
                        y0: 0,
                        y: 0,
                        width: sliceWidth,
                        height,
                        points: slicePoints.reverse(),
                    } as SliceDatum<Datum>
                })
        } else if (enableSlices === 'y') {
            const map = new Map()

            points.forEach(point => {
                if (point.data.x === null || point.data.y === null) return
                if (!map.has(point.y)) map.set(point.y, [point])
                else map.get(point.y).push(point)
            })

            return Array.from(map.entries())
                .sort((a, b) => a[0] - b[0])
                .map(([y, slicePoints], i, slices) => {
                    const prevSlice = slices[i - 1]
                    const nextSlice = slices[i + 1]

                    let y0
                    if (!prevSlice) y0 = y
                    else y0 = y - (y - prevSlice[0]) / 2

                    let sliceHeight
                    if (!nextSlice) sliceHeight = height - y0
                    else sliceHeight = y - y0 + (nextSlice[0] - y) / 2

                    return {
                        id: y,
                        x0: 0,
                        x: 0,
                        y0,
                        y,
                        width,
                        height: sliceHeight,
                        points: slicePoints.reverse(),
                    } as SliceDatum<Datum>
                })
        }

        return []
    }, [enableSlices, points])
}

export const useLine = <Series extends LineSeries>({
    data,
    xScale: xScaleSpec = commonDefaultProps.xScale,
    xFormat,
    yScale: yScaleSpec = commonDefaultProps.yScale,
    yFormat,
    width,
    height,
    colors = commonDefaultProps.colors,
    curve = commonDefaultProps.curve,
    areaBaselineValue = commonDefaultProps.areaBaselineValue as Exclude<
        Series['data'][0]['y'],
        null | undefined
    >,
    pointColor = commonDefaultProps.pointColor,
    pointBorderColor = commonDefaultProps.pointBorderColor,
    enableSlices = commonDefaultProps.enableSlices,
}: {
    data: LineDataProps<Series>['data']
    xScale: LineCommonProps<Series>['xScale']
    xFormat?: LineCommonProps<Series>['xFormat']
    yScale: LineCommonProps<Series>['yScale']
    yFormat?: LineCommonProps<Series>['yFormat']
    width: number
    height: number
    colors?: LineCommonProps<Series>['colors']
    curve?: LineCommonProps<Series>['curve']
    areaBaselineValue: LineCommonProps<Series>['areaBaselineValue']
    pointColor?: LineCommonProps<Series>['pointColor']
    pointBorderColor?: LineCommonProps<Series>['pointBorderColor']
    enableSlices?: LineCommonProps<Series>['enableSlices']
}): {
    legendData: readonly LegendDatum[]
    toggleSerie: (id: LineSeries['id']) => void
    lineGenerator: LineGenerator
    areaGenerator: AreaGenerator
    getColor: OrdinalColorScale<Series>
    series: readonly ComputedSeries<Series>[]
    xScale: AnyScale
    yScale: AnyScale
    slices: readonly SliceDatum<Series['data'][0]>[]
    points: readonly PointDatum<Series['data'][0]>[]
} => {
    const formatX = useValueFormatter(xFormat)
    const formatY = useValueFormatter(yFormat)

    const getColor = useOrdinalColorScale(colors, 'id')

    const theme = useTheme()
    const getPointColor = useInheritedColor(pointColor, theme)
    const getPointBorderColor = useInheritedColor(pointBorderColor, theme)

    const [hiddenIds, setHiddenIds] = useState<LineSeries['id'][]>([])

    const {
        xScale,
        yScale,
        series: rawSeries,
    } = useMemo(
        () =>
            computeXYScalesForSeries<Series, Series['data'][0]>(
                data.filter(item => hiddenIds.indexOf(item.id) === -1),
                xScaleSpec,
                yScaleSpec,
                width,
                height
            ),
        [data, hiddenIds, xScaleSpec, yScaleSpec, width, height]
    )

    const { legendData, series } = useMemo(() => {
        // Not excluding series according to `hiddenIds` here,
        // as we want all series shown in the legends.
        const dataWithColor: readonly LegendDatum[] = data.map(line => ({
            id: line.id,
            label: line.id,
            color: getColor(line),
            hidden: false,
        }))

        const series: ComputedSeries<Series>[] = dataWithColor
            .map(datum => ({
                ...rawSeries.find(serie => serie.id === datum.id)!,
                color: datum.color,
            }))
            .filter(item => Boolean(item.id))

        const legendData = dataWithColor
            .map(item => ({ ...item, hidden: !series.find(serie => serie.id === item.id) }))
            .reverse()

        return { legendData, series }
    }, [data, rawSeries, getColor])

    const toggleSerie = useCallback((id: LineSeries['id']) => {
        setHiddenIds(state =>
            state.indexOf(id) > -1 ? state.filter(item => item !== id) : [...state, id]
        )
    }, [])

    const points = usePoints<Series>({
        series,
        getPointColor,
        getPointBorderColor,
        formatX,
        formatY,
    })

    const slices = useSlices<Series['data'][0]>({
        enableSlices,
        points,
        width,
        height,
    })

    const lineGenerator = useLineGenerator({ curve })
    const areaGenerator = useAreaGenerator<Series['data'][0]>({
        curve,
        yScale,
        areaBaselineValue,
    })

    // console.log({
    //     legendData,
    //     toggleSerie,
    //     lineGenerator,
    //     areaGenerator,
    //     getColor,
    //     series,
    //     xScale,
    //     yScale,
    //     slices,
    //     points,
    // })

    return {
        legendData,
        toggleSerie,
        lineGenerator,
        areaGenerator,
        getColor,
        series,
        xScale,
        yScale,
        slices,
        points,
    }
}
