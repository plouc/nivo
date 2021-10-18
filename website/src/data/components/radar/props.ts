import { closedCurvePropKeys } from '@nivo/core'
import { svgDefaultProps } from '@nivo/radar'
import {
    themeProperty,
    motionProperties,
    groupProperties,
    defsProperties,
} from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        type: 'Datum[]',
        required: true,
        help: 'Chart data.',
        description: `
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
        type: 'string',
        required: true,
        help: 'Key to use to index the data.',
        description: `
            Key to use to index the data, this key
            must exist in each data item.
        `,
        flavors: ['svg', 'api'],
    },
    {
        key: 'keys',
        group: 'Base',
        type: 'string[]',
        required: true,
        help: 'Keys to use to determine each serie.',
        description: `
            Keys to use to determine each serie.
            Those keys should exist in each data item.
        `,
        flavors: ['svg', 'api'],
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
        defaultValue: svgDefaultProps.maxValue,
        controlType: 'switchableRange',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 200,
            min: 0,
            max: 1000,
        },
    },
    {
        key: 'valueFormat',
        group: 'Base',
        type: 'string | (value: number) => string',
        required: false,
        help: 'Optional formatter for values.',
        description: `
            The formatted value can then be used for labels & tooltips.

            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        flavors: ['svg', 'api'],
        controlType: 'valueFormat',
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
        defaultValue: svgDefaultProps.curve,
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
        defaultValue: svgDefaultProps.colors,
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
        defaultValue: svgDefaultProps.fillOpacity,
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
        defaultValue: svgDefaultProps.blendMode,
        controlType: 'blendMode',
    },
    {
        key: 'borderWidth',
        group: 'Style',
        type: 'number',
        required: false,
        help: 'Shape border width.',
        flavors: ['svg', 'api'],
        defaultValue: svgDefaultProps.borderWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'borderColor',
        group: 'Style',
        type: 'string | object | Function',
        required: false,
        help: 'Method to compute border color.',
        flavors: ['svg', 'api'],
        defaultValue: svgDefaultProps.borderColor,
        controlType: 'inheritedColor',
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'gridLevels',
        group: 'Grid',
        type: 'number',
        required: false,
        help: 'Number of levels to display for grid',
        flavors: ['svg', 'api'],
        defaultValue: svgDefaultProps.gridLevels,
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
        defaultValue: svgDefaultProps.gridShape,
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
        defaultValue: svgDefaultProps.gridLabelOffset,
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
        defaultValue: svgDefaultProps.enableDots,
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
        defaultValue: svgDefaultProps.dotSize,
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
        defaultValue: svgDefaultProps.dotColor,
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
        defaultValue: svgDefaultProps.dotBorderWidth,
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
        defaultValue: svgDefaultProps.dotBorderColor,
        controlType: 'inheritedColor',
    },
    {
        key: 'enableDotLabel',
        group: 'Dots',
        help: 'Enable/disable dots label.',
        type: 'boolean',
        required: false,
        flavors: ['svg', 'api'],
        defaultValue: svgDefaultProps.enableDotLabel,
        controlType: 'switch',
    },
    {
        key: 'dotLabel',
        group: 'Dots',
        type: 'string | ((point: PointData) => string | number)',
        required: false,
        help: 'Dot label.',
        description:
            'Property to use to determine dot label. If a function is provided, it will receive current value and serie and must return a label.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.dotLabel,
        controlType: 'choices',
        controlOptions: {
            choices: [
                'value',
                'formattedValue',
                'index',
                'key',
                `p => \`\${p.key}: \${p.value}\``,
                `p => \`\${p.index}: \${p.value}\``,
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
        defaultValue: svgDefaultProps.dotLabelYOffset,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: -24,
            max: 24,
        },
    },
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer should be a component.
            
            The layer function which will receive the chart's
            context & computed data and must return a valid SVG element.
        `,
        required: false,
        type: '(RadarLayerId | FunctionComponent<RadarCustomLayerProps>)[]',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.layers,
    },
    {
        key: 'isInteractive',
        group: 'Interactivity',
        type: 'boolean',
        required: false,
        help: 'Enable/disable interactivity.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.isInteractive,
        controlType: 'switch',
    },
    {
        key: 'sliceTooltip',
        group: 'Interactivity',
        type: 'FunctionComponent<RadarSliceTooltipProps>',
        required: false,
        help: 'Override default slice tooltip.',
        flavors: ['svg'],
    },
    ...motionProperties(['svg'], svgDefaultProps, 'react-spring'),
]

export const groups = groupProperties(props)
