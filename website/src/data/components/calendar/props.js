/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { boxAlignments } from '@nivo/core'
import { CalendarDefaultProps as defaults } from '@nivo/calendar'
import { themeProperty, groupProperties } from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            Array<{
                day:   string // format must be YYYY-MM-DD,
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
        required: true,
    },
    {
        key: 'to',
        group: 'Base',
        help: 'end date',
        type: 'string | Date',
        required: true,
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
        controlType: 'boxAnchor',
        group: 'Base',
        controlOptions: {
            choices: boxAlignments.map(align => ({
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
    themeProperty,
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
    {
        key: 'pixelRatio',
        flavors: ['canvas'],
        help: `Adjust pixel ratio, useful for HiDPI screens.`,
        required: false,
        defaultValue: 'Depends on device',
        type: `number`,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 1,
            max: 2,
        },
    },
    // Years
    {
        key: 'yearSpacing',
        help: 'define spacing between each year row/column depending on the direction.',
        type: 'number',
        required: false,
        defaultValue: defaults.yearSpacing,
        controlType: 'range',
        group: 'Years',
        controlOptions: {
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
    },
    {
        key: 'yearLegendPosition',
        help: 'defines year legends position.',
        type: `'before' | 'after'`,
        required: false,
        defaultValue: defaults.yearLegendPosition,
        controlType: 'radio',
        group: 'Years',
        controlOptions: {
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
        controlType: 'range',
        group: 'Years',
        controlOptions: {
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
        controlType: 'range',
        group: 'Months',
        controlOptions: {
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
        controlType: 'lineWidth',
        group: 'Months',
    },
    {
        key: 'monthBorderColor',
        flavors: ['svg', 'api'],
        help: 'color to use for months border.',
        type: 'string',
        required: false,
        defaultValue: defaults.monthBorderColor,
        controlType: 'colorPicker',
        group: 'Months',
    },
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
    // Days
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
        flavors: ['svg', 'canvas'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
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
        controlType: 'switch',
        group: 'Interactivity',
    },
]

export const groups = groupProperties(props)
