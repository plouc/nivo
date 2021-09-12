import { Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { generateNetworkData } from '@nivo/generators'
import {
    Network,
    NetworkNodeProps,
    NetworkNodeTooltipProps,
    NetworkSvgProps,
    svgDefaultProps,
    // @ts-ignore
} from '../src'

export default {
    component: Network,
    title: 'Network',
    decorators: [withKnobs],
} as Meta

const data = generateNetworkData()

type NodeType = typeof data['nodes'][0]

const commonProperties: NetworkSvgProps<NodeType> = {
    ...svgDefaultProps,
    data,
    width: 900,
    height: 400,
    nodeColor: node => node.color,
    repulsivity: 6,
    iterations: 60,
}

export const Default = () => <Network<NodeType> {...commonProperties} />

const CustomNodeComponent = ({ node }: NetworkNodeProps<NodeType>) => (
    <g transform={`translate(${node.x - 6},${node.y - 8}) scale(${0.5})`}>
        <circle cx="12" cy="8" r="5" />
        <path d="M3,21 h18 C 21,12 3,12 3,21" />
    </g>
)

export const CustomNode = () => (
    <Network<NodeType> {...commonProperties} nodeComponent={CustomNodeComponent} />
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
    <Network<NodeType> {...commonProperties} nodeTooltip={CustomNodeTooltipComponent} />
)

export const OnClickHandler = () => (
    <Network<NodeType> {...commonProperties} onClick={action('onClick')} />
)
