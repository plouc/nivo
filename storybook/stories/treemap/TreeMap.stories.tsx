import type { Meta, StoryObj } from '@storybook/react'
import { generateLibTree } from '@nivo/generators'
import { linearGradientDef, patternDotsDef } from '@nivo/core'
import { TreeMap } from '@nivo/treemap'

const meta: Meta<typeof TreeMap> = {
    title: 'TreeMap',
    component: TreeMap,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TreeMap>

const commonProperties = {
    width: 900,
    height: 400,
    data: generateLibTree(),
    identity: 'name',
    value: 'loc',
    valueFormat: '.02s',
    labelSkipSize: 16,
}

export const CustomTooltip: Story = {
    render: () => (
        <TreeMap
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

export const PatternsAndGradients: Story = {
    render: () => (
        <TreeMap
            {...commonProperties}
            nodeOpacity={1}
            labelTextColor={{
                from: 'color',
                modifiers: [['darker', 3]],
            }}
            parentLabelTextColor={{
                from: 'color',
                modifiers: [['darker', 3]],
            }}
            defs={[
                linearGradientDef(
                    'gradient',
                    [
                        { offset: 0, color: '#ffffff' },
                        { offset: 15, color: 'inherit' },
                        { offset: 100, color: 'inherit' },
                    ],
                    { gradientTransform: 'rotate(-90 0.5 0.5)' }
                ),
                patternDotsDef('pattern', {
                    background: 'inherit',
                    color: '#ffffff',
                    size: 1,
                    padding: 4,
                    stagger: true,
                }),
            ]}
            fill={[
                {
                    match: node => ['viz', 'text', 'utils'].includes(node.pathComponents[1]),
                    id: 'gradient',
                },
                {
                    match: node => ['set', 'generators', 'misc'].includes(node.pathComponents[1]),
                    id: 'pattern',
                },
            ]}
        />
    ),
}
