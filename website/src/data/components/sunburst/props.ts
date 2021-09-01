import { defaultProps } from '@nivo/sunburst'
import { arcTransitionModes } from '@nivo/arcs'
import {
    groupProperties,
    defsProperties,
    motionProperties,
    themeProperty,
} from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
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
        key: 'valueFormat',
        group: 'Base',
        help: 'Optional formatter for values.',
        description: `
            The formatted value can then be used for labels & tooltips.

            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        required: false,
        type: 'string | (value: number) => string | number',
        controlType: 'valueFormat',
    },
    {
        key: 'cornerRadius',
        help: 'Round node shape.',
        type: 'number',
        required: false,
        defaultValue: defaultProps.cornerRadius,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        description: `
            not required if using
            \`<ResponsiveSunburst/>\`.
        `,
        help: 'Chart width.',
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
        description: `
            not required if using
            \`<ResponsiveSunburst/>\`.
        `,
        help: 'Chart height.',
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
    themeProperty(['svg', 'api']),
    {
        key: 'colors',
        help: 'Defines how to compute node color.',
        required: false,
        defaultValue: defaultProps.colors,
        controlType: 'ordinalColors',
        type: 'string | Function | string[]',
        group: 'Style',
    },
    {
        key: 'colorBy',
        help: `Define the property to use to assign a color to arcs.`,
        description: `
            When using \`id\`, each node will get a new color,
            and when using \`depth\` the nodes' color will depend on their depth.
        `,
        type: `'id' | 'depth'`,
        required: false,
        defaultValue: defaultProps.colorBy,
        controlType: 'radio',
        group: 'Style',
        controlOptions: {
            choices: [
                { label: 'id', value: 'id' },
                { label: 'depth', value: 'depth' },
            ],
        },
    },
    {
        key: 'inheritColorFromParent',
        help: 'Inherit color from parent node starting from 2nd level.',
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.inheritColorFromParent,
        controlType: 'switch',
        group: 'Style',
    },
    {
        key: 'childColor',
        help: 'Defines how to compute child nodes color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.childColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Node border width.',
        type: 'number',
        required: false,
        defaultValue: defaultProps.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Defines how to compute arcs color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.borderColor,
        controlType: 'inheritedColor',
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
        type: 'boolean',
        controlType: 'switch',
        group: 'Style',
    },
    {
        key: 'enableArcLabels',
        help: 'Enable/disable arc labels.',
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.enableArcLabels,
        controlType: 'switch',
        group: 'Arc labels',
    },
    {
        key: 'arcLabel',
        help:
            'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data.',
        type: 'string | Function',
        required: false,
        defaultValue: defaultProps.arcLabel,
        controlType: 'choices',
        group: 'Arc labels',
        controlOptions: {
            choices: ['id', 'value', 'formattedValue', `d => \`\${d.id} (\${d.value})\``].map(
                choice => ({
                    label: choice,
                    value: choice,
                })
            ),
        },
    },
    {
        key: 'arcLabelsRadiusOffset',
        help: `
            Define the radius to use to determine the label position, starting from inner radius,
            this is expressed as a ratio.
        `,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLabelsRadiusOffset,
        controlType: 'range',
        group: 'Arc labels',
        controlOptions: {
            min: 0,
            max: 2,
            step: 0.05,
        },
    },
    {
        key: 'arcLabelsSkipAngle',
        help: `Skip label if corresponding arc's angle is lower than provided value.`,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLabelsSkipAngle,
        controlType: 'range',
        group: 'Arc labels',
        controlOptions: {
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'arcLabelsTextColor',
        help: 'Defines how to compute arc label text color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.arcLabelsTextColor,
        controlType: 'inheritedColor',
        group: 'Arc labels',
    },
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer must be a function.

            The layer component which will receive the chart's
            context & computed data and must return a valid SVG element
            for the \`Sunburst\` component.

            The context passed to layers has the following structure:

            \`\`\`
            {
                nodes:  ComputedDatum<RawDatum>[],
                arcGenerator: Function
                centerX:      number
                centerY:      number
                radius:       number
            }
            \`\`\`
        `,
        required: false,
        type: 'Array<string | Function>',
        defaultValue: defaultProps.layers,
    },
    {
        key: 'isInteractive',
        flavors: ['svg'],
        help: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        defaultValue: defaultProps.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    ...motionProperties(['svg'], defaultProps, 'react-spring'),
    {
        key: 'transitionMode',
        flavors: ['svg'],
        help: 'Define how transitions behave.',
        type: 'string',
        required: false,
        defaultValue: defaultProps.transitionMode,
        controlType: 'choices',
        group: 'Motion',
        controlOptions: {
            choices: arcTransitionModes.map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
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
        help: 'Showcase custom tooltip component.',
        type: 'boolean',
        controlType: 'switch',
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
