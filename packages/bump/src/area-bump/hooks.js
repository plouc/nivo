/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { area as d3Area, curveBasis, curveLinear } from 'd3-shape'
import { useOrdinalColorScale } from '@nivo/colors'
import { computeSeries } from './compute'

export const useAreaBumpSeries = ({
    data,
    width,
    height,
    align,
    spacing,
    xPadding
}) => useMemo(
    () => computeSeries({ data, width, height, align, spacing, xPadding }),
    [data, width, height, align, spacing, xPadding]
)

export const useAreaGenerator = interpolation => useMemo(
    () => d3Area()
        .x(d => d.x)
        .y0(d => d.y0)
        .y1(d => d.y1)
        .curve(interpolation === 'smooth' ? curveBasis : curveLinear),
    [interpolation]
)

export const useSerieDerivedProp = instruction =>
    useMemo(() => {
        if (typeof instruction === 'function') return instruction
        return () => instruction
    }, [instruction])

export const useSerieStyle = ({
    fillOpacity,
    activeFillOpacity,
    inactiveFillOpacity,
    borderWidth,
    activeBorderWidth,
    inactiveBorderWidth,
    borderOpacity,
    activeBorderOpacity,
    inactiveBorderOpacity,
    isInteractive,
    current
}) => {
    const getFillOpacity = useSerieDerivedProp(fillOpacity)
    const getActiveFillOpacity = useSerieDerivedProp(activeFillOpacity)
    const getInactiveFillOpacity = useSerieDerivedProp(inactiveFillOpacity)

    const getBorderWidth = useSerieDerivedProp(borderWidth)
    const getActiveBorderWidth = useSerieDerivedProp(activeBorderWidth)
    const getInactiveBorderWidth = useSerieDerivedProp(inactiveBorderWidth)

    const getBorderOpacity = useSerieDerivedProp(borderOpacity)
    const getActiveBorderOpacity = useSerieDerivedProp(activeBorderOpacity)
    const getInactiveBorderOpacity = useSerieDerivedProp(inactiveBorderOpacity)

    const getNormalStyle = useMemo(
        () => serie => ({
            fillOpacity: getFillOpacity(serie),
            borderWidth: getBorderWidth(serie),
            borderOpacity: getBorderOpacity(serie)
        }),
        [getFillOpacity, getBorderWidth, getBorderOpacity]
    )
    const getActiveStyle = useMemo(
        () => serie => ({
            fillOpacity: getActiveFillOpacity(serie),
            borderWidth: getActiveBorderWidth(serie),
            borderOpacity: getActiveBorderOpacity(serie)
        }),
        [getActiveFillOpacity, getActiveBorderWidth, getActiveBorderOpacity]
    )
    const getInactiveStyle = useMemo(
        () => serie => ({
            fillOpacity: getInactiveFillOpacity(serie),
            borderWidth: getInactiveBorderWidth(serie),
            borderOpacity: getInactiveBorderOpacity(serie)
        }),
        [getInactiveFillOpacity, getInactiveBorderWidth, getInactiveBorderOpacity]
    )

    return useMemo(
        () => {
            if (!isInteractive) return getNormalStyle

            return serie => {
                if (current === null) return getNormalStyle(serie)
                if (serie.id === current) return getActiveStyle(serie)
                return getInactiveStyle(serie)
            }
        },
        [
            getNormalStyle,
            getActiveStyle,
            getInactiveStyle,
            isInteractive,
            current
        ]
    )
}

export const useAreaBump = ({
    data,
    width,
    height,
    align,
    spacing,
    xPadding,
    interpolation,
    colors,
    fillOpacity,
    activeFillOpacity,
    inactiveFillOpacity,
    borderWidth,
    activeBorderWidth,
    inactiveBorderWidth,
    borderOpacity,
    activeBorderOpacity,
    inactiveBorderOpacity,
    isInteractive,
    current
}) => {
    const { series: rawSeries, xScale, heightScale } = useAreaBumpSeries({
        data,
        width,
        height,
        align,
        spacing,
        xPadding,
    })

    const areaGenerator = useAreaGenerator(interpolation)

    const getColor = useOrdinalColorScale(colors, 'id')
    const getSerieStyle = useSerieStyle({
        fillOpacity,
        activeFillOpacity,
        inactiveFillOpacity,
        borderWidth,
        activeBorderWidth,
        inactiveBorderWidth,
        borderOpacity,
        activeBorderOpacity,
        inactiveBorderOpacity,
        isInteractive,
        current
    })

    const series = useMemo(
        () => rawSeries.map(serie => ({
            ...serie,
            color: getColor(serie),
            style: getSerieStyle(serie)
        })),
        [rawSeries, getColor, getSerieStyle]
    )

    return {
        series,
        xScale,
        heightScale,
        areaGenerator,
    }
}