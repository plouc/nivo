/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { areaCurvePropType, stackOrderPropType, stackOffsetPropType } from '../../../props'

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

    // theming
    colors: PropTypes.any.isRequired,
    fillOpacity: PropTypes.number.isRequired,
    getColor: PropTypes.func.isRequired,

    // interactivity
    isInteractive: PropTypes.bool,

    // stack tooltip
    enableStackTooltip: PropTypes.bool.isRequired,
}

export const StreamDefaultProps = {
    order: 'none',
    offsetType: 'wiggle',
    curve: 'catmullRom',

    // axes & grid
    axisBottom: {},
    enableGridX: true,
    enableGridY: false,

    // theming
    colors: 'nivo',
    fillOpacity: 1,

    // interactivity
    isInteractive: true,

    // stack tooltip
    enableStackTooltip: true,
}
