/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useCallback, useMemo, useState } from 'react'
import { area, line } from 'd3-shape'
import { curveFromProp, useTheme, useValueFormatter } from '@bitbloom/nivo-core'
import { useOrdinalColorScale, useInheritedColor } from '@bitbloom/nivo-colors'
import { computeXYScalesForSeries } from '@bitbloom/nivo-scales'
import { LineDefaultProps } from './props'

export const useLineGenerator = ({ curve }) => {
    return useMemo(
        () =>
            line()
                .defined(d => d.x !== null && d.y !== null)
                .x(d => d.x | 0)
                .y(d => d.y | 0)
                .curve(curveFromProp(curve)),
        [curve]
    )
}

export const useAreaGenerator = ({ curve, yScale, areaBaselineValue }) => {
    return useMemo(() => {
        return area()
            .defined(d => d.x !== null && d.y !== null)
            .x(d => d.x)
            .y1(d => d.y)
            .curve(curveFromProp(curve))
            .y0(yScale(areaBaselineValue))
    }, [curve, yScale, areaBaselineValue])
}

const usePoints = ({ series, getPointColor, getPointBorderColor, formatX, formatY }) => {
    return useMemo(() => {
        let pointCount = 0
        for (let i = 0; i < series.length; ++i) {
            const serie = series[i]

            for (let j = 0; j < serie.data.length; ++j) {
                const datum = serie.data[j]
                if (datum.position.x !== null && datum.position.y !== null) ++pointCount
            }
        }

        let points = new Array(pointCount)
        let pointIndex = 0
        const fixedBorderColor = getPointBorderColor.length === 0 ? getPointBorderColor() : undefined

        for (let i = 0; i < series.length; ++i) {
            const serie = series[i]
            const pointColor = getPointColor(serie)

            for (let j = 0; j < serie.data.length; ++j) {
                const datum = serie.data[j]
                if (datum.position.x === null || datum.position.y === null) continue
                const point = {
                    id: `${serie.id}.${i}`,
                    index: pointIndex,
                    serieId: serie.id,
                    serieColor: serie.color,
                    x: datum.position.x,
                    y: datum.position.y,
                    color: pointColor,
                    borderColor: fixedBorderColor || getPointBorderColor(point),
                    data: {
                        ...datum.data,
                        xFormatted: formatX(datum.data.x),
                        yFormatted: formatY(datum.data.y),
                    }
                }
                points[pointIndex] = point
                ++pointIndex
            }
        }

        return points
    }, [series, getPointColor, getPointBorderColor, formatX, formatY])
}

export const useSlices = ({ enableSlices, points, width, height }) => {
    return useMemo(() => {
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
    }, [enableSlices, points, height, width])
}

export const useLine = ({
    data,
    xScale: xScaleSpec = LineDefaultProps.xScale,
    xFormat,
    yScale: yScaleSpec = LineDefaultProps.yScale,
    yFormat,
    width,
    height,
    colors = LineDefaultProps.colors,
    curve = LineDefaultProps.curve,
    areaBaselineValue = LineDefaultProps.areaBaselineValue,
    pointColor = LineDefaultProps.pointColor,
    pointBorderColor = LineDefaultProps.pointBorderColor,
    enableSlices = LineDefaultProps.enableSlicesTooltip,
}) => {
    const formatX = useValueFormatter(xFormat)
    const formatY = useValueFormatter(yFormat)
    const getColor = useOrdinalColorScale(colors, 'id')
    const theme = useTheme()
    const getPointColor = useInheritedColor(pointColor, theme)
    const getPointBorderColor = useInheritedColor(pointBorderColor, theme)
    const [hiddenIds, setHiddenIds] = useState([])

    const {
        xScale,
        yScale,
        series: rawSeries,
    } = useMemo(
        () =>
            computeXYScalesForSeries(
                data.filter(item => hiddenIds.indexOf(item.id) === -1),
                xScaleSpec,
                yScaleSpec,
                width,
                height
            ),
        [data, hiddenIds, xScaleSpec, yScaleSpec, width, height]
    )

    const { legendData, series } = useMemo(() => {
        const rawSeriesById = {}
        rawSeries.forEach(serie => rawSeriesById[serie.id] = serie)
        const dataWithColor = data.map(line => ({
            id: line.id,
            label: line.id,
            color: getColor(line),
        }))
        const series = dataWithColor
            .map(datum => ({
                ...rawSeriesById[datum.id],
                color: datum.color,
            }))
            .filter(item => Boolean(item.id))
        const seriesIds = new Set(series.map(serie => serie.id))
        const legendData = dataWithColor
            .map(item => ({ ...item, hidden: !seriesIds.has(item.id) }))
            .reverse()

        return { legendData, series }
    }, [data, rawSeries, getColor])

    const toggleSerie = useCallback(id => {
        setHiddenIds(state =>
            state.indexOf(id) > -1 ? state.filter(item => item !== id) : [...state, id]
        )
    }, [])

    const points = usePoints({
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

    const lineGenerator = useLineGenerator({ curve })
    const areaGenerator = useAreaGenerator({
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
        points,
    }
}
