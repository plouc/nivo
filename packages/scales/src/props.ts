/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as PropTypes from 'prop-types'
import { linearScalePropTypes, LinearScaleConfig } from './linearScale'
import { pointScalePropTypes, PointScaleConfig } from './pointScale'
import { timeScalePropTypes, TimeScaleConfig } from './timeScale'

export type ScaleConfig = LinearScaleConfig | PointScaleConfig | TimeScaleConfig

export const scalePropType = PropTypes.oneOfType([
    PropTypes.shape(linearScalePropTypes),
    PropTypes.shape(pointScalePropTypes),
    PropTypes.shape(timeScalePropTypes),
])
