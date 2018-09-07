/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { lineCurvePropKeys } from '@nivo/core'
import { commonDefaultProps as defaults } from '@nivo/parallel-coordinates'
import { marginProperties, motionProperties } from '../../../lib/componentProperties'

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
        description: 'Chart data.',
        type: '{Array<{object|Array}>}',
        required: true,
    },
    {
        key: 'variables',
        scopes: '*',
        type: '{Array<object>}',
        description: (
            <div>
                Variables configuration, define accessor (<code>key</code>) and variable type. Type
                must be one of <code>linear</code> or <code>point</code>, <code>linear</code>{' '}
                variables are suitable for continuous numerical data such as age or cost while{' '}
                <code>point</code> variables are suitable for discrete values such as gender.
            </div>
        ),
        controlGroup: 'Variables',
        controlType: 'array',
        controlOptions: {
            shouldCreate: false,
            shouldRemove: false,
            getItemTitle: (index, values) => `${values.key} (${values.type})`,
            props: [
                {
                    key: 'key',
                    description: 'Variable key, used to access to corresponding datum value.',
                    controlType: 'text',
                    controlOptions: {
                        disabled: true,
                    },
                },
                {
                    key: 'type',
                    description: `Variable type, must be one of: 'linear', 'point'.`,
                    controlType: 'text',
                    controlOptions: {
                        disabled: true,
                    },
                },
                {
                    key: 'min',
                    description: 'Min value of linear scale.',
                    type: `{number|'auto'}`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        when: ({ type }) => type === 'linear',
                        disabledValue: 'auto',
                        defaultValue: 0,
                        min: -100,
                        max: 100,
                    },
                },
                {
                    key: 'max',
                    description: 'Max value of linear scale.',
                    type: `{number|'auto'}`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        when: ({ type }) => type === 'linear',
                        disabledValue: 'auto',
                        defaultValue: 1000,
                        min: -100,
                        max: 100,
                    },
                },
                {
                    key: 'padding',
                    description: 'Outer padding (0~1).',
                    type: `{number}`,
                    controlType: 'range',
                    controlOptions: {
                        when: ({ type }) => type === 'point',
                        min: 0,
                        max: 1,
                        step: 0.01,
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
                not required if using <code>ResponsiveParallelCoords</code>.
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
                not required if using <code>ResponsiveParallelCoords</code>.
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
        scopes: ['ParallelCoordinatesCanvas'],
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
        key: 'layout',
        scopes: '*',
        description: `Chart layout, must be one of: 'horizontal', 'vertical'.`,
        type: '{string}',
        required: false,
        default: defaults.layout,
        controlType: 'radio',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
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
            choices: lineCurvePropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'axesPlan',
        scopes: '*',
        description: `Axes plan, must be one of: 'foreground', 'background'.`,
        type: `{'foreground'|'background'}`,
        required: false,
        default: defaults.axesPlan,
        controlType: 'radio',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                { label: 'foreground', value: 'foreground' },
                { label: 'background', value: 'background' },
            ],
        },
    },
    {
        key: 'axesTicksPosition',
        scopes: '*',
        description: `Axes ticks position, must be one of: 'before', 'after'.`,
        type: `{'before'|'after'}`,
        required: false,
        default: defaults.axesTicksPosition,
        controlType: 'radio',
        controlGroup: 'Base',
        controlOptions: {
            choices: [{ label: 'before', value: 'before' }, { label: 'after', value: 'after' }],
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
            'Property used to determine line color. If a function is provided, it will receive current line data and must return a valid color.',
        required: false,
        default: defaults.colorBy,
        controlType: 'choices',
        controlGroup: 'Style',
        controlOptions: {
            choices: [
                {
                    label: 'index',
                    value: 'index',
                },
                {
                    label: 'target',
                    value: 'target',
                },
                {
                    label: `custom using 'color' variable`,
                    value: `custom using 'color' variable`,
                },
            ],
        },
    },
    {
        key: 'strokeWidth',
        scopes: '*',
        description: 'Lines stroke width (px).',
        type: '{number}',
        required: false,
        default: defaults.strokeWidth,
        controlType: 'range',
        controlGroup: 'Style',
        controlOptions: {
            unit: 'px',
            min: 1,
            max: 12,
        },
    },
    {
        key: 'lineOpacity',
        scopes: '*',
        description: 'Lines opacity.',
        type: '{number}',
        required: false,
        default: defaults.lineOpacity,
        controlType: 'range',
        controlGroup: 'Style',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    ...marginProperties,
    ...motionProperties(['ParallelCoordinates'], defaults),
]
