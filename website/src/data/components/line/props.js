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
        controlType: 'ordinalColors',
        group: 'Style',
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
        scopes: ['Line', 'api'],
        help: 'Defines CSS mix-blend-mode property.',
        description: `
            Defines CSS \`mix-blend-mode\` property for areas,
            see
            [MDN documentation](https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode).
        `,
        type: 'string',
        required: false,
        defaultValue: defaults.areaBlendMode,
        controlType: 'blendMode',
        group: 'Style',
    },
    {
        key: 'layers',
        scopes: ['Line', 'LineCanvas'],
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this property to insert extra layers
            to the chart, this extra layer must be
            a function which will receive the chart
            computed data and must return a valid SVG element.
        `,
        required: false,
        defaultValue: defaults.layers,
    },
    {
        key: 'enablePoints',
        scopes: '*',
        help: 'Enable/disable points.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enablePoints,
        controlType: 'switch',
        group: 'Points',
    },
    {
        key: 'pointSymbol',
        help:
            'Overrides default point circle. The function will receive `size`, `color`, `borderWidth` and `borderColor` props and must return a valid SVG element.',
        type: 'Function',
        required: false,
        group: 'Points',
    },
    {
        key: 'pointSize',
        help: 'Size of the points.',
        type: 'number',
        required: false,
        defaultValue: defaults.pointSize,
        controlType: 'range',
        group: 'Points',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 20,
        },
    },
    {
        key: 'pointColor',
        scopes: '*',
        help: 'Method to compute points color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.pointColor,
        controlType: 'inheritedColor',
        group: 'Points',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'pointBorderWidth',
        help: 'Width of the points border.',
        type: 'number',
        required: false,
        defaultValue: defaults.pointBorderWidth,
        controlType: 'lineWidth',
        group: 'Points',
    },
    {
        key: 'pointBorderColor',
        scopes: '*',
        help: 'Method to compute points border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.pointBorderColor,
        controlType: 'inheritedColor',
        group: 'Points',
    },
    {
        key: 'enablePointLabel',
        scopes: '*',
        help: 'Enable/disable points label.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enablePointLabel,
        controlType: 'switch',
        group: 'Points',
    },
    {
        key: 'pointLabel',
        help:
            'Property to use to determine point label. If a function is provided, it will receive current value and serie and must return a label.',
        type: 'string',
        required: false,
        controlType: 'choices',
        group: 'Points',
        controlOptions: {
            choices: ['y', 'x', `d => \`\${d.x}: \${d.y}\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'pointLabelYOffset',
        help: 'Label Y offset from point shape.',
        type: 'number',
        required: false,
        defaultValue: dotDefaults.labelYOffset,
        controlType: 'range',
        group: 'Points',
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
        scopes: ['Line', 'LineCanvas'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'useMesh',
        scopes: ['Line', 'LineCanvas'],
        help: 'Use a voronoi mesh to detect mouse interactions.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.useMesh,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'debugMesh',
        scopes: ['Line', 'LineCanvas'],
        help: 'Display mesh used to detect mouse interactions (voronoi cells).',
        type: 'boolean',
        required: false,
        defaultValue: defaults.debugMesh,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'onMouseEnter',
        scopes: ['Line', 'LineCanvas'],
        group: 'Interactivity',
        help: `onMouseEnter handler, doesn't work with stack tooltip.`,
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'onMouseMove',
        scopes: ['Line', 'LineCanvas'],
        group: 'Interactivity',
        help: `onMouseMove handler, doesn't work with stack tooltip.`,
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'onMouseLeave',
        scopes: ['Line', 'LineCanvas'],
        group: 'Interactivity',
        help: `onMouseLeave handler, doesn't work with stack tooltip.`,
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'onClick',
        scopes: ['Line', 'LineCanvas'],
        group: 'Interactivity',
        help: `onClick handler, doesn't work with stack tooltip.`,
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'tooltip',
        scopes: ['Line', 'LineCanvas'],
        group: 'Interactivity',
        help: `Custom point tooltip`,
        type: 'Function',
        required: false,
    },
    {
        key: 'enableStackTooltip',
        scopes: ['Line', 'LineCanvas'],
        help: `Enable/disable stack tooltip, it also disable mesh.`,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableStackTooltip,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'stackTooltip',
        scopes: ['Line', 'LineCanvas'],
        group: 'Interactivity',
        help: `Custom stack tooltip`,
        type: 'Function',
        required: false,
    },
    {
        key: 'legends',
        scopes: ['Line', 'LineCanvas'],
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
    LineCanvas: getPropertiesGroupsControls(props, 'LineCanvas'),
    api: getPropertiesGroupsControls(props, 'api'),
}
