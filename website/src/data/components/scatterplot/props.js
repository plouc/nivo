/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { ScatterPlotDefaultProps as defaults } from '@nivo/scatterplot'
import {
    axesProperties,
    motionProperties,
    getPropertiesGroupsControls,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        scopes: '*',
        group: 'Base',
        help: 'Chart data.',
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            Array<{
                id:   string | number
                data: Array<{
                    x: number | string | Date
                    y: number | string | Date
                }>
            }>
            \`\`\`

            Please not that you should adjust \`xScale\`
            and \`yScale\` according to \`x\` and \`y\` type,
            for example if you use dates, you should use
            a \`time\` scale.
        `,
        required: true,
    },
    {
        key: 'xScale',
        scopes: '*',
        type: 'object',
        help: `X scale configuration.`,
        group: 'Base',
        controlType: 'object',
        controlOptions: {
            props: [
                {
                    key: 'type',
                    help: `Scale type, supports linear, point and time scales.`,
                    type: 'string',
                    controlType: 'choices',
                    controlOptions: {
                        disabled: true,
                        choices: ['linear'].map(v => ({
                            label: v,
                            value: v,
                        })),
                    },
                },
                {
                    key: 'min',
                    help: 'Minimum scale value.',
                    required: false,
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        disabledValue: 'auto',
                        defaultValue: 0,
                        min: -2000,
                        max: 2000,
                    },
                },
                {
                    key: 'max',
                    help: 'Maximum scale value.',
                    required: false,
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        disabledValue: 'auto',
                        defaultValue: 1200,
                        min: -2000,
                        max: 2000,
                    },
                },
            ],
        },
    },
    {
        key: 'yScale',
        scopes: '*',
        type: 'object',
        help: `Y scale configuration.`,
        group: 'Base',
        controlType: 'object',
        controlOptions: {
            props: [
                {
                    key: 'type',
                    help: `Scale type, supports linear, point and time scales.`,
                    type: 'string',
                    controlType: 'choices',
                    controlOptions: {
                        disabled: true,
                        choices: ['linear'].map(v => ({
                            label: v,
                            value: v,
                        })),
                    },
                },
                {
                    key: 'min',
                    help: 'Minimum scale value.',
                    required: false,
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        disabledValue: 'auto',
                        defaultValue: 0,
                        min: -2000,
                        max: 2000,
                    },
                },
                {
                    key: 'max',
                    help: 'Maximum scale value.',
                    required: false,
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        disabledValue: 'auto',
                        defaultValue: 1200,
                        min: -2000,
                        max: 2000,
                    },
                },
            ],
        },
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        description: `
            Not required if using
            \`Responsive*\` component.
            Also note that width exclude left/right axes,
            please add margin to make sure they're visible.
        `,
        help: 'Chart width.',
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
        scopes: ['api'],
        docScopes: '*',
        description: `
            Not required if using
            \`Responsive*\` component.
            Also note that width exclude top/bottom axes,
            please add margin to make sure they're visible.
        `,
        help: 'Chart height.',
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
        key: 'layers',
        scopes: ['ScatterPlot'],
        group: 'Base',
        help: 'Defines the order of layers.',
        description: `
            Defines the order of layers, available layers are:
            \`grid\`, \`axes\`, \`points\`, \`markers\`,
            \`mesh\`, \`legends\`.
            You can also use this to insert extra layers
            to the chart, this extra layer must be
            a function which will receive the chart
            computed data and must return a valid SVG element.
        `,
        required: false,
        defaultValue: defaults.layers,
    },
    {
        key: 'pixelRatio',
        scopes: ['ScatterPlotCanvas'],
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
        scopes: '*',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'colors',
        scopes: '*',
        help: 'Defines color range.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: 'nivo',
        controlType: 'colors',
        group: 'Style',
    },
    {
        key: 'colorBy',
        scopes: '*',
        help: `
            Property to use to determine node color.
            If a function is provided, it will receive
            current node data and must return a color.
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaults.colorBy,
        controlType: 'choices',
        group: 'Style',
        controlOptions: {
            choices: [
                {
                    label: 'serie.id',
                    value: 'serie.id',
                },
                {
                    label: 'id',
                    value: 'id',
                },
            ],
        },
    },
    {
        key: 'symbolSize',
        scopes: '*',
        help: `Symbol size.`,
        required: false,
        defaultValue: defaults.symbolSize,
        type: `number`,
        controlType: 'range',
        group: 'Symbols',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 24,
        },
    },
    {
        key: 'enableGridX',
        scopes: '*',
        help: 'Enable/disable x grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridX,
        controlType: 'switch',
        group: 'Grid & Axes',
    },
    {
        key: 'enableGridY',
        scopes: '*',
        help: 'Enable/disable y grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridY,
        controlType: 'switch',
        group: 'Grid & Axes',
    },
    ...axesProperties,
    {
        key: 'isInteractive',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'useMesh',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        help: 'Use a mesh to detect mouse interactions.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.useMesh,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'debugMesh',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        help: 'Display mesh used to detect mouse interactions (voronoi cells).',
        type: 'boolean',
        required: false,
        defaultValue: defaults.debugMesh,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'tooltip',
        scopes: ['ScatterPlot'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom tooltip component',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML element and will
            receive the following data:
            \`\`\`
            {
                id:    string | number
                serie: string | number
                color: string
                x:     number
                y:     number
            }
            \`\`\`
            You can also customize the tooltip style
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'custom tooltip example',
        scopes: ['ScatterPlot'],
        group: 'Interactivity',
        excludeFromDoc: true,
        help: 'Showcase custom tooltip.',
        type: 'boolean',
        controlType: 'switch',
    },
    {
        key: 'onMouseEnter',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        group: 'Interactivity',
        help: 'onMouseEnter handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseMove',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        group: 'Interactivity',
        help: 'onMouseMove handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseLeave',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        group: 'Interactivity',
        help: 'onMouseLeave handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onClick',
        scopes: ['ScatterPlot', 'ScatterPlotCanvas'],
        group: 'Interactivity',
        help: 'onClick handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    ...motionProperties(['ScatterPlot'], defaults),
]

export const groupsByScope = {
    ScatterPlot: getPropertiesGroupsControls(props, 'ScatterPlot'),
    ScatterPlotCanvas: getPropertiesGroupsControls(props, 'ScatterPlotCanvas'),
}
