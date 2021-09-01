import { commonDefaultProps, svgDefaultProps } from '@nivo/scatterplot'
import {
    themeProperty,
    axesProperties,
    motionProperties,
    getLegendsProps,
    groupProperties,
} from '../../../lib/componentProperties'
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
        group: 'Base',
        controlType: 'object',
        controlOptions: {
            props: [
                {
                    key: 'type',
                    help: `Scale type, supports linear, point and time scales.`,
                    type: 'string',
                    controlType: 'choices',
                    controlOptions: {
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
                    required: false,
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
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
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
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
        controlType: 'valueFormat',
    },
    {
        key: 'yScale',
        group: 'Base',
        type: 'object',
        help: `Y scale configuration.`,
        controlType: 'object',
        controlOptions: {
            props: [
                {
                    key: 'type',
                    help: `Scale type, supports linear, point and time scales.`,
                    type: 'string',
                    controlType: 'choices',
                    controlOptions: {
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
                    required: false,
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
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
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
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
        controlType: 'valueFormat',
    },
    {
        key: 'nodeId',
        group: 'Base',
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
        defaultValue: commonDefaultProps.nodeSize,
        type: 'number | object | Function',
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
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 24,
        },
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        description: `
            Not required if using
            \`Responsive*\` component.
            Also note that width exclude left/right axes,
            please add margin to make sure they're visible.
        `,
        help: 'Chart width.',
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
        description: `
            Not required if using
            \`Responsive*\` component.
            Also note that width exclude top/bottom axes,
            please add margin to make sure they're visible.
        `,
        help: 'Chart height.',
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
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    themeProperty(['svg', 'canvas']),
    {
        key: 'colors',
        group: 'Style',
        help: 'Defines color range.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: commonDefaultProps.colors,
        controlType: 'ordinalColors',
    },
    {
        key: 'blendMode',
        group: 'Style',
        flavors: ['svg'],
        help: 'Defines CSS mix-blend-mode property.',
        description: `
            Defines CSS \`mix-blend-mode\` property for nodes,
            see
            [MDN documentation](https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode).
        `,
        type: 'string',
        required: false,
        defaultValue: commonDefaultProps.blendMode,
        controlType: 'blendMode',
    },
    {
        key: 'layers',
        flavors: ['svg', 'canvas'],
        group: 'Customization',
        help: 'Defines the order of layers.',
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
    {
        key: 'enableGridX',
        help: 'Enable/disable x grid.',
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.enableGridX,
        controlType: 'switch',
        group: 'Grid & Axes',
    },
    {
        key: 'gridXValues',
        group: 'Grid & Axes',
        help: 'Specify values to use for vertical grid lines.',
        type: 'Array<number | string | Date>',
        required: false,
    },
    {
        key: 'enableGridY',
        group: 'Grid & Axes',
        help: 'Enable/disable y grid.',
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.enableGridY,
        controlType: 'switch',
    },
    {
        key: 'gridYValues',
        group: 'Grid & Axes',
        help: 'Specify values to use for horizontal grid lines.',
        type: 'Array<number | string | Date>',
        required: false,
    },
    ...axesProperties(),
    {
        key: 'isInteractive',
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'useMesh',
        group: 'Interactivity',
        flavors: ['svg'],
        help: 'Use a mesh to detect mouse interactions.',
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.useMesh,
        controlType: 'switch',
    },
    {
        key: 'debugMesh',
        help: 'Display mesh used to detect mouse interactions (voronoi cells).',
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.debugMesh,
        controlType: 'switch',
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
        help: 'onMouseEnter handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        help: 'onMouseMove handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        help: 'onMouseLeave handler, it receives target node data and mouse event.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onClick',
        group: 'Interactivity',
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
    {
        key: 'annotations',
        group: 'Annotations',
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
    ...motionProperties(['svg'], svgDefaultProps, 'react-spring'),
]

export const groups = groupProperties(props)
