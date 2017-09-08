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

    // theming
    borderRadius: PropTypes.number.isRequired,
    getColor: PropTypes.func.isRequired, // computed

    // interactivity
    isInteractive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,

    // canvas specific
    pixelRatio: PropTypes.number.isRequired,
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

    borderRadius: 0,

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

    // interactivity
    isInteractive: true,
    onClick: noop,

    // canvas specific
    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,
}
