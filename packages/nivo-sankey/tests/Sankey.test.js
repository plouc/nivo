import React from 'react'
import renderer from 'react-test-renderer'
import Sankey from '../src/Sankey'

const sampleNodes = [
    { id: 'john' },
    { id: 'raph' },
    { id: 'jane' },
    { id: 'marcel' },
    { id: 'raoul' },
]
const sampleLinks = [
    {
        source: 'john',
        target: 'jane',
        value: 75,
    },
    {
        source: 'raph',
        target: 'jane',
        value: 25,
    },
    {
        source: 'jane',
        target: 'marcel',
        value: 50,
    },
    {
        source: 'jane',
        target: 'raoul',
        value: 50,
    },
]

it('should render a basic sankey diagram', () => {
    const component = renderer.create(
        <Sankey
            width={500}
            height={300}
            data={{
                nodes: sampleNodes,
                links: sampleLinks,
            }}
        />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should allow to disable labels', () => {
    const component = renderer.create(
        <Sankey
            width={500}
            height={300}
            data={{
                nodes: sampleNodes,
                links: sampleLinks,
            }}
            enableLabels={false}
        />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
