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
    ordinalColors,
    isInteractive,
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
            type: 'range',
            unit: 'px',
            min: 0,
            max: 36,
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
            You can also use this to insert extra layers
            to the chart, the extra layer must be a function.

            The layer component which will receive the chart's
            context & computed data and must return a valid SVG element
            for the \`Icicle\` component.

            The context passed to layers has the following structure:

            \`\`\`
            {
                nodes: ComputedDatum[]
                zoom: (nodePath: string | null) => void
            }
            \`\`\`
        `,
        required: false,
        type: 'Array<string | Function>',
        defaultValue: commonDefaultProps.layers,
    },
    {
        key: 'nodeComponent',
        group: 'Customization',
        help: 'Override the default node component.',
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
    {
        key: 'onMouseEnter',
        flavors: ['svg', 'html'],
        group: 'Interactivity',
        type: '(node: ComputedDatum, event: MouseEvent) => void',
        required: false,
        help: 'onMouseEnter handler',
    },
    {
        key: 'onMouseMove',
        flavors: ['svg', 'html'],
        group: 'Interactivity',
        type: '(node: ComputedDatum, event: MouseEvent) => void',
        required: false,
        help: 'onMouseMove handler',
    },
    {
        key: 'onMouseLeave',
        flavors: ['svg', 'html'],
        group: 'Interactivity',
        type: '(node: ComputedDatum, event: MouseEvent) => void',
        required: false,
        help: 'onMouseMove handler',
    },
    {
        key: 'onClick',
        flavors: ['svg', 'html'],
        group: 'Interactivity',
        type: '(node: ComputedDatum, event: MouseEvent) => void',
        required: false,
        help: 'onClick handler',
    },
    {
        key: 'onWheel',
        flavors: ['svg', 'html'],
        group: 'Interactivity',
        type: '(node: ComputedDatum, event: WheelEvent) => void',
        required: false,
        help: 'onWheel handler',
    },
    {
        key: 'onContextMenu',
        flavors: ['svg', 'html'],
        group: 'Interactivity',
        type: '(node: ComputedDatum, event: MouseEvent) => void',
        required: false,
        help: 'onContextMenu handler',
    },
    ...commonAccessibilityProps(['svg', 'html']),
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
