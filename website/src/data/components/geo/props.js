/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { GeoMapDefaultProps, ChoroplethDefaultProps } from '@nivo/geo'
import {
    defsProperties,
    getLegendsProps,
    getPropertiesGroupsControls,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        help: 'Chart width.',
        description: `
            not required if using responsive alternative
            of the component \`<Responsive*/>\`.
        `,
        type: 'number',
        required: true,
    },
    {
        key: 'height',
        scopes: ['api'],
        docScopes: '*',
        help: 'Chart height.',
        description: `
            not required if using responsive alternative
            of the component \`<Responsive*/>\`.
        `,
        type: 'number',
        required: true,
    },
    {
        key: 'pixelRatio',
        scopes: ['GeoMapCanvas'],
        help: `Adjust pixel ratio, useful for HiDPI screens.`,
        required: false,
        defaultValue: 'Depends on device',
        type: `number`,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 1,
            max: 2,
        },
    },
    {
        key: 'label',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        group: 'Base',
        type: 'string | Function',
        required: false,
        help: 'Label accessor.',
        description: `
            Accessor to label, if a string is provided,
            the value will be retrieved using it as
            a key, if it's a function, it's its responsibility
            to return the label.
        `,
        defaultValue: ChoroplethDefaultProps.label,
    },
    {
        key: 'value',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        group: 'Base',
        type: 'string | Function',
        required: false,
        help: 'Value accessor.',
        description: `
            Accessor to data value, if a string is provided,
            the value will be retrieved using
            it as a key, if it's a function, it's its responsibility
            to return the value.
        `,
        defaultValue: ChoroplethDefaultProps.value,
    },
    {
        key: 'valueFormat',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        group: 'Base',
        type: 'string | Function',
        required: false,
        help: 'Value formatter.',
        description: `
            Optional formatting of values, if provided, it will
            be used for labels/tooltips. You can either pass
            a function which will receive the node's data
            and must return the formatted value, or a string
            which will be used as a directive for
            [d3-format](https://github.com/d3/d3-format).
        `,
        defaultValue: ChoroplethDefaultProps.value,
    },
    {
        key: 'layers',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        group: 'Base',
        type: `Array<'graticule' | 'features' | Function>`,
        required: false,
        help: 'Defines the order of layers.',
        description: `
            Defines the order of layers, available layers are:
            \`graticule\`, \`features\`.

            You can also use this to insert extra layers
            to the chart, this extra layer must be
            a function which will receive the chart
            computed data and must return a valid SVG
            element for the SVG implementation or receive
            a Canvas 2d context for the canvas
            one. Custom layers will also receive the
            computed data/projection.
        `,
        defaultValue: GeoMapDefaultProps.layers,
    },
    {
        key: 'margin',
        scopes: '*',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'projectionType',
        scopes: '*',
        help: 'Defines the projection to use.',
        required: false,
        defaultValue: GeoMapDefaultProps.projectionType,
        controlType: 'choices',
        group: 'Projection',
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
        help: 'Projection scale.',
        required: false,
        defaultValue: GeoMapDefaultProps.projectionScale,
        type: 'number',
        controlType: 'range',
        group: 'Projection',
        controlOptions: {
            min: 0,
            max: 400,
        },
    },
    {
        key: 'projectionTranslation',
        type: '[number, number]',
        scopes: '*',
        help: 'Projection x/y translation.',
        required: false,
        defaultValue: GeoMapDefaultProps.projectionTranslation,
        controlType: 'numberArray',
        group: 'Projection',
        controlOptions: {
            unit: 'px',
            items: [
                {
                    label: 'x',
                    min: -1,
                    max: 1,
                    step: 0.05,
                },
                {
                    label: 'y',
                    min: -1,
                    max: 1,
                    step: 0.05,
                },
            ],
        },
    },
    {
        key: 'projectionRotation',
        type: '[number, number, number]',
        scopes: '*',
        help: 'Projection rotation.',
        required: false,
        defaultValue: GeoMapDefaultProps.projectionRotation,
        controlType: 'numberArray',
        group: 'Projection',
        controlOptions: {
            items: [
                {
                    label: 'lambda (λ)',
                    min: -360,
                    max: 360,
                },
                {
                    label: 'phi (φ)',
                    min: -360,
                    max: 360,
                },
                {
                    label: 'gamma (γ)',
                    min: -360,
                    max: 360,
                },
            ],
        },
    },
    {
        key: 'colors',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        help: 'Defines color range.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: 'nivo',
        controlType: 'quantizeColors',
        group: 'Style',
    },
    {
        key: 'unknownColor',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        help: 'Defines the color to use for features without value.',
        type: 'string',
        required: false,
        defaultValue: 'nivo',
        controlType: 'colorPicker',
        group: 'Style',
    },
    {
        key: 'borderWidth',
        scopes: '*',
        help: 'Control border width.',
        type: 'number',
        required: false,
        defaultValue: GeoMapDefaultProps.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
        controlOptions: {
            step: 0.5,
        },
    },
    {
        key: 'borderColor',
        scopes: '*',
        help: 'Method to compute border color.',
        type: 'string | Function',
        required: false,
        defaultValue: GeoMapDefaultProps.borderColor,
        controlType: 'color',
        group: 'Style',
        controlOptions: {
            withCustomColor: true,
        },
    },
    {
        key: 'enableGraticule',
        scopes: '*',
        help: 'Enable meridians and parallels, useful for showing projection distortion.',
        type: 'boolean',
        required: false,
        defaultValue: GeoMapDefaultProps.enableGraticule,
        controlType: 'switch',
        group: 'Graticule',
    },
    {
        key: 'graticuleLineWidth',
        scopes: '*',
        help: 'Control meridians and parallel lines width.',
        type: 'number',
        required: false,
        defaultValue: GeoMapDefaultProps.graticuleLineWidth,
        controlType: 'lineWidth',
        group: 'Graticule',
        controlOptions: {
            step: 0.5,
        },
    },
    {
        key: 'graticuleLineColor',
        scopes: '*',
        help: 'Control meridians and parallel lines color.',
        type: 'string',
        required: false,
        defaultValue: GeoMapDefaultProps.graticuleLineColor,
        controlType: 'colorPicker',
        group: 'Graticule',
    },
    ...defsProperties(['GeoMap']),
    {
        key: 'isInteractive',
        scopes: ['GeoMap', 'GeoMapCanvas', 'Choropleth', 'ChoroplethCanvas'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: GeoMapDefaultProps.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'onClick',
        scopes: ['GeoMap', 'GeoMapCanvas', 'Choropleth', 'ChoroplethCanvas'],
        help: 'onClick handler, it receives clicked node data and style plus mouse event.',
        type: 'Function',
        required: false,
        group: 'Interactivity',
    },
    {
        key: 'tooltip',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom tooltip component.',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML
            element and will receive the node's data.
        `,
    },
    {
        key: 'custom tooltip example',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        excludeFromDoc: true,
        help: 'Showcase custom tooltip.',
        type: 'boolean',
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'legends',
        scopes: ['Choropleth', 'ChoroplethCanvas'],
        type: '{Array<object>}',
        help: `Optional chart's legends.`,
        group: 'Legends',
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

export const groupsByScope = {
    GeoMap: getPropertiesGroupsControls(props, 'GeoMap'),
    GeoMapCanvas: getPropertiesGroupsControls(props, 'GeoMapCanvas'),
    Choropleth: getPropertiesGroupsControls(props, 'Choropleth'),
    ChoroplethCanvas: getPropertiesGroupsControls(props, 'ChoroplethCanvas'),
    api: getPropertiesGroupsControls(props, 'api'),
}
