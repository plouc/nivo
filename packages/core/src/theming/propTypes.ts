/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as PropTypes from 'prop-types'

export const axisThemePropType = PropTypes.shape({
    domain: PropTypes.shape({
        line: PropTypes.shape({
            stroke: PropTypes.string.isRequired,
            strokeWidth: PropTypes.number.isRequired,
            strokeDasharray: PropTypes.string,
        }).isRequired,
    }).isRequired,
    ticks: PropTypes.shape({
        line: PropTypes.shape({
            stroke: PropTypes.string.isRequired,
            strokeWidth: PropTypes.number.isRequired,
            strokeDasharray: PropTypes.string,
        }).isRequired,
        text: PropTypes.shape({
            fill: PropTypes.string.isRequired,
            fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        }).isRequired,
    }).isRequired,
    legend: PropTypes.shape({
        text: PropTypes.shape({
            fill: PropTypes.string.isRequired,
            fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        }).isRequired,
    }).isRequired,
})

export const gridThemePropType = PropTypes.shape({
    line: PropTypes.shape({
        stroke: PropTypes.string.isRequired,
        strokeWidth: PropTypes.number.isRequired,
        strokeDasharray: PropTypes.string,
    }).isRequired,
})

export const legendsThemePropType = PropTypes.shape({
    text: PropTypes.shape({
        fill: PropTypes.string.isRequired,
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired,
})

export const labelsThemePropType = PropTypes.shape({
    text: PropTypes.shape({
        fill: PropTypes.string.isRequired,
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired,
})

export const dotsThemePropType = PropTypes.shape({
    text: PropTypes.shape({
        fill: PropTypes.string.isRequired,
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired,
})

export const themePropType = PropTypes.shape({
    background: PropTypes.string.isRequired,
    axis: axisThemePropType.isRequired,
    grid: gridThemePropType.isRequired,
    legends: legendsThemePropType.isRequired,
    labels: labelsThemePropType.isRequired,
    dots: dotsThemePropType.isRequired,
})
