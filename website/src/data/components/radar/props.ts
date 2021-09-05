// @ts-ignore
import { closedCurvePropKeys } from '@nivo/core'
import { svgDefaultProps as defaults, RadarDots } from '@nivo/radar'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

const dotsDefaults = RadarDots.defaultProps

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        type: 'Array<object | Array>',
        required: true,
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
        flavors: ['svg', 'api'],
    },
    {
        key: 'indexBy',
        group: 'Base',
        type: 'string | number',
        required: false,
        help: 'Key to use to index the data.',
        description: `
            Key to use to index the data, this key
            must exist in each data item.
        `,
        flavors: ['svg', 'api'],
        defaultValue: defaults.indexBy,
    },
    {
        key: 'keys',
        group: 'Base',
        help: 'Keys to use to determine each serie.',
        description: `
            Keys to use to determine each serie.
            Those keys should exist in each data item.
        `,
        type: 'string[] | number[]',
        required: false,
        flavors: ['svg', 'api'],
        defaultValue: defaults.keys,
    },
    {
        key: 'maxValue',
        group: 'Base',
        type: `number | 'auto'`,
        required: false,
        help: 'Maximum value.',
        description: `
            Maximum value, if 'auto',
            will use max value from
            the provided data.
        `,
        flavors: ['svg', 'api'],
        defaultValue: defaults.maxValue,
        controlType: 'switchableRange',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 200,
            min: 0,
            max: 1000,
        },
    },
    {
        key: 'curve',
        group: 'Base',
        type: 'string',
        required: false,
        help: 'Curve interpolation.',
        description: `
            Defines the curve factory to use
            for the line generator.
        `,
        defaultValue: defaults.curve,
        flavors: ['svg', 'api'],
        controlType: 'choices',
        controlOptions: {
            choices: closedCurvePropKeys.map((key: string) => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'width',
        group: 'Base',
        type: 'number',
        required: true,
        help: 'Chart width.',
        description: `
            not required if using
            \`<ResponsiveRadar/>\`.
        `,
        flavors: ['svg', 'api'],
        enableControlForFlavors: ['api'],
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
        type: 'number',
        required: true,
        help: 'Chart height.',
        description: `
            not required if using
            \`<ResponsiveRadar/>\`.
        `,
        flavors: ['svg', 'api'],
        enableControlForFlavors: ['api'],
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
        required: false,
        flavors: ['svg', 'api'],
        controlType: 'margin',
    },
    themeProperty(['svg', 'api']),
    {
        key: 'colors',
        group: 'Style',
        type: 'string | Function | string[]',
        required: false,
        help: 'Defines how to compute colors.',
        defaultValue: defaults.colors,
        flavors: ['svg', 'api'],
        controlType: 'ordinalColors',
    },
    {
        key: 'fillOpacity',
        group: 'Style',
        type: 'number',
        required: false,
        help: 'Shape fill opacity.',
        flavors: ['svg', 'api'],
        defaultValue: defaults.fillOpacity,
        controlType: 'opacity',
    },
    {
        key: 'blendMode',
        group: 'Style',
        type: 'string',
        required: false,
        help:
            'Defines CSS [mix-blend-mode](https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode) for shapes.',
        flavors: ['svg'],
        defaultValue: defaults.blendMode,
        controlType: 'blendMode',
    },
    {
        key: 'borderWidth',
        group: 'Style',
        type: 'number',
        required: false,
        help: 'Shape border width.',
        flavors: ['svg', 'api'],
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'borderColor',
        group: 'Style',
        type: 'string | object | Function',
        required: false,
        help: 'Method to compute border color.',
        flavors: ['svg', 'api'],
        defaultValue: defaults.borderColor,
        controlType: 'inheritedColor',
    },
    {
        key: 'gridLevels',
        group: 'Grid',
        type: 'number',
        required: false,
        help: 'Number of levels to display for grid',
        flavors: ['svg', 'api'],
        defaultValue: defaults.gridLevels,
        controlType: 'range',
        controlOptions: {
            min: 1,
            max: 12,
        },
    },
    {
        key: 'gridShape',
        group: 'Grid',
        type: 'string',
        required: false,
        help: 'Determine shape of the grid.',
        flavors: ['svg', 'api'],
        defaultValue: defaults.gridShape,
        controlType: 'choices',
        controlOptions: {
            choices: [
                { label: 'circular', value: 'circular' },
                { label: 'linear', value: 'linear' },
            ],
        },
    },
    {
        key: 'gridLabel',
        group: 'Grid',
        type: 'Function',
        required: false,
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
        flavors: ['svg'],
    },
    {
        key: 'gridLabelOffset',
        group: 'Grid',
        type: 'number',
        required: false,
        help: 'Label offset from outer radius.',
        flavors: ['svg', 'api'],
        defaultValue: defaults.gridLabelOffset,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'enableDots',
        group: 'Dots',
        type: 'boolean',
        required: false,
        help: 'Enable/disable dots.',
        flavors: ['svg', 'api'],
        defaultValue: defaults.enableDots,
        controlType: 'switch',
    },
    {
        key: 'dotSymbol',
        group: 'Dots',
        type: 'Function',
        required: false,
        help: 'Overrides default dot circle.',
        description: `
            Overrides default dot circle.
            The function will receive \`size\`,
            \`color\`, \`borderWidth\` and \`borderColor\`
            props and must return a valid SVG element.
        `,
        flavors: ['svg'],
    },
    {
        key: 'dotSize',
        group: 'Dots',
        type: 'number',
        required: false,
        help: 'Size of the dots.',
        flavors: ['svg', 'api'],
        // defaultValue: dotsDefaults.size,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 64,
        },
    },
    {
        key: 'dotColor',
        type: 'string | object | Function',
        required: false,
        help: 'Method to compute dots color.',
        flavors: ['svg', 'api'],
        // defaultValue: dotsDefaults.color,
        controlType: 'inheritedColor',
        group: 'Dots',
    },
    {
        key: 'dotBorderWidth',
        group: 'Dots',
        type: 'number',
        required: false,
        help: 'Width of the dots border.',
        flavors: ['svg', 'api'],
        // defaultValue: dotsDefaults.borderWidth,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 10,
        },
    },
    {
        key: 'dotBorderColor',
        group: 'Dots',
        type: 'string | object | Function',
        required: false,
        help: 'Method to compute dots border color.',
        flavors: ['svg', 'api'],
        // defaultValue: dotsDefaults.borderColor,
        controlType: 'inheritedColor',
    },
    {
        key: 'enableDotLabel',
        group: 'Dots',
        help: 'Enable/disable dots label.',
        type: 'boolean',
        required: false,
        flavors: ['svg', 'api'],
        // defaultValue: dotsDefaults.enableLabel,
        controlType: 'switch',
    },
    {
        key: 'dotLabel',
        group: 'Dots',
        type: 'string',
        required: false,
        help: 'Dot label.',
        description:
            'Property to use to determine dot label. If a function is provided, it will receive current value and serie and must return a label.',
        flavors: ['svg'],
        // defaultValue: dotsDefaults.label,
        controlType: 'choices',
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
        group: 'Dots',
        type: 'number',
        required: false,
        help: 'Label Y offset from dot shape.',
        flavors: ['svg', 'api'],
        // defaultValue: dotDefaults.labelYOffset,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: -24,
            max: 24,
        },
    },
    {
        key: 'isInteractive',
        group: 'Interactivity',
        type: 'boolean',
        required: false,
        help: 'Enable/disable interactivity.',
        flavors: ['svg'],
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
    },
    ...motionProperties(['svg'], defaults, 'react-spring'),
]

export const groups = groupProperties(props)
