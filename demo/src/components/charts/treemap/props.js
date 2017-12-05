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
} from '../../../lib/componentProperties'
import { TreeMapDefaultProps } from '@nivo/treemap'

const defaults = TreeMapDefaultProps

export default [
    {
        key: 'root',
        scopes: '*',
        description: 'The hierarchical data object.',
        type: '{Object}',
        required: true,
    },
    {
        key: 'identity',
        scope: '*',
        description: 'The key or function to use to retrieve nodes identity.',
        type: '{string|Function}',
        required: false,
        default: defaults.identity,
    },
    {
        key: 'value',
        scope: '*',
        description: 'The key or function to use to retrieve nodes value.',
        type: '{string|Function}',
        required: false,
        default: 'value',
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
        scopes: ['TreeMapCanvas'],
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
        key: 'tile',
        scopes: '*',
        description: (
            <span>
                valid values are: <code className="code-string">'squarify'</code>,{' '}
                <code className="code-string">'slice'</code>,{' '}
                <code className="code-string">'dice'</code>,{' '}
                <code className="code-string">'slice-dice'</code>, see{' '}
                <a
                    href="https://github.com/mbostock/d3/wiki/Treemap-Layout#mode"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    d3 documentation
                </a>
            </span>
        ),
        type: '{string}',
        required: false,
        default: 'squarify',
        help: 'Strategy used to compute nodes.',
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                { label: 'binary', value: 'binary' },
                { label: 'squarify', value: 'squarify' },
                { label: 'slice', value: 'slice' },
                { label: 'dice', value: 'dice' },
                { label: 'sliceDice', value: 'sliceDice' },
                {
                    label: 'resquarify',
                    value: 'resquarify',
                },
            ],
        },
    },
    {
        key: 'leavesOnly',
        scopes: '*',
        description: 'Only render leaf nodes (no parent).',
        type: '{boolean}',
        required: false,
        default: defaults.leavesOnly,
        controlType: 'switch',
        controlGroup: 'Base',
    },
    {
        key: 'innerPadding',
        scopes: '*',
        description: 'Padding between parent and child node.',
        type: '{number}',
        required: false,
        default: defaults.innerPadding,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    {
        key: 'outerPadding',
        scopes: '*',
        description: 'Padding between parent and child node.',
        type: '{number}',
        required: false,
        default: defaults.outerPadding,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    /*—————————————————————————————————————————————————————————————————————————————

      Styling

    —————————————————————————————————————————————————————————————————————————————*/
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
        default: 'depth',
        controlType: 'choices',
        controlGroup: 'Style',
        controlOptions: {
            choices: [
                {
                    label: 'depth',
                    value: 'depth',
                },
                {
                    label: 'name',
                    value: 'name',
                },
                {
                    label: 'd => d.color',
                    value: 'd => d.color',
                },
            ],
        },
    },
    {
        key: 'borderWidth',
        scopes: '*',
        description: 'Control node border width.',
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
    ...defsProperties(['TreeMap']),
    ...marginProperties,
    {
        key: 'enableLabel',
        scopes: '*',
        description: 'Enable/disable labels.',
        type: '{boolean}',
        required: false,
        default: true,
        controlType: 'switch',
        controlGroup: 'Labels',
    },
    {
        key: 'label',
        scopes: '*',
        description:
            'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data and must return the desired label.',
        type: '{string|Function}',
        required: false,
        // default
        controlType: 'choices',
        controlGroup: 'Labels',
        controlOptions: {
            choices: ['loc', 'name', `d => \`\${d.name} (\${d.loc})\``].map(prop => ({
                label: prop,
                value: prop,
            })),
        },
    },
    {
        key: 'labelSkipSize',
        scopes: '*',
        description:
            'Skip label rendering if node minimal side length is lower than given value, 0 to disable.',
        type: '{number}',
        required: false,
        //default
        controlType: 'range',
        controlGroup: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'orientLabel',
        scopes: '*',
        description: 'Orient labels according to max node width/height.',
        type: '{boolean}',
        required: false,
        // default
        controlType: 'switch',
        controlGroup: 'Labels',
    },
    {
        key: 'labelTextColor',
        scopes: '*',
        description: 'Method to compute label text color.',
        type: '{string|Function}',
        required: false,
        controlType: 'color',
        controlGroup: 'Labels',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'isInteractive',
        scopes: ['TreeMap', 'TreeMapHTML', 'TreeMapCanvas'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'onClick',
        scopes: ['TreeMap', 'TreeMapHTML', 'TreeMapCanvas'],
        description: 'onClick handler, it receives clicked node data and style plus mouse event.',
        type: '{Function}',
        required: false,
    },
    ...motionProperties(['TreeMap', 'TreeMapHTML', 'TreeMapPlaceholders'], defaults),
]
