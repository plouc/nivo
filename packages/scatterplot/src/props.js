/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { LegendPropShape } from '@nivo/legends'

export const ScatterPlotPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    x: PropTypes.number.isRequired,
                    y: PropTypes.number.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,

    scales: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            axis: PropTypes.oneOf(['x', 'y']).isRequired,
            domain: PropTypes.arrayOf(
                PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])])
            ).isRequired,
        })
    ).isRequired,

    xScale: PropTypes.func.isRequired, // computed
    yScale: PropTypes.func.isRequired, // computed

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // symbols
    symbolSize: PropTypes.oneOfType([PropTypes.func, PropTypes.number]).isRequired,
    symbolShape: PropTypes.oneOfType([PropTypes.oneOf(['circle', 'square'])]).isRequired,

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

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,

    // canvas specific
    pixelRatio: PropTypes.number.isRequired,
}

export const ScatterPlotDefaultProps = {
    scales: [
        { id: 'x', axis: 'x', domain: [0, 'auto'] },
        { id: 'y', axis: 'y', domain: [0, 'auto'] },
    ],

    // axes & grid
    axisBottom: {},
    axisLeft: {},
    enableGridX: true,
    enableGridY: true,

    // symbols
    symbolSize: 6,
    symbolShape: 'circle',

    // styling
    colors: 'nivo',
    colorBy: 'id',

    // interactivity
    isInteractive: true,
    enableStackTooltip: true,

    legends: [],

    // canvas specific
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
