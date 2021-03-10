import { action } from '@storybook/addon-actions'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { NetworkCanvasDefaultProps } from '../src/props'
import { generateNetworkData } from '@nivo/generators'
import { NetworkCanvas } from '../src'

const data = generateNetworkData()

const commonProps = {
    ...NetworkCanvasDefaultProps,
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

stories.add('default', () => <NetworkCanvas {...commonProps} />)

stories.add('custom tooltip', () => (
    <NetworkCanvas
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
    <NetworkCanvas {...commonProps} onClick={action('onClick')} />
))

stories.add('custom node', () => (
    <NetworkCanvas
        {...commonProps}
        renderNode={(ctx, props) => {
            const { node } = props
            ctx.fillStyle = 'red'
            ctx.beginPath()
            ctx.moveTo(node.x, node.y - node.radius)
            ctx.lineTo(node.x + node.radius, node.y + node.radius)
            ctx.lineTo(node.x - node.radius, node.y + node.radius)
            ctx.fill()
        }}
    />
))
