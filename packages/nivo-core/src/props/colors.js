/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { quantizeColorScalesKeys } from '../lib/colors'

export const quantizeColorScalePropType = PropTypes.oneOfType([
    PropTypes.oneOf(quantizeColorScalesKeys),
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.string),
])
