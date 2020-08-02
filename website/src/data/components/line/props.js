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
    themeProperty,
    axesProperties,
    motionProperties,
    getLegendsProps,
    groupProperties,
    defsProperties,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
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
        key: 'xScale',
        type: 'object',
        group: 'Base',
        help: `X scale configuration.`,
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
        key: 'xFormat',
        group: 'Base',
        help: 'Optional formatter for x values.',
        description: `
            The formatted value can then be used for labels & tooltips.

            If you use a time scale, you must provide a time format
            as values are converted to Date objects.
            
            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        required: false,
        type: 'Function | string',
        controlType: 'valueFormat',
    },
    {
        key: 'yScale',
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
        key: 'yFormat',
        group: 'Base',
        help: 'Optional formatter for y values.',
        description: `
            The formatted value can then be used for labels & tooltips.

            If you use a time scale, you must provide a time format
            as values are converted to Date objects.
            
            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        required: false,
        type: 'Function | string',
        controlType: 'valueFormat',
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width, not required when using responsive variant.',
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
        help: 'Chart height, not required when using responsive variant.',
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
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
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
        group: 'Style',
        controlOptions: {
            choices: lineCurvePropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
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
        key: 'lineWidth',
        help: 'Line width.',
        type: 'number',
        required: false,
        defaultValue: defaults.lineWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'enableArea',
        help: 'Enable/disable area below each line.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableArea,
        controlType: 'switch',
        group: 'Style',
    },
    {
        key: 'areaBaselineValue',
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
        help: 'Area opacity (0~1), depends on enableArea.',
        required: false,
        defaultValue: defaults.areaOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Style',
    },
    {
        key: 'areaBlendMode',
        flavors: ['svg'],
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
    ...defsProperties('Style', ['svg']),
    {
        key: 'layers',
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
        help: 'Enable/disable points.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enablePoints,
        controlType: 'switch',
        group: 'Points',
    },
    {
        key: 'pointSymbol',
        flavors: ['svg'],
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
        help: 'Method to compute points color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.pointColor,
        controlType: 'inheritedColor',
        group: 'Points',
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
        help: 'Method to compute points border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.pointBorderColor,
        controlType: 'inheritedColor',
        group: 'Points',
    },
    {
        key: 'enablePointLabel',
        flavors: ['svg', 'api'],
        group: 'Points',
        help: 'Enable/disable points label.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enablePointLabel,
        controlType: 'switch',
    },
    {
        key: 'pointLabel',
        flavors: ['svg', 'api'],
        group: 'Points',
        help:
            'Property to use to determine point label. If a function is provided, it will receive current point data and should return the desired label.',
        type: 'string',
        required: false,
        controlType: 'choices',
        controlOptions: {
            choices: ['y', 'yFormatted', 'x', 'xFormatted', `d => \`\${d.x}: \${d.y}\``].map(
                choice => ({
                    label: choice,
                    value: choice,
                })
            ),
        },
    },
    {
        key: 'pointLabelYOffset',
        flavors: ['svg', 'api'],
        group: 'Points',
        help: 'Label Y offset from point shape.',
        type: 'number',
        required: false,
        defaultValue: dotDefaults.labelYOffset,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: -24,
            max: 24,
        },
    },
    {
        key: 'enableGridX',
        help: 'Enable/disable x grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridX,
        controlType: 'switch',
        group: 'Grid & Axes',
    },
    {
        key: 'gridXValues',
        group: 'Grid & Axes',
        help: 'Specify values to use for vertical grid lines.',
        type: 'Array<number | string | Date>',
        required: false,
    },
    {
        key: 'enableGridY',
        help: 'Enable/disable y grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridY,
        controlType: 'switch',
        group: 'Grid & Axes',
    },
    {
        key: 'gridYValues',
        group: 'Grid & Axes',
        help: 'Specify values to use for horizontal grid lines.',
        type: 'Array<number | string | Date>',
        required: false,
    },
    ...axesProperties(),
    {
        key: 'isInteractive',
        flavors: ['svg', 'canvas'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'useMesh',
        flavors: ['svg'],
        help: 'Use a voronoi mesh to detect mouse interactions, enableSlices must be disabled',
        type: 'boolean',
        required: false,
        defaultValue: defaults.useMesh,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'debugMesh',
        flavors: ['svg', 'canvas'],
        help: 'Display mesh used to detect mouse interactions (voronoi cells).',
        type: 'boolean',
        required: false,
        defaultValue: defaults.debugMesh,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'onMouseEnter',
        flavors: ['svg'],
        group: 'Interactivity',
        help: `onMouseEnter handler, doesn't work with slice tooltip.`,
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'onMouseMove',
        flavors: ['svg'],
        group: 'Interactivity',
        help: `onMouseMove handler, doesn't work with slice tooltip.`,
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'onMouseLeave',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: `onMouseLeave handler, doesn't work with slice tooltip.`,
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'onClick',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: `onClick handler, doesn't work with slice tooltip.`,
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'tooltip',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: `Custom point tooltip`,
        type: 'Function',
        required: false,
    },
    {
        key: 'enableSlices',
        group: 'Interactivity',
        flavors: ['svg'],
        help: `Enable/disable slices tooltip for x or y axis, automatically disable mesh.`,
        type: `'x' | 'y' | false`,
        required: false,
        defaultValue: defaults.enableSlicesTooltip,
        controlType: 'choices',
        controlOptions: {
            choices: [
                {
                    label: 'false',
                    value: false,
                },
                {
                    label: 'x',
                    value: 'x',
                },
                {
                    label: 'y',
                    value: 'y',
                },
            ],
        },
    },
    {
        key: 'debugSlices',
        flavors: ['svg'],
        help: 'Display area used to detect mouse interactions for slices.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.debugSlices,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'sliceTooltip',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: `Custom slice tooltip`,
        type: 'Function',
        required: false,
    },
    {
        key: 'enableCrosshair',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'Enable/disable crosshair.',
        type: 'boolean',
        required: false,
        controlType: 'switch',
        defaultValue: defaults.enableCrosshair,
    },
    {
        key: 'crosshairType',
        flavors: ['svg'],
        group: 'Interactivity',
        required: false,
        defaultValue: defaults.crosshairType,
        help: `Crosshair type, forced to slices axis if enabled.`,
        type: 'string',
        controlType: 'choices',
        controlOptions: {
            disabled: true,
            choices: [
                'x',
                'y',
                'top-left',
                'top',
                'top-right',
                'right',
                'bottom-right',
                'bottom',
                'bottom-left',
                'left',
                'cross',
            ].map(v => ({
                label: v,
                value: v,
            })),
        },
    },
    {
        key: 'legends',
        flavors: ['svg', 'canvas'],
        type: 'object[]',
        help: `Optional chart's legends.`,
        group: 'Legends',
        controlType: 'array',
        controlOptions: {
            props: getLegendsProps(['svg', 'canvas']),
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
    ...motionProperties(['svg'], defaults, 'react-spring'),
]

export const groups = groupProperties(props)
