import { defaultProps } from '@nivo/bullet'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

const props: ChartProperty[] = [
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
        key: 'minValue',
        help: 'Minimum value.',
        description: `
            Minimum value, if 'auto',
            will use min value from
            the provided data.
        `,
        required: false,
        defaultValue: defaultProps.minValue,
        type: `number | 'auto'`,
        controlType: 'switchableRange',
        group: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 0,
            min: 0,
            max: 10,
        },
    },
    {
        key: 'maxValue',
        help: 'Maximum value.',
        description: `
            Maximum value, if 'auto',
            will use max value from
            the provided data.
        `,
        required: false,
        defaultValue: defaultProps.maxValue,
        type: `number | 'auto'`,
        controlType: 'switchableRange',
        group: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 100,
            min: 50,
            max: 100,
        },
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
        defaultValue: defaultProps.layout,
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
        defaultValue: defaultProps.reverse,
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
        defaultValue: defaultProps.spacing,
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
        defaultValue: defaultProps.measureSize,
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
        defaultValue: defaultProps.markerSize,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 2,
            step: 0.05,
        },
    },
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
        controlType: 'inheritedColor',
        required: false,
        defaultValue: defaultProps.rangeBorderColor,
    },
    {
        key: 'rangeBorderWidth',
        flavors: ['svg'],
        group: 'Style',
        help: 'Width of range border.',
        type: 'number',
        controlType: 'lineWidth',
        required: false,
        defaultValue: defaultProps.rangeBorderWidth,
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
        required: false,
        defaultValue: defaultProps.rangeColors,
        controlType: 'colors',
        group: 'Style',
        controlOptions: {
            includeSequential: true,
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
        controlType: 'inheritedColor',
        required: false,
        defaultValue: defaultProps.measureBorderColor,
    },
    {
        key: 'measureBorderWidth',
        flavors: ['svg'],
        group: 'Style',
        help: 'Width of measure border.',
        type: 'number',
        controlType: 'lineWidth',
        required: false,
        defaultValue: defaultProps.measureBorderWidth,
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
        defaultValue: defaultProps.measureColors,
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
        defaultValue: defaultProps.markerColors,
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
        defaultValue: defaultProps.axisPosition,
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
        defaultValue: defaultProps.titlePosition,
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
        defaultValue: defaultProps.titleAlign,
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
        defaultValue: defaultProps.titleOffset,
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
        defaultValue: defaultProps.titleOffset,
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
        defaultValue: defaultProps.titleRotation,
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
    ...motionProperties(['svg'], defaultProps, 'react-spring'),
]

export const groups = groupProperties(props)
