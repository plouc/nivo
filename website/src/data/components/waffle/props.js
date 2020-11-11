import { defaultProps as defaults } from '@nivo/waffle'
import {
    themeProperty,
    motionProperties,
    defsProperties,
    getLegendsProps,
    groupProperties,
} from '../../../lib/componentProperties'

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
    {
        key: 'valueFormat',
        group: 'Base',
        help: 'Optional formatter for values.',
        description: `
            The formatted value can then be used for labels & tooltips.
            
            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        required: false,
        type: 'string | (value: number) => string | number',
        controlType: 'valueFormat',
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
        required: false,
        defaultValue: defaults.padding,
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
        key: 'cellComponent',
        group: 'Customization',
        flavors: ['svg', 'html'],
        help: 'Override default cell component.',
        type: 'Function',
        required: false,
        controlType: 'choices',
        controlOptions: {
            choices: ['default', 'Custom(props) => (…)'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'renderCell',
        group: 'Customization',
        flavors: ['canvas'],
        help: 'Override default cell rendering for canvas implementation.',
        type: 'Function',
        required: false,
    },
    {
        key: 'layers',
        group: 'Customization',
        help: `
            Defines the order of layers and add custom layers,
            the legends layer is not available for WaffleHtml.
        `,
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer must be a function.
            
            The layer component which will receive the chart's
            context & computed data and must return a valid SVG element
            for the \`Waffle\` component or an HTML one for \`WaffleHtml\`.

            When using the canvas implementation, the function
            will receive the canvas 2d context as first argument
            and the chart's context and computed data as second.

            Please make sure to use \`context.save()\` and
            \`context.restore()\` if you make some global
            modifications to the 2d context inside this function
            to avoid side effects.
            
            The context passed to layers has the following structure:
            
            \`\`\`
            {
                cells:          Cell[],
                cellSize:       number
                borderWidth:    number
                getBorderColor: number
                origin: {
                    x: number
                    y: number
                }
            }
            \`\`\`
        `,
        required: false,
        type: 'Array<string | Function>',
        defaultValue: ['cells', 'legends'],
    },
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
        key: 'onMouseEnter',
        flavors: ['svg', 'html'],
        group: 'Interactivity',
        help: 'onMouseEnter handler, it receives target cell data and mouse event.',
        type: '(cell: Cell, event: MouseEvent) => void',
        required: false,
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        help: 'onMouseMove handler, it receives target cell data and mouse event.',
        type: '(cell: Cell, event: MouseEvent) => void',
        required: false,
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        flavors: ['svg', 'html'],
        help: 'onMouseLeave handler, it receives target cell data and mouse event.',
        type: '(cell: Cell, event: MouseEvent) => void',
        required: false,
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        help: 'onClick handler, it receives target cell data and mouse event.',
        type: '(cell: Cell, event: MouseEvent) => void',
        required: false,
    },
    {
        key: 'tooltip',
        group: 'Interactivity',
        type: '({ cell: DataCell }) => JSX.Element',
        required: false,
        help: 'Overrides default tooltip component.',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML element and will
            receive the following properties:
            \`\`\`
            {
                // cell with data, only cell having data
                // trigger the tooltip
                cell: {
                    position: number
                    column:   number
                    row:      number
                    x:        number
                    y:        number
                    color:    string
                    // normalized data
                    data: {
                        id:             string | number
                        label:          string | number
                        value:          number
                        formattedValue: string | number
                        groupIndex:     number
                        startAt:        number
                        endAt:          number
                        // raw data as passed to the chart
                        data: { /* ... */ }
                    }
                }
            }
            \`\`\`
            Please note that you can also customize the default
            tooltip style using the \`theme.tooltip\` object.
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
