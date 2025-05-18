import { commonDefaultProps as defaults, svgDefaultProps as svgDefaults } from '@nivo/heatmap'
import { themeProperty, motionProperties, groupProperties } from '../../../lib/componentProperties'
import {
    chartDimensions,
    chartRef,
    chartGrid,
    axes,
    isInteractive,
    commonAccessibilityProps,
    annotations,
} from '../../../lib/chart-properties'
import { ChartProperty, Flavor } from '../../../types'

const allFlavors: Flavor[] = ['svg', 'canvas', 'api']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data.',
        type: 'HeatMapSerie<Datum, ExtraProps>[]',
        required: true,
        description: `
        The default expected type is:
        
        \`\`\`
        {
            id: string
            data: {
                x: string | number
                y: number | null
            }[]
        }[]
        \`\`\`
        
        Please note that each serie **MUST** have the same length.
        `,
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
        type: 'string | (value: number) => string | number',
        control: { type: 'valueFormat' },
    },
    ...chartDimensions(allFlavors),
    {
        key: 'forceSquare',
        help: 'Force square cells (width = height), please note that **padding is ignored**.',
        defaultValue: defaults.forceSquare,
        type: 'boolean',
        control: { type: 'switch' },
        group: 'Base',
    },
    {
        key: 'xOuterPadding',
        defaultValue: defaults.xOuterPadding,
        type: 'number',
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'xInnerPadding',
        defaultValue: defaults.xInnerPadding,
        type: 'number',
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'yOuterPadding',
        flavors: allFlavors,
        defaultValue: defaults.yOuterPadding,
        type: 'number',
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'yInnerPadding',
        defaultValue: defaults.yInnerPadding,
        type: 'number',
        group: 'Base',
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'sizeVariation',
        help: 'Optionally make the size of the cells vary depending on their value.',
        description: `
        To enable this feature, you can use the following config:
        
        \`\`\`
        interface SizeVariationConfig {
            // use auto min/max values if unspecified
            values?: [min: number, max: number]
            // expressed as a range from 0~1
            sizes: [min: number, max: number]
        }
        \`\`\`
        `,
        defaultValue: defaults.sizeVariation,
        type: 'false | SizeVariationConfig',
        group: 'Base',
    },
    chartRef(['svg', 'canvas']),
    themeProperty(allFlavors),
    {
        key: 'colors',
        group: 'Style',
        type: 'ContinuousColorScaleConfig | ((datum) => string)',
        defaultValue: defaults.colors,
        control: {
            type: 'continuous_colors',
        },
    },
    {
        key: 'emptyColor',
        group: 'Style',
        help: 'Color to use for cells not having a value.',
        type: 'string',
        defaultValue: defaults.emptyColor,
        control: { type: 'colorPicker' },
    },
    {
        key: 'opacity',
        group: 'Style',
        defaultValue: defaults.opacity,
        type: 'number',
        control: { type: 'opacity' },
    },
    {
        key: 'activeOpacity',
        group: 'Style',
        flavors: ['svg', 'canvas'],
        defaultValue: defaults.activeOpacity,
        type: 'number',
        control: { type: 'opacity' },
    },
    {
        key: 'inactiveOpacity',
        group: 'Style',
        flavors: ['svg', 'canvas'],
        defaultValue: defaults.inactiveOpacity,
        type: 'number',
        control: { type: 'opacity' },
    },
    {
        key: 'borderRadius',
        group: 'Style',
        help: 'Cell border radius, when using `rect`.',
        flavors: ['svg', 'api'],
        defaultValue: svgDefaults.borderRadius,
        type: 'number',
        control: { type: 'range', min: 0, max: 16 },
    },
    {
        key: 'borderWidth',
        group: 'Style',
        defaultValue: defaults.borderWidth,
        type: 'number',
        control: { type: 'lineWidth' },
    },
    {
        key: 'borderColor',
        group: 'Style',
        description: `
            how to compute cell border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'InheritedColorConfig<ComputedCell>',
        defaultValue: defaults.borderColor,
        control: { type: 'inheritedColor' },
    },
    {
        key: 'enableLabels',
        help: 'Enable/disable labels.',
        type: 'boolean',
        defaultValue: defaults.enableLabels,
        control: { type: 'switch' },
        group: 'Labels',
    },
    {
        key: 'label',
        help: 'Define what to use as a label.',
        type: 'PropertyAccessor',
        defaultValue: defaults.label,
        group: 'Labels',
    },
    {
        key: 'labelTextColor',
        description: `
            how to compute label text color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        defaultValue: defaults.labelTextColor,
        control: { type: 'inheritedColor' },
        group: 'Labels',
    },
    ...chartGrid({
        flavors: allFlavors,
        xDefault: defaults.enableGridX,
        yDefault: defaults.enableGridY,
    }),
    ...axes({ flavors: allFlavors }),
    {
        key: 'legends',
        group: 'Legends',
        help: 'Please note that **legends are ignored when using a custom function** for `colors`.',
        type: `ContinuousColorsLegendProps[]`,
        control: {
            type: 'array',
            shouldCreate: true,
            shouldRemove: true,
            defaults: {
                anchor: 'center',
                translateX: 0,
                translateY: 0,
                length: 320,
                thickness: 8,
                direction: 'row',
                tickPosition: 'after',
                tickSize: 3,
                tickSpacing: 4,
                tickOverlap: false,
                tickFormat: { format: '>-.2s', enabled: true },
                title: 'New Legend',
                titleAlign: 'start',
                titleOffset: 4,
            },
            props: [
                {
                    key: 'anchor',
                    type: 'LegendAnchor',
                    control: { type: 'boxAnchor' },
                },
                {
                    key: 'translateX',
                    type: 'number',
                    control: {
                        type: 'range',
                        min: -200,
                        max: 200,
                    },
                },
                {
                    key: 'translateY',
                    type: 'number',
                    control: {
                        type: 'range',
                        min: -200,
                        max: 200,
                    },
                },
                {
                    key: 'length',
                    type: 'number',
                    control: {
                        type: 'range',
                        min: 60,
                        max: 500,
                    },
                },
                {
                    key: 'thickness',
                    type: 'number',
                    control: {
                        type: 'range',
                        min: 6,
                        max: 32,
                    },
                },
                {
                    key: 'direction',
                    type: `'row' | 'column'`,
                    control: {
                        type: 'radio',
                        choices: [
                            {
                                label: 'row',
                                value: 'row',
                            },
                            {
                                label: 'column',
                                value: 'column',
                            },
                        ],
                    },
                },
                {
                    key: 'tickPosition',
                    type: `'before' | 'after'`,
                    control: {
                        type: 'radio',
                        choices: [
                            {
                                label: 'before',
                                value: 'before',
                            },
                            {
                                label: 'after',
                                value: 'after',
                            },
                        ],
                    },
                },
                {
                    key: 'tickSize',
                    type: 'number',
                    control: {
                        type: 'range',
                        min: 0,
                        max: 12,
                    },
                },
                {
                    key: 'tickSpacing',
                    type: 'number',
                    control: {
                        type: 'range',
                        min: 0,
                        max: 12,
                    },
                },
                {
                    key: 'tickOverlap',
                    type: 'boolean',
                    control: { type: 'switch' },
                },
                {
                    key: 'tickFormat',
                    type: 'string | (value: number) => string | number',
                    control: { type: 'valueFormat' },
                },
                {
                    key: 'title',
                    type: 'string',
                    control: { type: 'text' },
                },
                {
                    key: 'titleAlign',
                    type: `'start' | 'middle' | 'end'`,
                    control: {
                        type: 'radio',
                        columns: 3,
                        choices: [
                            {
                                label: 'start',
                                value: 'start',
                            },
                            {
                                label: 'middle',
                                value: 'middle',
                            },
                            {
                                label: 'end',
                                value: 'end',
                            },
                        ],
                    },
                },
                {
                    key: 'titleOffset',
                    type: 'number',
                    control: {
                        type: 'range',
                        min: 0,
                        max: 12,
                    },
                },
            ],
        },
    },
    {
        key: 'layers',
        type: `('grid' | 'axes' | 'cells' | CustomLayer | CustomCanvasLayer)[]`,
        group: 'Customization',
        help: 'Defines the order of layers and add custom layers, please use the appropriate variant for custom layers.',
        defaultValue: defaults.layers,
        flavors: ['svg', 'canvas'],
    },
    {
        key: 'cellComponent',
        group: 'Customization',
        type: `'rect' | 'circle' | CellComponent`,
        help: 'Cell component, the API does not support `CellComponent`.',
        flavors: ['svg', 'api'],
        defaultValue: 'rect',
        control: {
            type: 'choices',
            choices: ['rect', 'circle'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'renderCell',
        group: 'Customization',
        type: `'rect' | 'circle' | CellCanvasRenderer`,
        help: 'Cell renderer for canvas implementation.',
        flavors: ['canvas'],
        defaultValue: 'rect',
        control: {
            type: 'choices',
            choices: ['rect', 'circle', 'customRenderCell'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    isInteractive({
        flavors: ['svg', 'canvas'],
        defaultValue: defaults.isInteractive,
    }),
    {
        key: 'tooltip',
        group: 'Interactivity',
        type: 'TooltipComponent',
        help: 'Custom tooltip component.',
        flavors: ['svg', 'canvas'],
        description: `
            An optional component allowing complete tooltip customisation,
            it must return a valid HTML element and will receive
            the cell's data as a property.
        `,
    },
    {
        key: 'onMouseEnter',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(cell: ComputedCell, event: MouseEvent) => void',
    },
    {
        key: 'onMouseMove',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(cell: ComputedCell, event: MouseEvent) => void',
    },
    {
        key: 'onMouseLeave',
        flavors: ['svg'],
        group: 'Interactivity',
        type: '(cell: ComputedCell, event: MouseEvent) => void',
    },
    {
        key: 'onClick',
        flavors: ['svg', 'canvas'],
        group: 'Interactivity',
        type: '(cell: ComputedCell, event: MouseEvent) => void',
    },
    {
        key: 'hoverTarget',
        flavors: ['svg', 'canvas'],
        help: 'Defines hover behavior.',
        description: `
            Defines hover behavior:

            - **cell**: highlight the current cell
            - **row**: highlight the current cell's row
            - **column**: highlight the current cell's column
            - **rowColumn**: highlight the current cell's row & column
        `,
        defaultValue: defaults.hoverTarget,
        type: 'string',
        group: 'Interactivity',
        control: {
            type: 'choices',
            choices: ['cell', 'row', 'column', 'rowColumn'].map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    annotations({
        target: 'nodes',
        flavors: allFlavors,
        createDefaults: {
            type: 'rect',
            match: { id: 'Germany.Bus' },
            note: 'Bus in Germany',
            noteX: 120,
            noteY: -130,
            offset: 6,
            noteTextOffset: 5,
        },
    }),
    ...commonAccessibilityProps(allFlavors),
    ...motionProperties(['svg', 'canvas'], defaults),
]

export const groups = groupProperties(props)
