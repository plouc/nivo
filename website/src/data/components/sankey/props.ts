import { svgDefaultProps, sankeyAlignmentPropKeys } from '@nivo/sankey'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        type: '{ nodes: object[], links: object[] }',
        required: true,
        help: 'Chart data defining nodes and links.',
        flavors: ['svg', 'api'],
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
        flavors: ['svg', 'api'],
        controlType: 'valueFormat',
    },
    {
        key: 'layout',
        group: 'Base',
        type: 'string',
        required: false,
        help: `Control sankey layout direction.`,
        defaultValue: svgDefaultProps.layout,
        flavors: ['svg', 'api'],
        controlType: 'radio',
        controlOptions: {
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
        flavors: ['svg', 'api'],
        controlType: 'choices',
        controlOptions: {
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
        flavors: ['svg', 'api'],
        controlType: 'choices',
        controlOptions: {
            choices: ['auto', 'input', 'ascending', 'descending'].map(key => ({
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
            \`<ResponsiveSankey/>\`.
        `,
        flavors: ['svg', 'api'],
        enableControlForFlavors: ['api'],
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1200,
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
            \`<ResponsiveSankey/>\`.
        `,
        flavors: ['svg', 'api'],
        enableControlForFlavors: ['api'],
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1200,
            step: 5,
        },
    },
    {
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        group: 'Base',
        flavors: ['svg', 'api'],
        controlType: 'margin',
    },
    themeProperty(['svg', 'api']),
    {
        key: 'colors',
        group: 'Style',
        type: 'string | Function | string[]',
        required: false,
        help: 'Defines how to compute nodes color.',
        defaultValue: svgDefaultProps.colors,
        flavors: ['svg', 'api'],
        controlType: 'ordinalColors',
    },
    {
        key: 'nodeThickness',
        group: 'Nodes',
        type: 'number',
        required: false,
        help: 'Node thickness.',
        defaultValue: svgDefaultProps.nodeThickness,
        flavors: ['svg', 'api'],
        controlType: 'range',
        controlOptions: {
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
        flavors: ['svg', 'api'],
        controlType: 'opacity',
    },
    {
        key: 'nodeHoverOpacity',
        group: 'Nodes',
        flavors: ['svg'],
        help: 'Node opacity on hover (0~1).',
        required: false,
        defaultValue: svgDefaultProps.nodeHoverOpacity,
        type: 'number',
        controlType: 'opacity',
    },
    {
        key: 'nodeHoverOthersOpacity',
        flavors: ['svg'],
        help: 'Other nodes opacity on hover (0~1).',
        required: false,
        defaultValue: svgDefaultProps.nodeHoverOthersOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Nodes',
    },
    {
        key: 'nodeSpacing',
        group: 'Nodes',
        help: 'Spacing between nodes at an identical level.',
        required: false,
        defaultValue: svgDefaultProps.nodeSpacing,
        type: 'number',
        flavors: ['svg', 'api'],
        controlType: 'range',
        controlOptions: {
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
        flavors: ['svg', 'api'],
        controlType: 'range',
        controlOptions: {
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
        flavors: ['svg', 'api'],
        controlType: 'lineWidth',
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
        flavors: ['svg', 'api'],
        controlType: 'inheritedColor',
    },
    {
        key: 'nodeBorderRadius',
        group: 'Nodes',
        help: 'Node border radius.',
        type: 'number',
        required: false,
        defaultValue: svgDefaultProps.nodeBorderRadius,
        flavors: ['svg', 'api'],
        controlType: 'range',
        controlOptions: {
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
        flavors: ['svg', 'api'],
        controlType: 'opacity',
    },
    {
        key: 'linkHoverOpacity',
        group: 'Links',
        flavors: ['svg'],
        help: 'Link opacity on hover(0~1).',
        required: false,
        defaultValue: svgDefaultProps.linkHoverOpacity,
        type: 'number',
        controlType: 'opacity',
    },
    {
        key: 'linkHoverOthersOpacity',
        group: 'Links',
        flavors: ['svg'],
        help: 'Other links opacity on hover (0~1).',
        required: false,
        defaultValue: svgDefaultProps.linkHoverOthersOpacity,
        type: 'number',
        controlType: 'opacity',
    },
    {
        key: 'linkContract',
        group: 'Links',
        help: 'Contract link width.',
        required: false,
        defaultValue: svgDefaultProps.linkContract,
        type: 'number',
        flavors: ['svg', 'api'],
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'linkBlendMode',
        flavors: ['svg'],
        help:
            'Defines CSS [mix-blend-mode](https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode) property for links.',
        type: 'string',
        required: false,
        defaultValue: svgDefaultProps.linkBlendMode,
        controlType: 'blendMode',
        group: 'Links',
    },
    {
        key: 'enableLinkGradient',
        group: 'Links',
        help: 'Enable/disable gradient from source/target nodes instead of plain color.',
        type: 'boolean',
        required: false,
        defaultValue: svgDefaultProps.enableLinkGradient,
        flavors: ['svg', 'api'],
        controlType: 'switch',
    },
    {
        key: 'enableLabels',
        group: 'Labels',
        help: 'Enable/disable labels.',
        type: 'boolean',
        required: false,
        defaultValue: svgDefaultProps.enableLabels,
        flavors: ['svg', 'api'],
        controlType: 'switch',
    },
    {
        key: 'labelPosition',
        group: 'Labels',
        help: 'Label position.',
        type: 'string',
        required: false,
        defaultValue: svgDefaultProps.labelPosition,
        flavors: ['svg', 'api'],
        controlType: 'radio',
        controlOptions: {
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
        flavors: ['svg', 'api'],
        controlType: 'range',
        controlOptions: {
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
        flavors: ['svg', 'api'],
        controlType: 'inheritedColor',
    },
    {
        key: 'labelOrientation',
        group: 'Labels',
        help: 'Label orientation.',
        type: 'string',
        required: false,
        defaultValue: svgDefaultProps.labelOrientation,
        flavors: ['svg', 'api'],
        controlType: 'radio',
        controlOptions: {
            choices: ['horizontal', 'vertical'].map((key: string) => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'isInteractive',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: svgDefaultProps.isInteractive,
        controlType: 'switch',
    },
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
    ...motionProperties(['svg'], svgDefaultProps, 'react-spring'),
]

export const groups = groupProperties(props)
