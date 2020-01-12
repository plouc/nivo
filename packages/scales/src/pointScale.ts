/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scalePoint, ScalePoint as BaseScalePoint } from 'd3-scale'
import PropTypes from 'prop-types'

export interface ScalePoint<Domain> extends BaseScalePoint<Domain> {
    type: 'point'
}

export interface PointScaleOptions {
    type: 'point'
    axis: 'x' | 'y'
}

export interface PointScale extends Omit<PointScaleOptions, 'axis'> {}

export const pointScale = <Domain>(
    { axis }: PointScaleOptions,
    xy: any,
    width: number,
    height: number
) => {
    const values = xy[axis]
    const size = axis === 'x' ? width : height

    const scale = scalePoint()
        .range([0, size])
        .domain(values.all) as any

    scale.type = 'point'

    return scale as ScalePoint<Domain>
}

export const pointScalePropTypes = {
    type: PropTypes.oneOf(['point']).isRequired,
}
