import React from 'react'
import renderer from 'react-test-renderer'
import ScatterPlot from '../src/ScatterPlot'

const sampleData = [
    { id: 0, x: 0, y: 10 },
    { id: 1, x: 10, y: 15 },
    { id: 2, x: 20, y: 20 },
    { id: 3, x: 30, y: 25 },
    { id: 4, x: 40, y: 30 },
]

it('should render a basic scatterplot chart', () => {
    const component = renderer.create(
        <ScatterPlot width={500} height={300} data={[{ id: 'default', data: sampleData }]} />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should allow to render several series', () => {
    const component = renderer.create(
        <ScatterPlot
            width={500}
            height={300}
            data={[{ id: 'default', data: sampleData }, { id: 'extra', data: sampleData }]}
        />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should allow to customize symbol size', () => {
    const component = renderer.create(
        <ScatterPlot
            width={500}
            height={300}
            symbolSize={12}
            data={[{ id: 'default', data: sampleData }]}
        />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
