/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleTime, scaleUtc, ScaleTime as BaseScaleTime } from 'd3-scale'
import PropTypes from 'prop-types'
import { createDateNormalizer, timePrecisions, TimeScalePrecision } from './timeHelpers'

export interface ScaleTime<Range, Output> extends BaseScaleTime<Range, Output> {
    type: 'time'
}

export interface TimeScaleOptions {
    type: 'time'
    axis: 'x' | 'y'
    format: 'native' | string
    precision?: TimeScalePrecision
    // Date if `format` is 'native', string otherwise
    min?: 'auto' | Date | string
    // Date if `format` is 'native', string otherwise
    max?: 'auto' | Date | string
    useUTC?: boolean
}

export interface TimeScale extends Omit<TimeScaleOptions, 'axis'> {}

export const timeScale = <Range, Output>(
    {
        axis,
        format = 'native',
        precision = 'millisecond',
        min = 'auto',
        max = 'auto',
        useUTC = true,
    }: TimeScaleOptions,
    xy: any,
    width: number,
    height: number
) => {
    const values = xy[axis]
    const size = axis === 'x' ? width : height

    const normalize = createDateNormalizer({ format, precision, useUTC })

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

    const scale = useUTC ? (scaleUtc() as any) : (scaleTime() as any)
    scale.domain([minValue, maxValue]).range([0, size])

    scale.type = 'time'
    scale.useUTC = useUTC

    return scale as ScaleTime<Range, Output>
}

export const timeScalePropTypes = {
    type: PropTypes.oneOf(['time']).isRequired,
    format: PropTypes.string,
    precision: PropTypes.oneOf(timePrecisions),
}
