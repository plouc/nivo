/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleLog } from 'd3-scale'
import PropTypes from 'prop-types'

export const logScale = ({ axis, base = 10, min = 'auto', max = 'auto' }, xy, width, height) => {
    const values = xy[axis]
    const size = axis === 'x' ? width : height

    const hasZero = values.all.some(v => v === 0)
    let sign
    let hasMixedSign = false
    values.all.forEach(v => {
        if (hasMixedSign === true) return
        if (sign === undefined) {
            sign = Math.sign(v)
        } else if (Math.sign(v) !== sign) {
            hasMixedSign = true
        }
    })

    if (hasZero || hasMixedSign) {
        throw new Error(
            [
                `a log scale domain must be strictly-positive or strictly-negative,`,
                `and must not include or cross zero.`,
            ].join('\n')
        )
    }

    let minValue = min
    if (min === 'auto') {
        minValue = values.min
    }
    let maxValue = max
    if (max === 'auto') {
        maxValue = values.max
    }

    const scale = scaleLog()
        .domain([minValue, maxValue])
        .rangeRound(axis === 'x' ? [0, size] : [size, 0])
        .base(base)
        .nice()

    scale.type = 'log'

    return scale
}

export const logScalePropTypes = {
    type: PropTypes.oneOf(['log']).isRequired,
    base: PropTypes.number,
    min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
}
