/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { BumpDefaultProps as defaults } from '@nivo/bump'
import {
    themeProperty,
    motionProperties,
    axesProperties,
    groupProperties,
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
                    y: number | string
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
            not required if using
            \`<ResponsiveChord/>\`.
            Also note that width does not include labels,
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
            not required if using
            \`<ResponsiveChord/>\`.
            Also note that width does not include labels,
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
        help: 'Chart margin.',
        type: 'object',
        controlType: 'margin',
    },
    {
        key: 'interpolation',
        group: 'Base',
        type: 'string',
        help: `Line interpolation.`,
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
        key: 'xPadding',
        group: 'Base',
        type: 'number',
        help: 'X padding.',
        defaultValue: defaults.xPadding,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'xOuterPadding',
        group: 'Base',
        type: 'number',
        help: 'X outer padding.',
        defaultValue: defaults.xOuterPadding,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'yOuterPadding',
        group: 'Base',
        type: 'number',
        help: 'Y outer padding.',
        defaultValue: defaults.yOuterPadding,
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
        help: 'Defines color range.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'ordinalColors',
        group: 'Style',
    },
    {
        key: 'lineWidth',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Line width.',
        defaultValue: defaults.lineWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'activeLineWidth',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Line width for active series.',
        defaultValue: defaults.activeLineWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'inactiveLineWidth',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Line width for inactive series.',
        defaultValue: defaults.inactiveLineWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'opacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Opacity.',
        defaultValue: defaults.opacity,
        controlType: 'opacity',
    },
    {
        key: 'activeOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Opacity for active series.',
        defaultValue: defaults.activeOpacity,
        controlType: 'opacity',
    },
    {
        key: 'inactiveOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Opacity for inactive series.',
        defaultValue: defaults.inactiveOpacity,
        controlType: 'opacity',
    },
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
        key: 'pointSize',
        group: 'Points',
        help: 'Point size.',
        type: 'number | Function',
        defaultValue: defaults.pointSize,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 24,
        },
    },
    {
        key: 'activePointSize',
        group: 'Points',
        help: 'Point size for active series.',
        type: 'number | Function',
        defaultValue: defaults.activePointSize,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 24,
        },
    },
    {
        key: 'inactivePointSize',
        group: 'Points',
        help: 'Point size for inactive series.',
        type: 'number | Function',
        defaultValue: defaults.inactivePointSize,
        controlType: 'range',
        controlOptions: {
            min: 0,
            max: 24,
        },
    },
    {
        key: 'pointColor',
        group: 'Points',
        type: 'string | object | Function',
        help: 'Method to compute point fill color.',
        defaultValue: defaults.pointColor,
        controlType: 'inheritedColor',
        controlOptions: {
            inheritableProperties: ['serie.color'],
        },
    },
    {
        key: 'pointBorderWidth',
        group: 'Points',
        help: 'Point border width.',
        type: 'number | Function',
        defaultValue: defaults.pointBorderWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'activePointBorderWidth',
        group: 'Points',
        help: 'Point border width for active series.',
        type: 'number | Function',
        defaultValue: defaults.activePointBorderWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'inactivePointBorderWidth',
        group: 'Points',
        help: 'Point border width for inactive series.',
        type: 'number | Function',
        defaultValue: defaults.inactivePointBorderWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'pointBorderColor',
        group: 'Points',
        type: 'string | object | Function',
        help: 'Method to compute point border color.',
        defaultValue: defaults.pointBorderColor,
        controlType: 'inheritedColor',
        controlOptions: {
            inheritableProperties: ['color', 'serie.color'],
        },
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
    {
        key: 'enableGridY',
        group: 'Grid & Axes',
        help: 'Enable/disable y grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridY,
        controlType: 'switch',
    },
    ...axesProperties(),
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
