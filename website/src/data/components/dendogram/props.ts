import {
    commonDefaultProps as defaults,
    IntermediateComputedLink,
    IntermediateComputedNode,
} from '@nivo/dendogram'
import { motionProperties, groupProperties, themeProperty } from '../../../lib/componentProperties'
import {
    chartDimensions,
    isInteractive,
    commonAccessibilityProps,
    ordinalColors,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { svgDefaultProps } from '@nivo/bar'
import { a } from '@react-spring/web'

const allFlavors: Flavor[] = ['svg']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
        help: 'The hierarchical data object.',
        type: 'object',
        required: true,
    },
    {
        key: 'identity',
        group: 'Base',
        flavors: allFlavors,
        help: 'The key or function to use to retrieve nodes identity.',
        description: `
            The identity of each node in a group of siblings must be unique,
            however it's fine to have the same ID for several nodes in the tree,
            as long as they're not siblings.
            
            Internally, nivo computes the full path of the nodes to generate a unique ID,
            accessible via \`uid\`, you can also get the path components via \`pathComponents\`.
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaults.identity,
    },
    {
        key: 'layout',
        help: 'Defines the diagram layout.',
        flavors: allFlavors,
        type: `'top-to-bottom' | 'right-to-left' | 'bottom-to-top' | 'left-to-right'`,
        required: false,
        defaultValue: defaults.layout,
        group: 'Base',
        control: {
            type: 'choices',
            choices: ['top-to-bottom', 'right-to-left', 'bottom-to-top', 'left-to-right'].map(
                choice => ({
                    label: choice,
                    value: choice,
                })
            ),
        },
    },
    ...chartDimensions(allFlavors),
    themeProperty(allFlavors),
    {
        key: 'nodeSize',
        group: 'Style',
        type: 'number | (node: IntermediateComputedNode) => number',
        control: { type: 'lineWidth' },
        help: 'Defines the size of the nodes, statically or dynamically.',
        required: false,
        defaultValue: defaults.nodeSize,
        flavors: allFlavors,
    },
    {
        key: 'activeNodeSize',
        group: 'Style',
        type: 'number | (node: ComputedNode) => number',
        control: { type: 'range', min: 0, max: 40, unit: 'px' },
        help: 'Defines the size of active nodes, statically or dynamically.',
        required: false,
        defaultValue: defaults.activeNodeSize,
        flavors: allFlavors,
    },
    {
        key: 'inactiveNodeSize',
        group: 'Style',
        type: 'number | (node: ComputedNode) => number',
        control: { type: 'range', min: 0, max: 40, unit: 'px' },
        help: 'Defines the size of inactive nodes, statically or dynamically.',
        required: false,
        defaultValue: defaults.activeNodeSize,
        flavors: allFlavors,
    },
    ordinalColors({
        key: 'nodeColor',
        help: 'Defines the color of the nodes, statically or dynamically.',
        flavors: allFlavors,
        defaultValue: defaults.nodeColor,
        genericType: 'IntermediateComputedNode',
    }),
    {
        key: 'linkThickness',
        group: 'Style',
        type: 'number | (link: IntermediateComputedLink) => number',
        control: { type: 'lineWidth' },
        help: 'Defines the thickness of the links, statically or dynamically.',
        required: false,
        defaultValue: defaults.linkThickness,
        flavors: ['svg'],
    },
    {
        key: 'linkColor',
        group: 'Style',
        type: 'InheritedColorConfig<IntermediateComputedLink>',
        control: {
            type: 'inheritedColor',
            inheritableProperties: ['source.color', 'target.color'],
            defaultFrom: 'source.color',
            defaultThemeProperty: 'labels.text.fill',
        },
        help: 'Defines the color of the links.',
        description: `
            How to compute the links color,
            [see dedicated documentation](self:/guides/colors).
        `,
        required: false,
        defaultValue: defaults.linkColor,
        flavors: ['svg'],
    },
    {
        key: 'layers',
        type: `('links' | 'nodes' | 'labels' | CustomSvgLayer)[]`,
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer must be a function.
            
            The layer function which will receive the chart's
            context & computed data and must return a valid SVG element.
        `,
        defaultValue: defaults.layers,
        flavors: ['svg'],
    },
    {
        key: 'nodeComponent',
        type: 'NodeComponent',
        group: 'Customization',
        help: 'Override the default node component.',
        description: `
            When providing your own component, some features are disabled,
            such as animations and interactions, you should have a look at
            the default \`Node\` component if you plan on restoring these.
        `,
        flavors: ['svg'],
        required: false,
    },
    {
        key: 'linkComponent',
        type: 'LinkComponent',
        group: 'Customization',
        help: 'Override the default link component.',
        description: `
            When providing your own component, some features are disabled,
            such as animations and interactions, you should have a look at
            the default \`Link\` component if you plan on restoring these.
        `,
        flavors: ['svg'],
        required: false,
    },
    isInteractive({
        flavors: ['svg'],
        defaultValue: defaults.isInteractive,
    }),
    {
        key: 'useMesh',
        flavors: allFlavors,
        help: 'Use a voronoi mesh to detect mouse interactions.',
        description: `
            Use a voronoi mesh to detect mouse interactions, this can be useful
            when the tree is dense, or if the nodes are small and you want to
            facilitate user interactions.
            
            Please note that you won't be able to capture link events when using this feature.
        `,
        type: 'boolean',
        required: false,
        defaultValue: defaults.useMesh,
        control: { type: 'switch' },
        group: 'Interactivity',
    },
    {
        key: 'meshDetectionThreshold',
        group: 'Interactivity',
        type: 'number',
        help: 'Prevent nodes from being detected if the cursor is too far away from the node.',
        flavors: allFlavors,
        required: false,
        defaultValue: Infinity,
        control: { type: 'range', min: 0, max: 200, step: 10, unit: 'px' },
    },
    {
        key: 'debugMesh',
        flavors: allFlavors,
        help: 'Display mesh used to detect mouse interactions (voronoi cells).',
        type: 'boolean',
        required: false,
        defaultValue: defaults.debugMesh,
        control: { type: 'switch' },
        group: 'Interactivity',
    },
    //     highlightAncestorNodes: boolean
    //     highlightDescendantNodes: boolean
    {
        key: 'highlightAncestorNodes',
        flavors: allFlavors,
        group: 'Interactivity',
        type: 'boolean',
        help: 'Highlight active node ancestor nodes.',
        required: false,
        control: { type: 'switch' },
    },
    {
        key: 'highlightDescendantNodes',
        flavors: allFlavors,
        group: 'Interactivity',
        type: 'boolean',
        help: 'Highlight active node descendant nodes.',
        required: false,
        control: { type: 'switch' },
    },
    {
        key: 'onNodeMouseEnter',
        flavors: allFlavors,
        group: 'Interactivity',
        type: '(node: ComputedNode, event: MouseEvent) => void',
        help: 'onMouseEnter handler for nodes.',
        required: false,
    },
    {
        key: 'onNodeMouseMove',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node: ComputedNode, event: MouseEvent) => void',
        help: 'onMouseMove handler for nodes.',
        required: false,
    },
    {
        key: 'onNodeMouseLeave',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node: ComputedNode, event: MouseEvent) => void',
        help: 'onMouseLeave handler for nodes.',
        required: false,
    },
    {
        key: 'onNodeClick',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node: ComputedNode, event: MouseEvent) => void',
        help: 'onClick handler for nodes.',
        required: false,
    },
    {
        key: 'nodeTooltip',
        flavors: ['svg'],
        group: 'Interactivity',
        type: 'NodeTooltip',
        help: 'Tooltip component for nodes.',
        required: false,
    },
    {
        key: 'onLinkMouseEnter',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node: ComputedLink, event: MouseEvent) => void',
        help: 'onMouseEnter handler for links (`useMesh` must be `false`).',
        required: false,
    },
    {
        key: 'onLinkMouseMove',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node: ComputedLink, event: MouseEvent) => void',
        help: 'onMouseMove handler for links (`useMesh` must be `false`).',
        required: false,
    },
    {
        key: 'onLinkMouseLeave',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node: ComputedLink, event: MouseEvent) => void',
        help: 'onMouseLeave handler for links (`useMesh` must be `false`).',
        required: false,
    },
    {
        key: 'onLinkClick',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node: ComputedLink, event: MouseEvent) => void',
        help: 'onClick handler for links (`useMesh` must be `false`).',
        required: false,
    },
    {
        key: 'linkTooltip',
        flavors: ['svg'],
        group: 'Interactivity',
        type: 'LinkTooltip',
        help: 'Tooltip component for links (`useMesh` must be `false`).',
        required: false,
    },
    ...commonAccessibilityProps(allFlavors),
    ...motionProperties(['svg'], defaults),
]

export const groups = groupProperties(props)
