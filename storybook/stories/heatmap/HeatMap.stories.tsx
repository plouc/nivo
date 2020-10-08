import type { Meta, StoryObj } from '@storybook/react'
import { ContinuousColorScaleConfig } from '@bitbloom/nivo-colors'
import { HeatMap, ComputedCell } from '@bitbloom/nivo-heatmap'
import { sampleData } from './data'
import { CustomTooltip as CustomTooltipComponent } from './CustomTooltip'
import { customInterpolator } from './customInterpolator'

const meta: Meta<typeof HeatMap> = {
    title: 'HeatMap',
    component: HeatMap,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HeatMap>

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: sampleData,
}

export const Basic: Story = {
    render: () => <HeatMap<any, Record<string, unknown>> {...commonProperties} />,
}

export const VariableCellSize: Story = {
    render: () => (
        <HeatMap<any, Record<string, unknown>>
            {...commonProperties}
            valueFormat=">-.2s"
            cellComponent="circle"
            sizeVariation={{
                sizes: [0.6, 1],
            }}
            forceSquare
            enableGridX={true}
            enableGridY={true}
        />
    ),
}

const CustomCell = ({ cell, borderWidth }: { cell: ComputedCell<any>; borderWidth: number }) => {
    if (cell.value === null) return null

    return (
        <g transform={`translate(${cell.x}, ${cell.y})`}>
            <path
                transform={`rotate(${cell.value < 50 ? 180 : 0})`}
                fill={cell.color}
                fillOpacity={cell.opacity}
                strokeWidth={borderWidth}
                stroke={cell.borderColor}
                d={`
                M0 -${Math.round(cell.height / 2)}
                L${Math.round(cell.width / 2)} ${Math.round(cell.height / 2)}
                L-${Math.round(cell.width / 2)} ${Math.round(cell.height / 2)}
                L0 -${Math.round(cell.height / 2)}
            `}
            />
            <text
                dominantBaseline="central"
                textAnchor="middle"
                style={{ fill: cell.labelTextColor }}
                dy={cell.value < 50 ? -6 : 6}
            >
                {cell.formattedValue}
            </text>
        </g>
    )
}

export const CustomCellComponent: Story = {
    render: () => (
        <HeatMap<any, Record<string, unknown>>
            {...commonProperties}
            enableGridY
            cellComponent={CustomCell}
            labelTextColor="inherit:darker(1.6)"
        />
    ),
}

export const CustomTooltip: Story = {
    render: () => (
        <HeatMap<any, Record<string, unknown>>
            {...commonProperties}
            colors={{
                type: 'quantize',
                scheme: 'cividis',
                steps: 7,
            }}
            tooltip={CustomTooltipComponent}
            labelTextColor={{
                from: 'color',
                modifiers: [['brighter', 2.6]],
            }}
        />
    ),
}

const customColorConfigs = {
    'sequential (full domain)': {
        type: 'sequential',
        scheme: 'oranges',
        minValue: -100000,
        maxValue: 100000,
    },
    'sequential (restricted domain)': {
        type: 'sequential',
        scheme: 'oranges',
        minValue: 0,
        maxValue: 100000,
    },
    'diverging at 0.5': {
        type: 'diverging',
        scheme: 'purple_orange',
        minValue: -100000,
        maxValue: 100000,
        divergeAt: 0.5,
    },
    'diverging at 0.33': {
        type: 'diverging',
        scheme: 'purple_orange',
        minValue: -100000,
        maxValue: 100000,
        divergeAt: 0.33,
    },
    'custom sequential': {
        type: 'sequential',
        colors: ['#f4f4f4', '#74A57F'],
        minValue: -100000,
        maxValue: 100000,
    },
    'custom diverging at 0.5': {
        type: 'diverging',
        colors: ['#aa6052', '#f4f4f4', '#74A57F'],
        divergeAt: 0.5,
        minValue: -100000,
        maxValue: 100000,
    },
    'custom diverging at 0.33': {
        type: 'diverging',
        colors: ['#aa6052', '#f4f4f4', '#74A57F'],
        divergeAt: 0.33,
        minValue: -100000,
        maxValue: 100000,
    },
    'custom interpolator': {
        type: 'sequential',
        interpolator: customInterpolator,
        minValue: -100000,
        maxValue: 100000,
    },
} as Record<string, ContinuousColorScaleConfig>

const HeatMapWithColor = ({ colorConfig }: { colorConfig: string }) => {
    return (
        <HeatMap<any, Record<string, unknown>>
            {...commonProperties}
            colors={customColorConfigs[colorConfig]}
            legends={[
                {
                    anchor: 'bottom',
                    translateX: 0,
                    translateY: 30,
                    length: 400,
                    thickness: 8,
                    direction: 'row',
                    tickPosition: 'after',
                    tickSize: 3,
                    tickSpacing: 4,
                    tickOverlap: false,
                    tickFormat: '>-.2s',
                    title: 'Value →',
                    titleAlign: 'start',
                    titleOffset: 4,
                },
            ]}
        />
    )
}

/**
 * Use the controls to toggle between heatmap variants with different colors.
 * All the variants use named color schemes, and add fine-tuning.
 *
 *  - sequential (full_domain): sequential scale that covers all values in the heatmap
 *  - sequential (restricted domain): sequential scale that covers only a part of the values in the heatmap
 *  - diverging at 0.5: three color scale with the middle color placed the middle of the domain
 *  - diverging at 0.33: three color scale with the middle color at the 33th percentile of the domain
 */
export const ColorScales: Story = {
    argTypes: {
        colors: {
            control: 'select',
            options: [
                'sequential (full domain)',
                'sequential (restricted domain)',
                'diverging at 0.5',
                'diverging at 0.33',
            ],
        },
    },
    args: {
        colors: 'sequential (full domain)',
    },
    render: args => <HeatMapWithColor colorConfig={args.colors} />,
}

/**
 * Use the controls to toggle between heatmap variants with different colors.
 * All the variants use color scales with custom colors (specified via rgb strings).
 *
 *  - custom sequential: two-color scale with custom colors
 *  - custom diverging at 0.5: three-color scale with custom colors
 *  - custom diverging at 0.33: three-color scale with custom colors, with the middle color at the 33 percentile of the domain
 *  - custom interpolator: multi-color scale prepared using a custom interpolator function
 */
export const CustomColorScales: Story = {
    argTypes: {
        colors: {
            control: 'select',
            options: [
                'custom sequential',
                'custom diverging at 0.5',
                'custom diverging at 0.33',
                'custom interpolator',
            ],
        },
    },
    args: {
        colors: 'custom sequential',
    },
    render: args => <HeatMapWithColor colorConfig={args.colors} />,
}
