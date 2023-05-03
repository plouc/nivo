// @ts-ignore
import { lineCurvePropKeys } from '@nivo/core'
// @ts-ignore
import { LineDefaultProps as defaults } from '@nivo/line'
import {
    themeProperty,
    motionProperties,
    getLegendsProps,
    groupProperties,
    defsProperties,
} from '../../../lib/componentProperties'
import {
    chartDimensions,
    ordinalColors,
    blendMode,
    chartGrid,
    axes,
    isInteractive,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas', 'api']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        flavors: allFlavors,
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
        `,
        required: true,
        type: 'object[]',
    },
    {
        key: 'xScale',
        type: 'object',
        flavors: allFlavors,
        group: 'Base',
        help: `X scale configuration.`,
        required: false,
        control: {
            type: 'object',
            props: [
                {
                    key: 'type',
                    help: `Scale type.`,
                    type: 'string',
                    required: true,
                    flavors: allFlavors,
                    control: {
                        type: 'choices',
                        disabled: true,
                        choices: ['linear', 'point'].map(v => ({
                            label: v,
                            value: v,
                        })),
                    },
                },
            ],
        },
    },
    {
        key: 'xFormat',
        group: 'Base',
        help: 'Optional formatter for x values.',
        flavors: allFlavors,
        description: `
            The formatted value can then be used for labels & tooltips.

            If you use a time scale, you must provide a time format
            as values are converted to Date objects.
            
            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        required: false,
        type: 'Function | string',
        control: { type: 'valueFormat' },
    },
    {
        key: 'yScale',
        type: 'object',
        help: `Y scale configuration.`,
        flavors: allFlavors,
        group: 'Base',
        required: false,
        control: {
            type: 'object',
            props: [
                {
                    key: 'type',
                    help: `Scale type.`,
                    type: 'string',
                    flavors: allFlavors,
                    required: true,
                    control: {
                        type: 'choices',
                        disabled: true,
                        choices: ['linear', 'point'].map(v => ({
                            label: v,
                            value: v,
                        })),
                    },
                },
                {
                    key: 'stacked',
                    help: 'Enable/disable stacked mode.',
                    flavors: allFlavors,
                    type: 'boolean',
                    required: false,
                    control: { type: 'switch' },
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
        key: 'yFormat',
        group: 'Base',
        flavors: allFlavors,
        help: 'Optional formatter for y values.',
        description: `
            The formatted value can then be used for labels & tooltips.

            If you use a time scale, you must provide a time format
            as values are converted to Date objects.
            
            Under the hood, nivo uses [d3-format](https://github.com/d3/d3-format),
            please have a look at it for available formats, you can also pass a function
            which will receive the raw value and should return the formatted one.
        `,
        required: false,
        type: 'Function | string',
        control: { type: 'valueFormat' },
    },
    ...chartDimensions(allFlavors),
    {
        key: 'curve',
        help: 'Curve interpolation.',
        flavors: allFlavors,
        description: `
            Defines the curve factory to use for the line generator.
        `,
        type: 'string',
        required: false,
        defaultValue: defaults.curve,
        group: 'Style',
        control: {
            type: 'choices',
            choices: lineCurvePropKeys.map((key: string) => ({
                label: key,
                value: key,
            })),
        },
    },
    themeProperty(['svg', 'canvas', 'api']),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: defaults.colors,
    }),
    {
        key: 'lineWidth',
        help: 'Line width.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.lineWidth,
        control: { type: 'lineWidth' },
        group: 'Style',
    },
    {
        key: 'enableArea',
        help: 'Enable/disable area below each line.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enableArea,
        control: { type: 'switch' },
        group: 'Style',
    },
    {
        key: 'areaBaselineValue',
        help: 'Define the value to be used for area baseline.',
        flavors: allFlavors,
        description: `
            Define the value to be used for area baseline.
            Please note that this value isn't the
            position of the baseline but the value used
            to compute it.
        `,
        type: 'number | string | Date',
        required: false,
        defaultValue: defaults.areaBaselineValue,
        group: 'Style',
        control: {
            type: 'range',
            min: 0,
            max: 200,
            step: 10,
        },
    },
    {
        key: 'areaOpacity',
        help: 'Area opacity (0~1), depends on enableArea.',
        flavors: allFlavors,
        required: false,
        defaultValue: defaults.areaOpacity,
        type: 'number',
        control: { type: 'opacity' },
        group: 'Style',
    },
    blendMode({
        key: 'areaBlendMode',
        target: 'areas',
        flavors: ['svg'],
        defaultValue: defaults.areaBlendMode,
    }),
    ...defsProperties('Style', ['svg']),
    {
        key: 'layers',
        group: 'Customization',
        type: '(string | Component)[]',
        flavors: allFlavors,
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this property to insert extra layers
            to the chart, this extra layer must be
            a function which will receive the chart
            computed data and must return a valid SVG element.
        `,
        required: false,
        defaultValue: defaults.layers,
    },
    {
        key: 'enablePoints',
        help: 'Enable/disable points.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: defaults.enablePoints,
        control: { type: 'switch' },
        group: 'Points',
    },
    {
        key: 'pointSymbol',
        flavors: ['svg'],
        help: 'Overrides default point circle. The function will receive `size`, `color`, `borderWidth` and `borderColor` props and must return a valid SVG element.',
        type: 'Function',
        required: false,
        group: 'Points',
    },
    {
        key: 'pointSize',
        help: 'Size of the points.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.pointSize,
        group: 'Points',
        control: {
            type: 'range',
            unit: 'px',
            min: 2,
            max: 20,
        },
    },
    {
        key: 'pointColor',
        help: 'Method to compute points color.',
        type: 'string | object | Function',
        flavors: allFlavors,
        required: false,
        defaultValue: defaults.pointColor,
        group: 'Points',
        control: { type: 'inheritedColor' },
    },
    {
        key: 'pointBorderWidth',
        help: 'Width of the points border.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: defaults.pointBorderWidth,
        group: 'Points',
        control: { type: 'lineWidth' },
    },
    {
        key: 'pointBorderColor',
        help: 'Method to compute points border color.',
        flavors: allFlavors,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaults.pointBorderColor,
        group: 'Points',
        control: { type: 'inheritedColor' },
    },
    {
        key: 'enablePointLabel',
        flavors: ['svg', 'api'],
        group: 'Points',
        help: 'Enable/disable points label.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.enablePointLabel,
        control: { type: 'switch' },
    },
    {
        key: 'pointLabel',
        flavors: ['svg', 'api'],
        group: 'Points',
        help: 'Property to use to determine point label. If a function is provided, it will receive current point data and should return the desired label.',
        type: 'string',
        required: false,
        control: {
            type: 'choices',
            choices: ['y', 'yFormatted', 'x', 'xFormatted', `d => \`\${d.x}: \${d.y}\``].map(
                choice => ({
                    label: choice,
                    value: choice,
                })
            ),
        },
    },
    {
        key: 'pointLabelYOffset',
        flavors: ['svg', 'api'],
        group: 'Points',
        help: 'Label Y offset from point shape.',
        type: 'number',
        required: false,
        defaultValue: -12,
        control: {
            type: 'range',
            unit: 'px',
            min: -24,
            max: 24,
        },
    },
    ...chartGrid({
        flavors: allFlavors,
        values: true,
        xDefault: defaults.enableGridX,
        yDefault: defaults.enableGridY,
    }),
    ...axes({ flavors: allFlavors }),
    isInteractive({
        flavors: ['svg', 'canvas'],
        defaultValue: defaults.isInteractive,
    }),
    {
        key: 'useMesh',
        flavors: ['svg'],
        help: 'Use a voronoi mesh to detect mouse interactions, enableSlices must be disabled',
        type: 'boolean',
        required: false,
        defaultValue: defaults.useMesh,
        control: { type: 'switch' },
        group: 'Interactivity',
    },
    {
        key: 'debugMesh',
        flavors: ['svg', 'canvas'],
        help: 'Display mesh used to detect mouse interactions (voronoi cells).',
        type: 'boolean',
        required: false,
        defaultValue: defaults.debugMesh,
        control: { type: 'switch' },
        group: 'Interactivity',
    },
    {
        key: 'onMouseEnter',
        flavors: ['svg'],
        group: 'Interactivity',
        help: `onMouseEnter handler, doesn't work with slice tooltip.`,
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'onMouseMove',
        flavors: ['svg'],
        group: 'Interactivity',
        help: `onMouseMove handler, doesn't work with slice tooltip.`,
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'onMouseLeave',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: `onMouseLeave handler, doesn't work with slice tooltip.`,
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'onClick',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: `onClick handler, doesn't work with slice tooltip.`,
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'tooltip',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: `Custom point tooltip`,
        type: 'Function',
        required: false,
    },
    {
        key: 'enableSlices',
        group: 'Interactivity',
        flavors: ['svg'],
        help: `Enable/disable slices tooltip for x or y axis, automatically disable mesh.`,
        type: `'x' | 'y' | false`,
        required: false,
        defaultValue: defaults.enableSlicesTooltip,
        control: {
            type: 'choices',
            choices: [
                {
                    label: 'false',
                    value: false,
                },
                {
                    label: 'x',
                    value: 'x',
                },
                {
                    label: 'y',
                    value: 'y',
                },
            ],
        },
    },
    {
        key: 'debugSlices',
        flavors: ['svg'],
        help: 'Display area used to detect mouse interactions for slices.',
        type: 'boolean',
        required: false,
        defaultValue: defaults.debugSlices,
        control: { type: 'switch' },
        group: 'Interactivity',
    },
    {
        key: 'sliceTooltip',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        help: `Custom slice tooltip`,
        type: 'Function',
        required: false,
    },
    {
        key: 'enableCrosshair',
        flavors: ['svg'],
        group: 'Interactivity',
        help: 'Enable/disable crosshair.',
        type: 'boolean',
        required: false,
        control: { type: 'switch' },
        defaultValue: defaults.enableCrosshair,
    },
    {
        key: 'crosshairType',
        flavors: ['svg'],
        group: 'Interactivity',
        required: false,
        defaultValue: defaults.crosshairType,
        help: `Crosshair type, forced to slices axis if enabled.`,
        type: 'string',
        control: {
            type: 'choices',
            disabled: true,
            choices: [
                'x',
                'y',
                'top-left',
                'top',
                'top-right',
                'right',
                'bottom-right',
                'bottom',
                'bottom-left',
                'left',
                'cross',
            ].map(v => ({
                label: v,
                value: v,
            })),
        },
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
            props: getLegendsProps(['svg', 'canvas']),
            shouldCreate: true,
            addLabel: 'add legend',
            shouldRemove: true,
            getItemTitle: (index, legend: any) =>
                `legend[${index}]: ${legend.anchor}, ${legend.direction}`,
            defaults: {
                anchor: 'left',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 4,
                symbolSize: 20,
                symbolShape: 'circle',
                itemDirection: 'left-to-right',
                itemTextColor: '#777',
                onClick: (data: any) => {
                    console.log(JSON.stringify(data, null, '    '))
                },
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1,
                        },
                    },
                ],
            },
        },
    },
    ...motionProperties(['svg'], defaults),
]

export const groups = groupProperties(props)
