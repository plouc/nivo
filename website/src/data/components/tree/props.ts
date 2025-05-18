import { commonDefaultProps as defaults, svgDefaultProps as svgDefaults } from '@nivo/tree'
import {
    motionProperties,
    groupProperties,
    themeProperty,
    tooltipPositionProperty,
    tooltipAnchorProperty,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    isInteractive,
    commonAccessibilityProps,
    ordinalColors,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas']

const props: ChartProperty[] = [
    {
        group: 'Base',
        key: 'data',
        flavors: allFlavors,
        help: 'The hierarchical data object.',
        description: `
            A typical data object should look like this:
            
            \`\`\`
            {
                id: '0',
                children: [
                    { id: 'A', children: [{ id: '0' }, { id: '1' }] },
                    { id: 'B', children: [{ id: '0' }] },
                    { id: 'C' },
                ], 
            }
            \`\`\`
            
            Please note that you should **never** mutate the data object,
            because otherwise nivo won't know that it changed, we make heavy
            use of memoization internally via React hooks, so if you want
            to update the data, the reference should change, meaning you
            should pass a new object.
        `,
        type: 'object',
        required: true,
    },
    {
        group: 'Base',
        key: 'identity',
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
        group: 'Base',
        key: 'mode',
        help: `Type of tree diagram.`,
        type: `'tree' | 'dendogram'`,
        flavors: allFlavors,
        required: false,
        defaultValue: defaults.mode,
        control: {
            type: 'radio',
            choices: [
                { label: 'tree', value: 'tree' },
                { label: 'dendogram', value: 'dendogram' },
            ],
        },
    },
    {
        group: 'Base',
        key: 'layout',
        help: 'Defines the diagram layout.',
        flavors: allFlavors,
        type: `'top-to-bottom' | 'right-to-left' | 'bottom-to-top' | 'left-to-right'`,
        required: false,
        defaultValue: defaults.layout,
        control: {
            type: 'cartesianOrientation',
            mapping: {
                top: { label: 'bottom-to-top', value: 'bottom-to-top' },
                right: { label: 'left-to-right', value: 'left-to-right' },
                bottom: { label: 'top-to-bottom', value: 'top-to-bottom' },
                left: { label: 'right-to-left', value: 'right-to-left' },
            },
        },
    },
    ...chartDimensions(allFlavors),
    chartRef(['svg', 'canvas']),
    themeProperty(allFlavors),
    {
        group: 'Style',
        key: 'nodeSize',
        type: 'number | (node: IntermediateComputedNode) => number',
        control: { type: 'lineWidth' },
        help: 'Defines the size of the nodes, statically or dynamically.',
        required: false,
        defaultValue: defaults.nodeSize,
        flavors: allFlavors,
    },
    {
        group: 'Style',
        key: 'activeNodeSize',
        type: 'number | (node: ComputedNode) => number',
        control: { type: 'range', min: 0, max: 40, unit: 'px' },
        help: 'Defines the size of active nodes, statically or dynamically.',
        required: false,
        flavors: allFlavors,
    },
    {
        group: 'Style',
        key: 'inactiveNodeSize',
        type: 'number | (node: ComputedNode) => number',
        control: { type: 'range', min: 0, max: 40, unit: 'px' },
        help: 'Defines the size of inactive nodes, statically or dynamically.',
        required: false,
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
        group: 'Style',
        key: 'fixNodeColorAtDepth',
        type: 'number',
        help: `
            Fix the node color past a certain depth, meaning descendant nodes
            are going to inherit the parent color defined at that depth.
            Use \`Infinity\` to disable.
        `,
        flavors: allFlavors,
        required: false,
        defaultValue: defaults.fixNodeColorAtDepth,
        control: { type: 'range', min: 0, max: 5 },
    },
    {
        group: 'Style',
        key: 'linkCurve',
        help: 'Defines the type of curve to use to draw links.',
        flavors: allFlavors,
        type: `'bump' | 'linear' | 'step' | 'step-before' | 'step-after'`,
        required: false,
        defaultValue: defaults.linkCurve,
        control: {
            type: 'choices',
            choices: ['bump', 'linear', 'step', 'step-before', 'step-after'].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        group: 'Style',
        key: 'linkThickness',
        type: 'number | (link: IntermediateComputedLink) => number',
        control: { type: 'lineWidth' },
        help: 'Defines the thickness of the links, statically or dynamically.',
        required: false,
        defaultValue: defaults.linkThickness,
        flavors: allFlavors,
    },
    {
        group: 'Style',
        key: 'activeLinkThickness',
        type: 'number | (link: ComputedLink) => number',
        control: { type: 'lineWidth' },
        help: 'Defines the size of active links, statically or dynamically.',
        required: false,
        flavors: allFlavors,
    },
    {
        group: 'Style',
        key: 'inactiveLinkThickness',
        type: 'number | (link: ComputedLink) => number',
        control: { type: 'lineWidth' },
        help: 'Defines the thickness of inactive links, statically or dynamically.',
        required: false,
        flavors: allFlavors,
    },
    {
        group: 'Style',
        key: 'linkColor',
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
        flavors: allFlavors,
    },
    {
        group: 'Labels',
        key: 'enableLabel',
        flavors: allFlavors,
        help: 'Show labels for nodes.',
        description: `
            If you want to adjust the labels styles you should
            use the \`theme\` property, labels use the \`theme.labels.text\`
            styles.
        `,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLabel,
        control: { type: 'switch' },
    },
    {
        group: 'Labels',
        key: 'label',
        help: `Define what to use as a node label, if a string is provided it's used as a property path to access the value.`,
        type: 'string | (node: ComputedNode) => string',
        flavors: allFlavors,
        required: false,
        defaultValue: defaults.label,
    },
    {
        group: 'Labels',
        key: 'labelsPosition',
        help: 'Defines how to position the nodes labels.',
        description: `
            Please note that labels don't affect the margins, meaning
            that if you're using the \`outward\` mode for example,
            you'll probably have to adjust the margins so that
            the labels fit within the chart.
        `,
        flavors: allFlavors,
        type: `'outward' | 'inward' | 'layout' | 'layout-opposite'`,
        required: false,
        defaultValue: defaults.labelsPosition,
        control: {
            type: 'choices',
            choices: ['outward', 'inward', 'layout', 'layout-opposite'].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        group: 'Labels',
        key: 'orientLabel',
        flavors: allFlavors,
        help: 'Automatically orient labels according to the selected `layout`.',
        description: `
            If enabled, this is going to only affect vertical layouts
            (\`top-to-bottom\`, \`bottom-to-top\`), rotating labels
            so that they match the direction of the selected \`layout\`.  
        `,
        type: 'boolean',
        required: false,
        defaultValue: defaults.orientLabel,
        control: { type: 'switch' },
    },
    {
        group: 'Labels',
        key: 'labelOffset',
        type: 'number',
        help: 'Prevent nodes from being detected if the cursor is too far away from the node.',
        flavors: allFlavors,
        required: false,
        defaultValue: Infinity,
        control: { type: 'range', min: 0, max: 60, unit: 'px' },
    },
    {
        group: 'Labels',
        key: 'labelComponent',
        type: 'LabelComponent',
        help: 'Override the default label component.',
        description: `
            When providing your own component, some features are disabled,
            such as animations, you should have a look at the default \`Label\`
            component if you plan on restoring these.
        `,
        flavors: ['svg'],
        required: false,
    },
    {
        group: 'Labels',
        key: 'renderLabel',
        type: 'LabelCanvasRenderer',
        help: 'Override the default label canvas rendering.',
        description: `
            Please make sure to use \`context.save()\` and \`context.restore()\`
            if you make some global modifications to the 2d context inside this
            function to avoid side effects.
        `,
        flavors: ['canvas'],
        required: false,
    },
    {
        group: 'Customization',
        key: 'layers',
        type: {
            svg: `('links' | 'nodes' | 'mesh' | CustomSvgLayer)[]`,
            canvas: `('links' | 'nodes' | 'mesh' | CustomCanvasLayer)[]`,
        },
        help: 'Defines the order of layers and add custom layers.',
        description: {
            svg: `
                You can also use this property to insert extra layers to the chart,
                the extra layer must be a function component.
                
                This component is going to get the chart's context and computed data
                as props and should return a valid SVG element.
            `,
            canvas: `
                You can also use this property to insert extra layers to the chart,
                the extra layer must be a function.

                The function is going to get the canvas 2d context as first argument
                and the chart's context and computed data as second.

                Please make sure to use \`context.save()\` and \`context.restore()\`
                if you make some global modifications to the 2d context inside this
                function to avoid side effects.
            `,
        },
        defaultValue: svgDefaults.layers,
        flavors: allFlavors,
    },
    {
        group: 'Customization',
        key: 'nodeComponent',
        type: 'NodeComponent',
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
        group: 'Customization',
        key: 'renderNode',
        type: 'NodeCanvasRenderer',
        help: 'Override the default node canvas rendering.',
        description: `
            Please make sure to use \`context.save()\` and \`context.restore()\`
            if you make some global modifications to the 2d context inside this
            function to avoid side effects.
        `,
        flavors: ['canvas'],
        required: false,
    },
    {
        group: 'Customization',
        key: 'linkComponent',
        type: 'LinkComponent',
        help: 'Override the default link component.',
        description: `
            When providing your own component, some features are disabled,
            such as animations and interactions, you should have a look at
            the default \`Link\` component if you plan on restoring these.
        `,
        flavors: ['svg'],
        required: false,
    },
    {
        group: 'Customization',
        key: 'renderLink',
        type: 'LinkCanvasRenderer',
        help: 'Override the default link canvas rendering.',
        description: `
            Please make sure to use \`context.save()\` and \`context.restore()\`
            if you make some global modifications to the 2d context inside this
            function to avoid side effects.
        `,
        flavors: ['canvas'],
        required: false,
    },
    isInteractive({
        flavors: allFlavors,
        defaultValue: defaults.isInteractive,
    }),
    {
        group: 'Interactivity',
        key: 'useMesh',
        flavors: ['svg'],
        help: 'Use a voronoi mesh to detect mouse interactions. Always `true` for the canvas implementation',
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
    },
    {
        group: 'Interactivity',
        key: 'meshDetectionRadius',
        type: 'number',
        help: 'Prevent nodes from being detected if the cursor is too far away from the node.',
        flavors: allFlavors,
        required: false,
        defaultValue: defaults.meshDetectionRadius,
        control: { type: 'range', min: 0, max: 200, step: 10, unit: 'px' },
    },
    {
        group: 'Interactivity',
        key: 'debugMesh',
        flavors: allFlavors,
        help: 'Display mesh used to detect mouse interactions (voronoi cells).',
        type: 'boolean',
        required: false,
        defaultValue: defaults.debugMesh,
        control: { type: 'switch' },
    },
    {
        group: 'Interactivity',
        key: 'highlightAncestorNodes',
        flavors: allFlavors,
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
        group: 'Interactivity',
        key: 'highlightAncestorLinks',
        flavors: allFlavors,
        type: 'boolean',
        help: 'Highlight active node ancestor links.',
        required: false,
        control: { type: 'switch' },
    },
    {
        group: 'Interactivity',
        key: 'highlightDescendantLinks',
        flavors: allFlavors,
        type: 'boolean',
        help: 'Highlight active node descendant links.',
        required: false,
        control: { type: 'switch' },
    },
    {
        group: 'Interactivity',
        key: 'onNodeMouseEnter',
        flavors: allFlavors,
        type: '(node: ComputedNode, event: MouseEvent) => void',
        help: 'onMouseEnter handler for nodes.',
        required: false,
    },
    {
        group: 'Interactivity',
        key: 'onNodeMouseMove',
        flavors: allFlavors,
        type: '(node: ComputedNode, event: MouseEvent) => void',
        help: 'onMouseMove handler for nodes.',
        required: false,
    },
    {
        group: 'Interactivity',
        key: 'onNodeMouseLeave',
        flavors: allFlavors,
        type: '(node: ComputedNode, event: MouseEvent) => void',
        help: 'onMouseLeave handler for nodes.',
        required: false,
    },
    {
        group: 'Interactivity',
        key: 'onNodeClick',
        flavors: allFlavors,
        type: '(node: ComputedNode, event: MouseEvent) => void',
        help: 'onClick handler for nodes.',
        required: false,
    },
    tooltipPositionProperty({
        key: 'nodeTooltipPosition',
        flavors: allFlavors,
        defaultValue: svgDefaults.nodeTooltipPosition,
    }),
    tooltipAnchorProperty({
        key: 'nodeTooltipAnchor',
        flavors: allFlavors,
        defaultValue: defaults.nodeTooltipAnchor,
    }),
    {
        group: 'Interactivity',
        key: 'onLinkMouseEnter',
        flavors: ['svg'],
        type: '(node: ComputedLink, event: MouseEvent) => void',
        help: 'onMouseEnter handler for links (`useMesh` must be `false`).',
        required: false,
    },
    {
        group: 'Interactivity',
        key: 'onLinkMouseMove',
        flavors: ['svg'],
        type: '(node: ComputedLink, event: MouseEvent) => void',
        help: 'onMouseMove handler for links (`useMesh` must be `false`).',
        required: false,
    },
    {
        group: 'Interactivity',
        key: 'onLinkMouseLeave',
        flavors: ['svg'],
        type: '(node: ComputedLink, event: MouseEvent) => void',
        help: 'onMouseLeave handler for links (`useMesh` must be `false`).',
        required: false,
    },
    {
        group: 'Interactivity',
        key: 'onLinkClick',
        flavors: ['svg'],
        type: '(node: ComputedLink, event: MouseEvent) => void',
        help: 'onClick handler for links (`useMesh` must be `false`).',
        required: false,
    },
    {
        group: 'Interactivity',
        key: 'linkTooltip',
        flavors: ['svg'],
        type: 'LinkTooltip',
        help: 'Tooltip component for links (`useMesh` must be `false`).',
        required: false,
    },
    tooltipAnchorProperty({
        key: 'linkTooltipAnchor',
        flavors: ['svg'],
        defaultValue: svgDefaults.linkTooltipAnchor,
    }),
    ...commonAccessibilityProps(allFlavors),
    ...motionProperties(allFlavors, defaults),
]

export const groups = groupProperties(props)
