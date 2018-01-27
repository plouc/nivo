/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

export const scalePropType = PropTypes.shape({
    type: PropTypes.string.isRequired,
    domain: PropTypes.array.isRequired,
    range: PropTypes.array.isRequired,
})

export const marginPropType = PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
}).isRequired

export const motionPropTypes = {
    animate: PropTypes.bool.isRequired,
    motionStiffness: PropTypes.number.isRequired,
    motionDamping: PropTypes.number.isRequired,
}

export * from './colors'
export * from './curve'
export * from './defs'
export * from './stack'
export * from './treeMap'
export * from './scales'
