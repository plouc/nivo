import { closedCurvePropKeys } from '@nivo/core'
import { svgDefaultProps } from '@nivo/radar'
import {
    themeProperty,
    motionProperties,
    groupProperties,
    defsProperties,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    ordinalColors,
    blendMode,
    isInteractive,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'api']

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
        flavors: allFlavors,
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
        flavors: allFlavors,
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
        flavors: allFlavors,
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
        flavors: allFlavors,
        defaultValue: svgDefaultProps.maxValue,
        control: {
            type: 'switchableRange',
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
        flavors: allFlavors,
        control: { type: 'valueFormat' },
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
        flavors: allFlavors,
        control: {
            type: 'choices',
            choices: closedCurvePropKeys.map((key: string) => ({
                label: key,
                value: key,
            })),
        },
    },
    ...chartDimensions(allFlavors),
    chartRef(['svg']),
    themeProperty(['svg', 'api']),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: svgDefaultProps.colors,
    }),
    {
        key: 'fillOpacity',
        group: 'Style',
        type: 'number',
        required: false,
        help: 'Shape fill opacity.',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.fillOpacity,
        control: { type: 'opacity' },
    },
    blendMode({
        target: 'layers',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.blendMode,
    }),
    {
        key: 'borderWidth',
        group: 'Style',
        type: 'number',
        required: false,
        help: 'Shape border width.',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.borderWidth,
        control: { type: 'lineWidth' },
    },
    {
        key: 'borderColor',
        group: 'Style',
        type: 'string | object | Function',
        required: false,
        help: 'Method to compute border color.',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.borderColor,
        control: { type: 'inheritedColor' },
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'gridLevels',
        group: 'Grid',
        type: 'number',
        required: false,
        help: 'Number of levels to display for grid',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.gridLevels,
        control: {
            type: 'range',
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
        flavors: allFlavors,
        defaultValue: svgDefaultProps.gridShape,
        control: {
            type: 'choices',
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
        flavors: allFlavors,
        defaultValue: svgDefaultProps.gridLabelOffset,
        control: {
            type: 'range',
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
        flavors: allFlavors,
        defaultValue: svgDefaultProps.enableDots,
        control: { type: 'switch' },
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
        flavors: allFlavors,
        defaultValue: svgDefaultProps.dotSize,
        control: {
            type: 'range',
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
        flavors: allFlavors,
        defaultValue: svgDefaultProps.dotColor,
        control: { type: 'inheritedColor' },
        group: 'Dots',
    },
    {
        key: 'dotBorderWidth',
        group: 'Dots',
        type: 'number',
        required: false,
        help: 'Width of the dots border.',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.dotBorderWidth,
        control: {
            type: 'range',
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
        flavors: allFlavors,
        defaultValue: svgDefaultProps.dotBorderColor,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'enableDotLabel',
        group: 'Dots',
        help: 'Enable/disable dots label.',
        type: 'boolean',
        required: false,
        flavors: allFlavors,
        defaultValue: svgDefaultProps.enableDotLabel,
        control: { type: 'switch' },
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
        control: {
            type: 'choices',
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
        flavors: allFlavors,
        defaultValue: svgDefaultProps.dotLabelYOffset,
        control: {
            type: 'range',
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
    isInteractive({
        flavors: ['svg'],
        defaultValue: svgDefaultProps.isInteractive,
    }),
    {
        key: 'sliceTooltip',
        group: 'Interactivity',
        type: 'FunctionComponent<RadarSliceTooltipProps>',
        required: false,
        help: 'Override default slice tooltip.',
        flavors: ['svg'],
    },
    {
        key: 'onClick',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: 'onClick handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    ...motionProperties(['svg'], svgDefaultProps),
]

export const groups = groupProperties(props)
