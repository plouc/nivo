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
import { motionPropTypes } from '@nivo/core'
import {
    ordinalColorsPropType,
    inheritedColorPropType,
    colorPropertyAccessorPropType,
} from '@nivo/colors'
import { scalePropType } from '@nivo/scales'
import { annotationSpecPropType } from '@nivo/annotations'

const commonPropTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,

    groups: PropTypes.arrayOf(PropTypes.string).isRequired,
    groupBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    valueScale: scalePropType.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            values: PropTypes.arrayOf(PropTypes.number).isRequired,
            sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
        }),
        PropTypes.func,
    ]).isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    gap: PropTypes.number.isRequired,

    forceStrength: PropTypes.number.isRequired,
    simulationIterations: PropTypes.number.isRequired,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.oneOf(['grid', 'axes', 'nodes', 'mesh', 'annotations']),
            PropTypes.func,
        ])
    ).isRequired,
    renderNode: PropTypes.func.isRequired,

    colors: ordinalColorsPropType.isRequired,
    colorBy: colorPropertyAccessorPropType.isRequired,
    borderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    borderColor: inheritedColorPropType.isRequired,

    enableGridX: PropTypes.bool.isRequired,
    gridXValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    enableGridY: PropTypes.bool.isRequired,
    gridYValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

    axisTop: axisPropType,
    axisRight: axisPropType,
    axisBottom: axisPropType,
    axisLeft: axisPropType,

    annotations: PropTypes.arrayOf(annotationSpecPropType).isRequired,

    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    useMesh: PropTypes.bool.isRequired,
    debugMesh: PropTypes.bool.isRequired,
    tooltip: PropTypes.any,
}

export const SwarmPlotPropTypes = {
    ...commonPropTypes,
    ...motionPropTypes,
}

export const SwarmPlotCanvasPropTypes = {
    pixelRatio: PropTypes.number.isRequired,
    ...commonPropTypes,
}

const commonDefaultProps = {
    groupBy: 'group',
    identity: 'id',
    label: 'id',
    value: 'value',
    valueScale: { type: 'linear', min: 0, max: 'auto' },
    size: 6,
    spacing: 2,
    layout: 'vertical',
    gap: 0,

    forceStrength: 1,
    simulationIterations: 120,

    layers: ['grid', 'axes', 'nodes', 'mesh', 'annotations'],

    colors: { scheme: 'nivo' },
    colorBy: 'group',
    borderWidth: 0,
    borderColor: 'none',

    enableGridX: true,
    enableGridY: true,
    axisTop: {},
    axisRight: {},
    axisBottom: {},
    axisLeft: {},

    annotations: [],

    isInteractive: true,
    useMesh: false,
    debugMesh: false,
}

export const SwarmPlotDefaultProps = {
    ...commonDefaultProps,
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
}

export const SwarmPlotCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
