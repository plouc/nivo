import type { Meta, StoryObj } from '@storybook/react'
import { useRef } from 'react'
import { generateNetworkData } from '@bitbloom/nivo-generators'
import { NetworkCanvas, NetworkCanvasProps, ComputedNode, NodeTooltipProps } from '@bitbloom/nivo-network'

const meta: Meta<typeof NetworkCanvas> = {
    title: 'NetworkCanvas',
    component: NetworkCanvas,
    tags: ['autodocs'],
    argTypes: { onClick: { action: 'clicked' } },
}

export default meta
type Story = StoryObj<typeof NetworkCanvas>

const data = generateNetworkData()

type Node = (typeof data)['nodes'][number]
type Link = (typeof data)['links'][number]

const commonProperties: NetworkCanvasProps<Node, Link> = {
    data,
    width: 600,
    height: 600,
    nodeColor: node => node.color,
    repulsivity: 10,
    iterations: 60,
    linkDistance: link => link.distance * 1.3,
}

export const Basic: Story = { render: () => <NetworkCanvas<Node, Link> {...commonProperties} /> }

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
        <NetworkCanvas<Node, Link> {...commonProperties} nodeTooltip={CustomNodeTooltipComponent} />
    ),
}

const customNodeRenderer = (ctx: CanvasRenderingContext2D, node: ComputedNode<Node>) => {
    ctx.fillStyle = node.color

    ctx.beginPath()
    ctx.moveTo(node.x, node.y - node.size / 2)
    ctx.lineTo(node.x + node.size / 2, node.y + node.size / 2)
    ctx.lineTo(node.x - node.size / 2, node.y + node.size / 2)
    ctx.fill()
}

export const CustomNodeRenderer: Story = {
    render: () => (
        <NetworkCanvas<Node, Link> {...commonProperties} renderNode={customNodeRenderer} />
    ),
}

export const OnClickHandler: Story = {
    render: args => <NetworkCanvas<Node, Link> {...commonProperties} onClick={args.onClick} />,
}

export const CustomCanvasRef: Story = {
    render: () => {
        const ref = useRef(undefined)

        const download = ref => {
            const canvas = ref.current
            const link = document.createElement('a')
            link.download = 'nivo-network.png'
            link.href = canvas.toDataURL('image/png')
            link.click()
        }

        return (
            <>
                <button onClick={() => download(ref)}>Download PNG</button>
                <NetworkCanvas<Node, Link> {...commonProperties} ref={ref} />
            </>
        )
    },
}
