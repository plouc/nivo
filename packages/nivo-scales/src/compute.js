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
import uniq from 'lodash/uniq'
import { scaleLinear, scalePoint } from 'd3-scale'

export const computeLinearScale = ({
    data,
    min = 'auto',
    max = 'auto',
    property,
    range,
    stacked = false,
}) => {
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

export const computePointScale = ({
    data,
    domain: _domain,
    range,
    property,
    checkConsistency = false,
}) => {
    if (checkConsistency === true) {
        const uniqLengths = uniq(data.map(({ data }) => data.length))
        if (uniqLengths.length > 1) {
            throw new Error(
                [
                    `Found inconsistent data for '${property}',`,
                    `expecting all series to have same length`,
                    `but found: ${uniqLengths.join(', ')}`,
                ].join(' ')
            )
        }
    }

    const domain = _domain !== undefined ? _domain : data[0].map(d => d[property])

    return scalePoint()
        .range(range)
        .domain(domain)
}
