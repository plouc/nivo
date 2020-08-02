/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { BarDefaultProps as defaults } from '@nivo/bar'
import {
    themeProperty,
    axesProperties,
    motionProperties,
    defsProperties,
    getLegendsProps,
    groupProperties,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        help: 'Chart data.',
        type: 'object[]',
        required: true,
        group: 'Base',
    },
    {
        key: 'indexBy',
        help: 'Key to use to index the data.',
        description: `
            Key to use to index the data,
            this key must exist in each data item.
            
            You can also provide a function which will
            receive the data item and must return the desired index.
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaults.indexBy,
        group: 'Base',
    },
    {
        key: 'keys',
        help: 'Keys to use to determine each serie.',
        type: 'string[]',
        required: false,
        defaultValue: defaults.keys,
        group: 'Base',
    },
    {
        key: 'groupMode',
        help: `How to group bars.`,
        type: 'string',
        required: false,
        defaultValue: defaults.groupMode,
        controlType: 'radio',
        group: 'Base',
        controlOptions: {
            choices: [
                { label: 'stacked', value: 'stacked' },
                { label: 'grouped', value: 'grouped' },
            ],
        },
    },
    {
        key: 'layout',
        help: `How to display bars.`,
        type: 'string',
        required: false,
        defaultValue: defaults.layout,
        controlType: 'radio',
        group: 'Base',
        controlOptions: {
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'reverse',
        help:
            'Reverse bars, starts on top instead of bottom for vertical layout and right instead of left for horizontal one.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.reverse,
        controlType: 'switch',
        group: 'Base',
    },
    {
        key: 'minValue',
        help: 'Minimum value.',
        description: `
            Minimum value, if 'auto',
            will use min value from the provided data.
        `,
        required: false,
        defaultValue: defaults.minValue,
        type: 'number | string',
        controlType: 'switchableRange',
        group: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: -1000,
            min: -1000,
            max: 0,
        },
    },
    {
        key: 'maxValue',
        help: 'Maximum value.',
        description: `
            Maximum value, if 'auto',
            will use max value from the provided data.
        `,
        required: false,
        defaultValue: defaults.maxValue,
        type: 'number | string',
        controlType: 'switchableRange',
        group: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 1000,
            min: 0,
            max: 1000,
        },
    },
    {
        key: 'padding',
        help: 'Padding between each bar (ratio).',
        type: 'number',
        required: false,
        defaultValue: defaults.padding,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 0.9,
            step: 0.05,
        },
    },
    {
        key: 'innerPadding',
        help: 'Padding between grouped/stacked bars.',
        type: 'number',
        required: false,
        defaultValue: defaults.innerPadding,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 10,
        },
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using \`ResponsiveBar\`.
            Also note that width exclude left/right axes,
            please add margin to make sure they're visible.
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
            not required if using \`ResponsiveBar\`.
            Also note that width exclude left/right axes,
            please add margin to make sure they're visible.
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
    {
        key: 'colorBy',
        type: 'string | Function',
        help: 'Property used to determine node color.',
        description: `
            Property to use to determine node color.
            If a function is provided, it will receive
            the current node data and must return
            a string or number which will be passed
            to the color generator.
        `,
        required: false,
        defaultValue: defaults.colorBy,
        controlType: 'choices',
        group: 'Style',
        controlOptions: {
            choices: [
                {
                    label: 'id',
                    value: 'id',
                },
                {
                    label: 'index',
                    value: 'index',
                },
            ],
        },
    },
    {
        key: 'borderRadius',
        flavors: ['svg', 'api'],
        help: 'Rectangle border radius.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderRadius,
        controlType: 'range',
        group: 'Style',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        key: 'borderWidth',
        help: 'Width of bar border.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        description: `
            how to compute border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.borderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'layers',
        flavors: ['svg'],
        help: 'Defines the order of layers.',
        description: `
            Defines the order of layers, available layers are:
            \`grid\`, \`axes\`, \`bars\`, \`markers\`, \`legends\`.

            You can also use this to insert extra layers to the chart,
            this extra layer must be a function which will receive
            the chart computed data and must return a valid SVG
            element.
        `,
        type: 'Array<string | Function>',
        required: false,
        defaultValue: defaults.layers,
        group: 'Customization',
    },
    {
        key: 'enableLabel',
        help: 'Enable/disable labels.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLabel,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'label',
        group: 'Labels',
        help: 'Define how bar labels are computed.',
        description: `
            Define how bar labels are computed.
            
            By default it will use the bar's value.
            It accepts a string which will be used to access
            a specific bar data property, such as
            \`'value'\` or \`'id'\`.
            
            You can also use a funtion if you want to
            add more logic, this function will receive
            the current bar's data and must return
            the computed label which, depending on the context,
            should return a string or an svg element (Bar) or
            a string (BarCanvas). For example let's say you want
            to use a label with both the id and the value,
            you can achieve this with:
            \`\`\`
            label={d => \`\${d.id}: \${d.value}\`}
            \`\`\`
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaults.label,
    },
    {
        key: 'labelFormat',
        group: 'Labels',
        help: 'How to format labels.',
        description: `
            How to format labels,
            [see d3.format() documentation](https://github.com/d3/d3-format/blob/master/README.md#format).
        `,
        type: 'string | Function',
    },
    {
        key: 'labelSkipWidth',
        help: 'Skip label if bar width is lower than provided value, ignored if 0.',
        type: 'number',
        required: false,
        defaultValue: defaults.labelSkipWidth,
        controlType: 'range',
        group: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        key: 'labelSkipHeight',
        help: 'Skip label if bar height is lower than provided value, ignored if 0.',
        type: 'number',
        required: false,
        defaultValue: defaults.labelSkipHeight,
        controlType: 'range',
        group: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        key: 'labelTextColor',
        help: 'Defines how to compute label text color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.labelTextColor,
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
    {
        key: 'gridXValues',
        group: 'Grid & Axes',
        help: 'Specify values to use for vertical grid lines.',
        type: 'Array<number | string>',
        required: false,
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
    {
        key: 'gridYValues',
        group: 'Grid & Axes',
        help: 'Specify values to use for horizontal grid lines.',
        type: 'Array<number | string>',
        required: false,
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
        key: 'tooltip',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Tooltip custom component',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML element and will receive
            the following data:
            \`\`\`
            {
                id:         string | number,
                value:      number,
                index:      number,
                indexValue: string | number,
                color:      string,
                // datum associated to the current index (raw data)
                data:       object
            }
            \`\`\`
            You can also customize the style of the tooltip
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'custom tooltip example',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: 'Showcase custom tooltip component.',
        type: 'boolean',
        controlType: 'switch',
    },
    {
        key: 'onClick',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'onClick handler',
        description: `
            onClick handler, will receive node data as first argument
            & event as second one. The node data has the following shape:

            \`\`\`
            {
                id:         string | number,
                value:      number,
                index:      number,
                indexValue: string | number,
                color:      string,
                // datum associated to the current index (raw data)
                data:       object
            }
            \`\`\`
        `,
    },
    {
        key: 'legends',
        flavors: ['svg'],
        type: 'object[]',
        help: `Optional chart's legends.`,
        group: 'Legends',
        controlType: 'array',
        controlOptions: {
            props: getLegendsProps(['svg']),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            getItemTitle: (index, legend) =>
                `legend[${index}]: ${legend.anchor}, ${legend.direction}`,
            defaults: {
                dataFrom: 'keys',
                anchor: 'top-left',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 0,
                symbolSize: 20,
                itemDirection: 'left-to-right',
                onClick: data => {
                    alert(JSON.stringify(data, null, '    '))
                },
            },
        },
    },
    ...motionProperties(['svg'], defaults),
]

export const groups = groupProperties(props)
