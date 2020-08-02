/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { quantizeColorScalePropType, noop } from '@nivo/core'
import { inheritedColorPropType } from '@nivo/colors'
import { axisPropType } from '@nivo/axes'

export const HeatMapPropTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    indexBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,

    minValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
    maxValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,

    forceSquare: PropTypes.bool.isRequired,
    sizeVariation: PropTypes.number.isRequired,
    padding: PropTypes.number.isRequired,

    cellShape: PropTypes.oneOfType([PropTypes.oneOf(['rect', 'circle']), PropTypes.func])
        .isRequired,
    cellOpacity: PropTypes.number.isRequired,
    cellBorderWidth: PropTypes.number.isRequired,
    cellBorderColor: inheritedColorPropType.isRequired,

    axisTop: axisPropType,
    axisRight: axisPropType,
    axisBottom: axisPropType,
    axisLeft: axisPropType,

    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    enableLabels: PropTypes.bool.isRequired,
    labelTextColor: inheritedColorPropType.isRequired,

    colors: quantizeColorScalePropType.isRequired,
    nanColor: PropTypes.string,

    isInteractive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    hoverTarget: PropTypes.oneOf(['cell', 'row', 'column', 'rowColumn']).isRequired,
    cellHoverOpacity: PropTypes.number.isRequired,
    cellHoverOthersOpacity: PropTypes.number.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,

    pixelRatio: PropTypes.number.isRequired,
}

export const HeatMapDefaultProps = {
    indexBy: 'id',

    minValue: 'auto',
    maxValue: 'auto',

    forceSquare: false,
    sizeVariation: 0,
    padding: 0,

    // cells
    cellShape: 'rect',
    cellOpacity: 0.85,
    cellBorderWidth: 0,
    cellBorderColor: { from: 'color' },

    // axes & grid
    axisTop: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: false,

    // labels
    enableLabels: true,
    labelTextColor: { from: 'color', modifiers: [['darker', 1.4]] },

    // theming
    colors: 'nivo',
    nanColor: '#000000',

    // interactivity
    isInteractive: true,
    onClick: noop,
    hoverTarget: 'rowColumn',
    cellHoverOpacity: 1,
    cellHoverOthersOpacity: 0.35,

    // canvas specific
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
