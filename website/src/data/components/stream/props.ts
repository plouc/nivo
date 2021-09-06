// @ts-ignore: the core package should be migrated to TS
import { areaCurvePropKeys, stackOrderPropKeys, stackOffsetPropKeys } from '@nivo/core'
import { defaultProps, svgDefaultProps } from '@nivo/stream'
import {
    themeProperty,
    axesProperties,
    motionProperties,
    defsProperties,
    groupProperties,
} from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        type: 'object[]',
        required: true,
        help: 'Chart data.',
        flavors: ['svg'],
    },
    {
        key: 'keys',
        group: 'Base',
        type: 'string | number',
        required: true,
        help: 'Keys to use to build each layer.',
        description: `
            Keys to use to index the data,
            those keys must exist in each data item.
            
            For example let's say you have this data:
            
            \`\`\`
            [{ A: 10, B: 20},
             { A: 20, B: 10},
             { A: 15, B: 15}]
            \`\`\`
              
            Then the keys should be: \`['A', 'B']\`.
            
            Also note that those keys are used by default to generate
            the label of each layer, displayed in the legends and
            the stack tooltip, this behaviour can be customized
            via the \`label\` property, in case you want to display
            something else.
        `,
        flavors: ['svg'],
    },
    {
        key: 'label',
        group: 'Base',
        type: 'string | (layer) => string | number',
        required: false,
        help: 'Label accessor, used for legends.',
        description: `
            Define how to access the label of each layer,
            by default, nivo will use the corresponding key defined
            in \`keys\`, it is available under the \`id\` property
            of the layer.
        `,
        defaultValue: defaultProps.label,
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
        key: 'offsetType',
        group: 'Base',
        type: 'string',
        required: false,
        help: 'Offset type.',
        flavors: ['svg'],
        controlType: 'choices',
        controlOptions: {
            choices: stackOffsetPropKeys.map((key: string) => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'order',
        group: 'Base',
        type: 'string',
        required: false,
        help: 'Layers order.',
        flavors: ['svg'],
        controlType: 'choices',
        controlOptions: {
            choices: stackOrderPropKeys.map((key: string) => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'curve',
        group: 'Base',
        type: 'string',
        required: false,
        help: 'Curve interpolation.',
        description: `
            Defines the curve factory to use
            for the area generator.
        `,
        defaultValue: defaultProps.curve,
        flavors: ['svg'],
        controlType: 'choices',
        controlOptions: {
            choices: areaCurvePropKeys.map((key: string) => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'width',
        group: 'Base',
        type: '{number}',
        required: true,
        help: 'Chart width.',
        description: `
            not required if using
            \`<ResponsiveStream/>\`.
        `,
        flavors: ['svg'],
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
        type: '{number}',
        required: true,
        help: 'Chart height.',
        description: `
            not required if using
            \`<ResponsiveStream/>\`.
        `,
        flavors: ['svg'],
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
        type: 'object',
        required: false,
        help: 'Chart margin.',
        flavors: ['svg'],
        controlType: 'margin',
    },
    themeProperty(['svg']),
    {
        key: 'colors',
        group: 'Style',
        type: 'string | Function',
        required: false,
        help: 'Defines how to compute line color.',
        flavors: ['svg'],
        defaultValue: defaultProps.colors,
        controlType: 'ordinalColors',
    },
    {
        key: 'fillOpacity',
        group: 'Style',
        type: 'number',
        required: false,
        help: 'Layers fill opacity.',
        flavors: ['svg'],
        defaultValue: defaultProps.fillOpacity,
        controlType: 'opacity',
    },
    {
        key: 'borderWidth',
        group: 'Style',
        help: 'Width of layer border.',
        type: 'number',
        required: false,
        flavors: ['svg'],
        defaultValue: defaultProps.borderWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'borderColor',
        group: 'Style',
        type: 'string | object | Function',
        required: false,
        help: 'Method to compute layer border color.',
        description: `
            How to compute border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        flavors: ['svg'],
        defaultValue: defaultProps.borderColor,
        controlType: 'inheritedColor',
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'layers',
        group: 'Customization',
        type: 'Array<string | Function>',
        required: false,
        help: 'Defines the order of layers.',
        description: `
            Defines the order of layers, available layers are:
            \`grid\`, \`axes\`, \`layers\`, \`dots\`, \`slices\`, \`legends\`.

            You can also use this to insert extra layers to the chart,
            this extra layer must be a function which will receive
            the chart computed data and must return a valid SVG element.
        `,
        flavors: ['svg'],
        defaultValue: svgDefaultProps.layers,
    },
    {
        key: 'enableGridX',
        group: 'Grid & Axes',
        help: 'Enable/disable x grid.',
        type: 'boolean',
        required: false,
        flavors: ['svg'],
        defaultValue: defaultProps.enableGridX,
        controlType: 'switch',
    },
    {
        key: 'enableGridY',
        group: 'Grid & Axes',
        help: 'Enable/disable y grid.',
        type: 'boolean',
        required: false,
        flavors: ['svg'],
        defaultValue: defaultProps.enableGridY,
        controlType: 'switch',
    },
    ...axesProperties(),
    {
        key: 'enableDots',
        group: 'Dots',
        help: 'Enable/disable dots.',
        type: 'boolean',
        required: false,
        flavors: ['svg'],
        defaultValue: defaultProps.enableDots,
        controlType: 'switch',
    },
    {
        key: 'renderDot',
        group: 'Dots',
        flavors: ['svg'],
        help: 'Custom rendering function for dots.',
        type: 'Function',
        required: false,
    },
    {
        key: 'dotSize',
        group: 'Dots',
        help: 'Size of the dots',
        description:
            'Size of the dots, it also accepts a function which can be used to make it vary according to the associated datum.',
        type: 'number | Function',
        required: false,
        flavors: ['svg'],
        defaultValue: defaultProps.dotSize,
        controlType: 'range',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 20,
        },
    },
    {
        key: 'dotColor',
        group: 'Dots',
        help: 'Method to compute dots color.',
        type: 'string | object | Function',
        required: false,
        flavors: ['svg'],
        defaultValue: defaultProps.dotColor,
        controlType: 'inheritedColor',
    },
    {
        key: 'dotBorderWidth',
        group: 'Dots',
        help: 'Width of the dots border.',
        description:
            'Width of the dots border, it also accepts a function which can be used to make it vary according to the associated datum.',
        type: 'number | Function',
        required: false,
        flavors: ['svg'],
        defaultValue: defaultProps.dotBorderWidth,
        controlType: 'lineWidth',
    },
    {
        key: 'dotBorderColor',
        group: 'Dots',
        help: 'Method to compute dots border color.',
        type: 'string | object | Function',
        required: false,
        flavors: ['svg'],
        defaultValue: defaultProps.dotBorderColor,
        controlType: 'inheritedColor',
    },
    {
        key: 'isInteractive',
        flavors: ['svg'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'tooltip',
        flavors: ['svg'],
        help: `Tooltip custom component.`,
        type: 'FunctionComponent',
        required: false,
        group: 'Interactivity',
        description: `
            Allows complete tooltip customisation, it must return
            a valid HTML element and will receive the following data:
            
            \`\`\`
            {
                layer: {
                    id: string | number
                    label: string | number
                    color: string
                    // populated when using patterns/gradients
                    fill?: string
                    path: string
                    // computed data for each data point for this
                    // specific layer
                    data: StreamLayerDatum[]
                }
            }
            \`\`\`
            
            You can also customize the style of the tooltip
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'enableStackTooltip',
        flavors: ['svg'],
        help: `Enable/disable stack tooltip ('isInteractive' must also be 'true').`,
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.enableStackTooltip,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'stackTooltip',
        flavors: ['svg'],
        help: `Stack tooltip custom component.`,
        type: 'FunctionComponent',
        required: false,
        group: 'Interactivity',
    },
    ...motionProperties(['svg'], defaultProps, 'react-spring'),
    {
        key: 'ariaLabel',
        flavors: ['svg'],
        group: 'Accessibility',
        help: 'Main element [aria-label](https://www.w3.org/TR/wai-aria/#aria-label).',
        type: 'string',
        required: false,
    },
    {
        key: 'ariaLabelledBy',
        flavors: ['svg'],
        group: 'Accessibility',
        help: 'Main element [aria-labelledby](https://www.w3.org/TR/wai-aria/#aria-labelledby).',
        type: 'string',
        required: false,
    },
    {
        key: 'ariaDescribedBy',
        flavors: ['svg'],
        group: 'Accessibility',
        help: 'Main element [aria-describedby](https://www.w3.org/TR/wai-aria/#aria-describedby).',
        type: 'string',
        required: false,
    },
]

export const groups = groupProperties(props)
