/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

export const PiePropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,

    innerRadius: PropTypes.number.isRequired,
    padAngle: PropTypes.number.isRequired,
    cornerRadius: PropTypes.number.isRequired,

    // border
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    // radial labels
    enableRadialLabels: PropTypes.bool.isRequired,
    radialLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    radialLabelsSkipAngle: PropTypes.number,
    radialLabelsTextXOffset: PropTypes.number,
    radialLabelsTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    radialLabelsLinkOffset: PropTypes.number,
    radialLabelsLinkDiagonalLength: PropTypes.number,
    radialLabelsLinkHorizontalLength: PropTypes.number,
    radialLabelsLinkStrokeWidth: PropTypes.number,
    radialLabelsLinkColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    // slices labels
    enableSlicesLabels: PropTypes.bool.isRequired,
    sliceLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    slicesLabelsSkipAngle: PropTypes.number,
    slicesLabelsTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    // styling
    defs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    fill: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            match: PropTypes.oneOfType([PropTypes.oneOf(['*']), PropTypes.object, PropTypes.func])
                .isRequired,
        })
    ).isRequired,

    // interactivity
    isInteractive: PropTypes.bool,
}

export const PieDefaultProps = {
    innerRadius: 0,
    padAngle: 0,
    cornerRadius: 0,

    // border
    borderWidth: 0,
    borderColor: 'inherit:darker(1)',

    // radial labels
    enableRadialLabels: true,
    radialLabel: 'id',
    radialLabelsTextColor: 'theme',
    radialLabelsLinkColor: 'theme',

    // slices labels
    enableSlicesLabels: true,
    sliceLabel: 'value',
    slicesLabelsTextColor: 'theme',

    // styling
    defs: [],
    fill: [],

    // interactivity
    isInteractive: true,
}
