/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { BulletDefaultProps as defaults } from '@nivo/bullet'
import { motionProperties } from '../../../lib/componentProperties'

export default [
    {
        key: 'data',
        scopes: '*',
        description: 'Chart data.',
        type: '{Array.<Object>}',
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
        controlType: 'choices',
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
        description: 'define spacing between items.',
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
    ...motionProperties(['Bullet'], defaults),
]
