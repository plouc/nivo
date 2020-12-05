import { defaultProps as defaults } from '@nivo/pie'
import {
    themeProperty,
    defsProperties,
    groupProperties,
    getLegendsProps,
    motionProperties,
} from '../../../lib/componentProperties'
import { defaultProps } from '@nivo/sunburst'

const props = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data, which should be immutable.',
        description: `
            Chart data, which must conform to this structure
            if using the default \`id\` and \`value\` accessors:

            \`\`\`
            Array<{
                // must be unique for the whole dataset
                id:    string | number,
                value: number
            }>
            \`\`\`

            If using a different data structure, you must make sure
            to adjust both \`id\` and \`value\`. Meaning you can provide
            a completely different data structure as long as \`id\` and \`value\`
            return the appropriate values.

            Immutability of the data is important as re-computations
            depends on it.
        `,
        type: 'object[]',
        required: true,
    },
    {
        key: 'id',
        group: 'Base',
        help: 'ID accessor which should return a unique value for the whole dataset.',
        description: `
            Define how to access the ID of each datum,
            by default, nivo will look for the \`id\` property.
        `,
        type: 'string | (datum: RawDatum): string | number',
        required: false,
        defaultValue: defaults.id,
    },
    {
        key: 'value',
        group: 'Base',
        help: 'Value accessor.',
        description: `
            Define how to access the value of each datum,
            by default, nivo will look for the \`value\` property.
        `,
        type: 'string | (datum: RawDatum): number',
        required: false,
        defaultValue: defaults.value,
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
        type: 'string | (value: number) => string | number',
        controlType: 'valueFormat',
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using
            \`<ResponsivePie/>\`.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
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
        help: 'Chart height.',
        description: `
            not required if using
            \`<ResponsivePie/>\`.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'pixelRatio',
        flavors: ['canvas'],
        help: `Adjust pixel ratio, useful for HiDPI screens.`,
        required: false,
        defaultValue: 'Depends on device',
        type: `number`,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 1,
            max: 2,
        },
    },
    {
        key: 'startAngle',
        help: 'Start angle (in degrees), useful to make gauges for example.',
        type: 'number',
        required: false,
        defaultValue: defaults.startAngle,
        controlType: 'angle',
        group: 'Base',
        controlOptions: {
            unit: '°',
            min: -180,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'endAngle',
        help: 'End angle (in degrees), useful to make gauges for example.',
        type: 'number',
        required: false,
        defaultValue: defaults.endAngle,
        controlType: 'angle',
        group: 'Base',
        controlOptions: {
            unit: '°',
            min: -360,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'fit',
        help: `If 'true', pie will be omptimized to occupy more space when using partial pie.`,
        type: 'boolean',
        required: false,
        defaultValue: defaults.fit,
        controlType: 'switch',
        group: 'Base',
    },
    {
        key: 'innerRadius',
        help: `Donut chart if greater than 0. Value should be between 0~1 as it's a ratio from original radius.`,
        type: 'number',
        required: false,
        defaultValue: defaults.innerRadius,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 0.95,
            step: 0.05,
        },
    },
    {
        key: 'padAngle',
        help: 'Padding between each pie slice.',
        type: 'number',
        required: false,
        defaultValue: defaults.padAngle,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'cornerRadius',
        help: 'Rounded slices.',
        type: 'number',
        required: false,
        defaultValue: defaults.cornerRadius,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'sortByValue',
        help: `If 'true', arcs will be ordered according to their associated value.`,
        type: 'boolean',
        required: false,
        defaultValue: defaults.sortByValue,
        controlType: 'switch',
        group: 'Base',
    },
    {
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    themeProperty,
    {
        key: 'colors',
        help: 'Defines color range.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'ordinalColors',
        group: 'Style',
    },
    ...defsProperties('Style', ['svg', 'api']),
    {
        key: 'showcase pattern usage',
        flavors: ['svg'],
        help: 'Patterns.',
        description: `
            You can use \`defs\` and \`fill\` properties
            to use patterns, see
            [dedicated guide](self:/guides/patterns)
            for further information.
        `,
        type: 'boolean',
        controlType: 'switch',
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Slices border width.',
        type: 'number',
        required: false,
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.borderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    {
        key: 'enableRadialLabels',
        help: 'Enable/disable radial labels.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableRadialLabels,
        controlType: 'switch',
        group: 'Radial labels',
    },
    {
        key: 'radialLabel',
        help: 'Radial label',
        description: `
            Defines how to get label text,
            can be a string (used to access current node data property)
            or a function which will receive the actual node data.
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaults.radialLabel,
        controlType: 'choices',
        group: 'Radial labels',
        controlOptions: {
            choices: ['id', 'value', `d => \`\${d.id} (\${d.value})\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'radialLabelsSkipAngle',
        help: `Skip label if corresponding slice's angle is lower than provided value.`,
        type: 'number',
        required: false,
        defaultValue: defaults.radialLabelsSkipAngle,
        controlType: 'range',
        group: 'Radial labels',
        controlOptions: {
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'radialLabelsLinkOffset',
        help: `Link offset from pie outer radius, useful to have links overlapping pie slices.`,
        type: 'number',
        required: false,
        defaultValue: defaults.radialLabelsLinkOffset,
        controlType: 'range',
        group: 'Radial labels',
        controlOptions: {
            unit: 'px',
            min: -24,
            max: 24,
            step: 1,
        },
    },
    {
        key: 'radialLabelsLinkDiagonalLength',
        help: `Link diagonal length.`,
        type: 'number',
        required: false,
        defaultValue: defaults.radialLabelsLinkDiagonalLength,
        controlType: 'range',
        group: 'Radial labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
            step: 1,
        },
    },
    {
        key: 'radialLabelsLinkHorizontalLength',
        help: `Links horizontal length.`,
        type: 'number',
        required: false,
        defaultValue: defaults.radialLabelsLinkHorizontalLength,
        controlType: 'range',
        group: 'Radial labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
            step: 1,
        },
    },
    {
        key: 'radialLabelsTextXOffset',
        help: `X offset from links' end.`,
        type: 'number',
        required: false,
        defaultValue: defaults.radialLabelsTextXOffset,
        controlType: 'range',
        group: 'Radial labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
            step: 1,
        },
    },
    {
        key: 'radialLabelsLinkStrokeWidth',
        help: 'Links stroke width.',
        type: 'number',
        required: false,
        defaultValue: defaults.radialLabelsLinkStrokeWidth,
        controlType: 'lineWidth',
        group: 'Radial labels',
    },
    {
        key: 'radialLabelsTextColor',
        help: 'Defines how to compute radial label text color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.radialLabelsTextColor,
        controlType: 'inheritedColor',
        group: 'Radial labels',
    },
    {
        key: 'radialLabelsLinkColor',
        help: 'Defines how to compute radial label link color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.radialLabelsLinkColor,
        controlType: 'inheritedColor',
        group: 'Radial labels',
    },
    {
        key: 'enableSliceLabels',
        help: 'Enable/disable slices labels.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableSliceLabels,
        controlType: 'switch',
        group: 'Slice labels',
    },
    {
        key: 'sliceLabel',
        help:
            'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.sliceLabel,
        controlType: 'choices',
        group: 'Slice labels',
        controlOptions: {
            choices: ['id', 'value', 'formattedValue', `d => \`\${d.id} (\${d.value})\``].map(
                choice => ({
                    label: choice,
                    value: choice,
                })
            ),
        },
    },
    {
        key: 'sliceLabelsRadiusOffset',
        help: `
            Define the radius to use to determine the label position, starting from inner radius,
            this is expressed as a ratio.
        `,
        type: 'number',
        required: false,
        defaultValue: defaults.sliceLabelsRadiusOffset,
        controlType: 'range',
        group: 'Slice labels',
        controlOptions: {
            min: 0,
            max: 2,
            step: 0.05,
        },
    },
    {
        key: 'sliceLabelsSkipAngle',
        help: `Skip label if corresponding slice's angle is lower than provided value.`,
        type: 'number',
        required: false,
        defaultValue: defaults.sliceLabelsSkipAngle,
        controlType: 'range',
        group: 'Slice labels',
        controlOptions: {
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'sliceLabelsTextColor',
        help: 'Defines how to compute slice label text color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.sliceLabelsTextColor,
        controlType: 'inheritedColor',
        group: 'Slice labels',
    },
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer must be a function.

            The layer component which will receive the chart's
            context & computed data and must return a valid SVG element
            for the \`Pie\` component.

            When using the canvas implementation, the function
            will receive the canvas 2d context as first argument
            and the chart's context and computed data as second.

            Please make sure to use \`context.save()\` and
            \`context.restore()\` if you make some global
            modifications to the 2d context inside this function
            to avoid side effects.

            The context passed to layers has the following structure:

            \`\`\`
            {
                dataWithArc:  DatumWithArc[],
                arcGenerator: Function
                centerX:      number
                centerY:      number
                radius:       number
                innerRadius:  number
            }
            \`\`\`
        `,
        required: false,
        type: 'Array<string | Function>',
        defaultValue: defaults.layers,
    },
    {
        key: 'isInteractive',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
    },
    {
        key: 'onMouseEnter',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'onMouseEnter handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseMove',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: 'onMouseMove handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseLeave',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'onMouseLeave handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onClick',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: 'onClick handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'tooltip',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        type: 'Component',
        required: false,
        help: 'Custom tooltip component',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML element and will receive
            the following props:

            \`\`\`
            {
                datum: PieComputedDatum
            }
            \`\`\`

            You can also customize the style of the tooltip using
            the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'custom tooltip example',
        flavors: ['svg', 'canvas'],
        help: 'Showcase custom tooltip.',
        type: 'boolean',
        controlType: 'switch',
        group: 'Interactivity',
    },
    ...motionProperties(['svg'], defaultProps, 'react-spring'),
    {
        key: 'legends',
        flavors: ['svg', 'canvas'],
        type: 'Legend[]',
        help: `Optional chart's legends.`,
        group: 'Legends',
        controlType: 'array',
        controlOptions: {
            props: getLegendsProps(['svg', 'canvas']),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            getItemTitle: (index, legend) =>
                `legend[${index}]: ${legend.anchor}, ${legend.direction}`,
            defaults: {
                anchor: 'top-left',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 0,
                symbolSize: 20,
                itemDirection: 'left-to-right',
                onClick: data => {
                    alert(JSON.stringify(data, null, '    '))
                },
            },
        },
    },
]

export const groups = groupProperties(props)
