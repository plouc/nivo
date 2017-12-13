import React from 'react'
import renderer from 'react-test-renderer'
import Chord from '../src/Chord'

const sampleKeys = ['john', 'raph', 'junko']
const sampleMatrix = [[10, 20, 0], [0, 30, 15], [15, 0, 25]]

it('should render a basic chord diagram', () => {
    const component = renderer.create(
        <Chord width={500} height={300} keys={sampleKeys} matrix={sampleMatrix} />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should allow to disable labels', () => {
    const component = renderer.create(
        <Chord
            width={500}
            height={300}
            keys={sampleKeys}
            matrix={sampleMatrix}
            enableLabel={false}
        />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
