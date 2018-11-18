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
import StreamDotsItem from './StreamDotsItem'

export const StreamPropTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    keys: PropTypes.array.isRequired,

    stack: PropTypes.func.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,

    order: stackOrderPropType.isRequired,
    offsetType: stackOffsetPropType.isRequired,
    curve: areaCurvePropType.isRequired,
    areaGenerator: PropTypes.func.isRequired,

    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

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

    enableDots: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
    renderDot: PropTypes.func.isRequired,
    dotPosition: PropTypes.oneOf(['start', 'center', 'end']).isRequired,
    dotSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    getDotSize: PropTypes.func.isRequired,
    dotColor: PropTypes.any.isRequired,
    dotBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    getDotBorderWidth: PropTypes.func.isRequired,
    dotBorderColor: PropTypes.any.isRequired,

    isInteractive: PropTypes.bool,
    tooltipLabel: PropTypes.func,
    getTooltipLabel: PropTypes.func.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    getTooltipValue: PropTypes.func.isRequired,
    enableStackTooltip: PropTypes.bool.isRequired,

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
}

export const StreamDefaultProps = {
    order: 'none',
    offsetType: 'wiggle',
    curve: 'catmullRom',

    axisBottom: {},
    enableGridX: true,
    enableGridY: false,

    borderWidth: 0,
    borderColor: 'inherit:darker(1)',

    colors: 'nivo',
    fillOpacity: 1,
    defs: [],
    fill: [],

    enableDots: false,
    dotPosition: 'center',
    renderDot: StreamDotsItem,
    dotSize: 6,
    dotColor: 'inherit',
    dotBorderWidth: 0,
    dotBorderColor: 'inherit',

    isInteractive: true,

    enableStackTooltip: true,

    legends: [],
}
