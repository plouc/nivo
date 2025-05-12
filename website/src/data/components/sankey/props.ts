import { svgDefaultProps, sankeyAlignmentPropKeys } from '@nivo/sankey'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'
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
        type: '{ nodes: object[], links: object[] }',
        required: true,
        help: 'Chart data defining nodes and links.',
        flavors: allFlavors,
        description: `
            Chart data, which must conform to this structure:

            \`\`\`
            {
                nodes: {
                    id: string
                }[],
                links: {
                    source: string, // ref to node id
                    target: string, // ref to node id
                    value:  number
                }[]
            }
            \`\`\`
        `,
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
        key: 'layout',
        group: 'Base',
        type: 'string',
        required: false,
        help: `Control sankey layout direction.`,
        defaultValue: svgDefaultProps.layout,
        flavors: allFlavors,
        control: {
            type: 'radio',
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'align',
        group: 'Base',
        type: 'string',
        required: false,
        help: 'Node alignment method.',
        description: `
            Defines node alignment method.
            Please have a look at the
            [official d3 documentation](https://github.com/d3/d3-sankey#sankey_nodeAlign)
            for further information.
        `,
        defaultValue: svgDefaultProps.align,
        flavors: allFlavors,
        control: {
            type: 'choices',
            choices: sankeyAlignmentPropKeys.map((key: string) => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'sort',
        group: 'Base',
        type: 'string | Function',
        required: false,
        help: 'Node sorting method.',
        description: `
            Defines node sorting method. Must be one of:

            - **'auto'** order of nodes within each
              column is determined automatically by the layout.
            - **'input'** order is fixed by the input.
            - **'ascending'** node with lower values on top.
            - **'descending'** node with higher values on top.
            - \`(nodeA, nodeB) => number\` user defined function.

            Please have a look at the
            [official d3 documentation](https://github.com/d3/d3-sankey#sankey_nodeSort)
            for further information.
        `,
        defaultValue: svgDefaultProps.sort,
        flavors: allFlavors,
        control: {
            type: 'choices',
            choices: ['auto', 'input', 'ascending', 'descending'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    ...chartDimensions(allFlavors),
    chartRef(['svg']),
    themeProperty(allFlavors),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: svgDefaultProps.colors,
    }),
    {
        key: 'nodeThickness',
        group: 'Nodes',
        type: 'number',
        required: false,
        help: 'Node thickness.',
        defaultValue: svgDefaultProps.nodeThickness,
        flavors: allFlavors,
        control: {
            type: 'range',
            unit: 'px',
            min: 2,
            max: 100,
        },
    },
    {
        key: 'nodeOpacity',
        group: 'Nodes',
        help: 'Node opacity (0~1).',
        required: false,
        defaultValue: svgDefaultProps.nodeOpacity,
        type: 'number',
        flavors: allFlavors,
        control: { type: 'opacity' },
    },
    {
        key: 'nodeHoverOpacity',
        group: 'Nodes',
        flavors: ['svg'],
        help: 'Node opacity on hover (0~1).',
        required: false,
        defaultValue: svgDefaultProps.nodeHoverOpacity,
        type: 'number',
        control: { type: 'opacity' },
    },
    {
        key: 'nodeHoverOthersOpacity',
        flavors: ['svg'],
        help: 'Other nodes opacity on hover (0~1).',
        required: false,
        defaultValue: svgDefaultProps.nodeHoverOthersOpacity,
        type: 'number',
        control: { type: 'opacity' },
        group: 'Nodes',
    },
    {
        key: 'nodeSpacing',
        group: 'Nodes',
        help: 'Spacing between nodes at an identical level.',
        required: false,
        defaultValue: svgDefaultProps.nodeSpacing,
        type: 'number',
        flavors: allFlavors,
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'nodeInnerPadding',
        group: 'Nodes',
        help: 'Node inner padding, distance from link, substracted from nodeThickness.',
        required: false,
        defaultValue: svgDefaultProps.nodeInnerPadding,
        type: 'number',
        flavors: allFlavors,
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    {
        key: 'nodeBorderWidth',
        group: 'Nodes',
        help: 'Node border width.',
        required: false,
        defaultValue: svgDefaultProps.nodeBorderWidth,
        type: 'number',
        flavors: allFlavors,
        control: { type: 'lineWidth' },
    },
    {
        key: 'nodeBorderColor',
        group: 'Nodes',
        description: `
            how to compute node border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        help: 'Method to compute node border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: svgDefaultProps.nodeBorderColor,
        flavors: allFlavors,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'nodeBorderRadius',
        group: 'Nodes',
        help: 'Node border radius.',
        type: 'number',
        required: false,
        defaultValue: svgDefaultProps.nodeBorderRadius,
        flavors: allFlavors,
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 12,
        },
    },
    {
        key: 'linkOpacity',
        group: 'Links',
        help: 'Link opacity (0~1).',
        required: false,
        defaultValue: svgDefaultProps.linkOpacity,
        type: 'number',
        flavors: allFlavors,
        control: { type: 'opacity' },
    },
    {
        key: 'linkHoverOpacity',
        group: 'Links',
        flavors: ['svg'],
        help: 'Link opacity on hover(0~1).',
        required: false,
        defaultValue: svgDefaultProps.linkHoverOpacity,
        type: 'number',
        control: { type: 'opacity' },
    },
    {
        key: 'linkHoverOthersOpacity',
        group: 'Links',
        flavors: ['svg'],
        help: 'Other links opacity on hover (0~1).',
        required: false,
        defaultValue: svgDefaultProps.linkHoverOthersOpacity,
        type: 'number',
        control: { type: 'opacity' },
    },
    {
        key: 'linkContract',
        group: 'Links',
        help: 'Contract link width.',
        required: false,
        defaultValue: svgDefaultProps.linkContract,
        type: 'number',
        flavors: allFlavors,
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    blendMode({
        key: 'linkBlendMode',
        target: 'links',
        flavors: ['svg'],
        group: 'Links',
        defaultValue: svgDefaultProps.linkBlendMode,
    }),
    {
        key: 'layers',
        flavors: ['svg', 'canvas'],
        help: 'Defines the order of layers.',
        description: `
            You can also use this to insert extra layers to the chart,
            this extra layer must be a function which will receive
            the chart computed data and must return a valid SVG
            element.
        `,
        type: 'Array<SankeyLayerId | SankeyCustomLayer>',
        required: false,
        defaultValue: svgDefaultProps.layers,
        group: 'Customization',
    },
    {
        key: 'enableLinkGradient',
        group: 'Links',
        help: 'Enable/disable gradient from source/target nodes instead of plain color.',
        type: 'boolean',
        required: false,
        defaultValue: svgDefaultProps.enableLinkGradient,
        flavors: allFlavors,
        control: { type: 'switch' },
    },
    {
        key: 'enableLabels',
        group: 'Labels',
        help: 'Enable/disable labels.',
        type: 'boolean',
        required: false,
        defaultValue: svgDefaultProps.enableLabels,
        flavors: allFlavors,
        control: { type: 'switch' },
    },
    {
        key: 'labelPosition',
        group: 'Labels',
        help: 'Label position.',
        type: 'string',
        required: false,
        defaultValue: svgDefaultProps.labelPosition,
        flavors: allFlavors,
        control: {
            type: 'radio',
            choices: ['inside', 'outside'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'labelPadding',
        group: 'Labels',
        help: 'Label padding from node.',
        required: false,
        defaultValue: svgDefaultProps.labelPadding,
        type: 'number',
        flavors: allFlavors,
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'labelTextColor',
        group: 'Labels',
        help: 'Method to compute label text color.',
        description: `
            how to compute label text color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: svgDefaultProps.labelTextColor,
        flavors: allFlavors,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'labelOrientation',
        group: 'Labels',
        help: 'Label orientation.',
        type: 'string',
        required: false,
        defaultValue: svgDefaultProps.labelOrientation,
        flavors: allFlavors,
        control: {
            type: 'radio',
            choices: ['horizontal', 'vertical'].map((key: string) => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'labelComponent',
        group: 'Labels',
        help: 'Label custom component.',
        type: 'SankeyLabelComponent',
        required: false,
        flavors: ['svg'],
    },
    isInteractive({
        flavors: ['svg'],
        defaultValue: svgDefaultProps.isInteractive,
    }),
    {
        key: 'nodeTooltip',
        flavors: ['svg'],
        help: `Tooltip custom component for nodes.`,
        type: 'FunctionComponent<{ node: SankeyNodeDatum }>',
        required: false,
        group: 'Interactivity',
        description: `
            Allows complete node tooltip customisation, it must return
            a valid HTML element and will receive the node as a property.
                        
            You can also customize the style of the tooltip
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'linkTooltip',
        flavors: ['svg'],
        help: `Tooltip custom component for links.`,
        type: 'FunctionComponent<{ link: SankeyLinkDatum }>',
        required: false,
        group: 'Interactivity',
        description: `
            Allows complete link tooltip customisation, it must return
            a valid HTML element and will receive the link as a property.
                        
            You can also customize the style of the tooltip
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'onClick',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'onClick handler, it receives target node or link data and mouse event.',
        type: '(target: SankeyNodeDatum | SankeyLinkDatum, event) => void',
        required: false,
    },
    ...motionProperties(['svg'], svgDefaultProps),
]

export const groups = groupProperties(props)
