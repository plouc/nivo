/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { ScatterPlotDefaultProps as defaults } from '@nivo/scatterplot'
import {
    marginProperties,
    axesProperties,
    motionProperties,
} from '../../../lib/componentProperties'
import dedent from 'dedent-js'

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
                            id: {string|number}
                            data: Array<{
                                x: {number|string|Date}
                                y: {number|string|Date}
                            }>
                        }>
                    `}
                </pre>
                Please not that you should adjust <code>xScale</code> and <code>yScale</code>{' '}
                according to <code>x</code> and <code>y</code> type, for example if you use dates,
                you should use a <code>time</code> scale.
            </div>
        ),
        required: true,
    },
    {
        key: 'xScale',
        scopes: '*',
        type: '{object}',
        description: `X scale configuration.`,
        controlGroup: 'Base',
        controlType: 'object',
        controlOptions: {
            props: [
                {
                    key: 'type',
                    description: `Scale type, supports linear, point and time scales.`,
                    type: '{string}',
                    controlType: 'choices',
                    controlOptions: {
                        disabled: true,
                        choices: ['linear'].map(v => ({
                            label: v,
                            value: v,
                        })),
                    },
                },
                {
                    key: 'min',
                    description: 'Minimum scale value.',
                    required: false,
                    type: `{number|'auto'}`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        disabledValue: 'auto',
                        defaultValue: 0,
                        min: -2000,
                        max: 2000,
                    },
                },
                {
                    key: 'max',
                    description: 'Maximum scale value.',
                    required: false,
                    type: `{number|'auto'}`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        disabledValue: 'auto',
                        defaultValue: 1200,
                        min: -2000,
                        max: 2000,
                    },
                },
            ],
        },
    },
    {
        key: 'yScale',
        scopes: '*',
        type: '{object}',
        description: `Y scale configuration.`,
        controlGroup: 'Base',
        controlType: 'object',
        controlOptions: {
            props: [
                {
                    key: 'type',
                    description: `Scale type, supports linear, point and time scales.`,
                    type: '{string}',
                    controlType: 'choices',
                    controlOptions: {
                        disabled: true,
                        choices: ['linear'].map(v => ({
                            label: v,
                            value: v,
                        })),
                    },
                },
                {
                    key: 'min',
                    description: 'Minimum scale value.',
                    required: false,
                    type: `{number|'auto'}`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        disabledValue: 'auto',
                        defaultValue: 0,
                        min: -2000,
                        max: 2000,
                    },
                },
                {
                    key: 'max',
                    description: 'Maximum scale value.',
                    required: false,
                    type: `{number|'auto'}`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        disabledValue: 'auto',
                        defaultValue: 1200,
                        min: -2000,
                        max: 2000,
                    },
                },
            ],
        },
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                Not required if using&nbsp;
                <code>Responsive*</code> component.
                <br />
                Also note that width exclude left/right axes, please add margin to make sure they're
                visible.
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
                Not required if using&nbsp;
                <code>Responsive*</code> component.
                <br />
                Also note that width exclude top/bottom axes, please add margin to make sure they're
                visible.
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
        scopes: ['ScatterPlot'],
        description: (
            <div>
                Defines the order of layers, available layers are:
                <code>grid</code>, <code>axes</code>, <code>points</code>, <code>markers</code>,{' '}
                <code>mesh</code>, <code>legends</code>.<br />
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
        scopes: ['ScatterPlotCanvas'],
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
            'Property to use to determine node color. If a function is provided, it will receive current node data and must return a color.',
        required: false,
        default: defaults.colorBy,
        controlType: 'choices',
        controlGroup: 'Style',
        controlOptions: {
            choices: [
                {
                    label: 'serie.id',
                    value: 'serie.id',
                },
                {
                    label: 'id',
                    value: 'id',
                },
            ],
        },
    },
    {
        key: 'symbolSize',
        scopes: '*',
        description: `Symbol size (px).`,
        required: false,
        default: defaults.symbolSize,
        type: `{number}`,
        controlType: 'range',
        controlGroup: 'Symbols',
        controlOptions: {
            min: 2,
            max: 24,
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
    {
        key: 'isInteractive',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'useMesh',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        description: 'Use a mesh to detect mouse interactions.',
        type: '{boolean}',
        required: false,
        default: defaults.useMesh,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'debugMesh',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        description: 'Display mesh used to detect mouse interactions (voronoi cells).',
        type: '{boolean}',
        required: false,
        default: defaults.debugMesh,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'tooltip',
        scopes: ['ScatterPlot'],
        type: '{Function}',
        required: false,
        description: (
            <div>
                A function allowing complete tooltip customisation, it must return a valid HTML
                element and will receive the following data:
                <pre className="code code-block">
                    {dedent`
                        {
                            id:    {string|number},
                            serie: {string|number},
                            color: {string},
                            x:     {number},
                            y:     {number},
                        }
                    `}
                </pre>
            </div>
        ),
    },
    {
        key: 'custom tooltip example',
        scopes: ['ScatterPlot'],
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
        key: 'onMouseEnter',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        description: 'onMouseEnter handler, it receives target node data and mouse event.',
        type: '{Function}',
        required: false,
    },
    {
        key: 'onMouseMove',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        description: 'onMouseMove handler, it receives target node data and mouse event.',
        type: '{Function}',
        required: false,
    },
    {
        key: 'onMouseLeave',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        description: 'onMouseLeave handler, it receives target node data and mouse event.',
        type: '{Function}',
        required: false,
    },
    {
        key: 'onClick',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        description: 'onClick handler, it receives target node data and mouse event.',
        type: '{Function}',
        required: false,
    },
    ...motionProperties(['ScatterPlot'], defaults),
]
