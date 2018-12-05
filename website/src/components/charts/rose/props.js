/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import dedent from 'dedent-js'
import { RoseDefaultProps as defaults } from '@nivo/rose'
import {
    marginProperties,
    motionProperties,
    defsProperties,
    getLegendsProps,
} from '../../../lib/componentProperties'

export default [
    {
        key: 'data',
        scopes: '*',
        description: 'Chart data.',
        type: '{Array.<Object>}',
        required: true,
    },
    {
        key: 'indexBy',
        scopes: '*',
        description:
            'Key to use to index the data, this key must exist in each data item. You can also provide a function which will receive the data item and must return the desired index.',
        type: '{string|Function}',
        required: false,
        default: defaults.indexBy,
    },
    {
        key: 'keys',
        scopes: '*',
        description: 'Keys to use to determine each serie.',
        type: '{Array.<string>}',
        required: false,
        default: defaults.keys,
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsiveRose&nbsp;/&gt;</code>.
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
                not required if using&nbsp;
                <code>&lt;ResponsiveRose&nbsp;/&gt;</code>.
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
        key: 'layers',
        scopes: ['Bar'],
        description: (
            <div>
                Defines the order of layers, available layers are:
                <code>grid</code>, <code>axes</code>, <code>bars</code>, <code>markers</code>,{' '}
                <code>legends</code>.<br />
                You can also use this to insert extra layers to the chart, this extra layer must be
                a function which will receive the chart computed data and must return a valid SVG
                element.
            </div>
        ),
        required: false,
        default: defaults.layers,
    },
    {
        key: 'pixelRatio',
        scopes: ['BarCanvas'],
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
        key: 'maxValue',
        scopes: '*',
        description: `Maximum value, if 'auto', will use max value from the provided data.`,
        required: false,
        default: defaults.maxValue,
        type: '{number|string}',
        controlType: 'switchableRange',
        controlGroup: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 400,
            min: 0,
            max: 1000,
        },
    },
    {
        key: 'innerRadius',
        scopes: '*',
        description: 'Define inner radius.',
        type: '{number}',
        required: false,
        default: defaults.innerRadius,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'colors',
        scopes: '*',
        description: 'Defines color range.',
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
            'Property to use to determine arc color. If a function is provided, it will receive current arc data and must return a color.',
        required: false,
        default: defaults.colorBy,
        controlType: 'choices',
        controlGroup: 'Style',
        controlOptions: {
            choices: [
                {
                    label: 'serieId',
                    value: 'serieId',
                },
                {
                    label: 'indexId',
                    value: 'indexId',
                },
            ],
        },
    },
    {
        key: 'cornerRadius',
        scopes: ['Rose', 'RoseCanvas', 'api'],
        description: 'Arc corner radius (px).',
        type: '{number}',
        required: false,
        default: defaults.cornerRadius,
        controlType: 'range',
        controlGroup: 'Style',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        key: 'borderWidth',
        scopes: '*',
        description: 'Width of arc border.',
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
        description: (
            <span>
                how to compute border color,{' '}
                <Link to="/guides/colors">see dedicated documentation</Link>.
            </span>
        ),
        help: 'Method to compute border color.',
        type: '{string|Function}',
        required: false,
        default: defaults.borderColor,
        controlType: 'color',
        controlGroup: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    ...defsProperties(['Bar']),
    ...marginProperties,
    {
        key: 'enableLabel',
        scopes: '*',
        description: 'Enable/disable labels.',
        type: '{boolean}',
        required: false,
        default: defaults.enableLabel,
        controlType: 'switch',
        controlGroup: 'Labels',
    },
    {
        key: 'labelSkipWidth',
        scopes: '*',
        description: 'Skip label if bar width is lower than provided value, ignored if 0 (px).',
        type: '{number}',
        required: false,
        default: defaults.labelSkipWidth,
        controlType: 'range',
        controlGroup: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        key: 'labelSkipHeight',
        scopes: '*',
        description: 'Skip label if bar height is lower than provided value, ignored if 0 (px).',
        type: '{number}',
        required: false,
        default: defaults.labelSkipHeight,
        controlType: 'range',
        controlGroup: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        key: 'labelTextColor',
        scopes: '*',
        description: 'Defines how to compute label text color.',
        type: '{string|Function}',
        required: false,
        default: defaults.labelTextColor,
        controlType: 'color',
        controlGroup: 'Labels',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'enableGridX',
        scopes: '*',
        description: 'Enable/disable x grid.',
        type: '{boolean}',
        required: false,
        default: defaults.enableGridX,
        controlType: 'switch',
        controlGroup: 'Grid & Axes',
    },
    {
        key: 'gridXValues',
        scopes: '*',
        description: 'Specify values to use for vertical grid lines.',
        type: 'Array<{number|string}>',
        required: false,
    },
    {
        key: 'enableGridY',
        scopes: '*',
        description: 'Enable/disable y grid.',
        type: '{boolean}',
        required: false,
        default: defaults.enableGridY,
        controlType: 'switch',
        controlGroup: 'Grid & Axes',
    },
    {
        key: 'gridYValues',
        scopes: '*',
        description: 'Specify values to use for horizontal grid lines.',
        type: 'Array<{number|string}>',
        required: false,
    },
    {
        key: 'isInteractive',
        scopes: ['Bar', 'BarCanvas'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'custom tooltip example',
        scopes: ['Bar', 'BarCanvas'],
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
        scopes: ['Bar', 'BarCanvas'],
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
                            index:      {number},
                            indexValue: {string|number},
                            color:      {string},
                            // datum associated to the current index (raw data)
                            data:       {object}
                        }
                    `}
                </pre>
            </div>
        ),
    },
    {
        key: 'onClick',
        scopes: ['Bar', 'BarCanvas'],
        type: '{Function}',
        required: false,
        description: (
            <div>
                onClick handler, will receive node data as first argument & event as second one. The
                node data has the following shape:
                <pre className="code code-block">
                    {dedent`
                        {
                            id:         {string|number},
                            value:      {number},
                            index:      {number},
                            indexValue: {string|number},
                            color:      {string},
                            // datum associated to the current index (raw data)
                            data:       {object}
                        }
                    `}
                </pre>
            </div>
        ),
    },
    {
        key: 'legends',
        scopes: ['Bar'],
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
                onClick: data => {
                    alert(JSON.stringify(data, null, '    '))
                },
            },
        },
    },
    ...motionProperties(['Rose'], defaults),
]
