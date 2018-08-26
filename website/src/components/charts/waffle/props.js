/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import {
    marginProperties,
    motionProperties,
    defsProperties,
    getLegendsProps,
} from '../../../lib/componentProperties'
import { WaffleDefaultProps } from '@nivo/waffle'
import dedent from 'dedent-js'

const defaults = WaffleDefaultProps

export default [
    {
        key: 'total',
        scopes: '*',
        type: 'number',
        description: 'Max value, ratio will be computed against this value for each datum.',
        required: true,
    },
    {
        key: 'data',
        scopes: '*',
        description: (
            <div>
                Chart data, which must conform to this structure:
                <pre className="code code-block">
                    {dedent`
                        Array<{
                            id:    {string|number},
                            value: {number},
                            label: {string|number},
                        }>
                    `}
                </pre>
            </div>
        ),
        type: '{Array<Object>}',
        required: true,
    },
    {
        key: 'hiddenIds',
        scopes: '*',
        type: 'Array<{string | number}>',
        description: (
            <div>
                Hide parts of the data by id, this can be used to implement toggle. Note that the
                datum will still be visible in legends, if you want to completely remove a datum
                from the data set, you'll have to filter the data before passing it to the
                component.
            </div>
        ),
        required: false,
        default: defaults.hiddenIds,
    },
    {
        key: 'rows',
        scopes: '*',
        type: 'number',
        description: 'Number of rows.',
        required: true,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 1,
            max: 100,
        },
    },
    {
        key: 'columns',
        scopes: '*',
        type: 'number',
        description: 'Number of columns.',
        required: true,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 1,
            max: 100,
        },
    },
    {
        key: 'fillDirection',
        scopes: '*',
        description: `How to fill the waffle, must be one of: 'top', 'right', 'bottom', 'left'.`,
        type: '{string}',
        required: false,
        default: defaults.fillDirection,
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
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
        scopes: '*',
        type: 'number',
        description: 'Padding between each cell (px).',
        required: true,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 10,
        },
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
        type: '{number}',
        required: true,
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
        type: '{number}',
        required: true,
    },
    {
        key: 'pixelRatio',
        scopes: ['WaffleCanvas'],
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
    {
        key: 'cellComponent',
        scopes: ['Waffle', 'WaffleHtml'],
        description: 'Override default cell component.',
        type: '{Function}',
        required: false,
        controlType: 'choices',
        controlGroup: 'Style',
        controlOptions: {
            choices: ['default', 'Custom(props) => (…)'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'colors',
        scopes: '*',
        description: 'Defines how to compute node color.',
        type: '{string|Function|Array}',
        required: false,
        default: 'nivo',
        controlType: 'colors',
        controlGroup: 'Style',
    },
    {
        key: 'colorBy',
        scopes: '*',
        description:
            'Property to use to determine node color. If a function is provided, it will receive current node data and must return a color.',
        type: '{string|Function}',
        required: false,
        default: 'id',
        controlType: 'choices',
        controlGroup: 'Style',
        controlOptions: {
            choices: [
                {
                    label: 'id',
                    value: 'id',
                },
                {
                    label: 'd => d.color',
                    value: 'd => d.color',
                },
            ],
        },
    },
    {
        key: 'emptyColor',
        scopes: '*',
        description: 'Defines empty cells color.',
        type: '{string}',
        required: false,
        default: defaults.emptyColor,
        controlType: 'colorPicker',
        controlGroup: 'Style',
    },
    {
        key: 'emptyOpacity',
        scopes: '*',
        description: 'Empty cells opacity.',
        required: false,
        default: defaults.emptyOpacity,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Style',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'borderWidth',
        scopes: '*',
        description: 'Control cell border width.',
        type: '{number}',
        required: false,
        default: defaults.borderWidth,
        controlType: 'range',
        controlGroup: 'Style',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 10,
        },
    },
    {
        key: 'borderColor',
        scopes: '*',
        description: 'Method to compute cell border color.',
        type: '{string|Function}',
        required: false,
        default: defaults.borderColor,
        controlType: 'color',
        controlGroup: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    ...defsProperties(['Waffle']),
    ...marginProperties,
    {
        key: 'isInteractive',
        scopes: ['Waffle', 'WaffleHtml', 'WaffleCanvas'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'onClick',
        scopes: ['Waffle', 'WaffleHtml', 'WaffleCanvas'],
        description: 'onClick handler, it receives clicked node data and style plus mouse event.',
        type: '{Function}',
        required: false,
    },
    {
        key: 'custom tooltip example',
        scopes: ['Waffle', 'WaffleHtml', 'WaffleCanvas'],
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
        scopes: ['Waffle', 'WaffleHtml', 'WaffleCanvas'],
        type: '{Function}',
        required: false,
        description: (
            <div>
                A function allowing complete tooltip customisation, it must return a valid HTML
                element and will receive the following data:
                <pre className="code code-block">
                    {dedent`
                        {
                            id:         {string|number},
                            value:      {number},
                            label:      {string|number},
                            color:      {string},
                            position:   {number},
                            row:        {number},
                            column:     {number},
                            groupIndex: {number},
                            startAt:    {number},
                            endAt:      {number},
                        }
                    `}
                </pre>
            </div>
        ),
    },
    {
        key: 'legends',
        scopes: ['Waffle', 'WaffleCanvas'],
        type: '{Array<object>}',
        description: `Optional chart's legends.`,
        controlGroup: 'Legends',
        controlType: 'array',
        controlOptions: {
            props: getLegendsProps(),
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
                onClick: data => {
                    alert(JSON.stringify(data, null, '    '))
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
    ...motionProperties(['Waffle', 'WaffleHtml'], defaults),
]
