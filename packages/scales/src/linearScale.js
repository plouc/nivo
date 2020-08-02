/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleLinear } from 'd3-scale'
import PropTypes from 'prop-types'

export const linearScale = (
    { axis, min = 0, max = 'auto', stacked = false, reverse = false },
    xy,
    width,
    height
) => {
    const values = xy[axis]
    const size = axis === 'x' ? width : height

    let minValue = min
    if (min === 'auto') {
        minValue = stacked === true ? values.minStacked : values.min
    }
    let maxValue = max
    if (max === 'auto') {
        maxValue = stacked === true ? values.maxStacked : values.max
    }

    const scale = scaleLinear().rangeRound(axis === 'x' ? [0, size] : [size, 0])

    if (reverse === true) scale.domain([maxValue, minValue])
    else scale.domain([minValue, maxValue])

    scale.type = 'linear'
    scale.stacked = stacked

    return scale
}

export const linearScalePropTypes = {
    type: PropTypes.oneOf(['linear']).isRequired,
    min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    stacked: PropTypes.bool,
    reverse: PropTypes.bool,
}
