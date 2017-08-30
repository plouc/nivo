/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'

export const BarPropTypes = {
    // data
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    indexBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getIndex: PropTypes.func.isRequired, // computed
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,

    groupMode: PropTypes.oneOf(['stacked', 'grouped']).isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,

    xPadding: PropTypes.number.isRequired,

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // labels
    enableLabels: PropTypes.bool.isRequired,
    labelsTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabelsTextColor: PropTypes.func.isRequired, // computed
    labelsLinkColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabelsLinkColor: PropTypes.func.isRequired, // computed
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    labelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getLabel: PropTypes.func,
    // interactions
    onClick: PropTypes.func,

    // theming
    getColor: PropTypes.func.isRequired,

    // interactivity
    isInteractive: PropTypes.bool,

    // canvas specific
    pixelRatio: PropTypes.number.isRequired,
}

export const BarDefaultProps = {
    indexBy: 'id',
    keys: ['value'],

    groupMode: 'stacked',
    layout: 'vertical',

    xPadding: 0.1,

    // axes & grid
    axisBottom: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: true,

    // labels
    enableLabels: true,
    labelsLinkColor: 'theme',
    labelsTextColor: 'theme',
    label: 'value',
    // interactivity
    isInteractive: true,

    // canvas specific
    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,
}
