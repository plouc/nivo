import { scaleTime, scaleUtc } from 'd3-scale'
import PropTypes from 'prop-types'
import { createDateNormalizer, timePrecisions, TIME_PRECISION_MILLISECOND } from './timeHelpers'

export const timeScale = (
    {
        axis,
        format = 'native',
        precision = TIME_PRECISION_MILLISECOND,
        min = 'auto',
        max = 'auto',
        useUTC = true,
        nice = false,
    },
    xy,
    width,
    height
) => {
    const values = xy[axis]
    const size = axis === 'x' ? width : height

    const normalize = createDateNormalizer({ format, precision, useUTC })

    let minValue = min
    if (min === 'auto') {
        minValue = values.min
    } else if (format !== 'native') {
        minValue = normalize(min)
    }

    let maxValue = max
    if (max === 'auto') {
        maxValue = values.max
    } else if (format !== 'native') {
        maxValue = normalize(max)
    }

    const scale = useUTC ? scaleUtc() : scaleTime()
    scale.domain([minValue, maxValue]).range([0, size])
    if (nice === true) scale.nice()
    else if (typeof nice === 'object' || typeof nice === 'number') scale.nice(nice)

    scale.type = 'time'
    scale.useUTC = useUTC

    return scale
}

export const timeScalePropTypes = {
    type: PropTypes.oneOf(['time']).isRequired,
    format: PropTypes.string,
    precision: PropTypes.oneOf(timePrecisions),
    nice: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.object]),
}
