import { defaultProps, IciclesDirection } from '@nivo/icicles'
import {
    groupProperties,
    defsProperties,
    motionProperties,
    themeProperty,
} from '../../../lib/componentProperties'
import { chartDimensions, ordinalColors, isInteractive } from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'api']

const directions: IciclesDirection[] = ['top', 'right', 'bottom', 'left'];

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
        help: 'Chart data, which should be immutable.',
        description: `
            Chart data, which must conform to this structure
            if using the default \`id\` and \`value\` accessors:

            \`\`\`
            {
                // must be unique for the whole dataset
                id: string | number
                value: number
                children: {
                    id: string | number
                    value: number
                    children: ...
                }[]
            }
            \`\`\`

            If using a different data structure, you must make sure
            to adjust both \`id\` and \`value\`. Meaning you can provide
            a completely different data structure as long as \`id\` and \`value\`
            return the appropriate values.

            Immutability of the data is important as re-computations
            depends on it.
        `,
        type: 'object',
        required: true,
    },
    {
        key: 'id',
        group: 'Base',
        flavors: allFlavors,
        help: 'Id accessor.',
        description: `
            define id accessor, if string given,
            will use \`node[value]\`,
            if function given, it will be invoked
            for each node and will receive the node as
            first argument, it must return the node
            id (string | number).
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaultProps.id,
    },
    {
        key: 'value',
        group: 'Base',
        flavors: allFlavors,
        help: 'Value accessor',
        description: `
            define value accessor, if string given,
            will use \`node[value]\`,
            if function given, it will be invoked
            for each node and will receive the node as
            first argument, it must return the node
            value (number).
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaultProps.value,
    },
    {
        key: 'direction',
        group: 'Base',
        flavors: allFlavors,
        help: 'Optional chart direction.',
        description: `
            Change the reading direction of the chart.
        `,
        required: false,
        type: directions.map(d => `'${d}'`).join(' | '),
        control: {
            type: 'radio',
            choices: directions.map(d => ({
                label: d,
                value: d
            }))
        },
    },
    {
        key: 'valueFormat',
        group: 'Base',
        flavors: allFlavors,
        help: 'Optional formatter for values.',
        description: `
            The formatted value can then be used for labels & tooltips.

            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        required: false,
        type: 'string | (value: number) => string | number',
        control: { type: 'valueFormat' },
    },
    ...chartDimensions(allFlavors),
    themeProperty(['svg', 'api']),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: defaultProps.colors,
    }),
    {
        key: 'colorBy',
        help: `Define the property to use to assign a color to arcs.`,
        flavors: allFlavors,
        description: `
            When using \`id\`, each node will get a new color,
            and when using \`depth\` the nodes' color will depend on their depth.
        `,
        type: `'id' | 'depth'`,
        required: false,
        defaultValue: defaultProps.colorBy,
        group: 'Style',
        control: {
            type: 'radio',
            choices: [
                { label: 'id', value: 'id' },
                { label: 'depth', value: 'depth' },
            ],
        },
    },
    {
        key: 'inheritColorFromParent',
        help: 'Inherit color from parent node starting from 2nd level.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.inheritColorFromParent,
        control: { type: 'switch' },
        group: 'Style',
    },
    {
        key: 'childColor',
        help: 'Defines how to compute child nodes color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.childColor,
        control: { type: 'inheritedColor' },
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Node border width.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.borderWidth,
        control: { type: 'lineWidth' },
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Defines how to compute arcs color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.borderColor,
        control: { type: 'inheritedColor' },
        group: 'Style',
    },
    ...defsProperties('Style', ['svg', 'api']),
    {
        key: 'showcase pattern usage',
        flavors: ['svg'],
        help: 'Patterns.',
        description: `
            You can use \`defs\` and \`fill\` properties
            to use patterns, see
            [dedicated guide](self:/guides/patterns)
            for further information.
        `,
        required: false,
        type: 'boolean',
        control: { type: 'switch' },
        group: 'Style',
    },
    {
        key: 'enableRectLabels',
        help: 'Enable/disable rect labels.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.enableRectLabels,
        control: { type: 'switch' },
        group: 'Rect labels',
    },
    {
        key: 'rectLabel',
        help: 'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data.',
        flavors: allFlavors,
        type: 'string | Function',
        required: false,
        defaultValue: defaultProps.rectLabel,
        group: 'Rect labels',
        control: {
            type: 'choices',
            choices: ['id', 'value', 'formattedValue', `d => \`\${d.id} (\${d.value})\``].map(
                choice => ({
                    label: choice,
                    value: choice,
                })
            ),
        },
    },
    {
        key: 'rectLabelsTextColor',
        help: 'Defines how to compute rect label text color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.rectLabelsTextColor,
        control: { type: 'inheritedColor' },
        group: 'Rect labels',
    },
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        flavors: ['svg'],
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer must be a function.

            The layer component which will receive the chart's
            context & computed data and must return a valid SVG element
            for the \`Icicles\` component.

            The context passed to layers has the following structure:

            \`\`\`
            {
                nodes:  ComputedDatum<RawDatum>[]
            }
            \`\`\`
        `,
        required: false,
        type: 'Array<string | Function>',
        defaultValue: defaultProps.layers,
    },
    isInteractive({
        flavors: ['svg'],
        defaultValue: defaultProps.isInteractive,
    }),
    ...motionProperties(['svg'], defaultProps, 'react-spring'),
    {
        key: 'tooltip',
        flavors: ['svg'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Tooltip custom component',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML element and will receive
            the following data:
            \`\`\`
            {
                id:         string | number,
                value:      number,
                depth:      number,
                color:      string,
                name:       string
                loc:        number
                percentage: number
                // the parent datum
                ancestor:   object
            }
            \`\`\`
            You can also customize the style of the tooltip
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'custom tooltip example',
        flavors: ['svg'],
        group: 'Interactivity',
        required: false,
        help: 'Showcase custom tooltip component.',
        type: 'boolean',
        control: { type: 'switch' },
    },
    {
        key: 'onClick',
        flavors: ['svg'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'onClick handler',
        description: `
            onClick handler, will receive node data as first argument
            & event as second one. The node data has the following shape:

            \`\`\`
            {
                id:         string | number,
                value:      number,
                depth:      number,
                color:      string,
                name:       string
                loc:        number
                percentage: number
                // the parent datum
                ancestor:   object
            }
            \`\`\`
        `,
    },
]

export const groups = groupProperties(props)
