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

export const useSerieOpacity = ({ opacity, activeOpacity, inactiveOpacity, current }) => {
    const getOpacity = useSerieDerivedProp(opacity)
    const getActiveOpacity = useSerieDerivedProp(activeOpacity)
    const getInactiveOpacity = useSerieDerivedProp(inactiveOpacity)

    return useMemo(
        () => serie => {
            if (current === null) return getOpacity(serie)
            if (serie.id === current) return getActiveOpacity(serie)
            return getInactiveOpacity(serie)
        },
        [getOpacity, getActiveOpacity, getInactiveOpacity, current]
    )
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
