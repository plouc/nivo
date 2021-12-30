import { commonDefaultProps as defaults } from '@nivo/network'
import { groupProperties, themeProperty, motionProperties } from '../../../lib/componentProperties'
import {
    chartDimensions,
    isInteractive,
    commonAccessibilityProps,
    blendMode,
    annotations,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'
import { dynamicNodeSizeValue, dynamicLinkThicknessValue } from './mapper'

const allFlavors: Flavor[] = ['svg', 'canvas']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        type: '{ nodes: NetworkInputNode[], links: NetworkInputLink[] }',
        required: true,
        help: 'Chart data defining nodes and links.',
        flavors: allFlavors,
        description: `
            Chart data, which must conform to this structure:

            \`\`\`
            {
                nodes: {
                    id: string
                }[]
                links: {
                    source: string // ref to node id
                    target: string // ref to node id
                }[]
            }
            \`\`\`
            
            Please note that each node id **must** be unique.
        `,
    },
    ...chartDimensions(allFlavors),
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
        defaultValue: defaults.repulsivity,
        control: {
            type: 'range',
            min: 1,
            max: 100,
        },
    },
    {
        key: 'distanceMin',
        group: 'Simulation',
        type: 'number',
        required: false,
        help: 'Sets the minimum distance between nodes for the many-body force.',
        flavors: allFlavors,
        defaultValue: defaults.distanceMin,
    },
    {
        key: 'distanceMax',
        group: 'Simulation',
        type: 'number',
        required: false,
        help: 'Sets the maximum disteance between nodes for the many-body force.',
        flavors: allFlavors,
        defaultValue: defaults.distanceMax,
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
        flavors: allFlavors,
        defaultValue: defaults.iterations,
        control: {
            type: 'range',
            min: 30,
            max: 260,
        },
    },
    themeProperty(allFlavors),
    {
        key: 'nodeComponent',
        group: 'Nodes',
        type: 'NetworkNodeComponent',
        required: false,
        help: `Custom node component for the SVG implementation.`,
        flavors: ['svg'],
        defaultValue: 'NetworkNode',
    },
    {
        key: 'renderNode',
        group: 'Nodes',
        type: 'NetworkNodeCanvasRenderer',
        required: false,
        help: `Custom node rendering for the canvas implementation.`,
        flavors: ['canvas'],
    },
    {
        key: 'nodeSize',
        group: 'Nodes',
        type: 'number | (node: InputNode) => number',
        required: false,
        help: `Control nodes' size.`,
        flavors: allFlavors,
        defaultValue: defaults.nodeSize,
        control: {
            type: 'switchableRange',
            disabledValue: dynamicNodeSizeValue,
            defaultValue: defaults.nodeSize,
            unit: 'px',
            min: 4,
            max: 64,
        },
    },
    {
        key: 'nodeColor',
        group: 'Nodes',
        type: 'string | (node: InputNode) => string',
        required: false,
        help: `Control nodes' color.`,
        flavors: allFlavors,
        defaultValue: defaults.nodeColor,
    },
    blendMode({
        group: 'Nodes',
        key: 'nodeBlendMode',
        target: 'nodes',
        flavors: ['svg'],
        defaultValue: defaults.nodeBlendMode,
    }),
    {
        key: 'nodeBorderWidth',
        group: 'Nodes',
        type: 'number | (node: NetworkComputedNode) => number',
        required: false,
        help: `Control nodes' border width.`,
        flavors: allFlavors,
        defaultValue: defaults.nodeBorderWidth,
        control: { type: 'lineWidth' },
    },
    {
        key: 'nodeBorderColor',
        group: 'Nodes',
        type: 'InheritedColorConfig<NetworkComputedNode>',
        required: false,
        help: `Control nodes' border color.`,
        flavors: allFlavors,
        defaultValue: defaults.nodeBorderColor,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'linkComponent',
        group: 'Links',
        type: 'NetworkLinkComponent',
        required: false,
        help: `Custom link component for the SVG implementation.`,
        flavors: ['svg'],
        defaultValue: 'NetworkLink',
    },
    {
        key: 'renderLink',
        group: 'Links',
        type: 'NetworkLinkCanvasRenderer',
        required: false,
        help: `Custom link rendering for the canvas implementation.`,
        flavors: ['canvas'],
    },
    {
        key: 'linkThickness',
        group: 'Links',
        type: 'number | (link: NetworkComputedLink) => number',
        required: false,
        help: `Control links' thickness.`,
        flavors: allFlavors,
        defaultValue: defaults.linkThickness,
        control: {
            type: 'switchableRange',
            disabledValue: dynamicLinkThicknessValue,
            defaultValue: defaults.linkThickness,
            unit: 'px',
            min: 1,
            max: 12,
        },
    },
    {
        key: 'linkColor',
        group: 'Links',
        type: 'InheritedColorConfig<ComputedLink>',
        required: false,
        help: `Control links' color.`,
        flavors: allFlavors,
        defaultValue: defaults.linkColor,
        control: {
            type: 'inheritedColor',
            inheritableProperties: ['source.color', 'target.color'],
        },
    },
    blendMode({
        group: 'Links',
        key: 'linkBlendMode',
        target: 'links',
        flavors: ['svg'],
        defaultValue: defaults.linkBlendMode,
    }),
    isInteractive({ flavors: allFlavors, defaultValue: defaults.isInteractive }),
    {
        key: 'nodeTooltip',
        group: 'Interactivity',
        type: 'NetworkNodeTooltipComponent',
        required: false,
        help: 'Custom tooltip component for nodes.',
        flavors: ['svg', 'canvas'],
        description: `
            An optional component allowing complete tooltip customisation,
            it must return a valid HTML element and will receive
            the node's data as a property.
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
        type: '(node: ComputedNode, event: MouseEvent) => void',
        required: false,
        flavors: ['svg', 'canvas'],
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        help: 'onMouseMove handler.',
        type: '(node: ComputedNode, event: MouseEvent) => void',
        required: false,
        flavors: ['svg', 'canvas'],
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        help: 'onMouseLeave handler.',
        type: '(node: ComputedNode, event: MouseEvent) => void',
        required: false,
        flavors: allFlavors,
    },
    annotations({
        target: 'nodes',
        flavors: allFlavors,
        newDefaults: {
            type: 'circle',
            match: { id: '0' },
            note: 'New annotation',
            noteX: 160,
            noteY: 36,
            offset: 6,
            noteTextOffset: 5,
            borderRadius: 3,
        },
    }),
    {
        key: 'layers',
        type: `('links' | 'nodes')[] | FunctionComponent<LayerProps>`,
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        required: false,
        defaultValue: defaults.layers,
        flavors: ['svg', 'canvas'],
    },
    ...commonAccessibilityProps(['svg']),
    ...motionProperties(['svg'], defaults, 'react-spring'),
]

export const groups = groupProperties(props)
