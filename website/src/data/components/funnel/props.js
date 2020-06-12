/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { FunnelDefaultProps as defaults } from '@nivo/funnel'
import { groupProperties } from '../../../lib/componentProperties'

const props = [
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
        help: 'Spacing between parts, expressed as a ratio depending on total size.',
        type: 'number',
        required: false,
        defaultValue: defaults.spacing,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.005,
        },
    },
    {
        key: 'shapeContinuity',
        help: 'Shape continuity.',
        type: 'number',
        required: false,
        defaultValue: defaults.shapeContinuity,
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
        help: 'Value format supporting d3-format notation.',
        type: 'string | Function',
        required: false,
        controlType: 'valueFormat',
        group: 'Base',
    },
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
        key: 'beforeSeparatorsLength',
        help: `
            Length of the before separator lines. You should add margin
            for them to be visible if the value is greater than 0.
        `,
        required: false,
        defaultValue: defaults.beforeSeparatorsLength,
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
        key: 'beforeSeparatorsOffset',
        help: `
            Offset from the parts for the before separator lines.
            You should add margin for them to be visible
            if the value is greater than 0.
        `,
        required: false,
        defaultValue: defaults.beforeSeparatorsOffset,
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
        key: 'afterSeparatorsLength',
        help: `
            Length of the after separator lines. You should add margin
            for them to be visible if the value is greater than 0.
        `,
        required: false,
        defaultValue: defaults.afterSeparatorsLength,
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
        key: 'afterSeparatorsOffset',
        help: `
            Offset from the parts for the after separator lines.
            You should add margin for them to be visible
            if the value is greater than 0.
        `,
        required: false,
        defaultValue: defaults.afterSeparatorsOffset,
        type: 'number',
        controlType: 'range',
        group: 'Separators',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
]

export const groups = groupProperties(props)
