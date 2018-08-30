/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleTime } from 'd3-scale'
import PropTypes from 'prop-types'
import { createDateNormalizer, timePrecisions, TIME_PRECISION_MILLISECOND } from './timeHelpers'

export const timeScale = (
    { axis, format = 'native', precision = TIME_PRECISION_MILLISECOND, min = 'auto', max = 'auto' },
    xy,
    width,
    height
) => {
    const values = xy[axis]
    const size = axis === 'x' ? width : height

    const normalize = createDateNormalizer({ format, precision })

    let minValue = min
    if (min === 'auto') {
        minValue = values.min
    } else if (format !== 'native') {
        minValue = normalize(values.min)
    }

    let maxValue = max
    if (max === 'auto') {
        maxValue = values.max
    } else if (format !== 'native') {
        maxValue = normalize(values.max)
    }

    const scale = scaleTime()
        .domain([minValue, maxValue])
        .range([0, size])

    scale.type = 'time'

    return scale
}

export const timeScalePropTypes = {
    type: PropTypes.oneOf(['time']).isRequired,
    format: PropTypes.string,
    precision: PropTypes.oneOf(timePrecisions),
}
