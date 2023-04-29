import type { Meta, StoryObj } from '@storybook/react'
import { WaffleCanvas } from '@nivo/waffle'
import { CustomTooltip as CustomTooltipComponent } from './CustomTooltip'

const meta: Meta<typeof WaffleCanvas> = {
    title: 'WaffleCanvas',
    component: WaffleCanvas,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof WaffleCanvas>

const total = 200
const data = [
    {
        id: 'men',
        label: 'men',
        value: 64,
        color: '#468df3',
    },
    {
        id: 'women',
        label: 'women',
        value: 72,
        color: '#a053f0',
    },
]
const commonProps = {
    width: 900,
    height: 500,
    total,
    data,
    rows: 48,
    columns: 36,
}

export const Basic: Story = {
    render: () => <WaffleCanvas {...commonProps} />,
}

export const Colors: Story = {
    render: () => <WaffleCanvas {...commonProps} colors={{ scheme: 'category10' }} />,
}

export const UsingDataColor: Story = {
    render: () => <WaffleCanvas {...commonProps} colorBy={{ datum: 'color' }} />,
}

export const FillDirection: Story = {
    render: () => (
        <WaffleCanvas
            {...commonProps}
            width={900}
            height={400}
            fillDirection="left"
            rows={36}
            columns={48}
        />
    ),
}

export const CustomTooltip: Story = {
    render: () => (
        <WaffleCanvas
            {...commonProps}
            theme={{
                tooltip: {
                    container: {
                        background: '#333',
                    },
                },
            }}
            tooltip={CustomTooltipComponent}
        />
    ),
}
