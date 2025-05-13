import { calendarDefaultProps as defaults } from '@nivo/calendar'
import { themeProperty, groupProperties } from '../../../lib/componentProperties'
import { chartDimensions, chartRef, isInteractive } from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas', 'api']

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
        flavors: allFlavors,
    },
    {
        key: 'from',
        group: 'Base',
        help: 'start date',
        type: 'string | Date',
        required: true,
        flavors: allFlavors,
    },
    {
        key: 'to',
        group: 'Base',
        help: 'end date',
        type: 'string | Date',
        required: true,
        flavors: allFlavors,
    },
    ...chartDimensions(allFlavors),
    {
        key: 'direction',
        help: 'defines calendar layout direction.',
        type: 'string',
        required: false,
        defaultValue: defaults.direction,
        flavors: ['svg', 'canvas', 'api'],
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
        type: 'string',
        required: false,
        flavors: ['svg', 'canvas', 'api'],
        defaultValue: defaults.align,
        group: 'Base',
        control: {
            type: 'boxAnchor',
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
        flavors: ['svg', 'canvas', 'api'],
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
        description: `
            Maximum value. If 'auto', will pick the highest value
            in the provided data set.
            Should be overriden if your data set does not contain
            desired higher bound value.
        `,
        required: false,
        flavors: ['svg', 'canvas', 'api'],
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
    chartRef(['svg', 'canvas']),
    themeProperty(['svg', 'canvas', 'api']),
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
        flavors: ['svg', 'canvas', 'api'],
        defaultValue: defaults.colors,
    },
    {
        key: 'emptyColor',
        help: 'color to use to fill days without available value.',
        type: 'string',
        required: false,
        flavors: ['svg', 'canvas', 'api'],
        defaultValue: defaults.emptyColor,
        control: { type: 'colorPicker' },
        group: 'Style',
    },
    // Years
    {
        key: 'yearSpacing',
        help: 'define spacing between each year row/column depending on the direction.',
        type: 'number',
        required: false,
        defaultValue: defaults.yearSpacing,
        flavors: ['svg', 'canvas', 'api'],
        group: 'Years',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 160,
            step: 5,
        },
    },
    {
        key: 'yearLegend',
        group: 'Years',
        help: `can be used to customize years label, returns 'YYYY' by default.`,
        type: '(year: number) => string | number',
        required: false,
        flavors: ['svg', 'canvas', 'api'],
    },
    {
        key: 'yearLegendPosition',
        help: 'defines year legends position.',
        type: `'before' | 'after'`,
        required: false,
        defaultValue: defaults.yearLegendPosition,
        flavors: ['svg', 'canvas', 'api'],
        group: 'Years',
        control: {
            type: 'radio',
            choices: [
                { label: 'before', value: 'before' },
                { label: 'after', value: 'after' },
            ],
        },
    },
    {
        key: 'yearLegendOffset',
        help: 'define offset from year edge to its label.',
        type: 'number',
        required: false,
        defaultValue: defaults.yearLegendOffset,
        flavors: ['svg', 'canvas', 'api'],
        group: 'Years',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    // Months
    {
        key: 'monthSpacing',
        help: 'define spacing between each month row/column depending on the direction.',
        type: 'number',
        required: false,
        defaultValue: defaults.monthSpacing,
        flavors: ['svg', 'canvas', 'api'],
        group: 'Months',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 160,
            step: 5,
        },
    },
    {
        key: 'monthBorderWidth',
        flavors: ['svg', 'api'],
        help: 'width of month borders.',
        type: 'number',
        required: false,
        defaultValue: defaults.monthBorderWidth,
        control: { type: 'lineWidth' },
        group: 'Months',
    },
    {
        key: 'monthBorderColor',
        flavors: ['svg', 'api'],
        help: 'color to use for months border.',
        type: 'string',
        required: false,
        defaultValue: defaults.monthBorderColor,
        control: { type: 'colorPicker' },
        group: 'Months',
    },
    {
        key: 'monthLegend',
        help: `can be used to customize months label, returns abbreviated month name (english) by default. This can be used to use a different language`,
        type: '(year: number, month: number, date: Date) => string | number',
        required: false,
        group: 'Months',
        flavors: ['svg', 'canvas', 'api'],
    },
    {
        key: 'monthLegendPosition',
        help: 'defines month legends position.',
        type: `'before' | 'after'`,
        required: false,
        defaultValue: defaults.monthLegendPosition,
        flavors: ['svg', 'canvas', 'api'],
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
        type: 'number',
        required: false,
        defaultValue: defaults.monthLegendOffset,
        flavors: ['svg', 'canvas', 'api'],
        group: 'Months',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    // Days
    {
        key: 'daySpacing',
        help: 'define spacing between each day cell.',
        type: 'number',
        required: false,
        defaultValue: defaults.daySpacing,
        flavors: ['svg', 'canvas', 'api'],
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
        type: 'number',
        required: false,
        defaultValue: defaults.dayBorderWidth,
        flavors: ['svg', 'canvas', 'api'],
        control: { type: 'lineWidth' },
        group: 'Days',
    },
    {
        key: 'dayBorderColor',
        help: 'color to use for days border.',
        type: 'string',
        required: false,
        defaultValue: defaults.dayBorderColor,
        flavors: ['svg', 'canvas', 'api'],
        control: { type: 'colorPicker' },
        group: 'Days',
    },
    isInteractive({
        flavors: ['svg', 'canvas'],
        defaultValue: defaults.isInteractive,
    }),
    {
        key: 'onClick',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: 'onClick handler, it receives clicked day data and mouse event.',
        type: '(day, event) => void',
        required: false,
    },
    {
        key: 'tooltip',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom tooltip component.',
        description: `
            A function allowing complete tooltip customisation, it must return a valid HTML
            element and will receive the following data:
            \`\`\`
            {
                day:   string,
                date:  {Date},
                value: number,
                color: string,
                x:     number,
                y:     number,
                size:  number
            }
            \`\`\`
            You can also customize the tooltip style
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'custom tooltip example',
        flavors: ['svg', 'canvas'],
        help: 'Showcase custom tooltip.',
        type: 'boolean',
        required: false,
        control: { type: 'switch' },
        group: 'Interactivity',
    },
]

export const groups = groupProperties(props)
