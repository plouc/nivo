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
import { marginProperties } from '../../../lib/componentProperties'
import { VoronoiDefaultProps as defaults } from '@nivo/voronoi'

export default [
    {
        key: 'data',
        scopes: '*',
        description: (
            <div>
                Chart data, which must conform to this structure:
                <pre className="code code-block">
                    {dedent`
                            Array.<{
                                id: {string|number},
                                x:  {number},
                                y:  {number}
                            }>
                        `}
                </pre>
            </div>
        ),
        type: '{Object}',
        required: true,
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: (
            <span>
                not required if using&nbsp;
                <code>&lt;ResponsiveVoronoi&nbsp;/&gt;</code>.
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
                <code>&lt;ResponsiveVoronoi&nbsp;/&gt;</code>.
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
        key: 'enableLinks',
        scopes: '*',
        description: 'Enable/disable links.',
        type: '{boolean}',
        required: false,
        default: defaults.enableLinks,
        controlType: 'switch',
        controlGroup: 'Base',
    },
    {
        key: 'linkLineWidth',
        description: 'Links line width (px).',
        type: '{number}',
        required: false,
        default: defaults.linkLineWidth,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 12,
            step: 1,
        },
    },
    {
        key: 'linkLineColor',
        description: 'Links color.',
        type: '{string}',
        required: false,
        default: defaults.linkLineColor,
        controlType: 'colorPicker',
        controlGroup: 'Base',
    },

    {
        key: 'enableCells',
        scopes: '*',
        description: 'Enable/disable cells.',
        type: '{boolean}',
        required: false,
        default: defaults.enableCells,
        controlType: 'switch',
        controlGroup: 'Base',
    },
    {
        key: 'cellLineWidth',
        description: 'Border width for cells (px).',
        type: '{number}',
        required: false,
        default: defaults.cellLineWidth,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 12,
            step: 1,
        },
    },
    {
        key: 'cellLineColor',
        description: 'Border color for cells.',
        type: '{string}',
        required: false,
        default: defaults.cellLineColor,
        controlType: 'colorPicker',
        controlGroup: 'Base',
    },
    {
        key: 'enablePoints',
        scopes: '*',
        description: 'Enable/disable points.',
        type: '{boolean}',
        required: false,
        default: defaults.enablePoints,
        controlType: 'switch',
        controlGroup: 'Base',
    },
    {
        key: 'pointSize',
        description: 'Size of points (px).',
        type: '{number}',
        required: false,
        default: defaults.siteSize,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 12,
            step: 1,
        },
    },
    {
        key: 'pointColor',
        description: 'Points color.',
        type: '{string}',
        required: false,
        default: defaults.pointColor,
        controlType: 'colorPicker',
        controlGroup: 'Base',
    },
    ...marginProperties,
]
