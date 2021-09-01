import { svgDefaultProps } from '@nivo/bar'
import {
    themeProperty,
    axesProperties,
    motionProperties,
    defsProperties,
    getLegendsProps,
    groupProperties,
} from '../../../lib/componentProperties'
import { ChartProperty } from '../../../types'

const props: ChartProperty[] = [
    {
        key: 'data',
        help: 'Chart data.',
        type: 'object[]',
        required: true,
        group: 'Base',
    },
    {
        key: 'indexBy',
        help: 'Key to use to index the data.',
        description: `
            Key to use to index the data,
            this key must exist in each data item.

            You can also provide a function which will
            receive the data item and must return the desired index.
        `,
        type: 'string | (datum: RawDatum): string | number',
        required: false,
        defaultValue: svgDefaultProps.indexBy,
        group: 'Base',
    },
    {
        key: 'keys',
        help: 'Keys to use to determine each serie.',
        type: 'string[]',
        required: false,
        defaultValue: svgDefaultProps.keys,
        group: 'Base',
    },
    {
        key: 'groupMode',
        help: `How to group bars.`,
        type: 'grouped | stacked',
        required: false,
        defaultValue: svgDefaultProps.groupMode,
        controlType: 'radio',
        group: 'Base',
        controlOptions: {
            choices: [
                { label: 'stacked', value: 'stacked' },
                { label: 'grouped', value: 'grouped' },
            ],
        },
    },
    {
        key: 'layout',
        help: `How to display bars.`,
        type: 'horizontal | vertical',
        required: false,
        defaultValue: svgDefaultProps.layout,
        controlType: 'radio',
        group: 'Base',
        controlOptions: {
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'valueScale',
        type: 'object',
        group: 'Base',
        help: `value scale configuration.`,
        defaultValue: svgDefaultProps.valueScale,
        controlType: 'object',
        controlOptions: {
            props: [
                {
                    key: 'type',
                    help: `Scale type.`,
                    type: 'string',
                    controlType: 'choices',
                    controlOptions: {
                        disabled: true,
                        choices: ['linear', 'symlog'].map(v => ({
                            label: v,
                            value: v,
                        })),
                    },
                },
            ],
        },
    },
    {
        key: 'indexScale',
        type: 'object',
        group: 'Base',
        help: `index scale configuration.`,
        defaultValue: svgDefaultProps.indexScale,
        controlType: 'object',
        controlOptions: {
            props: [
                {
                    key: 'type',
                    help: `Scale type.`,
                    type: 'string',
                    controlType: 'choices',
                    controlOptions: {
                        disabled: true,
                        choices: ['band'].map(v => ({
                            label: v,
                            value: v,
                        })),
                    },
                },
                {
                    key: 'round',
                    help: 'Toggle index scale (for bar width) rounding.',
                    type: 'boolean',
                    controlType: 'switch',
                },
            ],
        },
    },
    {
        key: 'reverse',
        help:
            'Reverse bars, starts on top instead of bottom for vertical layout and right instead of left for horizontal one.',
        type: 'boolean',
        required: false,
        defaultValue: svgDefaultProps.reverse,
        controlType: 'switch',
        group: 'Base',
    },
    {
        key: 'minValue',
        help: 'Minimum value.',
        description: `
            Minimum value, if 'auto',
            will use min value from the provided data.
        `,
        required: false,
        defaultValue: svgDefaultProps.minValue,
        type: `number | 'auto'`,
        controlType: 'switchableRange',
        group: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: -1000,
            min: -1000,
            max: 0,
        },
    },
    {
        key: 'maxValue',
        help: 'Maximum value.',
        description: `
            Maximum value, if 'auto',
            will use max value from the provided data.
        `,
        required: false,
        defaultValue: svgDefaultProps.maxValue,
        type: `number | 'auto'`,
        controlType: 'switchableRange',
        group: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 1000,
            min: 0,
            max: 1000,
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
        type: 'string | (value: number) => string | number',
        controlType: 'valueFormat',
    },
    {
        key: 'padding',
        help: 'Padding between each bar (ratio).',
        type: 'number',
        required: false,
        defaultValue: svgDefaultProps.padding,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 0,
            max: 0.9,
            step: 0.05,
        },
    },
    {
        key: 'innerPadding',
        help: 'Padding between grouped/stacked bars.',
        type: 'number',
        required: false,
        defaultValue: svgDefaultProps.innerPadding,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 10,
        },
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using \`ResponsiveBar\`.
            Also note that width exclude left/right axes,
            please add margin to make sure they're visible.
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
            not required if using \`ResponsiveBar\`.
            Also note that width exclude left/right axes,
            please add margin to make sure they're visible.
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
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    themeProperty(['svg', 'canvas', 'api']),
    {
        key: 'colors',
        help: 'Defines color range.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: svgDefaultProps.colors,
        controlType: 'ordinalColors',
        group: 'Style',
    },
    {
        key: 'colorBy',
        type: `'id' | 'indexValue'`,
        help: 'Property used to determine node color.',
        description: `
            Property to use to determine node color.
        `,
        required: false,
        defaultValue: svgDefaultProps.colorBy,
        controlType: 'choices',
        group: 'Style',
        controlOptions: {
            choices: [
                {
                    label: 'id',
                    value: 'id',
                },
                {
                    label: 'indexValue',
                    value: 'indexValue',
                },
            ],
        },
    },
    {
        key: 'borderRadius',
        help: 'Rectangle border radius.',
        type: 'number',
        required: false,
        defaultValue: svgDefaultProps.borderRadius,
        controlType: 'range',
        group: 'Style',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        key: 'borderWidth',
        help: 'Width of bar border.',
        type: 'number',
        required: false,
        defaultValue: svgDefaultProps.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        description: `
            how to compute border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: svgDefaultProps.borderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'layers',
        flavors: ['svg', 'canvas'],
        help: 'Defines the order of layers.',
        description: `
            Defines the order of layers, available layers are:
            \`grid\`, \`axes\`, \`bars\`, \`markers\`, \`legends\`,
            \`annotations\`. The \`markers\` layer is not available
            in the canvas flavor.

            You can also use this to insert extra layers to the chart,
            this extra layer must be a function which will receive
            the chart computed data and must return a valid SVG
            element.
        `,
        type: 'Array<string | Function>',
        required: false,
        defaultValue: svgDefaultProps.layers,
        group: 'Customization',
    },
    {
        key: 'enableLabel',
        help: 'Enable/disable labels.',
        type: 'boolean',
        required: false,
        defaultValue: svgDefaultProps.enableLabel,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'label',
        group: 'Labels',
        help: 'Define how bar labels are computed.',
        description: `
            Define how bar labels are computed.

            By default it will use the bar's value.
            It accepts a string which will be used to access
            a specific bar data property, such as
            \`'value'\` or \`'id'\`.

            You can also use a funtion if you want to
            add more logic, this function will receive
            the current bar's data and must return
            the computed label which, depending on the context,
            should return a string or an svg element (Bar) or
            a string (BarCanvas). For example let's say you want
            to use a label with both the id and the value,
            you can achieve this with:
            \`\`\`
            label={d => \`\${d.id}: \${d.value}\`}
            \`\`\`
        `,
        type: 'string | Function',
        required: false,
        defaultValue: svgDefaultProps.label,
    },
    {
        key: 'labelSkipWidth',
        help: 'Skip label if bar width is lower than provided value, ignored if 0.',
        type: 'number',
        required: false,
        defaultValue: svgDefaultProps.labelSkipWidth,
        controlType: 'range',
        group: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        key: 'labelSkipHeight',
        help: 'Skip label if bar height is lower than provided value, ignored if 0.',
        type: 'number',
        required: false,
        defaultValue: svgDefaultProps.labelSkipHeight,
        controlType: 'range',
        group: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        key: 'labelTextColor',
        help: 'Defines how to compute label text color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: svgDefaultProps.labelTextColor,
        controlType: 'inheritedColor',
        group: 'Labels',
    },
    {
        key: 'enableGridX',
        group: 'Grid & Axes',
        help: 'Enable/disable x grid.',
        type: 'boolean',
        required: false,
        defaultValue: svgDefaultProps.enableGridX,
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
        defaultValue: svgDefaultProps.enableGridY,
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
        flavors: ['svg', 'canvas'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: svgDefaultProps.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'tooltip',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Tooltip custom component',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML element and will receive
            the following data:
            \`\`\`
            {
                bar: {
                    id:             string | number,
                    value:          number,
                    formattedValue: string,
                    index:          number,
                    indexValue:     string | number,
                    // datum associated to the current index (raw data)
                    data:           object
                },
                color: string,
                label: string
            }
            \`\`\`
            You can also customize the style of the tooltip
            using the \`theme.tooltip\` object.
        `,
    },
    {
        key: 'custom tooltip example',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: 'Showcase custom tooltip component.',
        type: 'boolean',
        controlType: 'switch',
    },
    {
        key: 'onClick',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'onClick handler',
        description: `
            onClick handler, will receive node data as first argument
            & event as second one. The node data has the following shape:

            \`\`\`
            {
                id:             string | number,
                value:          number,
                formattedValue: string,
                index:          number,
                indexValue:     string | number,
                color:          string,
                // datum associated to the current index (raw data)
                data:           object
            }
            \`\`\`
        `,
    },
    {
        key: 'legends',
        flavors: ['svg', 'canvas'],
        type: 'object[]',
        help: `Optional chart's legends.`,
        group: 'Legends',
        controlType: 'array',
        controlOptions: {
            props: getLegendsProps(['svg']),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            getItemTitle: (index, legend) =>
                `legend[${index}]: ${legend.anchor}, ${legend.direction}`,
            svgDefaultProps: {
                dataFrom: 'keys',
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
    ...motionProperties(['svg'], svgDefaultProps, 'react-spring'),
    {
        key: 'isFocusable',
        flavors: ['svg'],
        group: 'Accessibility',
        help: 'Make the root SVG element and each bar item focusable, for keyboard navigation.',
        description: `
            If enabled, focusing will also reveal the tooltip if \`isInteractive\` is \`true\`,
            when a bar gains focus and hide it on blur.
            
            Also note that if this option is enabled, focusing a bar will reposition the tooltip
            at a fixed location.
        `,
        type: 'boolean',
        controlType: 'switch',
    },
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
    {
        key: 'barAriaLabel',
        flavors: ['svg'],
        group: 'Accessibility',
        help: '[aria-label](https://www.w3.org/TR/wai-aria/#aria-label) for bar items.',
        type: '(data) => string',
    },
    {
        key: 'barAriaLabelledBy',
        flavors: ['svg'],
        group: 'Accessibility',
        help: '[aria-labelledby](https://www.w3.org/TR/wai-aria/#aria-labelledby) for bar items.',
        type: '(data) => string',
    },
    {
        key: 'barAriaDescribedBy',
        flavors: ['svg'],
        group: 'Accessibility',
        help: '[aria-describedby](https://www.w3.org/TR/wai-aria/#aria-describedby) for bar items.',
        type: '(data) => string',
    },
]

export const groups = groupProperties(props)
