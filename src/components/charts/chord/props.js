/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import noop from '../../../lib/noop'

export const ChordPropTypes = {
    matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,

    padAngle: PropTypes.number.isRequired,
    innerRadiusRatio: PropTypes.number.isRequired,
    innerRadiusOffset: PropTypes.number.isRequired,

    // arcs
    arcOpacity: PropTypes.number.isRequired,
    arcBorderWidth: PropTypes.number.isRequired,
    arcBorderColor: PropTypes.any.isRequired,
    getArcBorderColor: PropTypes.func.isRequired,

    // ribbons
    ribbonOpacity: PropTypes.number.isRequired,
    ribbonBorderWidth: PropTypes.number.isRequired,
    ribbonBorderColor: PropTypes.any.isRequired,
    getRibbonBorderColor: PropTypes.func.isRequired,

    // labels
    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabel: PropTypes.func.isRequired, // computed
    labelOffset: PropTypes.number.isRequired,
    labelRotation: PropTypes.number.isRequired,
    labelTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabelTextColor: PropTypes.func.isRequired, // computed

    // colors
    colors: PropTypes.any.isRequired,

    // interactivity
    onClick: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    arcHoverOpacity: PropTypes.number.isRequired,
    arcHoverOthersOpacity: PropTypes.number.isRequired,
    ribbonHoverOpacity: PropTypes.number.isRequired,
    ribbonHoverOthersOpacity: PropTypes.number.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    // canvas specific
    pixelRatio: PropTypes.number.isRequired,
}

export const ChordDefaultProps = {
    padAngle: 0,
    innerRadiusRatio: 0.9,
    innerRadiusOffset: 0,

    // arcs
    arcOpacity: 1,
    arcBorderWidth: 1,
    arcBorderColor: 'inherit:darker(0.4)',

    // ribbons
    ribbonOpacity: 0.5,
    ribbonBorderWidth: 1,
    ribbonBorderColor: 'inherit:darker(0.4)',

    // labels
    enableLabel: true,
    label: 'id',
    labelOffset: 12,
    labelRotation: 0,
    labelTextColor: 'inherit:darker(1)',

    // colors
    colors: 'nivo',

    // interactivity
    isInteractive: true,
    onClick: noop,
    arcHoverOpacity: 1,
    arcHoverOthersOpacity: 0.15,
    ribbonHoverOpacity: 0.85,
    ribbonHoverOthersOpacity: 0.15,

    // canvas specific
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
