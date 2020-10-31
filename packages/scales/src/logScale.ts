/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleLog, ScaleLogarithmic as BaseScaleLogarithmic } from 'd3-scale'
import PropTypes from 'prop-types'

export interface ScaleLogarithmic<Range, Output> extends BaseScaleLogarithmic<Range, Output> {
    type: 'log'
}

export interface LogScaleOptions {
    type: 'log'
    axis: 'x' | 'y'
    base?: number
    min?: 'auto' | number
    max?: 'auto' | number
}

export interface LogScale extends Omit<LogScaleOptions, 'axis'> {}

export const logScale = <Range, Output>(
    { axis, base = 10, min = 'auto', max = 'auto' }: LogScaleOptions,
    xy: any,
    width: number,
    height: number
) => {
    const values = xy[axis]
    const size = axis === 'x' ? width : height

    const hasZero = values.all.some((v: number) => v === 0)
    let sign: number
    let hasMixedSign = false
    values.all.forEach((value: number) => {
        if (hasMixedSign === true) {
            return
        }

        if (sign === undefined) {
            sign = Math.sign(value)
        } else if (Math.sign(value) !== sign) {
            hasMixedSign = true
        }
    })

    if (hasZero || hasMixedSign) {
        throw new Error(
            [
                `a log scale domain must be strictly-positive or strictly-negative,`,
                `and must not include or cross zero.`,
            ].join('\n')
        )
    }

    const minValue: number = min === 'auto' ? values.min : min
    const maxValue: number = max === 'auto' ? values.max : max

    const scale = scaleLog()
        .domain([minValue, maxValue])
        .rangeRound(axis === 'x' ? [0, size] : [size, 0])
        .base(base)
        .nice() as any

    scale.type = 'log'

    return scale as ScaleLogarithmic<Range, Output>
}

export const logScalePropTypes = {
    type: PropTypes.oneOf(['log']).isRequired,
    base: PropTypes.number,
    min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
}
