import type { Meta, StoryObj } from '@storybook/react'
import { WaffleHtml } from '@nivo/waffle'
import { CustomTooltip as CustomTooltipComponent } from './CustomTooltip'

const meta: Meta<typeof WaffleHtml> = {
    title: 'WaffleHtml',
    component: WaffleHtml,
    tags: ['autodocs'],
    argTypes: {
        onClick: { action: 'click' },
    },
}

export default meta
type Story = StoryObj<typeof WaffleHtml>

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
    rows: 24,
    columns: 18,
}

export const Basic: Story = {
    render: args => <WaffleHtml {...commonProps} onClick={args.onClick} />,
}

export const Colors: Story = {
    render: args => (
        <WaffleHtml {...commonProps} colors={{ scheme: 'category10' }} onClick={args.onClick} />
    ),
}

export const UsingDataColor: Story = {
    render: args => (
        <WaffleHtml {...commonProps} colors={{ datum: 'color' }} onClick={args.onClick} />
    ),
}

export const FillDirection: Story = {
    render: args => (
        <WaffleHtml
            {...commonProps}
            width={900}
            height={400}
            fillDirection="left"
            rows={18}
            columns={24}
            onClick={args.onClick}
        />
    ),
}

export const CustomTooltip: Story = {
    render: args => (
        <WaffleHtml {...commonProps} tooltip={CustomTooltipComponent} onClick={args.onClick} />
    ),
}
