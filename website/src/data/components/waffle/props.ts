import { WaffleDefaultProps } from '@nivo/waffle'
import {
    themeProperty,
    motionProperties,
    defsProperties,
    getLegendsProps,
    groupProperties,
} from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

const defaults = WaffleDefaultProps

const props: ChartProperty[] = [
    {
        key: 'total',
        group: 'Base',
        type: 'number',
        required: true,
        help: 'Max value.',
        description: 'Max value, ratio will be computed against this value for each datum.',
        flavors: ['svg', 'html', 'canvas'],
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
        flavors: ['svg', 'html', 'canvas'],
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
        group: 'Base',
        type: 'number',
        help: 'Number of rows.',
        required: true,
        flavors: ['svg', 'html', 'canvas'],
        controlType: 'range',
        controlOptions: {
            min: 1,
            max: 100,
        },
    },
    {
        key: 'columns',
        group: 'Base',
        type: 'number',
        help: 'Number of columns.',
        required: true,
        flavors: ['svg', 'html', 'canvas'],
        controlType: 'range',
        controlOptions: {
            min: 1,
            max: 100,
        },
    },
    {
        key: 'fillDirection',
        group: 'Base',
        type: 'string',
        required: false,
        help: `How to fill the waffle.`,
        flavors: ['svg', 'html', 'canvas'],
        defaultValue: defaults.fillDirection,
        controlType: 'choices',
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
        group: 'Base',
        type: 'number',
        help: 'Padding between each cell.',
        required: true,
        flavors: ['svg', 'html', 'canvas'],
        controlType: 'range',
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
        flavors: ['svg', 'html', 'canvas'],
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
        flavors: ['svg', 'html', 'canvas'],
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
        group: 'Base',
        type: 'object',
        required: false,
        help: 'Chart margin.',
        flavors: ['svg', 'html', 'canvas'],
        controlType: 'margin',
    },
    themeProperty(['svg', 'html', 'canvas']),
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
        group: 'Style',
        type: 'string | Function | string[]',
        required: false,
        help: 'Defines how to compute node color.',
        defaultValue: defaults.colors,
        flavors: ['svg', 'html', 'canvas'],
        controlType: 'ordinalColors',
    },
    {
        key: 'emptyColor',
        group: 'Style',
        help: 'Defines empty cells color.',
        type: 'string',
        required: false,
        defaultValue: defaults.emptyColor,
        flavors: ['svg', 'html', 'canvas'],
        controlType: 'colorPicker',
    },
    {
        key: 'emptyOpacity',
        group: 'Style',
        help: 'Empty cells opacity.',
        required: false,
        defaultValue: defaults.emptyOpacity,
        type: 'number',
        flavors: ['svg', 'html', 'canvas'],
        controlType: 'opacity',
    },
    {
        key: 'borderWidth',
        group: 'Style',
        type: 'number',
        required: false,
        help: 'Control cell border width.',
        defaultValue: defaults.borderWidth,
        flavors: ['svg', 'html', 'canvas'],
        controlType: 'lineWidth',
    },
    {
        key: 'borderColor',
        group: 'Style',
        type: 'string | object | Function',
        required: false,
        help: 'Method to compute cell border color.',
        defaultValue: defaults.borderColor,
        flavors: ['svg', 'html', 'canvas'],
        controlType: 'inheritedColor',
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'isInteractive',
        group: 'Interactivity',
        type: 'boolean',
        required: false,
        help: 'Enable/disable interactivity.',
        defaultValue: defaults.isInteractive,
        flavors: ['svg', 'html', 'canvas'],
        controlType: 'switch',
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'onClick handler, it receives clicked node data and style plus mouse event.',
        flavors: ['svg', 'html', 'canvas'],
    },
    {
        key: 'tooltip',
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom tooltip component',
        flavors: ['svg', 'html', 'canvas'],
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
        group: 'Interactivity',
        type: 'boolean',
        required: false,
        controlType: 'switch',
        help: 'Showcase custom tooltip.',
        flavors: ['svg', 'html', 'canvas'],
    },
    {
        key: 'legends',
        group: 'Legends',
        type: 'object[]',
        required: false,
        help: `Optional chart's legends.`,
        flavors: ['svg', 'canvas'],
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
