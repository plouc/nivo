import { commonDefaultProps, svgDefaultProps, IcicleOrientation } from '@nivo/icicle'
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
import { svgDefaultProps as defaults } from '@nivo/funnel'

const allFlavors: Flavor[] = ['svg', 'api']

const directions: IcicleOrientation[] = ['top', 'right', 'bottom', 'left']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
        help: 'Hierarchical chart data.',
        description: `
            Chart data, which must conform to this structure
            if using the default \`id\` and \`value\` accessors:

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
            to adjust both \`id\` and \`value\`. Meaning you can provide
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
            define id accessor, if string given,
            will use \`node[value]\`,
            if function given, it will be invoked
            for each node and will receive the node as
            first argument, it must return the node
            id (string).
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
        key: 'padding',
        help: 'Padding between rects, affected by zoom.',
        description: `
            If you want to have a constant space between rects
            when zooming, you can use a border instead, using
            the color of the background.
        `,
        type: 'number',
        required: false,
        flavors: allFlavors,
        defaultValue: svgDefaultProps.padding,
        group: 'Base',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    ...chartDimensions(allFlavors),
    themeProperty(['svg', 'api']),
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
        key: 'enableRectLabels',
        help: 'Enable/disable rect labels.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.enableRectLabels,
        control: { type: 'switch' },
        group: 'Rect labels',
    },
    {
        key: 'rectLabel',
        help: 'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data.',
        flavors: allFlavors,
        type: 'string | Function',
        required: false,
        defaultValue: commonDefaultProps.rectLabel,
        group: 'Rect labels',
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
    /*
    {
        key: 'rectLabelsOffset',
        help: `
            Define the ratio offset when centering a label.
            The offset affects the vertical postion.
        `,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.rectLabelsOffset,
        group: 'Rect labels',
        control: {
            type: 'range',
            min: 0.5,
            max: 2,
            step: 0.05,
        },
    },
    {
        key: 'rectLabelsSkipLength',
        help: `
            Skip label if corresponding rect's length is lower than provided value.
            "Length" is determined by width when direction is top or bottom,
            and by height when direction is left or right.
        `,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.rectLabelsSkipLength,
        group: 'Rect labels',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 900,
            step: 1,
        },
    },
    {
        key: 'rectLabelsSkipPercentage',
        help: `
            Skip label if corresponding rect's relative size is lower than provided value.
            The size is relative to the root node considered as 100%.
            This value is a percentage.
        `,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.rectLabelsSkipPercentage,
        group: 'Rect labels',
        control: {
            type: 'range',
            min: 0,
            max: 100,
            step: 1,
        },
    },
    */
    {
        key: 'rectLabelsTextColor',
        help: 'Defines how to compute rect label text color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: commonDefaultProps.rectLabelsTextColor,
        control: { type: 'inheritedColor' },
        group: 'Rect labels',
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
                nodes:  ComputedDatum<RawDatum>[]
                baseOffsetLeft: number
                baseOffsetTop:  number
            }
            \`\`\`
        `,
        required: false,
        type: 'Array<string | Function>',
        defaultValue: commonDefaultProps.layers,
    },
    isInteractive({
        flavors: ['svg'],
        defaultValue: commonDefaultProps.isInteractive,
    }),
    {
        key: 'enableZooming',
        help: 'Enable/disable zooming by clicking on nodes.',
        flavors: ['svg'],
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
        defaultValue: defaults.zoomMode,
        flavors: ['svg'],
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
        flavors: ['svg'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Tooltip custom component',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML element and will receive
            the following data:
            \`\`\`
            {
                id:         string | number,
                value:      number,
                depth:      number,
                color:      string,
                name:       string
                loc:        number
                percentage: number
                // the parent datum
                ancestor:   object
            }
            \`\`\`
            You can also customize the style of the tooltip
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'custom tooltip example',
        flavors: ['svg'],
        group: 'Interactivity',
        required: false,
        help: 'Showcase custom tooltip component.',
        type: 'boolean',
        control: { type: 'switch' },
    },
    {
        key: 'onClick',
        flavors: ['svg'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'onClick handler',
        description: `
            onClick handler, will receive node data as first argument
            & event as second one. The node data has the following shape:

            \`\`\`
            {
                id:         string | number,
                value:      number,
                depth:      number,
                color:      string,
                name:       string
                loc:        number
                percentage: number
                // the parent datum
                ancestor:   object
            }
            \`\`\`
        `,
    },
    {
        key: 'onWheel',
        flavors: ['svg'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'onWheel handler',
        description: `
            onWheel handler, will receive node data as first argument
            & event as second one. The node data has the following shape:

            \`\`\`
            {
                id:         string | number,
                value:      number,
                depth:      number,
                color:      string,
                name:       string
                loc:        number
                percentage: number
                // the parent datum
                ancestor:   object
            }
            \`\`\`
        `,
    },
    {
        key: 'onContextMenu',
        flavors: ['svg'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'onContextMenu handler',
        description: `
            onContextMenu handler, will receive node data as first argument
            & event as second one. The node data has the following shape:

            \`\`\`
            {
                id:         string | number,
                value:      number,
                depth:      number,
                color:      string,
                name:       string
                loc:        number
                percentage: number
                // the parent datum
                ancestor:   object
            }
            \`\`\`
        `,
    },
    ...commonAccessibilityProps(['svg']),
    ...motionProperties(['svg'], svgDefaultProps),
]

export const groups = groupProperties(props)
