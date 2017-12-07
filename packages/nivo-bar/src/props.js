/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { noop } from '@nivo/core'
import { defsPropTypes } from '@nivo/core'
import { LegendPropShape } from '@nivo/legends'
import BarItem from './BarItem'

export const BarPropTypes = {
    // data
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    indexBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getIndex: PropTypes.func.isRequired, // computed
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,

    groupMode: PropTypes.oneOf(['stacked', 'grouped']).isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    reverse: PropTypes.bool.isRequired,

    minValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,
    maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,
    padding: PropTypes.number.isRequired,
    innerPadding: PropTypes.number.isRequired,

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // customization
    barComponent: PropTypes.func.isRequired,

    // labels
    enableLabel: PropTypes.bool.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    getLabel: PropTypes.func.isRequired, // computed
    labelSkipWidth: PropTypes.number.isRequired,
    labelSkipHeight: PropTypes.number.isRequired,
    labelTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabelTextColor: PropTypes.func.isRequired, // computed
    labelLinkColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabelLinkColor: PropTypes.func.isRequired, // computed

    // styling
    borderRadius: PropTypes.number.isRequired,
    getColor: PropTypes.func.isRequired, // computed
    ...defsPropTypes,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.any.isRequired,
    getBorderColor: PropTypes.func.isRequired,

    // interactivity
    isInteractive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    // canvas specific
    pixelRatio: PropTypes.number.isRequired,

    legends: PropTypes.arrayOf(
        PropTypes.shape({
            dataFrom: PropTypes.oneOf(['indexes', 'keys']).isRequired,
            ...LegendPropShape,
        })
    ).isRequired,
}

export const BarDefaultProps = {
    indexBy: 'id',
    keys: ['value'],

    groupMode: 'stacked',
    layout: 'vertical',
    reverse: false,

    minValue: 'auto',
    maxValue: 'auto',
    padding: 0.1,
    innerPadding: 0,

    // axes & grid
    axisBottom: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: true,

    // customization
    barComponent: BarItem,

    // labels
    enableLabel: true,
    label: 'value',
    labelSkipWidth: 0,
    labelSkipHeight: 0,
    labelLinkColor: 'theme',
    labelTextColor: 'theme',

    defs: [],
    fill: [],
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'inherit',

    // interactivity
    isInteractive: true,
    onClick: noop,

    // canvas specific
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,

    legends: [],
}
