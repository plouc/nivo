/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo, useCallback } from 'react'
import { area as d3Area, curveBasis, curveLinear } from 'd3-shape'
import { useTheme } from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { computeSeries } from './compute'

export const useAreaBumpSeries = ({ data, width, height, align, spacing, xPadding }) =>
    useMemo(() => computeSeries({ data, width, height, align, spacing, xPadding }), [
        data,
        width,
        height,
        align,
        spacing,
        xPadding,
    ])

export const useAreaGenerator = interpolation =>
    useMemo(
        () =>
            d3Area()
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
    borderColor,
    borderOpacity,
    activeBorderOpacity,
    inactiveBorderOpacity,
    isInteractive,
    current,
}) => {
    const getFillOpacity = useSerieDerivedProp(fillOpacity)
    const getActiveFillOpacity = useSerieDerivedProp(activeFillOpacity)
    const getInactiveFillOpacity = useSerieDerivedProp(inactiveFillOpacity)

    const getBorderWidth = useSerieDerivedProp(borderWidth)
    const getActiveBorderWidth = useSerieDerivedProp(activeBorderWidth)
    const getInactiveBorderWidth = useSerieDerivedProp(inactiveBorderWidth)

    const theme = useTheme()
    const getBorderColor = useInheritedColor(borderColor, theme)

    const getBorderOpacity = useSerieDerivedProp(borderOpacity)
    const getActiveBorderOpacity = useSerieDerivedProp(activeBorderOpacity)
    const getInactiveBorderOpacity = useSerieDerivedProp(inactiveBorderOpacity)

    const getNormalStyle = useMemo(
        () => serie => ({
            fillOpacity: getFillOpacity(serie),
            borderWidth: getBorderWidth(serie),
            borderColor: getBorderColor(serie),
            borderOpacity: getBorderOpacity(serie),
        }),
        [getFillOpacity, getBorderWidth, getBorderColor, getBorderOpacity]
    )
    const getActiveStyle = useMemo(
        () => serie => ({
            fillOpacity: getActiveFillOpacity(serie),
            borderWidth: getActiveBorderWidth(serie),
            borderColor: getBorderColor(serie),
            borderOpacity: getActiveBorderOpacity(serie),
        }),
        [getActiveFillOpacity, getActiveBorderWidth, getBorderColor, getActiveBorderOpacity]
    )
    const getInactiveStyle = useMemo(
        () => serie => ({
            fillOpacity: getInactiveFillOpacity(serie),
            borderWidth: getInactiveBorderWidth(serie),
            borderColor: getBorderColor(serie),
            borderOpacity: getInactiveBorderOpacity(serie),
        }),
        [getInactiveFillOpacity, getInactiveBorderWidth, getBorderColor, getInactiveBorderOpacity]
    )

    return useMemo(() => {
        if (!isInteractive) return getNormalStyle

        return serie => {
            if (current === null) return getNormalStyle(serie)
            if (serie.id === current) return getActiveStyle(serie)
            return getInactiveStyle(serie)
        }
    }, [getNormalStyle, getActiveStyle, getInactiveStyle, isInteractive, current])
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
    borderColor,
    borderOpacity,
    activeBorderOpacity,
    inactiveBorderOpacity,
    isInteractive,
    current,
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
        borderColor,
        borderOpacity,
        activeBorderOpacity,
        inactiveBorderOpacity,
        isInteractive,
        current,
    })

    const series = useMemo(
        () =>
            rawSeries.map(serie => {
                serie.color = getColor(serie)
                serie.style = getSerieStyle(serie)

                return serie
            }),
        [rawSeries, getColor, getSerieStyle]
    )

    return {
        series,
        xScale,
        heightScale,
        areaGenerator,
    }
}

export const useSerieHandlers = ({
    serie,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    setCurrent,
    tooltip,
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useCallback(
        event => {
            showTooltipFromEvent(React.createElement(tooltip, { serie }), event)
            setCurrent(serie.id)
            onMouseEnter && onMouseEnter(serie, event)
        },
        [serie, onMouseEnter, showTooltipFromEvent, setCurrent]
    )

    const handleMouseMove = useCallback(
        event => {
            showTooltipFromEvent(React.createElement(tooltip, { serie }), event)
            onMouseMove && onMouseMove(serie, event)
        },
        [serie, onMouseMove, showTooltipFromEvent]
    )

    const handleMouseLeave = useCallback(
        event => {
            hideTooltip()
            setCurrent(null)
            onMouseLeave && onMouseLeave(serie, event)
        },
        [serie, onMouseLeave, hideTooltip, setCurrent]
    )

    const handleClick = useCallback(
        event => {
            onClick && onClick(serie, event)
        },
        [serie, onClick]
    )

    const handlers = useMemo(
        () => ({
            onMouseEnter: isInteractive ? handleMouseEnter : undefined,
            onMouseMove: isInteractive ? handleMouseMove : undefined,
            onMouseLeave: isInteractive ? handleMouseLeave : undefined,
            onClick: isInteractive ? handleClick : undefined,
        }),
        [isInteractive, handleMouseEnter, handleMouseMove, handleMouseLeave, handleClick]
    )

    return handlers
}

export const useSeriesLabels = ({ series, position, padding, color }) => {
    const theme = useTheme()
    const getColor = useInheritedColor(color, theme)

    return useMemo(() => {
        let textAnchor
        let signedPadding
        if (position === 'start') {
            textAnchor = 'end'
            signedPadding = padding * -1
        } else {
            textAnchor = 'start'
            signedPadding = padding
        }

        return series.map(serie => {
            const point =
                position === 'start' ? serie.points[0] : serie.points[serie.points.length - 1]

            return {
                id: serie.id,
                x: point.x + signedPadding,
                y: point.y,
                color: getColor(serie),
                opacity: serie.style.fillOpacity,
                serie,
                textAnchor,
            }
        })
    }, [series, position, padding, getColor])
}
