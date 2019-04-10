/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { axisPropType } from '@nivo/axes'
import { ordinalColorsPropType } from '@nivo/colors'
import { scalePropType } from '@nivo/scales'

const commonPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                        PropTypes.instanceOf(Date),
                    ]).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,

    scale: scalePropType.isRequired,

    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    forceStrength: PropTypes.number.isRequired,
    simulationIterations: PropTypes.number.isRequired,
    //layers: PropTypes.arrayOf(
    //    PropTypes.oneOfType([PropTypes.oneOf(['grid', 'axes', 'nodes']), PropTypes.func])
    //).isRequired,

    // renderNode: PropTypes.func.isRequired,

    gap: PropTypes.number.isRequired,
    nodeSize: PropTypes.number.isRequired,
    nodePadding: PropTypes.number.isRequired,
    colors: ordinalColorsPropType.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.any.isRequired,

    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,
    axisTop: axisPropType,
    axisRight: axisPropType,
    axisBottom: axisPropType,
    axisLeft: axisPropType,

    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    tooltip: PropTypes.any,
}

export const SwarmPlotPropTypes = {
    ...commonPropTypes,
}

export const SwarmPlotCanvasPropTypes = {
    pixelRatio: PropTypes.number.isRequired,
    ...commonPropTypes,
}

const commonDefaultProps = {
    scale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },

    layout: 'horizontal',
    forceStrength: 4,
    simulationIterations: 160,
    layers: ['grid', 'axes', 'nodes'],

    gap: 0,
    nodeSize: 6,
    nodePadding: 2,
    colors: { scheme: 'nivo' },
    borderWidth: 0,
    borderColor: 'inherit:darker(.3)',

    enableGridX: true,
    enableGridY: true,
    axisTop: {},
    axisBottom: {},
    axisLeft: {},

    isInteractive: true,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseMove: () => {},
    onClick: () => {},

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
}

export const SwarmPlotDefaultProps = {
    ...commonDefaultProps,
}

export const SwarmPlotCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
