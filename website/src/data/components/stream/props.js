/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { areaCurvePropKeys, stackOrderPropKeys, stackOffsetPropKeys } from '@nivo/core'
import { StreamDefaultProps as defaults } from '@nivo/stream'
import {
    axesProperties,
    motionProperties,
    defsProperties,
    getPropertiesGroupsControls,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: `
            not required if using
            \`<ResponsiveStream/>\`.
        `,
        help: 'Chart width.',
        type: '{number}',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        scopes: ['api'],
        docScopes: '*',
        description: `
            not required if using
            \`<ResponsiveStream/>\`.
        `,
        help: 'Chart height.',
        type: '{number}',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'offsetType',
        scopes: '*',
        help: 'Offset type.',
        type: 'string',
        required: false,
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: stackOffsetPropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'order',
        scopes: '*',
        help: 'Layers order.',
        type: 'string',
        required: false,
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: stackOrderPropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'curve',
        scopes: '*',
        description: `
            Defines the curve factory to use
            for the area generator.
        `,
        help: 'Curve interpolation.',
        type: 'string',
        required: false,
        defaultValue: defaults.curve,
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: areaCurvePropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'margin',
        scopes: '*',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'colors',
        scopes: '*',
        help: 'Defines how to compute line color.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'colors',
        group: 'Style',
    },
    {
        key: 'fillOpacity',
        help: 'Layers fill opacity.',
        type: 'number',
        required: false,
        defaultValue: defaults.fillOpacity,
        controlType: 'opacity',
        group: 'Style',
    },
    {
        key: 'borderWidth',
        scopes: ['Stream', 'api'],
        help: 'Width of layer border.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        scopes: ['Stream', 'api'],
        description: `
            How to compute border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        help: 'Method to compute layer border color.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.borderColor,
        controlType: 'color',
        group: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    ...defsProperties(['Stream']),
    {
        key: 'enableGridX',
        scopes: '*',
        help: 'Enable/disable x grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridX,
        controlType: 'switch',
        group: 'Grid & Axes',
    },
    {
        key: 'enableGridY',
        scopes: '*',
        help: 'Enable/disable y grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridY,
        controlType: 'switch',
        group: 'Grid & Axes',
    },
    ...axesProperties,
    {
        key: 'enableDots',
        scopes: ['Stream'],
        help: 'Enable/disable dots.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableDots,
        controlType: 'switch',
        group: 'Dots',
    },
    {
        key: 'renderDot',
        scopes: ['Stream'],
        help: 'Custom rendering function for dots.',
        type: 'Function',
        required: false,
    },
    {
        key: 'dotSize',
        help: 'Size of the dots',
        description:
            'Size of the dots, it also accepts a function which can be used to make it vary according to the associated datum.',
        type: 'number | Function',
        required: false,
        defaultValue: defaults.dotSize,
        controlType: 'range',
        group: 'Dots',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 20,
        },
    },
    {
        key: 'dotColor',
        help: 'Method to compute dots color.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.dotColor,
        controlType: 'color',
        group: 'Dots',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'dotBorderWidth',
        help: 'Width of the dots border.',
        description:
            'Width of the dots border, it also accepts a function which can be used to make it vary according to the associated datum.',
        type: 'number | Function',
        required: false,
        defaultValue: defaults.dotBorderWidth,
        controlType: 'lineWidth',
        group: 'Dots',
    },
    {
        key: 'dotBorderColor',
        scopes: '*',
        help: 'Method to compute dots border color.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.dotBorderColor,
        controlType: 'color',
        group: 'Dots',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'isInteractive',
        scopes: ['Stream'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'enableStackTooltip',
        scopes: ['Stream'],
        help: `Enable/disable stack tooltip ('isInteractive' must also be 'true').`,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableStackTooltip,
        controlType: 'switch',
        group: 'Interactivity',
    },
    ...motionProperties(['Stream'], defaults),
]

export const groupsByScope = {
    Stream: getPropertiesGroupsControls(props, 'Stream'),
}
