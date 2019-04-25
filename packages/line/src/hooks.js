/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { area, line } from 'd3-shape'
import { curveFromProp, useTheme } from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { computeXYScalesForSeries, computeYSlices } from '@nivo/scales'
import { LineDefaultProps } from './props'

export const useLine = ({
    data,
    xScale: xScaleSpec = LineDefaultProps.xScale,
    yScale: yScaleSpec = LineDefaultProps.yScale,
    width,
    height,
    colors = LineDefaultProps.colors,
    curve = LineDefaultProps.curve,
    areaBaselineValue = LineDefaultProps.areaBaselineValue,
}) => {
    const getColor = useOrdinalColorScale(colors, 'id')
    const lineGenerator = useMemo(() => {
        return line()
            .defined(d => d.x !== null && d.y !== null)
            .x(d => d.x)
            .y(d => d.y)
            .curve(curveFromProp(curve))
    }, [curve])

    const { x: xValues, xScale, yScale, series: rawSeries } = useMemo(
        () => computeXYScalesForSeries(data, xScaleSpec, yScaleSpec, width, height),
        [data, xScaleSpec, yScaleSpec, width, height]
    )

    const series = useMemo(
        () =>
            rawSeries.map(serie => ({
                ...serie,
                color: getColor(serie),
            })),
        [rawSeries, getColor]
    )

    const slices = useMemo(() => computeYSlices({ series, x: xValues, xScale }), [series, xValues])

    const areaGenerator = useMemo(() => {
        return area()
            .defined(d => d.x !== null && d.y !== null)
            .x(d => d.x)
            .y1(d => d.y)
            .curve(curveFromProp(curve))
            .y0(yScale(areaBaselineValue))
    }, [curve, yScale, areaBaselineValue])

    return {
        lineGenerator,
        areaGenerator,
        getColor,
        series,
        xScale,
        yScale,
        slices,
    }
}

export const useLinePoints = ({
    isEnabled = true,
    series,
    color = LineDefaultProps.pointColor,
    borderColor = LineDefaultProps.borderColor,
}) => {
    const theme = useTheme()
    const getColor = useInheritedColor(color, theme)
    const getBorderColor = useInheritedColor(borderColor, theme)

    return useMemo(() => {
        if (isEnabled !== true) return []

        return series.reduce((acc, serie) => {
            return [
                ...acc,
                ...serie.data
                    .filter(datum => datum.position.x !== null && datum.position.y !== null)
                    .map((datum, i) => {
                        const point = {
                            id: `${serie.id}.${i}`,
                            index: acc.length + i,
                            serieId: serie.id,
                            serieColor: serie.color,
                            x: datum.position.x,
                            y: datum.position.y,
                        }
                        point.color = getColor(serie)
                        point.borderColor = getBorderColor(point)
                        point.data = datum.data

                        return point
                    }),
            ]
        }, [])
    }, [series, getColor, getBorderColor])
}
