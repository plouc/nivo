import { Meta } from '@storybook/react'
import { HeatMap, HeatMapCanvas } from '../src'
import {generateXYSeries} from "@nivo/generators";

export default {
    component: HeatMap,
    title: 'Custom Legends',
} as Meta

const data = generateXYSeries({
    serieIds: ['Alpha', 'Beta', 'Gamma', 'Delta'],
    x: {
        values: ['a', 'b', 'c', 'd'],
    },
    y: {
        length: NaN,
        min: 0,
        max: 5,
        round: false,
    },
})

const commonProps = {
    width: 900,
    height: 220,
    margin: { top: 40, right: 500, bottom: 40, left: 60 },
    data: data,
    enableLabel: true,
    valueFormat:  '>-.1f',
    colors: {
        type: 'sequential',
        scheme: 'blues',
        minValue: 0,
        maxValue: 5,
    },
}

// custom legends specifications
const legendVerticalColors = {
    anchor: 'top-right',
    direction: 'column',
    translateX: 80,
    translateY: 0,
    length: 120,
    thickness: 10,
    tickSize: 5,
    tickSpacing: 5,
    title: 'Value →',
    titleAlign: 'start',
    titleOffset: 6,
}
const legendHorizontalColors = {
    anchor: 'top-right',
    direction: 'row',
    translateX: 370,
    translateY: 20,
    length: 140,
    thickness: 10,
    tickSize: 5,
    tickSpacing: 5,
    title: 'Value →',
    titleAlign: 'start',
    titleOffset: 6,
}

// configurations for legends with continuous and discrete color scales
const legendsWithContinuousScales = [
    {
        ...legendVerticalColors,
    },
    {
        ...legendVerticalColors,
        translateX: 160,
        title: 'Custom ticks',
        ticks: [0, 1, 2, 3, 4, 5],
    },
    {
        ...legendHorizontalColors,
    },
    {
        ...legendHorizontalColors,
        translateY: 90,
        title: 'Custom ticks',
        ticks: [0, 2.5, 5],
    }
]
const customTicks = {
    0: 'low',
    0.5: 'low',
    2.5: 'medium',
    4.5: 'high',
    5: 'high'
}
const legendsWithQuantizeScales = [
    {
        ...legendVerticalColors,
    },
    {
        ...legendVerticalColors,
        translateX: 160,
        title: 'Custom ticks',
        tickSize: 0,
        ticks: [0.5, 2.5, 4.5],
        tickFormat: (v) => customTicks[v]
    },
    {
        ...legendHorizontalColors,
    },
    {
        ...legendHorizontalColors,
        translateY: 90,
        title: 'Custom ticks',
        tickSize: 0,
        ticks: [0.5, 2.5, 4.5],
        tickFormat: (v) => customTicks[v]
    }
]

export const SvgContinuousColorLegends = () => (
    <HeatMap
        {...commonProps}
        legends={legendsWithContinuousScales}
    />
)

export const SvgQuantizeColorLegends = () => (
    <HeatMap
        {...commonProps}
        colors={{
            type: 'quantize',
            scheme: 'blues',
            domain: [0, 5],
            steps: 5,
        }}
        legends={legendsWithQuantizeScales}
    />
)

export const CanvasContinuousColorLegends = () => (
    <HeatMapCanvas
        {...commonProps}
        legends={legendsWithContinuousScales}
    />
)

export const CanvasQuantizeColorLegends = () => (
    <HeatMapCanvas
        {...commonProps}
        colors={{
            type: 'quantize',
            scheme: 'blues',
            domain: [0, 5],
            steps: 5,
        }}
        legends={legendsWithQuantizeScales}
    />
)
