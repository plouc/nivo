/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { SunburstDefaultProps as defaults } from '@nivo/sunburst'
import { marginProperties } from '../../../lib/componentProperties'

export default [
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsiveSunburst&nbsp;/&gt;</code>.
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
                <code>&lt;ResponsiveSunburst&nbsp;/&gt;</code>.
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
        key: 'identity',
        description: (
            <span>
                define identity accessor, if string given, will use <code>node[value]</code>,<br />
                if function given, it will be invoked for each node and will receive the node as
                first argument, it must return the node identity (string).
            </span>
        ),
        type: '{string|Function}',
        required: false,
        default: defaults.identity,
    },
    {
        key: 'value',
        description: (
            <span>
                define value accessor, if string given, will use <code>node[value]</code>,<br />
                if function given, it will be invoked for each node and will receive the node as
                first argument, it must return the node value (number).
            </span>
        ),
        type: '{string|Function}',
        required: false,
        default: defaults.value,
    },
    {
        key: 'colors',
        description: 'Defines how to compute node color.',
        required: false,
        default: 'nivo',
        controlType: 'colors',
        controlGroup: 'Base',
    },
    {
        key: 'colorBy',
        description:
            'Property to use to determine primary node color. If a function is provided, it will receive current node data and must return a color',
        type: '{string|Function}',
        required: false,
        default: 'id',
        controlType: 'choices',
        controlGroup: 'Base',
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
        key: 'childColor',
        description: 'Defines how to compute child nodes color.',
        type: '{string|Function}',
        required: false,
        default: defaults.childColor,
        controlType: 'color',
        controlGroup: 'Base',
    },
    {
        key: 'borderWidth',
        description: 'Node border width (px).',
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
    //{
    //    key: 'borderColor',
    //    description: 'Node border color.',
    //    type: '{string}',
    //    required: false,
    //    default: defaults.borderColor,
    //    controlType: 'text',
    //    controlGroup: 'Base',
    //},
    {
        key: 'cornerRadius',
        description: 'Round node shape (px).',
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
    ...marginProperties,
    {
        key: 'isInteractive',
        scopes: ['Sunburst'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: defaults.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    // Animation not supported for now
    //{
    //    key: 'animate',
    //    description: 'Enable/disable transitions.',
    //    type: '{boolean}',
    //    required: false,
    //    default: defaults.animate,
    //    controlType: 'switch',
    //    controlGroup: 'Animation',
    //},
]
