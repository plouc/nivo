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
    ANCHOR_TOP,
    ANCHOR_TOP_RIGHT,
    ANCHOR_RIGHT,
    ANCHOR_BOTTOM_RIGHT,
    ANCHOR_BOTTOM,
    ANCHOR_BOTTOM_LEFT,
    ANCHOR_LEFT,
    ANCHOR_TOP_LEFT,
    SHAPE_CIRCLE,
    SHAPE_SQUARE,
} from '@nivo/legends'

export default [
    {
        key: 'anchor',
        description: `Control origin.`,
        type: '{string}',
        required: false,
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                { label: ANCHOR_TOP, value: ANCHOR_TOP },
                { label: ANCHOR_TOP_RIGHT, value: ANCHOR_TOP_RIGHT },
                { label: ANCHOR_RIGHT, value: ANCHOR_RIGHT },
                { label: ANCHOR_BOTTOM_RIGHT, value: ANCHOR_BOTTOM_RIGHT },
                { label: ANCHOR_BOTTOM, value: ANCHOR_BOTTOM },
                { label: ANCHOR_BOTTOM_LEFT, value: ANCHOR_BOTTOM_LEFT },
                { label: ANCHOR_LEFT, value: ANCHOR_LEFT },
                { label: ANCHOR_TOP_LEFT, value: ANCHOR_TOP_LEFT },
            ],
        },
    },
    {
        key: 'shape',
        description: `Shape to use, must be one of: '${SHAPE_CIRCLE}', '${SHAPE_SQUARE}'.`,
        type: '{string}',
        required: false,
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                { label: SHAPE_CIRCLE, value: SHAPE_CIRCLE },
                { label: SHAPE_SQUARE, value: SHAPE_SQUARE },
            ],
        },
    },
    {
        key: 'linkLength',
        type: '{number}',
        required: true,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 60,
        },
    },
    {
        key: 'labelOffset',
        type: '{number}',
        required: true,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: -36,
            max: 36,
        },
    },
]
