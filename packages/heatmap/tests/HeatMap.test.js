import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import HeatMapCellRect from '../src/HeatMapCellRect'
import HeatMap from '../src/HeatMap'

const sampleProps = {
    indexBy: 'age',
    keys: ['rent', 'loan', 'income'],
    data: [
        {
            age: 20,
            rent: 30,
            loan: 24,
            income: 60,
        },
        {
            age: 30,
            rent: 40,
            loan: 50,
            income: 90,
        },
        {
            age: 40,
            rent: 20,
            loan: 13,
            income: 40,
        },
    ],
    width: 500,
    height: 300,
    animate: false,
}

it('should render a basic heat map chart', () => {
    const component = renderer.create(<HeatMap {...sampleProps} />)

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should allow to disable labels', () => {
    const wrapper = mount(<HeatMap {...sampleProps} enableLabels={false} />)

    const cells = wrapper.find(HeatMapCellRect)
    expect(cells).toHaveLength(9)
    cells.forEach(cell => {
        expect(cell.find('text').exists()).toBe(false)
    })
})
