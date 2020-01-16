/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { closedCurvePropKeys } from '@nivo/core'
import { radarDefaults } from '@nivo/radar'
import { motionProperties, groupProperties } from '../../../lib/componentProperties'
import { LineDefaultProps as defaults } from '@nivo/line'

const props = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            Array<{
                id:   string
                data: Array<{
                    x: number | string
                    y: number
                }>
            }>
            \`\`\`
            This component assumes that every serie contains all
            x values sorted the same way they should appear on the chart.
            Also note that the x/y structure is used here for data
            interoperability with other chart components.
        `,
        type: 'object[]',
        required: true,
    },
    {
        key: 'maxValue',
        help: 'Maximum value.',
        description: `
            Maximum value, if 'auto',
            will use max value from
            the provided data.
        `,
        required: false,
        defaultValue: radarDefaults.maxValue,
        type: 'number | string',
        controlType: 'switchableRange',
        group: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 200,
            min: 0,
            max: 1000,
        },
    },
    {
        key: 'shapeInterpolation',
        help: 'Shape interpolation.',
        description: `
            Defines the curve factory to use
            for the shape generator.
        `,
        type: 'string',
        required: false,
        defaultValue: radarDefaults.shapeInterpolation,
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: closedCurvePropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using
            \`<ResponsiveRadar/>\`.
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
            \`<ResponsiveRadar/>\`.
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
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'colors',
        help: 'Defines how to compute slice color.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: radarDefaults.colors,
        controlType: 'ordinalColors',
        group: 'Style',
    },
    {
        key: 'fillOpacity',
        help: 'Shape fill opacity.',
        type: 'number',
        required: false,
        defaultValue: radarDefaults.fillOpacity,
        controlType: 'opacity',
        group: 'Style',
    },
    {
        key: 'blendMode',
        flavors: ['svg'],
        help: 'Defines CSS mix-blend-mode property.',
        description: `
            Defines CSS \`mix-blend-mode\` property, see
            [MDN documentation](https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode).
        `,
        type: 'string',
        required: false,
        defaultValue: radarDefaults.blendMode,
        controlType: 'blendMode',
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Shape border width.',
        type: 'number',
        required: false,
        defaultValue: radarDefaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: radarDefaults.borderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this property to insert extra layers
            to the chart, this extra layer must be
            a function which will receive the chart
            computed data and must return a valid SVG element.
            Please have a look at the package's TypeScript definitions
            for more information about the available properties.
        `,
        required: false,
        defaultValue: radarDefaults.layers,
    },
    {
        key: 'gridLevels',
        help: 'Number of levels to display for grid',
        type: 'number',
        required: false,
        defaultValue: radarDefaults.gridLevels,
        controlType: 'range',
        group: 'Grid',
        controlOptions: {
            min: 1,
            max: 12,
        },
    },
    {
        key: 'gridShape',
        help: 'Determine shape of the grid.',
        type: 'string',
        required: false,
        defaultValue: radarDefaults.gridShape,
        controlType: 'choices',
        group: 'Grid',
        controlOptions: {
            choices: [
                { label: 'circular', value: 'circular' },
                { label: 'linear', value: 'linear' },
            ],
        },
    },
    {
        key: 'gridLabelComponent',
        type: 'FunctionComponent',
        group: 'Grid',
        help: 'Custom grid label component.',
        description: `
            An optional function to override label rendering.
            It must return a **valid SVG element** and will
            receive the following props:
            \`\`\`
            {
                id:     string
                x:      number
                y:      number
                # angle in degrees
                angle:  number
                # this can be used to determine the label layout,
                # if the element should be centered, left/right aligned
                anchor: 'start' | 'middle' | 'end'
            }
            \`\`\`
            The component will be wrapped inside
            a \`g\` element **already positioned**
            where the default label would have been placed.
        `,
    },
    {
        key: 'gridLabelOffset',
        help: 'Label offset from outer radius.',
        type: 'number',
        required: false,
        defaultValue: radarDefaults.gridLabelOffset,
        controlType: 'range',
        group: 'Grid',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'enableDots',
        help: 'Enable/disable dots.',
        type: 'boolean',
        required: false,
        defaultValue: radarDefaults.enableDots,
        controlType: 'switch',
        group: 'Dots',
    },
    {
        key: 'dotSymbol',
        group: 'Dots',
        help: 'Overrides default dot circle.',
        description: `
            Overrides default dot circle.
            The function will receive \`size\`,
            \`color\`, \`borderWidth\` and \`borderColor\`
            props and must return a valid SVG element.
        `,
        type: 'Function',
        required: false,
    },
    {
        key: 'dotSize',
        help: 'Size of the dots.',
        type: 'number',
        required: false,
        defaultValue: radarDefaults.dotSize,
        controlType: 'range',
        group: 'Dots',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 64,
        },
    },
    {
        key: 'dotColor',
        help: 'Method to compute dots color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: radarDefaults.dotColor,
        controlType: 'inheritedColor',
        group: 'Dots',
    },
    {
        key: 'dotBorderWidth',
        help: 'Width of the dots border.',
        type: 'number',
        required: false,
        defaultValue: radarDefaults.dotBorderWidth,
        controlType: 'range',
        group: 'Dots',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 10,
        },
    },
    {
        key: 'dotBorderColor',
        help: 'Method to compute dots border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: radarDefaults.dotBorderColor,
        controlType: 'inheritedColor',
        group: 'Dots',
    },
    {
        key: 'enableDotLabel',
        help: 'Enable/disable dots label.',
        type: 'boolean',
        required: false,
        defaultValue: radarDefaults.enableDotLabel,
        controlType: 'switch',
        group: 'Dots',
    },
    {
        key: 'dotLabel',
        help: 'Dot label.',
        description:
            'Property to use to determine dot label. If a function is provided, it will receive current value and serie and must return a label.',
        type: 'string',
        required: false,
        defaultValue: radarDefaults.dotLabel,
        controlType: 'choices',
        group: 'Dots',
        controlOptions: {
            choices: [
                'value',
                'index',
                'key',
                `d => \`\${d.key}: \${d.value}\``,
                `d => \`\${d.index}: \${d.value}\``,
            ].map(choice => ({
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
        defaultValue: radarDefaults.dotLabelYOffset,
        controlType: 'range',
        group: 'Dots',
        controlOptions: {
            unit: 'px',
            min: -24,
            max: 24,
        },
    },
    {
        key: 'isInteractive',
        flavors: ['svg'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: radarDefaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    ...motionProperties(['svg'], radarDefaults),
]

export const groups = groupProperties(props)
