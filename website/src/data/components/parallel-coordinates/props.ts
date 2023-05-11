// @ts-ignore
import { lineCurvePropKeys } from '@nivo/core'
import { commonDefaultProps as defaults, svgDefaultProps } from '@nivo/parallel-coordinates'
import {
    themeProperty,
    motionProperties,
    groupProperties,
    getLegendsProps,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    commonAccessibilityProps,
    ordinalColors,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
        help: 'Chart data.',
        type: '<Datum>[]',
        description: `
            Each item will be a line on the chart.
            
            The way you extract the values from each item depends on \`variables\`,
            that's why the schema is pretty loose.
            
            Please note that for each item, there should be a value for each variable.
        `,
        required: true,
    },
    {
        key: 'variables',
        type: 'Variable<Datum>[]',
        flavors: allFlavors,
        help: 'Variables configuration.',
        description: `
            Variables configuration, define accessor (\`key\`)
            and variable type. Type must be one of
            \`linear\` or \`point\`, \`linear\`
            variables are suitable for continuous numerical
            data such as age or cost while
            \`point\` variables are suitable for
            discrete values such as gender.
        `,
        group: 'Base',
        required: true,
        control: {
            type: 'array',
            shouldCreate: false,
            shouldRemove: false,
            getItemTitle: (_index: number, values: any) => `${values.id} (${values.value})`,
            props: [
                {
                    key: 'id',
                    help: 'Variable id, unique identifier for this variable.',
                    flavors: allFlavors,
                    type: 'string',
                    required: true,
                    control: {
                        type: 'text',
                        disabled: true,
                    },
                },
                {
                    key: 'value',
                    help: 'Variable value, used to access to corresponding datum value.',
                    flavors: allFlavors,
                    type: 'string',
                    required: true,
                    control: {
                        type: 'text',
                        disabled: true,
                    },
                },
                {
                    key: 'min',
                    help: 'Min value.',
                    flavors: allFlavors,
                    type: `number | 'auto'`,
                    required: false,
                    control: {
                        type: 'switchableRange',
                        disabledValue: 'auto',
                        defaultValue: 0,
                        min: -100,
                        max: 100,
                    },
                },
                {
                    key: 'max',
                    help: 'Max value of linear scale.',
                    flavors: allFlavors,
                    type: `number | 'auto'`,
                    required: false,
                    control: {
                        type: 'switchableRange',
                        disabledValue: 'auto',
                        defaultValue: 1000,
                        min: -100,
                        max: 100,
                    },
                },
            ],
        },
    },
    {
        key: 'groupBy',
        group: 'Base',
        flavors: allFlavors,
        help: 'Optionally group your data on a given property.',
        type: 'string',
        required: false,
        description: `
            When grouping is enabled, the lines color will be defined
            according to the group it belongs to, while in non-grouped
            mode, each line has its own color by default.
            
            This is also going to affect the legend, in grouped mode,
            the groups are used while in non-grouped mode, each datum
            has a legend.
        `,
    },
    {
        key: 'groups',
        group: 'Base',
        flavors: allFlavors,
        help: 'Explicitly specify available groups (only works with `groupBy`).',
        type: 'BaseGroup[]',
        required: false,
        description: `
            By default, groups are inferred by scanning the data and looking
            for unique values for the property passed to \`groupBy\`.
            
            This approach has some limitations, first, it's hard to guarantee
            the final order of the groups, which is going to affect the order
            of the legends.
            
            Also, in certain cases, you might want to show groups in the legend
            while it's not in a certain portion of a dataset.
            
            Using this property, you have full control over the order and the values.
        `,
    },
    {
        key: 'layout',
        help: `Chart layout.`,
        flavors: allFlavors,
        type: 'string',
        required: false,
        defaultValue: defaults.layout,
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
        key: 'curve',
        help: 'Curve interpolation.',
        flavors: allFlavors,
        description: `
            Defines the curve factory to use for the line generator.
        `,
        type: 'string',
        required: false,
        defaultValue: defaults.curve,
        group: 'Base',
        control: {
            type: 'choices',
            choices: lineCurvePropKeys.map((key: string) => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'axesTicksPosition',
        help: `Axes ticks position.`,
        flavors: allFlavors,
        type: `string`,
        required: false,
        defaultValue: defaults.axesTicksPosition,
        group: 'Base',
        control: {
            type: 'radio',
            choices: [
                { label: 'before', value: 'before' },
                { label: 'after', value: 'after' },
            ],
        },
    },
    ...chartDimensions(allFlavors),
    themeProperty(['svg', 'canvas']),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: defaults.colors,
    }),
    {
        key: 'lineWidth',
        help: 'Lines width.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.lineWidth,
        control: { type: 'lineWidth' },
        group: 'Style',
    },
    {
        key: 'lineOpacity',
        help: 'Lines opacity.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.lineOpacity,
        control: { type: 'opacity' },
        group: 'Style',
    },
    {
        key: 'layers',
        type: `ParallelCoordinatesLayer<Datum>[] | ParallelCoordinatesCanvasLayer<Datum>[]`,
        group: 'Customization',
        help: 'Define layers, please use the appropriate variant for custom layers.',
        description: `
            This property can be useful for example if you want to put the axes
            behind the lines, in such case, you should pass:
            
            \`\`\`
            layers={['axes', 'lines', 'legends']}
            \`\`\`
            
            You can also use it to add custom layers.
        `,
        defaultValue: svgDefaultProps.layers,
        flavors: allFlavors,
    },
    {
        key: 'forwardLegendData',
        group: 'Legends',
        type: '(data: LegendDatum<D>[]) => void',
        required: false,
        flavors: allFlavors,
        help: 'Can be used to get the computed legend data.',
        description: `
            This property allows you to implement custom
            legends, bypassing the limitations of SVG/Canvas.
            
            For example you could have a state in the parent component,
            and then pass the setter.
            
            Please be very careful when using this property though,
            you could end up with an infinite loop if the properties
            defining the data don't have a stable reference.
        `,
    },
    {
        key: 'legends',
        group: 'Legends',
        type: 'LegendDatum<D>[]',
        required: false,
        help: `Optional chart's legends.`,
        flavors: allFlavors,
        control: {
            type: 'array',
            props: getLegendsProps(allFlavors),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            defaults: {
                anchor: 'left',
                direction: 'column',
                justify: false,
                translateX: -100,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 4,
                symbolSize: 20,
                itemDirection: 'left-to-right',
                itemTextColor: '#777',
                onClick: (data: any) => {
                    console.log(JSON.stringify(data, null, '    '))
                },
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000',
                            itemBackground: '#f7fafb',
                        },
                    },
                ],
            },
        },
    },
    ...motionProperties(allFlavors, defaults),
    ...commonAccessibilityProps(allFlavors),
]

export const groups = groupProperties(props)
