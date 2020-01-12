/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleLinear, ScaleLinear as BaseScaleLinear } from 'd3-scale'
import PropTypes from 'prop-types'

export interface ScaleLinear<Range, Output> extends BaseScaleLinear<Range, Output> {
    type: 'linear'
    stacked: boolean
}

export interface LinearScaleOptions {
    type: 'linear'
    axis: 'x' | 'y'
    min?: 'auto' | number
    max?: 'auto' | number
    stacked?: boolean
    reverse?: boolean
}

export interface LinearScale extends Omit<LinearScaleOptions, 'axis'> {}

export const linearScale = <Range, Output>(
    { axis, min = 0, max = 'auto', stacked = false, reverse = false }: LinearScaleOptions,
    xy: any,
    width: number,
    height: number
) => {
    const values = xy[axis]
    const size = axis === 'x' ? width : height

    const minValue: number =
        min === 'auto' ? (stacked === true ? values.minStacked : values.min) : min

    const maxValue: number =
        max === 'auto' ? (stacked === true ? values.maxStacked : values.max) : max

    const scale = scaleLinear().rangeRound(axis === 'x' ? [0, size] : [size, 0]) as any

    if (reverse === true) {
        scale.domain([maxValue, minValue])
    } else {
        scale.domain([minValue, maxValue])
    }

    scale.type = 'linear'
    scale.stacked = stacked

    return scale as ScaleLinear<Range, Output>
}

export const linearScalePropTypes = {
    type: PropTypes.oneOf(['linear']).isRequired,
    min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    stacked: PropTypes.bool,
    reverse: PropTypes.bool,
}
