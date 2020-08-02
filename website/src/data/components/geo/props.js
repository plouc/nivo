/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { GeoMapDefaultProps } from '@nivo/geo'
import { themeProperty, defsProperties } from '../../../lib/componentProperties'

export const props = [
    {
        key: 'width',
        group: 'Base',
        enableControlForFlavors: ['api'],
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
        group: 'Base',
        enableControlForFlavors: ['api'],
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
        flavors: ['canvas'],
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
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'projectionType',
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
    themeProperty,
    {
        key: 'borderWidth',
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
        help: 'Method to compute border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: GeoMapDefaultProps.borderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    {
        key: 'enableGraticule',
        help: 'Enable meridians and parallels, useful for showing projection distortion.',
        type: 'boolean',
        required: false,
        defaultValue: GeoMapDefaultProps.enableGraticule,
        controlType: 'switch',
        group: 'Graticule',
    },
    {
        key: 'graticuleLineWidth',
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
        help: 'Control meridians and parallel lines color.',
        type: 'string',
        required: false,
        defaultValue: GeoMapDefaultProps.graticuleLineColor,
        controlType: 'colorPicker',
        group: 'Graticule',
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'isInteractive',
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: GeoMapDefaultProps.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'onClick',
        help: 'onClick handler, it receives clicked node data and style plus mouse event.',
        type: 'Function',
        required: false,
        group: 'Interactivity',
    },
]
