import { Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { generateNetworkData } from '@nivo/generators'
import {
    Network,
    NetworkInputNode,
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

const commonProperties: NetworkSvgProps<NetworkInputNode> = {
    ...svgDefaultProps,
    data,
    width: 900,
    height: 340,
    nodeColor: node => node.color,
    repulsivity: 6,
    iterations: 60,
}

export const Default = () => <Network {...commonProperties} />

const CustomNodeTooltipComponent = ({ node }: NetworkNodeTooltipProps<NetworkInputNode>) => (
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
    <Network {...commonProperties} nodeTooltip={CustomNodeTooltipComponent} />
)

export const OnClickHandler = () => <Network {...commonProperties} onClick={action('onClick')} />
