import { svgDefaultProps } from '@nivo/waffle-grid'
import {
    axesProperties,
    groupProperties,
    motionConfigProperty,
    motionProperties,
    themeProperty,
} from '../../../lib/componentProperties'
import {
    ApiFlavor,
    ChartProperty,
    ObjectChartProperty,
    SvgFlavor,
    SwitchableRangeProperty,
} from '../../../types'
import { dimensionsProps, marginProp } from '../../../lib/component-properties/dimensions'
import { booleanProp } from '../../../lib/component-properties/boolean'
import { numberWithRangeProp } from '../../../lib/component-properties/range'
import { isInteractiveProp } from '../../../lib/component-properties/interactivity'
import { a11yCommonProps } from '../../../lib/component-properties/a11y'

const cellsMotionProperty = (key: string): ObjectChartProperty => ({
    key,
    flavors: [SvgFlavor],
    help: `${key} configuration.`,
    type: 'object',
    required: false,
    group: 'Motion',
    controlType: 'object',
    controlOptions: {
        props: [
            motionConfigProperty(
                'config',
                [SvgFlavor],
                undefined,
                'Optional motion config override for cells, use global `motionConfig` if unspecified.'
            ),
            {
                key: 'staggeredDelay',
                type: 'number',
                required: false,
                help:
                    'Control the delay between each value cell transition to achieve staggered transitions.',
                flavors: [SvgFlavor],
                defaultValue: svgDefaultProps.valueCellsStaggeredDelay,
                controlType: 'range',
                controlOptions: {
                    min: 0,
                    max: 20,
                    unit: 'ms',
                },
            },
            {
                key: 'positionOffsetIn',
                type: '[number, number]',
                help: 'x/y offset when cells enter the chart.',
                flavors: [SvgFlavor],
                required: false,
                defaultValue: svgDefaultProps.valueCellsPositionOffsetIn,
                controlType: 'numberArray',
                controlOptions: {
                    unit: 'px',
                    items: [
                        {
                            label: 'x',
                            min: -400,
                            max: 400,
                            step: 10,
                        },
                        {
                            label: 'y',
                            min: -400,
                            max: 400,
                            step: 10,
                        },
                    ],
                },
            },
            {
                key: 'randomizePositionOffsetIn',
                type: 'boolean',
                help:
                    'Randomize x/y offset when cells enter the chart, according to `positionOffsetIn`.',
                flavors: [SvgFlavor],
                required: false,
                defaultValue: svgDefaultProps.cellsMotionRandomizePositionOffsetIn,
                controlType: 'switch',
            },
            {
                key: 'positionOffsetOut',
                type: '[number, number]',
                help: 'x/y offset when cells leave the chart.',
                flavors: [SvgFlavor],
                required: false,
                defaultValue: svgDefaultProps.cellsMotionPositionOffsetOut,
                controlType: 'numberArray',
                controlOptions: {
                    unit: 'px',
                    items: [
                        {
                            label: 'x',
                            min: -400,
                            max: 400,
                            step: 10,
                        },
                        {
                            label: 'y',
                            min: -400,
                            max: 400,
                            step: 10,
                        },
                    ],
                },
            },
            {
                key: 'randomizePositionOffsetOut',
                type: 'boolean',
                help:
                    'Randomize x/y offset when cells leave the chart, according to `positionOffsetOut`.',
                flavors: [SvgFlavor],
                required: false,
                defaultValue: svgDefaultProps.cellsMotionRandomizePositionOffsetOut,
                controlType: 'switch',
            },
        ],
    },
})

