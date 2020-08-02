/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { HeatMapDefaultProps as defaults } from '@nivo/heatmap'
import {
    themeProperty,
    axesProperties,
    motionProperties,
    groupProperties,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        type: 'object[]',
        required: true,
    },
    {
        key: 'indexBy',
        group: 'Base',
        help: 'Key to use to index the data.',
        description: `
            Key to use to index the data,
            this key must exist in each data item.
            You can also provide a function which will
            receive the data item and must return
            the desired index
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaults.indexBy,
    },
    {
        key: 'keys',
        group: 'Base',
        help: 'Keys to use to determine each serie.',
        type: 'string[]',
        required: false,
        defaultValue: defaults.keys,
    },
    {
        key: 'minValue',
        help: 'Minimum value.',
        description: `
            Minimum value.
            If 'auto', will pick the lowest value
            in the provided data set. Should be overriden
            if your data set does not contain desired
            lower bound value.
        `,
        required: false,
        defaultValue: defaults.minValue,
        type: `number | 'auto'`,
        controlType: 'switchableRange',
        group: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 0,
            min: -100,
            max: 100,
        },
    },
    {
        key: 'maxValue',
        help: 'Maximum value.',
        description: `
            Maximum value. If 'auto', will pick the highest value
            in the provided data set. Should be overriden
            if your data set does not contain desired
            higher bound value.
        `,
        required: false,
        defaultValue: defaults.maxValue,
        type: `number | 'auto'`,
        controlType: 'switchableRange',
        group: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 100,
            min: -100,
            max: 100,
        },
    },
    {
        key: 'forceSquare',
        help: 'Force square cells (width = height).',
        required: false,
        defaultValue: defaults.forceSquare,
        type: 'boolean',
        controlType: 'switch',
        group: 'Base',
    },
    {
        key: 'sizeVariation',
        help: 'Cell size variation.',
        description: `Size variation (0~1), if value is 0 size won't be affected. If you use for example the value 0.3, cell width/height will vary between 0.7~1 according to its corresponding value.`,
        required: false,
        defaultValue: defaults.sizeVariation,
        type: 'number',
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.02,
        },
    },
    {
        key: 'padding',
        help: 'Padding.',
        required: false,
        defaultValue: defaults.padding,
        type: 'number',
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 36,
            unit: 'px',
        },
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using
            \`<ResponsiveHeatMap/>\`.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1200,
            step: 5,
        },
    },
    {
        key: 'height',
        enableControlForFlavors: ['api'],
        help: 'Chart height.',
        description: `
            not required if using
            \`<ResponsiveHeatMap/>\`.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1200,
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
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    themeProperty,
    {
        key: 'cellShape',
        help: `Cell shape/component.`,
        description: `
            Cell shape, can be one of: \`'rect'\`, \`'circle'\`,
            if a function is provided, it must return
            a valid SVG element and will receive
            the following props:
            \`\`\`
            {
                value:       number,
                x:           number,
                y:           number,
                width:       number,
                height:      number,
                color:       string,
                opacity:     number,
                borderWidth: number,
                borderColor: string,
                textColor:   string,
            }
            \`\`\`
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaults.cellShape,
        controlType: 'choices',
        group: 'Style',
        controlOptions: {
            choices: ['rect', 'circle', 'Custom(props) => (…)'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'colors',
        help: 'Defines color range.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: 'nivo',
        controlType: 'quantizeColors',
        group: 'Style',
    },
    {
        key: 'cellOpacity',
        help: 'Cell opacity (0~1).',
        required: false,
        defaultValue: defaults.cellOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Style',
    },
    {
        key: 'cellBorderWidth',
        help: 'Cell border width.',
        required: false,
        defaultValue: defaults.cellBorderWidth,
        type: 'number',
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'cellBorderColor',
        help: 'Method to compute cell border color.',
        description: `
            how to compute cell border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.cellBorderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    {
        key: 'enableLabels',
        help: 'Enable/disable labels.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLabels,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'labelTextColor',
        help: 'Method to compute label text color.',
        description: `
            how to compute label text color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.labelTextColor,
        controlType: 'inheritedColor',
        group: 'Labels',
    },
    {
        key: 'enableGridX',
        help: 'Enable/disable x grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridX,
        controlType: 'switch',
        group: 'Grid & Axes',
    },
    {
        key: 'enableGridY',
        help: 'Enable/disable y grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridY,
        controlType: 'switch',
        group: 'Grid & Axes',
    },
    ...axesProperties(),
    {
        key: 'isInteractive',
        flavors: ['svg', 'canvas'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'onClick',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        type: '(cell, event) => void',
        required: false,
        help: 'onClick handler.',
        description: `
            onClick handler, will receive node data
            as first argument & event as second one.
            The node data has the following shape:
            \`\`\`
            {
                key:        string,
                value:      number,
                x:          number,
                xKey:       {string|number},
                y:          number,
                yKey:       {string|number},
                width:      number,
                height:     number,
                opacity:    number
            }
            \`\`\`
        `,
    },
    {
        key: 'hoverTarget',
        flavors: ['svg', 'canvas'],
        help: 'Defines hover behavior.',
        description: `
            Defines hover behavior:

            - **cell**: highlight the current cell
            - **row**: highlight the current cell's row
            - **column**: highlight the current cell's column
            - **rowColumn**: highlight the current cell's row & column
        `,
        required: false,
        defaultValue: defaults.hoverTarget,
        type: 'string',
        controlType: 'choices',
        group: 'Interactivity',
        controlOptions: {
            choices: ['cell', 'row', 'column', 'rowColumn'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'cellHoverOpacity',
        flavors: ['svg', 'canvas'],
        help: 'Cell opacity on hover.',
        required: false,
        defaultValue: defaults.cellHoverOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Interactivity',
    },
    {
        key: 'cellHoverOthersOpacity',
        flavors: ['svg', 'canvas'],
        help: 'Cell opacity when not hovered.',
        required: false,
        defaultValue: defaults.cellHoverOthersOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Interactivity',
    },
    ...motionProperties(['svg'], defaults, 'react-spring'),
]

export const groups = groupProperties(props)
