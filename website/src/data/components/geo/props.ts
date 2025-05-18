// @ts-ignore
import { GeoMapDefaultProps } from '@nivo/geo'
import { themeProperty, defsProperties } from '../../../lib/componentProperties'
import { chartDimensions, isInteractive } from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas']

export const props: ChartProperty[] = [
    ...chartDimensions(allFlavors, { responsive: false }),
    {
        key: 'projectionType',
        flavors: ['svg', 'canvas'],
        help: 'Defines the projection to use.',
        type: 'string',
        required: false,
        defaultValue: GeoMapDefaultProps.projectionType,
        group: 'Projection',
        control: {
            type: 'choices',
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
        flavors: ['svg', 'canvas'],
        help: 'Projection scale.',
        required: false,
        defaultValue: GeoMapDefaultProps.projectionScale,
        type: 'number',
        group: 'Projection',
        control: {
            type: 'range',
            min: 0,
            max: 400,
        },
    },
    {
        key: 'projectionTranslation',
        flavors: ['svg', 'canvas'],
        type: '[number, number]',
        help: 'Projection x/y translation.',
        required: false,
        defaultValue: GeoMapDefaultProps.projectionTranslation,
        group: 'Projection',
        control: {
            type: 'numberArray',
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
        flavors: ['svg', 'canvas'],
        type: '[number, number, number]',
        help: 'Projection rotation.',
        required: false,
        defaultValue: GeoMapDefaultProps.projectionRotation,
        group: 'Projection',
        control: {
            type: 'numberArray',
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
    themeProperty(['svg', 'canvas']),
    {
        key: 'borderWidth',
        flavors: ['svg', 'canvas'],
        help: 'Control border width.',
        type: 'number',
        required: false,
        defaultValue: GeoMapDefaultProps.borderWidth,
        group: 'Style',
        control: {
            type: 'lineWidth',
            step: 0.5,
        },
    },
    {
        key: 'borderColor',
        flavors: ['svg', 'canvas'],
        help: 'Method to compute border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: GeoMapDefaultProps.borderColor,
        control: { type: 'inheritedColor' },
        group: 'Style',
    },
    {
        key: 'enableGraticule',
        flavors: ['svg', 'canvas'],
        help: 'Enable meridians and parallels, useful for showing projection distortion.',
        type: 'boolean',
        required: false,
        defaultValue: GeoMapDefaultProps.enableGraticule,
        control: { type: 'switch' },
        group: 'Graticule',
    },
    {
        key: 'graticuleLineWidth',
        flavors: ['svg', 'canvas'],
        help: 'Control meridians and parallel lines width.',
        type: 'number',
        required: false,
        defaultValue: GeoMapDefaultProps.graticuleLineWidth,
        group: 'Graticule',
        control: {
            type: 'lineWidth',
            step: 0.5,
        },
    },
    {
        key: 'graticuleLineColor',
        flavors: ['svg', 'canvas'],
        help: 'Control meridians and parallel lines color.',
        type: 'string',
        required: false,
        defaultValue: GeoMapDefaultProps.graticuleLineColor,
        control: { type: 'colorPicker' },
        group: 'Graticule',
    },
    ...defsProperties('Style', ['svg']),
    isInteractive({
        flavors: ['svg', 'canvas'],
        defaultValue: GeoMapDefaultProps.isInteractive,
    }),
    {
        key: 'onClick',
        flavors: ['svg', 'canvas'],
        help: 'onClick handler, it receives clicked node data and style plus mouse event.',
        type: 'Function',
        required: false,
        group: 'Interactivity',
    },
]
