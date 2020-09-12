/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { noop, defsPropTypes } from '@nivo/core'
import {
    ordinalColorsPropType,
    colorPropertyAccessorPropType,
    inheritedColorPropType,
} from '@nivo/colors'
import { axisPropType } from '@nivo/axes'
import { LegendPropShape } from '@nivo/legends'
import BarItem from './BarItem'

export const BarPropTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    indexBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getIndex: PropTypes.func.isRequired, // computed
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.oneOf(['grid', 'axes', 'bars', 'markers', 'legends', 'annotations']),
            PropTypes.func,
        ])
    ).isRequired,

    groupMode: PropTypes.oneOf(['stacked', 'grouped']).isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    reverse: PropTypes.bool.isRequired,

    minValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,
    maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,
    padding: PropTypes.number.isRequired,
    innerPadding: PropTypes.number.isRequired,

    axisTop: axisPropType,
    axisRight: axisPropType,
    axisBottom: axisPropType,
    axisLeft: axisPropType,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,
    gridXValues: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    ]),
    gridYValues: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    ]),

    barComponent: PropTypes.func.isRequired,

    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    getLabel: PropTypes.func.isRequired, // computed
    labelSkipWidth: PropTypes.number.isRequired,
    labelSkipHeight: PropTypes.number.isRequired,
    labelTextColor: inheritedColorPropType.isRequired,
    getLabelTextColor: PropTypes.func.isRequired, // computed
    labelLinkColor: inheritedColorPropType.isRequired,
    getLabelLinkColor: PropTypes.func.isRequired, // computed

    colors: ordinalColorsPropType.isRequired,
    colorBy: colorPropertyAccessorPropType.isRequired,
    borderRadius: PropTypes.number.isRequired,
    getColor: PropTypes.func.isRequired, // computed
    ...defsPropTypes,
    borderWidth: PropTypes.number.isRequired,
    borderColor: inheritedColorPropType.isRequired,
    getBorderColor: PropTypes.func.isRequired,

    isInteractive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    tooltipLabel: PropTypes.func,
    getTooltipLabel: PropTypes.func.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,

    legends: PropTypes.arrayOf(
        PropTypes.shape({
            dataFrom: PropTypes.oneOf(['indexes', 'keys']).isRequired,
            ...LegendPropShape,
        })
    ).isRequired,

    pixelRatio: PropTypes.number.isRequired,

    role: PropTypes.string,
}

export const BarDefaultProps = {
    indexBy: 'id',
    keys: ['value'],
    layers: ['grid', 'axes', 'bars', 'markers', 'legends', 'annotations'],

    groupMode: 'stacked',
    layout: 'vertical',
    reverse: false,

    minValue: 'auto',
    maxValue: 'auto',
    padding: 0.1,
    innerPadding: 0,

    axisBottom: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: true,

    barComponent: BarItem,

    enableLabel: true,
    label: 'value',
    labelSkipWidth: 0,
    labelSkipHeight: 0,
    labelLinkColor: 'theme',
    labelTextColor: 'theme',

    colors: { scheme: 'nivo' },
    colorBy: 'id',
    defs: [],
    fill: [],
    borderRadius: 0,
    borderWidth: 0,
    borderColor: { from: 'color' },

    isInteractive: true,
    onClick: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,

    legends: [],

    annotations: [],

    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,

    role: 'img',
}
