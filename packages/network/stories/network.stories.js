import React from 'react'
import { storiesOf } from '@storybook/react'
import { NetworkDefaultProps } from '../src/props'
import { generateData } from '../../../website/src/data/components/network/generator'
import { Network } from '../src'

const data = generateData()

const NetworkStorieProps = {
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

stories.add('default', () => <Network {...NetworkStorieProps} />)
