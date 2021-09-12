import { Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { generateNetworkData } from '@nivo/generators'
import {
    NetworkCanvas,
    canvasDefaultProps,
    NetworkCanvasProps,
    NetworkComputedNode,
    NetworkNodeTooltipProps,
    // @ts-ignore
} from '../src'

export default {
    component: NetworkCanvas,
    title: 'NetworkCanvas',
    decorators: [withKnobs],
} as Meta

const data = generateNetworkData()

type NodeType = typeof data['nodes'][0]

const commonProperties: NetworkCanvasProps<NodeType> = {
    ...canvasDefaultProps,
    data,
    width: 900,
    height: 400,
    nodeColor: node => node.color,
    repulsivity: 6,
    iterations: 60,
}

export const Default = () => <NetworkCanvas<NodeType> {...commonProperties} />

const customNodeRenderer = (ctx: CanvasRenderingContext2D, node: NetworkComputedNode<NodeType>) => {
    ctx.fillStyle = node.color

    ctx.beginPath()
    ctx.moveTo(node.x, node.y - node.radius)
    ctx.lineTo(node.x + node.radius, node.y + node.radius)
    ctx.lineTo(node.x - node.radius, node.y + node.radius)
    ctx.fill()
}

export const CustomNodeRenderer = () => (
    <NetworkCanvas<NodeType> {...commonProperties} renderNode={customNodeRenderer} />
)

const CustomNodeTooltipComponent = ({ node }: NetworkNodeTooltipProps<NodeType>) => (
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
        Depth: {node.depth}
        <br />
        Radius: {node.radius}
    </div>
)

export const CustomNodeTooltip = () => (
    <NetworkCanvas<NodeType> {...commonProperties} nodeTooltip={CustomNodeTooltipComponent} />
)

export const OnClickHandler = () => (
    <NetworkCanvas<NodeType> {...commonProperties} onClick={action('onClick')} />
)
