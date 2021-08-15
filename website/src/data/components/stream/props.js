import { areaCurvePropKeys, stackOrderPropKeys, stackOffsetPropKeys } from '@nivo/core'
import { defaultProps, svgDefaultProps } from '@nivo/stream'
import {
    themeProperty,
    axesProperties,
    motionProperties,
    defsProperties,
    groupProperties,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        help: 'Chart data.',
        type: 'object[]',
        required: true,
        group: 'Base',
    },
    {
        key: 'keys',
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
        type: 'string | number',
        required: true,
        group: 'Base',
    },
    {
        key: 'label',
        help: 'Label accessor, used for legends.',
        description: `
            Define how to access the label of each layer,
            by default, nivo will use the corresponding key defined
            in \`keys\`, it is available under the \`id\` property
            of the layer.
        `,
        type: 'string | (layer) => string | number',
        required: false,
        defaultValue: defaultProps.label,
        group: 'Base',
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
        key: 'offsetType',
        help: 'Offset type.',
        type: 'string',
        required: false,
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: stackOffsetPropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'order',
        help: 'Layers order.',
        type: 'string',
        required: false,
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: stackOrderPropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'curve',
        description: `
            Defines the curve factory to use
            for the area generator.
        `,
        help: 'Curve interpolation.',
        type: 'string',
        required: false,
        defaultValue: defaultProps.curve,
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: areaCurvePropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        description: `
            not required if using
            \`<ResponsiveStream/>\`.
        `,
        help: 'Chart width.',
        type: '{number}',
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
            not required if using
            \`<ResponsiveStream/>\`.
        `,
        help: 'Chart height.',
        type: '{number}',
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
        help: 'Defines how to compute line color.',
        type: 'string | Function',
        required: false,
        defaultValue: defaultProps.colors,
        controlType: 'ordinalColors',
        group: 'Style',
    },
    {
        key: 'fillOpacity',
        help: 'Layers fill opacity.',
        type: 'number',
        required: false,
        defaultValue: defaultProps.fillOpacity,
        controlType: 'opacity',
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Width of layer border.',
        type: 'number',
        required: false,
        defaultValue: defaultProps.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        description: `
            How to compute border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        help: 'Method to compute layer border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.borderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    ...defsProperties('Style'),
    {
        key: 'layers',
        flavors: ['svg', 'canvas'],
        help: 'Defines the order of layers.',
        description: `
            Defines the order of layers, available layers are:
            \`grid\`, \`axes\`, \`layers\`, \`dots\`, \`slices\`, \`legends\`.

            You can also use this to insert extra layers to the chart,
            this extra layer must be a function which will receive
            the chart computed data and must return a valid SVG element.
        `,
        type: 'Array<string | Function>',
        required: false,
        defaultValue: svgDefaultProps.layers,
        group: 'Customization',
    },
    {
        key: 'enableGridX',
        help: 'Enable/disable x grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.enableGridX,
        controlType: 'switch',
        group: 'Grid & Axes',
    },
    {
        key: 'enableGridY',
        help: 'Enable/disable y grid.',
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.enableGridY,
        controlType: 'switch',
        group: 'Grid & Axes',
    },
    ...axesProperties(),
    {
        key: 'enableDots',
        help: 'Enable/disable dots.',
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.enableDots,
        controlType: 'switch',
        group: 'Dots',
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
        help: 'Size of the dots',
        description:
            'Size of the dots, it also accepts a function which can be used to make it vary according to the associated datum.',
        type: 'number | Function',
        required: false,
        defaultValue: defaultProps.dotSize,
        controlType: 'range',
        group: 'Dots',
        controlOptions: {
            unit: 'px',
            min: 2,
            max: 20,
        },
    },
    {
        key: 'dotColor',
        help: 'Method to compute dots color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.dotColor,
        controlType: 'inheritedColor',
        group: 'Dots',
    },
    {
        key: 'dotBorderWidth',
        help: 'Width of the dots border.',
        description:
            'Width of the dots border, it also accepts a function which can be used to make it vary according to the associated datum.',
        type: 'number | Function',
        required: false,
        defaultValue: defaultProps.dotBorderWidth,
        controlType: 'lineWidth',
        group: 'Dots',
    },
    {
        key: 'dotBorderColor',
        help: 'Method to compute dots border color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.dotBorderColor,
        controlType: 'inheritedColor',
        group: 'Dots',
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
        key: 'enableStackTooltip',
        flavors: ['svg'],
        help: `Enable/disable stack tooltip ('isInteractive' must also be 'true').`,
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.enableStackTooltip,
        controlType: 'switch',
        group: 'Interactivity',
    },
    ...motionProperties(['svg'], defaultProps, 'react-spring'),
    {
        key: 'ariaLabel',
        flavors: ['svg'],
        group: 'Accessibility',
        help: 'Main element [aria-label](https://www.w3.org/TR/wai-aria/#aria-label).',
        type: 'string',
    },
    {
        key: 'ariaLabelledBy',
        flavors: ['svg'],
        group: 'Accessibility',
        help: 'Main element [aria-labelledby](https://www.w3.org/TR/wai-aria/#aria-labelledby).',
        type: 'string',
    },
    {
        key: 'ariaDescribedBy',
        flavors: ['svg'],
        group: 'Accessibility',
        help: 'Main element [aria-describedby](https://www.w3.org/TR/wai-aria/#aria-describedby).',
        type: 'string',
    },
]

export const groups = groupProperties(props)
