import type { Meta, StoryObj } from '@storybook/react'
import { WaffleCanvas } from '@nivo/waffle'
import { CustomTooltip as CustomTooltipComponent } from './CustomTooltip'

const meta: Meta<typeof WaffleCanvas> = {
    title: 'WaffleCanvas',
    component: WaffleCanvas,
    tags: ['autodocs'],
    argTypes: {
        onClick: { action: 'click' },
        fillDirection: {
            control: 'select',
            options: ['top', 'right', 'bottom', 'left'],
        },
    },
    args: {
        fillDirection: 'top',
    },
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
    padding: 1,
    borderRadius: 2,
}

export const Basic: Story = {
    render: args => (
        <WaffleCanvas {...commonProps} fillDirection={args.fillDirection} onClick={args.onClick} />
    ),
}

export const UsingDataColor: Story = {
    render: args => (
        <WaffleCanvas
            {...commonProps}
            colors={{ datum: 'color' }}
            fillDirection={args.fillDirection}
            onClick={args.onClick}
        />
    ),
}

export const CustomTooltip: Story = {
    render: args => (
        <WaffleCanvas
            {...commonProps}
            tooltip={CustomTooltipComponent}
            fillDirection={args.fillDirection}
            onClick={args.onClick}
        />
    ),
}
