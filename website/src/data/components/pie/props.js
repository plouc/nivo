/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { PieDefaultProps as defaults } from '@nivo/pie'
import { themeProperty, defsProperties, groupProperties } from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            Array<{
                id:    string | number,
                value: number
            }>
            \`\`\`
        `,
        type: 'object[]',
        required: true,
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using
            \`<ResponsivePie/>\`.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        enableControlForFlavors: ['api'],
        help: 'Chart height.',
        description: `
            not required if using
            \`<ResponsivePie/>\`.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
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
        key: 'startAngle',
        help: 'Start angle, useful to make gauges for example.',
        type: 'number',
        required: false,
        defaultValue: defaults.startAngle,
        controlType: 'angle',
        group: 'Base',
        controlOptions: {
            unit: '°',
            min: -180,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'endAngle',
        help: 'End angle, useful to make gauges for example.',
        type: 'number',
        required: false,
        defaultValue: defaults.endAngle,
        controlType: 'angle',
        group: 'Base',
        controlOptions: {
            unit: '°',
            min: -360,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'fit',
        help: `If 'true', pie will be omptimized to occupy more space when using partial pie.`,
        type: 'boolean',
        required: false,
        defaultValue: defaults.fit,
        controlType: 'switch',
        group: 'Base',
    },
    {
        key: 'innerRadius',
        help: `Donut chart if greater than 0. Value should be between 0~1 as it's a ratio from original radius.`,
        type: 'number',
        required: false,
        defaultValue: defaults.innerRadius,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 0.95,
            step: 0.05,
        },
    },
    {
        key: 'padAngle',
        help: 'Padding between each pie slice.',
        type: 'number',
        required: false,
        defaultValue: defaults.padAngle,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'cornerRadius',
        help: 'Rounded slices.',
        type: 'number',
        required: false,
        defaultValue: defaults.cornerRadius,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'sortByValue',
        help: `If 'true', arcs will be ordered according to their associated value.`,
        type: 'boolean',
        required: false,
        defaultValue: defaults.sortByValue,
        controlType: 'switch',
        group: 'Base',
    },
    {
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
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
    ...defsProperties('Style', ['svg', 'api']),
    {
        key: 'showcase pattern usage',
        flavors: ['svg'],
        help: 'Patterns.',
        description: `
            You can use \`defs\` and \`fill\` properties
            to use patterns, see
            [dedicated guide](self:/guides/patterns)
            for further information.
        `,
        type: 'boolean',
        controlType: 'switch',
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Slices border width.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.borderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    {
        key: 'enableRadialLabels',
        help: 'Enable/disable radial labels.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableRadialLabels,
        controlType: 'switch',
        group: 'Radial labels',
    },
    {
        key: 'radialLabel',
        help: 'Radial label',
        description: `
            Defines how to get label text,
            can be a string (used to access current node data property)
            or a function which will receive the actual node data.
        `,
        type: 'string | Function',
        required: false,
        defaultValue: 'id',
        controlType: 'choices',
        group: 'Radial labels',
        controlOptions: {
            choices: ['id', 'value', `d => \`\${d.id} (\${d.value})\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'radialLabelsSkipAngle',
        help: `Skip label if corresponding slice's angle is lower than provided value.`,
        type: 'number',
        required: false,
        defaultValue: 0,
        controlType: 'range',
        group: 'Radial labels',
        controlOptions: {
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'radialLabelsLinkOffset',
        help: `Link offset from pie outer radius, useful to have links overlapping pie slices.`,
        type: 'number',
        required: false,
        controlType: 'range',
        group: 'Radial labels',
        controlOptions: {
            unit: 'px',
            min: -24,
            max: 24,
            step: 1,
        },
    },
    {
        key: 'radialLabelsLinkDiagonalLength',
        help: `Link diagonal length.`,
        type: 'number',
        required: false,
        controlType: 'range',
        group: 'Radial labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
            step: 1,
        },
    },
    {
        key: 'radialLabelsLinkHorizontalLength',
        help: `Links horizontal length.`,
        type: 'number',
        required: false,
        controlType: 'range',
        group: 'Radial labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
            step: 1,
        },
    },
    {
        key: 'radialLabelsTextXOffset',
        help: `X offset from links' end.`,
        type: 'number',
        required: false,
        controlType: 'range',
        group: 'Radial labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
            step: 1,
        },
    },
    {
        key: 'radialLabelsLinkStrokeWidth',
        help: 'Links stroke width.',
        type: 'number',
        required: false,
        controlType: 'lineWidth',
        group: 'Radial labels',
    },
    {
        key: 'radialLabelsTextColor',
        help: 'Defines how to compute radial label text color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.radialLabelsTextColor,
        controlType: 'inheritedColor',
        group: 'Radial labels',
    },
    {
        key: 'radialLabelsLinkColor',
        help: 'Defines how to compute radial label link color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.radialLabelsLinkColor,
        controlType: 'inheritedColor',
        group: 'Radial labels',
    },
    {
        key: 'enableSlicesLabels',
        help: 'Enable/disable slices labels.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableSlicesLabels,
        controlType: 'switch',
        group: 'Slices labels',
    },
    {
        key: 'sliceLabel',
        help:
            'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data.',
        type: 'string | Function',
        required: false,
        defaultValue: 'value',
        controlType: 'choices',
        group: 'Slices labels',
        controlOptions: {
            choices: ['id', 'value', `d => \`\${d.id} (\${d.value})\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'slicesLabelsSkipAngle',
        help: `Skip label if corresponding slice's angle is lower than provided value.`,
        type: 'number',
        required: false,
        defaultValue: 0,
        controlType: 'range',
        group: 'Slices labels',
        controlOptions: {
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'slicesLabelsTextColor',
        help: 'Defines how to compute slice label text color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.slicesLabelsTextColor,
        controlType: 'inheritedColor',
        group: 'Slices labels',
    },
    {
        key: 'isInteractive',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
    },
    {
        key: 'onClick',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: 'onClick handler.',
        description:
            'onClick handler for pie slices, it receives clicked slice data and mouse event.',
        type: 'Function',
        required: false,
    },
    {
        key: 'tooltip',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom tooltip component',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML
            element and will receive the following data:
            \`\`\`
            {
                id:    {string|number},
                value: number,
                label: {string|number},
                color: string
            }
            \`\`\`
            You can customize the style of the tooltip using
            the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'custom tooltip example',
        flavors: ['svg', 'canvas'],
        help: 'Showcase custom tooltip.',
        type: 'boolean',
        controlType: 'switch',
        group: 'Interactivity',
    },
]

export const groups = groupProperties(props)
