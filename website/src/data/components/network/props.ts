// @ts-ignore
import { NetworkDefaultProps } from '@nivo/network'
import { motionProperties, groupProperties, themeProperty } from '../../../lib/componentProperties'
import { chartDimensions, pixelRatio } from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas']

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
    ...chartDimensions(allFlavors),
    pixelRatio(),
    {
        key: 'linkDistance',
        group: 'Simulation',
        type: 'number | string | (link: Link) => number',
        required: false,
        help: `Control links' distance.`,
        flavors: allFlavors,
        description: `
            If you set a **number**, this value will be used for all links.

            If you use a **string**, this will be used to pick the distance
            from the corresponding link property, thus, this property
            should exist on each link.

            If you use a **function**, it will receive a link and must return
            the desired distance.
        `,
    },
    {
        key: 'repulsivity',
        group: 'Simulation',
        type: 'number',
        required: false,
        help: 'Control how nodes repel each other.',
        description: `
            This value will also affect the strength
            of \`distanceMin\` and \`distanceMax\`.
        `,
        flavors: allFlavors,
        control: {
            type: 'range',
            min: 1,
            max: 100,
        },
        defaultValue: NetworkDefaultProps.repulsivity,
    },
    {
        key: 'distanceMin',
        group: 'Simulation',
        type: 'number',
        required: false,
        help: 'Sets the minimum distance between nodes for the many-body force.',
        flavors: allFlavors,
        defaultValue: NetworkDefaultProps.distanceMin,
    },
    {
        key: 'distanceMax',
        group: 'Simulation',
        type: 'number',
        required: false,
        help: 'Sets the maximum disteance between nodes for the many-body force.',
        flavors: allFlavors,
        defaultValue: NetworkDefaultProps.distanceMax,
    },
    {
        key: 'iterations',
        group: 'Simulation',
        help: 'Adjust the simulation quality.',
        description: `
            Increasing this number will result in a **more accurate simulation**,
            however it will also involve more computing.
        `,
        type: 'number',
        required: false,
        defaultValue: NetworkDefaultProps.iterations,
        flavors: allFlavors,
        control: {
            type: 'range',
            min: 60,
            max: 260,
        },
    },
    themeProperty(['svg', 'canvas']),
    {
        key: 'nodeColor',
        group: 'Nodes',
        type: 'string | (node: InputNode) => string',
        required: false,
        help: `Control nodes' color.`,
        flavors: allFlavors,
        defaultValue: NetworkDefaultProps.nodeColor,
    },
    {
        key: 'nodeBorderWidth',
        group: 'Nodes',
        type: 'number | (node: Node) => number',
        required: false,
        help: `Control nodes' border width.`,
        defaultValue: NetworkDefaultProps.nodeBorderWidth,
        flavors: allFlavors,
        control: { type: 'lineWidth' },
    },
    {
        key: 'nodeBorderColor',
        group: 'Nodes',
        type: 'string | object | (link: Link) => string',
        required: false,
        help: `Control nodes' border color.`,
        defaultValue: NetworkDefaultProps.nodeBorderColor,
        flavors: allFlavors,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'linkThickness',
        enableControlForFlavors: ['canvas'],
        group: 'Links',
        type: 'number | (link: Link) => number',
        required: false,
        help: `Control links' thickness.`,
        flavors: allFlavors,
        defaultValue: NetworkDefaultProps.linkThickness,
        control: { type: 'lineWidth' },
    },
    {
        key: 'linkColor',
        group: 'Links',
        type: 'string | (link: Link) => string',
        required: false,
        help: `Control links' color.`,
        defaultValue: NetworkDefaultProps.linkColor,
        flavors: allFlavors,
        control: {
            type: 'inheritedColor',
            inheritableProperties: ['source.color', 'target.color'],
        },
    },
    {
        key: 'isInteractive',
        group: 'Interactivity',
        type: 'boolean',
        required: false,
        help: 'Enable/disable interactivity.',
        flavors: ['svg'],
        defaultValue: NetworkDefaultProps.isInteractive,
        controlType: 'switch',
    },
    {
        key: 'nodeTooltip',
        group: 'Interactivity',
        type: 'NetworkNodeTooltipComponent',
        required: false,
        help: 'Custom tooltip component for nodes.',
        flavors: ['svg', 'canvas'],
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML
            element and will receive the node's data.
        `,
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        help: 'onClick handler.',
        type: '(node: NetworkComputedNode, event: MouseEvent) => void',
        required: false,
        flavors: ['svg', 'canvas'],
    },
    {
        key: 'onMouseEnter',
        group: 'Interactivity',
        help: 'onMouseEnter handler.',
        type: '(node: NetworkComputedNode, event: MouseEvent) => void',
        required: false,
        flavors: ['svg', 'canvas'],
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        help: 'onMouseMove handler.',
        type: '(node: NetworkComputedNode, event: MouseEvent) => void',
        required: false,
        flavors: ['svg', 'canvas'],
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        help: 'onMouseLeave handler.',
        type: '(node: NetworkComputedNode, event: MouseEvent) => void',
        required: false,
        flavors: allFlavors,
    },
    {
        key: 'layers',
        type: `('links' | 'nodes')[] | FunctionComponent<LayerProps>`,
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        required: false,
        defaultValue: NetworkDefaultProps.layers,
        flavors: ['svg', 'canvas'],
    },
    {
        key: 'role',
        group: 'Accessibility',
        type: 'string',
        required: false,
        help: 'Main element role attribute.',
        flavors: ['svg'],
    },
    {
        key: 'ariaLabel',
        group: 'Accessibility',
        type: 'string',
        required: false,
        help: 'Main element [aria-label](https://www.w3.org/TR/wai-aria/#aria-label).',
        flavors: ['svg'],
    },
    {
        key: 'ariaLabelledBy',
        group: 'Accessibility',
        type: 'string',
        required: false,
        help: 'Main element [aria-labelledby](https://www.w3.org/TR/wai-aria/#aria-labelledby).',
        flavors: ['svg'],
    },
    {
        key: 'ariaDescribedBy',
        group: 'Accessibility',
        type: 'string',
        required: false,
        help: 'Main element [aria-describedby](https://www.w3.org/TR/wai-aria/#aria-describedby).',
        flavors: ['svg'],
    },
    ...motionProperties(['svg'], NetworkDefaultProps, 'react-spring'),
]

export const groups = groupProperties(props)
