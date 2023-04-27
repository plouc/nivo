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
        key: 'groupBy',
        help: 'How to group box plots belonging to the same series',
        type: 'string | function',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.groupBy,
        group: 'Base',
    },
    {
        key: 'groups',
        help: 'How to group box plots belonging to the same series',
        type: 'string[]',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.groups,
        group: 'Base',
    },
    {
        key: 'subGroupBy',
        help: 'How to group box plots belonging to the same series',
        type: 'string | function',
        flavors: allFlavors,
        defaultValue: svgDefaultProps.subGroupBy,
        group: 'Base',
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
    themeProperty(allFlavors),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: svgDefaultProps.colors,
    }),
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
    isInteractive({
        flavors: ['svg'],
        defaultValue: svgDefaultProps.isInteractive,
    }),
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
    ...motionProperties(['svg'], svgDefaultProps, 'react-spring'),
    ...commonAccessibilityProps(['svg']),
]

export const groups = groupProperties(props)
