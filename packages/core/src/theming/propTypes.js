/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

const textProps = {
    fill: PropTypes.string,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
}

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
        text: PropTypes.shape({ ...textProps }).isRequired,
    }).isRequired,
    legend: PropTypes.shape({
        text: PropTypes.shape({ ...textProps }).isRequired,
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
    text: PropTypes.shape({ ...textProps }).isRequired,
})

export const labelsThemePropType = PropTypes.shape({
    text: PropTypes.shape({ ...textProps }).isRequired,
})

export const dotsThemePropType = PropTypes.shape({
    text: PropTypes.shape({ ...textProps }).isRequired,
})

export const markersThemePropType = PropTypes.shape({
    text: PropTypes.shape({ ...textProps }).isRequired,
})

export const crosshairPropType = PropTypes.shape({
    line: PropTypes.shape({
        stroke: PropTypes.string.isRequired,
        strokeWidth: PropTypes.number.isRequired,
        strokeDasharray: PropTypes.string,
    }).isRequired,
})

export const annotationsPropType = PropTypes.shape({
    text: PropTypes.shape({
        ...textProps,
        outlineWidth: PropTypes.number.isRequired,
        outlineColor: PropTypes.string.isRequired,
    }).isRequired,
    link: PropTypes.shape({
        stroke: PropTypes.string.isRequired,
        strokeWidth: PropTypes.number.isRequired,
        outlineWidth: PropTypes.number.isRequired,
        outlineColor: PropTypes.string.isRequired,
    }).isRequired,
    outline: PropTypes.shape({
        stroke: PropTypes.string.isRequired,
        strokeWidth: PropTypes.number.isRequired,
        outlineWidth: PropTypes.number.isRequired,
        outlineColor: PropTypes.string.isRequired,
    }).isRequired,
    symbol: PropTypes.shape({
        fill: PropTypes.string.isRequired,
        outlineWidth: PropTypes.number.isRequired,
        outlineColor: PropTypes.string.isRequired,
    }).isRequired,
})

export const themePropType = PropTypes.shape({
    background: PropTypes.string.isRequired,
    fontFamily: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
    textColor: PropTypes.string.isRequired,
    axis: axisThemePropType.isRequired,
    grid: gridThemePropType.isRequired,
    legends: legendsThemePropType.isRequired,
    labels: labelsThemePropType.isRequired,
    dots: dotsThemePropType.isRequired,
    markers: markersThemePropType,
    crosshair: crosshairPropType.isRequired,
    annotations: annotationsPropType.isRequired,
})
