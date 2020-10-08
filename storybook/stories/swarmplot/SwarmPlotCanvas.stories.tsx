import type { Meta, StoryObj } from '@storybook/react'
import { generateSwarmPlotData } from '@bitbloom/nivo-generators'
import { SwarmPlotCanvas } from '@bitbloom/nivo-swarmplot'

const meta: Meta<typeof SwarmPlotCanvas> = {
    title: 'SwarmPlotCanvas',
    component: SwarmPlotCanvas,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SwarmPlotCanvas>

const commonProps = {
    width: 700,
    height: 360,
    margin: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
    },
    groupBy: 'group',
    identity: 'id',
    value: 'price',
    valueScale: {
        type: 'linear' as const,
        min: 0,
        max: 500,
    },
    size: 8,
    ...generateSwarmPlotData(
        ['group A', 'group B', 'group C', 'group D', 'group E', 'group F', 'group G'],
        { min: 40, max: 60 }
    ),
}

export const Basic: Story = {
    render: () => <SwarmPlotCanvas {...commonProps} />,
}

export const UsingAnnotations: Story = {
    render: () => (
        <SwarmPlotCanvas
            {...commonProps}
            annotations={[
                {
                    type: 'circle',
                    match: { index: 100 },
                    noteX: 40,
                    noteY: 40,
                    offset: 4,
                    note: 'Node at index: 100',
                },
                {
                    type: 'rect',
                    match: { index: 200 },
                    noteX: -40,
                    noteY: -40,
                    offset: 4,
                    note: 'Node at index: 200',
                },
                {
                    type: 'dot',
                    match: { index: 300 },
                    noteX: 0,
                    noteY: { abs: -20 },
                    size: 6,
                    note: 'Node at index: 300',
                },
            ]}
        />
    ),
}
