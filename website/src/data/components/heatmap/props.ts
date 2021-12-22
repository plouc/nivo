// @ts-ignore
import { HeatMapDefaultProps as defaults } from '@nivo/heatmap'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'
import { chartDimensions, chartGrid, axes, isInteractive } from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas', 'api']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
        help: 'Chart data.',
        type: 'object[]',
        required: true,
    },
    {
        key: 'indexBy',
        group: 'Base',
        flavors: allFlavors,
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
        flavors: allFlavors,
        help: 'Keys to use to determine each serie.',
        type: 'string[]',
        required: false,
        defaultValue: defaults.keys,
    },
    {
        key: 'minValue',
        help: 'Minimum value.',
        flavors: allFlavors,
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
        group: 'Base',
        control: {
            type: 'switchableRange',
            disabledValue: 'auto',
            defaultValue: 0,
            min: -100,
            max: 100,
        },
    },
    {
        key: 'maxValue',
        help: 'Maximum value.',
        flavors: allFlavors,
        description: `
            Maximum value. If 'auto', will pick the highest value
            in the provided data set. Should be overriden
            if your data set does not contain desired
            higher bound value.
        `,
        required: false,
        defaultValue: defaults.maxValue,
        type: `number | 'auto'`,
        group: 'Base',
        control: {
            type: 'switchableRange',
            disabledValue: 'auto',
            defaultValue: 100,
            min: -100,
            max: 100,
        },
    },
    {
        key: 'forceSquare',
        help: 'Force square cells (width = height).',
        flavors: allFlavors,
        required: false,
        defaultValue: defaults.forceSquare,
        type: 'boolean',
        control: { type: 'switch' },
        group: 'Base',
    },
    {
        key: 'sizeVariation',
        help: 'Cell size variation.',
        flavors: allFlavors,
        description: `Size variation (0~1), if value is 0 size won't be affected. If you use for example the value 0.3, cell width/height will vary between 0.7~1 according to its corresponding value.`,
        required: false,
        defaultValue: defaults.sizeVariation,
        type: 'number',
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.02,
        },
    },
    {
        key: 'padding',
        help: 'Padding.',
        flavors: allFlavors,
        required: false,
        defaultValue: defaults.padding,
        type: 'number',
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 36,
            unit: 'px',
        },
    },
    ...chartDimensions(allFlavors),
    themeProperty(['svg', 'canvas', 'api']),
    {
        key: 'cellShape',
        help: `Cell shape/component.`,
        flavors: allFlavors,
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
        group: 'Style',
        control: {
            type: 'choices',
            choices: ['rect', 'circle', 'Custom(props) => (…)'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'colors',
        help: 'Defines color range.',
        flavors: allFlavors,
        type: 'string | Function | string[]',
        required: false,
        defaultValue: 'nivo',
        control: { type: 'quantizeColors' },
        group: 'Style',
    },
    {
        key: 'cellOpacity',
        help: 'Cell opacity (0~1).',
        flavors: allFlavors,
        required: false,
        defaultValue: defaults.cellOpacity,
        type: 'number',
        control: { type: 'opacity' },
        group: 'Style',
    },
    {
        key: 'cellBorderWidth',
        help: 'Cell border width.',
        flavors: allFlavors,
        required: false,
        defaultValue: defaults.cellBorderWidth,
        type: 'number',
        control: { type: 'lineWidth' },
        group: 'Style',
    },
    {
        key: 'cellBorderColor',
        help: 'Method to compute cell border color.',
        flavors: allFlavors,
        description: `
            how to compute cell border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.cellBorderColor,
        control: { type: 'inheritedColor' },
        group: 'Style',
    },
    {
        key: 'enableLabels',
        help: 'Enable/disable labels.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLabels,
        control: { type: 'switch' },
        group: 'Labels',
    },
    {
        key: 'labelTextColor',
        help: 'Method to compute label text color.',
        flavors: allFlavors,
        description: `
            how to compute label text color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.labelTextColor,
        control: { type: 'inheritedColor' },
        group: 'Labels',
    },
    ...chartGrid({
        flavors: allFlavors,
        xDefault: defaults.enableGridX,
        yDefault: defaults.enableGridY,
    }),
    ...axes({ flavors: allFlavors }),
    isInteractive({
        flavors: ['svg', 'canvas'],
        defaultValue: defaults.isInteractive,
    }),
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
        group: 'Interactivity',
        control: {
            type: 'choices',
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
        control: { type: 'opacity' },
        group: 'Interactivity',
    },
    {
        key: 'cellHoverOthersOpacity',
        flavors: ['svg', 'canvas'],
        help: 'Cell opacity when not hovered.',
        required: false,
        defaultValue: defaults.cellHoverOthersOpacity,
        type: 'number',
        control: { type: 'opacity' },
        group: 'Interactivity',
    },
    ...motionProperties(['svg'], defaults, 'react-spring'),
]

export const groups = groupProperties(props)
