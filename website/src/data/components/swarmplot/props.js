/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { SwarmPlotDefaultProps } from '@nivo/swarmplot'
import {
    themeProperty,
    motionProperties,
    axesProperties,
    groupProperties,
} from '../../../lib/componentProperties'

const defaults = SwarmPlotDefaultProps

const props = [
    {
        key: 'data',
        help: 'Chart data.',
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
        key: 'groups',
        group: 'Base',
        type: 'string[]',
        required: true,
        help: 'Available groups.',
    },
    {
        key: 'groupBy',
        group: 'Base',
        type: 'string | Function',
        required: false,
        help:
            'Propety used to group nodes, must return a group which is available in the groups property.',
        defaultValue: defaults.groupBy,
    },
    {
        key: 'identity',
        group: 'Base',
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
        defaultValue: defaults.identity,
    },
    {
        key: 'label',
        group: 'Base',
        type: 'string | Function',
        required: false,
        help: `Control node label.`,
        defaultValue: defaults.label,
    },
    {
        key: 'value',
        group: 'Base',
        type: 'string | Function',
        required: false,
        help: `Property used to retrieve the node's value.`,
        defaultValue: defaults.value,
    },
    {
        key: 'valueFormat',
        group: 'Base',
        type: 'string | Function',
        required: false,
        help: `Optional value formatter.`,
    },
    {
        key: 'size',
        group: 'Base',
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
        defaultValue: defaults.size,
    },
    {
        key: 'spacing',
        help: 'Spacing between nodes.',
        type: 'number',
        required: false,
        defaultValue: defaults.spacing,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 20,
        },
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        group: 'Base',
        help: 'Chart width.',
        description: `
            not required if using responsive alternative
            of the component \`<Responsive*/>\`.
        `,
        type: 'number',
        required: true,
    },
    {
        key: 'height',
        enableControlForFlavors: ['api'],
        group: 'Base',
        help: 'Chart height.',
        description: `
            not required if using responsive alternative
            of the component \`<Responsive*/>\`.
        `,
        type: 'number',
        required: true,
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
    {
        key: 'forceStrength',
        help: 'Force strength.',
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
        defaultValue: defaults.forceStrength,
        controlType: 'range',
        group: 'Simulation',
        controlOptions: {
            step: 0.2,
            min: 0.2,
            max: 9,
        },
    },
    {
        key: 'simulationIterations',
        help: 'Adjust the simulation quality.',
        description: `
            Increasing this number will result in a **more accurate simulation**,
            however it will also involve more computing.
        `,
        type: 'number',
        required: false,
        defaultValue: defaults.simulationIterations,
        controlType: 'range',
        group: 'Simulation',
        controlOptions: {
            min: 60,
            max: 260,
        },
    },
    {
        key: 'layout',
        help: `Chart layout.`,
        type: 'string',
        required: false,
        defaultValue: defaults.layout,
        controlType: 'radio',
        group: 'Layout',
        controlOptions: {
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'gap',
        help: 'Gap between each serie.',
        type: 'number',
        required: false,
        defaultValue: defaults.gap,
        controlType: 'range',
        group: 'Layout',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 100,
        },
    },
    themeProperty,
    {
        key: 'colors',
        help: 'Defines how to compute node color.',
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
        type: `Function | object | string`,
        required: false,
        defaultValue: defaults.colors,
        controlType: 'ordinalColors',
        group: 'Style',
    },
    {
        key: 'colorBy',
        group: 'Style',
        help: 'Property or accessor function to be used with colors.',
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
        defaultValue: defaults.colorBy,
        controlType: 'choices',
        controlOptions: {
            choices: ['group', 'id'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'borderWidth',
        help: 'Control node border width.',
        type: 'number | Function',
        required: false,
        defaultValue: defaults.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Control node border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.borderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    {
        key: 'layers',
        group: 'Customization',
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
        defaultValue: defaults.layers,
    },
    {
        key: 'renderNode',
        group: 'Customization',
        help: 'Override default node rendering.',
        description: `
            This property can be used to completely
            customize the way nodes are rendered.
            
            when using the SVG implementation, you should
            return a valid SVG node.
            
            When using canvas, the rendering function will
            receive the canvas 2d context as first argument.

            Please make sure to use \`context.save()\` and
            \`context.restore()\` if you make some global
            modifications to the 2d context inside this function
            to avoid side effects.

            You can see a live example of custom node rendering
            [here](storybook:/swarmplot--custom-node-rendering).
        `,
        required: false,
        type: 'Function',
    },
    /*
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        type: 'string | Function',
        required: false,
        defaultValue: defaults.borderColor,
        controlType: 'color',
        group: 'Style',
    },
    */
    {
        key: 'enableGridX',
        group: 'Grid & Axes',
        help: 'Enable/disable x grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridX,
        controlType: 'switch',
    },
    {
        key: 'gridXValues',
        group: 'Grid & Axes',
        help: 'Specify values to use for vertical grid lines.',
        type: 'Array<number | string>',
        required: false,
    },
    {
        key: 'enableGridY',
        group: 'Grid & Axes',
        help: 'Enable/disable y grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableGridY,
        controlType: 'switch',
    },
    {
        key: 'gridYValues',
        group: 'Grid & Axes',
        help: 'Specify values to use for horizontal grid lines.',
        type: 'Array<number | string>',
        required: false,
    },
    ...axesProperties(),
    {
        key: 'isInteractive',
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'useMesh',
        help: 'Use a mesh to detect mouse interactions.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.useMesh,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'debugMesh',
        help: 'Display mesh used to detect mouse interactions (voronoi cells).',
        type: 'boolean',
        required: false,
        defaultValue: defaults.debugMesh,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'onMouseEnter',
        group: 'Interactivity',
        help: 'onMouseEnter handler.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        help: 'onMouseMove handler.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        help: 'onMouseLeave handler.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        help: 'onClick handler.',
        type: '(node, event) => void',
        required: false,
    },
    {
        key: 'tooltip',
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom tooltip component.',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML
            element and will receive the node's data.
        `,
    },
    ...motionProperties(['svg'], defaults),
]

export const groups = groupProperties(props)
