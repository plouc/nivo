/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { BulletDefaultProps as defaults } from '@nivo/bullet'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            Array<{
                id:        {string|number}
                title?:    {ReactNode}
                subtitle?: {ReactNode}
                data: Array<{
                    ranges:   number[]
                    measures: number[]
                    markers?: number[]
                }>
            }>
            \`\`\`

            If \`title\` is \`undefined\`, \`id\` will be used for
            \`title\`.
        `,
        type: 'object[]',
        required: true,
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        group: 'Base',
        help: 'Chart width.',
        description: 'not required if using `ResponsiveBullet`.',
        type: 'number',
        required: true,
        controlType: 'range',
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
        group: 'Base',
        help: 'Chart height.',
        description: 'not required if using `ResponsiveBullet`.',
        type: 'number',
        required: true,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'layout',
        group: 'Base',
        help: `How to display items.`,
        type: 'string',
        required: false,
        defaultValue: defaults.layout,
        controlType: 'radio',
        controlOptions: {
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'reverse',
        group: 'Base',
        help: 'Reverse chart.',
        description: `
            Reverse chart, starts on top instead of bottom
            for vertical layout and right instead of left
            for horizontal one.
        `,
        type: 'boolean',
        required: false,
        defaultValue: defaults.reverse,
        controlType: 'switch',
    },
    {
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'spacing',
        help: 'define spacing between items.',
        type: 'number',
        required: false,
        defaultValue: defaults.spacing,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'measureSize',
        help: 'define size of measure related to item size, expressed as a ratio.',
        type: 'number',
        required: false,
        defaultValue: defaults.measureSize,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'markerSize',
        help: 'define size of markers related to item size, expressed as a ratio.',
        type: 'number',
        required: false,
        defaultValue: defaults.markerSize,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 2,
            step: 0.05,
        },
    },
    themeProperty,
    {
        key: 'rangeComponent',
        flavors: ['svg'],
        group: 'Style',
        help: 'Custom component for ranges.',
        type: 'Function',
        required: false,
    },
    {
        key: 'rangeColors',
        help: 'Ranges colors',
        description: `
            Defines colors for ranges,
            you can either use categorical colors:
            \`greens\` or sequential form: \`seq:green\`.
        `,
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.rangeColors,
        controlType: 'colors',
        group: 'Style',
        controlOptions: {
            includeSequential: true,
        },
    },
    {
        key: 'measureComponent',
        flavors: ['svg'],
        group: 'Style',
        help: 'Custom component for measures.',
        type: 'Function',
        required: false,
    },
    {
        key: 'measureColors',
        help: 'Measures colors.',
        description: `
            Defines colors for measures,
            you can either use categorical colors:
            \`greens\` or sequential form: \`seq:green\`.
        `,
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.measureColors,
        controlType: 'colors',
        group: 'Style',
        controlOptions: {
            includeSequential: true,
        },
    },
    {
        key: 'markerComponent',
        flavors: ['svg'],
        group: 'Style',
        help: 'Custom component for markers.',
        type: 'Function',
        required: false,
    },
    {
        key: 'markerColors',
        help: 'Markers colors.',
        description: `
            Defines colors for markers,
            you can either use categorical colors:
            \`greens\` or sequential form: \`seq:green\`.
        `,
        type: 'string | Function| string[]',
        required: false,
        defaultValue: defaults.markerColors,
        controlType: 'colors',
        group: 'Style',
        controlOptions: {
            includeSequential: true,
        },
    },
    {
        key: 'axisPosition',
        help: `Where to put axis.`,
        type: 'string',
        required: false,
        defaultValue: defaults.axisPosition,
        controlType: 'radio',
        group: 'Axes',
        controlOptions: {
            choices: [
                { label: 'before', value: 'before' },
                { label: 'after', value: 'after' },
            ],
        },
    },
    {
        key: 'titlePosition',
        help: `Where to put title.`,
        type: 'string',
        required: false,
        defaultValue: defaults.titlePosition,
        controlType: 'radio',
        group: 'Title',
        controlOptions: {
            choices: [
                { label: 'before', value: 'before' },
                { label: 'after', value: 'after' },
            ],
        },
    },
    {
        key: 'titleAlign',
        help: `title alignment.`,
        type: 'string',
        required: false,
        defaultValue: defaults.titleAlign,
        controlType: 'choices',
        group: 'Title',
        controlOptions: {
            choices: [
                { label: 'start', value: 'start' },
                { label: 'middle', value: 'middle' },
                { label: 'end', value: 'end' },
            ],
        },
    },
    {
        key: 'titleOffsetX',
        help: 'title x offset from bullet edge.',
        type: 'number',
        required: false,
        defaultValue: defaults.titleOffset,
        controlType: 'range',
        group: 'Title',
        controlOptions: {
            min: -100,
            max: 100,
            unit: 'px',
        },
    },
    {
        key: 'titleOffsetY',
        help: 'title y offset from bullet edge.',
        type: 'number',
        required: false,
        defaultValue: defaults.titleOffset,
        controlType: 'range',
        group: 'Title',
        controlOptions: {
            min: -100,
            max: 100,
            unit: 'px',
        },
    },
    {
        key: 'titleRotation',
        help: 'title rotation.',
        type: 'number',
        required: false,
        defaultValue: defaults.titleRotation,
        controlType: 'angle',
        group: 'Title',
        controlOptions: {
            start: 90,
            min: -360,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'onRangeClick',
        flavors: ['svg'],
        type: '(range, event) => void',
        group: 'Interactivity',
        required: false,
        help: 'onClick handler for ranges.',
        description: `
            onClick handler for ranges, will receive range
            data as first argument & event as second one.
            
            The data has the following shape:
            \`\`\`
            {
                id:    string,
                v0:    number,
                v1:    number,
                index: number,
                color: string,
            }
            \`\`\`
            
            \`v1\` is the value of the range while
            \`v0\` is the value of previous range.
        `,
    },
    {
        key: 'onMeasureClick',
        flavors: ['svg'],
        type: '(measure, event) => void',
        group: 'Interactivity',
        required: false,
        help: 'onClick handler for measures.',
        description: `
            onClick handler for measures, will receive measure
            data as first argument & event as second one.
            
            The data has the following shape:
            \`\`\`
            {
                id:    string,
                v0:    number,
                v1:    number,
                index: number,
                color: string,
            }
            \`\`\`

            \`v1\` is the value of the measure while
            \`v0\` is the value of previous measure.
        `,
    },
    {
        key: 'onMarkerClick',
        flavors: ['svg'],
        type: '(marker, event) => void',
        group: 'Interactivity',
        required: false,
        help: 'onClick handler for markers.',
        description: `
            onClick handler for markers, will receive marker
            data as first argument & event as second one.

            The data has the following shape:
            \`\`\`
            {
                id:    string,
                value: number,
                index: number,
                color: string,
            }
            \`\`\`
        `,
    },
    ...motionProperties(['svg'], defaults),
]

export const groups = groupProperties(props)
