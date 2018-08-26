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
import { closedCurvePropKeys } from '@nivo/core'
import { DotsItemDefaultProps as dotDefaults } from '@nivo/core'
import { RadarDefaultProps as defaults, RadarDots } from '@nivo/radar'
import { marginProperties, motionProperties } from '../../../lib/componentProperties'

const dotsDefaults = RadarDots.defaultProps

const curveOptions = []
closedCurvePropKeys.forEach((curve, i) => {
    curveOptions.push(<code key={curve}>'{curve}'</code>)
    if (i < closedCurvePropKeys.length - 1) {
        curveOptions.push(<span key={`${curve}.comma`}>,&nbsp;</span>)
    }
})

export default [
    {
        key: 'data',
        scopes: '*',
        description: (
            <div>
                Chart data. If using objects indexBy & keys should be strings, if using array they
                should be numbers.
                <br />
                For example, given this config:
                <pre className="code code-block">{dedent`
                [
                  { language: 'javascript', john: 12, sarah: 32, bob: 27 },
                  { language: 'golang', john: 25, sarah: 15, bob: 3 },
                  { language: 'python', john: 5, sarah: 22, bob: 31 },
                  { language: 'java', john: 19, sarah: 17, bob: 9 }
                ]
                keys: ['john', 'sarah', 'bob']
                indexBy: 'language'
                `}</pre>
                We'll have a radar chart representing programing skills for each user by language (3
                layers and 4 dimensions).
            </div>
        ),
        type: '{Array.<Object|Array>}',
        required: true,
    },
    {
        key: 'indexBy',
        scopes: '*',
        description: 'Key to use to index the data, this key must exist in each data item.',
        type: '{string|number}',
        required: false,
        default: defaults.indexBy,
    },
    {
        key: 'keys',
        scopes: '*',
        description:
            'Keys to use to determine each serie. Those keys should exist in each data item.',
        type: '{Array.<string|number>}',
        required: false,
        default: defaults.keys,
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
            defaultValue: 200,
            min: 0,
            max: 1000,
        },
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsiveRadar&nbsp;/&gt;</code>.
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
                <code>&lt;ResponsiveRadar&nbsp;/&gt;</code>.
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
            choices: closedCurvePropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'colors',
        description: 'Defines how to compute slice color.',
        type: '{string|Function|Array}',
        required: false,
        default: 'nivo',
        controlType: 'colors',
        controlGroup: 'Base',
    },
    {
        key: 'colorBy',
        description: (
            <span>
                Property to use to determine node color.
                <br />
                If a function is provided, it will receive current node data and must return a
                color.
                <br />
                By default it will use the key of each serie and pick a color from colors according
                to this key.
            </span>
        ),
        type: '{string|Function}',
        required: false,
        default: 'key',
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                {
                    label: 'key',
                    value: 'key',
                },
            ],
        },
    },
    {
        key: 'fillOpacity',
        description: 'Shape fill opacity.',
        type: '{number}',
        required: false,
        default: defaults.borderWidth,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'borderWidth',
        description: 'Shape border width (px).',
        type: '{number}',
        required: false,
        default: defaults.borderWidth,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 12,
            step: 1,
        },
    },
    {
        key: 'borderColor',
        description: 'Method to compute border color.',
        type: '{string|Function}',
        required: false,
        default: defaults.borderColor,
        controlType: 'color',
        controlGroup: 'Base',
        controlOptions: {
            withCustomColor: true,
        },
    },
    ...marginProperties,
    {
        key: 'gridLevels',
        description: 'Number of levels to display for grid',
        type: '{number}',
        required: false,
        default: defaults.gridLevels,
        controlType: 'range',
        controlGroup: 'Grid',
        controlOptions: {
            min: 1,
            max: 12,
        },
    },
    {
        key: 'gridShape',
        description: 'Determine shape of the grid, must be one of: circular, linear.',
        help: 'Determine shape of the grid.',
        type: '{string}',
        required: false,
        default: defaults.gridShape,
        controlType: 'choices',
        controlGroup: 'Grid',
        controlOptions: {
            choices: [
                { label: 'circular', value: 'circular' },
                { label: 'linear', value: 'linear' },
            ],
        },
    },
    {
        key: 'gridLabel',
        type: '{Function}',
        description: (
            <div>
                An optional function to override label rendering. It must return a{' '}
                <strong>valid SVG element</strong> and will receive the following props:
                <pre className="code code-block">{dedent`{
                    id:     string
                    # this can be used to determine the label layout,
                    # if the element should be centered, left/right aligned
                    anchor: 'start' | 'middle' | 'end'
                    # angle in degrees
                    angle:  number
                }`}</pre>
                The component will be wrapped inside a <code>g</code> element{' '}
                <strong>already positioned</strong> where the default label would have been placed.
            </div>
        ),
    },
    {
        key: 'gridLabelOffset',
        description: 'Label offset from outer radius (px).',
        type: '{number}',
        required: false,
        default: defaults.gridLabelOffset,
        controlType: 'range',
        controlGroup: 'Grid',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
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
        default: dotsDefaults.size,
        controlType: 'range',
        controlGroup: 'Dots',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 64,
        },
    },
    {
        key: 'dotColor',
        scopes: '*',
        description: 'Method to compute dots color.',
        type: '{string|Function}',
        required: false,
        default: dotsDefaults.color,
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
        default: dotsDefaults.borderWidth,
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
        default: dotsDefaults.borderColor,
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
        default: dotsDefaults.enableLabel,
        controlType: 'switch',
        controlGroup: 'Dots',
    },
    {
        key: 'dotLabel',
        description:
            'Property to use to determine dot label. If a function is provided, it will receive current value and serie and must return a label.',
        type: '{string}',
        required: false,
        default: dotsDefaults.label,
        controlType: 'choices',
        controlGroup: 'Dots',
        controlOptions: {
            choices: [
                'value',
                'index',
                'key',
                `d => \`\${d.key}: \${d.value}\``,
                `d => \`\${d.index}: \${d.value}\``,
            ].map(choice => ({
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
        key: 'isInteractive',
        scopes: ['Radar'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    ...motionProperties(['Radar'], defaults),
]
