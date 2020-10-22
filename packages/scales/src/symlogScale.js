/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleSymlog } from 'd3-scale'
import PropTypes from 'prop-types'

export const symlogScale = (
    { axis, constant = 1, min = 'auto', max = 'auto' },
    xy,
    width,
    height
) => {
    const values = xy[axis]
    const size = axis === 'x' ? width : height

    let minValue = min
    if (min === 'auto') {
        minValue = values.min
    }

    let maxValue = max
    if (max === 'auto') {
        maxValue = values.max
    }

    const scale = scaleSymlog()
        .domain([minValue, maxValue])
        .constant(constant)
        .rangeRound(axis === 'x' ? [0, size] : [size, 0])
        .nice()

    scale.type = 'symlog'

    return scale
}

export const symLogScalePropTypes = {
    type: PropTypes.oneOf(['symlog']).isRequired,
    constant: PropTypes.number,
    min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
}
