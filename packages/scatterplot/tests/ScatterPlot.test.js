import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import ScatterPlot from '../src/ScatterPlot'

const sampleData = [
    { id: 0, x: 0, y: 9 },
    { id: 1, x: 7, y: 13 },
    { id: 2, x: 22, y: 18 },
    { id: 3, x: 33, y: 23 },
    { id: 4, x: 45, y: 31 },
]

it('should render a basic scatterplot chart', () => {
    const component = renderer.create(
        <ScatterPlot
            width={500}
            height={300}
            data={[{ id: 'default', data: sampleData }]}
            animate={false}
        />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should allow to render several series', () => {
    const component = renderer.create(
        <ScatterPlot
            width={500}
            height={300}
            data={[
                { id: 'default', data: sampleData },
                { id: 'extra', data: sampleData },
            ]}
            animate={false}
        />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should allow to customize node size', () => {
    const wrapper = mount(
        <ScatterPlot
            width={500}
            height={300}
            nodeSize={12}
            data={[{ id: 'default', data: sampleData }]}
            animate={false}
        />
    )

    const nodes = wrapper.find('Memo(Node)')
    expect(nodes).toHaveLength(5)
    nodes.forEach(node => {
        expect(node.prop('size')).toBe(12)
    })
})

it('should allow to use a varying node size', () => {
    const wrapper = mount(
        <ScatterPlot
            width={500}
            height={300}
            useMesh={false}
            data={[
                {
                    id: 'default',
                    data: [
                        { x: 0, y: 0, z: 3 },
                        { x: 1, y: 1, z: 5 },
                        { x: 2, y: 2, z: 8 },
                    ],
                },
            ]}
            nodeSize={{
                key: 'z',
                values: [0, 10],
                sizes: [0, 20],
            }}
            animate={false}
        />
    )

    const nodes = wrapper.find('Memo(Node)')
    expect(nodes).toHaveLength(3)
    expect(nodes.at(0).prop('size')).toBe(6)
    expect(nodes.at(1).prop('size')).toBe(10)
    expect(nodes.at(2).prop('size')).toBe(16)
})

const CustomNode = () => <g />

it('should allow to use a custom node', () => {
    const wrapper = mount(
        <ScatterPlot
            width={500}
            height={300}
            data={[{ id: 'default', data: sampleData }]}
            renderNode={CustomNode}
            animate={false}
        />
    )

    const nodes = wrapper.find(CustomNode)
    expect(nodes).toHaveLength(5)
    nodes.forEach(node => {
        expect(node.prop('node')).toBeDefined()
        expect(node.prop('x')).toBeDefined()
        expect(node.prop('y')).toBeDefined()
        expect(node.prop('size')).toBe(9)
        expect(node.prop('color')).toBeDefined()
        expect(node.prop('blendMode')).toBe('normal')
        expect(node.prop('onMouseEnter')).toBeDefined()
        expect(node.prop('onMouseMove')).toBeDefined()
        expect(node.prop('onMouseLeave')).toBeDefined()
    })
})

it('should allow to disable interactivity', () => {
    const wrapper = mount(
        <ScatterPlot
            width={500}
            height={300}
            data={[{ id: 'default', data: sampleData }]}
            isInteractive={false}
            onClick={() => {}}
            animate={false}
        />
    )

    const nodes = wrapper.find('Memo(Node)')
    expect(nodes).toHaveLength(5)
    nodes.forEach(node => {
        expect(node.prop('onMouseEnter')).toBeUndefined()
        expect(node.prop('onMouseMove')).toBeUndefined()
        expect(node.prop('onMouseLeave')).toBeUndefined()
        expect(node.prop('onClick')).toBeUndefined()
    })
})
