/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { quantizeColorScalePropType } from '@nivo/core'

export const HeatMapPropTypes = {
    // data
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    indexBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getIndex: PropTypes.func.isRequired, // computed
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,

    minValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
    maxValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,

    forceSquare: PropTypes.bool.isRequired,
    sizeVariation: PropTypes.number.isRequired,
    padding: PropTypes.number.isRequired,

    // cells
    cellShape: PropTypes.oneOfType([PropTypes.oneOf(['rect', 'circle']), PropTypes.func])
        .isRequired,
    cellOpacity: PropTypes.number.isRequired,
    cellBorderWidth: PropTypes.number.isRequired,
    cellBorderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getCellBorderColor: PropTypes.func.isRequired, // computed

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // labels
    enableLabels: PropTypes.bool.isRequired,
    labelTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabelTextColor: PropTypes.func.isRequired, // computed

    // theming
    colors: quantizeColorScalePropType.isRequired,
    colorScale: PropTypes.func.isRequired, // computed

    // interactivity
    isInteractive: PropTypes.bool,
    hoverTarget: PropTypes.oneOf(['cell', 'row', 'column', 'rowColumn']).isRequired,
    cellHoverOpacity: PropTypes.number.isRequired,
    cellHoverOthersOpacity: PropTypes.number.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    // canvas specific
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
    cellBorderColor: 'inherit',

    // axes & grid
    axisTop: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: false,

    // labels
    enableLabels: true,
    labelTextColor: 'inherit:darker(1.4)',

    // theming
    colors: 'nivo',

    // interactivity
    isInteractive: true,
    hoverTarget: 'rowColumn',
    cellHoverOpacity: 1,
    cellHoverOthersOpacity: 0.35,

    // canvas specific
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
