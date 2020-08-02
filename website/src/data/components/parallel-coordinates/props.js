/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { lineCurvePropKeys } from '@nivo/core'
import { commonDefaultProps as defaults } from '@nivo/parallel-coordinates'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        type: 'Array<object | Array>',
        required: true,
    },
    {
        key: 'variables',
        type: 'object[]',
        help: 'Variables configuration.',
        description: `
            Variables configuration, define accessor (\`key\`)
            and variable type. Type must be one of
            \`linear\` or \`point\`, \`linear\`
            variables are suitable for continuous numerical
            data such as age or cost while
            \`point\` variables are suitable for
            discrete values such as gender.
        `,
        group: 'Variables',
        controlType: 'array',
        controlOptions: {
            shouldCreate: false,
            shouldRemove: false,
            getItemTitle: (index, values) => `${values.key} (${values.type})`,
            props: [
                {
                    key: 'key',
                    help: 'Variable key, used to access to corresponding datum value.',
                    controlType: 'text',
                    controlOptions: {
                        disabled: true,
                    },
                },
                {
                    key: 'type',
                    help: `Variable type, must be one of: 'linear', 'point'.`,
                    controlType: 'text',
                    controlOptions: {
                        disabled: true,
                    },
                },
                {
                    key: 'min',
                    help: 'Min value of linear scale.',
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        when: ({ type }) => type === 'linear',
                        disabledValue: 'auto',
                        defaultValue: 0,
                        min: -100,
                        max: 100,
                    },
                },
                {
                    key: 'max',
                    help: 'Max value of linear scale.',
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        when: ({ type }) => type === 'linear',
                        disabledValue: 'auto',
                        defaultValue: 1000,
                        min: -100,
                        max: 100,
                    },
                },
                // {
                //     key: 'padding',
                //     help: 'Outer padding (0~1).',
                //     type: `number`,
                //     controlType: 'range',
                //     controlOptions: {
                //         when: ({ type }) => type === 'point',
                //         min: 0,
                //         max: 1,
                //         step: 0.01,
                //     },
                // },
            ],
        },
    },
    {
        key: 'layout',
        help: `Chart layout.`,
        type: 'string',
        required: false,
        defaultValue: defaults.layout,
        controlType: 'radio',
        group: 'Base',
        controlOptions: {
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'curve',
        help: 'Curve interpolation.',
        description: `
            Defines the curve factory to use for the line generator.
        `,
        type: 'string',
        required: false,
        defaultValue: defaults.curve,
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: lineCurvePropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'axesPlan',
        help: `Axes plan.`,
        type: `string`,
        required: false,
        defaultValue: defaults.axesPlan,
        controlType: 'radio',
        group: 'Base',
        controlOptions: {
            choices: [
                { label: 'foreground', value: 'foreground' },
                { label: 'background', value: 'background' },
            ],
        },
    },
    {
        key: 'axesTicksPosition',
        help: `Axes ticks position.`,
        type: `string`,
        required: false,
        defaultValue: defaults.axesTicksPosition,
        controlType: 'radio',
        group: 'Base',
        controlOptions: {
            choices: [
                { label: 'before', value: 'before' },
                { label: 'after', value: 'after' },
            ],
        },
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using
            \`ResponsiveParallelCoords\`.
        `,
        type: 'number',
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
        enableControlForFlavors: ['api'],
        help: 'Chart height.',
        description: `
            not required if using
            \`ResponsiveParallelCoords\`.
        `,
        type: 'number',
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
        key: 'pixelRatio',
        flavors: ['canvas'],
        help: `Adjust pixel ratio, useful for HiDPI screens.`,
        required: false,
        defaultValue: 'Depends on device',
        type: `number`,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 1,
            max: 2,
        },
    },
    {
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    themeProperty,
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
        key: 'strokeWidth',
        help: 'Lines stroke width.',
        type: 'number',
        required: false,
        defaultValue: defaults.strokeWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'lineOpacity',
        help: 'Lines opacity.',
        type: 'number',
        required: false,
        defaultValue: defaults.lineOpacity,
        controlType: 'opacity',
        group: 'Style',
    },
    ...motionProperties(['svg'], defaults, 'react-spring'),
]

export const groups = groupProperties(props)
