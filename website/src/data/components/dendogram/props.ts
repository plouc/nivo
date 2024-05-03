import { commonDefaultProps as defaults } from '@nivo/dendogram'
import { motionProperties, groupProperties, themeProperty } from '../../../lib/componentProperties'
import {
    chartDimensions,
    isInteractive,
    commonAccessibilityProps,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

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
        key: 'onNodeMouseEnter',
        flavors: ['svg'],
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
        help: 'onMouseEnter handler for links.',
        required: false,
    },
    {
        key: 'onLinkMouseMove',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node: ComputedLink, event: MouseEvent) => void',
        help: 'onMouseMove handler for links.',
        required: false,
    },
    {
        key: 'onLinkMouseLeave',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node: ComputedLink, event: MouseEvent) => void',
        help: 'onMouseLeave handler for links.',
        required: false,
    },
    {
        key: 'onLinkClick',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(node: ComputedLink, event: MouseEvent) => void',
        help: 'onClick handler for links.',
        required: false,
    },
    {
        key: 'linkTooltip',
        flavors: ['svg'],
        group: 'Interactivity',
        type: 'LinkTooltip',
        help: 'Tooltip component for links.',
        required: false,
    },
    ...commonAccessibilityProps(allFlavors),
    ...motionProperties(['svg'], defaults),
]

export const groups = groupProperties(props)
