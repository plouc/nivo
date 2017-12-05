/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { lineCurvePropType } from '@nivo/core'

export const LinePropTypes = {
    // data
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                })
            ).isRequired,
        })
    ).isRequired,

    stacked: PropTypes.bool.isRequired,
    curve: lineCurvePropType.isRequired,
    areaGenerator: PropTypes.func.isRequired,
    lineGenerator: PropTypes.func.isRequired,

    lines: PropTypes.array.isRequired,
    slices: PropTypes.array.isRequired,

    minY: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.oneOf(['auto'])])
        .isRequired,
    maxY: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.oneOf(['auto'])])
        .isRequired,
    xScale: PropTypes.func.isRequired, // computed
    yScale: PropTypes.func.isRequired, // computed

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // dots
    enableDots: PropTypes.bool.isRequired,
    dotSymbol: PropTypes.func,
    dotSize: PropTypes.number.isRequired,
    dotColor: PropTypes.any.isRequired,
    dotBorderWidth: PropTypes.number.isRequired,
    dotBorderColor: PropTypes.any.isRequired,
    enableDotLabel: PropTypes.bool.isRequired,

    // markers
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.oneOf(['x', 'y']).isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            style: PropTypes.object,
        })
    ),

    // styling
    getColor: PropTypes.func.isRequired,
    enableArea: PropTypes.bool.isRequired,
    areaOpacity: PropTypes.number.isRequired,
    lineWidth: PropTypes.number.isRequired,
    defs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ).isRequired,

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
    enableStackTooltip: PropTypes.bool.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

export const LineDefaultProps = {
    indexBy: 'id',
    keys: ['value'],

    stacked: false,
    curve: 'linear',

    // scales
    minY: 0,
    maxY: 'auto',

    // axes & grid
    axisBottom: {},
    axisLeft: {},
    enableGridX: true,
    enableGridY: true,

    // dots
    enableDots: true,
    dotSize: 6,
    dotColor: 'inherit',
    dotBorderWidth: 0,
    dotBorderColor: 'inherit',
    enableDotLabel: false,

    // styling
    colors: 'nivo',
    colorBy: 'id',
    enableArea: false,
    areaOpacity: 0.2,
    lineWidth: 2,
    defs: [],

    // interactivity
    isInteractive: true,
    enableStackTooltip: true,
}
