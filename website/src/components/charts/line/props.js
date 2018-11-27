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
import { lineCurvePropKeys, DotsItemDefaultProps as dotDefaults } from '@nivo/core'
import { LineDefaultProps as defaults } from '@nivo/line'
import {
    marginProperties,
    axesProperties,
    motionProperties,
    getLegendsProps,
} from '../../../lib/componentProperties'

const curveOptions = []
lineCurvePropKeys.forEach((curve, i) => {
    curveOptions.push(<code key={curve}>'{curve}'</code>)
    if (i < lineCurvePropKeys.length - 1) {
        curveOptions.push(<span key={`${curve}.comma`}>,&nbsp;</span>)
    }
})

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
            </div>
        ),
        required: true,
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsiveLine&nbsp;/&gt;</code>.
            </span>
        ),
        help: 'Chart width (px).',
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
                <code>&lt;ResponsiveLine&nbsp;/&gt;</code>.
            </span>
        ),
        help: 'Chart height (px).',
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
        scopes: ['Line'],
        description: (
            <div>
                Defines the order of layers, available layers are:
                <code>grid</code>, <code>markers</code>, <code>axes</code>, <code>areas</code>,{' '}
                <code>lines</code>, <code>slices</code>, <code>dots</code>, <code>legends</code>.
                <br />
                You can also use this to insert extra layers to the chart, this extra layer must be
                a function which will receive the chart computed data and must return a valid SVG
                element.
            </div>
        ),
        required: false,
        default: defaults.layers,
    },
    {
        key: 'curve',
        scopes: '*',
        description: (
            <span>
                Defines the curve factory to use for the line generator.
                <br />
                Must be one of: {curveOptions}.
            </span>
        ),
        help: 'Curve interpolation.',
        type: '{string}',
        required: false,
        default: defaults.curve,
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
            choices: lineCurvePropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
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
                    description: `Scale type.`,
                    type: '{string}',
                    controlType: 'choices',
                    controlOptions: {
                        disabled: true,
                        choices: ['linear', 'point'].map(v => ({
                            label: v,
                            value: v,
                        })),
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
                    description: `Scale type.`,
                    type: '{string}',
                    controlType: 'choices',
                    controlOptions: {
                        disabled: true,
                        choices: ['linear', 'point'].map(v => ({
                            label: v,
                            value: v,
                        })),
                    },
                },
                {
                    key: 'stacked',
                    scopes: '*',
                    description: 'Enable/disable stacked mode.',
                    type: '{boolean}',
                    required: false,
                    controlType: 'switch',
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
        key: 'colors',
        scopes: '*',
        description: 'Defines color range.',
        type: '{string|Function|Array}',
        required: false,
        default: defaults.colors,
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
        key: 'lineWidth',
        scopes: '*',
        description: 'Line width (px).',
        type: '{number}',
        required: false,
        default: defaults.lineWidth,
        controlType: 'range',
        controlGroup: 'Style',
        controlOptions: {
            unit: 'px',
            min: 1,
            max: 16,
        },
    },
    {
        key: 'enableArea',
        scopes: '*',
        description: 'Enable/disable area below each line.',
        type: '{boolean}',
        required: false,
        default: defaults.enableArea,
        controlType: 'switch',
        controlGroup: 'Style',
    },
    {
        key: 'areaBaselineValue',
        scopes: '*',
        description: (
            <div>
                Define the value to be used for area baseline. Please note that this value isn't the
                position of the baseline but the value used to compute it.
            </div>
        ),
        type: '{number|string|Date}',
        required: false,
        default: defaults.areaBaselineValue,
        controlType: 'range',
        controlGroup: 'Style',
        controlOptions: {
            min: 0,
            max: 200,
            step: 10,
        },
    },
    {
        key: 'areaOpacity',
        scopes: '*',
        description: 'Area opacity (0~1), depends on enableArea.',
        required: false,
        default: defaults.areaOpacity,
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
        key: 'areaBlendMode',
        scopes: '*',
        description: (
            <span>
                Defines CSS <code>mix-blend-mode</code> property for areas, see{' '}
                <a
                    href="https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    MDN documentation
                </a>
                .
            </span>
        ),
        type: '{string}',
        required: false,
        default: defaults.areaBlendMode,
        controlType: 'choices',
        controlGroup: 'Style',
        controlOptions: {
            choices: [
                'normal',
                'multiply',
                'screen',
                'overlay',
                'darken',
                'lighten',
                'color-dodge',
                'color-burn',
                'hard-light',
                'soft-light',
                'difference',
                'exclusion',
                'hue',
                'saturation',
                'color',
                'luminosity',
            ].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    ...marginProperties,
    {
        key: 'enableDots',
        scopes: '*',
        description: 'Enable/disable dots.',
        type: '{boolean}',
        required: false,
        default: defaults.enableDots,
        controlType: 'switch',
        controlGroup: 'Dots',
    },
    {
        key: 'dotSymbol',
        description:
            'Overrides default dot circle. The function will receive `size`, `color`, `borderWidth` and `borderColor` props and must return a valid SVG element.',
        type: '{Function}',
        required: false,
    },
    {
        key: 'dotSize',
        description: 'Size of the dots (px).',
        type: '{number}',
        required: false,
        default: defaults.dotSize,
        controlType: 'range',
        controlGroup: 'Dots',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 20,
        },
    },
    {
        key: 'dotColor',
        scopes: '*',
        description: 'Method to compute dots color.',
        type: '{string|Function}',
        required: false,
        default: defaults.dotColor,
        controlType: 'color',
        controlGroup: 'Dots',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'dotBorderWidth',
        description: 'Width of the dots border (px).',
        type: '{number}',
        required: false,
        default: defaults.dotBorderWidth,
        controlType: 'range',
        controlGroup: 'Dots',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 10,
        },
    },
    {
        key: 'dotBorderColor',
        scopes: '*',
        description: 'Method to compute dots border color.',
        type: '{string|Function}',
        required: false,
        default: defaults.dotBorderColor,
        controlType: 'color',
        controlGroup: 'Dots',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'enableDotLabel',
        scopes: '*',
        description: 'Enable/disable dots label.',
        type: '{boolean}',
        required: false,
        default: defaults.enableDotLabel,
        controlType: 'switch',
        controlGroup: 'Dots',
    },
    {
        key: 'dotLabel',
        description:
            'Property to use to determine dot label. If a function is provided, it will receive current value and serie and must return a label.',
        type: '{string}',
        required: false,
        controlType: 'choices',
        controlGroup: 'Dots',
        controlOptions: {
            choices: ['y', 'x', 'serie.id', `d => \`\${d.x}: \${d.y}\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'dotLabelYOffset',
        description: 'Label Y offset from dot shape (px).',
        type: '{number}',
        required: false,
        default: dotDefaults.labelYOffset,
        controlType: 'range',
        controlGroup: 'Dots',
        controlOptions: {
            unit: 'px',
            min: -24,
            max: 24,
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
    ...axesProperties,
    {
        key: 'isInteractive',
        scopes: ['Line'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'enableStackTooltip',
        scopes: ['Line'],
        description: `Enable/disable stack tooltip ('isInteractive' must also be 'true').`,
        type: '{boolean}',
        required: false,
        default: defaults.enableStackTooltip,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'tooltip',
        scopes: ['Line'],
        description: `Method to create custom tooltip`,
        type: '{Function}',
        required: false,
        default: defaults.tooltip,
    },
    {
        key: 'legends',
        scopes: ['Line'],
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
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 4,
                symbolSize: 20,
                symbolShape: 'circle',
                itemDirection: 'left-to-right',
                itemTextColor: '#777',
                onClick: data => {
                    alert(JSON.stringify(data, null, '    '))
                },
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1,
                        },
                    },
                ],
            },
        },
    },
    ...motionProperties(['Line'], defaults),
]
