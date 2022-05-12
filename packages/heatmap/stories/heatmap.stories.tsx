import { storiesOf } from '@storybook/react'
import { select } from '@storybook/addon-knobs'
import { ContinuousColorScaleConfig } from '@nivo/colors'
// @ts-ignore
import { HeatMap, ComputedCell } from '../src'
// @ts-ignore
import { sampleData } from './data'
// @ts-ignore
import { CustomTooltip } from './CustomTooltip'
// @ts-ignore
import { customInterpolator } from './CustomInterpolator'

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: sampleData,
}

const stories = storiesOf('HeatMap', module)

stories.add('default', () => <HeatMap<any, Record<string, unknown>> {...commonProperties} />)

stories.add('Variable Cell Size', () => (
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
))

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

stories.add('Custom Cell Component', () => (
    <HeatMap<any, Record<string, unknown>>
        {...commonProperties}
        enableGridY
        cellComponent={CustomCell}
        labelTextColor="inherit:darker(1.6)"
    />
))

stories.add('Custom Tooltip', () => (
    <HeatMap<any, Record<string, unknown>>
        {...commonProperties}
        colors={{
            type: 'quantize',
            scheme: 'cividis',
            steps: 7,
        }}
        tooltip={CustomTooltip}
        labelTextColor={{
            from: 'color',
            modifiers: [['brighter', 2.6]],
        }}
    />
))

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

stories.add(
    'Color Scales',
    () => (
        <HeatMapWithColor
            colorConfig={select(
                'colors',
                [
                    'sequential (full domain)',
                    'sequential (restricted domain)',
                    'diverging at 0.5',
                    'diverging at 0.33',
                ],
                'sequential (full domain)'
            )}
        />
    ),
    {
        info: {
            text: `
                Use the knobs to toggle between heatmap variants with different colors.
                All the variants use named color schemes, and add fine-tuning.
                 
                 - sequential (full_domain): sequential scale that covers all values in the heatmap
                 - sequential (restricted domain): sequential scale that covers only a part of the values in the heatmap                    
                 - diverging at 0.5: three color scale with the middle color placed the middle of the domain
                 - diverging at 0.33: three color scale with the middle color at the 33th percentile of the domain   
            `,
        },
    }
)

stories.add(
    'Custom Color Scales',
    () => (
        <HeatMapWithColor
            colorConfig={select(
                'colors',
                [
                    'custom sequential',
                    'custom diverging at 0.5',
                    'custom diverging at 0.33',
                    'custom interpolator',
                ],
                'custom sequential'
            )}
        />
    ),
    {
        info: {
            text: `
                Use the knobs to toggle between heatmap variants with different colors.
                All the variants use color scales with custom colors (specified via rgb strings).
                 
                 - custom sequential: two-color scale with custom colors
                 - custom diverging at 0.5: three-color scale with custom colors
                 - custom diverging at 0.33: three-color scale with custom colors, with the middle color at the 33 percentile of the domain
                 - custom interpolator: multi-color scale prepared using a custom interpolator function
            `,
        },
    }
)
