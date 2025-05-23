import { commonDefaultProps, svgDefaultProps } from '@nivo/bullet'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'
import { axes, chartDimensions, chartRef, isInteractive } from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        type: 'readonly BulletDatum[]',
        help: 'Chart data.',
        flavors: allFlavors,
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            {
                id:        string
                value:     number
                target:    number[]
                range:     {
                    id:    string
                    value: number
                }[]
                // Overrides the global baseline.
                baseline?: number
            }[]
            \`\`\`
        `,
        required: true,
    },
    {
        key: 'scale',
        group: 'Base',
        type: 'LinearScaleSpec',
        help: `
            Scale configuration. Supports [linear](self:/guides/scales/#linear-scale),
            and [symlog](self:/guides/scales/#symlog-scale) scales.

            Please refer to our [guide](self:/guides/scales/)
            to help you pick the right scale for your data.
        `,
        defaultValue: svgDefaultProps.scale,
        flavors: allFlavors,
        required: false,
        control: {
            type: 'scale',
            allowedTypes: ['linear', 'symlog'],
        },
    },
    {
        key: 'baseline',
        group: 'Base',
        help: 'Baseline value.',
        type: `number`,
        required: false,
        defaultValue: commonDefaultProps.baseline,
        flavors: allFlavors,
        description: `
            Sets the baseline value, which is used to compute
            the range values and can be useful when creating diverging
            bullet charts for example if the diverging point is non-zero.
            
            The value bars will start from this value.
        `,
        control: {
            type: 'range',
            min: -100,
            max: 100,
        },
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
        flavors: allFlavors,
        type: 'string | ((value: number) => string)',
        control: { type: 'valueFormat' },
    },
    {
        key: 'layout',
        group: 'Base',
        help: `How to display items.`,
        flavors: ['svg'],
        type: 'string',
        required: false,
        defaultValue: commonDefaultProps.layout,
        control: {
            type: 'radio',
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'spacing',
        help: 'define spacing between items.',
        type: 'number',
        flavors: ['svg'],
        required: false,
        defaultValue: commonDefaultProps.spacing,
        group: 'Base',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    {
        key: 'valueSize',
        help: 'Size of the value bar, relative to the bandWidth (0~1).',
        type: 'number',
        required: false,
        flavors: ['svg'],
        defaultValue: commonDefaultProps.valueSize,
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'valuePadding',
        help: 'Value bar padding on the axis matching the current `layout`.',
        type: 'number',
        required: false,
        flavors: ['svg'],
        defaultValue: commonDefaultProps.valuePadding,
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 32,
        },
    },
    {
        key: 'targetSize',
        help: 'Size of the target indicator, relative to the bandWidth (0~1).',
        type: 'number',
        required: false,
        flavors: ['svg'],
        defaultValue: commonDefaultProps.targetSize,
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'rangeSize',
        help: 'Size of the range, relative to the bandWidth (0~1).',
        type: 'number',
        required: false,
        flavors: ['svg'],
        defaultValue: commonDefaultProps.rangeSize,
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'overrides',
        help: 'Overrides properties depending on the datum.',
        type: 'Record<string, Props> | ((d: BulletDatum) => Props)',
        required: false,
        flavors: allFlavors,
        group: 'Base',
        description: `
            The following properties can be overridden: 
            
            - \`valueColor\`
            - \`targetColor\`
            - \`rangeColors\`
            - \`axisBefore\`
            - \`axisAfter\`
            
            You can either use an object, where the keys are
            the datum \`id\`, and the values are the properties
            to override, or a function that receives the datum
            and returns the properties to override.
        `,
    },
    chartRef(['svg']),
    ...chartDimensions(allFlavors),
    themeProperty(['svg']),
    // {
    //     key: 'rangeBorderColor',
    //     flavors: ['svg'],
    //     group: 'Style',
    //     help: 'Method to compute range border color.',
    //     description: `
    //         how to compute range border color,
    //         [see dedicated documentation](self:/guides/colors).
    //     `,
    //     type: 'string | object | Function',
    //     required: false,
    //     defaultValue: commonDefaultProps.rangeBorderColor,
    //     control: { type: 'inheritedColor' },
    // },
    // {
    //     key: 'rangeColors',
    //     help: 'Ranges colors',
    //     description: `
    //         Defines colors for ranges,
    //         you can either use categorical colors:
    //         \`greens\` or sequential form: \`seq:green\`.
    //     `,
    //     type: 'string | Function | string[]',
    //     flavors: ['svg'],
    //     required: false,
    //     defaultValue: commonDefaultProps.rangeColors,
    //     group: 'Style',
    //     control: {
    //         type: 'bullet_colors',
    //     },
    // },
    {
        key: 'valueBorderRadius',
        help: 'Value bar border radius.',
        type: 'BorderRadius',
        flavors: ['svg'],
        required: false,
        defaultValue: commonDefaultProps.valueBorderRadius,
        group: 'Style',
        control: {
            type: 'borderRadius',
        },
    },
    {
        key: 'valueBorderWidth',
        flavors: ['svg'],
        group: 'Style',
        help: 'Value bar border width.',
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.valueBorderWidth,
        control: { type: 'lineWidth', step: 0.5 },
    },
    {
        key: 'valueBorderColor',
        flavors: ['svg'],
        group: 'Style',
        help: 'Method to compute the value bar border [color](self:/guides/colors).',
        type: 'string | object | Function',
        required: false,
        defaultValue: commonDefaultProps.valueBorderColor,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'targetBorderRadius',
        help: 'Target indicator border radius.',
        type: 'BorderRadius',
        flavors: ['svg'],
        required: false,
        defaultValue: commonDefaultProps.targetBorderRadius,
        group: 'Style',
        control: {
            type: 'borderRadius',
        },
    },
    {
        key: 'rangeBorderRadius',
        help: 'Range bars border radius.',
        type: 'BorderRadius',
        flavors: ['svg'],
        required: false,
        defaultValue: commonDefaultProps.rangeBorderRadius,
        group: 'Style',
        control: {
            type: 'borderRadius',
        },
    },
    {
        key: 'rangeBorderWidth',
        flavors: ['svg'],
        group: 'Style',
        help: 'Range bars border width.',
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.rangeBorderWidth,
        control: { type: 'lineWidth', step: 0.5 },
    },
    {
        key: 'rangeBorderColor',
        flavors: ['svg'],
        group: 'Style',
        help: 'Method to compute the range bars border [color](self:/guides/colors).',
        type: 'string | object | Function',
        required: false,
        defaultValue: commonDefaultProps.rangeBorderColor,
        control: { type: 'inheritedColor' },
    },
    // {
    //     key: 'measureColors',
    //     help: 'Measures colors.',
    //     description: `
    //         Defines colors for measures,
    //         you can either use categorical colors:
    //         \`greens\` or sequential form: \`seq:green\`.
    //     `,
    //     type: 'string | Function | string[]',
    //     required: false,
    //     flavors: ['svg'],
    //     defaultValue: commonDefaultProps.measureColors,
    //     group: 'Style',
    //     control: {
    //         type: 'bullet_colors',
    //     },
    // },
    // {
    //     key: 'markerColors',
    //     flavors: ['svg'],
    //     help: 'Markers colors.',
    //     description: `
    //         Defines colors for markers,
    //         you can either use categorical colors:
    //         \`greens\` or sequential form: \`seq:green\`.
    //     `,
    //     type: 'string | Function| string[]',
    //     required: false,
    //     defaultValue: commonDefaultProps.markerColors,
    //     group: 'Style',
    //     control: {
    //         type: 'bullet_colors',
    //     },
    // },
    {
        key: 'titleAnchor',
        help: 'Defines where titles are anchored from the bullet rectangle.',
        flavors: allFlavors,
        type: 'BoxAnchor',
        required: false,
        defaultValue: commonDefaultProps.titleAnchor,
        group: 'Titles & Labels',
        control: {
            type: 'boxAnchor',
        },
    },
    {
        key: 'titleAlign',
        type: `TextAlign | 'auto'`,
        required: false,
        defaultValue: commonDefaultProps.titleAlign,
        help: 'Title alignment, `auto` assumes no rotation.',
        flavors: allFlavors,
        group: 'Titles & Labels',
        control: {
            type: 'radio',
            columns: 4,
            choices: [
                { label: 'auto', value: 'auto' },
                { label: 'start', value: 'start' },
                { label: 'center', value: 'center' },
                { label: 'end', value: 'end' },
            ],
        },
    },
    {
        key: 'titleBaseline',
        type: `TextBaseline | 'auto'`,
        required: false,
        defaultValue: commonDefaultProps.titleBaseline,
        help: 'Title baseline, `auto` assumes no rotation.',
        flavors: allFlavors,
        group: 'Titles & Labels',
        control: {
            type: 'radio',
            columns: 4,
            choices: [
                { label: 'auto', value: 'auto' },
                { label: 'top', value: 'top' },
                { label: 'center', value: 'center' },
                { label: 'bottom', value: 'bottom' },
            ],
        },
    },
    {
        key: 'titlePaddingX',
        help: 'Title outside x padding from bullet edge.',
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.titlePaddingX,
        flavors: ['svg'],
        group: 'Titles & Labels',
        control: {
            type: 'range',
            min: 0,
            max: 100,
            unit: 'px',
        },
    },
    {
        key: 'titlePaddingY',
        help: 'Title outside y padding from bullet edge.',
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.titlePaddingY,
        flavors: ['svg'],
        group: 'Titles & Labels',
        control: {
            type: 'range',
            min: 0,
            max: 100,
            unit: 'px',
        },
    },
    {
        key: 'titleOffsetX',
        help: 'Title additional x offset.',
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.titleOffsetX,
        flavors: ['svg'],
        group: 'Titles & Labels',
        control: {
            type: 'range',
            min: -100,
            max: 100,
            unit: 'px',
        },
    },
    {
        key: 'titleOffsetY',
        help: 'Title additional y offset.',
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.titleOffsetY,
        flavors: ['svg'],
        group: 'Titles & Labels',
        control: {
            type: 'range',
            min: -100,
            max: 100,
            unit: 'px',
        },
    },
    {
        key: 'titleRotation',
        help: 'Title rotation.',
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.titleRotation,
        flavors: ['svg'],
        group: 'Titles & Labels',
        control: {
            type: 'angle',
            start: 90,
            marker: 'diameter',
        },
    },
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        flavors: ['svg'],
        description: `
            You can also use this to insert extra layers, although you might
            want to first check if you could use one of these properties instead:
            
            - \`valueComponent\`
            - \`targetComponent\`
            - \`rangeComponent\`

            The custom layer will receive the chart's computed data 
            and context and must return a valid SVG element.
        `,
        required: false,
        type: 'readonly BulletLayerId[]',
        defaultValue: svgDefaultProps.layers,
    },
    {
        key: 'valueComponent',
        group: 'Customization',
        help: 'Override the default value bar component.',
        flavors: ['svg'],
        required: false,
        type: 'BulletValueComponent',
        defaultValue: `RectNodeSvg`,
    },
    {
        key: 'targetComponent',
        group: 'Customization',
        help: 'Override the default target indicator component.',
        flavors: ['svg'],
        required: false,
        type: 'BulletTargetComponent',
        defaultValue: `RectNodeSvg`,
    },
    {
        key: 'rangeComponent',
        group: 'Customization',
        help: 'Override the default range bar component.',
        flavors: ['svg'],
        required: false,
        type: 'BulletRangeComponent',
        defaultValue: `RectNodeSvg`,
    },
    ...axes({ positions: ['before', 'after'], flavors: allFlavors }),
    isInteractive({
        flavors: ['svg', 'canvas'],
        defaultValue: svgDefaultProps.isInteractive,
    }),
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
    ...motionProperties(['svg'], svgDefaultProps),
]

export const groups = groupProperties(props)
