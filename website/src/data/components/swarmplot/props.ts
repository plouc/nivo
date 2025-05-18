import { defaultProps } from '@nivo/swarmplot'
import { OrdinalColorScaleConfig } from '@nivo/colors'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    ordinalColors,
    chartGrid,
    axes,
    isInteractive,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas']

const props: ChartProperty[] = [
    {
        key: 'data',
        help: 'Chart data.',
        flavors: allFlavors,
        description: `
            This Chart's doesn't have a predefined structure,
            you must use a schema which match \`groupBy\`,
            \`identity\` and \`value\` properties.
        `,
        type: 'object[]',
        group: 'Base',
        required: true,
    },
    {
        key: 'id',
        group: 'Base',
        flavors: allFlavors,
        type: 'string | Function',
        required: false,
        help: `Property used to retrieve the node's unique identifier.`,
        description: `
            This property will determine the identifier of a datum
            amongst the whole data set, thus, it's really important
            that it's unique.

            It is especially important to have proper identifier
            when enabling animations, as it will be used to determine
            if a node is a new one or should transition from previous
            to next state.
        `,
        defaultValue: defaultProps.id,
    },
    {
        key: 'value',
        group: 'Base',
        flavors: allFlavors,
        type: 'string | Function',
        required: false,
        help: `Property used to retrieve the node's value.`,
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
    {
        key: 'groups',
        group: 'Base',
        flavors: allFlavors,
        type: 'string[]',
        required: true,
        help: 'Available groups.',
    },
    {
        key: 'groupBy',
        group: 'Base',
        flavors: allFlavors,
        type: 'string | Function',
        required: false,
        help: 'Propety used to group nodes, must return a group which is available in the groups property.',
        defaultValue: defaultProps.groupBy,
    },
    {
        key: 'size',
        group: 'Base',
        flavors: allFlavors,
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
        defaultValue: defaultProps.size,
    },
    {
        key: 'spacing',
        help: 'Spacing between nodes.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.spacing,
        group: 'Base',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    ...chartDimensions(allFlavors),
    chartRef(['svg', 'canvas']),
    {
        key: 'forceStrength',
        help: 'Force strength.',
        flavors: allFlavors,
        description: `
            This value determine the strength applied on the value
            axis, using lower value will result in a **more linear
            arrangement**, however nodes won't be placed accurately
            according to their values.

            On the other hand, if you increase this value, the
            simulation will try to **align the nodes with their
            corresponding values** on the value axis, resulting
            in a narrower chart.

            Please note that increasing this value will sometimes
            require to **increase the quality of the simulation**
            via the \`simulationIterations\` property.
        `,
        type: 'number',
        required: false,
        defaultValue: defaultProps.forceStrength,
        group: 'Simulation',
        control: {
            type: 'range',
            step: 0.2,
            min: 0.2,
            max: 9,
        },
    },
    {
        key: 'simulationIterations',
        help: 'Adjust the simulation quality.',
        flavors: allFlavors,
        description: `
            Increasing this number will result in a **more accurate simulation**,
            however it will also involve more computing.
        `,
        type: 'number',
        required: false,
        defaultValue: defaultProps.simulationIterations,
        group: 'Simulation',
        control: {
            type: 'range',
            min: 60,
            max: 260,
        },
    },
    {
        key: 'layout',
        help: `Chart layout.`,
        flavors: allFlavors,
        type: 'string',
        required: false,
        defaultValue: defaultProps.layout,
        group: 'Layout',
        control: {
            type: 'radio',
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'gap',
        help: 'Gap between each serie.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaultProps.gap,
        group: 'Layout',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    themeProperty(allFlavors),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: defaultProps.colors as OrdinalColorScaleConfig,
        description: `
            The colors property is used to determine the **ordinal color scale**
            to use to compute nodes' color, it use the serie id as a discriminator.

            You can use a **predefined color scheme**, using the following form:

            \`\`\`
            colors={{ scheme: 'category10' }}
            \`\`\`

            Where \`category10\` is the identifier of the color scheme.
            Please have a look at [the dedicated guide](self:/guides/colors)
            for available schemes.

            If you wish to use **color already defined on the data**
            you passed to the chart, you can also use this form:

            \`\`\`
            colors={{ datum: 'color' }}
            \`\`\`

            Where \`color\` is the path to the property containing the color
            to apply in the current datum.

            You can also use a **custom function** which will receive the current
            datum and must **return a valid color code**.

            If you pass a string, it will be **used as a color for each and every nodes**.
        `,
    }),
    {
        key: 'colorBy',
        group: 'Style',
        help: 'Property or accessor function to be used with colors.',
        flavors: allFlavors,
        description: `
            When using a color scheme or an array of colors,
            you'll generate a color scale, this scale will
            receive a value which will be translated to a color.

            This property define the way we get this value,
            it can be either a \`string\` or a custom function.

            Please have a look at [the colors guide](self:/guides/colors)
            for further information.
        `,
        type: `Function | string`,
        required: false,
        defaultValue: defaultProps.colorBy,
        control: {
            type: 'choices',
            choices: ['group', 'id'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'borderWidth',
        help: 'Control node border width.',
        flavors: allFlavors,
        type: 'number | Function',
        required: false,
        defaultValue: defaultProps.borderWidth,
        control: { type: 'lineWidth' },
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Control node border color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.borderColor,
        control: { type: 'inheritedColor' },
        group: 'Style',
    },
    {
        key: 'layers',
        group: 'Customization',
        flavors: allFlavors,
        help: 'Defines the order of layers and add custom layers.',
        description: `
            Defines the order of layers, available layers are:
            \`grid\`, \`axes\`, \`nodes\`, \`mesh\`.

            You can also use this to insert extra layers
            to the chart, the extra layer must be a function.

            The layer function which will receive the chart's
            context & computed data and must return a valid SVG element
            for the \`SwarmPlot\` component.

            When using the canvas implementation, the function
            will receive the canvas 2d context as first argument
            and the chart's context and computed data as second.

            Please make sure to use \`context.save()\` and
            \`context.restore()\` if you make some global
            modifications to the 2d context inside this function
            to avoid side effects.

            You can see a live example of custom layers
            [here](storybook:/swarmplot--extra-layers).
        `,
        required: false,
        type: 'Array<string | Function>',
        defaultValue: defaultProps.layers,
    },
    {
        key: 'circleComponent',
        group: 'Customization',
        flavors: ['svg'],
        help: 'Override default circle component for the SVG implementation.',
        description: `
            This property can be used to completely
            customize the way nodes are rendered.

            You should return a valid SVG node.

            You can see a live example of custom circle component
            [here](storybook:/swarmplot--custom-circle-component).
        `,
        required: false,
        type: 'Component',
    },
    {
        key: 'renderCircle',
        group: 'Customization',
        flavors: ['canvas'],
        help: 'Override default circle rendering for the canvas implementation.',
        description: `
            This property can be used to completely
            customize the way nodes are rendered.

            The rendering function will receive the canvas 2d
            context as first argument.

            Please make sure to use \`context.save()\` and
            \`context.restore()\` if you make some global
            modifications to the 2d context inside this function
            to avoid side effects.
        `,
        required: false,
        type: 'Function',
    },
    ...chartGrid({
        flavors: allFlavors,
        values: true,
        xDefault: defaultProps.enableGridX,
        yDefault: defaultProps.enableGridY,
    }),
    ...axes({ flavors: allFlavors }),
    isInteractive({
        flavors: ['svg', 'canvas'],
        defaultValue: defaultProps.isInteractive,
    }),
    {
        key: 'useMesh',
        help: 'Use a mesh to detect mouse interactions, always true for canvas.',
        flavors: ['svg'],
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.useMesh,
        control: { type: 'switch' },
        group: 'Interactivity',
    },
    {
        key: 'debugMesh',
        help: 'Display the mesh used to detect mouse interactions (voronoi cells), depends on useMesh.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.debugMesh,
        control: { type: 'switch' },
        group: 'Interactivity',
    },
    {
        key: 'onMouseEnter',
        group: 'Interactivity',
        flavors: allFlavors,
        help: 'onMouseEnter handler.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        flavors: allFlavors,
        help: 'onMouseMove handler.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        flavors: allFlavors,
        help: 'onMouseLeave handler.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        flavors: allFlavors,
        help: 'onClick handler.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'tooltip',
        group: 'Interactivity',
        flavors: allFlavors,
        type: 'Function',
        required: false,
        help: 'Custom tooltip component.',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML
            element and will receive the node's data.
        `,
    },
    ...motionProperties(['svg'], defaultProps),
]

export const groups = groupProperties(props)
