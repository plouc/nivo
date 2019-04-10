/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { colorSchemeIds } from './schemes'

export const ordinalColorsPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({
        scheme: PropTypes.oneOf(colorSchemeIds).isRequired,
        size: PropTypes.number,
    }),
    PropTypes.shape({
        datum: PropTypes.string.isRequired,
    }),
])

export const colorIdentityPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string])
