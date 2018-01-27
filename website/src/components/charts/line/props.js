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
import { LineChartSvg } from '@nivo/line'
import {
    marginProperties,
    axesProperties,
    motionProperties,
} from '../../../lib/componentProperties'

const defaults = LineChartSvg.defaultProps

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
                        Array.<{
                            id: {string|number}
                            data: Array.<{ x: {string|number}, y: {number} }}>
                        }>
                    `}
                </pre>
            </div>
        ),
        required: true,
    },
    {
        key: 'xScaleType',
        type: `{('linear'|'ordinal')}`,
        scopes: '*',
        default: defaults.xScaleType,
        description: `Defines x scale type, if you have numeric data, then you should use 'linear', otherwise 'ordinal'`,
        required: false,
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using <code>Responsive*</code> components.
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
                not required if using <code>Responsive*</code> components.
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
        key: 'stacked',
        scopes: '*',
        description: 'Enable/disable stacked mode.',
        type: '{boolean}',
        required: false,
        default: defaults.stacked,
        controlType: 'switch',
        controlGroup: 'Base',
    },
    {
        key: 'curve',
        scopes: '*',
        description: (
            <span>
                Defines the curve factory to use for the line generator.<br />
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
        default: true,
        controlType: 'switch',
        controlGroup: 'Areas',
    },
    {
        key: 'areaOpacity',
        scopes: '*',
        description: 'Area opacity (0~1), depends on enableArea.',
        required: false,
        default: defaults.areaOpacity,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Areas',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
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
        key: 'dotsEveryNth',
        scopes: '*',
        description:
            'Allows you to only display every nth dot. May be used when you have a lot of points to improve legibility.',
        type: '{number}',
        required: false,
        default: defaults.dotsEveryNth,
        controlType: 'range',
        controlGroup: 'Dots',
        controlOptions: {
            min: 1,
            max: 20,
        },
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
            min: 0,
            max: 20,
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
        key: 'dotLabelColor',
        scopes: '*',
        description: 'Method to compute dots label color.',
        type: '{string|Function}',
        required: false,
        default: defaults.dotLabelColor,
        controlType: 'color',
        controlGroup: 'Dots',
        controlOptions: {
            withCustomColor: true,
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
    ...axesProperties,
    {
        key: 'enableGridX',
        scopes: '*',
        description: 'Enable/disable x grid.',
        type: '{boolean}',
        required: false,
        default: defaults.enableGridX,
        controlType: 'switch',
        controlGroup: 'Grid',
    },
    {
        key: 'enableGridY',
        scopes: '*',
        description: 'Enable/disable y grid.',
        type: '{boolean}',
        required: false,
        default: defaults.enableGridY,
        controlType: 'switch',
        controlGroup: 'Grid',
    },
    {
        key: 'isInteractive',
        scopes: ['LineChartSvg'],
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
        key: 'enableTooltip',
        scopes: ['LineChartSvg', 'LineChartCanvas'],
        description: `Enable/disable tooltip.`,
        type: '{boolean}',
        required: false,
        default: defaults.enableTooltip,
        controlType: 'switch',
        controlGroup: 'Tooltips',
    },
    {
        key: 'tooltipIndicatorThickness',
        description: 'Tooltip indicator thickness (px) (line).',
        type: '{number}',
        required: false,
        default: dotDefaults.tooltipIndicatorThickness,
        controlType: 'range',
        controlGroup: 'Tooltips',
        controlOptions: {
            unit: 'px',
            min: 0.5,
            max: 10,
            step: 0.5
        },
    },
    {
        key: 'tooltipIndicatorColor',
        scopes: ['LineChartSvg', 'LineChartCanvas'],
        description: `Tooltip indicator color (line).`,
        type: '{string}',
        required: false,
        default: defaults.tooltipIndicatorColor,
        controlType: 'colorPicker',
        controlGroup: 'Tooltips'
    },
    {
        key: 'tooltipIndicatorStyle',
        scopes: ['LineChartSvg', 'LineChartCanvas'],
        description: `Tooltip indicator style override (line).`,
        type: '{Object}',
        required: false,
    },
    ...motionProperties(['LineChartSvg'], defaults),
]
