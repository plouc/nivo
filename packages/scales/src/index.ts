/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { LinearScale, LinearScaleOptions, linearScalePropTypes } from './linearScale'
import { LogScale, LogScaleOptions, logScalePropTypes } from './logScale'
import { PointScale, PointScaleOptions, pointScalePropTypes } from './pointScale'
import { TimeScale, TimeScaleOptions, timeScalePropTypes } from './timeScale'

export * from './compute'
export * from './linearScale'
export * from './logScale'
export * from './pointScale'
export * from './timeScale'

export type Scale = LinearScale | PointScale | TimeScale | LogScale

export type ScaleOptions =
    | LinearScaleOptions
    | PointScaleOptions
    | TimeScaleOptions
    | LogScaleOptions

export type ScaleFunc<Input = number, Output = number> = (value: Input) => Output

export const scalePropType = PropTypes.oneOfType([
    PropTypes.shape(linearScalePropTypes),
    PropTypes.shape(pointScalePropTypes),
    PropTypes.shape(timeScalePropTypes),
    PropTypes.shape(logScalePropTypes),
])
