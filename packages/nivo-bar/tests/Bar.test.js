import React from 'react'
import renderer from 'react-test-renderer'
import Bar from '../src/Bar'

it('should render a basic bar chart', () => {
    const component = renderer.create(
        <Bar
            width={500}
            height={300}
            data={[{ id: 'one', value: 10 }, { id: 'two', value: 20 }, { id: 'three', value: 30 }]}
        />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should allow to disable labels', () => {
    const component = renderer.create(
        <Bar
            width={500}
            height={300}
            enableLabel={false}
            data={[{ id: 'one', value: 10 }, { id: 'two', value: 20 }, { id: 'three', value: 30 }]}
        />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should allow grouped mode', () => {
    const component = renderer.create(
        <Bar
            width={500}
            height={300}
            enableLabel={false}
            groupMode="grouped"
            data={[{ id: 'one', value: 10 }, { id: 'two', value: 20 }, { id: 'three', value: 30 }]}
        />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should allow horizontal layout', () => {
    const component = renderer.create(
        <Bar
            width={500}
            height={300}
            enableLabel={false}
            layout="horizontal"
            data={[{ id: 'one', value: 10 }, { id: 'two', value: 20 }, { id: 'three', value: 30 }]}
        />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should allow grouped horizontal layout', () => {
    const component = renderer.create(
        <Bar
            width={500}
            height={300}
            enableLabel={false}
            groupMode="grouped"
            layout="horizontal"
            data={[{ id: 'one', value: 10 }, { id: 'two', value: 20 }, { id: 'three', value: 30 }]}
        />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
