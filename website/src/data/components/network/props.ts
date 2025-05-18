import { commonDefaultProps as defaults, svgDefaultProps } from '@nivo/network'
import { groupProperties, themeProperty, motionProperties } from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    isInteractive,
    commonAccessibilityProps,
    blendMode,
    annotations,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'
import {
    dynamicNodeSizeValue,
    dynamicActiveNodeSizeValue,
    dynamicLinkThicknessValue,
} from './mapper'

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
    chartRef(['svg', 'canvas']),
    {
        key: 'linkDistance',
        group: 'Simulation',
        type: 'number | string | (link: Link) => number',
        help: `Control links' distance.`,
        flavors: allFlavors,
        description: `
            If you set a **number**, this value will be used for all links.

            If you use a **function**, it will receive a link and must return
            the desired distance.
            
            Please note that in most cases you won't get links having the
            exact distance you specified as it also depends on the other forces.
        `,
    },
    {
        key: 'centeringStrength',
        group: 'Simulation',
        type: 'number',
        help: 'Control how much the centering force affects nodes positioning.',
        description: `
            This value will also affect the strength
            of \`distanceMin\` and \`distanceMax\`.
        `,
        flavors: allFlavors,
        defaultValue: defaults.centeringStrength,
        control: {
            type: 'range',
            min: 0,
            max: 2,
            step: 0.1,
        },
    },
    {
        key: 'repulsivity',
        group: 'Simulation',
        type: 'number',
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
        help: 'Sets the minimum distance between nodes for the many-body force.',
        flavors: allFlavors,
        defaultValue: defaults.distanceMin,
    },
    {
        key: 'distanceMax',
        group: 'Simulation',
        type: 'number',
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
        help: `Custom node component for the SVG implementation.`,
        flavors: ['svg'],
        defaultValue: 'NetworkNode',
    },
    {
        key: 'renderNode',
        group: 'Nodes',
        type: 'NetworkNodeCanvasRenderer',
        help: `Custom node rendering for the canvas implementation.`,
        flavors: ['canvas'],
    },
    {
        key: 'nodeSize',
        group: 'Nodes',
        type: 'number | (node: InputNode) => number',
        help: `Control nodes' size.`,
        flavors: allFlavors,
        defaultValue: defaults.nodeSize,
        control: {
            type: 'switchableRange',
            disabledValue: dynamicNodeSizeValue,
            defaultValue: defaults.nodeSize as number,
            unit: 'px',
            min: 4,
            max: 64,
        },
    },
    {
        key: 'activeNodeSize',
        group: 'Nodes',
        type: 'number | (node: InputNode) => number',
        help: `Control active nodes' size.`,
        flavors: allFlavors,
        defaultValue: defaults.activeNodeSize,
        control: {
            type: 'switchableRange',
            disabledValue: dynamicActiveNodeSizeValue,
            defaultValue: defaults.activeNodeSize as number,
            unit: 'px',
            min: 4,
            max: 64,
        },
    },
    {
        key: 'inactiveNodeSize',
        group: 'Nodes',
        type: 'number | (node: InputNode) => number',
        help: `Control inactive nodes' size.`,
        flavors: allFlavors,
        defaultValue: defaults.inactiveNodeSize,
        control: {
            type: 'range',
            unit: 'px',
            min: 4,
            max: 64,
        },
    },
    {
        key: 'nodeColor',
        group: 'Nodes',
        type: 'string | (node: InputNode) => string',
        help: `Control nodes' color.`,
        flavors: allFlavors,
        defaultValue: defaults.nodeColor,
    },
    {
        key: 'nodeBorderWidth',
        group: 'Nodes',
        type: 'number | (node: NetworkComputedNode) => number',
        help: `Control nodes' border width.`,
        flavors: allFlavors,
        defaultValue: defaults.nodeBorderWidth,
        control: { type: 'lineWidth' },
    },
    {
        key: 'nodeBorderColor',
        group: 'Nodes',
        type: 'InheritedColorConfig<NetworkComputedNode>',
        help: `Control nodes' border color.`,
        flavors: allFlavors,
        defaultValue: defaults.nodeBorderColor,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'linkComponent',
        group: 'Links',
        type: 'NetworkLinkComponent',
        help: `Custom link component for the SVG implementation.`,
        flavors: ['svg'],
        defaultValue: 'NetworkLink',
    },
    {
        key: 'renderLink',
        group: 'Links',
        type: 'NetworkLinkCanvasRenderer',
        help: `Custom link rendering for the canvas implementation.`,
        flavors: ['canvas'],
    },
    {
        key: 'linkThickness',
        group: 'Links',
        type: 'number | (link: NetworkComputedLink) => number',
        help: `Control links' thickness.`,
        flavors: allFlavors,
        defaultValue: defaults.linkThickness,
        control: {
            type: 'switchableRange',
            disabledValue: dynamicLinkThicknessValue,
            defaultValue: defaults.linkThickness as number,
            unit: 'px',
            min: 1,
            max: 12,
        },
    },
    {
        key: 'linkColor',
        group: 'Links',
        type: 'InheritedColorConfig<ComputedLink>',
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
        defaultValue: svgDefaultProps.linkBlendMode,
    }),
    isInteractive({ flavors: allFlavors, defaultValue: defaults.isInteractive }),
    {
        key: 'nodeTooltip',
        group: 'Interactivity',
        type: 'NetworkNodeTooltipComponent',
        help: 'Custom tooltip component for nodes.',
        flavors: allFlavors,
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
        flavors: allFlavors,
    },
    {
        key: 'onMouseEnter',
        group: 'Interactivity',
        help: 'onMouseEnter handler.',
        type: '(node: ComputedNode, event: MouseEvent) => void',
        flavors: ['svg'],
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        help: 'onMouseMove handler.',
        type: '(node: ComputedNode, event: MouseEvent) => void',
        flavors: ['svg'],
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        help: 'onMouseLeave handler.',
        type: '(node: ComputedNode, event: MouseEvent) => void',
        flavors: ['svg'],
    },
    annotations({
        target: 'nodes',
        flavors: allFlavors,
        createDefaults: {
            type: 'circle',
            match: { id: 'Node 0' },
            note: 'New annotation',
            noteX: 160,
            noteY: 36,
            offset: 6,
            noteTextOffset: 5,
        },
    }),
    {
        key: 'layers',
        type: `('links' | 'nodes')[] | FunctionComponent<LayerProps>`,
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        defaultValue: defaults.layers,
        flavors: ['svg', 'canvas'],
    },
    ...commonAccessibilityProps(['svg']),
    ...motionProperties(['svg'], defaults),
]

export const groups = groupProperties(props)
