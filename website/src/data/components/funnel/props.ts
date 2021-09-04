import { svgDefaultProps as defaults } from '@nivo/funnel'
import { themeProperty, groupProperties, motionProperties } from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

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
    {
        key: 'margin',
        group: 'Base',
        type: 'object',
        required: false,
        help: 'Chart margin.',
        flavors: ['svg'],
        controlType: 'margin',
    },
    {
        key: 'direction',
        group: 'Base',
        help: `Direction of the chart.`,
        type: 'string',
        required: false,
        defaultValue: defaults.direction,
        flavors: ['svg'],
        controlType: 'radio',
        controlOptions: {
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
        controlType: 'radio',
        controlOptions: {
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
        controlType: 'range',
        controlOptions: {
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
        controlType: 'range',
        controlOptions: {
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
        controlType: 'valueFormat',
    },
    themeProperty(['svg']),
    {
        key: 'colors',
        group: 'Style',
        help: 'Defines how to compute parts color.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        flavors: ['svg'],
        controlType: 'ordinalColors',
    },
    {
        key: 'fillOpacity',
        group: 'Style',
        help: 'Part background opacity.',
        required: false,
        defaultValue: defaults.fillOpacity,
        type: 'number',
        flavors: ['svg'],
        controlType: 'opacity',
    },
    {
        key: 'borderWidth',
        group: 'Style',
        help: 'Width of part border.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        flavors: ['svg'],
        controlType: 'lineWidth',
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
        controlType: 'inheritedColor',
    },
    {
        key: 'borderOpacity',
        group: 'Style',
        help: 'Part border opacity.',
        required: false,
        defaultValue: defaults.borderOpacity,
        type: 'number',
        flavors: ['svg'],
        controlType: 'opacity',
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
        controlType: 'switch',
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
        controlType: 'inheritedColor',
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
        controlType: 'switch',
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
        controlType: 'range',
        controlOptions: {
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
        controlType: 'range',
        controlOptions: {
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
        controlType: 'switch',
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
        controlType: 'range',
        controlOptions: {
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
        controlType: 'range',
        controlOptions: {
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
    {
        key: 'isInteractive',
        group: 'Interactivity',
        type: 'boolean',
        help: 'Enable/disable interactivity.',
        required: false,
        defaultValue: defaults.isInteractive,
        flavors: ['svg'],
        controlType: 'switch',
    },
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
        controlType: 'range',
        controlOptions: {
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
        controlType: 'range',
        controlOptions: {
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
    ...motionProperties(['svg'], defaults, 'react-spring'),
]

export const groups = groupProperties(props)
