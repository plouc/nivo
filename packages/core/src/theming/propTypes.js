/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

export const axisThemePropType = PropTypes.shape({
    domain: PropTypes.shape({
        stroke: PropTypes.string.isRequired,
        strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        strokeDasharray: PropTypes.string,
    }).isRequired,
    ticks: PropTypes.shape({
        line: PropTypes.shape({
            stroke: PropTypes.string.isRequired,
            strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            strokeDasharray: PropTypes.string,
        }).isRequired,
        text: PropTypes.shape({
            color: PropTypes.string.isRequired,
            fontSize: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    legend: PropTypes.shape({
        fill: PropTypes.string.isRequired,
        fontSize: PropTypes.string.isRequired,
    }).isRequired,
})

export const gridThemePropType = PropTypes.shape({
    stroke: PropTypes.string.isRequired,
    strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    strokeDasharray: PropTypes.string,
})

export const themePropType = PropTypes.shape({
    axis: axisThemePropType.isRequired,
    grid: gridThemePropType.isRequired,
})
