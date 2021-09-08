import { svgDefaultProps } from '@nivo/radial-bar'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        type: 'RadialBarSerie[]',
        required: true,
        help: 'Chart data.',
        description: `
            For example, given this config:
            \`\`\`
            [
                { language: 'javascript', john: 12, sarah: 32, bob: 27 },
                { language: 'golang', john: 25, sarah: 15, bob: 3 },
                { language: 'python', john: 5, sarah: 22, bob: 31 },
                { language: 'java', john: 19, sarah: 17, bob: 9 }
            ]
            keys: ['john', 'sarah', 'bob']
            indexBy: 'language'
            \`\`\`
            We'll have a radar chart representing programing
            skills for each user by language
            (3 layers and 4 dimensions).
        `,
        flavors: ['svg'],
    },
    {
        key: 'valueFormat',
        group: 'Base',
        type: 'string | (value: number) => string',
        required: false,
        help: 'Optional formatter for values.',
        description: `
            The formatted value can then be used for labels & tooltips.

            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        flavors: ['svg'],
        controlType: 'valueFormat',
    },
    {
        key: 'width',
        group: 'Base',
        type: 'number',
        required: true,
        help: 'Chart width.',
        description: `
            not required if using
            \`<ResponsiveRadar/>\`.
        `,
        flavors: ['svg', 'api'],
        enableControlForFlavors: ['api'],
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
        group: 'Base',
        type: 'number',
        required: true,
        help: 'Chart height.',
        description: `
            not required if using
            \`<ResponsiveRadar/>\`.
        `,
        flavors: ['svg', 'api'],
        enableControlForFlavors: ['api'],
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'margin',
        group: 'Base',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        flavors: ['svg'],
        controlType: 'margin',
    },
    {
        key: 'startAngle',
        group: 'Base',
        type: 'number',
        required: false,
        help: 'Start angle (in degrees).',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.startAngle,
        controlType: 'angle',
        controlOptions: {
            unit: '°',
            min: -180,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'endAngle',
        group: 'Base',
        type: 'number',
        required: false,
        help: 'End angle (in degrees).',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.endAngle,
        controlType: 'angle',
        controlOptions: {
            unit: '°',
            min: -360,
            max: 360,
            step: 5,
        },
    },
    themeProperty(['svg']),
    {
        key: 'colors',
        group: 'Style',
        type: 'string | Function | string[]',
        required: false,
        help: 'Defines how to compute colors.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.colors,
        controlType: 'ordinalColors',
    },
    {
        key: 'cornerRadius',
        group: 'Style',
        type: 'number',
        required: false,
        help: 'Rounded corners.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.cornerRadius,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer should be a component.
            
            The layer function which will receive the chart's
            context & computed data and must return a valid SVG element.
        `,
        required: false,
        type: '(RadarLayerId | FunctionComponent<RadarCustomLayerProps>)[]',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.layers,
    },
    {
        key: 'isInteractive',
        group: 'Interactivity',
        type: 'boolean',
        required: false,
        help: 'Enable/disable interactivity.',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.isInteractive,
        controlType: 'switch',
    },
    {
        key: 'sliceTooltip',
        group: 'Interactivity',
        type: 'FunctionComponent<RadarSliceTooltipProps>',
        required: false,
        help: 'Override default slice tooltip.',
        flavors: ['svg'],
    },
    ...motionProperties(['svg'], svgDefaultProps, 'react-spring'),
]

export const groups = groupProperties(props)
