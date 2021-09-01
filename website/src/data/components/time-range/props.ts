import { boxAlignments } from '@nivo/core'
import { timeRangeDefaultProps as defaults } from '@nivo/calendar'
import { themeProperty, getLegendsProps, groupProperties } from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
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
        help: 'start date',
        type: 'string | Date',
        required: false,
    },
    {
        key: 'to',
        group: 'Base',
        help: 'end date',
        type: 'string | Date',
        required: false,
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using responsive alternative of
            the component \`<Responsive*/>\`.
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
            not required if using responsive alternative of
            the component \`<Responsive*/>\`.
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
        key: 'direction',
        help: 'defines calendar layout direction.',
        type: 'string',
        required: false,
        defaultValue: defaults.direction,
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
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'align',
        help: 'defines how calendar should be aligned inside chart container.',
        type: 'string',
        required: false,
        defaultValue: defaults.align,
        group: 'Base',
        controlType: 'boxAnchor',
        controlOptions: {
            choices: boxAlignments.map((align: string) => ({
                label: align,
                value: align,
            })),
        },
    },
    {
        key: 'minValue',
        help: 'Minimum value.',
        description: `
            Minimum value. If 'auto', will pick the lowest value
            in the provided data set.
            Should be overriden if your data set does not contain
            desired lower bound value.
        `,
        required: false,
        defaultValue: defaults.minValue,
        type: `number | 'auto'`,
        controlType: 'switchableRange',
        group: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 0,
            min: -300,
            max: 300,
        },
    },
    {
        key: 'maxValue',
        help: 'Maximum value.',
        description: `
            Maximum value. If 'auto', will pick the highest value
            in the provided data set.
            Should be overriden if your data set does not contain
            desired higher bound value.
        `,
        required: false,
        defaultValue: defaults.maxValue,
        type: `number | 'auto'`,
        controlType: 'switchableRange',
        group: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 100,
            min: 0,
            max: 600,
        },
    },
    themeProperty(['svg']),
    {
        key: 'colors',
        group: 'Style',
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
        type: 'string',
        required: false,
        defaultValue: defaults.emptyColor,
        controlType: 'colorPicker',
        group: 'Style',
    },
    // Months
    {
        key: 'monthLegend',
        help: `can be used to customize months label, returns abbreviated month name (english) by default. This can be used to use a different language`,
        type: '(year: number, month: number, date: Date) => string | number',
        required: false,
        group: 'Months',
    },
    {
        key: 'monthLegendPosition',
        help: 'defines month legends position.',
        type: `'before' | 'after'`,
        required: false,
        defaultValue: defaults.monthLegendPosition,
        controlType: 'radio',
        group: 'Months',
        controlOptions: {
            choices: [
                { label: 'before', value: 'before' },
                { label: 'after', value: 'after' },
            ],
        },
    },
    {
        key: 'monthLegendOffset',
        help: 'define offset from month edge to its label.',
        type: 'number',
        required: false,
        defaultValue: defaults.monthLegendOffset,
        controlType: 'range',
        group: 'Months',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    // Weekday
    {
        key: 'weekdayLegendOffset',
        help: 'define offset from weekday edge to its label.',
        type: 'number',
        required: false,
        defaultValue: defaults.weekdayLegendOffset,
        controlType: 'range',
        group: 'Weekday',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'weekdayTicks',
        help: 'define weekday tickmarks to show',
        type: 'Array<0 | 1 | 2 | 3 | 4 | 5 | 6>',
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
    // Days
    {
        key: 'square',
        help: 'force day cell into square shape',
        type: 'boolean',
        required: false,
        defaultValue: defaults.square,
        controlType: 'switch',
        group: 'Days',
    },
    {
        key: 'dayRadius',
        help: 'define border radius of each day cell.',
        type: 'number',
        required: false,
        defaultValue: defaults.dayRadius,
        controlType: 'range',
        group: 'Days',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    {
        key: 'daySpacing',
        help: 'define spacing between each day cell.',
        type: 'number',
        required: false,
        defaultValue: defaults.daySpacing,
        controlType: 'range',
        group: 'Days',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    {
        key: 'dayBorderWidth',
        help: 'width of days border.',
        type: 'number',
        required: false,
        defaultValue: defaults.dayBorderWidth,
        controlType: 'lineWidth',
        group: 'Days',
    },
    {
        key: 'dayBorderColor',
        help: 'color to use for days border.',
        type: 'string',
        required: false,
        defaultValue: defaults.dayBorderColor,
        controlType: 'colorPicker',
        group: 'Days',
    },
    {
        key: 'isInteractive',
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        help: 'onClick handler, it receives clicked day data and mouse event.',
        type: '(day, event) => void',
        required: false,
    },
    {
        key: 'tooltip',
        group: 'Interactivity',
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
        type: 'boolean',
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'legends',
        flavors: ['svg'],
        type: 'LegendProps[]',
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
                onClick: data => {
                    alert(JSON.stringify(data, null, '    '))
                },
            },
        },
    },
]

export const groups = groupProperties(props)
