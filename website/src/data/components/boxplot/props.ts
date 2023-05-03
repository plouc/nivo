import { svgDefaultProps } from '@nivo/boxplot'
import {
    themeProperty,
    motionProperties,
    defsProperties,
    getLegendsProps,
    groupProperties,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    ordinalColors,
    chartGrid,
    axes,
    isInteractive,
    commonAccessibilityProps,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg']

const props: ChartProperty[] = [
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
        defaultValue: svgDefaultProps.value,
    },
    {
        key: 'minValue',
        group: 'Base',
        help: 'Minimum value.',
        description: `
            Minimum value, if 'auto',
            will use min value from the provided data.
        `,
        required: false,
        flavors: allFlavors,
        defaultValue: svgDefaultProps.minValue,
        type: `number | 'auto'`,
        control: {
            type: 'switchableRange',
            disabledValue: 'auto',
            defaultValue: 0,
            min: -10,
            max: 10,
        },
    },
    {
        key: 'maxValue',
        group: 'Base',
        help: 'Maximum value.',
        description: `
            Maximum value, if 'auto',
            will use max value from the provided data.
        `,
        required: false,
        flavors: allFlavors,
        defaultValue: svgDefaultProps.maxValue,
        type: `number | 'auto'`,
        control: {
            type: 'switchableRange',
            disabledValue: 'auto',
            defaultValue: 10,
            min: 0,
            max: 20,
        },
    },
    {
        key: 'groupBy',
        help: 'How to group box plots belonging to the same series',
        type: 'string | function',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.groupBy,
        group: 'Base',
    },
    {
        key: 'groups',
        help: 'Specify the groups available, if omitted, it will be inferred from the provided data.',
        type: 'string[]',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.groups,
        group: 'Base',
    },
    {
        key: 'subGroupBy',
        help: 'Used for sub-grouping.',
        type: 'string | function',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.subGroupBy,
        group: 'Base',
    },
    {
        key: 'subGroups',
        help: 'Specify the sub-groups available, if omitted, it will be inferred from the provided data.',
        type: 'string[]',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.subGroups,
        group: 'Base',
    },
    {
        key: 'quantiles',
        group: 'Base',
        help: 'Quantiles',
        description: `
            Quantiles represent respectively:
            
            \`\`\`
            [
                0: minimum/lower fence,
                1: lower quartile/hinge,
                2: median/middle quartile,
                3: upper quartile/hinge,
                4: maximum/upper fence,
            ]
            \`\`\`
        `,
        type: '[number, number, number, number, number]',
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.quantiles,
        control: {
            type: 'numberArray',
            items: [
                {
                    label: 'minimum',
                    min: 0,
                    max: 1,
                    step: 0.05,
                },
                {
                    label: 'lower quartile',
                    min: 0,
                    max: 1,
                    step: 0.05,
                },
                {
                    label: 'median',
                    min: 0,
                    max: 1,
                    step: 0.05,
                },
                {
                    label: 'upper quartile',
                    min: 0,
                    max: 1,
                    step: 0.05,
                },
                {
                    label: 'maximum',
                    min: 0,
                    max: 1,
                    step: 0.05,
                },
            ],
        },
    },
    {
        key: 'layout',
        group: 'Base',
        help: `Chart layout.`,
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
        key: 'padding',
        help: 'Padding between each group or boxplot when there is a single group (ratio).',
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
        help: 'Padding between grouped boxplots.',
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
    themeProperty(allFlavors),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: svgDefaultProps.colors,
    }),
    {
        key: 'colorBy',
        group: 'Style',
        help: `How to assign individual colors, also impacts legends.`,
        type: `'group' | 'subGroup'`,
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.colorBy,
        control: {
            type: 'radio',
            choices: [
                { label: 'group', value: 'group' },
                { label: 'subGroup', value: 'subGroup' },
            ],
        },
    },
    {
        key: 'opacity',
        help: 'Opacity.',
        required: false,
        defaultValue: svgDefaultProps.opacity,
        type: 'number',
        flavors: allFlavors,
        control: { type: 'opacity' },
        group: 'Style',
    },
    {
        key: 'borderRadius',
        help: 'Interquartile Range box border radius.',
        type: 'number',
        flavors: allFlavors,
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
        help: 'Interquartile Range box border.',
        type: 'number',
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.borderWidth,
        group: 'Style',
        control: { type: 'lineWidth' },
    },
    {
        key: 'borderColor',
        help: 'Method to compute the Interquartile Range box border color.',
        description: `
            how to compute border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.borderColor,
        group: 'Style',
        control: { type: 'inheritedColor' },
    },
    {
        key: 'medianWidth',
        help: 'Median line width.',
        type: 'number',
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.medianWidth,
        group: 'Style',
        control: { type: 'lineWidth' },
    },
    {
        key: 'medianColor',
        help: 'Method to compute the median color.',
        description: `[see dedicated documentation](self:/guides/colors).`,
        type: 'string | object | Function',
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.medianColor,
        group: 'Style',
        control: { type: 'inheritedColor' },
    },
    {
        key: 'whiskerWidth',
        help: 'Whisker line width.',
        type: 'number',
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.borderWidth,
        group: 'Style',
        control: { type: 'lineWidth' },
    },
    {
        key: 'whiskerEndSize',
        help: 'Whisker end size.',
        type: 'number',
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.whiskerEndSize,
        group: 'Style',
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'whiskerColor',
        help: 'Method to compute the whiskers color.',
        description: `[see dedicated documentation](self:/guides/colors).`,
        type: 'string | object | Function',
        flavors: allFlavors,
        required: false,
        defaultValue: svgDefaultProps.whiskerColor,
        group: 'Style',
        control: { type: 'inheritedColor' },
    },
    ...defsProperties('Style', ['svg']),
    ...chartGrid({
        flavors: allFlavors,
        xDefault: svgDefaultProps.enableGridX,
        yDefault: svgDefaultProps.enableGridY,
        values: true,
    }),
    ...axes({ flavors: allFlavors }),
    {
        key: 'layers',
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            in the chart, the extra layer should be a valid React component,
            and will be passed to [\`createElement\`](https://react.dev/reference/react/createElement).
            
            It will receive the chart's context & computed data
            and must return a valid SVG element.
        `,
        flavors: allFlavors,
        required: false,
        type: 'Array<string | Function>',
        defaultValue: svgDefaultProps.layers,
    },
    {
        key: 'boxPlotComponent',
        group: 'Customization',
        help: 'Override the default box plot component.',
        required: false,
        type: 'React.FC<BoxPlotItemProps<RawDatum>>',
    },
    isInteractive({
        flavors: ['svg'],
        defaultValue: svgDefaultProps.isInteractive,
    }),
    {
        key: 'activeOpacity',
        help: 'Opacity when active.',
        required: false,
        defaultValue: svgDefaultProps.activeOpacity,
        type: 'number',
        flavors: allFlavors,
        control: { type: 'opacity' },
        group: 'Interactivity',
    },
    {
        key: 'inactiveOpacity',
        help: 'Opacity when inactive.',
        required: false,
        defaultValue: svgDefaultProps.inactiveOpacity,
        type: 'number',
        flavors: allFlavors,
        control: { type: 'opacity' },
        group: 'Interactivity',
    },
    {
        key: 'tooltip',
        flavors: allFlavors,
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Tooltip custom component',
        description: `
            A function allowing complete tooltip customisation,
            it must return a valid HTML element and will receive
            the boxplot summary.
        `,
    },
    {
        key: 'legends',
        flavors: allFlavors,
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
    ...motionProperties(['svg'], svgDefaultProps),
    ...commonAccessibilityProps(['svg']),
    {
        key: 'isFocusable',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: 'Make the root SVG element and each boxplot item focusable, for keyboard navigation.',
        type: 'boolean',
        control: { type: 'switch' },
    },
    {
        key: 'boxPlotAriaLabel',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: '[aria-label](https://www.w3.org/TR/wai-aria/#aria-label) for boxplot items.',
        type: '(data) => string',
    },
    {
        key: 'boxPlotAriaLabelledBy',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: '[aria-labelledby](https://www.w3.org/TR/wai-aria/#aria-labelledby) for boxplot items.',
        type: '(data) => string',
    },
    {
        key: 'boxPlotAriaDescribedBy',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: '[aria-describedby](https://www.w3.org/TR/wai-aria/#aria-describedby) for boxplot items.',
        type: '(data) => string',
    },
]

export const groups = groupProperties(props)
