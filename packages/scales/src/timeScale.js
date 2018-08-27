/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleTime } from 'd3-scale'
import { timeParse } from 'd3-time-format'
import PropTypes from 'prop-types'

export const timeScale = (
    { axis, format = 'native', min = 'auto', max = 'auto' },
    xy,
    width,
    height
) => {
    const values = xy[axis]
    const size = axis === 'x' ? width : height

    const parseTime = format === 'native' ? undefined : timeParse(format)

    let minValue = min
    if (min === 'auto') {
        minValue = values.min
    } else if (format !== 'native') {
        minValue = parseTime(values.min)
    }

    let maxValue = max
    if (max === 'auto') {
        maxValue = values.max
    } else if (format !== 'native') {
        maxValue = parseTime(values.max)
    }

    const scale = scaleTime()
        .domain([minValue, maxValue])
        .range([0, size])

    scale.type = 'time'

    return scale
}

export const timeScalePropTypes = {
    type: PropTypes.oneOf(['time']).isRequired,
    format: PropTypes.string.isRequired,
}
