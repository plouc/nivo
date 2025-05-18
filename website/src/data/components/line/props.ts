// @ts-ignore
import { lineCurvePropKeys } from '@nivo/core'
import { commonDefaultProps, svgDefaultProps } from '@nivo/line'
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
    commonAccessibilityProps,
    chartRef,
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
        defaultValue: commonDefaultProps.curve,
        group: 'Style',
        control: {
            type: 'choices',
            choices: lineCurvePropKeys.map((key: string) => ({
                label: key,
                value: key,
            })),
        },
    },
    chartRef(['svg', 'canvas']),
    themeProperty(['svg', 'canvas', 'api']),
    ordinalColors({
        flavors: allFlavors,
        defaultValue: commonDefaultProps.colors,
    }),
    {
        key: 'lineWidth',
        help: 'Line width.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.lineWidth,
        control: { type: 'lineWidth' },
        group: 'Style',
    },
    {
        key: 'enableArea',
        help: 'Enable/disable area below each line.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.enableArea,
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
        defaultValue: commonDefaultProps.areaBaselineValue,
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
        defaultValue: commonDefaultProps.areaOpacity,
        type: 'number',
        control: { type: 'opacity' },
        group: 'Style',
    },
    blendMode({
        key: 'areaBlendMode',
        target: 'areas',
        flavors: ['svg'],
        defaultValue: svgDefaultProps.areaBlendMode,
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
        defaultValue: commonDefaultProps.layers,
    },
    {
        key: 'enablePoints',
        help: 'Enable/disable points.',
        flavors: allFlavors,
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.enablePoints,
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
        defaultValue: commonDefaultProps.pointSize,
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
        type: 'InheritedColorConfig<PointColorContext>',
        flavors: allFlavors,
        required: false,
        defaultValue: commonDefaultProps.pointColor,
        group: 'Points',
        control: { type: 'inheritedColor', inheritableProperties: ['series.color'] },
    },
    {
        key: 'pointBorderWidth',
        help: 'Width of the points border.',
        flavors: allFlavors,
        type: 'number',
        required: false,
        defaultValue: commonDefaultProps.pointBorderWidth,
        group: 'Points',
        control: { type: 'lineWidth' },
    },
    {
        key: 'pointBorderColor',
        help: 'Method to compute points border color.',
        flavors: allFlavors,
        type: `InheritedColorConfig<Omit<Point, 'borderColor'>>`,
        required: false,
        defaultValue: commonDefaultProps.pointBorderColor,
        group: 'Points',
        control: { type: 'inheritedColor', inheritableProperties: ['seriesColor'] },
    },
    {
        key: 'enablePointLabel',
        flavors: ['svg', 'api'],
        group: 'Points',
        help: 'Enable/disable points label.',
        type: 'boolean',
        required: false,
        defaultValue: svgDefaultProps.enablePointLabel,
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
        xDefault: commonDefaultProps.enableGridX,
        yDefault: commonDefaultProps.enableGridY,
    }),
    ...axes({ flavors: allFlavors }),
    isInteractive({
        flavors: ['svg', 'canvas'],
        defaultValue: commonDefaultProps.isInteractive,
        help: [
            'Enable/disable interactivity.',
            'Using `enableSlices` will enable a crosshair on the `x` or `y` axis, that will move between the nearest slice to the mouse/touch point, and will show a tooltip of all data points for that slice.',
            'Using `useMesh` will use a voronoi mesh to detect the closest point to the mouse cursor/touch point, which is useful for very dense datasets, as it can become difficult to hover a specific point, however, it will only return one data point.',
        ].join(' '),
    }),
    {
        key: 'useMesh',
        flavors: ['svg'],
        help: 'Use a voronoi mesh to detect mouse interactions, enableSlices must be disabled',
        type: 'boolean',
        required: false,
        defaultValue: svgDefaultProps.useMesh,
        control: { type: 'switch' },
        group: 'Interactivity',
    },
    {
        key: 'debugMesh',
        flavors: ['svg', 'canvas'],
        help: 'Display mesh used to detect mouse interactions (voronoi cells).',
        type: 'boolean',
        required: false,
        defaultValue: commonDefaultProps.debugMesh,
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
        key: 'onTouchStart',
        flavors: ['svg'],
        group: 'Interactivity',
        help: `onTouchStart handler, when a touch gesture is started inside the graph.`,
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'onTouchMove',
        flavors: ['svg'],
        group: 'Interactivity',
        help: [
            'onTouchMove handler, when a touch gesture that originated from inside the graph is moved.',
            'Note, when using slices, this will return the originally touched slice, not the slice currently being hovered over (use document.elementFromPoint()).',
        ].join(' '),
        type: '(point, event) => void',
        required: false,
    },
    {
        key: 'onTouchEnd',
        flavors: ['svg'],
        group: 'Interactivity',
        help: `onTouchEnd handler, when a touch gesture that originated from inside the graph ends.`,
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
        defaultValue: svgDefaultProps.enableSlices,
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
        defaultValue: svgDefaultProps.debugSlices,
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
        defaultValue: svgDefaultProps.enableCrosshair,
    },
    {
        key: 'enableTouchCrosshair',
        flavors: ['svg'],
        group: 'Interactivity',
        help: `Enables the crosshair to be dragged around a touch screen.`,
        type: 'boolean',
        defaultValue: svgDefaultProps.enableTouchCrosshair,
        control: { type: 'switch' },
    },
    {
        key: 'initialHiddenIds',
        flavors: allFlavors,
        group: 'Interactivity',
        help: `Hides certain series by default given their ids`,
        type: 'string[]',
    },
    {
        key: 'crosshairType',
        flavors: ['svg'],
        group: 'Interactivity',
        required: false,
        defaultValue: svgDefaultProps.crosshairType,
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
    ...motionProperties(['svg'], svgDefaultProps),
    {
        key: 'isFocusable',
        flavors: ['svg'],
        required: false,
        defaultValue: svgDefaultProps.isFocusable,
        group: 'Accessibility',
        help: 'Make the root SVG element and each point focusable, for keyboard navigation.',
        description: `
            If enabled, focusing will also reveal the tooltip if \`isInteractive\` is \`true\`,
            when a point gains focus and hide it on blur.
            
            Also note that if this option is enabled, focusing a point will reposition the tooltip
            at a fixed location.
        `,
        type: 'boolean',
        control: { type: 'switch' },
    },
    ...commonAccessibilityProps(['svg'], svgDefaultProps),
    {
        key: 'pointAriaLabel',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: '[aria-label](https://www.w3.org/TR/wai-aria/#aria-label) for points, `enablePoints` must be `true`.',
        type: '(point: Point) => string | undefined',
    },
    {
        key: 'pointAriaLabelledBy',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: '[aria-labelledby](https://www.w3.org/TR/wai-aria/#aria-labelledby) for points, `enablePoints` must be `true`.',
        type: '(point: Point) => string | undefined',
    },
    {
        key: 'pointAriaDescribedBy',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: '[aria-describedby](https://www.w3.org/TR/wai-aria/#aria-describedby) for points, `enablePoints` must be `true`.',
        type: '(point: Point) => string | undefined',
    },
    {
        key: 'pointAriaHidden',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: '[aria-hidden](https://www.w3.org/TR/wai-aria/#aria-hidden) for points, `enablePoints` must be `true`.',
        type: '(point: Point) => boolean | undefined',
    },
    {
        key: 'pointAriaDisabled',
        flavors: ['svg'],
        required: false,
        group: 'Accessibility',
        help: '[aria-disabled](https://www.w3.org/TR/wai-aria/#aria-disabled) for points, `enablePoints` must be `true`.',
        type: '(point: Point) => boolean | undefined',
    },
]

export const groups = groupProperties(props)
