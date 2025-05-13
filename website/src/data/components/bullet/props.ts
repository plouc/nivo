import { defaultProps } from '@nivo/bullet'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'
import { chartDimensions, chartRef } from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        flavors: ['svg'],
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
        key: 'minValue',
        help: 'Minimum value.',
        flavors: ['svg'],
        description: `
            Minimum value, if 'auto',
            will use min value from
            the provided data.
        `,
        required: false,
        defaultValue: defaultProps.minValue,
        type: `number | 'auto'`,
        group: 'Base',
        control: {
            type: 'switchableRange',
            disabledValue: 'auto',
            defaultValue: 0,
            min: 0,
            max: 10,
        },
    },
    {
        key: 'maxValue',
        help: 'Maximum value.',
        flavors: ['svg'],
        description: `
            Maximum value, if 'auto',
            will use max value from
            the provided data.
        `,
        required: false,
        defaultValue: defaultProps.maxValue,
        type: `number | 'auto'`,
        group: 'Base',
        control: {
            type: 'switchableRange',
            disabledValue: 'auto',
            defaultValue: 100,
            min: 50,
            max: 100,
        },
    },
    ...chartDimensions(allFlavors),
    {
        key: 'layout',
        group: 'Base',
        help: `How to display items.`,
        flavors: ['svg'],
        type: 'string',
        required: false,
        defaultValue: defaultProps.layout,
        control: {
            type: 'radio',
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
        flavors: ['svg'],
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.reverse,
        control: { type: 'switch' },
    },
    {
        key: 'spacing',
        help: 'define spacing between items.',
        type: 'number',
        flavors: ['svg'],
        required: false,
        defaultValue: defaultProps.spacing,
        group: 'Base',
        control: {
            type: 'range',
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
        flavors: ['svg'],
        defaultValue: defaultProps.measureSize,
        group: 'Base',
        control: {
            type: 'range',
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
        flavors: ['svg'],
        defaultValue: defaultProps.markerSize,
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 2,
            step: 0.05,
        },
    },
    chartRef(allFlavors),
    themeProperty(['svg']),
    {
        key: 'rangeBorderColor',
        flavors: ['svg'],
        group: 'Style',
        help: 'Method to compute range border color.',
        description: `
            how to compute range border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.rangeBorderColor,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'rangeBorderWidth',
        flavors: ['svg'],
        group: 'Style',
        help: 'Width of range border.',
        type: 'number',
        required: false,
        defaultValue: defaultProps.rangeBorderWidth,
        control: { type: 'lineWidth' },
    },
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
        flavors: ['svg'],
        required: false,
        defaultValue: defaultProps.rangeColors,
        group: 'Style',
        control: {
            type: 'bullet_colors',
        },
    },
    {
        key: 'measureBorderColor',
        flavors: ['svg'],
        group: 'Style',
        help: 'Method to compute measure border color.',
        description: `
            how to compute measure border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.measureBorderColor,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'measureBorderWidth',
        flavors: ['svg'],
        group: 'Style',
        help: 'Width of measure border.',
        type: 'number',
        required: false,
        defaultValue: defaultProps.measureBorderWidth,
        control: { type: 'lineWidth' },
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
        flavors: ['svg'],
        defaultValue: defaultProps.measureColors,
        group: 'Style',
        control: {
            type: 'bullet_colors',
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
        flavors: ['svg'],
        help: 'Markers colors.',
        description: `
            Defines colors for markers,
            you can either use categorical colors:
            \`greens\` or sequential form: \`seq:green\`.
        `,
        type: 'string | Function| string[]',
        required: false,
        defaultValue: defaultProps.markerColors,
        group: 'Style',
        control: {
            type: 'bullet_colors',
        },
    },
    {
        key: 'axisPosition',
        help: `Where to put axis.`,
        type: 'string',
        required: false,
        defaultValue: defaultProps.axisPosition,
        flavors: ['svg'],
        group: 'Axes',
        control: {
            type: 'radio',
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
        defaultValue: defaultProps.titlePosition,
        flavors: ['svg'],
        group: 'Title',
        control: {
            type: 'radio',
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
        defaultValue: defaultProps.titleAlign,
        flavors: ['svg'],
        group: 'Title',
        control: {
            type: 'choices',
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
        defaultValue: defaultProps.titleOffsetX,
        flavors: ['svg'],
        group: 'Title',
        control: {
            type: 'range',
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
        defaultValue: defaultProps.titleOffsetY,
        flavors: ['svg'],
        group: 'Title',
        control: {
            type: 'range',
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
        defaultValue: defaultProps.titleRotation,
        flavors: ['svg'],
        group: 'Title',
        control: {
            type: 'angle',
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
    ...motionProperties(['svg'], defaultProps),
]

export const groups = groupProperties(props)
