import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { LegendSvg, LegendSvgItem } from '@nivo/legends'
import Waffle from '../src/Waffle'

it('should render a basic waffle chart in SVG', () => {
    const component = renderer.create(
        <Waffle
            width={400}
            height={400}
            rows={10}
            columns={10}
            total={100}
            data={[{ id: 'one', label: 'one', value: 10 }]}
        />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

const fillModes = ['top', 'right', 'bottom', 'left']
for (const fillMode of fillModes) {
    it(`should support ${fillMode} fill mode`, () => {
        const component = renderer.create(
            <Waffle
                width={400}
                height={400}
                rows={10}
                columns={10}
                total={100}
                data={[{ id: 'one', label: 'one', value: 10 }]}
                fillDirection={fillMode}
            />
        )

        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
}

describe('legends', () => {
    it('should support legends', () => {
        const data = [
            { id: 'one', label: 'one', value: 10 },
            { id: 'two', label: 'two', value: 20 },
            { id: 'tree', label: 'tree', value: 30 },
        ]
        const legends = [
            {
                anchor: 'top-left',
                direction: 'column',
                itemWidth: 100,
                itemHeight: 20,
            },
        ]
        const wrapper = mount(
            <Waffle
                width={400}
                height={400}
                rows={10}
                columns={10}
                total={100}
                colors={['red', 'green', 'blue']}
                data={data}
                legends={legends}
            />
        )

        expect(wrapper.find(LegendSvg)).toHaveLength(1)

        const legendItems = wrapper.find(LegendSvgItem)
        expect(legendItems).toHaveLength(3)
        expect(legendItems.at(0).prop('data')).toEqual({
            id: 'one',
            label: 'one',
            color: 'red',
        })
        expect(legendItems.at(1).prop('data')).toEqual({
            id: 'two',
            label: 'two',
            color: 'green',
        })
        expect(legendItems.at(2).prop('data')).toEqual({
            id: 'tree',
            label: 'tree',
            color: 'blue',
        })
    })
})
