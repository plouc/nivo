/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { WaffleDefaultProps } from '@nivo/waffle'
import {
    themeProperty,
    motionProperties,
    defsProperties,
    getLegendsProps,
    groupProperties,
} from '../../../lib/componentProperties'

const defaults = WaffleDefaultProps

const props = [
    {
        key: 'total',
        group: 'Base',
        type: 'number',
        help: 'Max value.',
        description: 'Max value, ratio will be computed against this value for each datum.',
        required: true,
    },
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            Array<{
                id:    string | number
                value: number
                label: string | number
            }>
            \`\`\`
        `,
        type: 'object[]',
        required: true,
    },
    // {
    //     key: 'hiddenIds',
    //     type: 'Array<string | number>',
    //     help: 'Hide parts of the data by id',
    //     description: `
    //         Hide parts of the data by id, this can be used
    //         to implement toggle. Note that the datum will
    //         still be visible in legends, if you want
    //         to completely remove a datum from the data set,
    //         you'll have to filter the data before passing
    //         it to the component.
    //     `,
    //     required: false,
    //     defaultValue: defaults.hiddenIds,
    // },
    {
        key: 'rows',
        type: 'number',
        help: 'Number of rows.',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 1,
            max: 100,
        },
    },
    {
        key: 'columns',
        type: 'number',
        help: 'Number of columns.',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 1,
            max: 100,
        },
    },
    {
        key: 'fillDirection',
        help: `How to fill the waffle.`,
        type: 'string',
        required: false,
        defaultValue: defaults.fillDirection,
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: [
                { label: 'top', value: 'top' },
                { label: 'right', value: 'right' },
                { label: 'bottom', value: 'bottom' },
                { label: 'left', value: 'left' },
            ],
        },
    },
    {
        key: 'padding',
        type: 'number',
        help: 'Padding between each cell.',
        required: true,
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
        group: 'Base',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using responsive alternative
            of the component
            \`<Responsive*/>\`.
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
            of the component
            \`<Responsive*/>\`.
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
    themeProperty,
    {
        key: 'cellComponent',
        flavors: ['svg', 'html'],
        help: 'Override default cell component.',
        type: 'Function',
        required: false,
        controlType: 'choices',
        group: 'Style',
        controlOptions: {
            choices: ['default', 'Custom(props) => (…)'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'colors',
        help: 'Defines how to compute node color.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'ordinalColors',
        group: 'Style',
    },
    {
        key: 'emptyColor',
        help: 'Defines empty cells color.',
        type: 'string',
        required: false,
        defaultValue: defaults.emptyColor,
        controlType: 'colorPicker',
        group: 'Style',
    },
    {
        key: 'emptyOpacity',
        help: 'Empty cells opacity.',
        required: false,
        defaultValue: defaults.emptyOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Control cell border width.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute cell border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.borderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'isInteractive',
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        help: 'onClick handler, it receives clicked node data and style plus mouse event.',
        type: 'Function',
        required: false,
    },
    {
        key: 'tooltip',
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
                id:         {string|number},
                value:      number,
                label:      {string|number},
                color:      string,
                position:   number,
                row:        number,
                column:     number,
                groupIndex: number,
                startAt:    number,
                endAt:      number,
            }
            \`\`\`
            You can customize the tooltip style
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'custom tooltip example',
        help: 'Showcase custom tooltip.',
        type: 'boolean',
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'legends',
        flavors: ['svg', 'canvas'],
        type: 'object[]',
        help: `Optional chart's legends.`,
        group: 'Legends',
        controlType: 'array',
        controlOptions: {
            props: getLegendsProps(['svg', 'canvas']),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            defaults: {
                anchor: 'left',
                direction: 'column',
                justify: false,
                translateX: -100,
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
    ...motionProperties(['svg', 'html'], defaults),
]

export const groups = groupProperties(props)
