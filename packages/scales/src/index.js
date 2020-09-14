/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { linearScalePropTypes } from './linearScale'
import { logScalePropTypes } from './logScale'
import { symLogScalePropTypes } from './symlogScale'
import { pointScalePropTypes } from './pointScale'
import { timeScalePropTypes } from './timeScale'

export * from './compute'
export * from './linearScale'
export * from './logScale'
export * from './pointScale'
export * from './timeScale'
export * from './timeHelpers'

export const scalePropType = PropTypes.oneOfType([
    PropTypes.shape(linearScalePropTypes),
    PropTypes.shape(pointScalePropTypes),
    PropTypes.shape(timeScalePropTypes),
    PropTypes.shape(logScalePropTypes),
    PropTypes.shape(symLogScalePropTypes),
])
