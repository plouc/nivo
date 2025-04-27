import { useCallback, useMemo, useState } from 'react'
import { area, line } from 'd3-shape'
import uniqueId from 'lodash/uniqueId.js'
import { curveFromProp, useTheme, useValueFormatter } from '@nivo/core'
import {
    useOrdinalColorScale,
    useInheritedColor,
    OrdinalColorScaleConfig,
    InheritedColorConfig,
} from '@nivo/colors'
import { computeXYScalesForSeries } from '@nivo/scales'
import { commonDefaultProps, svgDefaultProps } from './defaults'
import {
    LineSeries,
    CommonLineProps,
    DataProps,
    InferX,
    InferY,
    InferSeriesId,
    LineSvgProps,
    LineGenerator,
    AreaGenerator,
    AllowedValue,
    ComputedSeries,
    Point,
    SliceData,
    PointColorContext,
} from './types'

export function useLineGenerator(curve: CommonLineProps<LineSeries>['curve']): LineGenerator {
    return useMemo(() => {
        return line<{
            x: number
            y: number
        }>()
            .defined(d => d.x !== null && d.y !== null)
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveFromProp(curve))
    }, [curve])
}

export function useAreaGenerator<Y extends AllowedValue>({
    curve,
    yScale,
    areaBaselineValue,
}: {
    curve: CommonLineProps<LineSeries>['curve']
    yScale: (y: Y) => number
    areaBaselineValue: Y
}): AreaGenerator {
    return useMemo(() => {
        return area<{
            x: number
            y: number
        }>()
            .defined(d => d.x !== null && d.y !== null)
            .x(d => d.x)
            .y1(d => d.y)
            .curve(curveFromProp(curve))
            .y0(yScale(areaBaselineValue))
    }, [curve, yScale, areaBaselineValue])
}

function usePoints<Series extends LineSeries>({
    series,
    getPointColor,
    getPointBorderColor,
    formatX,
    formatY,
}: {
    series: ComputedSeries<Series>[]
    getPointColor: (context: PointColorContext<Series>) => string
    getPointBorderColor: (point: Omit<Point<Series>, 'borderColor'>) => string
    formatX: (x: InferX<Series>) => string
    formatY: (y: InferY<Series>) => string
}) {
    return useMemo(() => {
        return series.reduce((acc, seriesItem, seriesIndex) => {
            return [
                ...acc,
                ...seriesItem.data
                    .filter(datum => datum.position.x !== null && datum.position.y !== null)
                    .map((datum, indexInSeries) => {
                        const point: Omit<Point<Series>, 'color' | 'borderColor'> & {
                            color?: string
                            borderColor?: string
                        } = {
                            id: `${seriesItem.id}.${indexInSeries}`,
                            indexInSeries,
                            absIndex: acc.length + indexInSeries,
                            seriesIndex,
                            seriesId: seriesItem.id,
                            seriesColor: seriesItem.color,
                            x: datum.position.x,
                            y: datum.position.y,
                            data: {
                                ...datum.data,
                                xFormatted: formatX(datum.data.x as InferX<Series>),
                                yFormatted: formatY(datum.data.y as InferY<Series>),
                            },
                        }
                        point.color = getPointColor({
                            series: seriesItem,
                            point: point as Omit<Point<Series>, 'color' | 'borderColor'>,
                        })
                        point.borderColor = getPointBorderColor(
                            point as Omit<Point<Series>, 'borderColor'>
                        )

                        return point as Point<Series>
                    }),
            ]
        }, [] as Point<Series>[])
    }, [series, getPointColor, getPointBorderColor, formatX, formatY])
}

export const useSlices = <Series extends LineSeries>({
    componentId,
    enableSlices,
    points,
    width,
    height,
}: {
    componentId: string
    enableSlices: Exclude<LineSvgProps<Series>['enableSlices'], undefined>
    points: Point<Series>[]
    width: number
    height: number
}) => {
    return useMemo(() => {
        if (enableSlices === 'x') {
            const map = new Map()
            points.forEach(point => {
                if (point.data.x === null || point.data.y === null) return
                if (!map.has(point.x)) map.set(point.x, [point])
                else map.get(point.x).push(point)
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
                        id: `slice:${componentId}:${x}`,
                        x0,
                        x,
                        y0: 0,
                        y: 0,
                        width: sliceWidth,
                        height,
                        points: slicePoints.reverse(),
                    } as SliceData<Series>
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
                    } as SliceData<Series>
                })
        }

        return []
    }, [componentId, enableSlices, height, points, width])
}

