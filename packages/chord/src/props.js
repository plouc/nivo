/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { blendModePropType } from '@nivo/core'
import { LegendPropShape } from '@nivo/legends'

export const ChordPropTypes = {
    matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,

    padAngle: PropTypes.number.isRequired,
    innerRadiusRatio: PropTypes.number.isRequired,
    innerRadiusOffset: PropTypes.number.isRequired,

    arcOpacity: PropTypes.number.isRequired,
    arcBorderWidth: PropTypes.number.isRequired,
    arcBorderColor: PropTypes.any.isRequired,
    getArcBorderColor: PropTypes.func.isRequired,

    ribbonOpacity: PropTypes.number.isRequired,
    ribbonBorderWidth: PropTypes.number.isRequired,
    ribbonBorderColor: PropTypes.any.isRequired,
    ribbonBlendMode: blendModePropType.isRequired,
    getRibbonBorderColor: PropTypes.func.isRequired,

    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabel: PropTypes.func.isRequired, // computed
    labelOffset: PropTypes.number.isRequired,
    labelRotation: PropTypes.number.isRequired,
    labelTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabelTextColor: PropTypes.func.isRequired, // computed

    colors: PropTypes.any.isRequired,

    isInteractive: PropTypes.bool.isRequired,
    arcHoverOpacity: PropTypes.number.isRequired,
    arcHoverOthersOpacity: PropTypes.number.isRequired,
    ribbonHoverOpacity: PropTypes.number.isRequired,
    ribbonHoverOthersOpacity: PropTypes.number.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    pixelRatio: PropTypes.number.isRequired,

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
}

export const ChordDefaultProps = {
    padAngle: 0,
    innerRadiusRatio: 0.9,
    innerRadiusOffset: 0,

    arcOpacity: 1,
    arcBorderWidth: 1,
    arcBorderColor: 'inherit:darker(0.4)',

    ribbonOpacity: 0.5,
    ribbonBorderWidth: 1,
    ribbonBorderColor: 'inherit:darker(0.4)',
    ribbonBlendMode: 'normal',

    enableLabel: true,
    label: 'id',
    labelOffset: 12,
    labelRotation: 0,
    labelTextColor: 'inherit:darker(1)',

    colors: 'nivo',

    isInteractive: true,
    arcHoverOpacity: 1,
    arcHoverOthersOpacity: 0.15,
    ribbonHoverOpacity: 0.85,
    ribbonHoverOthersOpacity: 0.15,

    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,

    legends: [],
}
