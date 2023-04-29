import type { Meta, StoryObj } from '@storybook/react'
import { Funnel } from '@nivo/funnel'
import { FunnelWithClustering } from './Clustering'

const meta: Meta<typeof Funnel> = {
    title: 'Funnel',
    component: Funnel,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Funnel>

const commonProps = {
    data: [
        {
            id: 'step_sent',
            value: 85523,
            label: 'Sent',
        },
        {
            id: 'step_viewed',
            value: 74844,
            label: 'Viewed',
        },
        {
            id: 'step_clicked',
            value: 62617,
            label: 'Clicked',
        },
        {
            id: 'step_add_to_card',
            value: 50425,
            label: 'Add To Card',
        },
        {
            id: 'step_purchased',
            value: 31139,
            label: 'Purchased',
        },
    ],
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    borderWidth: 20,
    motionConfig: 'wobbly',
}

export const CustomTooltip: Story = {
    render: () => (
        <Funnel
            {...commonProps}
            width={900}
            height={300}
            direction={'horizontal'}
            tooltip={({ part }) => (
                <div
                    style={{
                        padding: 12,
                        color: '#fff',
                        background: '#222222',
                    }}
                >
                    <span>Look, I'm custom :)</span>
                    <br />
                    <strong>
                        {part.data.id}: {part.formattedValue}
                    </strong>
                </div>
            )}
        />
    ),
}

export const CombiningWithOtherCharts: Story = {
    render: () => <FunnelWithClustering />,
}
