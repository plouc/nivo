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

it(`should generate grouped bars correctly when keys are mismatched`, () => {
    const wrapper = mount(
        <Bar
            width={500}
            height={300}
            data={[
                { id: 'one', A: 10, C: 3 },
                { id: 'two', B: 9 },
            ]}
            keys={['A', 'B', 'C']}
            groupMode="grouped"
            animate={false}
        />
    )

    const bars = wrapper.find('BarItem')

    expect(bars).toHaveLength(3)

    expect(bars.at(0).prop('data')).toEqual({
        data: { A: 10, C: 3, id: 'one' },
        id: 'A',
        index: 0,
        indexValue: 'one',
        value: 10,
    })
    expect(bars.at(0).prop('x')).toEqual(24)
    expect(bars.at(0).prop('y')).toEqual(0)
    expect(bars.at(0).prop('height')).toEqual(300)
    expect(bars.at(0).prop('width')).toEqual(71.33333333333333)

    expect(bars.at(1).prop('data')).toEqual({
        data: { B: 9, id: 'two' },
        id: 'B',
        index: 1,
        indexValue: 'two',
        value: 9,
    })
    expect(bars.at(1).prop('x')).toEqual(333.3333333333333)
    expect(bars.at(1).prop('y')).toEqual(30)
    expect(bars.at(1).prop('height')).toEqual(270)
    expect(bars.at(1).prop('width')).toEqual(71.33333333333333)

    expect(bars.at(2).prop('data')).toEqual({
        data: { A: 10, C: 3, id: 'one' },
        id: 'C',
        index: 0,
        indexValue: 'one',
        value: 3,
    })
    expect(bars.at(2).prop('x')).toEqual(166.66666666666666)
    expect(bars.at(2).prop('y')).toEqual(210)
    expect(bars.at(2).prop('height')).toEqual(90)
    expect(bars.at(2).prop('width')).toEqual(71.33333333333333)
})

it(`should generate stacked bars correctly when keys are mismatched`, () => {
    const wrapper = mount(
        <Bar
            width={500}
            height={300}
            data={[
                { id: 'one', A: 10, C: 3 },
                { id: 'two', B: 9 },
            ]}
            keys={['A', 'B', 'C']}
            animate={false}
        />
    )

    const bars = wrapper.find('BarItem')

    expect(bars).toHaveLength(3)

    expect(bars.at(0).prop('data')).toEqual({
        data: { A: 10, C: 3, id: 'one' },
        id: 'A',
        index: 0,
        indexValue: 'one',
        value: 10,
    })
    expect(bars.at(0).prop('x')).toEqual(24)
    expect(bars.at(0).prop('y')).toEqual(69)
    expect(bars.at(0).prop('height')).toEqual(231)
    expect(bars.at(0).prop('width')).toEqual(214)

    expect(bars.at(1).prop('data')).toEqual({
        data: { B: 9, id: 'two' },
        id: 'B',
        index: 1,
        indexValue: 'two',
        value: 9,
    })
    expect(bars.at(1).prop('x')).toEqual(262)
    expect(bars.at(1).prop('y')).toEqual(92)
    expect(bars.at(1).prop('height')).toEqual(208)
    expect(bars.at(1).prop('width')).toEqual(214)

    expect(bars.at(2).prop('data')).toEqual({
        data: { A: 10, C: 3, id: 'one' },
        id: 'C',
        index: 0,
        indexValue: 'one',
        value: 3,
    })
    expect(bars.at(2).prop('x')).toEqual(24)
    expect(bars.at(2).prop('y')).toEqual(0)
    expect(bars.at(2).prop('height')).toEqual(69)
    expect(bars.at(2).prop('width')).toEqual(214)
})

it(`should apply scale rounding by default`, () => {
    const wrapper = mount(
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

    const bars = wrapper.find('BarItem')
    const firstBarWidth = bars.at(0).prop('width')
    expect(firstBarWidth).toEqual(Math.floor(firstBarWidth))
})

it(`should not apply scale rounding when passed indexScale.round: false`, () => {
    const wrapper = mount(
        <Bar
            width={500}
            height={300}
            data={[
                { id: 'one', value: 10 },
                { id: 'two', value: 20 },
                { id: 'three', value: 30 },
            ]}
            animate={false}
            indexScale={{ type: 'band', round: false }}
        />
    )

    const bars = wrapper.find('BarItem')
    const firstBarWidth = bars.at(0).prop('width')
    expect(firstBarWidth).not.toEqual(Math.floor(firstBarWidth))
})
