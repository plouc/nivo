import { Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { generateNetworkData } from '@nivo/generators'
import {
    NetworkCanvas,
    NetworkCanvasProps,
    ComputedNode,
    NodeTooltipProps,
    // @ts-ignore
} from '../src'

export default {
    component: NetworkCanvas,
    title: 'NetworkCanvas',
    decorators: [withKnobs],
} as Meta

const data = generateNetworkData()

type Node = typeof data['nodes'][number]
type Link = typeof data['links'][number]

const commonProperties: NetworkCanvasProps<Node, Link> = {
    data,
    width: 600,
    height: 600,
    nodeColor: node => node.color,
    repulsivity: 10,
    iterations: 60,
    linkDistance: link => link.distance * 1.3,
}

export const Default = () => <NetworkCanvas<Node, Link> {...commonProperties} />

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

export const CustomNodeTooltip = () => (
    <NetworkCanvas<Node, Link> {...commonProperties} nodeTooltip={CustomNodeTooltipComponent} />
)

const customNodeRenderer = (ctx: CanvasRenderingContext2D, node: ComputedNode<Node>) => {
    ctx.fillStyle = node.color

    ctx.beginPath()
    ctx.moveTo(node.x, node.y - node.size / 2)
    ctx.lineTo(node.x + node.size / 2, node.y + node.size / 2)
    ctx.lineTo(node.x - node.size / 2, node.y + node.size / 2)
    ctx.fill()
}

export const CustomNodeRenderer = () => (
    <NetworkCanvas<Node, Link> {...commonProperties} renderNode={customNodeRenderer} />
)

export const OnClickHandler = () => (
    <NetworkCanvas<Node, Link> {...commonProperties} onClick={action('onClick')} />
)
