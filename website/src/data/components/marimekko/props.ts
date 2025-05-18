import { commonDefaultProps, svgDefaultProps, offsetById } from '@nivo/marimekko'
import {
    themeProperty,
    defsProperties,
    groupProperties,
    getLegendsProps,
    motionProperties,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    ordinalColors,
    chartGrid,
    axes,
    isInteractive,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
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
        flavors: allFlavors,
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
        flavors: allFlavors,
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
        flavors: allFlavors,
        help: 'Data dimensions configuration.',
        type: '{ id: string, value: string | (datum: RawDatum) => number }',
        required: true,
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
        key: 'layout',
        help: `How to display bars.`,
        type: 'string',
        flavors: allFlavors,
        required: false,
        defaultValue: commonDefaultProps.layout,
        group: 'Base',
        control: {
            type: 'radio',
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
        flavors: allFlavors,
        required: false,
        group: 'Base',
        defaultValue: commonDefaultProps.offset,
        control: {
            type: 'choices',
            choices: Object.keys(offsetById).map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'outerPadding',
        help: 'Space before the first bar and after the last one.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.outerPadding,
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 20,
            unit: 'px',
        },
    },
    {
        key: 'innerPadding',
        help: 'Space between bars.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.innerPadding,
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 20,
            unit: 'px',
        },
    },
    ...chartDimensions(allFlavors),
    chartRef(['svg']),
    themeProperty(allFlavors),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: commonDefaultProps.colors,
    }),
    ...defsProperties('Style', allFlavors),
    {
        key: 'showcase pattern usage',
        flavors: ['svg'],
        help: 'Patterns.',
        required: false,
        description: `
            You can use \`defs\` and \`fill\` properties
            to use patterns, see
            [dedicated guide](self:/guides/patterns)
            for further information.
        `,
        type: 'boolean',
        control: { type: 'switch' },
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Slices border width.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.borderWidth,
        control: { type: 'lineWidth' },
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: commonDefaultProps.borderColor,
        control: { type: 'inheritedColor' },
        group: 'Style',
    },
    ...chartGrid({
        flavors: allFlavors,
        values: true,
        xDefault: commonDefaultProps.enableGridX,
        yDefault: commonDefaultProps.enableGridY,
    }),
    ...axes({ flavors: allFlavors }),
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        flavors: allFlavors,
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
        defaultValue: svgDefaultProps.layers,
    },
    isInteractive({
        flavors: ['svg'],
        defaultValue: commonDefaultProps.isInteractive,
    }),
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
        flavors: allFlavors,
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
        flavors: allFlavors,
        required: false,
        type: 'boolean',
        control: { type: 'switch' },
        group: 'Interactivity',
    },
    ...motionProperties(['svg'], svgDefaultProps),
    {
        key: 'legends',
        flavors: ['svg'],
        type: 'Legend[]',
        help: `Optional chart's legends.`,
        group: 'Legends',
        required: false,
        control: {
            type: 'array',
            props: getLegendsProps(['svg']),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            getItemTitle: (index, legend: any) =>
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
                onClick: (data: any) => {
                    console.log(JSON.stringify(data, null, '    '))
                },
            },
        },
    },
]

export const groups = groupProperties(props)
