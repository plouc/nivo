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
                You can also add arbitrary data to this structure to be used in tooltips or event
                handlers.
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
                not required if using responsive alternative of the component{' '}
                <code>&lt;Responsive*/&gt;</code>.
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
                not required if using responsive alternative of the component{' '}
                <code>&lt;Responsive*/&gt;</code>.
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
        key: 'minValue',
        scopes: '*',
        description: (
            <>
                Minimum value. If 'auto', will pick the lowest value in the provided data set.
                Should be overriden if your data set does not contain desired lower bound value.`
            </>
        ),
        required: false,
        default: defaults.minValue,
        type: `{number|'auto'}`,
        controlType: 'switchableRange',
        controlGroup: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 0,
            min: -300,
            max: 300,
        },
    },
    {
        key: 'maxValue',
        scopes: '*',
        description: (
            <>
                Maximum value. If 'auto', will pick the highest value in the provided data set.
                Should be overriden if your data set does not contain desired higher bound value.
            </>
        ),
        required: false,
        default: defaults.maxValue,
        type: `{number|'auto'}`,
        controlType: 'switchableRange',
        controlGroup: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 100,
            min: 0,
            max: 600,
        },
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
        controlType: 'radio',
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
                days' color.
                <br />
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
    {
        key: 'pixelRatio',
        scopes: ['CalendarCanvas'],
        description: `Adjust pixel ratio, useful for HiDPI screens.`,
        required: false,
        default: 'Depends on device',
        type: `{number}`,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 1,
            max: 2,
        },
    },
    // Years
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
        key: 'yearLegend',
        description: `can be used to customize years label, returns 'YYYY' by default.`,
        type: '{(year: number) => string | number}',
        required: false,
    },
    {
        key: 'yearLegendPosition',
        description: 'defines year legends position.',
        type: `{'before'|'after'}`,
        required: false,
        default: defaults.yearLegendPosition,
        controlType: 'radio',
        controlGroup: 'Years',
        controlOptions: {
            choices: [{ label: 'before', value: 'before' }, { label: 'after', value: 'after' }],
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
        key: 'monthBorderWidth',
        scopes: ['Calendar', 'api'],
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
        key: 'monthBorderColor',
        scopes: ['Calendar', 'api'],
        description: 'color to use for months border.',
        type: '{string}',
        required: false,
        default: defaults.monthBorderColor,
        controlType: 'colorPicker',
        controlGroup: 'Months',
    },
    {
        key: 'monthLegend',
        description: `can be used to customize months label, returns abbreviated month name (english) by default. This can be used to use a different language`,
        type: '{(year: number, month: number, date: Date) => string | number}',
        required: false,
    },
    {
        key: 'monthLegendPosition',
        description: 'defines month legends position.',
        type: `{'before'|'after'}`,
        required: false,
        default: defaults.monthLegendPosition,
        controlType: 'radio',
        controlGroup: 'Months',
        controlOptions: {
            choices: [{ label: 'before', value: 'before' }, { label: 'after', value: 'after' }],
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
        scopes: ['Calendar', 'CalendarCanvas'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'onClick',
        scopes: ['Calendar', 'CalendarCanvas'],
        description: 'onClick handler, it receives clicked day data and mouse event.',
        type: '{Function}',
        required: false,
    },
    {
        key: 'custom tooltip example',
        scopes: ['Calendar', 'CalendarCanvas'],
        excludeFromDoc: true,
        description: (
            <span>
                You can customize the tooltip using the <code>tooltip</code> property and{' '}
                <code>theme.tooltip</code> object.
            </span>
        ),
        type: '{boolean}',
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'tooltip',
        scopes: ['Calendar', 'CalendarCanvas'],
        type: '{Function}',
        required: false,
        description: (
            <div>
                A function allowing complete tooltip customisation, it must return a valid HTML
                element and will receive the following data:
                <pre className="code code-block">
                    {dedent`
                        {
                            day:   {string},
                            date:  {Date},
                            value: {number},
                            color: {string},
                            x:     {number},
                            y:     {number},
                            size:  {number}
                        }
                    `}
                </pre>
            </div>
        ),
    },
]
