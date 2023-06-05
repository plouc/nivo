import type { Meta, StoryObj } from '@storybook/react'
import { PropsWithChildren } from 'react'
import { generateSankeyData, randColor } from '@bitbloom/nivo-generators'
import { SankeyNodeMinimal } from 'd3-sankey'
import { Sankey } from '@bitbloom/nivo-sankey'

const meta: Meta<typeof Sankey> = {
    title: 'Sankey',
    component: Sankey,
    tags: ['autodocs'],
    argTypes: { onClick: { action: 'clicked' } },
}

export default meta
type Story = StoryObj<typeof Sankey>

const sankeyData = generateSankeyData({ nodeCount: 11, maxIterations: 2 })
const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 0, right: 80, bottom: 0, left: 80 },
    data: sankeyData,
    colors: { scheme: 'category10' as const },
}

export const Basic: Story = { render: () => <Sankey {...commonProperties} /> }

export const CustomAlign: Story = { render: () => <Sankey {...commonProperties} align="end" /> }

export const OutsideLabels: Story = {
    render: () => <Sankey {...commonProperties} labelPosition="outside" />,
}

export const VerticalLabels: Story = {
    render: () => <Sankey {...commonProperties} labelOrientation="vertical" labelPadding={20} />,
}

export const ContractingLinks: Story = {
    render: () => <Sankey {...commonProperties} linkContract={10} />,
}

export const ClickHandler: Story = {
    render: args => <Sankey {...commonProperties} onClick={args.onClick} />,
}

export const CustomLabel: Story = {
    render: () => <Sankey {...commonProperties} label={node => `${node.id} 😁`} />,
}

export const FormattedValues: Story = {
    render: () => (
        <Sankey
            {...commonProperties}
            valueFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ),
}

const CustomTooltipContainer = ({ children }: PropsWithChildren<any>) => (
    <div
        style={{
            padding: 9,
            background: '#eeeeee',
            borderRadius: '2px',
            border: '1px solid #aaaaaa',
        }}
    >
        {children}
    </div>
)

export const CustomTooltips: Story = {
    render: () => (
        <Sankey
            {...commonProperties}
            nodeTooltip={({ node }) => (
                <CustomTooltipContainer>
                    Custom tooltip for node:
                    <br />
                    <strong>{node.label}</strong>
                </CustomTooltipContainer>
            )}
            linkTooltip={({ link }) => (
                <CustomTooltipContainer>
                    Custom tooltip for link:
                    <br />
                    <strong>{link.source.label}</strong> to <strong>{link.target.label}</strong>
                </CustomTooltipContainer>
            )}
        />
    ),
}

const dataWithRandLinkColors = (data: typeof sankeyData) => ({
    nodes: data.nodes.map(node => ({
        ...node,
        nodeColor: 'blue',
    })),
    links: data.links.map(link => ({
        ...link,
        startColor: randColor(),
        endColor: randColor(),
    })),
})

export const CustomNodeAndLinkColors: Story = {
    render: () => (
        <Sankey
            {...commonProperties}
            data={dataWithRandLinkColors(sankeyData)}
            enableLinkGradient={true}
            colors={node => node.nodeColor}
        />
    ),
}

const minNodeValueOnTop = (
    nodeA: SankeyNodeMinimal<any, any>,
    nodeB: SankeyNodeMinimal<any, any>
) => {
    if (nodeA.value! < nodeB.value!) return -1
    if (nodeA.value! > nodeB.value!) return 1
    return 0
}

// min node value on top
export const WithReverseSortOrdering: Story = {
    render: () => <Sankey {...commonProperties} sort={minNodeValueOnTop} />,
}

export const SortLinksByInput: Story = {
    render: () => (
        <Sankey
            {...commonProperties}
            data={{
                nodes: [
                    { id: 'foo_left', nodeColor: '#ff0000' },
                    { id: 'bar_left', nodeColor: '#0000ff' },
                    { id: 'baz_left', nodeColor: '#00ff00' },
                    { id: 'foo_right', nodeColor: '#ff0000' },
                    { id: 'bar_right', nodeColor: '#0000ff' },
                    { id: 'baz_right', nodeColor: '#00ff00' },
                ],
                links: [
                    { source: 'foo_left', target: 'bar_right', value: 5 },
                    { source: 'foo_left', target: 'baz_right', value: 5 },
                    { source: 'bar_left', target: 'foo_right', value: 5 },
                    { source: 'bar_left', target: 'bar_right', value: 5 },
                    { source: 'bar_left', target: 'baz_right', value: 5 },
                    { source: 'baz_left', target: 'bar_right', value: 5 },
                ],
            }}
            colors={node => node.nodeColor}
            sort="input"
            enableLinkGradient
        />
    ),
}
