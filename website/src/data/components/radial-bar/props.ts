import { svgDefaultProps } from '@nivo/radial-bar'
import { arcTransitionModes } from '@nivo/arcs'
import {
    themeProperty,
    motionProperties,
    groupProperties,
    getLegendsProps,
    polarAxisProperty,
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
        type: 'object[]',
        required: true,
        help: 'Chart data.',
        description: `
            Here is what the data for a single chart with 2 bars would look like:
            
            \`\`\`
            [
                {
                    id: 'Fruits',
                    data: [{ x: 'Apples', y: 32 }]
                },
                {
                    id: 'Vegetables',
                    data: [{ x: 'Eggplants', y: 27 }]
                }
            ]
            \`\`\`
            
            You can add several metrics per group:
            
            \`\`\`
            [
                {
                    id: 'Fruits',
                    data: [
                        { x: 'Apples', y: 32 },
                        { x: 'Mangoes', y: 15 }
                    ]
                },
                {
                    id: 'Vegetables',
                    data: [
                        { x: 'Eggplants', y: 27 },
                        { x: 'Avocados', y: 34 }
                    ]
                }
            ]
            \`\`\`
            
            When a bar is computed, the \`id\` is going to be added
            as the \`groupId\`, \`x\` as the \`category\` and \`y\`
            as the value, for example the first bar for the number of Apples
            in the Fruits group would be:
            
            \`\`\`
            {
                groupId: 'Fruits',
                category: 'Apples',
                value: 32
            }
            \`\`\`
            
            You might read those values when adding an \`onClick\` handler
            for example, or when customizing the tooltip.
        `,
        flavors: allFlavors,
    },
    {
        key: 'maxValue',
        group: 'Base',
        type: `'auto' | number`,
        required: false,
        help: `If 'auto', the max value is derived from the data, otherwise use a static value.`,
        flavors: allFlavors,
        defaultValue: svgDefaultProps.maxValue,
    },
    {
        key: 'valueFormat',
        group: 'Base',
        type: 'string | (value: number) => string',
        required: false,
        help: 'Optional formatter for values (`y`).',
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
        group: 'Base',
        type: 'number',
        required: false,
        help: 'Start angle (in degrees).',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.startAngle,
        control: {
            type: 'angle',
            min: -360,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'endAngle',
        group: 'Base',
        type: 'number',
        required: false,
        help: 'End angle (in degrees).',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.endAngle,
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
        defaultValue: svgDefaultProps.innerRadius,
        control: {
            type: 'range',
            min: 0,
            max: 0.95,
            step: 0.05,
        },
    },
    {
        key: 'padding',
        group: 'Base',
        type: 'number',
        required: false,
        help: 'Padding between each ring (ratio).',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.padding,
        control: {
            type: 'range',
            min: 0,
            max: 0.9,
            step: 0.05,
        },
    },
    {
        key: 'padAngle',
        group: 'Base',
        type: 'number',
        required: false,
        help: 'Padding between each bar.',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.padAngle,
        control: {
            type: 'range',
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'cornerRadius',
        group: 'Base',
        type: 'number',
        required: false,
        help: 'Rounded corners.',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.cornerRadius,
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    chartRef(['svg']),
    themeProperty(['svg']),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: svgDefaultProps.colors,
    }),
    {
        key: 'borderWidth',
        group: 'Style',
        type: 'number',
        required: false,
        help: 'Bars border width.',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.borderWidth,
        control: { type: 'lineWidth' },
    },
    {
        key: 'borderColor',
        group: 'Style',
        type: 'InheritedColorConfig<ComputedBar>',
        required: false,
        help: 'Method to compute border color.',
        description: `
            how to compute border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        flavors: allFlavors,
        defaultValue: svgDefaultProps.borderColor,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'enableTracks',
        group: 'Tracks',
        type: 'boolean',
        required: false,
        help: 'Enable/disable tracks.',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.enableTracks,
        control: { type: 'switch' },
    },
    {
        key: 'tracksColor',
        group: 'Tracks',
        type: 'string',
        required: false,
        help: 'Define tracks color.',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.tracksColor,
        control: { type: 'colorPicker' },
    },
    {
        key: 'enableRadialGrid',
        group: 'Grid & Axes',
        type: 'boolean',
        required: false,
        help: 'Enable radial grid (rays)',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.enableRadialGrid,
        control: { type: 'switch' },
    },
    {
        key: 'enableCircularGrid',
        group: 'Grid & Axes',
        type: 'boolean',
        required: false,
        help: 'Enable circular grid (rings)',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.enableCircularGrid,
        control: { type: 'switch' },
    },
    polarAxisProperty({
        key: 'radialAxisStart',
        flavors: allFlavors,
        tickComponent: 'RadialAxisTickComponent',
        exclude: ['angle', 'ticksPosition'],
    }),
    polarAxisProperty({
        key: 'radialAxisEnd',
        flavors: allFlavors,
        tickComponent: 'RadialAxisTickComponent',
        exclude: ['angle', 'ticksPosition'],
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
        key: 'enableLabels',
        group: 'Labels',
        type: 'boolean',
        required: false,
        help: 'Enable/disable labels.',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.enableLabels,
        control: { type: 'switch' },
    },
    {
        key: 'label',
        group: 'Labels',
        type: 'string | (bar: ComputedBar) => string',
        required: false,
        help: 'Defines how to get label text, can be a string (used to access current bar property) or a function which will receive the actual bar data.',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.label,
        control: {
            type: 'choices',
            choices: ['category', 'groupId', 'value', 'formattedValue'].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'labelsSkipAngle',
        group: 'Labels',
        type: 'number',
        required: false,
        help: `Skip label if corresponding arc's angle is lower than provided value.`,
        flavors: allFlavors,
        defaultValue: svgDefaultProps.labelsSkipAngle,
        control: {
            type: 'range',
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'labelsRadiusOffset',
        group: 'Labels',
        type: 'number',
        required: false,
        help: `
            Define the radius to use to determine the label position, starting from inner radius,
            this is expressed as a ratio. Centered at 0.5 by default.
        `,
        flavors: allFlavors,
        defaultValue: svgDefaultProps.labelsRadiusOffset,
        control: {
            type: 'range',
            min: 0,
            max: 2,
            step: 0.05,
        },
    },
    {
        key: 'labelsTextColor',
        group: 'Labels',
        help: 'Defines how to compute label text color.',
        type: 'string | object | Function',
        required: false,
        flavors: allFlavors,
        defaultValue: svgDefaultProps.labelsTextColor,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'layers',
        group: 'Customization',
        type: '(RadialBarLayerId | RadialBarCustomLayer)[]',
        required: false,
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer should be a component.
            
            The component will receive properties as defined in
            the \`RadialBarCustomLayerProps\` interface
            and must return a valid SVG element.
        `,
        flavors: allFlavors,
        defaultValue: svgDefaultProps.layers,
    },
    isInteractive({
        flavors: allFlavors,
        defaultValue: svgDefaultProps.isInteractive,
    }),
    {
        key: 'tooltip',
        group: 'Interactivity',
        type: 'RadialBarTooltipComponent',
        required: false,
        help: 'Override default tooltip.',
        flavors: allFlavors,
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        type: '(bar: ComputedBar, event: MouseEvent) => void',
        required: false,
        help: 'onClick handler.',
        flavors: allFlavors,
    },
    {
        key: 'onMouseEnter',
        group: 'Interactivity',
        type: '(bar: ComputedBar, event: MouseEvent) => void',
        required: false,
        help: 'onMouseEnter handler.',
        flavors: allFlavors,
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        type: '(bar: ComputedBar, event: MouseEvent) => void',
        required: false,
        help: 'onMouseMove handler.',
        flavors: allFlavors,
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        type: '(bar: ComputedBar, event: MouseEvent) => void',
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
    ...commonAccessibilityProps(allFlavors),
    ...motionProperties(allFlavors, svgDefaultProps),
    {
        key: 'transitionMode',
        flavors: allFlavors,
        help: 'Define how transitions behave.',
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
