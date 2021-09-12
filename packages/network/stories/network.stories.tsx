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
    height: 340,
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
    <div>
        <div>
            <strong style={{ color: node.color }}>ID: {node.id}</strong>
            <br />
            Depth: {node.depth}
            <br />
            Radius: {node.radius}
        </div>
    </div>
)

export const CustomNodeTooltip = () => (
    <Network<NodeType> {...commonProperties} nodeTooltip={CustomNodeTooltipComponent} />
)

export const OnClickHandler = () => (
    <Network<NodeType> {...commonProperties} onClick={action('onClick')} />
)
