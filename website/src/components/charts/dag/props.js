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
                not required if using <code>ResponsiveDag</code>.
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
                not required if using <code>ResponsiveDag</code>.
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
        key: 'layering',
        scopes: '*',
        docScopes: '*',
        description: (
            <div>
                Layering accessor, see <code>d3-dag</code> documentation.
            </div>
        ),
        type: '{string}',
        required: true,
        controlType: 'radio',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                { label: 'longestPath', value: 'longestPath' },
                { label: 'simplex', value: 'simplex' },
                { label: 'coffmanGraham', value: 'coffmanGraham' },
                { label: 'topological', value: 'topological' },
            ],
        },
    },
    {
        key: 'coord',
        scopes: '*',
        docScopes: '*',
        description: (
            <div>
                Coord accessor, see <code>d3-dag</code> documentation.
            </div>
        ),
        type: '{string}',
        required: true,
        controlType: 'radio',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                { label: 'spread', value: 'spread' },
                { label: 'vertical', value: 'vertical' },
                { label: 'minCurve', value: 'minCurve' },
                { label: 'greedy', value: 'greedy' },
                { label: 'topological', value: 'topological' },
            ],
        },
    },
    ...marginProperties,
    ...motionProperties(['Dag'], defaults),
]
