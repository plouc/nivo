import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { NetworkDefaultProps } from '../src/props'
import { generateNetworkData } from '@nivo/generators'
import { Network } from '../src'

const data = generateNetworkData()

const commonProps = {
    ...NetworkDefaultProps,
    nodes: data.nodes,
    links: data.links,
    width: 900,
    height: 340,
    nodeColor: function (t) {
        return t.color
    },
    repulsivity: 6,
    iterations: 60,
}

const stories = storiesOf('Network', module)

stories.add('default', () => <Network {...commonProps} />)

stories.add('custom tooltip', () => (
    <Network
        {...commonProps}
        tooltip={node => {
            return (
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
        }}
    />
))

stories.add('supports onClick for the node', () => (
    <Network {...commonProps} onClick={action('onClick')} />
))

stories.add('custom node', () => (
    <Network
        {...commonProps}
        nodeComponent={node => (
            <g transform={`translate(${node.x - 6},${node.y - 8}) scale(${0.5})`}>
                <circle cx="12" cy="8" r="5" />
                <path d="M3,21 h18 C 21,12 3,12 3,21" />
            </g>
        )}
    />
))
