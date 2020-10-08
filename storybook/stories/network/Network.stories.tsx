import type { Meta, StoryObj } from '@storybook/react'
import { generateNetworkData } from '@bitbloom/nivo-generators'
import { Network, NodeProps, LinkProps, NodeTooltipProps, NetworkSvgProps } from '@bitbloom/nivo-network'

const meta: Meta<typeof Network> = {
    title: 'Network',
    component: Network,
    tags: ['autodocs'],
    argTypes: { onClick: { action: 'clicked' } },
}

export default meta
type Story = StoryObj<typeof Network>

const data = generateNetworkData()

type Node = (typeof data)['nodes'][number]
type Link = (typeof data)['links'][number]

const commonProperties: NetworkSvgProps<Node, Link> = {
    data,
    width: 600,
    height: 600,
    nodeColor: node => node.color,
    repulsivity: 10,
    iterations: 60,
    linkDistance: link => link.distance * 1.3,
}

export const Basic: Story = {
    render: () => <Network<Node, Link> {...commonProperties} />,
}

const CustomNodeTooltipComponent = ({ node }: NodeTooltipProps<Node>) => (
    <div
        style={{
            background: node.color,
            color: '#000000',
            padding: '9px 12px',
            borderRadius: '2px',
            boxShadow: '0 3px 9px rgba(0, 0, 0, .35)',
        }}
    >
        <strong>ID: {node.id}</strong>
        <br />
        size: {node.size}
    </div>
)

export const CustomNodeTooltip: Story = {
    render: () => (
        <Network<Node, Link> {...commonProperties} nodeTooltip={CustomNodeTooltipComponent} />
    ),
}

const CustomNodeComponent = ({ node }: NodeProps<Node>) => (
    <g transform={`translate(${node.x - 12},${node.y - 18})`}>
        <circle cx="12" cy="8" r="5" fill={node.color} stroke="#ffffff" />
        <path d="M3,21 h18 C 21,12 3,12 3,21" fill={node.color} stroke="#ffffff" />
    </g>
)

export const CustomNode: Story = {
    render: () => <Network<Node, Link> {...commonProperties} nodeComponent={CustomNodeComponent} />,
}

const CustomLinkComponent = ({ link }: LinkProps<Node, Link>) => (
    <line
        x1={link.source.x}
        y1={link.source.y}
        x2={link.target.x}
        y2={link.target.y}
        stroke={link.color}
        strokeWidth={link.thickness}
        strokeDasharray="5 7"
        strokeLinecap="round"
    />
)

export const CustomLink: Story = {
    render: () => (
        <Network<Node, Link>
            {...commonProperties}
            linkThickness={link => 2 + link.target.data.height * 2}
            linkComponent={CustomLinkComponent}
        />
    ),
}

export const OnClickHandler: Story = {
    render: args => <Network<Node, Link> {...commonProperties} onClick={args.onClick} />,
}
