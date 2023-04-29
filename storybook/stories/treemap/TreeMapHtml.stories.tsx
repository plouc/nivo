import type { Meta, StoryObj } from '@storybook/react'
import { generateLibTree } from '@nivo/generators'
import { TreeMapHtml } from '@nivo/treemap'

const meta: Meta<typeof TreeMapHtml> = {
    title: 'TreeMapHtml',
    component: TreeMapHtml,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TreeMapHtml>

const commonProperties = {
    width: 900,
    height: 400,
    data: generateLibTree(),
    identity: 'name',
    value: 'loc',
    valueFormat: '.02s',
    label: 'name',
    labelSkipRadius: 16,
}

export const CustomTooltip: Story = {
    render: () => (
        <TreeMapHtml
            {...commonProperties}
            tooltip={({ node }) => (
                <strong style={{ color: node.color }}>
                    {node.pathComponents.join(' / ')}: {node.formattedValue}
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
