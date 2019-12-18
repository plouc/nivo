/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo, useCallback } from 'react'
import { line as d3Line, curveBasis, curveLinear } from 'd3-shape'
import { useTheme } from '@nivo/core'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { computeSeries } from './compute'

export const useLineGenerator = interpolation =>
    useMemo(
        () =>
            d3Line()
                .curve(interpolation === 'smooth' ? curveBasis : curveLinear)
                .defined(d => d[0] !== null && d[1] !== null),

        [interpolation]
    )

export const useSerieDerivedProp = instruction =>
    useMemo(() => {
        if (typeof instruction === 'function') return instruction
        return () => instruction
    }, [instruction])

export const useSerieStyle = ({
    lineWidth,
    activeLineWidth,
    inactiveLineWidth,
    opacity,
    activeOpacity,
    inactiveOpacity,
    isInteractive,
    currentSerie,
}) => {
    const getLineWidth = useSerieDerivedProp(lineWidth)
    const getActiveLineWidth = useSerieDerivedProp(activeLineWidth)
    const getInactiveLineWidth = useSerieDerivedProp(inactiveLineWidth)

    const getOpacity = useSerieDerivedProp(opacity)
    const getActiveOpacity = useSerieDerivedProp(activeOpacity)
    const getInactiveOpacity = useSerieDerivedProp(inactiveOpacity)

    const getNormalStyle = useMemo(
        () => serie => ({
            lineWidth: getLineWidth(serie),
            opacity: getOpacity(serie),
        }),
        [getLineWidth, getOpacity]
    )
    const getActiveStyle = useMemo(
        () => serie => ({
            lineWidth: getActiveLineWidth(serie),
            opacity: getActiveOpacity(serie),
        }),
        [getActiveLineWidth, getActiveOpacity]
    )
    const getInactiveStyle = useMemo(
        () => serie => ({
            lineWidth: getInactiveLineWidth(serie),
            opacity: getInactiveOpacity(serie),
        }),
        [getInactiveLineWidth, getInactiveOpacity]
    )

    return useMemo(() => {
        if (!isInteractive) return getNormalStyle

        return serie => {
            if (currentSerie === null) return getNormalStyle(serie)
            if (serie.id === currentSerie) return getActiveStyle(serie)
            return getInactiveStyle(serie)
        }
    }, [getNormalStyle, getActiveStyle, getInactiveStyle, isInteractive, currentSerie])
}

export const usePointStyle = ({
    pointSize,
    activePointSize,
    inactivePointSize,
    pointBorderWidth,
    activePointBorderWidth,
    inactivePointBorderWidth,
    isInteractive,
    currentSerie,
}) => {
    const getSize = useSerieDerivedProp(pointSize)
    const getActiveSize = useSerieDerivedProp(activePointSize)
    const getInactiveSize = useSerieDerivedProp(inactivePointSize)

    const getBorderWidth = useSerieDerivedProp(pointBorderWidth)
    const getActiveBorderWidth = useSerieDerivedProp(activePointBorderWidth)
    const getInactiveBorderWidth = useSerieDerivedProp(inactivePointBorderWidth)

    const getNormalStyle = useMemo(
        () => point => ({
            size: getSize(point),
            borderWidth: getBorderWidth(point),
        }),
        [getSize, getBorderWidth]
    )
    const getActiveStyle = useMemo(
        () => point => ({
            size: getActiveSize(point),
            borderWidth: getActiveBorderWidth(point),
        }),
        [getActiveSize, getActiveBorderWidth]
    )
    const getInactiveStyle = useMemo(
        () => point => ({
            size: getInactiveSize(point),
            borderWidth: getInactiveBorderWidth(point),
        }),
        [getInactiveSize, getInactiveBorderWidth]
    )

    return useMemo(() => {
        if (!isInteractive) return getNormalStyle

        return point => {
            if (currentSerie === null) return getNormalStyle(point)
            if (point.serieId === currentSerie) return getActiveStyle(point)
            return getInactiveStyle(point)
        }
    }, [getNormalStyle, getActiveStyle, getInactiveStyle, isInteractive, currentSerie])
}

export const useBump = ({
    width,
    height,
    data,
    interpolation,
    xPadding,
    xOuterPadding,
    yOuterPadding,
    lineWidth,
    activeLineWidth,
    inactiveLineWidth,
    colors,
    opacity,
    activeOpacity,
    inactiveOpacity,
    pointSize,
    activePointSize,
    inactivePointSize,
    pointColor,
    pointBorderWidth,
    activePointBorderWidth,
    inactivePointBorderWidth,
    pointBorderColor,
    isInteractive,
    currentSerie,
}) => {
    const { series: rawSeries, xScale, yScale } = useMemo(
        () =>
            computeSeries({
                width,
                height,
                data,
                xPadding,
                xOuterPadding,
                yOuterPadding,
            }),
        [width, height, data, xPadding, xOuterPadding, yOuterPadding]
    )

    const lineGenerator = useLineGenerator(interpolation)

    const getColor = useOrdinalColorScale(colors, 'id')
    const getSerieStyle = useSerieStyle({
        lineWidth,
        activeLineWidth,
        inactiveLineWidth,
        opacity,
        activeOpacity,
        inactiveOpacity,
        isInteractive,
        currentSerie,
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

    const theme = useTheme()
    const getPointColor = useInheritedColor(pointColor, theme)
    const getPointBorderColor = useInheritedColor(pointBorderColor, theme)
    const getPointStyle = usePointStyle({
        pointSize,
        activePointSize,
        inactivePointSize,
        pointBorderWidth,
        activePointBorderWidth,
        inactivePointBorderWidth,
        isInteractive,
        currentSerie,
    })
    const points = useMemo(() => {
        const pts = []
        series.forEach(serie => {
            serie.points.forEach(rawPoint => {
                const point = {
                    ...rawPoint,
                    serie,
                    serieId: serie.id,
                    isActive: currentSerie === serie.id,
                    isInactive: currentSerie !== null && currentSerie !== serie.id,
                }
                point.color = getPointColor(point)
                point.borderColor = getPointBorderColor(point)
                point.style = getPointStyle({ ...point, serie })
                pts.push(point)
            })
        })

        return pts
    }, [series, getPointColor, getPointBorderColor, getPointStyle, currentSerie])

    return {
        xScale,
        yScale,
        series,
        points,
        lineGenerator,
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

export const useSeriesLabels = ({ series, position, padding, color, getLabel }) => {
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

        const labels = []
        series.forEach(serie => {
            let label = serie.id
            if (typeof getLabel === 'function') {
                label = getLabel(serie)
            }

            const point =
                position === 'start'
                    ? serie.linePoints[0]
                    : serie.linePoints[serie.linePoints.length - 1]

            // exclude labels for series having missing data at the beginning/end
            if (point[0] === null || point[1] === null) {
                return
            }

            labels.push({
                id: serie.id,
                label,
                x: point[0] + signedPadding,
                y: point[1],
                color: getColor(serie),
                opacity: serie.style.opacity,
                serie,
                textAnchor,
            })
        })

        return labels
    }, [series, position, padding, getColor])
}