export const LINE_UNIQUE_ID_PREFIX = 'line'

export const useLine = <Series extends LineSeries>({
    data,
    xScale: xScaleSpec = commonDefaultProps.xScale,
    xFormat,
    yScale: yScaleSpec = commonDefaultProps.yScale,
    yFormat,
    width,
    height,
    colors = commonDefaultProps.colors as OrdinalColorScaleConfig<Series>,
    curve = commonDefaultProps.curve,
    areaBaselineValue = commonDefaultProps.areaBaselineValue as InferY<Series>,
    pointColor = commonDefaultProps.pointColor as InheritedColorConfig<PointColorContext<Series>>,
    pointBorderColor = commonDefaultProps.pointBorderColor as InheritedColorConfig<
        Omit<Point<Series>, 'borderColor'>
    >,
    enableSlices = svgDefaultProps.enableSlices as Exclude<
        LineSvgProps<Series>['enableSlices'],
        undefined
    >,
    initialHiddenIds = svgDefaultProps.initialHiddenIds as InferSeriesId<Series>[],
}: DataProps<Series> &
    Pick<
        CommonLineProps<Series>,
        | 'xScale'
        | 'yScale'
        | 'colors'
        | 'curve'
        | 'areaBaselineValue'
        | 'pointColor'
        | 'pointBorderColor'
    > & {
        xFormat?: CommonLineProps<Series>['xFormat']
        yFormat?: CommonLineProps<Series>['yFormat']
    } & Pick<LineSvgProps<Series>, 'enableSlices' | 'initialHiddenIds'> & {
        width: number
        height: number
    }): {
    legendData: {
        id: InferSeriesId<Series>
        label: string
        color: string
        hidden: boolean
    }[]
    toggleSeries: (id: InferSeriesId<Series>) => void
    lineGenerator: LineGenerator
    areaGenerator: AreaGenerator
    getColor: (series: Series) => string
    series: ComputedSeries<Series>[]
    xScale: (x: InferX<Series>) => number
    yScale: (y: InferY<Series>) => number
    slices: SliceData<Series>[]
    points: Point<Series>[]
} => {
    const [componentId] = useState(uniqueId(LINE_UNIQUE_ID_PREFIX))
    const formatX = useValueFormatter(xFormat)
    const formatY = useValueFormatter(yFormat)
    const getColor = useOrdinalColorScale(colors, 'id')
    const theme = useTheme()
    const getPointColor = useInheritedColor(pointColor, theme)
    const getPointBorderColor = useInheritedColor(pointBorderColor, theme)
    const [hiddenIds, setHiddenIds] = useState(initialHiddenIds ?? [])

    const {
        xScale,
        yScale,
        series: rawSeries,
    } = useMemo(
        () =>
            computeXYScalesForSeries<Series, Series['data'][number]>(
                data.filter(item => hiddenIds.indexOf(item.id as InferSeriesId<Series>) === -1),
                xScaleSpec,
                yScaleSpec,
                width,
                height
            ),
        [data, hiddenIds, xScaleSpec, yScaleSpec, width, height]
    )

    const { legendData, series } = useMemo(() => {
        const dataWithColor = data.map(seriesItem => ({
            id: seriesItem.id as InferSeriesId<Series>,
            label: `${seriesItem.id}`,
            color: getColor(seriesItem),
        }))

        const series = dataWithColor
            .map(datum => ({
                ...rawSeries.find(seriesItem => seriesItem.id === datum.id)!,
                color: datum.color,
            }))
            .filter(item => Boolean(item.id)) as unknown as ComputedSeries<Series>[]

        const legendData = dataWithColor
            .map(item => ({
                ...item,
                hidden: !series.find(seriesItem => seriesItem.id === item.id),
            }))
            .reverse()

        return { legendData, series }
    }, [data, rawSeries, getColor])

    const toggleSeries = useCallback((id: InferSeriesId<Series>) => {
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

    const slices = useSlices<Series>({
        componentId,
        enableSlices,
        points,
        width,
        height,
    })

    const lineGenerator = useLineGenerator(curve)
    const areaGenerator = useAreaGenerator<InferY<Series>>({
        curve,
        yScale: yScale as (y: InferY<Series>) => number,
        areaBaselineValue,
    })

    return {
        legendData,
        toggleSeries,
        lineGenerator,
        areaGenerator,
        getColor,
        series,
        xScale: xScale as (x: InferX<Series>) => number,
        yScale: yScale as (y: InferY<Series>) => number,
        slices,
        points,
    }
}
