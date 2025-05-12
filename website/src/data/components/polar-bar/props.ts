import { defaultProps, svgDefaultProps } from '@nivo/polar-bar'
import { arcTransitionModes } from '@nivo/arcs'
import {
    themeProperty,
    motionProperties,
    groupProperties,
    polarAxisProperty,
    getLegendsProps,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    ordinalColors,
    isInteractive,
    commonAccessibilityProps,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        type: 'readonly PolarBarDatum[]',
        required: true,
        help: 'Chart data.',
        description: `
            For example, given this config:
            \`\`\`
            [
                { lang: 'javascript', john: 12, sarah: 32, bob: 27 },
                { lang: 'golang', john: 25, sarah: 15, bob: 3 },
                { lang: 'python', john: 5, sarah: 22, bob: 31 },
                { lang: 'java', john: 19, sarah: 17, bob: 9 }
            ]
            keys: ['john', 'sarah', 'bob']
            indexBy: 'lang'
            \`\`\`
            We'll have a chart representing programing
            skills for each user by language,
            each language will be represented by a slice,
            with each user being a different color.
            (4 slices, each segmented in 3 parts).
        `,
        flavors: allFlavors,
    },
    {
        key: 'indexBy',
        group: 'Base',
        help: 'Key to use to index the data.',
        description: `
            Key to use to index the data,
            this key must exist in each data item.

            You can also provide a function which will
            receive the data item and must return the desired index.
        `,
        type: 'string | (datum: RawDatum): string | number',
        flavors: allFlavors,
        required: false,
        defaultValue: defaultProps.indexBy,
    },
    {
        key: 'keys',
        group: 'Base',
        help: 'Keys to use to determine each series.',
        type: 'string[]',
        flavors: allFlavors,
        required: false,
        defaultValue: defaultProps.keys,
    },
    {
        key: 'valueSteps',
        group: 'Base',
        type: 'number | readonly number[]',
        required: false,
        help: 'Define how many steps (ticks) to use for the value scale.',
        description: `
            This is going to affect the circular grid's rings, if \`enableCircularGrid\`
            is \`true\`, as well as the radial axes ticks.

            If a number is provided, we'll attempt to divide the scale in that many steps,
            but it's not guaranteed that the scale will have exactly that many ticks,
            it might be adjusted to have nice values.
    
            If an array of numbers if provided, we'll use these exact values as steps,
            but if some values are out of the scale range, we'll clamp them.
        `,
        flavors: allFlavors,
    },
    {
        key: 'adjustValueRange',
        group: 'Base',
        type: 'boolean',
        required: false,
        help: 'Extends the range of values so that it starts and ends on nice round values.',
        description: `
            If \`valueSteps\` is not set, or is an array of numbers,
            the range is going to be automatically adjusted.
            
            If \`valueSteps\` is set and is a number, the range is going to be adjusted
            to accommodate the number of steps you provided.
        `,
        flavors: allFlavors,
        defaultValue: defaultProps.adjustValueRange,
        control: { type: 'switch' },
    },
    {
        key: 'valueFormat',
        group: 'Base',
        type: 'string | (value: number) => string',
        required: false,
        help: 'Optional formatter for values.',
        description: `
            The formatted value can then be used for labels & tooltips.
    
            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        flavors: allFlavors,
        control: { type: 'valueFormat' },
    },
    ...chartDimensions(allFlavors),
    {
        key: 'startAngle',
        help: 'Start angle (in degrees).',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.startAngle,
        group: 'Base',
        control: {
            type: 'angle',
            min: -180,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'endAngle',
        help: 'End angle (in degrees).',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.endAngle,
        group: 'Base',
        control: {
            type: 'angle',
            min: -360,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'innerRadius',
        group: 'Base',
        help: `Donut if greater than 0. Value should be between 0~1 as it's a ratio from outer radius.`,
        type: 'number',
        required: false,
        flavors: allFlavors,
        defaultValue: defaultProps.innerRadius,
        control: {
            type: 'range',
            min: 0,
            max: 0.95,
            step: 0.05,
        },
    },
    {
        key: 'cornerRadius',
        help: 'Rounded arc corners.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.cornerRadius,
        group: 'Base',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    chartRef(allFlavors),
    themeProperty(allFlavors),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: svgDefaultProps.colors,
    }),
    {
        key: 'borderWidth',
        group: 'Style',
        type: 'number',
        required: false,
        help: 'Shape border width.',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.borderWidth,
        control: { type: 'lineWidth' },
    },
    {
        key: 'borderColor',
        group: 'Style',
        type: 'string | object | Function',
        required: false,
        help: 'Method to compute border color.',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.borderColor,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'enableArcLabels',
        help: 'Enable/disable arc labels.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.enableArcLabels,
        control: { type: 'switch' },
        group: 'Arc labels',
    },
    {
        key: 'arcLabel',
        help: 'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data.',
        flavors: allFlavors,
        type: 'string | Function',
        required: false,
        defaultValue: defaultProps.arcLabel,
        group: 'Arc labels',
        control: {
            type: 'choices',
            choices: ['formattedValue', 'value', 'key', 'index', 'id'].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'arcLabelsRadiusOffset',
        help: `
            Define the radius to use to determine the label position, starting from inner radius,
            this is expressed as a ratio.
        `,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLabelsRadiusOffset,
        group: 'Arc labels',
        control: {
            type: 'range',
            min: 0,
            max: 2,
            step: 0.05,
        },
    },
    {
        key: 'arcLabelsSkipAngle',
        help: `Skip label if corresponding arc's angle is lower than provided value.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLabelsSkipAngle,
        group: 'Arc labels',
        control: {
            type: 'range',
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'arcLabelsSkipRadius',
        help: `Skip label if corresponding arc's radius is lower than provided value.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLabelsSkipRadius,
        group: 'Arc labels',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 60,
            step: 1,
        },
    },
    {
        key: 'arcLabelsTextColor',
        help: 'Defines how to compute arc label text color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.arcLabelsTextColor,
        control: { type: 'inheritedColor' },
        group: 'Arc labels',
    },
    {
        key: 'enableRadialGrid',
        group: 'Grid & Axes',
        type: 'boolean',
        required: false,
        help: 'Enable radial grid (rays).',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.enableRadialGrid,
        control: { type: 'switch' },
    },
    {
        key: 'enableCircularGrid',
        group: 'Grid & Axes',
        type: 'boolean',
        required: false,
        help: 'Enable circular grid (rings).',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.enableCircularGrid,
        control: { type: 'switch' },
    },
    polarAxisProperty({
        key: 'radialAxis',
        flavors: allFlavors,
        tickComponent: 'RadialAxisTickComponent',
    }),
    polarAxisProperty({
        key: 'circularAxisInner',
        flavors: allFlavors,
        tickComponent: 'CircularAxisTickComponent',
        exclude: ['angle', 'ticksPosition'],
    }),
    polarAxisProperty({
        key: 'circularAxisOuter',
        flavors: allFlavors,
        tickComponent: 'CircularAxisTickComponent',
        exclude: ['angle', 'ticksPosition'],
    }),
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer should be a component.
    
            The layer function which will receive the chart's
            context & computed data and must return a valid SVG element.
        `,
        required: false,
        type: 'PolarBarLayerId[]',
        flavors: ['svg'],
        defaultValue: defaultProps.layers,
    },
    isInteractive({
        flavors: ['svg'],
        defaultValue: defaultProps.isInteractive,
    }),
    {
        key: 'tooltip',
        group: 'Interactivity',
        type: 'PolarBarTooltipComponent',
        required: false,
        help: 'Override default tooltip.',
        flavors: allFlavors,
    },
    {
        key: 'tooltip',
        group: 'Interactivity',
        type: 'PolarBarTooltipComponent',
        required: false,
        help: 'Override default tooltip.',
        flavors: allFlavors,
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        type: '(arc: PolarBarComputedDatum, event: MouseEvent) => void',
        required: false,
        help: 'onClick handler.',
        flavors: allFlavors,
    },
    {
        key: 'onMouseEnter',
        group: 'Interactivity',
        type: '(arc: PolarBarComputedDatum, event: MouseEvent) => void',
        required: false,
        help: 'onMouseEnter handler.',
        flavors: allFlavors,
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        type: '(arc: PolarBarComputedDatum, event: MouseEvent) => void',
        required: false,
        help: 'onMouseMove handler.',
        flavors: allFlavors,
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        type: '(arc: PolarBarComputedDatum, event: MouseEvent) => void',
        required: false,
        help: 'onMouseLeave handler.',
        flavors: allFlavors,
    },
    {
        key: 'legends',
        group: 'Legends',
        type: 'LegendProps[]',
        required: false,
        help: `Optional chart's legends.`,
        flavors: allFlavors,
        control: {
            type: 'array',
            props: getLegendsProps(['svg']),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            getItemTitle: (index, legend: any) =>
                `legend[${index}]: ${legend.anchor}, ${legend.direction}`,
            defaults: {
                dataFrom: 'keys',
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
    {
        key: 'forwardLegendData',
        group: 'Legends',
        type: '(data: PolarBarLegendDatum[]) => void',
        required: false,
        flavors: ['svg'],
        help: 'Can be used to get the computed legend data.',
        description: `
            This property allows you to implement custom
            legends, bypassing the limitations of SVG/Canvas.
            
            For example you could have a state in the parent component,
            and then pass the setter.
            
            Please be very careful when using this property though,
            you could end up with an infinite loop if the properties
            defining the data don't have a stable reference.
            
            For example, using a non static/memoized function for \`valueFormat\`
            would lead to such issue.
        `,
    },
    ...commonAccessibilityProps(allFlavors),
    ...motionProperties(['svg'], svgDefaultProps),
    {
        key: 'transitionMode',
        flavors: ['svg'],
        help: 'Define how transitions behave when elements enter/leave.',
        type: 'string',
        required: false,
        defaultValue: svgDefaultProps.transitionMode,
        group: 'Motion',
        control: {
            type: 'choices',
            choices: arcTransitionModes.map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
]

export const groups = groupProperties(props)
