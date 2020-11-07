/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { AreaBumpDefaultProps as defaults } from '@nivo/bump'
import {
    themeProperty,
    axesProperties,
    defsProperties,
    groupProperties,
    motionProperties,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            Array<{
                id:   string
                data: Array<{
                    x: number | string
                    y: number
                }>
            }>
            \`\`\`
            This component assumes that every serie contains all
            x values sorted the same way they should appear on the chart.
        `,
        required: true,
        type: 'object[]',
    },
    {
        key: 'width',
        group: 'Base',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using responsive component.
            Also note that width does not include labels/axes,
            so you should add enough margin to display them.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        group: 'Base',
        enableControlForFlavors: ['api'],
        help: 'Chart height.',
        description: `
            not required if using responsive component.
            Also note that height does not include labels/axes,
            so you should add enough margin to display them.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'margin',
        group: 'Base',
        type: 'object',
        help: 'Chart margin.',
        controlType: 'margin',
    },
    {
        key: 'align',
        group: 'Base',
        help: `Chart alignment.`,
        type: 'string',
        required: false,
        defaultValue: defaults.align,
        controlType: 'choices',
        controlOptions: {
            choices: [
                { label: 'start', value: 'start' },
                { label: 'middle', value: 'middle' },
                { label: 'end', value: 'end' },
            ],
        },
    },
    {
        key: 'interpolation',
        group: 'Base',
        type: 'string',
        help: `Area interpolation.`,
        required: false,
        defaultValue: defaults.interpolation,
        controlType: 'radio',
        controlOptions: {
            choices: [
                { label: 'smooth', value: 'smooth' },
                { label: 'linear', value: 'linear' },
            ],
        },
    },
    {
        key: 'spacing',
        group: 'Base',
        type: 'number',
        defaultValue: defaults.spacing,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 32,
        },
    },
    {
        key: 'xPadding',
        group: 'Base',
        type: 'number',
        defaultValue: defaults.xPadding,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    themeProperty,
    {
        key: 'colors',
        group: 'Style',
        type: 'string | Function | string[]',
        help: 'Defines color range.',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'ordinalColors',
    },
    {
        key: 'blendMode',
        group: 'Style',
        type: 'string',
        help: 'Defines CSS mix-blend-mode property.',
        description: `
            Defines CSS \`mix-blend-mode\` property, see
            [MDN documentation](https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode).
        `,
        required: false,
        defaultValue: defaults.blendMode,
        controlType: 'blendMode',
    },
    {
        key: 'fillOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Area fill opacity.',
        defaultValue: defaults.fillOpacity,
        controlType: 'opacity',
    },
    {
        key: 'activeFillOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Area fill opacity for active series.',
        defaultValue: defaults.activeFillOpacity,
        controlType: 'opacity',
    },
    {
        key: 'inactiveFillOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Area fill opacity for inactive series.',
        defaultValue: defaults.inactiveFillOpacity,
        controlType: 'opacity',
    },
    {
        key: 'borderWidth',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Area border width.',
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'activeBorderWidth',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Area border width for active series.',
        defaultValue: defaults.activeBorderWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'inactiveBorderWidth',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Area border width for inactive series.',
        defaultValue: defaults.inactiveBorderWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'borderColor',
        help: 'Method to compute area border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.borderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    {
        key: 'borderOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Area border opacity.',
        defaultValue: defaults.borderOpacity,
        controlType: 'opacity',
    },
    {
        key: 'activeBorderOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Area border opacity for active series.',
        defaultValue: defaults.activeBorderOpacity,
        controlType: 'opacity',
    },
    {
        key: 'inactiveBorderOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Area border opacity for inactive series.',
        defaultValue: defaults.inactiveBorderOpacity,
        controlType: 'opacity',
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'startLabel',
        group: 'Labels',
        type: 'false | string | (serie: Serie) => string',
        defaultValue: defaults.startLabel,
    },
    {
        key: 'startLabelPadding',
        group: 'Labels',
        type: 'number',
        defaultValue: defaults.startLabelPadding,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 30,
        },
    },
    {
        key: 'startLabelTextColor',
        help: 'Method to compute start label text color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.startLabelTextColor,
        controlType: 'inheritedColor',
        group: 'Labels',
    },
    {
        key: 'endLabel',
        group: 'Labels',
        type: 'false | string | (serie: Serie) => string',
        defaultValue: defaults.endLabel,
    },
    {
        key: 'endLabelPadding',
        group: 'Labels',
        type: 'number',
        defaultValue: defaults.endLabelPadding,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 30,
        },
    },
    {
        key: 'endLabelTextColor',
        help: 'Method to compute end label text color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.endLabelTextColor,
        controlType: 'inheritedColor',
        group: 'Labels',
    },
    {
        key: 'enableGridX',
        group: 'Grid & Axes',
        help: 'Enable/disable x grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridX,
        controlType: 'switch',
    },
    ...axesProperties({ exclude: ['right', 'left'] }),
    {
        key: 'isInteractive',
        group: 'Interactivity',
        type: 'boolean',
        help: 'Enable/disable interactivity.',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
    },
    {
        key: 'onMouseEnter',
        group: 'Interactivity',
        type: '(serie, event) => void',
        help: 'onMouseEnter handler.',
        required: false,
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        type: '(serie, event) => void',
        help: 'onMouseMove handler.',
        required: false,
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        type: '(serie, event) => void',
        help: 'onMouseLeave handler.',
        required: false,
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        type: '(serie, event) => void',
        help: 'onClick handler.',
        required: false,
    },
    {
        key: 'tooltip',
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom tooltip component.',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML
            element and will receive the series's data.
        `,
    },
    ...motionProperties(['svg'], defaults, 'react-spring'),
]

export const groups = groupProperties(props)
