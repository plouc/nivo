/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import get from 'lodash/get'
import { arc as d3Arc, pie as d3Pie } from 'd3-shape'
import {
    degreesToRadians,
    radiansToDegrees,
    useValueFormatter,
    computeArcBoundingBox,
} from '@nivo/core'
import { getOrdinalColorScale } from '@nivo/colors'
import { PieDefaultProps } from './props'

/**
 * Format data so that we get a consistent data structure.
 * It will also add the `formattedValue` and `color` property.
 */
export const useNormalizedData = ({
    data,
    id = PieDefaultProps.id,
    value = PieDefaultProps.value,
    valueFormat,
    colors = PieDefaultProps.colors,
}) => {
    const getId = useMemo(() => (typeof id === 'function' ? id : d => get(d, id)), [id])
    const getValue = useMemo(() => (typeof value === 'function' ? value : d => get(d, value)), [
        value,
    ])
    const formatValue = useValueFormatter(valueFormat)

    const getColor = useMemo(() => getOrdinalColorScale(colors, 'id'), [colors])

    return useMemo(
        () =>
            data.map(datum => {
                const datumValue = getValue(datum)

                const normalizedDatum = {
                    id: getId(datum),
                    value: datumValue,
                    formattedValue: formatValue(datumValue),
                    data: datum,
                }
                normalizedDatum.color = getColor(normalizedDatum)

                return normalizedDatum
            }),
        [data, getId, getValue, formatValue, getColor]
    )
}

/**
 * Compute arcs, which don't depend yet on radius.
 */
export const usePieArcs = ({
    data,
    startAngle = PieDefaultProps.startAngle,
    endAngle = PieDefaultProps.endAngle,
    padAngle = PieDefaultProps.padAngle,
    sortByValue = PieDefaultProps.sortByValue,
}) => {
    const pie = useMemo(() => {
        const pie = d3Pie()
            .value(d => d.value)
            .padAngle(degreesToRadians(padAngle))
            .startAngle(degreesToRadians(startAngle))
            .endAngle(degreesToRadians(endAngle))

        if (sortByValue !== true) pie.sortValues(null)

        return pie
    }, [startAngle, endAngle, padAngle, sortByValue])

    return useMemo(
        () =>
            pie(data).map(arc => {
                const angle = Math.abs(arc.endAngle - arc.startAngle)

                return {
                    ...arc.data,
                    arc: {
                        index: arc.index,
                        startAngle: arc.startAngle,
                        endAngle: arc.endAngle,
                        padAngle: arc.padAngle,
                        angle,
                        angleDeg: radiansToDegrees(angle),
                    },
                }
            }),

        [pie, data]
    )
}

export const usePieArcGenerator = ({
    radius,
    innerRadius,
    cornerRadius = PieDefaultProps.cornerRadius,
}) =>
    useMemo(() => d3Arc().outerRadius(radius).innerRadius(innerRadius).cornerRadius(cornerRadius), [
        radius,
        innerRadius,
        cornerRadius,
    ])

/**
 * Compute pie layout using explicit radius/innerRadius,
 * expressed in pixels.
 */
export const usePie = ({
    data,
    radius,
    innerRadius,
    startAngle = PieDefaultProps.startAngle,
    endAngle = PieDefaultProps.endAngle,
    padAngle = PieDefaultProps.padAngle,
    sortByValue = PieDefaultProps.sortByValue,
    cornerRadius = PieDefaultProps.cornerRadius,
}) => {
    const dataWithArc = usePieArcs({
        data,
        startAngle,
        endAngle,
        padAngle,
        sortByValue,
    })

    const arcGenerator = usePieArcGenerator({
        radius,
        innerRadius,
        cornerRadius,
    })

    return { dataWithArc, arcGenerator }
}

/**
 * Compute pie layout using a box to find radius/innerRadius,
 * expressed in ratio (0~1), can optionally use the `fit`
 * attribute to find the most space efficient layout.
 *
 * It also returns `centerX`/`centerY` as those can be altered
 * if `fit` is `true`.
 */
export const usePieFromBox = ({
    data,
    width,
    height,
    innerRadius: innerRadiusRatio = PieDefaultProps.innerRadius,
    startAngle = PieDefaultProps.startAngle,
    endAngle = PieDefaultProps.endAngle,
    padAngle = PieDefaultProps.padAngle,
    sortByValue = PieDefaultProps.sortByValue,
    cornerRadius = PieDefaultProps.cornerRadius,
    fit = PieDefaultProps.fit,
}) => {
    const dataWithArc = usePieArcs({
        data,
        startAngle,
        endAngle,
        padAngle,
        sortByValue,
    })

    const computedProps = useMemo(() => {
        let radius = Math.min(width, height) / 2
        let innerRadius = radius * Math.min(innerRadiusRatio, 1)

        let centerX = width / 2
        let centerY = height / 2

        let boundingBox
        if (fit === true) {
            const { points, ...box } = computeArcBoundingBox(
                centerX,
                centerY,
                radius,
                startAngle - 90,
                endAngle - 90
            )
            const ratio = Math.min(width / box.width, height / box.height)

            const adjustedBox = {
                width: box.width * ratio,
                height: box.height * ratio,
            }
            adjustedBox.x = (width - adjustedBox.width) / 2
            adjustedBox.y = (height - adjustedBox.height) / 2

            centerX = ((centerX - box.x) / box.width) * box.width * ratio + adjustedBox.x
            centerY = ((centerY - box.y) / box.height) * box.height * ratio + adjustedBox.y

            boundingBox = { box, ratio, points }

            radius = radius * ratio
            innerRadius = innerRadius * ratio
        }

        return {
            centerX,
            centerY,
            radius,
            innerRadius,
            debug: boundingBox,
        }
    }, [width, height, innerRadiusRatio, startAngle, endAngle, fit, cornerRadius])

    const arcGenerator = usePieArcGenerator({
        radius: computedProps.radius,
        innerRadius: computedProps.innerRadius,
        cornerRadius,
    })

    return {
        dataWithArc,
        arcGenerator,
        ...computedProps,
    }
}
