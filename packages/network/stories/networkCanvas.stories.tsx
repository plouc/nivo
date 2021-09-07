import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { NetworkDefaultProps } from '../src/props'
import { generateNetworkData } from '@nivo/generators'
import { NetworkCanvas } from '../src'

const data = generateNetworkData()

const commonProperties = {
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

const stories = storiesOf('NetworkCanvas', module)

stories.add('default', () => <NetworkCanvas {...commonProperties} />)

stories.add('custom tooltip', () => (
    <NetworkCanvas
        {...commonProperties}
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
    <NetworkCanvas {...commonProperties} onClick={action('onClick')} />
))
