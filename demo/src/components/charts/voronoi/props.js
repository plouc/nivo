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
                not required if using&nbsp;<code>&lt;ResponsiveVoronoi&nbsp;/&gt;</code>.
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
                not required if using&nbsp;<code>&lt;ResponsiveVoronoi&nbsp;/&gt;</code>.
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
        key: 'enablePolygons',
        scopes: '*',
        description: 'Enable/disable polygons.',
        type: '{boolean}',
        required: false,
        default: defaults.enablePolygons,
        controlType: 'switch',
        controlGroup: 'Base',
    },
    {
        key: 'enableSites',
        scopes: '*',
        description: 'Enable/disable sites.',
        type: '{boolean}',
        required: false,
        default: defaults.enableSites,
        controlType: 'switch',
        controlGroup: 'Base',
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
        key: 'borderWidth',
        description: 'Border width for polygons (px).',
        type: '{number}',
        required: false,
        default: defaults.borderWidth,
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
        key: 'borderColor',
        description: 'Border color for polygons.',
        type: '{string}',
        required: false,
        default: defaults.borderColor,
        controlType: 'colorPicker',
        controlGroup: 'Style',
    },
    {
        key: 'linkWidth',
        description: 'Links line width (px).',
        type: '{number}',
        required: false,
        default: defaults.linkWidth,
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
        key: 'linkColor',
        description: 'Links color.',
        type: '{string}',
        required: false,
        default: defaults.linkColor,
        controlType: 'colorPicker',
        controlGroup: 'Style',
    },
    {
        key: 'siteSize',
        description: 'Size of sites (px).',
        type: '{number}',
        required: false,
        default: defaults.siteSize,
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
        key: 'siteColor',
        description: 'Sites color.',
        type: '{string}',
        required: false,
        default: defaults.linkColor,
        controlType: 'colorPicker',
        controlGroup: 'Style',
    },
    ...marginProperties,
]
