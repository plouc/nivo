import { timeRangeDefaultProps as defaults } from '@nivo/calendar'
import { themeProperty, getLegendsProps, groupProperties } from '../../../lib/componentProperties'
import { chartDimensions, chartRef, isInteractive } from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        flavors: allFlavors,
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            Array<{
                day:   string, // format must be YYYY-MM-DD
                value: number
            }>
            \`\`\`
            You can also add arbitrary data to this structure
            to be used in tooltips or event handlers.
        `,
        type: 'object[]',
        required: true,
    },
    {
        key: 'from',
        group: 'Base',
        flavors: allFlavors,
        help: 'start date',
        type: 'string | Date',
        required: false,
    },
    {
        key: 'to',
        group: 'Base',
        help: 'end date',
        flavors: allFlavors,
        type: 'string | Date',
        required: false,
    },
    ...chartDimensions(allFlavors),
    {
        key: 'direction',
        help: 'defines calendar layout direction.',
        flavors: allFlavors,
        type: 'string',
        required: false,
        defaultValue: defaults.direction,
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
        key: 'align',
        help: 'defines how calendar should be aligned inside chart container.',
        flavors: allFlavors,
        type: 'string',
        required: false,
        defaultValue: defaults.align,
        group: 'Base',
        control: {
            type: 'boxAnchor',
        },
    },
    {
        key: 'minValue',
        help: 'Minimum value.',
        flavors: allFlavors,
        description: `
            Minimum value. If 'auto', will pick the lowest value
            in the provided data set.
            Should be overriden if your data set does not contain
            desired lower bound value.
        `,
        required: false,
        defaultValue: defaults.minValue,
        type: `number | 'auto'`,
        group: 'Base',
        control: {
            type: 'switchableRange',
            disabledValue: 'auto',
            defaultValue: 0,
            min: -300,
            max: 300,
        },
    },
    {
        key: 'maxValue',
        help: 'Maximum value.',
        flavors: allFlavors,
        description: `
            Maximum value. If 'auto', will pick the highest value
            in the provided data set.
            Should be overriden if your data set does not contain
            desired higher bound value.
        `,
        required: false,
        defaultValue: defaults.maxValue,
        type: `number | 'auto'`,
        group: 'Base',
        control: {
            type: 'switchableRange',
            disabledValue: 'auto',
            defaultValue: 100,
            min: 0,
            max: 600,
        },
    },
    chartRef(['svg']),
    themeProperty(['svg']),
    {
        key: 'colors',
        group: 'Style',
        flavors: allFlavors,
        help: 'Cell colors.',
        description: `
            An array of colors to be used in conjunction with
            \`domain\` to compute days' color.
            It applies to days having a value defined, otherwise,
            \`emptyColor\` will be used.
        `,
        type: 'string[]',
        required: false,
        defaultValue: defaults.colors,
    },
    {
        key: 'emptyColor',
        help: 'color to use to fill days without available value.',
        flavors: allFlavors,
        type: 'string',
        required: false,
        defaultValue: defaults.emptyColor,
        control: { type: 'colorPicker' },
        group: 'Style',
    },
    // Months
    {
        key: 'monthLegend',
        help: `can be used to customize months label, returns abbreviated month name (english) by default. This can be used to use a different language`,
        flavors: allFlavors,
        type: '(year: number, month: number, date: Date) => string | number',
        required: false,
        group: 'Months',
    },
    {
        key: 'monthLegendPosition',
        help: 'defines month legends position.',
        flavors: allFlavors,
        type: `'before' | 'after'`,
        required: false,
        defaultValue: defaults.monthLegendPosition,
        group: 'Months',
        control: {
            type: 'radio',
            choices: [
                { label: 'before', value: 'before' },
                { label: 'after', value: 'after' },
            ],
        },
    },
    {
        key: 'monthLegendOffset',
        help: 'define offset from month edge to its label.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.monthLegendOffset,
        group: 'Months',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    // Weekday
    {
        key: 'weekdayLegendOffset',
        help: 'define offset from weekday edge to its label.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.weekdayLegendOffset,
        group: 'Weekday',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'weekdays',
        help: 'define labels for weekdays',
        flavors: allFlavors,
        type: 'Array<string>',
        required: false,
        defaultValue: defaults.weekdays,
        group: 'Weekday',
    },
    {
        key: 'weekdayTicks',
        help: 'define weekday tickmarks to show',
        flavors: allFlavors,
        type: '(0 | 1 | 2 | 3 | 4 | 5 | 6)[]',
        required: false,
        defaultValue: [1, 3, 5],
        group: 'Weekday',
        description: `
            Array of weekday tickmarks to display:\n
            0 = Sunday\n
            1 = Monday\n
            2 = Tuesday\n
            3 = Wednesday\n
            4 = Thursday\n
            5 = Friday\n
            6 = Saturday\n
        `,
    },
    {
        key: 'firstWeekday',
        help: `define the first weekday: 'sunday', 'monday', etc.`,
        flavors: allFlavors,
        type: 'Weekday',
        required: false,
        defaultValue: defaults.firstWeekday,
        group: 'Weekday',
        control: {
            type: 'radio',
            choices: [
                { label: `'sunday'`, value: 'sunday' },
                { label: `'monday'`, value: 'monday' },
            ],
        },
    },
    // Days
    {
        key: 'square',
        help: 'force day cell into square shape',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaults.square,
        control: { type: 'switch' },
        group: 'Days',
    },
    {
        key: 'dayRadius',
        help: 'define border radius of each day cell.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.dayRadius,
        group: 'Days',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    {
        key: 'daySpacing',
        help: 'define spacing between each day cell.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.daySpacing,
        group: 'Days',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    {
        key: 'dayBorderWidth',
        help: 'width of days border.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.dayBorderWidth,
        control: { type: 'lineWidth' },
        group: 'Days',
    },
    {
        key: 'dayBorderColor',
        help: 'color to use for days border.',
        flavors: allFlavors,
        type: 'string',
        required: false,
        defaultValue: defaults.dayBorderColor,
        control: { type: 'colorPicker' },
        group: 'Days',
    },
    isInteractive({
        flavors: ['svg'],
        defaultValue: defaults.isInteractive,
    }),
    {
        key: 'onClick',
        group: 'Interactivity',
        flavors: allFlavors,
        help: 'onClick handler, it receives clicked day data and mouse event.',
        type: '(day, event) => void',
        required: false,
    },
    {
        key: 'tooltip',
        group: 'Interactivity',
        flavors: allFlavors,
        type: 'Function',
        required: false,
        help: 'Custom tooltip component.',
        description: `
            A function allowing complete tooltip customisation, it must return a valid HTML
            element and will receive the following data:
            \`\`\`
            {
                day:     string,
                date:    {Date},
                value:   number,
                color:   string,
                coordinates: {
                    x: number,
                    y: number,
                },
                height:  number
                width:   number
            }
            \`\`\`
            You can also customize the tooltip style
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'custom tooltip example',
        help: 'Showcase custom tooltip.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        control: { type: 'switch' },
        group: 'Interactivity',
    },
    {
        key: 'legends',
        flavors: ['svg'],
        type: 'LegendProps[]',
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
                anchor: 'bottom-right',
                direction: 'row',
                justify: false,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
                translateX: -85,
                translateY: -240,
                symbolSize: 20,
                onClick: (data: any) => {
                    console.log(JSON.stringify(data, null, '    '))
                },
            },
        },
    },
]

export const groups = groupProperties(props)
