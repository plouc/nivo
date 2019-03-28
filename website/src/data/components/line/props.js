/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { lineCurvePropKeys, DotsItemDefaultProps as dotDefaults } from '@nivo/core'
import { LineDefaultProps as defaults } from '@nivo/line'
import {
    axesProperties,
    motionProperties,
    getLegendsProps,
    getPropertiesGroupsControls,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        scopes: '*',
        group: 'Base',
        help: 'Chart data.',
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            Array<{
                id:   string | number
                data: Array<{
                    x: number | string | Date
                    y: number | string | Date
                }>
            }>
            \`\`\`
        `,
        required: true,
        type: 'object[]',
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        help: 'Chart width.',
        description: `
            not required if using
            \`<ResponsiveLine/>\`.
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
        scopes: ['api'],
        docScopes: '*',
        help: 'Chart height.',
        description: `
            not required if using
            \`<ResponsiveLine/>\`.
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
        key: 'margin',
        scopes: '*',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'layers',
        scopes: ['Line'],
        group: 'Base',
        help: 'Defines the order of layers.',
        description: `
            Defines the order of layers, available layers are:
            \`grid\`, \`markers\`, \`axes\`, \`areas\`,
            \`lines\`, \`slices\`, \`dots\`, \`legends\`.

            You can also use this to insert extra layers
            to the chart, this extra layer must be
            a function which will receive the chart
            computed data and must return a valid SVG element.
        `,
        required: false,
        defaultValue: defaults.layers,
    },
    {
        key: 'curve',
        scopes: '*',
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
        key: 'xScale',
        scopes: '*',
        type: 'object',
        help: `X scale configuration.`,
        group: 'Base',
        controlType: 'object',
        controlOptions: {
            props: [
                {
                    key: 'type',
                    help: `Scale type.`,
                    type: 'string',
                    controlType: 'choices',
                    controlOptions: {
                        disabled: true,
                        choices: ['linear', 'point'].map(v => ({
                            label: v,
                            value: v,
                        })),
                    },
                },
            ],
        },
    },
    {
        key: 'yScale',
        scopes: '*',
        type: 'object',
        help: `Y scale configuration.`,
        group: 'Base',
        controlType: 'object',
        controlOptions: {
            props: [
                {
                    key: 'type',
                    help: `Scale type.`,
                    type: 'string',
                    controlType: 'choices',
                    controlOptions: {
                        disabled: true,
                        choices: ['linear', 'point'].map(v => ({
                            label: v,
                            value: v,
                        })),
                    },
                },
                {
                    key: 'stacked',
                    scopes: '*',
                    help: 'Enable/disable stacked mode.',
                    type: 'boolean',
                    required: false,
                    controlType: 'switch',
                },
                {
                    key: 'min',
                    help: 'Minimum scale value.',
                    required: false,
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        disabledValue: 'auto',
                        defaultValue: 0,
                        min: -2000,
                        max: 2000,
                    },
                },
                {
                    key: 'max',
                    help: 'Maximum scale value.',
                    required: false,
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        disabledValue: 'auto',
                        defaultValue: 1200,
                        min: -2000,
                        max: 2000,
                    },
                },
            ],
        },
    },
    {
        key: 'colors',
        scopes: '*',
        help: 'Defines color range.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'colors',
        group: 'Style',
    },
    {
        key: 'colorBy',
        scopes: '*',
        help: 'Node color.',
        description:
            'Property to use to determine node color. If a function is provided, it will receive current node data and must return a color.',
        required: false,
        defaultValue: defaults.colorBy,
        controlType: 'choices',
        group: 'Style',
        controlOptions: {
            choices: [
                {
                    label: 'id',
                    value: 'id',
                },
                {
                    label: 'd => d.color',
                    value: 'd => d.color',
                },
            ],
        },
    },
    {
        key: 'lineWidth',
        scopes: '*',
        help: 'Line width.',
        type: 'number',
        required: false,
        defaultValue: defaults.lineWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'enableArea',
        scopes: '*',
        help: 'Enable/disable area below each line.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableArea,
        controlType: 'switch',
        group: 'Style',
    },
    {
        key: 'areaBaselineValue',
        scopes: '*',
        help: 'Define the value to be used for area baseline.',
        description: `
            Define the value to be used for area baseline.
            Please note that this value isn't the
            position of the baseline but the value used
            to compute it.
        `,
        type: 'number | string | Date',
        required: false,
        defaultValue: defaults.areaBaselineValue,
        controlType: 'range',
        group: 'Style',
        controlOptions: {
            min: 0,
            max: 200,
            step: 10,
        },
    },
    {
        key: 'areaOpacity',
        scopes: '*',
        help: 'Area opacity (0~1), depends on enableArea.',
        required: false,
        defaultValue: defaults.areaOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Style',
    },
    {
        key: 'areaBlendMode',
        scopes: '*',
        help: 'Defines CSS mix-blend-mode property.',
        description: `
            Defines CSS \`mix-blend-mode\` property for areas,
            see
            [MDN documentation](https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode).
        `,
        type: 'string',
        required: false,
        defaultValue: defaults.areaBlendMode,
        controlType: 'choices',
        group: 'Style',
        controlOptions: {
            choices: [
                'normal',
                'multiply',
                'screen',
                'overlay',
                'darken',
                'lighten',
                'color-dodge',
                'color-burn',
                'hard-light',
                'soft-light',
                'difference',
                'exclusion',
                'hue',
                'saturation',
                'color',
                'luminosity',
            ].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'enableDots',
        scopes: '*',
        help: 'Enable/disable dots.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableDots,
        controlType: 'switch',
        group: 'Dots',
    },
    {
        key: 'dotSymbol',
        help:
            'Overrides default dot circle. The function will receive `size`, `color`, `borderWidth` and `borderColor` props and must return a valid SVG element.',
        type: 'Function',
        required: false,
    },
    {
        key: 'dotSize',
        help: 'Size of the dots.',
        type: 'number',
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
        scopes: '*',
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
        type: 'number',
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
        key: 'enableDotLabel',
        scopes: '*',
        help: 'Enable/disable dots label.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableDotLabel,
        controlType: 'switch',
        group: 'Dots',
    },
    {
        key: 'dotLabel',
        help:
            'Property to use to determine dot label. If a function is provided, it will receive current value and serie and must return a label.',
        type: 'string',
        required: false,
        controlType: 'choices',
        group: 'Dots',
        controlOptions: {
            choices: ['y', 'x', 'serie.id', `d => \`\${d.x}: \${d.y}\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'dotLabelYOffset',
        help: 'Label Y offset from dot shape.',
        type: 'number',
        required: false,
        defaultValue: dotDefaults.labelYOffset,
        controlType: 'range',
        group: 'Dots',
        controlOptions: {
            unit: 'px',
            min: -24,
            max: 24,
        },
    },
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
        key: 'gridXValues',
        scopes: '*',
        group: 'Grid & Axes',
        help: 'Specify values to use for vertical grid lines.',
        type: 'Array<number | string>',
        required: false,
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
    {
        key: 'gridYValues',
        scopes: '*',
        group: 'Grid & Axes',
        help: 'Specify values to use for horizontal grid lines.',
        type: 'Array<number | string>',
        required: false,
    },
    ...axesProperties,
    {
        key: 'isInteractive',
        scopes: ['Line'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'enableStackTooltip',
        scopes: ['Line'],
        help: `Enable/disable stack tooltip ('isInteractive' must also be 'true').`,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableStackTooltip,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'tooltip',
        scopes: ['Line'],
        group: 'Interactivity',
        help: `Method to create custom tooltip`,
        type: 'Function',
        required: false,
        defaultValue: defaults.tooltip,
    },
    {
        key: 'legends',
        scopes: ['Line'],
        type: 'object[]',
        help: `Optional chart's legends.`,
        group: 'Legends',
        controlType: 'array',
        controlOptions: {
            props: getLegendsProps(),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            getItemTitle: (index, legend) =>
                `legend[${index}]: ${legend.anchor}, ${legend.direction}`,
            defaults: {
                anchor: 'left',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 4,
                symbolSize: 20,
                symbolShape: 'circle',
                itemDirection: 'left-to-right',
                itemTextColor: '#777',
                onClick: data => {
                    alert(JSON.stringify(data, null, '    '))
                },
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1,
                        },
                    },
                ],
            },
        },
    },
    ...motionProperties(['Line'], defaults),
]

export const groupsByScope = {
    Line: getPropertiesGroupsControls(props, 'Line'),
    api: getPropertiesGroupsControls(props, 'api'),
}
