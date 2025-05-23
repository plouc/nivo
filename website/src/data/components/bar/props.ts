import { svgDefaultProps } from '@nivo/bar'
import {
    themeProperty,
    motionProperties,
    defsProperties,
    getLegendsProps,
    groupProperties,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    ordinalColors,
    chartGrid,
    axes,
    isInteractive,
    commonAccessibilityProps,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas', 'api']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        type: 'object[]',
        required: true,
        flavors: allFlavors,
    },
    {
        key: 'indexBy',
        group: 'Base',
        help: 'Key to use to index the data.',
        description: `
            Key to use to index the data,
            this key must exist in each data item.

            You can also provide a function which will
            receive the data item and must return the desired index.
        `,
        type: 'string | (datum: RawDatum): string | number',
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.indexBy,
    },
    {
        key: 'keys',
        group: 'Base',
        help: 'Keys to use to determine each series, these keys should point to a numeric value.',
        type: 'string[]',
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.keys,
    },
    {
        key: 'groupMode',
        group: 'Base',
        help: `How to group bars.`,
        type: `'grouped' | 'stacked'`,
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.groupMode,
        control: {
            type: 'radio',
            choices: [
                { label: 'stacked', value: 'stacked' },
                { label: 'grouped', value: 'grouped' },
            ],
        },
    },
    {
        key: 'layout',
        group: 'Base',
        help: `How to display bars.`,
        type: `'horizontal' | 'vertical'`,
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.layout,
        control: {
            type: 'radio',
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'valueScale',
        group: 'Base',
        type: 'ScaleSpec',
        help: `
            Value scale configuration. Supports [linear](self:/guides/scales/#linear-scale),
            and [symlog](self:/guides/scales/#symlog-scale) scales.

            Please refer to our [guide](self:/guides/scales/)
            to help you pick the right scale for your data.
        `,
        defaultValue: svgDefaultProps.valueScale,
        flavors: allFlavors,
        required: false,
        control: {
            type: 'scale',
            allowedTypes: ['linear', 'symlog'],
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
        flavors: allFlavors,
        type: 'string | ((value: number) => string)',
        control: { type: 'valueFormat' },
    },
    {
        key: 'indexScale',
        group: 'Base',
        type: 'BandScaleSpec',
        help: `
            Index [scale](self:/guides/scales/) configuration,
            supports [band](self:/guides/scales/#band-scale) type only.
        `,
        defaultValue: svgDefaultProps.indexScale,
        flavors: allFlavors,
        required: false,
        control: {
            type: 'scale',
            allowedTypes: ['band'],
        },
    },
    {
        key: 'padding',
        help: 'Padding between each bar (ratio).',
        type: 'number',
        required: false,
        flavors: allFlavors,
        defaultValue: svgDefaultProps.padding,
        group: 'Base',
        control: {
            type: 'range',
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
        flavors: allFlavors,
        defaultValue: svgDefaultProps.innerPadding,
        group: 'Base',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 10,
        },
    },
    ...chartDimensions(allFlavors),
    chartRef(['svg', 'canvas']),
    themeProperty(allFlavors),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: svgDefaultProps.colors,
    }),
    {
        key: 'colorBy',
        type: `'id' | 'indexValue'`,
        help: 'Property used to determine node color.',
        description: `
            Property to use to determine node color.
        `,
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.colorBy,
        group: 'Style',
        control: {
            type: 'choices',
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
        flavors: ['svg', 'canvas', 'api'],
        required: false,
        defaultValue: svgDefaultProps.borderRadius,
        group: 'Style',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        key: 'borderWidth',
        help: 'Width of bar border.',
        type: 'number',
        flavors: ['svg', 'canvas', 'api'],
        required: false,
        defaultValue: svgDefaultProps.borderWidth,
        group: 'Style',
        control: { type: 'lineWidth' },
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        description: `
            how to compute border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        flavors: ['svg', 'canvas', 'api'],
        required: false,
        defaultValue: svgDefaultProps.borderColor,
        group: 'Style',
        control: { type: 'inheritedColor' },
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
        flavors: ['svg', 'canvas', 'api'],
        required: false,
        defaultValue: svgDefaultProps.enableLabel,
        group: 'Labels',
        control: { type: 'switch' },
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
        flavors: ['svg', 'canvas', 'api'],
        required: false,
        defaultValue: svgDefaultProps.label,
    },
    {
        key: 'labelSkipWidth',
        help: 'Skip label if bar width is lower than provided value, ignored if 0.',
        type: 'number',
        flavors: ['svg', 'canvas', 'api'],
        required: false,
        defaultValue: svgDefaultProps.labelSkipWidth,
        group: 'Labels',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        key: 'labelSkipHeight',
        help: 'Skip label if bar height is lower than provided value, ignored if 0.',
        type: 'number',
        flavors: ['svg', 'canvas', 'api'],
        required: false,
        defaultValue: svgDefaultProps.labelSkipHeight,
        group: 'Labels',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 36,
        },
    },
    {
        key: 'labelTextColor',
        help: 'Defines how to compute label text color.',
        type: 'string | object | Function',
        flavors: ['svg', 'canvas', 'api'],
        required: false,
        defaultValue: svgDefaultProps.labelTextColor,
        control: { type: 'inheritedColor' },
        group: 'Labels',
    },
    {
        key: 'labelPosition',
        help: 'Defines the position of the label relative to its bar.',
        type: `'start' | 'middle' | 'end'`,
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.labelPosition,
        control: {
            type: 'radio',
            choices: [
                { label: 'start', value: 'start' },
                { label: 'middle', value: 'middle' },
                { label: 'end', value: 'end' },
            ],
            columns: 3,
        },
        group: 'Labels',
    },
    {
        key: 'labelOffset',
        help: 'Defines the vertical or horizontal (depends on layout) offset of the label.',
        type: 'number',
        flavors: ['svg', 'canvas', 'api'],
        required: false,
        defaultValue: svgDefaultProps.labelOffset,
        control: {
            type: 'range',
            unit: 'px',
            min: -16,
            max: 16,
        },
        group: 'Labels',
    },
    {
        key: 'enableTotals',
        help: 'Enable/disable totals labels.',
        type: 'boolean',
        flavors: ['svg', 'canvas', 'api'],
        required: false,
        defaultValue: svgDefaultProps.enableTotals,
        group: 'Labels',
        control: { type: 'switch' },
    },
    {
        key: 'totalsOffset',
        help: 'Offset from the bar edge for the total label.',
        type: 'number',
        flavors: ['svg', 'canvas', 'api'],
        required: false,
        defaultValue: svgDefaultProps.totalsOffset,
        group: 'Labels',
        control: {
            type: 'range',
            unit: 'px',
            min: 0,
            max: 40,
        },
    },
    ...chartGrid({
        flavors: allFlavors,
        xDefault: svgDefaultProps.enableGridX,
        yDefault: svgDefaultProps.enableGridY,
        values: true,
    }),
    ...axes({ flavors: allFlavors }),
    isInteractive({
        flavors: ['svg', 'canvas'],
        defaultValue: svgDefaultProps.isInteractive,
    }),
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
        required: false,
        control: { type: 'switch' },
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
        required: false,
        control: {
            type: 'array',
            props: getLegendsProps(['svg']),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            getItemTitle: (index: number, legend: any) =>
                `legend[${index}]: ${legend.anchor}, ${legend.direction}`,
            defaults: {
                dataFrom: 'keys',
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 2,
                symbolSize: 20,
                itemDirection: 'left-to-right',
                onClick: (data: any) => {
                    console.log(JSON.stringify(data, null, '    '))
                },
            },
        },
    },
    {
        key: 'isFocusable',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: 'Make the root SVG element and each bar item focusable, for keyboard navigation.',
        description: `
            If enabled, focusing will also reveal the tooltip if \`isInteractive\` is \`true\`,
            when a bar gains focus and hide it on blur.
            
            Also note that if this option is enabled, focusing a bar will reposition the tooltip
            at a fixed location.
        `,
        type: 'boolean',
        control: { type: 'switch' },
    },
    ...commonAccessibilityProps(['svg']),
    {
        key: 'barAriaLabel',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: '[aria-label](https://www.w3.org/TR/wai-aria/#aria-label) for bar items.',
        type: '(data) => string',
    },
    {
        key: 'barAriaLabelledBy',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: '[aria-labelledby](https://www.w3.org/TR/wai-aria/#aria-labelledby) for bar items.',
        type: '(data) => string',
    },
    {
        key: 'barAriaDescribedBy',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: '[aria-describedby](https://www.w3.org/TR/wai-aria/#aria-describedby) for bar items.',
        type: '(data) => string',
    },
    {
        key: 'barAriaHidden',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: '[aria-hidden](https://www.w3.org/TR/wai-aria/#aria-hidden) for bar items.',
        type: '(data) => boolean',
    },
    {
        key: 'barAriaDisabled',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: '[aria-disabled](https://www.w3.org/TR/wai-aria/#aria-disabled) for bar items.',
        type: '(data) => boolean',
    },
    ...motionProperties(['svg'], svgDefaultProps),
]

export const groups = groupProperties(props)
