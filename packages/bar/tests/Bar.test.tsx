import { mount } from 'enzyme'
import { create, act, ReactTestRenderer } from 'react-test-renderer'
import { LegendSvg, LegendSvgItem } from '@nivo/legends'
import { Bar, BarDatum, BarItemProps, ComputedDatum, BarItem, BarTooltip } from '../'

type IdValue = {
    id: string
    value: number
}

it('should render a basic bar chart', () => {
    const instance = create(
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
    ).root

    const bars = instance.findAllByType(BarItem)
    expect(bars).toHaveLength(3)
    bars.forEach((bar, index) => {
        expect(bar.findByType('text').children[0]).toBe(`${index + 1}0`)
    })
})

it('should allow to disable labels', () => {
    const instance = create(
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
    ).root

    const bars = instance.findAllByType(BarItem)
    expect(bars).toHaveLength(3)
    bars.forEach(bar => {
        expect(bar.findAllByType('text')).toHaveLength(0)
    })
})

it('should allow grouped mode', () => {
    const instance = create(
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
    ).root

    const bars = instance.findAllByType(BarItem)
    expect(bars).toHaveLength(6)
    const props = instance.findAllByType(BarItem).map(bar => {
        const {
            bar: { height, width, x, y },
        } = bar.props

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
    const instance = create(
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
    ).root

    const bars = instance.findAllByType(BarItem)
    expect(bars).toHaveLength(3)
    const props = instance.findAllByType(BarItem).map(bar => {
        const {
            bar: { height, width, x, y },
        } = bar.props

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
    const instance = create(
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
    ).root

    const bars = instance.findAllByType(BarItem)
    expect(bars).toHaveLength(6)
    const props = instance.findAllByType(BarItem).map(bar => {
        const {
            bar: { height, width, x, y },
        } = bar.props

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

describe('legends', () => {
    it(`should reverse legend items if chart layout is vertical`, () => {
        const instance = create(
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
        ).root

        const legend = instance.findByType(LegendSvg)
        const legendItems = legend.findAllByType(LegendSvgItem)
        expect(legendItems).toHaveLength(2)
        expect(legendItems[0].props.data.id).toEqual('B')
        expect(legendItems[1].props.data.id).toEqual('A')
    })

    it(`should not reverse legend items if chart layout is vertical reversed`, () => {
        const instance = create(
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
        ).root

        const legend = instance.findByType(LegendSvg)
        const legendItems = legend.findAllByType(LegendSvgItem)
        expect(legendItems).toHaveLength(2)
        expect(legendItems[0].props.data.id).toEqual('A')
        expect(legendItems[1].props.data.id).toEqual('B')
    })

    it(`should not reverse legend items if chart layout is horizontal`, () => {
        const instance = create(
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
        ).root

        const legend = instance.findByType(LegendSvg)
        const legendItems = legend.findAllByType(LegendSvgItem)
        expect(legendItems).toHaveLength(2)
        expect(legendItems[0].props.data.id).toEqual('A')
        expect(legendItems[1].props.data.id).toEqual('B')
    })

    it(`should reverse legend items if chart layout is horizontal reversed`, () => {
        const instance = create(
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
        ).root

        const legend = instance.findByType(LegendSvg)
        const legendItems = legend.findAllByType(LegendSvgItem)
        expect(legendItems).toHaveLength(2)
        expect(legendItems[0].props.data.id).toEqual('B')
        expect(legendItems[1].props.data.id).toEqual('A')
    })
})

it(`should generate grouped bars correctly when keys are mismatched`, () => {
    const instance = create(
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
    ).root

    const bars = instance.findAllByType(BarItem)
    expect(bars).toHaveLength(3)
    expect(bars[0].props.bar).toEqual({
        color: '#e8c1a0',
        data: {
            data: { A: 10, C: 3, id: 'one' },
            formattedValue: '10',
            hidden: false,
            id: 'A',
            index: 0,
            indexValue: 'one',
            value: 10,
        },
        height: 300,
        key: 'A.one',
        index: 0,
        label: 'A - one',
        width: 71.33333333333333,
        x: 24,
        y: 0,
        absX: 24,
        absY: 0,
    })
    expect(bars[1].props.bar).toEqual({
        color: '#f47560',
        data: {
            data: { B: 9, id: 'two' },
            formattedValue: '9',
            hidden: false,
            id: 'B',
            index: 1,
            indexValue: 'two',
            value: 9,
        },
        height: 270,
        key: 'B.two',
        index: 1,
        label: 'B - two',
        width: 71.33333333333333,
        x: 333.3333333333333,
        y: 30,
        absX: 333.3333333333333,
        absY: 30,
    })
    expect(bars[2].props.bar).toEqual({
        color: '#f1e15b',
        data: {
            data: { A: 10, C: 3, id: 'one' },
            formattedValue: '3',
            hidden: false,
            id: 'C',
            index: 0,
            indexValue: 'one',
            value: 3,
        },
        height: 90,
        key: 'C.one',
        index: 2,
        label: 'C - one',
        width: 71.33333333333333,
        x: 166.66666666666666,
        y: 210,
        absX: 166.66666666666666,
        absY: 210,
    })
})

it(`should generate stacked bars correctly when keys are mismatched`, () => {
    const instance = create(
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
    ).root

    const bars = instance.findAllByType(BarItem)
    expect(bars).toHaveLength(3)
    expect(bars[0].props.bar).toEqual({
        color: '#e8c1a0',
        data: {
            data: { A: 10, C: 3, id: 'one' },
            formattedValue: '10',
            hidden: false,
            id: 'A',
            index: 0,
            indexValue: 'one',
            value: 10,
        },
        height: 231,
        key: 'A.one',
        index: 0,
        label: 'A - one',
        width: 214,
        x: 24,
        y: 69,
        absX: 24,
        absY: 69,
    })
    expect(bars[1].props.bar).toEqual({
        color: '#f47560',
        data: {
            data: { B: 9, id: 'two' },
            formattedValue: '9',
            hidden: false,
            id: 'B',
            index: 1,
            indexValue: 'two',
            value: 9,
        },
        height: 208,
        key: 'B.two',
        index: 1,
        label: 'B - two',
        width: 214,
        x: 262,
        y: 92,
        absX: 262,
        absY: 92,
    })
    expect(bars[2].props.bar).toEqual({
        color: '#f1e15b',
        data: {
            data: { A: 10, C: 3, id: 'one' },
            formattedValue: '3',
            hidden: false,
            id: 'C',
            index: 0,
            indexValue: 'one',
            value: 3,
        },
        height: 69,
        key: 'C.one',
        index: 2,
        label: 'C - one',
        width: 214,
        x: 24,
        y: 0,
        absX: 24,
        absY: 0,
    })
})

it(`should apply scale rounding by default`, () => {
    const instance = create(
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
    ).root

    const bars = instance.findAllByType(BarItem)
    expect(bars).toHaveLength(3)
    const firstBarWidth = Number(bars[0].props.bar.width)
    expect(firstBarWidth).toEqual(Math.floor(firstBarWidth))
})

it(`should not apply scale rounding when passed indexScale.round: false`, () => {
    const instance = create(
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
    ).root

    const bars = instance.findAllByType(BarItem)
    expect(bars).toHaveLength(3)
    const firstBarWidth = Number(bars[0].props.bar.width)
    expect(firstBarWidth).not.toEqual(Math.floor(firstBarWidth))
})

it('should render bars in grouped mode after updating starting values from 0', () => {
    let component: ReactTestRenderer

    act(() => {
        component = create(
            <Bar
                width={500}
                height={300}
                data={[{ id: 'test', A: 0, B: 0 }]}
                groupMode="grouped"
                keys={['A', 'B']}
                animate={false}
            />
        )
    })

    let bars = component!.root.findAllByType(BarItem)
    expect(bars).toHaveLength(2)
    bars.forEach(bar => {
        expect(bar.props.bar.height).toBe(0)
    })

    act(() => {
        component = create(
            <Bar
                width={500}
                height={300}
                data={[{ id: 'test', A: 10, B: 10 }]}
                groupMode="grouped"
                keys={['A', 'B']}
                animate={false}
            />
        )
    })

    bars = component!.root.findAllByType(BarItem)
    expect(bars).toHaveLength(2)
    bars.forEach(bar => {
        expect(bar.props.bar.height).toBe(300)
    })
})

describe('tooltip', () => {
    it('should render a tooltip when hovering a slice', () => {
        let component: ReactTestRenderer

        act(() => {
            component = create(
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
        })

        const instance = component!.root
        expect(instance.findAllByType(BarTooltip)).toHaveLength(0)

        // const bar = instance.findAllByType(BarItem)[1]
        // act(() => {
        //     bar.findByType('rect').props.onMouseEnter()
        // })

        // wrapper.find('BarItem').at(1).find('rect').simulate('mouseenter')
        //
        // const tooltip = wrapper.find('BarTooltip')
        // expect(tooltip.exists()).toBeTruthy()
        // expect(tooltip.text()).toEqual('A - two: 12')
    })

    xit('should allow to override the default tooltip', () => {
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

xdescribe('accessibility', () => {
    it('should forward root aria properties to the SVG element', () => {
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
                ariaLabel="AriaLabel"
                ariaLabelledBy="AriaLabelledBy"
                ariaDescribedBy="AriaDescribedBy"
            />
        )

        const svg = wrapper.find('svg')

        expect(svg.prop('aria-label')).toBe('AriaLabel')
        expect(svg.prop('aria-labelledby')).toBe('AriaLabelledBy')
        expect(svg.prop('aria-describedby')).toBe('AriaDescribedBy')
    })

    it('should add an aria attributes to bars', () => {
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
                barAriaLabel={() => 'BarAriaLabel'}
                barAriaLabelledBy={() => 'BarAriaLabelledBy'}
                barAriaDescribedBy={() => 'BarAriaDescribedBy'}
            />
        )

        wrapper
            .find('BarItem')
            .find('rect')
            .forEach(bar => {
                expect(bar.prop('aria-label')).toBe('BarAriaLabel')
                expect(bar.prop('aria-labelledby')).toBe('BarAriaLabelledBy')
                expect(bar.prop('aria-describedby')).toBe('BarAriaDescribedBy')
            })
    })
})
