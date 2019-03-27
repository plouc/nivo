/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { GeoMapDefaultProps, ChoroplethDefaultProps } from '@nivo/geo'
import { marginProperties, defsProperties, getLegendsProps } from '../../../lib/componentProperties'

export default [
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
        scopes: ['GeoMapCanvas'],
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
        key: 'projectionType',
        scopes: '*',
        description: 'Defines the projection to use.',
        required: false,
        default: GeoMapDefaultProps.projectionType,
        controlType: 'choices',
        controlGroup: 'Base',
        controlOptions: {
            choices: [
                { label: 'azimuthalEqualArea', value: 'azimuthalEqualArea' },
                { label: 'azimuthalEquidistant', value: 'azimuthalEquidistant' },
                { label: 'gnomonic', value: 'gnomonic' },
                { label: 'orthographic', value: 'orthographic' },
                { label: 'stereographic', value: 'stereographic' },
                { label: 'equalEarth', value: 'equalEarth' },
                { label: 'equirectangular', value: 'equirectangular' },
                { label: 'mercator', value: 'mercator' },
                { label: 'transverseMercator', value: 'transverseMercator' },
                { label: 'naturalEarth1', value: 'naturalEarth1' },
            ],
        },
    },
    {
        key: 'projectionScale',
        scopes: '*',
        description: 'Projection scale.',
        required: false,
        default: GeoMapDefaultProps.projectionScale,
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: 0,
            max: 200,
        },
    },
    {
        key: 'projectionTranslation',
        type: '{[x: number, y: number]}',
        scopes: '*',
        description: 'Projection x/y translation.',
        required: false,
        default: GeoMapDefaultProps.projectionTranslation,
    },
    {
        key: 'projectionTranslation[0]',
        excludeFromDoc: true,
        scopes: '*',
        description: 'Projection x translation.',
        required: false,
        default: GeoMapDefaultProps.projectionTranslation[0],
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: -1,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'projectionTranslation[1]',
        excludeFromDoc: true,
        scopes: '*',
        description: 'Projection y translation.',
        required: false,
        default: GeoMapDefaultProps.projectionTranslation[1],
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: -1,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'projectionRotation',
        type: '{[lambda: number, phi: number, gamma: number]}',
        scopes: '*',
        description: 'Projection rotation.',
        required: false,
        default: GeoMapDefaultProps.projectionRotation,
    },
    {
        key: 'projectionRotation[0]',
        excludeFromDoc: true,
        scopes: '*',
        description: 'Projection rotation lambda (λ).',
        required: false,
        default: GeoMapDefaultProps.projectionRotation[0],
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: -400,
            max: 400,
        },
    },
    {
        key: 'projectionRotation[1]',
        excludeFromDoc: true,
        scopes: '*',
        description: 'Projection rotation phi (φ).',
        required: false,
        default: GeoMapDefaultProps.projectionRotation[1],
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: -400,
            max: 400,
        },
    },
    {
        key: 'projectionRotation[2]',
        excludeFromDoc: true,
        scopes: '*',
        description: 'Projection rotation gamma (γ).',
        required: false,
        default: GeoMapDefaultProps.projectionRotation[2],
        controlType: 'range',
        controlGroup: 'Base',
        controlOptions: {
            min: -400,
            max: 400,
        },
    },
    {
        key: 'layers',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        type: `Array<'graticule' | 'features' | Function>`,
        required: false,
        description: (
            <div>
                Defines the order of layers, available layers are:
                <code>graticule</code>, <code>features</code>.<br />
                You can also use this to insert extra layers to the chart, this extra layer must be
                a function which will receive the chart computed data and must return a valid SVG
                element for the SVG implementation or receive a Canvas 2d context for the canvas
                one. Custom layers will also receive the computed data/projection.
            </div>
        ),
        default: GeoMapDefaultProps.layers,
    },
    {
        key: 'label',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        type: '{string|Function}',
        required: false,
        description: (
            <div>
                Accessor to label, if a string is provided, the value will be retrieved using it as
                a key, if it's a function, it's its responsibility to return the label.
            </div>
        ),
        default: ChoroplethDefaultProps.label,
    },
    {
        key: 'value',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        type: '{string|Function}',
        required: false,
        description: (
            <div>
                Accessor to data value, if a string is provided, the value will be retrieved using
                it as a key, if it's a function, it's its responsibility to return the value.
            </div>
        ),
        default: ChoroplethDefaultProps.value,
    },
    {
        key: 'valueFormat',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        type: '{string|Function}',
        required: false,
        description: (
            <div>
                Optional formatting of values, if provided, it will be used for labels/tooltips. You
                can either pass a function which will receive the node's data and must return the
                formatted value, or a string which will be used as a directive for{' '}
                <a href="https://github.com/d3/d3-format" target="_blank" rel="noopener noreferrer">
                    d3-format
                </a>
                .
            </div>
        ),
        default: ChoroplethDefaultProps.value,
    },
    {
        key: 'colors',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        description: 'Defines color range.',
        type: '{string|Function|Array}',
        required: false,
        default: 'nivo',
        controlType: 'quantizeColors',
        controlGroup: 'Style',
    },
    {
        key: 'unknownColor',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        description: 'Defines the color to use for features without value.',
        type: '{string}',
        required: false,
        default: 'nivo',
        controlType: 'colorPicker',
        controlGroup: 'Style',
    },
    {
        key: 'borderWidth',
        scopes: '*',
        description: 'Control border width.',
        type: '{number}',
        required: false,
        default: GeoMapDefaultProps.borderWidth,
        controlType: 'range',
        controlGroup: 'Style',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 10,
            step: 0.5,
        },
    },
    {
        key: 'borderColor',
        scopes: '*',
        description: 'Method to compute border color.',
        type: '{string|Function}',
        required: false,
        default: GeoMapDefaultProps.borderColor,
        controlType: 'color',
        controlGroup: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'enableGraticule',
        scopes: '*',
        description: 'Enable meridians and parallels, useful for showing projection distortion.',
        type: '{boolean}',
        required: false,
        default: GeoMapDefaultProps.enableGraticule,
        controlType: 'switch',
        controlGroup: 'Graticule',
    },
    {
        key: 'graticuleLineWidth',
        scopes: '*',
        description: 'Control meridians and parallel lines width.',
        type: '{number}',
        required: false,
        default: GeoMapDefaultProps.graticuleLineWidth,
        controlType: 'range',
        controlGroup: 'Graticule',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 10,
            step: 0.5,
        },
    },
    {
        key: 'graticuleLineColor',
        scopes: '*',
        description: 'Control meridians and parallel lines color.',
        type: '{string}',
        required: false,
        default: GeoMapDefaultProps.graticuleLineColor,
        controlType: 'colorPicker',
        controlGroup: 'Graticule',
    },
    ...defsProperties(['GeoMap']),
    ...marginProperties,
    {
        key: 'isInteractive',
        scopes: ['GeoMap', 'GeoMapCanvas', 'Choropleth', 'ChoroplethCanvas'],
        description: 'Enable/disable interactivity.',
        type: '{boolean}',
        required: false,
        default: GeoMapDefaultProps.isInteractive,
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'onClick',
        scopes: ['GeoMap', 'GeoMapCanvas', 'Choropleth', 'ChoroplethCanvas'],
        description: 'onClick handler, it receives clicked node data and style plus mouse event.',
        type: '{Function}',
        required: false,
    },
    {
        key: 'custom tooltip example',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        excludeFromDoc: true,
        description: (
            <span>
                You can customize the tooltip using the <code>tooltip</code> property and{' '}
                <code>theme.tooltip</code> object.
            </span>
        ),
        type: '{boolean}',
        controlType: 'switch',
        controlGroup: 'Interactivity',
    },
    {
        key: 'tooltip',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        type: '{Function}',
        required: false,
        description: (
            <div>
                A function allowing complete tooltip customisation, it must return a valid HTML
                element and will receive the node's data.
            </div>
        ),
    },
    {
        key: 'legends',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        type: '{Array<object>}',
        description: `Optional chart's legends.`,
        controlGroup: 'Legends',
        controlType: 'array',
        controlOptions: {
            props: getLegendsProps(),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            defaults: {
                anchor: 'center',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 4,
                symbolSize: 20,
                itemDirection: 'left-to-right',
                itemTextColor: '#777',
                onClick: data => {
                    alert(JSON.stringify(data, null, '    '))
                },
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000',
                            itemBackground: '#f7fafb',
                        },
                    },
                ],
            },
        },
    },
]
