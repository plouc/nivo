import { useState } from 'react'
import { mount } from 'enzyme'
import { Bar, BarDatum, BarItemProps, ComputedDatum } from '../src'

type IdValue = {
    id: string
    value: number
}

it('should render a basic bar chart', () => {
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

    expect(wrapper.find('BarItem')).toHaveLength(3)

    wrapper.find('BarItem').forEach((bar, index) => {
        expect(bar.text()).toBe(`${index + 1}0`)
    })
})

it('should allow to disable labels', () => {
    const wrapper = mount(
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

    wrapper.find('BarItem').forEach(bar => {
        expect(bar.text()).toBe('')
    })
})

it('should allow grouped mode', () => {
    const wrapper = mount(
        <Bar
            width={500}
            height={300}
            enableLabel={false}
            groupMode="grouped"
            keys={['value1', 'value2']}
            data={[
                { id: 'one', value1: 10, value2: 100 },
                { id: 'two', value1: 20, value2: 200 },
                { id: 'three', value1: 30, value2: 300 },
            ]}
            animate={false}
        />
    )

    const props = wrapper.find('BarItem').map(bar => {
        const {
            bar: { height, width, x, y },
        } = (bar.props() as unknown) as BarItemProps<BarDatum>

        return { height, width, x, y }
    })

    expect(props).toMatchInlineSnapshot(`
        Array [
          Object {
            "height": 10,
            "width": 72.5,
            "x": 17,
            "y": 290,
          },
          Object {
            "height": 20,
            "width": 72.5,
            "x": 178,
            "y": 280,
          },
          Object {
            "height": 30,
            "width": 72.5,
            "x": 339,
            "y": 270,
          },
          Object {
            "height": 100,
            "width": 72.5,
            "x": 89.5,
            "y": 200,
          },
          Object {
            "height": 200,
            "width": 72.5,
            "x": 250.5,
            "y": 100,
          },
          Object {
            "height": 300,
            "width": 72.5,
            "x": 411.5,
            "y": 0,
          },
        ]
    `)
})

it('should allow horizontal layout', () => {
    const wrapper = mount(
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

    const props = wrapper.find('BarItem').map(bar => {
        const {
            bar: { height, width, x, y },
        } = (bar.props() as unknown) as BarItemProps<BarDatum>

        return { height, width, x, y }
    })

    expect(props).toMatchInlineSnapshot(`
        Array [
          Object {
            "height": 86,
            "width": 167,
            "x": 0,
            "y": 203,
          },
          Object {
            "height": 86,
            "width": 333,
            "x": 0,
            "y": 107,
          },
          Object {
            "height": 86,
            "width": 500,
            "x": 0,
            "y": 11,
          },
        ]
    `)
})

it('should allow grouped horizontal layout', () => {
    const wrapper = mount(
        <Bar
            width={500}
            height={300}
            enableLabel={false}
            groupMode="grouped"
            layout="horizontal"
            keys={['value1', 'value2']}
            data={[
                { id: 'one', value1: 10, value2: 100 },
                { id: 'two', value1: 20, value2: 200 },
                { id: 'three', value1: 30, value2: 300 },
            ]}
            animate={false}
        />
    )

    const props = wrapper.find('BarItem').map(bar => {
        const {
            bar: { height, width, x, y },
        } = (bar.props() as unknown) as BarItemProps<BarDatum>

        return { height, width, x, y }
    })

    expect(props).toMatchInlineSnapshot(`
        Array [
          Object {
            "height": 43,
            "width": 17,
            "x": 0,
            "y": 203,
          },
          Object {
            "height": 43,
            "width": 33,
            "x": 0,
            "y": 107,
          },
          Object {
            "height": 43,
            "width": 50,
            "x": 0,
            "y": 11,
          },
          Object {
            "height": 43,
            "width": 167,
            "x": 0,
            "y": 246,
          },
          Object {
            "height": 43,
            "width": 333,
            "x": 0,
            "y": 150,
          },
          Object {
            "height": 43,
            "width": 500,
            "x": 0,
            "y": 54,
          },
        ]
    `)
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

    expect(wrapper.find('LegendSvg')).toHaveLength(1)

    const legendItems = wrapper.find('LegendSvgItem')
    expect(legendItems).toHaveLength(2)
    expect(legendItems.at(0).prop<ComputedDatum<IdValue>>('data').id).toEqual('B')
    expect(legendItems.at(1).prop<ComputedDatum<IdValue>>('data').id).toEqual('A')
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

    expect(wrapper.find('LegendSvg')).toHaveLength(1)

    const legendItems = wrapper.find('LegendSvgItem')
    expect(legendItems).toHaveLength(2)
    expect(legendItems.at(0).prop<ComputedDatum<IdValue>>('data').id).toEqual('A')
    expect(legendItems.at(1).prop<ComputedDatum<IdValue>>('data').id).toEqual('B')
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

    expect(wrapper.find('LegendSvg')).toHaveLength(1)

    const legendItems = wrapper.find('LegendSvgItem')
    expect(legendItems).toHaveLength(2)
    expect(legendItems.at(0).prop<ComputedDatum<IdValue>>('data').id).toEqual('A')
    expect(legendItems.at(1).prop<ComputedDatum<IdValue>>('data').id).toEqual('B')
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

    expect(wrapper.find('LegendSvg')).toHaveLength(1)

    const legendItems = wrapper.find('LegendSvgItem')
    expect(legendItems).toHaveLength(2)
    expect(legendItems.at(0).prop<ComputedDatum<IdValue>>('data').id).toEqual('B')
    expect(legendItems.at(1).prop<ComputedDatum<IdValue>>('data').id).toEqual('A')
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

    expect(bars.at(0).prop('bar')).toEqual({
        color: '#e8c1a0',
        data: {
            data: { A: 10, C: 3, id: 'one' },
            formattedValue: '10',
            id: 'A',
            index: 0,
            indexValue: 'one',
            value: 10,
        },
        height: 300,
        key: 'A.one',
        label: 'A - one',
        width: 71.33333333333333,
        x: 24,
        y: 0,
    })

    expect(bars.at(1).prop('bar')).toEqual({
        color: '#f47560',
        data: {
            data: { B: 9, id: 'two' },
            formattedValue: '9',
            id: 'B',
            index: 1,
            indexValue: 'two',
            value: 9,
        },
        height: 270,
        key: 'B.two',
        label: 'B - two',
        width: 71.33333333333333,
        x: 333.3333333333333,
        y: 30,
    })

    expect(bars.at(2).prop('bar')).toEqual({
        color: '#f1e15b',
        data: {
            data: { A: 10, C: 3, id: 'one' },
            formattedValue: '3',
            id: 'C',
            index: 0,
            indexValue: 'one',
            value: 3,
        },
        height: 90,
        key: 'C.one',
        label: 'C - one',
        width: 71.33333333333333,
        x: 166.66666666666666,
        y: 210,
    })
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

    expect(bars.at(0).prop('bar')).toEqual({
        color: '#e8c1a0',
        data: {
            data: { A: 10, C: 3, id: 'one' },
            formattedValue: '10',
            id: 'A',
            index: 0,
            indexValue: 'one',
            value: 10,
        },
        height: 231,
        key: 'A.one',
        label: 'A - one',
        width: 214,
        x: 24,
        y: 69,
    })

    expect(bars.at(1).prop('bar')).toEqual({
        color: '#f47560',
        data: {
            data: { B: 9, id: 'two' },
            formattedValue: '9',
            id: 'B',
            index: 1,
            indexValue: 'two',
            value: 9,
        },
        height: 208,
        key: 'B.two',
        label: 'B - two',
        width: 214,
        x: 262,
        y: 92,
    })

    expect(bars.at(2).prop('bar')).toEqual({
        color: '#f1e15b',
        data: {
            data: { A: 10, C: 3, id: 'one' },
            formattedValue: '3',
            id: 'C',
            index: 0,
            indexValue: 'one',
            value: 3,
        },
        height: 69,
        key: 'C.one',
        label: 'C - one',
        width: 214,
        x: 24,
        y: 0,
    })
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
    const firstBarWidth = Number(bars.at(0).prop<BarItemProps<BarDatum>['bar']>('bar').width)
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
    const firstBarWidth = Number(bars.at(0).prop<BarItemProps<BarDatum>['bar']>('bar').width)
    expect(firstBarWidth).not.toEqual(Math.floor(firstBarWidth))
})

it('should render bars in grouped mode after updating starting values from 0', () => {
    const MyBar = () => {
        const [data, setData] = useState([{ id: 'test', A: 0, B: 0 }])

        return (
            <>
                <button onClick={() => setData([{ id: 'test', A: 10, B: 10 }])}>update</button>
                <Bar
                    width={500}
                    height={300}
                    data={data}
                    groupMode="grouped"
                    keys={['A', 'B']}
                    animate={false}
                />
            </>
        )
    }

    const wrapper = mount(<MyBar />)

    wrapper.find('BarItem').forEach(bar => {
        expect(bar.prop<BarItemProps<BarDatum>['bar']>('bar').height).toBe(0)
    })

    wrapper.find('button').simulate('click')

    wrapper.find('BarItem').forEach(bar => {
        expect(bar.prop<BarItemProps<BarDatum>['bar']>('bar').height).toBe(300)
    })
})

describe('tooltip', () => {
    it('should render a tooltip when hovering a slice', () => {
        const wrapper = mount(
            <Bar
                width={500}
                height={300}
                data={[
                    { id: 'one', A: 10, B: 13 },
                    { id: 'two', A: 12, B: 9 },
                ]}
                keys={['A', 'B']}
                animate={false}
            />
        )

        expect(wrapper.find('BarTooltip').exists()).toBeFalsy()

        wrapper.find('BarItem').at(1).find('rect').simulate('mouseenter')

        const tooltip = wrapper.find('BarTooltip')
        expect(tooltip.exists()).toBeTruthy()
        expect(tooltip.text()).toEqual('A - two: 12')
    })

    it('should allow to override the default tooltip', () => {
        const CustomTooltip = ({ id }) => <span>{id}</span>
        const wrapper = mount(
            <Bar
                width={500}
                height={300}
                data={[
                    { id: 'one', A: 10, B: 13 },
                    { id: 'two', A: 12, B: 9 },
                ]}
                keys={['A', 'B']}
                tooltip={CustomTooltip}
                animate={false}
            />
        )

        wrapper.find('BarItem').at(1).find('rect').simulate('mouseenter')

        expect(wrapper.find(CustomTooltip).exists()).toBeTruthy()
    })
})