const props: ChartProperty[] = [
    {
        key: 'data',
        group: 'Base',
        type: 'number[][]',
        required: true,
        help: 'Chart data.',
        description: `
            Please note that the number of rows should match the length
            of \`yRange\` and each row number of columns should match
            the length of \`xRange\`.
        `,
        flavors: [SvgFlavor],
    },
    {
        key: 'xRange',
        group: 'Base',
        type: 'string[]',
        required: true,
        help: 'X range.',
        flavors: [SvgFlavor],
    },
    {
        key: 'yRange',
        group: 'Base',
        type: 'string[]',
        required: true,
        help: 'Y range.',
        flavors: [SvgFlavor],
    },
    numberWithRangeProp({
        key: 'cellValue',
        group: 'Base',
        required: true,
        help: 'Define the value each cell represents.',
        flavors: [SvgFlavor],
        min: 500,
        max: 2000,
        step: 100,
        unit: 'px',
    }),
    {
        key: 'maxValue',
        help: 'Maximum value.',
        description: `
            Maximum value, if 'auto', will use max value from the provided data.
            
            If the provided value is lower than one value in the provided data,
            then it'll be ignored in favor of the one coming from your data.
        `,
        required: false,
        defaultValue: svgDefaultProps.maxValue,
        type: `number | 'auto'`,
        controlType: 'switchableRange',
        group: 'Base',
        controlOptions: {
            disabledValue: 'auto',
            defaultValue: 10000,
            min: 10000,
            max: 100000,
        },
    } as SwitchableRangeProperty,
    ...dimensionsProps([SvgFlavor, ApiFlavor]),
    marginProp([SvgFlavor]),
    booleanProp({
        key: 'enableBlankCells',
        group: 'Base',
        required: false,
        help: 'Enable/disable blank cells.',
        flavors: [SvgFlavor],
        defaultValue: svgDefaultProps.enableBlankCells,
    }),
    numberWithRangeProp({
        key: 'spacing',
        group: 'Base',
        required: false,
        help: 'Spacing between each waffle.',
        flavors: [SvgFlavor],
        defaultValue: svgDefaultProps.spacing,
        min: 0,
        max: 36,
        unit: 'px',
    }),
    numberWithRangeProp({
        key: 'cellSpacing',
        group: 'Base',
        required: false,
        help: 'Spacing between each cell.',
        flavors: [SvgFlavor],
        defaultValue: svgDefaultProps.cellSpacing,
        min: 0,
        max: 4,
        unit: 'px',
    }),
    themeProperty([SvgFlavor]),
    {
        key: 'blankCellColor',
        group: 'Style',
        help: 'Defines how to compute blank cells color.',
        type: 'InheritedColorConfig<WaffleGridCellData>',
        required: false,
        flavors: [SvgFlavor],
        defaultValue: svgDefaultProps.blankCellColor,
        controlType: 'inheritedColor',
    },
    {
        key: 'valueCellColor',
        group: 'Style',
        help: 'Defines how to compute value cells color.',
        type: 'InheritedColorConfig<WaffleGridCellData>',
        required: false,
        flavors: [SvgFlavor],
        defaultValue: svgDefaultProps.valueCellColor,
        controlType: 'inheritedColor',
    },
    {
        key: 'layers',
        group: 'Customization',
        type: '(WaffleGridLayerId | WaffleGridCustomLayer)[]',
        required: false,
        help: 'Defines the order of layers and add custom layers.',
        description: `
            You can also use this to insert extra layers
            to the chart, the extra layer should be a component.
            
            The component will receive properties as defined in
            the \`WaffleGridCustomLayerProps\` interface
            and must return a valid SVG element.
        `,
        flavors: [SvgFlavor],
        defaultValue: svgDefaultProps.layers,
    },
    booleanProp({
        key: 'enableGridX',
        group: 'Grid & Axes',
        flavors: [SvgFlavor],
        help: 'Enable/disable x grid.',
        required: false,
        defaultValue: svgDefaultProps.enableGridX,
    }),
    booleanProp({
        key: 'enableGridY',
        group: 'Grid & Axes',
        flavors: [SvgFlavor],
        help: 'Enable/disable y grid.',
        required: false,
        defaultValue: svgDefaultProps.enableGridY,
    }),
    ...axesProperties([SvgFlavor]),
    isInteractiveProp([SvgFlavor], svgDefaultProps.isInteractive),
    ...a11yCommonProps([SvgFlavor]),
    ...motionProperties([SvgFlavor], svgDefaultProps, 'react-spring'),
    cellsMotionProperty('blankCellsMotion'),
    cellsMotionProperty('valueCellsMotion'),
]

export const groups = groupProperties(props)
