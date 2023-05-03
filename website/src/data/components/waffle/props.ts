import { commonDefaultProps } from '@nivo/waffle'
import {
    themeProperty,
    motionProperties,
    defsProperties,
    getLegendsProps,
    groupProperties,
} from '../../../lib/componentProperties'
import { chartDimensions, ordinalColors, isInteractive } from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'html', 'canvas']

const defaults = commonDefaultProps

const props: ChartProperty[] = [
    {
        key: 'total',
        group: 'Base',
        type: 'number',
        required: true,
        help: 'Max value.',
        description: 'Max value, ratio will be computed against this value for each datum.',
        flavors: allFlavors,
    },
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            Array<{
                id:    string | number
                value: number
                label: string | number
            }>
            \`\`\`
        `,
        type: 'object[]',
        required: true,
        flavors: allFlavors,
    },
    // {
    //     key: 'hiddenIds',
    //     type: 'Array<string | number>',
    //     help: 'Hide parts of the data by id',
    //     description: `
    //         Hide parts of the data by id, this can be used
    //         to implement toggle. Note that the datum will
    //         still be visible in legends, if you want
    //         to completely remove a datum from the data set,
    //         you'll have to filter the data before passing
    //         it to the component.
    //     `,
    //     required: false,
    //     defaultValue: defaults.hiddenIds,
    // },
    {
        key: 'rows',
        group: 'Base',
        type: 'number',
        help: 'Number of rows.',
        required: true,
        flavors: allFlavors,
        control: {
            type: 'range',
            min: 1,
            max: 100,
        },
    },
    {
        key: 'columns',
        group: 'Base',
        type: 'number',
        help: 'Number of columns.',
        required: true,
        flavors: allFlavors,
        control: {
            type: 'range',
            min: 1,
            max: 100,
        },
    },
    {
        key: 'fillDirection',
        group: 'Base',
        type: 'string',
        required: false,
        help: `How to fill the waffle.`,
        flavors: allFlavors,
        defaultValue: defaults.fillDirection,
        control: {
            type: 'choices',
            choices: [
                { label: 'top', value: 'top' },
                { label: 'right', value: 'right' },
                { label: 'bottom', value: 'bottom' },
                { label: 'left', value: 'left' },
            ],
        },
    },
    {
        key: 'padding',
        group: 'Base',
        type: 'number',
        help: 'Padding between each cell.',
        required: false,
        defaultValue: defaults.padding,
        flavors: allFlavors,
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 10,
        },
    },
    ...chartDimensions(allFlavors),
    themeProperty(allFlavors),
    {
        key: 'cellComponent',
        flavors: ['svg', 'html'],
        help: 'Override default cell component.',
        type: 'Function',
        required: false,
        group: 'Style',
        control: {
            type: 'choices',
            choices: ['default', 'Custom(props) => (…)'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    ordinalColors({
        flavors: allFlavors,
        defaultValue: defaults.colors,
    }),
    {
        key: 'emptyColor',
        group: 'Style',
        help: 'Defines empty cells color.',
        type: 'string',
        required: false,
        defaultValue: defaults.emptyColor,
        flavors: allFlavors,
        control: { type: 'colorPicker' },
    },
    {
        key: 'emptyOpacity',
        group: 'Style',
        help: 'Empty cells opacity.',
        required: false,
        defaultValue: defaults.emptyOpacity,
        type: 'number',
        flavors: allFlavors,
        control: { type: 'opacity' },
    },
    {
        key: 'borderWidth',
        group: 'Style',
        type: 'number',
        required: false,
        help: 'Control cell border width.',
        defaultValue: defaults.borderWidth,
        flavors: allFlavors,
        control: { type: 'lineWidth' },
    },
    {
        key: 'borderColor',
        group: 'Style',
        type: 'string | object | Function',
        required: false,
        help: 'Method to compute cell border color.',
        defaultValue: defaults.borderColor,
        flavors: allFlavors,
        control: { type: 'inheritedColor' },
    },
    ...defsProperties('Style', ['svg']),
    isInteractive({
        flavors: allFlavors,
        defaultValue: defaults.isInteractive,
    }),
    {
        key: 'onMouseEnter',
        group: 'Interactivity',
        type: '(datum: ComputedDatum, event: MouseEvent) => void',
        required: false,
        flavors: ['svg', 'html'],
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        type: '(datum: ComputedDatum, event: MouseEvent) => void',
        required: false,
        flavors: allFlavors,
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        type: '(datum: ComputedDatum, event: MouseEvent) => void',
        required: false,
        flavors: ['svg', 'html'],
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        type: '(datum: ComputedDatum, event: MouseEvent) => void',
        required: false,
        flavors: allFlavors,
    },
    {
        key: 'tooltip',
        group: 'Interactivity',
        type: 'TooltipComponent',
        required: false,
        help: 'Custom tooltip component',
        flavors: allFlavors,
        description: `
            Override the default tooltip, please look at
            the TypeScript definition for \`TooltipComponent\`
            from the package.
        `,
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
            
            For example, using a non static/memoized function for \`valueFormat\`
            would lead to such issue.
        `,
    },
    {
        key: 'legends',
        group: 'Legends',
        type: 'object[]',
        required: false,
        help: `Optional chart's legends.`,
        flavors: ['svg', 'canvas'],
        control: {
            type: 'array',
            props: getLegendsProps(['svg', 'canvas']),
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
    {
        key: 'motionStagger',
        group: 'Motion',
        type: 'number',
        help: 'Staggered animation for the cells if > 0.',
        defaultValue: 0,
        required: false,
        flavors: ['svg', 'html'],
        control: {
            type: 'range',
            min: 0,
            max: 100,
        },
    },
]

export const groups = groupProperties(props)
