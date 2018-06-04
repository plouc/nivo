/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import dedent from 'dedent-js'
import { CalendarDefaultProps as defaults } from '@nivo/calendar'
import { marginProperties } from '../../../lib/componentProperties'

export default [
    {
        key: 'data',
        scopes: '*',
        description: (
            <div>
                Chart data, which must conform to this structure:
                <pre className="code code-block">
                    {dedent`
                        Array<{
                            day:   {string} // format must be YYYY-MM-DD,
                            value: {number}
                        }>
                    `}
                </pre>
            </div>
        ),
        type: '{Array<Object>}',
        required: true,
    },
    {
        key: 'from',
        description: 'start date',
        type: '{string|Date}',
        required: true,
    },
    {
        key: 'to',
        description: 'end date',
        type: '{string|Date}',
        required: true,
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;<code>&lt;ResponsiveCalendar&nbsp;/&gt;</code>.
            </span>
        ),
        help: 'Chart width.',
        type: '{number}',
        required: true,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;<code>&lt;ResponsiveCalendar&nbsp;/&gt;</code>.
            </span>
        ),
        help: 'Chart height.',
        type: '{number}',
        required: true,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'domain',
        description: (
            <span>
                define min/max value (eg. <code className="code-number">[0, 300]</code>) to compute
                colors, if set to <code className="code-string">auto</code>, it extract min/max
                value from <code>data</code> property.
            </span>
        ),
        type: '{string|Array.<number>}',
        required: false,
    },
    {
        key: 'direction',
        description: (<code className="code-string">"horizontal"</code>,
        (
            <span>
                defines calendar layout direction, must be one of{' '}
                <code className="code-string">"horizontal"</code> or{' '}
                <code className="code-string">"vertical"</code>
            </span>
        )),
        help: 'defines calendar layout direction.',
        type: '{string}',
        required: false,
        default: defaults.direction,
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'colors',
        description: (
            <span>
                An array of colors to be used in conjunction with <code>domain</code> to compute
                days' color.<br />
                It applies to days having a value defined, otherwise, <code>emptyColor</code> will
                be used.
            </span>
        ),
        type: '{Array.<string>}',
        required: false,
        default: defaults.colors,
    },
    {
        key: 'emptyColor',
        description: 'color to use to fill days without available value.',
        type: '{string}',
        required: false,
        default: defaults.emptyColor,
        controlType: 'colorPicker',
        controlGroup: 'Base',
    },
    // Years
    {
        key: 'yearLegend',
        description: `can be used to customize years label, returns 'YYYY' by default.`,
        type: '{(year: number) => string | number}',
        required: false,
    },
    {
        key: 'yearSpacing',
        description: 'define spacing between each year row/column depending on the direction.',
        type: '{number}',
        required: false,
        default: defaults.yearSpacing,
        controlType: 'range',
        controlGroup: 'Years',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 160,
            step: 5,
        },
    },
    {
        key: 'yearLegendOffset',
        description: 'define offset from year edge to its label.',
        type: '{number}',
        required: false,
        default: defaults.yearLegendOffset,
        controlType: 'range',
        controlGroup: 'Years',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    // Months
    {
        key: 'monthLegend',
        description: `can be used to customize months label, returns abbreviated month name (english) by default. This can be used to use a different language`,
        type: '{(year: number, month: number, date: Date) => string | number}',
        required: false,
    },
    {
        key: 'monthBorderWidth',
        description: 'width of month borders.',
        type: '{number}',
        required: false,
        default: defaults.monthBorderWidth,
        controlType: 'range',
        controlGroup: 'Months',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 6,
        },
    },
    {
        key: 'monthLegendOffset',
        description: 'define offset from month edge to its label.',
        type: '{number}',
        required: false,
        default: defaults.monthLegendOffset,
        controlType: 'range',
        controlGroup: 'Months',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        key: 'monthBorderColor',
        description: 'color to use for months border.',
        type: '{string}',
        required: false,
        default: defaults.monthBorderColor,
        controlType: 'colorPicker',
        controlGroup: 'Months',
    },
    // Days
    {
        key: 'daySpacing',
        description: 'define spacing between each day cell.',
        type: '{number}',
        required: false,
        default: defaults.daySpacing,
        controlType: 'range',
        controlGroup: 'Days',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    {
        key: 'dayBorderWidth',
        description: 'width of days border.',
        type: '{number}',
        required: false,
        default: defaults.dayBorderWidth,
        controlType: 'range',
        controlGroup: 'Days',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 6,
        },
    },
    {
        key: 'dayBorderColor',
        description: 'color to use for days border.',
        type: '{string}',
        required: false,
        default: defaults.dayBorderColor,
        controlType: 'colorPicker',
        controlGroup: 'Days',
    },
    ...marginProperties,
    {
        key: 'isInteractive',
        scopes: ['Calendar'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'onClick',
        scopes: ['Calendar'],
        description: 'onClick handler, it receives clicked day data and mouse event.',
        type: '{Function}',
        required: false,
    },
]
