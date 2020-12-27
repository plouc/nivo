import { scalePoint } from 'd3-scale'
import PropTypes from 'prop-types'

export const pointScale = ({ axis }, xy, width, height) => {
    const values = xy[axis]
    const size = axis === 'x' ? width : height

    const scale = scalePoint().range([0, size]).domain(values.all)

    scale.type = 'point'

    return scale
}

export const pointScalePropTypes = {
    type: PropTypes.oneOf(['point']).isRequired,
}
