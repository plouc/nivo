/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

export const ChordPropTypes = {
    matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,

    padAngle: PropTypes.number.isRequired,
    innerRadiusRatio: PropTypes.number.isRequired,
    innerRadiusOffset: PropTypes.number.isRequired,

    ribbonOpacity: PropTypes.number.isRequired,
    ribbonBorderWidth: PropTypes.number.isRequired,

    // colors
    colors: PropTypes.any.isRequired,

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
    arcHoverOpacity: PropTypes.number.isRequired,
    arcHoverOthersOpacity: PropTypes.number.isRequired,
    ribbonHoverOpacity: PropTypes.number.isRequired,
    ribbonHoverOthersOpacity: PropTypes.number.isRequired,
}

export const ChordDefaultProps = {
    padAngle: 0,
    innerRadiusRatio: 0.9,
    innerRadiusOffset: 0,

    ribbonOpacity: 0.5,
    ribbonBorderWidth: 1,

    arcOpacity: 1,
    arcBorderWidth: 1,

    // colors
    colors: 'nivo',

    // interactivity
    isInteractive: true,
    arcHoverOpacity: 1,
    arcHoverOthersOpacity: 0.15,
    ribbonHoverOpacity: 0.85,
    ribbonHoverOthersOpacity: 0.15,
}
