/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { LegendSvg, LegendSvgItem } from '@nivo/legends'
import Bar from '../src/Bar'

it('should render a basic bar chart', () => {
    const component = renderer.create(
        <Bar
            width={500}
            height={300}
            data={[
                { id: 'one', value: 10 },
                { id: 'two', value: 20 },
                { id: 'three', value: 30 },
            ]}
            animate={false}
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
            data={[
                { id: 'one', value: 10 },
                { id: 'two', value: 20 },
                { id: 'three', value: 30 },
            ]}
            animate={false}
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
            data={[
                { id: 'one', value: 10 },
                { id: 'two', value: 20 },
                { id: 'three', value: 30 },
            ]}
            animate={false}
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
            data={[
                { id: 'one', value: 10 },
                { id: 'two', value: 20 },
                { id: 'three', value: 30 },
            ]}
            animate={false}
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
            data={[
                { id: 'one', value: 10 },
                { id: 'two', value: 20 },
                { id: 'three', value: 30 },
            ]}
            animate={false}
        />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it(`should reverse legend items if chart layout is vertical`, () => {
    const wrapper = mount(
        <Bar
            width={500}
            height={300}
            data={[
                { id: 'one', A: 10, B: 13 },
                { id: 'two', A: 12, B: 9 },
            ]}
            keys={['A', 'B']}
            layout="vertical"
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'top-left',
                    direction: 'column',
                    itemWidth: 100,
                    itemHeight: 20,
                },
            ]}
            animate={false}
        />
    )

    expect(wrapper.find(LegendSvg)).toHaveLength(1)

    const legendItems = wrapper.find(LegendSvgItem)
    expect(legendItems).toHaveLength(2)
    expect(legendItems.at(0).prop('data').id).toEqual('B')
    expect(legendItems.at(1).prop('data').id).toEqual('A')
})

it(`should not reverse legend items if chart layout is vertical reversed`, () => {
    const wrapper = mount(
        <Bar
            width={500}
            height={300}
            data={[
                { id: 'one', A: 10, B: 13 },
                { id: 'two', A: 12, B: 9 },
            ]}
            keys={['A', 'B']}
            layout="vertical"
            reverse={true}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'top-left',
                    direction: 'column',
                    itemWidth: 100,
                    itemHeight: 20,
                },
            ]}
            animate={false}
        />
    )

    expect(wrapper.find(LegendSvg)).toHaveLength(1)

    const legendItems = wrapper.find(LegendSvgItem)
    expect(legendItems).toHaveLength(2)
    expect(legendItems.at(0).prop('data').id).toEqual('A')
    expect(legendItems.at(1).prop('data').id).toEqual('B')
})

it(`should not reverse legend items if chart layout is horizontal`, () => {
    const wrapper = mount(
        <Bar
            width={500}
            height={300}
            data={[
                { id: 'one', A: 10, B: 13 },
                { id: 'two', A: 12, B: 9 },
            ]}
            keys={['A', 'B']}
            layout="horizontal"
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'top-left',
                    direction: 'column',
                    itemWidth: 100,
                    itemHeight: 20,
                },
            ]}
            animate={false}
        />
    )

    expect(wrapper.find(LegendSvg)).toHaveLength(1)

    const legendItems = wrapper.find(LegendSvgItem)
    expect(legendItems).toHaveLength(2)
    expect(legendItems.at(0).prop('data').id).toEqual('A')
    expect(legendItems.at(1).prop('data').id).toEqual('B')
})

it(`should reverse legend items if chart layout is horizontal reversed`, () => {
    const wrapper = mount(
        <Bar
            width={500}
            height={300}
            data={[
                { id: 'one', A: 10, B: 13 },
                { id: 'two', A: 12, B: 9 },
            ]}
            keys={['A', 'B']}
            layout="horizontal"
            reverse={true}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'top-left',
                    direction: 'column',
                    itemWidth: 100,
                    itemHeight: 20,
                },
            ]}
            animate={false}
        />
    )

    expect(wrapper.find(LegendSvg)).toHaveLength(1)

    const legendItems = wrapper.find(LegendSvgItem)
    expect(legendItems).toHaveLength(2)
    expect(legendItems.at(0).prop('data').id).toEqual('B')
    expect(legendItems.at(1).prop('data').id).toEqual('A')
})
