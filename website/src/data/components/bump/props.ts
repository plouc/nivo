import { bumpSvgDefaultProps as defaults } from '@nivo/bump'
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

const allFlavors: Flavor[] = ['svg']

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        type: 'BumpSerie<Datum, ExtraProps>[]',
        help: 'Chart data.',
        flavors: allFlavors,
        description: `
            Chart data, which must conform to this structure:

            \`\`\`
            {
                id:   string
                data: {
                    x: number | string
                    y: number | null
                }[]
            }[]
            \`\`\`

            This component assumes that every serie contains all
            x values sorted the same way they should appear on the chart.
            
            As this component is a TypeScript generic, it is possible to customize
            the datum using the \`Datum\` arg, and it's also possible to add
            some extra properties to the series by passing \`ExtraProps\`.
        `,
        required: true,
    },
    ...chartDimensions(allFlavors),
    {
        key: 'interpolation',
        group: 'Base',
        type: 'string',
        help: `Line interpolation.`,
        required: false,
        flavors: ['svg'],
        defaultValue: defaults.interpolation,
        control: {
            type: 'radio',
            choices: [
                { label: 'smooth', value: 'smooth' },
                { label: 'linear', value: 'linear' },
            ],
        },
    },
    {
        key: 'xPadding',
        group: 'Base',
        type: 'number',
        help: 'X padding.',
        defaultValue: defaults.xPadding,
        flavors: ['svg'],
        required: false,
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'xOuterPadding',
        group: 'Base',
        type: 'number',
        help: 'X outer padding.',
        defaultValue: defaults.xOuterPadding,
        flavors: ['svg'],
        required: false,
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    {
        key: 'yOuterPadding',
        group: 'Base',
        type: 'number',
        help: 'Y outer padding.',
        defaultValue: defaults.yOuterPadding,
        flavors: ['svg'],
        required: false,
        control: {
            type: 'range',
            min: 0,
            max: 1,
            step: 0.05,
        },
    },
    chartRef(['svg']),
    themeProperty(['svg']),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: defaults.colors,
    }),
    {
        key: 'lineWidth',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Line width.',
        flavors: ['svg'],
        required: false,
        defaultValue: defaults.lineWidth,
        control: { type: 'lineWidth' },
    },
    {
        key: 'activeLineWidth',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Line width for active series.',
        flavors: ['svg'],
        required: false,
        defaultValue: defaults.activeLineWidth,
        control: { type: 'lineWidth' },
    },
    {
        key: 'inactiveLineWidth',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Line width for inactive series.',
        defaultValue: defaults.inactiveLineWidth,
        flavors: ['svg'],
        required: false,
        control: { type: 'lineWidth' },
    },
    {
        key: 'opacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Opacity.',
        defaultValue: defaults.opacity,
        flavors: ['svg'],
        required: false,
        control: { type: 'opacity' },
    },
    {
        key: 'activeOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Opacity for active series.',
        defaultValue: defaults.activeOpacity,
        flavors: ['svg'],
        required: false,
        control: { type: 'opacity' },
    },
    {
        key: 'inactiveOpacity',
        group: 'Style',
        type: 'number | (serie: Serie) => number',
        help: 'Opacity for inactive series.',
        defaultValue: defaults.inactiveOpacity,
        flavors: ['svg'],
        required: false,
        control: { type: 'opacity' },
    },
    {
        key: 'startLabel',
        help: 'Start label, use a boolean to enable/disable, or a function to customize its text.',
        group: 'Labels',
        type: 'boolean | (serie: BumpSerie) => string',
        defaultValue: defaults.startLabel,
        flavors: ['svg'],
        required: false,
        control: { type: 'switch' },
    },
    {
        key: 'startLabelPadding',
        help: 'Start label padding.',
        group: 'Labels',
        type: 'number',
        defaultValue: defaults.startLabelPadding,
        flavors: ['svg'],
        required: false,
        control: {
            type: 'range',
            min: 0,
            max: 30,
        },
    },
    {
        key: 'startLabelTextColor',
        help: 'Method to compute start label text color, or a function to customize its text.',
        type: 'InheritedColorConfig<BumpComputedSerie>',
        required: false,
        flavors: ['svg'],
        defaultValue: defaults.startLabelTextColor,
        control: { type: 'inheritedColor' },
        group: 'Labels',
    },
    {
        key: 'endLabel',
        help: 'End label, use a boolean to enable/disable, or a function to customize its text.',
        group: 'Labels',
        type: 'boolean | (serie: BumpSerie) => string',
        defaultValue: defaults.endLabel,
        flavors: ['svg'],
        required: false,
        control: { type: 'switch' },
    },
    {
        key: 'endLabelPadding',
        help: 'End label padding.',
        group: 'Labels',
        type: 'number',
        defaultValue: defaults.endLabelPadding,
        flavors: ['svg'],
        required: false,
        control: {
            type: 'range',
            min: 0,
            max: 30,
        },
    },
    {
        key: 'endLabelTextColor',
        help: 'Method to compute end label text color.',
        type: 'InheritedColorConfig<BumpComputedSerie>',
        required: false,
        defaultValue: defaults.endLabelTextColor,
        flavors: ['svg'],
        control: { type: 'inheritedColor' },
        group: 'Labels',
    },
    {
        key: 'pointSize',
        group: 'Points',
        help: 'Point size.',
        type: 'number | Function',
        defaultValue: defaults.pointSize,
        flavors: ['svg'],
        required: false,
        control: {
            type: 'range',
            min: 0,
            max: 24,
        },
    },
    {
        key: 'activePointSize',
        group: 'Points',
        help: 'Point size for active series.',
        type: 'number | Function',
        defaultValue: defaults.activePointSize,
        flavors: ['svg'],
        required: false,
        control: {
            type: 'range',
            min: 0,
            max: 24,
        },
    },
    {
        key: 'inactivePointSize',
        group: 'Points',
        help: 'Point size for inactive series.',
        type: 'number | Function',
        defaultValue: defaults.inactivePointSize,
        flavors: ['svg'],
        required: false,
        control: {
            type: 'range',
            min: 0,
            max: 24,
        },
    },
    {
        key: 'pointColor',
        group: 'Points',
        type: 'string | object | Function',
        help: 'Method to compute point fill color.',
        defaultValue: defaults.pointColor,
        flavors: ['svg'],
        required: false,
        control: {
            type: 'inheritedColor',
            inheritableProperties: ['serie.color'],
            defaultFrom: 'serie.color',
        },
    },
    {
        key: 'pointBorderWidth',
        group: 'Points',
        help: 'Point border width.',
        type: 'number | Function',
        defaultValue: defaults.pointBorderWidth,
        flavors: ['svg'],
        required: false,
        control: { type: 'lineWidth' },
    },
    {
        key: 'activePointBorderWidth',
        group: 'Points',
        help: 'Point border width for active series.',
        type: 'number | Function',
        defaultValue: defaults.activePointBorderWidth,
        flavors: ['svg'],
        required: false,
        control: { type: 'lineWidth' },
    },
    {
        key: 'inactivePointBorderWidth',
        group: 'Points',
        help: 'Point border width for inactive series.',
        type: 'number | Function',
        defaultValue: defaults.inactivePointBorderWidth,
        flavors: ['svg'],
        required: false,
        control: { type: 'lineWidth' },
    },
    {
        key: 'pointBorderColor',
        group: 'Points',
        type: 'string | object | Function',
        help: 'Method to compute point border color.',
        defaultValue: defaults.pointBorderColor,
        flavors: ['svg'],
        required: false,
        control: {
            type: 'inheritedColor',
            inheritableProperties: ['color', 'serie.color'],
            defaultFrom: 'color',
        },
    },
    ...chartGrid({
        flavors: allFlavors,
        xDefault: defaults.enableGridX,
        yDefault: defaults.enableGridY,
    }),
    ...axes({ flavors: allFlavors }),
    isInteractive({
        flavors: ['svg'],
        defaultValue: defaults.isInteractive,
    }),
    {
        key: 'useMesh',
        flavors: ['svg'],
        help: 'Use a voronoi mesh to detect mouse interactions.',
        description: `
            Use a voronoi mesh to detect mouse interactions, using points rather than lines
            to detect interactions.

            In this mode, lines are still highlighted when hovering a point, but only
            the current point is being highlighted.
        `,
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
        group: 'Interactivity',
        type: '(data: (BumpComputedSerie | BumpPoint), event: MouseEvent) => void',
        help: 'onMouseEnter handler, for series by default, for points if `useMesh` is `true`.',
        required: false,
        flavors: ['svg'],
    },
    {
        key: 'onMouseMove',
        group: 'Interactivity',
        type: '(data: (BumpComputedSerie | BumpPoint), event: MouseEvent) => void',
        help: 'onMouseMove handler, for series by default, for points if `useMesh` is `true`.',
        required: false,
        flavors: ['svg'],
    },
    {
        key: 'onMouseLeave',
        group: 'Interactivity',
        type: '(data: (BumpComputedSerie | BumpPoint), event: MouseEvent) => void',
        help: 'onMouseLeave handler, for series by default, for points if `useMesh` is `true`.',
        required: false,
        flavors: ['svg'],
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        type: '(serie: BumpComputedSerie, event: MouseEvent) => void',
        help: 'onClick handler, for series by default, for points if `useMesh` is `true`.',
        required: false,
        flavors: ['svg'],
    },
    {
        key: 'lineTooltip',
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom line tooltip component, used when `useMesh` is `false`.',
        description: `
            A function allowing complete tooltip customisation for lines,
            it must return a valid HTML element and will receive the series's data.
        `,
        flavors: ['svg'],
    },
    {
        key: 'pointTooltip',
        group: 'Interactivity',
        type: 'Function',
        required: false,
        help: 'Custom point tooltip component, used when `useMesh` is `true`.',
        description: `
            A function allowing complete tooltip customisation for points,
            it must return a valid HTML element and will receive the point's data.
        `,
        flavors: ['svg'],
    },
    ...motionProperties(['svg'], defaults),
]

export const groups = groupProperties(props)
