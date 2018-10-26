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
import { HeatMapDefaultProps as defaults } from '@nivo/heatmap'
import {
    marginProperties,
    axesProperties,
    motionProperties,
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
            'Key to use to index the data, this key must exist in each data item. You can also provide a function which will receive the data item and must return the desired index',
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
    /*——————————————————————————————————————————————————————————————————————————

      Base

    ————————————————————————————————————————————————————————————————————————————*/
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsiveHeatMap&nbsp;/&gt;</code>.
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
            max: 1200,
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
                <code>&lt;ResponsiveHeatMap&nbsp;/&gt;</code>.
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
            max: 1200,
            step: 5,
        },
    },
    {
        key: 'pixelRatio',
        scopes: ['HeatMapCanvas'],
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
        key: 'minValue',
        scopes: '*',
        description: `Minimum value. If 'auto', will pick the lowest value in the provided data set. Should be overriden if your data set does not contain desired lower bound value.`,
        required: false,
        default: defaults.minValue,
        type: `{number|'auto'}`,
        controlType: 'switchableRange',
        controlGroup: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 0,
            min: -100,
            max: 100,
        },
    },
    {
        key: 'maxValue',
        scopes: '*',
        description: `Maximum value. If 'auto', will pick the highest value in the provided data set. Should be overriden if your data set does not contain desired higher bound value.`,
        required: false,
        default: defaults.maxValue,
        type: `{number|'auto'}`,
        controlType: 'switchableRange',
        controlGroup: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 100,
            min: -100,
            max: 100,
        },
    },
    {
        key: 'forceSquare',
        scopes: '*',
        description: 'Force square cells (width = height).',
        required: false,
        default: defaults.forceSquare,
        type: '{boolean}',
        controlType: 'switch',
        controlGroup: 'Base',
    },
    {
        key: 'sizeVariation',
        scopes: '*',
        description: `Size variation (0~1), if value is 0 size won't be affected. If you use for example the value 0.3, cell width/height will vary between 0.7~1 according to its corresponding value.`,
        required: false,
        default: defaults.sizeVariation,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.02,
        },
    },
    {
        key: 'padding',
        scopes: '*',
        description: 'Padding (px).',
        required: false,
        default: defaults.padding,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 0,
            max: 36,
            unit: 'px',
        },
    },
    /*——————————————————————————————————————————————————————————————————————————

      Style

    ————————————————————————————————————————————————————————————————————————————*/
    {
        key: 'cellShape',
        scopes: '*',
        description: (
            <div>
                Cell shape, can be one of: 'rect', 'circle', if a function is provided, it must
                return a valid SVG element and will receive the following props:
                <pre className="code code-block">
                    {dedent`
                        {
                            value:       {number},
                            x:           {number},
                            y:           {number},
                            width:       {number},
                            height:      {number},
                            color:       {string},
                            opacity:     {number},
                            borderWidth: {number},
                            borderColor: {string},
                            textColor:   {string},
                        }
                    `}
                </pre>
            </div>
        ),
        help: `Cell shape, can be one of: 'rect', 'circle', if a function is provided, it must return a valid SVG element.`,
        type: '{string|Function}',
        required: false,
        default: defaults.cellShape,
        controlType: 'choices',
        controlGroup: 'Style',
        controlOptions: {
            choices: ['rect', 'circle', 'Custom(props) => (…)'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'colors',
        scopes: '*',
        description: 'Defines color range.',
        type: '{string|Function|Array}',
        required: false,
        default: 'nivo',
        controlType: 'quantizeColors',
        controlGroup: 'Style',
    },
    {
        key: 'cellOpacity',
        scopes: '*',
        description: 'Cell opacity (0~1).',
        required: false,
        default: defaults.cellOpacity,
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
        key: 'cellBorderWidth',
        scopes: '*',
        description: 'Cell border width (px).',
        required: false,
        default: defaults.cellBorderWidth,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Style',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 10,
        },
    },
    {
        key: 'cellBorderColor',
        scopes: '*',
        description: (
            <span>
                how to compute cell border color,{' '}
                <Link to="/guides/colors">see dedicated documentation</Link>.
            </span>
        ),
        help: 'Method to compute cell border color.',
        type: '{string|Function}',
        required: false,
        default: defaults.cellBorderColor,
        controlType: 'color',
        controlGroup: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    /*——————————————————————————————————————————————————————————————————————————

      Labels

    ————————————————————————————————————————————————————————————————————————————*/
    {
        key: 'enableLabels',
        scopes: '*',
        description: 'Enable/disable labels.',
        type: '{boolean}',
        required: false,
        default: defaults.enableLabels,
        controlType: 'switch',
        controlGroup: 'Labels',
    },
    {
        key: 'labelTextColor',
        scopes: '*',
        description: (
            <span>
                how to compute label text color,{' '}
                <Link to="/guides/colors">see dedicated documentation</Link>.
            </span>
        ),
        help: 'Method to compute label text color.',
        type: '{string|Function}',
        required: false,
        default: defaults.labelTextColor,
        controlType: 'color',
        controlGroup: 'Labels',
        controlOptions: {
            withCustomColor: true,
        },
    },
    ...marginProperties,
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
        key: 'enableGridY',
        scopes: '*',
        description: 'Enable/disable y grid.',
        type: '{boolean}',
        required: false,
        default: defaults.enableGridY,
        controlType: 'switch',
        controlGroup: 'Grid & Axes',
    },
    ...axesProperties,
    /*——————————————————————————————————————————————————————————————————————————

      Interactivity

    ————————————————————————————————————————————————————————————————————————————*/
    {
        key: 'isInteractive',
        scopes: ['HeatMap', 'HeatMapCanvas'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'onClick',
        scopes: ['HeatMap', 'HeatMapCanvas'],
        type: '{Function}',
        required: false,
        description: (
            <div>
                onClick handler, will receive node data as first argument & event as second one. The
                node data has the following shape:
                <pre className="code code-block">
                    {dedent`
                        {
                            key:        {string},
                            value:      {number},
                            x:          {number},
                            xKey:       {string|number},
                            y:          {number},
                            yKey:       {string|number},
                            width:      {number},
                            height:     {number},
                            opacity:    {number}
                        }
                    `}
                </pre>
            </div>
        ),
    },
    {
        key: 'hoverTarget',
        scopes: ['HeatMap', 'HeatMapCanvas'],
        description: (
            <div>
                Defines hover behavior:
                <br />- <strong>cell</strong>: highlight the current cell
                <br />- <strong>row</strong>: highlight the current cell's row
                <br />- <strong>column</strong>: highlight the current cell's column
                <br />- <strong>rowColumn</strong>: highlight the current cell's row & column
                <br />
            </div>
        ),
        help: 'Defines hover behavior.',
        required: false,
        default: defaults.hoverTarget,
        type: '{number}',
        controlType: 'choices',
        controlGroup: 'Interactivity',
        controlOptions: {
            choices: ['cell', 'row', 'column', 'rowColumn'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'cellHoverOpacity',
        scopes: ['HeatMap', 'HeatMapCanvas'],
        description: 'Cell opacity on hover (0~1).',
        required: false,
        default: defaults.cellHoverOpacity,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Interactivity',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'cellHoverOthersOpacity',
        scopes: ['HeatMap', 'HeatMapCanvas'],
        description: 'Cell opacity when not hovered (0~1).',
        required: false,
        default: defaults.cellHoverOthersOpacity,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Interactivity',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    /*——————————————————————————————————————————————————————————————————————————

      Motion

    ————————————————————————————————————————————————————————————————————————————*/
    ...motionProperties(['HeatMap'], defaults),
]
