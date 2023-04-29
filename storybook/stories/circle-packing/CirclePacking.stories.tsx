import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { generateLibTree } from '@nivo/generators'
import { CirclePacking } from '@nivo/circle-packing'

const meta: Meta<typeof CirclePacking> = {
    title: 'CirclePacking',
    component: CirclePacking,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CirclePacking>

const commonProperties = {
    width: 900,
    height: 500,
    data: generateLibTree(),
    padding: 2,
    id: 'name',
    value: 'loc',
    labelsSkipRadius: 16,
}

export const Basic: Story = {
    render: () => <CirclePacking {...commonProperties} />,
}

export const RenderingLeavesOnly: Story = {
    render: () => <CirclePacking {...commonProperties} leavesOnly />,
}

export const WithFormattedValues: Story = {
    render: () => (
        <CirclePacking
            {...commonProperties}
            valueFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ),
}

export const CustomTooltip: Story = {
    render: () => (
        <CirclePacking
            {...commonProperties}
            tooltip={({ id, value, color }) => (
                <strong style={{ color }}>
                    {id}: {value}
                </strong>
            )}
            theme={{
                tooltip: {
                    container: {
                        background: '#333',
                    },
                },
            }}
        />
    ),
}

export const ZoomOnClick: Story = {
    render: () => {
        const [zoomedId, setZoomedId] = useState<string | null>(null)

        return (
            <CirclePacking
                {...commonProperties}
                enableLabels
                labelsSkipRadius={16}
                labelsFilter={label => label.node.height === 0}
                labelTextColor={{
                    from: 'color',
                    modifiers: [['darker', 2]],
                }}
                zoomedId={zoomedId}
                motionConfig="slow"
                onClick={node => {
                    setZoomedId(zoomedId === node.id ? null : node.id)
                }}
            />
        )
    },
}
