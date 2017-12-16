/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import uniq from 'lodash/uniq'
import { scalePoint } from 'd3-scale'

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
