import { Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { generateNetworkData } from '@nivo/generators'
import {
    NetworkCanvas,
    canvasDefaultProps,
    NetworkCanvasProps,
    NetworkInputNode,
    NetworkNodeTooltipProps,
    // @ts-ignore
} from '../src'

export default {
    component: NetworkCanvas,
    title: 'NetworkCanvas',
    decorators: [withKnobs],
} as Meta

const data = generateNetworkData()

const commonProperties: NetworkCanvasProps<NetworkInputNode> = {
    ...canvasDefaultProps,
    data,
    width: 900,
    height: 340,
    nodeColor: node => node.color,
    repulsivity: 6,
    iterations: 60,
}

export const Default = () => <NetworkCanvas {...commonProperties} />

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
    <NetworkCanvas {...commonProperties} nodeTooltip={CustomNodeTooltipComponent} />
)

export const OnClickHandler = () => (
    <NetworkCanvas {...commonProperties} onClick={action('onClick')} />
)
