/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scalePoint, ScalePoint } from 'd3-scale'
import * as PropTypes from 'prop-types'

export interface ScalePointWithType<Domain> extends ScalePoint<Domain> {
    type: 'point'
}

export interface PointScaleConfig {
    type: 'point'
}

export interface PointScaleInnerConfig extends PointScaleConfig {
    axis: 'x' | 'y'
}

export const pointScalePropTypes = {
    type: PropTypes.oneOf(['point']).isRequired,
}

export const pointScale = (
    { axis }: PointScaleInnerConfig,
    xy: any,
    width: number,
    height: number
): ScalePointWithType<string> => {
    const values = xy[axis]
    const size = axis === 'x' ? width : height

    const scale = scalePoint()
        .range([0, size])
        .domain(values.all) as ScalePointWithType<string>

    scale.type = 'point'

    return scale
}
