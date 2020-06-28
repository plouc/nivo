/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { FunnelDefaultProps as defaults } from '@nivo/funnel'
import { themeProperty, groupProperties, motionProperties } from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        type: 'Array<Datum>',
        group: 'Base',
        help: 'Chart data.',
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            Array<{
                id:    string | number
                label: string
                value: number
            }>
            \`\`\`
        `,
        required: true,
    },
    {
        key: 'margin',
        group: 'Base',
        type: 'object',
        help: 'Chart margin.',
        controlType: 'margin',
    },
    {
        key: 'direction',
        help: `Direction of the chart.`,
        type: 'string',
        required: false,
        defaultValue: defaults.direction,
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
        key: 'interpolation',
        group: 'Base',
        type: 'string',
        help: `Part shape interpolation.`,
        required: false,
        defaultValue: defaults.interpolation,
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
        help: 'Spacing between parts',
        type: 'number',
        required: false,
        defaultValue: defaults.spacing,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 30,
            unit: 'px',
        },
    },
    {
        key: 'shapeBlending',
        help: 'Blend shapes.',
        type: 'number',
        required: false,
        defaultValue: defaults.shapeBlending,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.01,
        },
    },
    {
        key: 'valueFormat',
        help: `
            Value format supporting d3-format notation, this formatted value
            will then be used for labels and tooltips.
        `,
        type: 'string | Function',
        required: false,
        controlType: 'valueFormat',
        group: 'Base',
    },
    themeProperty,
    {
        key: 'colors',
        help: 'Defines how to compute parts color.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'ordinalColors',
        group: 'Style',
    },
    {
        key: 'fillOpacity',
        help: 'Part background opacity.',
        required: false,
        defaultValue: defaults.fillOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Width of part border.',
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
    {
        key: 'borderOpacity',
        help: 'Part border opacity.',
        required: false,
        defaultValue: defaults.borderOpacity,
        type: 'number',
        controlType: 'opacity',
        group: 'Style',
    },
    {
        key: 'enableLabel',
        help: `
            Enable/disable labels. Use styles from
            theme.labels.text.
        `,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableLabel,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'labelColor',
        help: 'Method to compute label color.',
        description: `
            how to compute label color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.labelColor,
        controlType: 'inheritedColor',
        group: 'Labels',
    },
    {
        key: 'enableBeforeSeparators',
        help: `
            Enable/disable before separators.
            Separators inherit styles from theme.grid.line.
        `,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableBeforeSeparators,
        controlType: 'switch',
        group: 'Separators',
    },
    {
        key: 'beforeSeparatorLength',
        help: `
            Length of the before separator lines. You should add margin
            for them to be visible if the value is greater than 0.
        `,
        required: false,
        defaultValue: defaults.beforeSeparatorLength,
        type: 'number',
        controlType: 'range',
        group: 'Separators',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'beforeSeparatorOffset',
        help: `
            Offset from the parts for the before separator lines.
            You should add margin for them to be visible
            if the value is greater than 0.
        `,
        required: false,
        defaultValue: defaults.beforeSeparatorOffset,
        type: 'number',
        controlType: 'range',
        group: 'Separators',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'enableAfterSeparators',
        help: `
            Enable/disable after separators.
            Separators inherit styles from theme.grid.line.
        `,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableAfterSeparators,
        controlType: 'switch',
        group: 'Separators',
    },
    {
        key: 'afterSeparatorLength',
        help: `
            Length of the after separator lines. You should add margin
            for them to be visible if the value is greater than 0.
        `,
        required: false,
        defaultValue: defaults.afterSeparatorLength,
        type: 'number',
        controlType: 'range',
        group: 'Separators',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'afterSeparatorOffset',
        help: `
            Offset from the parts for the after separator lines.
            You should add margin for them to be visible
            if the value is greater than 0.
        `,
        required: false,
        defaultValue: defaults.afterSeparatorOffset,
        type: 'number',
        controlType: 'range',
        group: 'Separators',
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
        defaultValue: defaults.layers,
    },
    {
        key: 'isInteractive',
        group: 'Interactivity',
        type: 'boolean',
        help: 'Enable/disable interactivity.',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
    },
    {
        key: 'currentPartSizeExtension',
        help: `
            Expand part size by this amount of pixels on each side
            when it's active 
        `,
        required: false,
        defaultValue: defaults.currentPartSizeExtension,
        type: 'number',
        controlType: 'range',
        group: 'Interactivity',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'currentBorderWidth',
        help: `Override default border width when a part is active.`,
        required: false,
        type: 'number',
        controlType: 'range',
        group: 'Interactivity',
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
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        help: 'onMouseMove handler.',
        type: '(part, event) => void',
        required: false,
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        help: 'onMouseLeave handler.',
        type: '(part, event) => void',
        required: false,
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        help: 'onClick handler.',
        type: '(part, event) => void',
        required: false,
    },
    ...motionProperties(['svg'], defaults, 'react-spring'),
]

export const groups = groupProperties(props)
