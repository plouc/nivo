/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import getMin from 'lodash/min'
import getMax from 'lodash/max'
import { scaleLinear } from 'd3-scale'

export const computeLinearScale = (id, data, { min, max, property, range, stacked }) => {
    let allValues = data.reduce((agg, serie) => [...agg, ...serie.map(d => d[property])], [])

    const domainMin = min === 'auto' ? getMin(allValues) : min

    if (stacked === true) {
        allValues = data
            .reduce(
                (agg, serie) =>
                    serie.map((d, i) => {
                        const previousValue = agg[i]
                        const value = d[property]

                        // if a value is null, we discard the whole slice's stack
                        if (previousValue === null || value === null) return null

                        if (previousValue === undefined) return value
                        return previousValue + value
                    }),
                []
            )
            .filter(d => d !== null)
    }
    const domainMax = max === 'auto' ? getMax(allValues) : max

    return scaleLinear()
        .domain([domainMin, domainMax])
        .range(range)
}
