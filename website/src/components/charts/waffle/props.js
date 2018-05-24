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
import { WaffleDefaultProps } from '@nivo/waffle'

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
        key: 'root',
        scopes: '*',
        description: 'The hierarchical data object.',
        type: '{Object}',
        required: true,
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
        key: 'padding',
        scopes: '*',
        type: 'number',
        description: 'Padding between each cell (px).',
        required: true,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
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
    /*——————————————————————————————————————————————————————————————————————————

      Styling

    ————————————————————————————————————————————————————————————————————————————*/
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
    ...motionProperties(['Waffle', 'WaffleHtml'], defaults),
]
