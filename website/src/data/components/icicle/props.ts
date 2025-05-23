import { commonDefaultProps, svgDefaultProps, IcicleOrientation } from '@nivo/icicle'
import { RECT_TRANSITION_MODES } from '@nivo/rects'
import {
    groupProperties,
    defsProperties,
    motionProperties,
    themeProperty,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    ordinalColors,
    isInteractive,
    interactionHandlers,
    commonAccessibilityProps,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'html', 'api']

const directions: IcicleOrientation[] = ['top', 'right', 'bottom', 'left']

const transitionModeOptions = RECT_TRANSITION_MODES.map(mode => ({
    label: mode,
    value: mode,
}))

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
        help: 'Hierarchical chart data.',
        description: `
            Chart data, which must conform to this structure
            if using the default \`identity\` and \`value\` accessors:

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
            to adjust both \`identity\` and \`value\`. Meaning you can provide
            a completely different data structure as long as \`id\` and \`value\`
            return the appropriate values.

            Immutability of the data is important as re-computations
            depends on it.
        `,
        type: 'readonly Datum[]',
        required: true,
    },
    {
        key: 'identity',
        group: 'Base',
        flavors: allFlavors,
        help: 'Id accessor.',
        description: `
            Define id accessor, if a string given, will use \`node[value]\`,
            if a function is provided, it will be invoked for each node
            and will receive the node as first argument, it must return
            the node id (string).
            
            You can have duplicate ids in the data, internally, we compute
            the full path of the node to generate a unique id.
        `,
        type: 'PropertyAccessor<Datum, string>',
        required: false,
        defaultValue: commonDefaultProps.identity,
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
        type: 'PropertyAccessor<Datum, number>',
        required: false,
        defaultValue: commonDefaultProps.value,
    },
    {
        key: 'sort',
        group: 'Base',
        type: `NodesSorting`,
        flavors: allFlavors,
        required: false,
        help: 'Define how to sort the nodes.',
        control: {
            type: 'radio',
            columns: 3,
            choices: [
                { label: 'input', value: 'input' },
                { label: 'asc', value: 'asc' },
                { label: 'desc', value: 'desc' },
            ],
        },
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
        key: 'orientation',
        group: 'Base',
        flavors: allFlavors,
        help: 'Chart orientation.',
        description: `
            Define the orientation of the chart:
            - \`top\`: Root at the top, children cascade downward, *standard icicle*.
            - \`right\`: Root at the right, children grow to the left, *right-to-left icicle*.
            - \`bottom\`: Root at the bottom, children grow upward, *flame chart*.
            - \`left\`: Root at the left, children grow to the right, *left-to-right icicle*.
        `,
        required: false,
        defaultValue: commonDefaultProps.orientation,
        type: directions.map(d => `'${d}'`).join(' | '),
        control: {
            type: 'cartesianOrientation',
        },
    },
    {
        key: 'gapX',
        help: 'Horizontal spacing between nodes.',
        description: `
            Please note that it's also going to act as an horizontal padding
            for the whole chart, using half this value.
        `,
        type: 'number',
        required: false,
        flavors: allFlavors,
        defaultValue: svgDefaultProps.gapX,
        group: 'Base',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    {
        key: 'gapY',
        help: 'Vertical spacing between nodes.',
        description: `
            Please note that it's also going to act as a vertical padding
            for the whole chart, using half this value.
        `,
        type: 'number',
        required: false,
        flavors: allFlavors,
        defaultValue: svgDefaultProps.gapY,
        group: 'Base',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    ...chartDimensions(allFlavors),
    chartRef(['svg', 'canvas']),
    themeProperty(allFlavors),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: commonDefaultProps.colors,
    }),
    {
        key: 'colorBy',
        help: `Define the property to use to assign a color to rects.`,
        flavors: allFlavors,
        description: `
            When using \`id\`, each node will get a new color,
            and when using \`depth\` the nodes' color will depend on their depth.
        `,
        type: `'id' | 'depth'`,
        required: false,
        defaultValue: commonDefaultProps.colorBy,
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
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.inheritColorFromParent,
        control: { type: 'switch' },
        group: 'Style',
    },
    {
        key: 'childColor',
        help: 'Defines how to compute child nodes color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: commonDefaultProps.childColor,
        control: { type: 'inheritedColor' },
        group: 'Style',
    },
    {
        key: 'borderRadius',
        help: 'Rectangle border radius.',
        type: 'number',
        flavors: allFlavors,
        required: false,
        defaultValue: commonDefaultProps.borderRadius,
        group: 'Style',
        control: {
            type: 'borderRadius',
        },
    },
    {
        key: 'borderWidth',
        help: 'Node border width.',
        description: `
            Please note that the border behaves differently
            beween svg and html, in svg, the border is centered,
            while we use \`box-sizing: border-box\` in html.
        `,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.borderWidth,
        control: { type: 'lineWidth' },
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Defines how to compute rects border color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: commonDefaultProps.borderColor,
        control: { type: 'inheritedColor' },
        group: 'Style',
    },
    ...defsProperties('Style', ['svg', 'api']),
    {
        key: 'showcase pattern usage',
        flavors: ['svg'],
        help: 'Patterns.',
        description: `
            You can use \`defs\` and \`fill\` properties
            to use patterns, see
            [dedicated guide](self:/guides/patterns)
            for further information.
        `,
        required: false,
        type: 'boolean',
        control: { type: 'switch' },
        group: 'Style',
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
        help: 'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data.',
        flavors: allFlavors,
        type: 'string | Function',
        required: false,
        defaultValue: commonDefaultProps.label,
        group: 'Labels',
        control: {
            type: 'choices',
            choices: ['id', 'value', 'formattedValue', `d => \`\${d.id} (\${d.value})\``].map(
                choice => ({
                    label: choice,
                    value: choice,
                })
            ),
        },
    },
    {
        key: 'labelBoxAnchor',
        help: 'Defines where labels are placed within their corresponding rectangle.',
        flavors: allFlavors,
        type: 'BoxAnchor',
        required: false,
        defaultValue: commonDefaultProps.labelBoxAnchor,
        group: 'Labels',
        control: {
            type: 'boxAnchor',
        },
    },
    {
        key: 'labelAlign',
        type: `TextAlign | 'auto'`,
        required: false,
        defaultValue: commonDefaultProps.labelAlign,
        help: 'Label alignment, `auto` assumes no rotation.',
        flavors: allFlavors,
        group: 'Labels',
        control: {
            type: 'radio',
            columns: 4,
            choices: [
                { label: 'auto', value: 'auto' },
                { label: 'start', value: 'start' },
                { label: 'center', value: 'center' },
                { label: 'end', value: 'end' },
            ],
        },
    },
    {
        key: 'labelBaseline',
        type: `TextBaseline | 'auto'`,
        required: false,
        defaultValue: commonDefaultProps.labelBaseline,
        help: 'Label baseline, `auto` assumes no rotation.',
        flavors: allFlavors,
        group: 'Labels',
        control: {
            type: 'radio',
            columns: 4,
            choices: [
                { label: 'auto', value: 'auto' },
                { label: 'top', value: 'top' },
                { label: 'center', value: 'center' },
                { label: 'bottom', value: 'bottom' },
            ],
        },
    },
    {
        key: 'labelPaddingX',
        help: `Label y padding.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.labelPaddingX,
        group: 'Labels',
        control: {
            type: 'range',
            unit: 'px',
            min: -40,
            max: 40,
        },
    },
    {
        key: 'labelPaddingY',
        help: `Label y padding.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.labelPaddingY,
        group: 'Labels',
        control: {
            type: 'range',
            unit: 'px',
            min: -40,
            max: 40,
        },
    },
    {
        key: 'labelRotation',
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.labelRotation,
        help: `Label rotation`,
        flavors: allFlavors,
        group: 'Labels',
        control: {
            type: 'angle',
            start: 90,
            marker: 'diameter',
        },
    },
    {
        key: 'labelSkipWidth',
        help: `Skip label if rect width is smaller than this value.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.labelSkipWidth,
        group: 'Labels',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'labelSkipHeight',
        help: `Skip label if rect height is smaller than this value.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.labelSkipHeight,
        group: 'Labels',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'labelTextColor',
        help: 'Defines how to compute label text color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: commonDefaultProps.labelTextColor,
        control: { type: 'inheritedColor' },
        group: 'Labels',
    },
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        flavors: ['svg'],
        description: `
            You can also use this to insert extra layers, although for
            this chart type, you might want to just use a custom
             \`nodeComponent\` and remove the \`labels\` layer.

            The custom layer will receive the chart's computed data 
            and context and must return a valid SVG/HTML element depending
            on the flavor you are using.

            The context passed to layers has the following structure:

            \`\`\`
            {
                nodes: IcicleNode[]
                zoom: (nodePath: string | null) => void
            }
            \`\`\`
        `,
        required: false,
        type: 'readonly Array<IcicleLayerId | IcicleCustomLayer>',
        defaultValue: commonDefaultProps.layers,
    },
    {
        key: 'nodeComponent',
        group: 'Customization',
        help: 'Override the default node component.',
        description: `
            In case you want to maintain keyboard navigation support,
            you'll need to *lift up* the \`focus\` method of the node
            via a \`ref\`, so that the chart can call it when needed.
            
            You might want to have a look at the default node components,
            \`RectNodeSvg\` and \`RectNodeHtml\` to see how it's done
            in the \`@nivo/rects\` package.
        `,
        flavors: ['svg', 'html'],
        required: false,
        type: 'RectNode',
        defaultValue: `RectNodeSvg | RectNodeHtml`,
    },
    isInteractive({
        flavors: ['svg', 'html'],
        defaultValue: commonDefaultProps.isInteractive,
    }),
    {
        key: 'enableZooming',
        help: 'Enable/disable zooming by clicking on nodes.',
        flavors: ['svg', 'html'],
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.enableZooming,
        control: { type: 'switch' },
        group: 'Interactivity',
    },
    {
        key: 'zoomMode',
        group: 'Interactivity',
        help: `Define the behavior of zooming.`,
        type: `'lateral' | 'global'`,
        required: false,
        defaultValue: commonDefaultProps.zoomMode,
        flavors: ['svg', 'html'],
        control: {
            type: 'radio',
            choices: [
                { label: 'lateral', value: 'lateral' },
                { label: 'global', value: 'global' },
            ],
        },
    },
    {
        key: 'tooltip',
        flavors: ['svg', 'html'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Tooltip custom component',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML element and will receive
            the computed node as first argument.

            You can also customize the style of the tooltip
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'custom tooltip example',
        flavors: ['svg', 'html'],
        group: 'Interactivity',
        required: false,
        help: 'Showcase custom tooltip component.',
        type: 'boolean',
        control: { type: 'switch' },
    },
    ...interactionHandlers(
        [
            { type: 'onMouseEnter' },
            { type: 'onMouseMove' },
            { type: 'onMouseLeave' },
            { type: 'onClick' },
            { type: 'onDoubleClick' },
            { type: 'onFocus' },
            { type: 'onBlur' },
            { type: 'onKeyDown' },
            { type: 'onWheel' },
            { type: 'onContextMenu' },
        ],
        'IcicleNode',
        ['svg', 'html']
    ),
    {
        key: 'isFocusable',
        flavors: ['svg', 'html'],
        required: false,
        group: 'Accessibility',
        help: 'Make the root element and each node item focusable, for keyboard navigation.',
        description: `
            If enabled, focusing will also reveal the tooltip if \`isInteractive\` is \`true\`,
            when a node gains focus and hide it on blur.
            
            Also note that if this option is enabled, focusing a node will reposition the tooltip
            at a fixed location.
        `,
        type: 'boolean',
        control: { type: 'switch' },
        defaultValue: svgDefaultProps.isFocusable,
    },
    ...commonAccessibilityProps(['svg', 'html'], svgDefaultProps),
    {
        key: 'nodeRole',
        flavors: allFlavors,
        required: false,
        group: 'Accessibility',
        help: 'Role for node items.',
        type: 'string | (node: ComputedNode) => string',
        defaultValue: svgDefaultProps.nodeRole,
    },
    {
        key: 'nodeAriaLabel',
        flavors: allFlavors,
        required: false,
        group: 'Accessibility',
        help: '[aria-label](https://www.w3.org/TR/wai-aria/#aria-label) for nodes.',
        type: '(node: IcicleNode) => string',
    },
    {
        key: 'nodeAriaLabelledBy',
        flavors: allFlavors,
        required: false,
        group: 'Accessibility',
        help: '[aria-labelledby](https://www.w3.org/TR/wai-aria/#aria-labelledby) for nodes.',
        type: '(node: IcicleNode) => string',
    },
    {
        key: 'nodeAriaDescribedBy',
        flavors: allFlavors,
        required: false,
        group: 'Accessibility',
        help: '[aria-describedby](https://www.w3.org/TR/wai-aria/#aria-describedby) for nodes.',
        type: '(node: IcicleNode) => string',
    },
    {
        key: 'nodeAriaHidden',
        flavors: allFlavors,
        required: false,
        group: 'Accessibility',
        help: '[aria-hidden](https://www.w3.org/TR/wai-aria/#aria-hidden) for nodes.',
        type: '(node: IcicleNode) => boolean',
    },
    ...motionProperties(['svg', 'html'], svgDefaultProps),
    {
        key: 'animateOnMount',
        group: 'Motion',
        help: `If enabled, animate elements when the chart is mounted.`,
        type: `boolean`,
        required: false,
        defaultValue: svgDefaultProps.animateOnMount,
        flavors: ['svg', 'html'],
    },
    {
        key: 'rectsTransitionMode',
        group: 'Motion',
        help: `Define the transitions for rects when appearing/disappearing.`,
        type: `RectTransitionMode`,
        required: false,
        defaultValue: svgDefaultProps.rectsTransitionMode,
        flavors: ['svg', 'html'],
        control: {
            type: 'choices',
            choices: transitionModeOptions,
        },
    },
    {
        key: 'labelsTransitionMode',
        group: 'Motion',
        help: `Define the transitions for labels when appearing/disappearing.`,
        type: `RectTransitionMode`,
        required: false,
        defaultValue: svgDefaultProps.labelsTransitionMode,
        flavors: ['svg', 'html'],
        control: {
            type: 'choices',
            choices: transitionModeOptions,
        },
    },
]

export const groups = groupProperties(props)
