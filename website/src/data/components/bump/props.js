/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { BumpDefaultProps as defaults } from '@nivo/bump'
import { motionProperties, groupProperties } from '../../../lib/componentProperties'

const props = [
    {
        key: 'width',
        group: 'Base',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using
            \`<ResponsiveChord/>\`.
            Also note that width does not include labels,
            so you should add enough margin to display them.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        group: 'Base',
        enableControlForFlavors: ['api'],
        help: 'Chart height.',
        description: `
            not required if using
            \`<ResponsiveChord/>\`.
            Also note that width does not include labels,
            so you should add enough margin to display them.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'margin',
        group: 'Base',
        help: 'Chart margin.',
        type: 'object',
        controlType: 'margin',
    },
    {
        key: 'xOuterPadding',
        group: 'Base',
        type: 'number',
        defaultValue: defaults.xOuterPadding,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'yOuterPadding',
        group: 'Base',
        type: 'number',
        defaultValue: defaults.yOuterPadding,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'lineCurvaturePadding',
        group: 'Base',
        type: 'number',
        defaultValue: defaults.lineCurvaturePadding,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'colors',
        help: 'Defines color range.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'ordinalColors',
        group: 'Style',
    },
    {
        key: 'startLabel',
        group: 'Labels',
        type: 'false | string | (serie: Serie) => string',
        defaultValue: defaults.startLabel,
    },
    {
        key: 'startLabelPadding',
        group: 'Labels',
        type: 'number',
        defaultValue: defaults.startLabelPadding,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 30,
        },
    },
    {
        key: 'startLabelTextColor',
        help: 'Method to compute start label text color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.startLabelTextColor,
        controlType: 'inheritedColor',
        group: 'Labels',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'endLabel',
        group: 'Labels',
        type: 'false | string | (serie: Serie) => string',
        defaultValue: defaults.endLabel,
    },
    {
        key: 'endLabelPadding',
        group: 'Labels',
        type: 'number',
        defaultValue: defaults.endLabelPadding,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 30,
        },
    },
    {
        key: 'endLabelTextColor',
        help: 'Method to compute end label text color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.endLabelTextColor,
        controlType: 'inheritedColor',
        group: 'Labels',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'pointSize',
        group: 'Points',
        help: 'Point size.',
        type: 'number | Function',
        defaultValue: defaults.pointSize,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 24,
        },
    },
    {
        key: 'activePointSize',
        group: 'Points',
        help: 'Point size for active series.',
        type: 'number | Function',
        defaultValue: defaults.activePointSize,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 24,
        },
    },
    {
        key: 'inactivePointSize',
        group: 'Points',
        help: 'Point size for inactive series.',
        type: 'number | Function',
        defaultValue: defaults.inactivePointSize,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 24,
        },
    },
    {
        key: 'pointColor',
        group: 'Points',
        type: 'string | object | Function',
        help: 'Method to compute point fill color.',
        defaultValue: defaults.pointColor,
        controlType: 'inheritedColor',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'enableGridX',
        group: 'Grid & Axes',
        help: 'Enable/disable x grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridX,
        controlType: 'switch',
    },
    {
        key: 'enableGridY',
        group: 'Grid & Axes',
        help: 'Enable/disable y grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridY,
        controlType: 'switch',
    },
    ...motionProperties(['svg'], defaults),
]

export const groups = groupProperties(props)
