/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
