/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { closedCurvePropKeys, DotsItemDefaultProps as dotDefaults } from '@nivo/core'
import { RadarDefaultProps as defaults, RadarDots } from '@nivo/radar'
import { motionProperties, getPropertiesGroupsControls } from '../../../lib/componentProperties'

const dotsDefaults = RadarDots.defaultProps

const props = [
    {
        key: 'data',
        scopes: '*',
        group: 'Base',
        help: 'Chart data.',
        description: `
            Chart data. If using objects indexBy & keys
            should be strings, if using array they
            should be numbers.
            
            For example, given this config:
            \`\`\`
            [
                { language: 'javascript', john: 12, sarah: 32, bob: 27 },
                { language: 'golang', john: 25, sarah: 15, bob: 3 },
                { language: 'python', john: 5, sarah: 22, bob: 31 },
                { language: 'java', john: 19, sarah: 17, bob: 9 }
            ]
            keys: ['john', 'sarah', 'bob']
            indexBy: 'language'
            \`\`\`
            We'll have a radar chart representing programing
            skills for each user by language
            (3 layers and 4 dimensions).
        `,
        type: 'Array<object | Array>',
        required: true,
    },
    {
        key: 'indexBy',
        scopes: '*',
        group: 'Base',
        help: 'Key to use to index the data.',
        description: `
            Key to use to index the data, this key
            must exist in each data item.
        `,
        type: 'string | number',
        required: false,
        defaultValue: defaults.indexBy,
    },
    {
        key: 'keys',
        scopes: '*',
        group: 'Base',
        help: 'Keys to use to determine each serie.',
        description: `
            Keys to use to determine each serie.
            Those keys should exist in each data item.
        `,
        type: 'Array<string | number>',
        required: false,
        defaultValue: defaults.keys,
    },
    {
        key: 'maxValue',
        scopes: '*',
        help: 'Maximum value.',
        description: `
            Maximum value, if 'auto',
            will use max value from
            the provided data.
        `,
        required: false,
        defaultValue: defaults.maxValue,
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
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
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
        scopes: ['api'],
        docScopes: '*',
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
        key: 'curve',
        scopes: '*',
        help: 'Curve interpolation.',
        description: `
            Defines the curve factory to use
            for the line generator.
        `,
        type: 'string',
        required: false,
        defaultValue: defaults.curve,
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
        key: 'colors',
        help: 'Defines how to compute slice color.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: 'nivo',
        controlType: 'colors',
        group: 'Base',
    },
    {
        key: 'colorBy',
        help: 'Node color.',
        description: `
            Property to use to determine node color.
            If a function is provided, it will receive
            current node data and must return a color.
            
            By default it will use the key of each serie
            and pick a color from colors according
            to this key.
        `,
        type: 'string | Function',
        required: false,
        defaultValue: 'key',
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: [
                {
                    label: 'key',
                    value: 'key',
                },
            ],
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
        key: 'fillOpacity',
        help: 'Shape fill opacity.',
        type: 'number',
        required: false,
        defaultValue: defaults.fillOpacity,
        controlType: 'opacity',
        group: 'Base',
    },
    {
        key: 'borderWidth',
        help: 'Shape border width.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Base',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.borderColor,
        controlType: 'color',
        group: 'Base',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'gridLevels',
        help: 'Number of levels to display for grid',
        type: 'number',
        required: false,
        defaultValue: defaults.gridLevels,
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
        defaultValue: defaults.gridShape,
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
        key: 'gridLabel',
        type: 'Function',
        group: 'Grid',
        help: 'Grid label.',
        description: `
            An optional function to override label rendering.
            It must return a **valid SVG element** and will
            receive the following props:
            \`\`\`
            {
                id:     string
                # this can be used to determine the label layout,
                # if the element should be centered, left/right aligned
                anchor: 'start' | 'middle' | 'end'
                # angle in degrees
                angle:  number
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
        defaultValue: defaults.gridLabelOffset,
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
        defaultValue: dotsDefaults.size,
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
        scopes: '*',
        help: 'Method to compute dots color.',
        type: 'string | Function',
        required: false,
        defaultValue: dotsDefaults.color,
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
        defaultValue: dotsDefaults.borderWidth,
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
        scopes: '*',
        help: 'Method to compute dots border color.',
        type: 'string | Function',
        required: false,
        defaultValue: dotsDefaults.borderColor,
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
        defaultValue: dotsDefaults.enableLabel,
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
        defaultValue: dotsDefaults.label,
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
        key: 'isInteractive',
        scopes: ['Radar'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    ...motionProperties(['Radar'], defaults),
]

export const groupsByScope = {
    Radar: getPropertiesGroupsControls(props, 'Radar'),
    api: getPropertiesGroupsControls(props, 'api'),
}
