import { defaultProps as defaults, offsetById } from '@nivo/marimekko'
import {
    themeProperty,
    defsProperties,
    groupProperties,
    getLegendsProps,
    motionProperties,
    axesProperties,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data, which should be immutable.',
        description: `
            The data doesn't have to conform to a specific schema,
            it's gonna depend on how you configure \`id\`, \`value\`
            and \`dimensions\`.
        `,
        type: 'RawDatum[]',
        required: true,
    },
    {
        key: 'id',
        group: 'Base',
        help: 'ID accessor.',
        description: `
            Define how to access the ID of each datum,
            by default, nivo will look for the \`id\` property.
        `,
        type: 'string | (datum: RawDatum): string | number',
        required: true,
    },
    {
        key: 'value',
        group: 'Base',
        help: 'Value accessor.',
        description: `
            Define how to access the value of each datum,
            which will dictate the thickness of the bars,
            by default, nivo will look for the \`value\` property.
        `,
        type: 'string | (datum: RawDatum): number',
        required: true,
    },
    {
        key: 'dimensions',
        group: 'Base',
        help: 'Data dimensions configuration.',
        type: '{ id: string, value: string | (datum: RawDatum) => number }',
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
        help: `How to display bars.`,
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
        key: 'offset',
        help: 'Offset type.',
        type: 'OffsetId',
        required: false,
        controlType: 'choices',
        group: 'Base',
        defaultValue: defaults.offset,
        controlOptions: {
            choices: Object.keys(offsetById).map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'outerPadding',
        help: 'Space before the first bar and after the last one.',
        type: 'number',
        required: false,
        defaultValue: defaults.outerPadding,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 20,
            unit: 'px',
        },
    },
    {
        key: 'innerPadding',
        help: 'Space between bars.',
        type: 'number',
        required: false,
        defaultValue: defaults.innerPadding,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 20,
            unit: 'px',
        },
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using
            \`<ResponsiveMarimekko />\`.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        enableControlForFlavors: ['api'],
        help: 'Chart height.',
        description: `
            not required if using
            \`<ResponsiveMarimekko />\`.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
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
        help: 'Defines color range.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'ordinalColors',
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
        type: 'boolean',
        controlType: 'switch',
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Slices border width.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.borderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    ...axesProperties(),
    {
        key: 'enableGridX',
        help: 'Enable/disable x grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridX,
        controlType: 'switch',
        group: 'Grid & Axes',
    },
    {
        key: 'gridXValues',
        group: 'Grid & Axes',
        help: 'Specify values to use for vertical grid lines.',
        type: 'number[]',
        required: false,
    },
    {
        key: 'enableGridY',
        help: 'Enable/disable y grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridY,
        controlType: 'switch',
        group: 'Grid & Axes',
    },
    {
        key: 'gridYValues',
        group: 'Grid & Axes',
        help: 'Specify values to use for horizontal grid lines.',
        type: 'number[]',
        required: false,
    },
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer must be a component.
            
            The layer component which will receive the chart's
            context & computed data and must return a valid SVG element
            for the \`Marimekko\` component.
            
            The props passed to layers have the following structure:
            
            \`\`\`
            {
                data: ComputedDatum<RawDatum>[]
                bars: BarDatum<RawDatum>[]
                thicknessScale: ScaleLinear<number, number>
                dimensionsScale: ScaleLinear<number, number>
            }
            \`\`\`
        `,
        required: false,
        type: 'Array<string | Function>',
        defaultValue: defaults.layers,
    },
    {
        key: 'isInteractive',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
    },
    {
        key: 'onClick',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'onClick handler, it receives target bar data and mouse event.',
        type: '(bar: BarDatum<RawDatum>, event: MouseEvent) => void',
        required: false,
    },
    {
        key: 'onMouseEnter',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'onMouseEnter handler, it receives target bar data and mouse event.',
        type: '(bar: BarDatum<RawDatum>, event: MouseEvent) => void',
        required: false,
    },
    {
        key: 'onMouseMove',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'onMouseMove handler, it receives target bar data and mouse event.',
        type: '(bar: BarDatum<RawDatum>, event: MouseEvent) => void',
        required: false,
    },
    {
        key: 'onMouseLeave',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'onMouseLeave handler, it receives target bar data and mouse event.',
        type: '(bar: BarDatum<RawDatum>, event: MouseEvent) => void',
        required: false,
    },
    {
        key: 'tooltip',
        group: 'Interactivity',
        type: 'Component',
        required: false,
        help: 'Custom tooltip component',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML element and will receive
            the following props:
            
            \`\`\`
            {
                bar: BarDatum<RawDatum>
            }
            \`\`\`
            
            You can also customize the style of the tooltip using
            the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'custom tooltip example',
        help: 'Showcase custom tooltip.',
        type: 'boolean',
        controlType: 'switch',
        group: 'Interactivity',
    },
    ...motionProperties(['svg'], defaults, 'react-spring'),
    {
        key: 'legends',
        flavors: ['svg'],
        type: 'Legend[]',
        help: `Optional chart's legends.`,
        group: 'Legends',
        controlType: 'array',
        controlOptions: {
            props: getLegendsProps(['svg']),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            getItemTitle: (index, legend) =>
                `legend[${index}]: ${legend.anchor}, ${legend.direction}`,
            defaults: {
                anchor: 'top-left',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 0,
                symbolSize: 20,
                itemDirection: 'left-to-right',
                onClick: data => {
                    alert(JSON.stringify(data, null, '    '))
                },
            },
        },
    },
]

export const groups = groupProperties(props)
