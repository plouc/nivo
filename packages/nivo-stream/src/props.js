/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { areaCurvePropType, stackOrderPropType, stackOffsetPropType } from '@nivo/core'
import { LegendPropShape } from '@nivo/legends'

export const StreamPropTypes = {
    // data
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    keys: PropTypes.array.isRequired,

    stack: PropTypes.func.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,

    order: stackOrderPropType.isRequired,
    offsetType: stackOffsetPropType.isRequired,
    curve: areaCurvePropType.isRequired,
    areaGenerator: PropTypes.func.isRequired,

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // styling
    colors: PropTypes.any.isRequired,
    fillOpacity: PropTypes.number.isRequired,
    getColor: PropTypes.func.isRequired, // computed
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
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.any.isRequired,
    getBorderColor: PropTypes.func.isRequired, // computed

    // interactivity
    isInteractive: PropTypes.bool,
    enableStackTooltip: PropTypes.bool.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
}

export const StreamDefaultProps = {
    order: 'none',
    offsetType: 'wiggle',
    curve: 'catmullRom',

    // axes & grid
    axisBottom: {},
    enableGridX: true,
    enableGridY: false,

    borderWidth: 0,
    borderColor: 'inherit:darker(1)',

    // styling
    colors: 'nivo',
    fillOpacity: 1,
    defs: [],
    fill: [],

    // interactivity
    isInteractive: true,

    // stack tooltip
    enableStackTooltip: true,

    legends: [],
}
