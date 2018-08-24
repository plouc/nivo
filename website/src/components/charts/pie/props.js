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
import { PieDefaultProps as defaults } from '@nivo/pie'
import { marginProperties, defsProperties } from '../../../lib/componentProperties'

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
                            id:    {string|number},
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
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsivePie&nbsp;/&gt;</code>.
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
                <code>&lt;ResponsivePie&nbsp;/&gt;</code>.
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
        key: 'pixelRatio',
        scopes: ['PieCanvas'],
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
        key: 'startAngle',
        scopes: ['Pie', 'PieCanvas'],
        description: 'Start angle (deg.) useful to make gauges for example.',
        type: '{number}',
        required: false,
        default: defaults.startAngle,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'deg.',
            min: -180,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'endAngle',
        scopes: ['Pie', 'PieCanvas'],
        description: 'End angle (deg.) useful to make gauges for example.',
        type: '{number}',
        required: false,
        default: defaults.endAngle,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'deg.',
            min: -360,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'fit',
        scopes: ['Pie', 'PieCanvas'],
        description: `If 'true', pie will be omptimized to occupy more space when using partial pie.`,
        type: '{boolean}',
        required: false,
        default: defaults.fit,
        controlType: 'switch',
        controlGroup: 'Base',
    },
    {
        key: 'innerRadius',
        description: `Donut chart if greater than 0. Value should be between 0~1 as it's a ratio from original radius.`,
        type: '{number}',
        required: false,
        default: defaults.innerRadius,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: '(ratio)',
            min: 0,
            max: 0.95,
            step: 0.05,
        },
    },
    {
        key: 'padAngle',
        description: 'Padding (deg.) between each pie slice.',
        type: '{number}',
        required: false,
        default: defaults.padAngle,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'deg.',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'cornerRadius',
        description: 'Rounded slices.',
        type: '{number}',
        required: false,
        default: defaults.cornerRadius,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'sortByValue',
        scopes: ['Pie', 'PieCanvas'],
        description: `If 'true', arcs will be ordered according to their associated value.`,
        type: '{boolean}',
        required: false,
        default: defaults.sortByValue,
        controlType: 'switch',
        controlGroup: 'Base',
    },
    /*
    ————————————————————————————————————————————————————————————————————————————

        Styling

    ————————————————————————————————————————————————————————————————————————————
    */
    {
        key: 'colors',
        description: 'Defines color range.',
        type: '{string|Function|Array}',
        required: false,
        default: defaults.colors,
        controlType: 'colors',
        controlGroup: 'Style',
    },
    {
        key: 'colorBy',
        description:
            'Property to use to determine node color. If a function is provided, it will receive current node data and must return a color.',
        type: '{string|Function}',
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
    ...defsProperties(['Pie', 'api']),
    {
        key: 'showcase pattern usage',
        scopes: ['Pie', 'api'],
        excludeFromDoc: true,
        description: (
            <span>
                You can use <code>defs</code> and <code>fill</code> properties to use patterns, see{' '}
                <Link to="/guides/patterns">dedicated guide</Link> for further information.
            </span>
        ),
        type: '{boolean}',
        controlType: 'switch',
        controlGroup: 'Style',
    },
    {
        key: 'borderWidth',
        description: 'Slices border width.',
        type: '{number}',
        required: false,
        default: defaults.borderWidth,
        controlType: 'range',
        controlGroup: 'Style',
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
        controlGroup: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    ...marginProperties,
    {
        key: 'enableRadialLabels',
        description: 'Enable/disable radial labels.',
        type: '{boolean}',
        required: false,
        default: defaults.enableRadialLabels,
        controlType: 'switch',
        controlGroup: 'Radial labels',
    },
    {
        key: 'radialLabel',
        description:
            'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data.',
        type: '{string|Function}',
        required: false,
        default: 'id',
        controlType: 'choices',
        controlGroup: 'Radial labels',
        controlOptions: {
            choices: ['id', 'value', `d => \`\${d.id} (\${d.value})\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'radialLabelsSkipAngle',
        description: `Skip label if corresponding slice's angle is lower than provided value.`,
        type: '{number}',
        required: false,
        default: 0,
        controlType: 'range',
        controlGroup: 'Radial labels',
        controlOptions: {
            unit: 'deg.',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'radialLabelsLinkOffset',
        description: `Link offset from pie outer radius, useful to have links overlapping pie slices.`,
        type: '{number}',
        required: false,
        //default: ,
        controlType: 'range',
        controlGroup: 'Radial labels',
        controlOptions: {
            unit: 'px',
            min: -24,
            max: 24,
            step: 1,
        },
    },
    {
        key: 'radialLabelsLinkDiagonalLength',
        description: `Link diagonal length.`,
        type: '{number}',
        required: false,
        //default
        controlType: 'range',
        controlGroup: 'Radial labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
            step: 1,
        },
    },
    {
        key: 'radialLabelsLinkHorizontalLength',
        description: `Links horizontal length.`,
        type: '{number}',
        required: false,
        //default
        controlType: 'range',
        controlGroup: 'Radial labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
            step: 1,
        },
    },
    {
        key: 'radialLabelsTextXOffset',
        description: `X offset from links' end.`,
        type: '{number}',
        required: false,
        //default
        controlType: 'range',
        controlGroup: 'Radial labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
            step: 1,
        },
    },
    {
        key: 'radialLabelsLinkStrokeWidth',
        description: 'Links stroke width.',
        type: '{number}',
        required: false,
        //default
        controlType: 'range',
        controlGroup: 'Radial labels',
        controlOptions: {
            unit: 'px',
            min: 1,
            max: 10,
            step: 1,
        },
    },
    {
        key: 'radialLabelsTextColor',
        description: 'Defines how to compute radial label text color.',
        type: '{string|Function}',
        required: false,
        default: defaults.radialLabelsTextColor,
        controlType: 'color',
        controlGroup: 'Radial labels',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'radialLabelsLinkColor',
        description: 'Defines how to compute radial label link color.',
        type: '{string|Function}',
        required: false,
        default: defaults.radialLabelsLinkColor,
        controlType: 'color',
        controlGroup: 'Radial labels',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'enableSlicesLabels',
        description: 'Enable/disable slices labels.',
        type: '{boolean}',
        required: false,
        default: defaults.enableSlicesLabels,
        controlType: 'switch',
        controlGroup: 'Slices labels',
    },
    {
        key: 'sliceLabel',
        description:
            'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data.',
        type: '{string|Function}',
        required: false,
        default: 'value',
        controlType: 'choices',
        controlGroup: 'Slices labels',
        controlOptions: {
            choices: ['id', 'value', `d => \`\${d.id} (\${d.value})\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'slicesLabelsSkipAngle',
        description: `Skip label if corresponding slice's angle is lower than provided value.`,
        type: '{number}',
        required: false,
        default: 0,
        controlType: 'range',
        controlGroup: 'Slices labels',
        controlOptions: {
            unit: 'deg.',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'slicesLabelsTextColor',
        description: 'Defines how to compute slice label text color.',
        type: '{string|Function}',
        required: false,
        default: 'theme',
        controlType: 'color',
        controlGroup: 'Slices labels',
        controlOptions: {
            withCustomColor: true,
        },
    },
    /*
    ————————————————————————————————————————————————————————————————————————————

        Interactivity

    ————————————————————————————————————————————————————————————————————————————
    */
    {
        key: 'isInteractive',
        scopes: ['Pie', 'PieCanvas'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'onClick',
        scopes: ['Pie', 'PieCanvas'],
        description:
            'onClick handler for pie slices, it receives clicked slice data and mouse event.',
        type: '{Function}',
        required: false,
    },
    {
        key: 'tooltip',
        scopes: ['Pie', 'PieCanvas'],
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
                            value: {number},
                            label: {string|number},
                            color: {string}
                        }
                    `}
                </pre>
            </div>
        ),
    },
    {
        key: 'custom tooltip example',
        scopes: ['Pie', 'PieCanvas'],
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
    /*
    ————————————————————————————————————————————————————————————————————————————

        Motion
        not implemented yet :(

    ————————————————————————————————————————————————————————————————————————————
    {
        key: 'animate',
        scopes: ['Pie'],
        description: 'Enable/disable transitions.',
        type: '{boolean}',
        required: false,
        default: defaults.animate,
        controlType: 'switch',
        controlGroup: 'Motion',
    },
    {
        key: 'motionStiffness',
        scopes: ['Pie'],
        description: 'Motion stiffness.',
        type: '{number}',
        required: false,
        controlType: 'range',
        controlGroup: 'Motion',
        controlOptions: {
            min: 0,
            max: 300,
            step: 5,
        },
    },
    {
        key: 'motionDamping',
        scopes: ['Pie'],
        description: 'Motion damping.',
        type: '{number}',
        required: false,
        controlType: 'range',
        controlGroup: 'Motion',
        controlOptions: {
            min: 0,
            max: 40,
        },
    },
    */
]
