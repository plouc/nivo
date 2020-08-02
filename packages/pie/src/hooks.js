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
import { degreesToRadians, radiansToDegrees } from '@nivo/core'

export const usePie = ({
    data,
    radius,
    value = v => v,
    startAngle = 0,
    endAngle = 360,
    innerRadius = 0,
    cornerRadius = 0,
    sortByValue = false,
    padAngle = 0,
}) => {
    const arcGenerator = useMemo(
        () => d3Arc().outerRadius(radius).innerRadius(innerRadius).cornerRadius(cornerRadius),
        [radius, innerRadius, cornerRadius]
    )

    const getValue = useMemo(() => (typeof value === 'function' ? value : d => get(d, value)), [
        value,
    ])

    const pie = useMemo(() => {
        const computedPie = d3Pie()
            .value(getValue)
            .padAngle(degreesToRadians(padAngle))
            .startAngle(degreesToRadians(startAngle))
            .endAngle(degreesToRadians(endAngle))

        if (sortByValue !== true) computedPie.sortValues(null)

        return computedPie
    }, [getValue, padAngle, startAngle, endAngle, sortByValue])

    const arcs = useMemo(
        () =>
            pie(data).map(arc => {
                const angle = arc.endAngle - (arc.endAngle - arc.startAngle) * 0.5

                return {
                    ...arc,
                    startAngleDeg: radiansToDegrees(angle.startAngle),
                    endAngleDeg: radiansToDegrees(arc.endAngle),
                    angle,
                    angleDeg: radiansToDegrees(angle),
                }
            }),
        [data, pie]
    )

    return { arcs, arcGenerator }
}
