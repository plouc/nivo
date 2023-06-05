import type { Meta, StoryObj } from '@storybook/react'
import { generateWaffleData } from '@bitbloom/nivo-generators'
import { WaffleHtml } from '@bitbloom/nivo-waffle'
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
const data = generateWaffleData({
    total,
    groups: [
        { id: 'men', color: '#468df3' },
        { id: 'women', color: '#a053f0' },
    ],
})
const commonProps = {
    width: 900,
    height: 500,
    total,
    data,
    rows: 24,
    columns: 18,
    padding: 2,
    borderRadius: 2,
}

export const Basic: Story = {
    render: args => <WaffleHtml {...commonProps} onClick={args.onClick} />,
}

export const UsingDataColor: Story = {
    render: args => (
        <WaffleHtml {...commonProps} colors={{ datum: 'color' }} onClick={args.onClick} />
    ),
}

export const CustomTooltip: Story = {
    render: args => (
        <WaffleHtml {...commonProps} tooltip={CustomTooltipComponent} onClick={args.onClick} />
    ),
}
