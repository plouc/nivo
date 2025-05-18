import { defaultProps } from '@nivo/pie'
import { arcTransitionModes } from '@nivo/arcs'
import {
    themeProperty,
    defsProperties,
    groupProperties,
    getLegendsProps,
    motionProperties,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    ordinalColors,
    isInteractive,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas', 'api']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
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
        flavors: allFlavors,
        help: 'ID accessor which should return a unique value for the whole dataset.',
        description: `
            Define how to access the ID of each datum,
            by default, nivo will look for the \`id\` property.
        `,
        type: 'string | (datum: RawDatum): string | number',
        required: false,
        defaultValue: defaultProps.id,
    },
    {
        key: 'value',
        group: 'Base',
        flavors: allFlavors,
        help: 'Value accessor.',
        description: `
            Define how to access the value of each datum,
            by default, nivo will look for the \`value\` property.
        `,
        type: 'string | (datum: RawDatum): number',
        required: false,
        defaultValue: defaultProps.value,
    },
    {
        key: 'valueFormat',
        group: 'Base',
        flavors: allFlavors,
        help: 'Optional formatter for values.',
        description: `
            The formatted value can then be used for labels & tooltips.

            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        required: false,
        type: 'string | (value: number) => string | number',
        control: { type: 'valueFormat' },
    },
    ...chartDimensions(allFlavors),
    {
        key: 'startAngle',
        help: 'Start angle (in degrees), useful to make gauges for example.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.startAngle,
        group: 'Base',
        control: {
            type: 'angle',
            min: -180,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'endAngle',
        help: 'End angle (in degrees), useful to make gauges for example.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.endAngle,
        group: 'Base',
        control: {
            type: 'angle',
            min: -360,
            max: 360,
            step: 5,
        },
    },
    {
        key: 'fit',
        help: `If 'true', pie will be optimized to occupy more space when using partial pie.`,
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.fit,
        control: { type: 'switch' },
        group: 'Base',
    },
    {
        key: 'innerRadius',
        help: `Donut chart if greater than 0. Value should be between 0~1 as it's a ratio from original radius.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.innerRadius,
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 0.95,
            step: 0.05,
        },
    },
    {
        key: 'padAngle',
        help: 'Padding between each pie slice.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.padAngle,
        group: 'Base',
        control: {
            type: 'range',
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'cornerRadius',
        help: 'Rounded slices.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.cornerRadius,
        group: 'Base',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'sortByValue',
        help: `If 'true', arcs will be ordered according to their associated value.`,
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.sortByValue,
        control: { type: 'switch' },
        group: 'Base',
    },
    chartRef(['svg', 'canvas']),
    themeProperty(allFlavors),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: defaultProps.colors,
    }),
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
        required: false,
        type: 'boolean',
        control: { type: 'switch' },
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Slices border width.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.borderWidth,
        control: { type: 'lineWidth' },
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.borderColor,
        control: { type: 'inheritedColor' },
        group: 'Style',
    },
    {
        key: 'enableArcLabels',
        help: 'Enable/disable arc labels.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.enableArcLabels,
        control: { type: 'switch' },
        group: 'Arc labels',
    },
    {
        key: 'arcLabel',
        help: 'Defines how to get label text, can be a string (used to access current node data property) or a function which will receive the actual node data.',
        flavors: allFlavors,
        type: 'string | Function',
        required: false,
        defaultValue: defaultProps.arcLabel,
        group: 'Arc labels',
        control: {
            type: 'choices',
            choices: ['id', 'value', 'formattedValue', `d => \`\${d.id} (\${d.value})\``].map(
                choice => ({
                    label: choice,
                    value: choice,
                })
            ),
        },
    },
    {
        key: 'arcLabelsRadiusOffset',
        help: `
            Define the radius to use to determine the label position, starting from inner radius,
            this is expressed as a ratio.
        `,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLabelsRadiusOffset,
        group: 'Arc labels',
        control: {
            type: 'range',
            min: 0,
            max: 2,
            step: 0.05,
        },
    },
    {
        key: 'arcLabelsSkipAngle',
        help: `Skip label if corresponding arc's angle is lower than provided value.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLabelsSkipAngle,
        group: 'Arc labels',
        control: {
            type: 'range',
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'arcLabelsSkipRadius',
        help: `Skip label if corresponding arc's radius is lower than provided value.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLabelsSkipRadius,
        group: 'Arc labels',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 60,
            step: 1,
        },
    },
    {
        key: 'arcLabelsTextColor',
        help: 'Defines how to compute arc label text color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.arcLabelsTextColor,
        control: { type: 'inheritedColor' },
        group: 'Arc labels',
    },
    {
        key: 'enableArcLinkLabels',
        help: 'Enable/disable arc link labels.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.enableArcLinkLabels,
        control: { type: 'switch' },
        group: 'Arc link labels',
    },
    {
        key: 'arcLinkLabel',
        help: 'Arc link label',
        flavors: allFlavors,
        description: `
            Defines how to get label text,
            can be a string (used to access current node data property)
            or a function which will receive the actual node data.
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaultProps.arcLinkLabel,
        group: 'Arc link labels',
        control: {
            type: 'choices',
            choices: ['id', 'value', `d => \`\${d.id} (\${d.value})\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'arcLinkLabelsSkipAngle',
        help: `Skip label if corresponding slice's angle is lower than provided value.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLinkLabelsSkipAngle,
        group: 'Arc link labels',
        control: {
            type: 'range',
            unit: '°',
            min: 0,
            max: 45,
            step: 1,
        },
    },
    {
        key: 'arcLinkLabelsOffset',
        help: `Link offset from pie outer radius, useful to have links overlapping pie slices.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLinkLabelsOffset,
        group: 'Arc link labels',
        control: {
            type: 'range',
            unit: 'px',
            min: -24,
            max: 24,
            step: 1,
        },
    },
    {
        key: 'arcLinkLabelsDiagonalLength',
        help: `Link diagonal length.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLinkLabelsDiagonalLength,
        group: 'Arc link labels',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 36,
            step: 1,
        },
    },
    {
        key: 'arcLinkLabelsStraightLength',
        help: `Length of the straight segment of the links.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLinkLabelsStraightLength,
        group: 'Arc link labels',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 36,
            step: 1,
        },
    },
    {
        key: 'arcLinkLabelsTextOffset',
        help: `X offset from links' end.`,
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLinkLabelsTextOffset,
        group: 'Arc link labels',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 36,
            step: 1,
        },
    },
    {
        key: 'arcLinkLabelsThickness',
        help: 'Links stroke width.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.arcLinkLabelsThickness,
        control: { type: 'lineWidth' },
        group: 'Arc link labels',
    },
    {
        key: 'arcLinkLabelsTextColor',
        help: 'Defines how to compute arc link label text color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.arcLinkLabelsTextColor,
        control: { type: 'inheritedColor' },
        group: 'Arc link labels',
    },
    {
        key: 'arcLinkLabelsColor',
        help: 'Defines how to compute arc link label link color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.arcLinkLabelsColor,
        control: { type: 'inheritedColor' },
        group: 'Arc link labels',
    },
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        flavors: allFlavors,
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
        defaultValue: defaultProps.layers,
    },
    isInteractive({
        flavors: ['svg', 'canvas'],
        defaultValue: defaultProps.isInteractive,
    }),
    {
        key: 'activeInnerRadiusOffset',
        flavors: ['svg', 'canvas'],
        help: `Extends active slice inner radius.`,
        type: 'number',
        required: false,
        defaultValue: defaultProps.activeInnerRadiusOffset,
        group: 'Interactivity',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 50,
        },
    },
    {
        key: 'activeOuterRadiusOffset',
        flavors: ['svg', 'canvas'],
        help: `Extends active slice outer radius.`,
        type: 'number',
        required: false,
        defaultValue: defaultProps.activeOuterRadiusOffset,
        group: 'Interactivity',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 50,
        },
    },
    {
        key: 'activeId',
        flavors: ['svg', 'canvas'],
        help: `Programmatically control the \`activeId\`.`,
        description: `
            This property should be used with \`onActiveIdChange\`,
            allowing you to fully control which arc should be highlighted.
            
            You might want to use this in case:
            
            - You want to synchronize the \`activeId\` with other UI elements defined
              outside of nivo, or other nivo charts.
            - You're creating some kind of *story-telling* app where you want to highlight
              certain arcs based on external input.
            - You want to change the default behavior and highlight arcs depending on clicks
              rather than \`onMouseEnter\`, which can be desirable on mobile for example.
        `,
        type: 'string | number | null',
        required: false,
        group: 'Interactivity',
    },
    {
        key: 'onActiveIdChange',
        flavors: ['svg', 'canvas'],
        help: `Programmatically control the \`activeId\`.`,
        description: `
            This property should be used with \`activeId\`,
            allowing you to fully control which arc should be highlighted.
            
            You might want to use this in case:
            
            - You want to synchronize the \`activeId\` with other UI elements defined
              outside of nivo, or other nivo charts.
            - You're creating some kind of *story-telling* app where you want to highlight
              certain arcs based on external input.
            - You want to change the default behavior and highlight arcs depending on clicks
              rather than \`onMouseEnter\`, which can be desirable on mobile for example.
        `,
        type: '(id: string | number | null) => void',
        required: false,
        group: 'Interactivity',
    },
    {
        key: 'defaultActiveId',
        flavors: ['svg', 'canvas'],
        help: `Default \`activeId\`.`,
        description: `
            You can use this property in case you want to define a default \`activeId\`,
            but still don't want to control it by yourself (using \`activeId\` & \`onActiveIdChange\`).
        `,
        type: 'string | number | null',
        required: false,
        group: 'Interactivity',
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
        required: false,
        control: { type: 'switch' },
        group: 'Interactivity',
    },
    ...motionProperties(['svg'], defaultProps),
    {
        key: 'transitionMode',
        flavors: ['svg'],
        help: 'Define how transitions behave.',
        type: 'string',
        required: false,
        defaultValue: defaultProps.transitionMode,
        group: 'Motion',
        control: {
            type: 'choices',
            choices: arcTransitionModes.map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'forwardLegendData',
        group: 'Legends',
        type: '(data: LegendDatum[]) => void',
        required: false,
        flavors: ['svg', 'canvas'],
        help: 'Can be used to get the computed legend data.',
        description: `
            This property allows you to implement custom
            legends, bypassing the limitations of SVG/Canvas.
            
            For example you could have a state in the parent component,
            and then pass the setter.
            
            Please be very careful when using this property though,
            you could end up with an infinite loop if the properties
            defining the data don't have a stable reference.
            
            For example, using a non static/memoized function for \`valueFormat\`
            would lead to such issue.
        `,
    },
    {
        key: 'legends',
        flavors: ['svg', 'canvas'],
        type: 'Legend[]',
        help: `Optional chart's legends.`,
        group: 'Legends',
        required: false,
        control: {
            type: 'array',
            props: getLegendsProps(['svg', 'canvas']),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            getItemTitle: (index, legend: any) =>
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
                onClick: (data: any) => {
                    console.log(JSON.stringify(data, null, '    '))
                },
            },
        },
    },
]

export const groups = groupProperties(props)
