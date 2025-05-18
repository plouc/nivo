import { areaBumpSvgDefaultProps as defaults } from '@nivo/bump'
import {
    themeProperty,
    defsProperties,
    groupProperties,
    motionProperties,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    ordinalColors,
    blendMode,
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
        help: 'Chart data.',
        description: `
            Chart data, which must conform to this structure:

            \`\`\`
            {
                id:   string
                data: {
                    x: number | string
                    y: number
                }[]
            }[]
            \`\`\`

            This component assumes that every serie contains all
            x values sorted the same way they should appear on the chart.
            
            As this component is a TypeScript generic, it is possible to customize
            the datum using the \`Datum\` arg, and it's also possible to add
            some extra properties to the series by passing \`ExtraProps\`.
        `,
        required: true,
        type: 'AreaBumpSerie<Datum, ExtraProps>[]',
        flavors: allFlavors,
    },
    ...chartDimensions(allFlavors),
    {
        key: 'align',
        group: 'Base',
        help: `Chart alignment.`,
        type: 'string',
        required: false,
        defaultValue: defaults.align,
        flavors: allFlavors,
        control: {
            type: 'choices',
            choices: [
                { label: 'start', value: 'start' },
                { label: 'middle', value: 'middle' },
                { label: 'end', value: 'end' },
            ],
        },
    },
    {
        key: 'interpolation',
        group: 'Base',
        type: 'string',
        help: `Area interpolation.`,
        required: false,
        defaultValue: defaults.interpolation,
        flavors: allFlavors,
        control: {
            type: 'radio',
            choices: [
                { label: 'smooth', value: 'smooth' },
                { label: 'linear', value: 'linear' },
            ],
        },
    },
    {
        key: 'spacing',
        group: 'Base',
        type: 'number',
        help: 'Spacing.',
        required: false,
        flavors: allFlavors,
        defaultValue: defaults.spacing,
        control: {
            type: 'range',
            min: 0,
            max: 32,
        },
    },
    {
        key: 'xPadding',
        help: 'X padding.',
        group: 'Base',
        type: 'number',
        required: false,
        defaultValue: defaults.xPadding,
        flavors: allFlavors,
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    chartRef(['svg']),
    themeProperty(allFlavors),
    ordinalColors({ flavors: allFlavors, defaultValue: defaults.colors }),
    blendMode({
        target: 'areas',
        flavors: ['svg'],
        defaultValue: defaults.blendMode,
    }),
    {
        key: 'fillOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        required: false,
        help: 'Area fill opacity.',
        defaultValue: defaults.fillOpacity,
        flavors: allFlavors,
        control: { type: 'opacity' },
    },
    {
        key: 'activeFillOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        required: false,
        help: 'Area fill opacity for active series.',
        defaultValue: defaults.activeFillOpacity,
        flavors: allFlavors,
        control: { type: 'opacity' },
    },
    {
        key: 'inactiveFillOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        required: false,
        help: 'Area fill opacity for inactive series.',
        defaultValue: defaults.inactiveFillOpacity,
        flavors: allFlavors,
        control: { type: 'opacity' },
    },
    {
        key: 'borderWidth',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        required: false,
        help: 'Area border width.',
        defaultValue: defaults.borderWidth,
        flavors: allFlavors,
        control: { type: 'lineWidth' },
    },
    {
        key: 'activeBorderWidth',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        required: false,
        help: 'Area border width for active series.',
        defaultValue: defaults.activeBorderWidth,
        flavors: allFlavors,
        control: { type: 'lineWidth' },
    },
    {
        key: 'inactiveBorderWidth',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        required: false,
        help: 'Area border width for inactive series.',
        defaultValue: defaults.inactiveBorderWidth,
        flavors: allFlavors,
        control: { type: 'lineWidth' },
    },
    {
        key: 'borderColor',
        group: 'Style',
        type: 'string | object | Function',
        required: false,
        help: 'Method to compute area border color.',
        defaultValue: defaults.borderColor,
        flavors: allFlavors,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'borderOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        required: false,
        help: 'Area border opacity.',
        flavors: allFlavors,
        defaultValue: defaults.borderOpacity,
        control: { type: 'opacity' },
    },
    {
        key: 'activeBorderOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        required: false,
        help: 'Area border opacity for active series.',
        defaultValue: defaults.activeBorderOpacity,
        flavors: allFlavors,
        control: { type: 'opacity' },
    },
    {
        key: 'inactiveBorderOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        required: false,
        help: 'Area border opacity for inactive series.',
        defaultValue: defaults.inactiveBorderOpacity,
        flavors: allFlavors,
        control: { type: 'opacity' },
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'startLabel',
        group: 'Labels',
        type: 'boolean | (serie: AreaBumpSerie) => string',
        required: false,
        help: 'Start label, use a boolean to enable/disable, or a function to customize its text.',
        defaultValue: defaults.startLabel,
        flavors: allFlavors,
        control: { type: 'switch' },
    },
    {
        key: 'startLabelPadding',
        group: 'Labels',
        type: 'number',
        required: false,
        help: 'Define area start label padding.',
        defaultValue: defaults.startLabelPadding,
        flavors: allFlavors,
        control: {
            type: 'range',
            min: 0,
            max: 30,
        },
    },
    {
        key: 'startLabelTextColor',
        group: 'Labels',
        type: 'InheritedColorConfig<AreaBumpComputedSerie>',
        required: false,
        help: 'Method to compute start label text color.',
        flavors: allFlavors,
        defaultValue: defaults.startLabelTextColor,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'endLabel',
        group: 'Labels',
        type: 'boolean | (serie: AreaBumpSerie) => string',
        required: false,
        help: 'End label, use a boolean to enable/disable, or a function to customize its text.',
        defaultValue: defaults.endLabel,
        flavors: allFlavors,
        control: { type: 'switch' },
    },
    {
        key: 'endLabelPadding',
        group: 'Labels',
        type: 'number',
        required: false,
        help: 'Define area end label padding.',
        defaultValue: defaults.endLabelPadding,
        flavors: allFlavors,
        control: {
            type: 'range',
            min: 0,
            max: 30,
        },
    },
    {
        key: 'endLabelTextColor',
        help: 'Method to compute end label text color.',
        type: 'InheritedColorConfig<AreaBumpComputedSerie>',
        required: false,
        defaultValue: defaults.endLabelTextColor,
        group: 'Labels',
        flavors: allFlavors,
        control: { type: 'inheritedColor' },
    },
    ...chartGrid({
        flavors: allFlavors,
        xDefault: defaults.enableGridX,
        y: false,
    }),
    ...axes({ flavors: allFlavors, exclude: ['right', 'left'] }),
    isInteractive({
        flavors: ['svg'],
        defaultValue: defaults.isInteractive,
    }),
    {
        key: 'defaultActiveSerieIds',
        group: 'Interactivity',
        type: 'string[]',
        help: 'Default active serie ids.',
        required: false,
        flavors: allFlavors,
    },
    {
        key: 'onMouseEnter',
        group: 'Interactivity',
        type: '(serie: AreaBumpComputedSerie, event: MouseEvent) => void',
        help: 'onMouseEnter handler.',
        required: false,
        flavors: allFlavors,
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        type: '(serie: AreaBumpComputedSerie, event: MouseEvent) => void',
        help: 'onMouseMove handler.',
        required: false,
        flavors: allFlavors,
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        type: '(serie: AreaBumpComputedSerie, event: MouseEvent) => void',
        help: 'onMouseLeave handler.',
        required: false,
        flavors: allFlavors,
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        type: '(serie: AreaBumpComputedSerie, event: MouseEvent) => void',
        help: 'onClick handler.',
        required: false,
        flavors: allFlavors,
    },
    {
        key: 'tooltip',
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom tooltip component.',
        flavors: allFlavors,
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML
            element and will receive the series's data.
        `,
    },
    ...motionProperties(['svg'], defaults),
]

export const groups = groupProperties(props)
