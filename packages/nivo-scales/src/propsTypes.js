/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

export const LinearScalePropType = PropTypes.shape({
    type: PropTypes.oneOf(['linear']),
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    property: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    range: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    stacked: PropTypes.bool,
})

export const PointScalePropType = PropTypes.shape({
    type: PropTypes.oneOf(['point']),
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    property: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    domain: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    range: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
})

export const TimeScalePropType = PropTypes.shape({
    type: PropTypes.oneOf(['time']),
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    property: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    min: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
    range: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
})
