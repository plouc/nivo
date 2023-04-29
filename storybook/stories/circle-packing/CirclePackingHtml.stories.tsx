import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { generateLibTree } from '@nivo/generators'
import { CirclePackingHtml } from '@nivo/circle-packing'

const meta: Meta<typeof CirclePackingHtml> = {
    title: 'CirclePackingHtml',
    component: CirclePackingHtml,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CirclePackingHtml>

const commonProperties = {
    width: 900,
    height: 500,
    data: generateLibTree(),
    padding: 2,
    id: 'name',
    value: 'loc',
}

export const Basic: Story = {
    render: () => <CirclePackingHtml {...commonProperties} />,
}

export const RenderingLeavesOnly: Story = {
    render: () => <CirclePackingHtml {...commonProperties} leavesOnly />,
}

export const WithFormattedValues: Story = {
    render: () => (
        <CirclePackingHtml
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
        <CirclePackingHtml
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
            <CirclePackingHtml
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
