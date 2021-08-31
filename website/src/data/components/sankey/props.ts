import { svgDefaultProps as defaults, sankeyAlignmentPropKeys } from '@nivo/sankey'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data defining nodes and links.',
        description: `
            Chart data, which must conform to this structure:

            \`\`\`
            {
                nodes: {
                    id: string | number
                }[],
                links: {
                    source: string | number, // ref to node id
                    target: string | number, // ref to node id
                    value:  number
                }[]
            }
            \`\`\`
        `,
        type: '{ nodes: object[], links: object[] }',
        required: true,
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
        key: 'layout',
        help: `Control sankey layout direction.`,
        type: 'string',
        required: false,
        defaultValue: defaults.layout,
        controlType: 'radio',
        group: 'Base',
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
        help: 'Node alignment method.',
        description: `
            Defines node alignment method.
            Please have a look at the
            [official d3 documentation](https://github.com/d3/d3-sankey#sankey_nodeAlign)
            for further information.
        `,
        type: 'string',
        required: false,
        defaultValue: defaults.align,
        controlType: 'choices',
        controlOptions: {
            choices: sankeyAlignmentPropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'sort',
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
        help: 'Node sorting method.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.sort,
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: ['auto', 'input', 'ascending', 'descending'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        description: `
            not required if using
            \`<ResponsiveSankey/>\`.
        `,
        help: 'Chart width.',
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1200,
            step: 5,
        },
    },
    {
        key: 'height',
        enableControlForFlavors: ['api'],
        description: `
            not required if using
            \`<ResponsiveSankey/>\`.
        `,
        help: 'Chart height.',
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
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
        controlType: 'margin',
        group: 'Base',
    },
    themeProperty,
    {
        key: 'colors',
        help: 'Defines how to compute nodes color.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'ordinalColors',
        group: 'Style',
    },
    {
        key: 'nodeThickness',
        help: 'Node thickness.',
        required: false,
        defaultValue: defaults.nodeThickness,
        type: 'number',
        controlType: 'range',
        group: 'Nodes',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 100,
        },
    },
    {
        key: 'nodeOpacity',
        help: 'Node opacity (0~1).',
        required: false,
        defaultValue: defaults.nodeOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Nodes',
    },
    {
        key: 'nodeHoverOpacity',
        flavors: ['svg'],
        help: 'Node opacity on hover (0~1).',
        required: false,
        defaultValue: defaults.nodeHoverOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Nodes',
    },
    {
        key: 'nodeHoverOthersOpacity',
        flavors: ['svg'],
        help: 'Other nodes opacity on hover (0~1).',
        required: false,
        defaultValue: defaults.nodeHoverOthersOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Nodes',
    },
    {
        key: 'nodeSpacing',
        help: 'Spacing between nodes at an identical level.',
        required: false,
        defaultValue: defaults.nodeSpacing,
        type: 'number',
        controlType: 'range',
        group: 'Nodes',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'nodeInnerPadding',
        help: 'Node inner padding, distance from link, substracted from nodeThickness.',
        required: false,
        defaultValue: defaults.nodePaddingX,
        type: 'number',
        controlType: 'range',
        group: 'Nodes',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    {
        key: 'nodeBorderWidth',
        help: 'Node border width.',
        required: false,
        defaultValue: defaults.nodeBorderWidth,
        type: 'number',
        controlType: 'lineWidth',
        group: 'Nodes',
    },
    {
        key: 'nodeBorderColor',
        description: `
            how to compute node border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        help: 'Method to compute node border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.nodeBorderColor,
        controlType: 'inheritedColor',
        group: 'Nodes',
    },
    {
        key: 'nodeBorderRadius',
        help: 'Node border radius.',
        type: 'number',
        required: false,
        defaultValue: defaults.nodeBorderRadius,
        controlType: 'range',
        group: 'Nodes',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 12,
        },
    },
    {
        key: 'linkOpacity',
        help: 'Link opacity (0~1).',
        required: false,
        defaultValue: defaults.linkOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Links',
    },
    {
        key: 'linkHoverOpacity',
        flavors: ['svg'],
        help: 'Link opacity on hover(0~1).',
        required: false,
        defaultValue: defaults.linkHoverOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Links',
    },
    {
        key: 'linkHoverOthersOpacity',
        flavors: ['svg'],
        help: 'Other links opacity on hover (0~1).',
        required: false,
        defaultValue: defaults.linkHoverOthersOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Links',
    },
    {
        key: 'linkContract',
        help: 'Contract link width.',
        required: false,
        defaultValue: defaults.linkContract,
        type: 'number',
        controlType: 'range',
        group: 'Links',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'linkBlendMode',
        flavors: ['svg'],
        help: 'Defines CSS mix-blend-mode property for links.',
        description: `
            Defines CSS \`mix-blend-mode\` property for links, see
            [MDN documentation](https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode).
        `,
        type: 'string',
        required: false,
        defaultValue: defaults.linkBlendMode,
        controlType: 'blendMode',
        group: 'Links',
    },
    {
        key: 'enableLinkGradient',
        help: 'Enable/disable gradient from source/target nodes instead of plain color.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLinkGradient,
        controlType: 'switch',
        group: 'Links',
    },
    {
        key: 'enableLabels',
        help: 'Enable/disable labels.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLabels,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'labelPosition',
        help: 'Label position.',
        type: 'string',
        required: false,
        defaultValue: defaults.labelPosition,
        controlType: 'radio',
        group: 'Labels',
        controlOptions: {
            choices: ['inside', 'outside'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'labelPadding',
        help: 'Label padding from node.',
        required: false,
        defaultValue: defaults.labelPadding,
        type: 'number',
        controlType: 'range',
        group: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'labelTextColor',
        help: 'Method to compute label text color.',
        description: `
            how to compute label text color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.labelTextColor,
        controlType: 'inheritedColor',
        group: 'Labels',
    },
    {
        key: 'labelOrientation',
        help: 'Label orientation.',
        type: 'string',
        required: false,
        defaultValue: defaults.labelOrientation,
        controlType: 'radio',
        group: 'Labels',
        controlOptions: {
            choices: ['horizontal', 'vertical'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'isInteractive',
        flavors: ['svg'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
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
    ...motionProperties(['svg'], defaults, 'react-spring'),
]

export const groups = groupProperties(props)
