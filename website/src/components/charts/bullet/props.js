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
import { BulletDefaultProps as defaults } from '@nivo/bullet'
import { marginProperties, motionProperties } from '../../../lib/componentProperties'

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
                            id:        {string|number}
                            title?:    {ReactNode}
                            subtitle?: {ReactNode}
                            data: Array<{
                                ranges:   number[]
                                measures: number[]
                                markers?: number[]
                            }>
                        }>
                    `}
                </pre>
                If <code>title</code> is <code>undefined</code>, <code>id</code> will be used for{' '}
                <code>title</code>.
            </div>
        ),
        type: '{Array.<object>}',
        required: true,
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using <code>ResponsiveBullet</code>.
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
                not required if using <code>ResponsiveBullet</code>.
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
        key: 'layout',
        scopes: '*',
        description: `How to display items, must be one of: 'horizontal', 'vertical'.`,
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
        key: 'reverse',
        scopes: '*',
        description:
            'Reverse chart, starts on top instead of bottom for vertical layout and right instead of left for horizontal one.',
        type: '{boolean}',
        required: false,
        default: defaults.reverse,
        controlType: 'switch',
        controlGroup: 'Base',
    },
    {
        key: 'spacing',
        scopes: '*',
        description: 'define spacing between items (px).',
        type: '{number}',
        required: false,
        default: defaults.spacing,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'measureSize',
        scopes: '*',
        description: 'define size of measure related to item size, expressed as a ratio.',
        type: '{number}',
        required: false,
        default: defaults.measureSize,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'markerSize',
        scopes: '*',
        description: 'define size of markers related to item size, expressed as a ratio.',
        type: '{number}',
        required: false,
        default: defaults.markerSize,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 0,
            max: 2,
            step: 0.05,
        },
    },
    ...marginProperties,
    {
        key: 'rangeComponent',
        scopes: ['Bullet'],
        description: 'Custom component for ranges.',
        type: '{Function}',
        required: false,
    },
    {
        key: 'rangeColors',
        scopes: '*',
        description: (
            <div>
                Defines colors for ranges, you can either use categorical colors:{' '}
                <code>greens</code> or sequential form: <code>seq:green</code>.
            </div>
        ),
        type: '{string|Function|Array}',
        required: false,
        default: defaults.rangeColors,
        controlType: 'colors',
        controlGroup: 'Style',
        controlOptions: {
            includeSequential: true,
        },
    },
    {
        key: 'measureComponent',
        scopes: ['Bullet'],
        description: 'Custom component for measures.',
        type: '{Function}',
        required: false,
    },
    {
        key: 'measureColors',
        scopes: '*',
        description: (
            <div>
                Defines colors for measures, you can either use categorical colors:{' '}
                <code>greens</code> or sequential form: <code>seq:green</code>.
            </div>
        ),
        type: '{string|Function|Array}',
        required: false,
        default: defaults.measureColors,
        controlType: 'colors',
        controlGroup: 'Style',
        controlOptions: {
            includeSequential: true,
        },
    },
    {
        key: 'markerComponent',
        scopes: ['Bullet'],
        description: 'Custom component for markers.',
        type: '{Function}',
        required: false,
    },
    {
        key: 'markerColors',
        scopes: '*',
        description: (
            <div>
                Defines colors for markers, you can either use categorical colors:{' '}
                <code>greens</code> or sequential form: <code>seq:green</code>.
            </div>
        ),
        type: '{string|Function|Array}',
        required: false,
        default: defaults.markerColors,
        controlType: 'colors',
        controlGroup: 'Style',
        controlOptions: {
            includeSequential: true,
        },
    },
    {
        key: 'axisPosition',
        scopes: '*',
        description: `Where to put axis, must be one of: 'before', 'after'.`,
        type: `{'before'|'after'}`,
        required: false,
        default: defaults.axisPosition,
        controlType: 'radio',
        controlGroup: 'Axes',
        controlOptions: {
            choices: [{ label: 'before', value: 'before' }, { label: 'after', value: 'after' }],
        },
    },
    {
        key: 'titlePosition',
        scopes: '*',
        description: `Where to put title, must be one of: 'before', 'after'.`,
        type: `{'before'|'after'}`,
        required: false,
        default: defaults.titlePosition,
        controlType: 'radio',
        controlGroup: 'Title',
        controlOptions: {
            choices: [{ label: 'before', value: 'before' }, { label: 'after', value: 'after' }],
        },
    },
    {
        key: 'titleAlign',
        scopes: '*',
        description: `title alignment, must be one of: 'start', 'middle', 'end'.`,
        type: `{'start'|'middle'|'end'}`,
        required: false,
        default: defaults.titleAlign,
        controlType: 'choices',
        controlGroup: 'Title',
        controlOptions: {
            choices: [
                { label: 'start', value: 'start' },
                { label: 'middle', value: 'middle' },
                { label: 'end', value: 'end' },
            ],
        },
    },
    {
        key: 'titleOffsetX',
        scopes: '*',
        description: 'title x offset (px) from bullet edge.',
        type: '{number}',
        required: false,
        default: defaults.titleOffset,
        controlType: 'range',
        controlGroup: 'Title',
        controlOptions: {
            min: -100,
            max: 100,
            unit: 'px',
        },
    },
    {
        key: 'titleOffsetY',
        scopes: '*',
        description: 'title y offset (px) from bullet edge.',
        type: '{number}',
        required: false,
        default: defaults.titleOffset,
        controlType: 'range',
        controlGroup: 'Title',
        controlOptions: {
            min: -100,
            max: 100,
            unit: 'px',
        },
    },
    {
        key: 'titleRotation',
        scopes: '*',
        description: 'title rotation (deg.).',
        type: '{number}',
        required: false,
        default: defaults.titleRotation,
        controlType: 'range',
        controlGroup: 'Title',
        controlOptions: {
            min: -360,
            max: 360,
            step: 5,
            unit: '°',
        },
    },
    {
        key: 'onRangeClick',
        scopes: ['Bullet'],
        type: '{Function}',
        required: false,
        description: (
            <div>
                onClick handler for ranges, will receive range data as first argument & event as
                second one. The data has the following shape:
                <pre className="code code-block">
                    {dedent`{
                        id:    {string},
                        v0:    {number},
                        v1:    {number},
                        index: {number},
                        color: {string},
                    }`}
                </pre>
                <code>v1</code> is the value of the range while <code>v0</code> is the value of
                previous range.
            </div>
        ),
    },
    {
        key: 'onMeasureClick',
        scopes: ['Bullet'],
        type: '{Function}',
        required: false,
        description: (
            <div>
                onClick handler for measures, will receive measure data as first argument & event as
                second one. The data has the following shape:
                <pre className="code code-block">
                    {dedent`{
                        id:    {string},
                        v0:    {number},
                        v1:    {number},
                        index: {number},
                        color: {string},
                    }`}
                </pre>
                <code>v1</code> is the value of the measure while <code>v0</code> is the value of
                previous measure.
            </div>
        ),
    },
    ...motionProperties(['Bullet'], defaults),
]
