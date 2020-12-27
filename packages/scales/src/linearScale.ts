import { scaleLinear } from 'd3-scale'
import PropTypes from 'prop-types'

export const linearScale = (
    { axis, min = 0, max = 'auto', stacked = false, reverse = false, clamp = false, nice = false },
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

    if (nice === true) scale.nice()
    else if (typeof nice === 'number') scale.nice(nice)

    scale.type = 'linear'
    scale.stacked = stacked
    scale.clamp(clamp)

    return scale
}

export const linearScalePropTypes = {
    type: PropTypes.oneOf(['linear']).isRequired,
    min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    stacked: PropTypes.bool,
    reverse: PropTypes.bool,
    clamp: PropTypes.bool,
    nice: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
}
