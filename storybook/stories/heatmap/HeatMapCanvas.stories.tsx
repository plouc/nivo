import type { Meta, StoryObj } from '@storybook/react'
import { generateXYSeries } from '@bitbloom/nivo-generators'
import { HeatMapCanvas } from '@bitbloom/nivo-heatmap'
import { CustomTooltip as CustomTooltipComponent } from './CustomTooltip'

const meta: Meta<typeof HeatMapCanvas> = {
    title: 'HeatMapCanvas',
    component: HeatMapCanvas,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HeatMapCanvas>

const sampleData = generateXYSeries({
    serieIds: ['Japan', 'France', 'US', 'Germany', 'Norway', 'Iceland', 'UK', 'Vietnam'],
    x: {
        values: ['Train', 'Subway', 'Bus', 'Car', 'Boat', 'Moto', 'Moped', 'Bicycle', 'Others'],
    },
    y: {
        length: NaN,
        min: -100_000,
        max: 100_000,
        round: true,
    },
})

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: sampleData,
}

export const Basic: Story = {
    render: () => <HeatMapCanvas<any, Record<string, unknown>> {...commonProperties} />,
}

export const VariableCellSize: Story = {
    render: () => (
        <HeatMapCanvas<any, Record<string, unknown>>
            {...commonProperties}
            valueFormat=">-.2s"
            renderCell="circle"
            sizeVariation={{
                sizes: [0.6, 1],
            }}
            forceSquare
            enableGridX={true}
            enableGridY={true}
        />
    ),
}

export const CustomTooltip: Story = {
    render: () => (
        <HeatMapCanvas<any, Record<string, unknown>>
            {...commonProperties}
            valueFormat=">-.2s"
            colors={{
                type: 'quantize',
                scheme: 'red_yellow_blue',
                steps: 7,
            }}
            tooltip={CustomTooltipComponent}
        />
    ),
}
