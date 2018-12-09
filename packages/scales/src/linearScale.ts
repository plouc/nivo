/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleLinear, ScaleLinear } from 'd3-scale'
import * as PropTypes from 'prop-types'

export interface ScaleLinearWithType<Range, Output> extends ScaleLinear<Range, Output> {
    type: 'linear'
    stacked: boolean
}

export interface LinearScaleConfig {
    type: 'linear'
    min?: 'auto' | number
    max?: 'auto' | number
    stacked?: boolean
}

export interface LinearScaleInnerConfig extends LinearScaleConfig {
    axis: 'x' | 'y'
}

export const linearScalePropTypes = {
    type: PropTypes.oneOf(['linear']).isRequired,
    min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    stacked: PropTypes.bool,
}

export const linearScale = (
    { axis, min = 0, max = 'auto', stacked = false }: LinearScaleInnerConfig,
    xy: any,
    width: number,
    height: number
): ScaleLinearWithType<number, number> => {
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

    const scale = scaleLinear()
        .rangeRound(axis === 'x' ? [0, size] : [size, 0])
        .domain([minValue as number, maxValue as number]) as ScaleLinearWithType<number, number>

    scale.type = 'linear'
    scale.stacked = stacked

    return scale
}
