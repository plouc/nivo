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
import { ChordDefaultProps as defaults } from '@nivo/chord'
import { marginProperties, motionProperties } from '../../../lib/componentProperties'

export default [
    {
        key: 'matrix',
        scopes: '*',
        description:
            'The matrix used to compute the chord diagram, it must be a square matrix, meaning each row length must equal the row count.',
        required: true,
        type: '{Array.<Array.<number>>}',
    },
    {
        key: 'keys',
        scopes: '*',
        description: (
            <div>
                Keys used to identify each cell in the matrix, for example given this matrix:
                <pre className="code code-block">
                    {dedent`
                        [ [123, 37,  99 ],
                          [75,  103, 82 ],
                          [37,  65,  109] ]
                    `}
                </pre>
                and those keys:
                <pre className="code code-block">['John', 'Jane', 'Raoul']</pre>
                it will result in the following mapping:
                <pre className="code code-block">
                    {dedent`
                        [ [null,    'John', 'Jane',  'Raoul']
                          ['John',   123,    37,      99    ],
                          ['Jane',   75,     103,     82    ],
                          ['Raoul',  37,     65,      109   ] ]
                    `}
                </pre>
            </div>
        ),
        required: true,
        type: '{Array.<string>}',
    },
    /*##################################################################################################################

        Base

    ##################################################################################################################*/
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsiveChord&nbsp;/&gt;</code>.<br />
                Also note that width does not include labels, so you should add enough margin to
                display them.
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
                <code>&lt;ResponsiveChord&nbsp;/&gt;</code>.<br />
                Also note that height does not include labels, so you should add enough margin to
                display them.
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
        scopes: ['ChordCanvas'],
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
        key: 'padAngle',
        scopes: '*',
        description: 'Padding angle.',
        required: false,
        default: defaults.padAngle,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.01,
        },
    },
    {
        key: 'innerRadiusRatio',
        scopes: '*',
        description: 'Inner radius ratio.',
        required: false,
        default: defaults.innerRadiusRatio,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.01,
        },
    },
    {
        key: 'innerRadiusOffset',
        scopes: '*',
        description: 'Inner radius offset.',
        required: false,
        default: defaults.innerRadiusOffset,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.01,
        },
    },
    /*##################################################################################################################

        Style

    ##################################################################################################################*/
    {
        key: 'colors',
        scopes: '*',
        description: 'Defines how to compute arc/ribbon color.',
        type: '{string|Function|Array}',
        required: false,
        default: defaults.colors,
        controlType: 'colors',
        controlGroup: 'Style',
    },
    {
        key: 'arcOpacity',
        scopes: '*',
        description: 'Arcs opacity.',
        required: false,
        default: defaults.arcOpacity,
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
        key: 'arcBorderWidth',
        scopes: '*',
        description: 'Arcs border width.',
        required: false,
        default: defaults.arcBorderWidth,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Style',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 12,
        },
    },
    {
        key: 'arcBorderColor',
        scopes: '*',
        description: 'Arcs border color.',
        required: false,
        default: defaults.arcBorderColor,
        type: '{string|Function}',
        controlType: 'color',
        controlGroup: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'ribbonOpacity',
        scopes: '*',
        description: 'Ribbons opacity.',
        required: false,
        default: defaults.ribbonOpacity,
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
        key: 'ribbonBorderWidth',
        scopes: '*',
        description: 'Ribbons border width.',
        required: false,
        default: defaults.ribbonBorderWidth,
        type: '{number}',
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
        key: 'ribbonBorderColor',
        scopes: '*',
        description: 'Ribbons border color.',
        required: false,
        default: defaults.ribbonBorderColor,
        type: '{string|Function}',
        controlType: 'color',
        controlGroup: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    ...marginProperties,
    /*##################################################################################################################

        Labels

    ##################################################################################################################*/
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
        key: 'label',
        description:
            'Defines how to get label text, can be a string (used to access current arc data property) or a function which will receive the actual arc data.',
        type: '{string|Function}',
        required: false,
        default: defaults.label,
        controlType: 'choices',
        controlGroup: 'Labels',
        controlOptions: {
            choices: ['id', 'value', `d => \`\${d.id} [\${d.value}]\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'labelOffset',
        scopes: '*',
        description: 'Label offset from arc (px).',
        required: false,
        default: defaults.labelOffset,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Labels',
        controlOptions: {
            unit: 'px',
            min: -80,
            max: 80,
        },
    },
    {
        key: 'labelRotation',
        scopes: '*',
        description: 'Label rotation (deg).',
        required: false,
        default: defaults.labelRotation,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Labels',
        controlOptions: {
            unit: 'deg',
            min: -180,
            max: 180,
            step: 5,
        },
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
    /*##################################################################################################################

        Interactivity

    ##################################################################################################################*/
    {
        key: 'isInteractive',
        scopes: ['Chord', 'ChordCanvas'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'arcHoverOpacity',
        scopes: ['Chord', 'ChordCanvas'],
        description: 'Arc opacity when hover (0~1).',
        required: false,
        default: defaults.arcHoverOpacity,
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
        key: 'arcHoverOthersOpacity',
        scopes: ['Chord', 'ChordCanvas'],
        description: 'Arc opacity when not hover (0~1).',
        required: false,
        default: defaults.arcHoverOthersOpacity,
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
        key: 'ribbonHoverOpacity',
        scopes: ['Chord', 'ChordCanvas'],
        description: 'Ribbon opacity when hover (0~1).',
        required: false,
        default: defaults.ribbonHoverOpacity,
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
        key: 'ribbonHoverOthersOpacity',
        scopes: ['Chord', 'ChordCanvas'],
        description: 'Ribbon opacity when not hover (0~1).',
        required: false,
        default: defaults.ribbonHoverOthersOpacity,
        type: '{number}',
        controlType: 'range',
        controlGroup: 'Interactivity',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    ...motionProperties(['Chord'], defaults),
]
