import { svgDefaultProps as defaults } from '@nivo/funnel'
import { themeProperty, groupProperties, motionProperties } from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    ordinalColors,
    isInteractive,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        type: 'Datum[]',
        required: true,
        help: 'Chart data.',
        flavors: ['svg'],
        description: `
            Chart data, which must conform to this structure:

            \`\`\`
            {
                id:    string | number
                label: string
                value: number
            }[]
            \`\`\`
            
            Datum is a generic and can be overriden, this can be useful
            to attach a color to each datum for example, and then use
            this for the \`colors\` property.            
        `,
    },
    ...chartDimensions(allFlavors),
    {
        key: 'direction',
        group: 'Base',
        help: `Direction of the chart.`,
        type: 'string',
        required: false,
        defaultValue: defaults.direction,
        flavors: ['svg'],
        control: {
            type: 'radio',
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'interpolation',
        group: 'Base',
        type: 'string',
        required: false,
        help: `Part shape interpolation.`,
        defaultValue: defaults.interpolation,
        flavors: ['svg'],
        control: {
            type: 'radio',
            choices: [
                { label: 'smooth', value: 'smooth' },
                { label: 'linear', value: 'linear' },
            ],
        },
    },
    {
        key: 'spacing',
        group: 'Base',
        help: 'Spacing between parts',
        type: 'number',
        required: false,
        defaultValue: defaults.spacing,
        flavors: ['svg'],
        control: {
            type: 'range',
            min: 0,
            max: 30,
            unit: 'px',
        },
    },
    {
        key: 'shapeBlending',
        group: 'Base',
        help: 'Blend shapes.',
        type: 'number',
        required: false,
        defaultValue: defaults.shapeBlending,
        flavors: ['svg'],
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.01,
        },
    },
    {
        key: 'valueFormat',
        group: 'Base',
        help: `
            Value format supporting d3-format notation, this formatted value
            will then be used for labels and tooltips.
        `,
        type: 'string | Function',
        required: false,
        flavors: ['svg'],
        control: { type: 'valueFormat' },
    },
    chartRef(['svg']),
    themeProperty(allFlavors),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: defaults.colors,
    }),
    {
        key: 'size',
        group: 'Style',
        help: 'Define how to compute the size of funnel parts.',
        description: `
            Define how funnel part sizes are computed, possible values:
            
            - \`undefined\`: Default, uses linearScale(datum.value)
            - \`function\`: Custom function: \`(datum) => number\`
            - \`array\`: Array of fixed sizes to use
            - \`object\`: With format \`{ datum: string }\` to get the size from a specific datum property
            
            Examples:
            \`\`\`
            // Using a fixed array of sizes
            sizes={[100, 200, 150]} 
            
            // Using a property from the datum
            sizes={{ datum: 'size' }}
            
            // Using a custom function
            sizes={(datum) => datum.value * 2}
            \`\`\`
        `,
        type: 'Function | number[] | { datum: string }',
        required: false,
        defaultValue: defaults.sizes,
        flavors: ['svg'],
    },
    {
        key: 'fillOpacity',
        group: 'Style',
        help: 'Part background opacity.',
        required: false,
        defaultValue: defaults.fillOpacity,
        type: 'number',
        flavors: ['svg'],
        control: { type: 'opacity' },
    },
    {
        key: 'borderWidth',
        group: 'Style',
        help: 'Width of part border.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        flavors: ['svg'],
        control: { type: 'lineWidth' },
    },
    {
        key: 'borderColor',
        group: 'Style',
        help: 'Method to compute border color.',
        description: `
            how to compute border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.borderColor,
        flavors: ['svg'],
        control: { type: 'inheritedColor' },
    },
    {
        key: 'borderOpacity',
        group: 'Style',
        help: 'Part border opacity.',
        required: false,
        defaultValue: defaults.borderOpacity,
        type: 'number',
        flavors: ['svg'],
        control: { type: 'opacity' },
    },
    {
        key: 'enableLabel',
        group: 'Labels',
        help: `
            Enable/disable labels. Use styles from
            theme.labels.text.
        `,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLabel,
        flavors: ['svg'],
        control: { type: 'switch' },
    },
    {
        key: 'labelColor',
        group: 'Labels',
        help: 'Method to compute label color.',
        description: `
            how to compute label color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.labelColor,
        flavors: ['svg'],
        control: { type: 'inheritedColor' },
    },
    {
        key: 'enableBeforeSeparators',
        group: 'Separators',
        help: `
            Enable/disable before separators.
            Separators inherit styles from theme.grid.line.
        `,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableBeforeSeparators,
        flavors: ['svg'],
        control: { type: 'switch' },
    },
    {
        key: 'beforeSeparatorLength',
        group: 'Separators',
        help: `
            Length of the before separator lines. You should add margin
            for them to be visible if the value is greater than 0.
        `,
        required: false,
        defaultValue: defaults.beforeSeparatorLength,
        type: 'number',
        flavors: ['svg'],
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'beforeSeparatorOffset',
        group: 'Separators',
        help: `
            Offset from the parts for the before separator lines.
            You should add margin for them to be visible
            if the value is greater than 0.
        `,
        required: false,
        defaultValue: defaults.beforeSeparatorOffset,
        type: 'number',
        flavors: ['svg'],
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'enableAfterSeparators',
        group: 'Separators',
        help: `
            Enable/disable after separators.
            Separators inherit styles from theme.grid.line.
        `,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableAfterSeparators,
        flavors: ['svg'],
        control: { type: 'switch' },
    },
    {
        key: 'afterSeparatorLength',
        group: 'Separators',
        help: `
            Length of the after separator lines. You should add margin
            for them to be visible if the value is greater than 0.
        `,
        required: false,
        defaultValue: defaults.afterSeparatorLength,
        type: 'number',
        flavors: ['svg'],
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'afterSeparatorOffset',
        group: 'Separators',
        help: `
            Offset from the parts for the after separator lines.
            You should add margin for them to be visible
            if the value is greater than 0.
        `,
        required: false,
        defaultValue: defaults.afterSeparatorOffset,
        type: 'number',
        flavors: ['svg'],
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer must be a function.
            
            The layer function which will receive the chart's
            context & computed data and must return a valid SVG element.
        `,
        required: false,
        type: 'Array<string | Function>',
        flavors: ['svg'],
        defaultValue: defaults.layers,
    },
    isInteractive({
        flavors: ['svg'],
        defaultValue: defaults.isInteractive,
    }),
    {
        key: 'currentPartSizeExtension',
        group: 'Interactivity',
        help: `
            Expand part size by this amount of pixels on each side
            when it's active 
        `,
        required: false,
        defaultValue: defaults.currentPartSizeExtension,
        type: 'number',
        flavors: ['svg'],
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'currentBorderWidth',
        group: 'Interactivity',
        help: `Override default border width when a part is active.`,
        required: false,
        type: 'number',
        flavors: ['svg'],
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'onMouseEnter',
        group: 'Interactivity',
        help: 'onMouseEnter handler.',
        type: '(part, event) => void',
        required: false,
        flavors: ['svg'],
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        help: 'onMouseMove handler.',
        type: '(part, event) => void',
        required: false,
        flavors: ['svg'],
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        help: 'onMouseLeave handler.',
        type: '(part, event) => void',
        required: false,
        flavors: ['svg'],
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        help: 'onClick handler.',
        type: '(part, event) => void',
        required: false,
        flavors: ['svg'],
    },
    ...motionProperties(['svg'], defaults),
]

export const groups = groupProperties(props)
