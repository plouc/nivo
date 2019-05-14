/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { scalePoint } from 'd3-scale'
import { line as d3Line, curveBasis } from 'd3-shape'

export const useScales = ({ width, height, data, xOuterPadding, yOuterPadding }) =>
    useMemo(() => {
        let xValues = new Set()
        data.forEach(serie => {
            serie.data.forEach(datum => {
                if (!xValues.has(datum.x)) {
                    xValues.add(datum.x)
                }
            })
        })

        return {
            xScale: scalePoint()
                .domain(Array.from(xValues))
                .range([0, width])
                .padding(xOuterPadding),
            yScale: scalePoint()
                .domain(data.map((serie, i) => i + 1))
                .range([0, height])
                .padding(yOuterPadding),
        }
    }, [width, height, data, xOuterPadding, yOuterPadding])

export const useLineGenerator = () => useMemo(() => d3Line().curve(curveBasis), [])

export const useSerieDerivedProp = instruction =>
    useMemo(() => {
        if (typeof instruction === 'function') return instruction
        return () => instruction
    }, [instruction])

export const useLineWidth = ({ lineWidth, activeLineWidth, inactiveLineWidth, current }) => {
    const getLineWidth = useSerieDerivedProp(lineWidth)
    const getActiveLineWidth = useSerieDerivedProp(activeLineWidth)
    const getInactiveLineWidth = useSerieDerivedProp(inactiveLineWidth)

    return useMemo(
        () => serie => {
            if (current === null) return getLineWidth(serie)
            if (serie.id === current) return getActiveLineWidth(serie)
            return getInactiveLineWidth(serie)
        },
        [getLineWidth, getActiveLineWidth, getInactiveLineWidth, current]
    )
}

export const useSerieStyle = ({
    lineWidth,
    activeLineWidth,
    inactiveLineWidth,
    opacity,
    activeOpacity,
    inactiveOpacity,
    isInteractive,
    current,
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
            if (current === null) return getNormalStyle(serie)
            if (serie.id === current) return getActiveStyle(serie)
            return getInactiveStyle(serie)
        }
    }, [getNormalStyle, getActiveStyle, getInactiveStyle, isInteractive, current])
}

export const usePointStyle = ({
    size,
    activeSize,
    inactiveSize,
    borderWidth,
    activeBorderWidth,
    inactiveBorderWidth,
    isInteractive,
    currentSerie,
}) => {
    const getSize = useSerieDerivedProp(size)
    const getActiveSize = useSerieDerivedProp(activeSize)
    const getInactiveSize = useSerieDerivedProp(inactiveSize)

    const getBorderWidth = useSerieDerivedProp(borderWidth)
    const getActiveBorderWidth = useSerieDerivedProp(activeBorderWidth)
    const getInactiveBorderWidth = useSerieDerivedProp(inactiveBorderWidth)

    const getNormalStyle = useMemo(
        () => point => ({
            size: getSize(point.serie),
            borderWidth: getBorderWidth(point.serie),
        }),
        [getSize, getBorderWidth]
    )
    const getActiveStyle = useMemo(
        () => point => ({
            size: getActiveSize(point.serie),
            borderWidth: getActiveBorderWidth(point.serie),
        }),
        [getActiveSize, getActiveBorderWidth]
    )
    const getInactiveStyle = useMemo(
        () => point => ({
            size: getInactiveSize(point.serie),
            borderWidth: getInactiveBorderWidth(point.serie),
        }),
        [getInactiveSize, getInactiveBorderWidth]
    )

    return useMemo(() => {
        if (!isInteractive) return getNormalStyle

        return point => {
            if (currentSerie === null) return getNormalStyle(point)
            if (point.serie.id === currentSerie) return getActiveStyle(point)
            return getInactiveStyle(point)
        }
    }, [getNormalStyle, getActiveStyle, getInactiveStyle, isInteractive, currentSerie])
}

export const usePointSize = ({ size, activeSize, inactiveSize, current }) => {
    const getSize = useSerieDerivedProp(size)
    const getActiveSize = useSerieDerivedProp(activeSize)
    const getInactiveSize = useSerieDerivedProp(inactiveSize)

    return useMemo(
        () => point => {
            if (current === null) return getSize(point.serie)
            if (point.serie.id === current) return getActiveSize(point.serie)
            return getInactiveSize(point.serie)
        },
        [getSize, getActiveSize, getInactiveSize, current]
    )
}
