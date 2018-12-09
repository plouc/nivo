/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleTime, ScaleTime } from 'd3-scale'
import * as PropTypes from 'prop-types'
import { createDateNormalizer, TimePrecision } from './timeHelpers'

export interface ScaleTimeWithType<Range, Output> extends ScaleTime<Range, Output> {
    type: 'time'
}

export interface TimeScaleConfig {
    type: 'time'
    format?: string
    precision?: TimePrecision
    min?: any
    max?: any
}

export interface TimeScaleInnerConfig extends TimeScaleConfig {
    axis: 'x' | 'y'
}

export const timeScalePropTypes = {
    type: PropTypes.oneOf(['time']).isRequired,
    format: PropTypes.string,
    precision: PropTypes.oneOf([
        TimePrecision.Millisecond,
        TimePrecision.Second,
        TimePrecision.Minute,
        TimePrecision.Hour,
        TimePrecision.Day,
        TimePrecision.Month,
        TimePrecision.Year,
    ]),
}

export const timeScale = (
    {
        axis,
        format = 'native',
        precision = TimePrecision.Millisecond,
        min = 'auto',
        max = 'auto',
    }: TimeScaleInnerConfig,
    xy: any,
    width: number,
    height: number
): ScaleTimeWithType<number, number> => {
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
        .range([0, size]) as ScaleTimeWithType<number, number>

    scale.type = 'time'

    return scale
}
