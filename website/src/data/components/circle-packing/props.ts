import { commonDefaultProps, svgDefaultProps } from '@nivo/circle-packing'
import {
    themeProperty,
    motionProperties,
    defsProperties,
    groupProperties,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    ordinalColors,
    isInteractive,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'html', 'canvas', 'api']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data, which should be immutable.',
        flavors: allFlavors,
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
        defaultValue: commonDefaultProps.id,
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
        defaultValue: commonDefaultProps.value,
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
    {
        key: 'padding',
        help: 'Padding between each circle.',
        flavors: allFlavors,
        description: `
            Padding between adjacent circles.
            Please be aware that when zoomed
            this value will be affected by the zooming factor
            and is expressed in pixels. See the
            [official d3 documentation](https://github.com/d3/d3-hierarchy#pack_padding).
        `,
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.padding,
        group: 'Base',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    {
        key: 'leavesOnly',
        help: 'Only render leaf nodes (skip parent nodes).',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.leavesOnly,
        group: 'Base',
        control: { type: 'switch' },
    },
    ...chartDimensions(allFlavors),
    chartRef(['svg', 'html', 'canvas']),
    themeProperty(['svg', 'html', 'canvas']),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: commonDefaultProps.colors,
    }),
    {
        key: 'colorBy',
        help: `Define the property to use to assign a color to circles.`,
        description: `
            When using \`id\`, each node will get a new color,
            and when using \`depth\` the nodes' color will depend on their depth.
        `,
        type: `'id' | 'depth'`,
        required: false,
        defaultValue: commonDefaultProps.colorBy,
        flavors: allFlavors,
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
        type: 'boolean',
        required: false,
        flavors: allFlavors,
        defaultValue: commonDefaultProps.inheritColorFromParent,
        control: { type: 'switch' },
        group: 'Style',
    },
    {
        key: 'childColor',
        help: 'Defines how to compute child nodes color, only used when inheritColorFromParent is enabled.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: commonDefaultProps.childColor,
        control: { type: 'inheritedColor' },
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Width of circle border.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.borderWidth,
        control: { type: 'lineWidth' },
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        flavors: allFlavors,
        description: `
            how to compute border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: commonDefaultProps.borderColor,
        control: { type: 'inheritedColor' },
        group: 'Style',
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'circleComponent',
        help: 'Custom circle component.',
        type: 'Component',
        flavors: ['svg', 'html'],
        group: 'Style',
        required: false,
    },
    {
        key: 'enableLabels',
        help: 'Enable/disable labels.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.enableLabels,
        control: { type: 'switch' },
        group: 'Labels',
    },
    {
        key: 'label',
        help: 'Label accessor.',
        flavors: allFlavors,
        description: `
            Defines how to get label text,
            can be a string (used to access current node data property)
            or a function which will receive the actual node data.
        `,
        type: 'string | Function',
        required: false,
        defaultValue: commonDefaultProps.label,
        group: 'Labels',
        control: {
            type: 'choices',
            choices: ['id', 'value', 'formattedValue', `d => \`\${d.id}: \${d.value}\``].map(
                choice => ({
                    label: choice,
                    value: choice,
                })
            ),
        },
    },
    {
        key: 'labelsFilter',
        help: 'Filter labels using custom conditions.',
        flavors: allFlavors,
        description: `
            Please note that at this stage, nodes are already excluded
            according to \`labelsSkipRadius\`.
            
            This can be used to only show labels at a certain depth for example:
            
            \`\`\`
            <CirclePacking
                labelsFilter={label => label.node.depth == 2}
                {...props}
            />
            \`\`\`
        `,
        type: '(label) => boolean',
        required: false,
        group: 'Labels',
    },
    {
        key: 'labelsSkipRadius',
        help: 'Skip label rendering if node radius is lower than given value, 0 to disable.',
        type: 'number',
        required: false,
        flavors: allFlavors,
        defaultValue: commonDefaultProps.labelsSkipRadius,
        group: 'Labels',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    {
        key: 'labelTextColor',
        help: 'Method to compute label text color.',
        flavors: allFlavors,
        description: `
            how to compute label text color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: commonDefaultProps.labelTextColor,
        control: { type: 'inheritedColor' },
        group: 'Labels',
    },
    {
        key: 'labelComponent',
        help: 'Custom label component.',
        type: 'Component',
        flavors: ['svg', 'html'],
        group: 'Labels',
        required: false,
    },
    isInteractive({
        flavors: ['svg', 'html', 'canvas'],
        defaultValue: commonDefaultProps.isInteractive,
    }),
    {
        key: 'onMouseEnter',
        flavors: ['svg', 'html'],
        group: 'Interactivity',
        help: 'onMouseEnter handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseMove',
        flavors: ['svg', 'html', 'canvas'],
        group: 'Interactivity',
        help: 'onMouseMove handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseLeave',
        flavors: ['svg', 'html'],
        group: 'Interactivity',
        help: 'onMouseLeave handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onClick',
        flavors: ['svg', 'html', 'canvas'],
        group: 'Interactivity',
        help: 'onClick handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'zoomedId',
        flavors: ['svg', 'html', 'canvas'],
        help: `Zoom on a specific node.`,
        description: `
            If provided, zoom on the node having the provided ID,
            this can be used to build a zoomable circle packing chart
            when used in conjunction with the \`onClick\` property.  
        `,
        type: 'string | null',
        required: false,
        group: 'Interactivity',
    },
    ...motionProperties(['svg', 'html'], svgDefaultProps),
]

export const groups = groupProperties(props)
