import { useCallback, useMemo, useState } from 'react'
import { area, line } from 'd3-shape'
import { curveFromProp, useTheme, useValueFormatter } from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { computeXYScalesForSeries } from '@nivo/scales'
import { LineDefaultProps } from './props'
import { commonDefaultProps } from './defaults'
import {
    CurveInterpolation,
    LineCommonProps,
    LineDataProps,
    LineDatum,
    LinePointDatum,
    SliceDatum,
} from './types'

export const useLineGenerator = <Datum extends LineDatum>({
    curve,
}: {
    curve: CurveInterpolation
}) =>
    useMemo(
        () =>
            line<LinePointDatum<Datum>['position']>()
                .defined(d => d.x !== null && d.y !== null)
                .x(d => d.x)
                .y(d => d.y)
                .curve(curveFromProp(curve)),
        [curve]
    )

export const useAreaGenerator = <Datum extends LineDatum>({
    curve,
    yScale,
    areaBaselineValue,
}: {
    curve: CurveInterpolation
    yScale: any
    areaBaselineValue: Exclude<Datum['y'], null | undefined>
}) =>
    useMemo(
        () =>
            area<LinePointDatum<Datum>['position']>()
                .defined(d => d.x !== null && d.y !== null)
                .x(d => d.x)
                .y1(d => d.y)
                .curve(curveFromProp(curve))
                .y0(yScale(areaBaselineValue)),
        [curve, yScale, areaBaselineValue]
    )

const usePoints = <Datum extends LineDatum>({
    series,
    getPointColor,
    getPointBorderColor,
    formatX,
    formatY,
}: {
    series: any[]
    getPointColor: any
    getPointBorderColor: any
    formatX: any
    formatY: any
}): LinePointDatum<Datum>[] =>
    useMemo(() => {
        const points: LinePointDatum<Datum>[] = []

        series.forEach(serie => {
            serie.data
                // exclude undefined values
                .filter(datum => datum.position.x !== null && datum.position.y !== null)
                .forEach((datum, datumIndex) => {
                    const point = {
                        id: `${serie.id}.${datumIndex}`,
                        index: points.length,
                        serieId: serie.id,
                        serieColor: serie.color,
                        x: datum.position.x,
                        y: datum.position.y,
                    }
                    point.color = getPointColor(serie)
                    point.borderColor = getPointBorderColor(point)
                    point.data = {
                        ...datum.data,
                        xFormatted: formatX(datum.data.x),
                        yFormatted: formatY(datum.data.y),
                    }

                    points.push(point)
                })
        })

        return points
    }, [series, getPointColor, getPointBorderColor, formatX, formatY])

export const useSlices = <Datum extends LineDatum>({
    enableSlices,
    points,
    width,
    height,
}: {
    enableSlices: LineCommonProps<Datum>['enableSlices']
    points: LinePointDatum<Datum>[]
    width: number
    height: number
}) =>
    useMemo(() => {
        if (enableSlices === false) return []

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
                        id: x,
                        x0,
                        x,
                        y0: 0,
                        y: 0,
                        width: sliceWidth,
                        height,
                        points: slicePoints.reverse(),
                    }
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
                    }
                })
        }
    }, [enableSlices, points])

export const useLine = <Datum extends LineDatum>({
    data,
    xScale: xScaleSpec = commonDefaultProps.xScale,
    xFormat,
    yScale: yScaleSpec = commonDefaultProps.yScale,
    yFormat,
    width,
    height,
    colors = LineDefaultProps.colors,
    curve = commonDefaultProps.curve,
    areaBaselineValue = commonDefaultProps.areaBaselineValue,
    pointColor = LineDefaultProps.pointColor,
    pointBorderColor = LineDefaultProps.pointBorderColor,
    enableSlices = LineDefaultProps.enableSlices,
}: {
    data: LineDataProps<Datum, any>['data']
    xScale?: LineCommonProps<Datum>['xScale']
    xFormat?: LineCommonProps<Datum>['xFormat']
    yScale?: LineCommonProps<Datum>['yScale']
    yFormat?: LineCommonProps<Datum>['yFormat']
    width: number
    height: number
    colors: any
    curve?: CurveInterpolation
    areaBaselineValue?: Exclude<Datum['y'], null | undefined>
    pointColor: any
    pointBorderColor: any
    enableSlices?: LineCommonProps<Datum>['enableSlices']
}) => {
    const formatX = useValueFormatter(xFormat)
    const formatY = useValueFormatter(yFormat)

    const getColor = useOrdinalColorScale(colors, 'id')
    const theme = useTheme()
    const getPointColor = useInheritedColor(pointColor, theme)
    const getPointBorderColor = useInheritedColor(pointBorderColor, theme)

    const [hiddenIds, setHiddenIds] = useState<string[]>([])
    const toggleSerie = useCallback((id: string) => {
        setHiddenIds(state =>
            state.includes(id) ? state.filter(item => item !== id) : [...state, id]
        )
    }, [])

    const [currentPoint, setCurrentPoint] = useState<LinePointDatum<Datum> | null>(null)
    const [currentSlice, setCurrentSlice] = useState<SliceDatum<Datum> | null>(null)

    const {
        xScale,
        yScale,
        series: rawSeries,
    } = useMemo(
        () =>
            computeXYScalesForSeries(
                data.filter(item => !hiddenIds.includes(item.id)),
                xScaleSpec,
                yScaleSpec,
                width,
                height
            ),
        [data, hiddenIds, xScaleSpec, yScaleSpec, width, height]
    )

    const { legendData, series } = useMemo(() => {
        const dataWithColor = data.map(line => ({
            id: line.id,
            label: line.id,
            color: getColor(line),
        }))

        const series = dataWithColor
            .map(datum => ({
                ...rawSeries.find(serie => serie.id === datum.id),
                color: datum.color,
            }))
            .filter(item => Boolean(item.id))

        const _legendData = dataWithColor
            .map(item => ({ ...item, hidden: !series.find(serie => serie.id === item.id) }))
            .reverse()

        return {
            series,
            legendData: _legendData,
        }
    }, [data, rawSeries, getColor])

    const points = usePoints<Datum>({
        series,
        getPointColor,
        getPointBorderColor,
        formatX,
        formatY,
    })

    const slices = useSlices({
        enableSlices,
        points,
        width,
        height,
    })

    console.log('points', points)
    console.log('slices', slices)

    const lineGenerator = useLineGenerator<Datum>({ curve })
    const areaGenerator = useAreaGenerator<Datum>({
        curve,
        yScale,
        areaBaselineValue,
    })

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
        currentSlice,
        setCurrentSlice,
        points,
        currentPoint,
        setCurrentPoint,
    }
}
