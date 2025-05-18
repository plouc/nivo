import { commonDefaultProps, svgDefaultProps } from '@nivo/scatterplot'
import {
    themeProperty,
    motionProperties,
    getLegendsProps,
    groupProperties,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    ordinalColors,
    blendMode,
    chartGrid,
    axes,
    isInteractive,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        flavors: allFlavors,
        type: 'Object[]',
        description: `
            Chart data, which must conform to this structure:
            \`\`\`
            Array<{
                id:   string | number
                data: Array<{
                    x: number | string | Date
                    y: number | string | Date
                }>
            }>
            \`\`\`

            Please note that you should adjust \`xScale\`
            and \`yScale\` according to \`x\` and \`y\` type,
            for example if you use dates, you should use
            a \`time\` scale.
        `,
        required: true,
    },
    {
        key: 'xScale',
        type: 'object',
        help: `X scale configuration.`,
        flavors: allFlavors,
        group: 'Base',
        required: false,
        control: {
            type: 'object',
            props: [
                {
                    key: 'type',
                    help: `Scale type, supports linear, point and time scales.`,
                    type: 'string',
                    flavors: allFlavors,
                    required: true,
                    control: {
                        type: 'choices',
                        disabled: true,
                        choices: ['linear'].map(v => ({
                            label: v,
                            value: v,
                        })),
                    },
                },
                {
                    key: 'min',
                    help: 'Minimum scale value.',
                    flavors: allFlavors,
                    required: false,
                    type: `number | 'auto'`,
                    control: {
                        type: 'switchableRange',
                        disabledValue: 'auto',
                        defaultValue: 0,
                        min: -2000,
                        max: 2000,
                    },
                },
                {
                    key: 'max',
                    help: 'Maximum scale value.',
                    flavors: allFlavors,
                    required: false,
                    type: `number | 'auto'`,
                    control: {
                        type: 'switchableRange',
                        disabledValue: 'auto',
                        defaultValue: 1200,
                        min: -2000,
                        max: 2000,
                    },
                },
            ],
        },
    },
    {
        key: 'xFormat',
        group: 'Base',
        flavors: allFlavors,
        required: false,
        type: 'string | Function',
        help: 'Optional formatter for x values.',
        description: `
            The formatted value can then be used for labels & tooltips.

            If you use a time scale, you must provide a time format
            as values are converted to Date objects.

            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        control: { type: 'valueFormat' },
    },
    {
        key: 'yScale',
        group: 'Base',
        flavors: allFlavors,
        type: 'object',
        help: `Y scale configuration.`,
        required: false,
        control: {
            type: 'object',
            props: [
                {
                    key: 'type',
                    help: `Scale type, supports linear, point and time scales.`,
                    type: 'string',
                    flavors: allFlavors,
                    required: true,
                    control: {
                        type: 'choices',
                        disabled: true,
                        choices: ['linear'].map(v => ({
                            label: v,
                            value: v,
                        })),
                    },
                },
                {
                    key: 'min',
                    help: 'Minimum scale value.',
                    flavors: allFlavors,
                    required: false,
                    type: `number | 'auto'`,
                    control: {
                        type: 'switchableRange',
                        disabledValue: 'auto',
                        defaultValue: 0,
                        min: -2000,
                        max: 2000,
                    },
                },
                {
                    key: 'max',
                    help: 'Maximum scale value.',
                    required: false,
                    flavors: allFlavors,
                    type: `number | 'auto'`,
                    control: {
                        type: 'switchableRange',
                        disabledValue: 'auto',
                        defaultValue: 1200,
                        min: -2000,
                        max: 2000,
                    },
                },
            ],
        },
    },
    {
        key: 'yFormat',
        group: 'Base',
        flavors: allFlavors,
        required: false,
        type: 'string | Function',
        help: 'Optional formatter for y values.',
        description: `
            The formatted value can then be used for labels & tooltips.

            If you use a time scale, you must provide a time format
            as values are converted to Date objects.

            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        control: { type: 'valueFormat' },
    },
    {
        key: 'nodeId',
        group: 'Base',
        flavors: allFlavors,
        required: false,
        defaultValue: '(d) => `${d.serieId}.${d.index}`',
        type: 'string | (datum) => string',
        help: `ID accessor for the node.`,
        description: `
            Define how to determine the id of each node on the plot. This value
            will impact animation. Nodes will transition from a previous state
            at the same index, thus, it can be  useful to specify this property
            if we want to establish some continuity between nodes at different
            index.

            By default nivo will join together the serie.id and datum index.
        `,
    },
    {
        key: 'nodeSize',
        group: 'Base',
        flavors: allFlavors,
        defaultValue: commonDefaultProps.nodeSize,
        type: 'number | object | Function',
        required: false,
        help: `How to compute node size, static or dynamic.`,
        description: `
            If you provide a **number**, all nodes will have the same
            **fixed size**.

            You can also use an object to define a varying size,
            it must conform to the following interface:

            \`\`\`
            {
                key:    string
                values: [min: number, max: number]
                sizes:  [min: number, max: number]
            }
            \`\`\`

            Then the size of each node will **depend on the value
            of \`key\` and \`sizes\`**.

            If you use a **custom function**, it will receive the current
            node and must **return a number**.
        `,
        control: {
            type: 'range',
            unit: 'px',
            min: 2,
            max: 24,
        },
    },
    ...chartDimensions(allFlavors),
    chartRef(['svg', 'canvas']),
    themeProperty(['svg', 'canvas']),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: commonDefaultProps.colors,
    }),
    blendMode({
        flavors: ['svg'],
        target: 'nodes',
        defaultValue: 'normal', // commonDefaultProps.blendMode,
    }),
    {
        key: 'layers',
        flavors: ['svg', 'canvas'],
        group: 'Customization',
        help: 'Defines the order of layers.',
        type: '(string | Component)[]',
        description: `
            Defines the order of layers, available layers are:
            \`grid\`, \`axes\`, \`points\`, \`markers\`,
            \`mesh\`, \`legends\`.

            You can also use this to insert extra layers
            to the chart.

            For \`ScatterPlot\`, the extra layer should be a component
            and will receive current chart context as props.

            If using \`ScatterPlotCanvas\`, the extra layer should be
            a function and will receive canvas context as first argument
            and current chart context object as second.
        `,
        required: false,
        defaultValue: svgDefaultProps.layers,
    },
    {
        key: 'nodeComponent',
        flavors: ['svg'],
        group: 'Customization',
        help: 'Override default node rendering for SVG implementation.',
        type: 'FunctionComponent<ScatterPlotNodeProps<RawDatum>>',
        description: `
            When you override the default node component, you should use
            an \`animated\` element if you wish to preserve transitions,
            for example:
            
            \`\`\`
            import { animated } from '@react-spring/web'
            
            export const MyCustomNode = (props) => (
                <animated.circle
                    cx={props.style.x}
                    cy={props.style.y}
                    r={props.style.size.to(size => size / 2)}
                    fill={style.color}
                    style={{ mixBlendMode: props.blendMode }}
                />
            )
            \`\`\`
            
            The \`style\` property contains \`react-spring\` values, suitable
            for \`animated.*\` elements.
            
            You can have a look at the [default node implementation](https://github.com/plouc/nivo/blob/master/packages/scatterplot/src/Node.tsx)
            to see how props are used by default.
        `,
        required: false,
    },
    {
        key: 'renderNode',
        flavors: ['canvas'],
        group: 'Customization',
        help: 'Override default node rendering for canvas implementation.',
        type: '(ctx: CanvasRenderingContext2D, props: ScatterPlotLayerProps<RawDatum>) => void',
        description: `
            This is how the default rendering is done:
            
            \`\`\`
            const renderNode = (ctx, node) => {
                ctx.beginPath()
                ctx.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI)
                ctx.fillStyle = node.color
                ctx.fill()
            }
            \`\`\`
        `,
        required: false,
    },
    ...chartGrid({
        flavors: allFlavors,
        values: true,
        xDefault: commonDefaultProps.enableGridX,
        yDefault: commonDefaultProps.enableGridY,
    }),
    ...axes({ flavors: allFlavors }),
    isInteractive({
        flavors: ['svg', 'canvas'],
        defaultValue: commonDefaultProps.isInteractive,
    }),
    {
        key: 'useMesh',
        group: 'Interactivity',
        flavors: ['svg'],
        help: 'Use a mesh to detect mouse interactions.',
        type: 'boolean',
        required: false,
        defaultValue: true, // commonDefaultProps.useMesh,
        control: { type: 'switch' },
    },
    {
        key: 'debugMesh',
        help: 'Display mesh used to detect mouse interactions (voronoi cells).',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.debugMesh,
        control: { type: 'switch' },
        group: 'Interactivity',
    },
    {
        key: 'tooltip',
        flavors: ['svg'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom tooltip component',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML element and will
            receive the node as a property.

            You can also customize the tooltip style
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'onMouseEnter',
        group: 'Interactivity',
        flavors: allFlavors,
        help: 'onMouseEnter handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        flavors: allFlavors,
        help: 'onMouseMove handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        flavors: allFlavors,
        help: 'onMouseLeave handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        flavors: allFlavors,
        help: 'onClick handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'legends',
        group: 'Legends',
        flavors: ['svg', 'canvas'],
        type: 'object[]',
        help: `Optional chart's legends.`,
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
    {
        key: 'annotations',
        group: 'Annotations',
        flavors: allFlavors,
        help: 'Extra annotations.',
        type: 'object[]',
        required: false,
    },
    {
        key: 'markers',
        group: 'Annotations',
        help: 'Extra markers.',
        type: 'object[]',
        flavors: ['svg'],
        required: false,
    },
    ...motionProperties(['svg'], svgDefaultProps),
]

export const groups = groupProperties(props)
