import React from 'react'
import { mount } from 'enzyme'
import { Bullet } from '../src'

const sampleData = [
    {
        id: 'A',
        ranges: [10, 20, 40],
        measures: [30],
        markers: [20],
    },
    {
        id: 'B',
        ranges: [100],
        measures: [20, 50],
        markers: [80],
    },
    {
        id: 'C',
        ranges: [50],
        measures: [10],
    },
]

const CustomTitle = () => <text>a custom title for A</text>

const sampleDataWithTitle = [{ ...sampleData[0], title: <CustomTitle /> }, ...sampleData.slice(1)]

describe('Bullet', () => {
    describe('data', () => {
        it('should pass data appropriately', () => {
            const wrapper = mount(<Bullet width={300} height={300} data={sampleData} />)

            const items = wrapper.find('BulletItem')
            expect(items).toHaveLength(sampleData.length)

            expect(items.at(0).prop('id')).toEqual('A')
            expect(items.at(0).prop('ranges')).toEqual([10, 20, 40])
            expect(items.at(0).prop('measures')).toEqual([30])
            expect(items.at(0).prop('markers')).toEqual([20])
            expect(items.at(0).prop('scale')).toEqual(expect.any(Function))

            expect(items.at(1).prop('id')).toEqual('B')
            expect(items.at(1).prop('ranges')).toEqual([100])
            expect(items.at(1).prop('measures')).toEqual([20, 50])
            expect(items.at(1).prop('markers')).toEqual([80])
            expect(items.at(1).prop('scale')).toEqual(expect.any(Function))

            expect(items.at(2).prop('id')).toEqual('C')
            expect(items.at(2).prop('ranges')).toEqual([50])
            expect(items.at(2).prop('measures')).toEqual([10])
            expect(items.at(2).prop('markers')).toBeUndefined()
            expect(items.at(2).prop('scale')).toEqual(expect.any(Function))
        })
    })

    describe('layout', () => {
        it('should use horizontal layout by default', () => {
            const wrapper = mount(<Bullet width={300} height={300} data={sampleData} />)
            const items = wrapper.find('BulletItem')
            const ticks = wrapper.find('Axis').first().find('AxisTick')

            expect(
                ticks.map(el => el.prop('animatedProps').transform.get()).join('; ')
            ).toMatchInlineSnapshot(
                `"translate(0,0); translate(37.5,0); translate(75,0); translate(112.5,0); translate(150,0); translate(187.5,0); translate(225,0); translate(262.5,0); translate(300,0)"`
            )
            expect(items.at(1).prop('x')).toEqual(0)
            expect(items.at(1).prop('y')).toEqual(110)
        })

        it('should support vertical layout', () => {
            const wrapper = mount(
                <Bullet width={300} height={300} data={sampleData} layout="vertical" />
            )
            const items = wrapper.find('BulletItem')

            expect(items.at(1).prop('x')).toEqual(110)
            expect(items.at(1).prop('y')).toEqual(0)
            expect(wrapper.find('BulletRects').at(0).prop('layout')).toEqual('vertical')
        })

        it('should support reverse layout', () => {
            const wrapper = mount(<Bullet width={300} height={300} data={sampleData} reverse />)
            const items = wrapper.find('BulletItem')
            const ticks = wrapper.find('Axis').first().find('AxisTick')

            expect(
                ticks.map(el => el.prop('animatedProps').transform.get()).join('; ')
            ).toMatchInlineSnapshot(
                `"translate(300,0); translate(262.5,0); translate(225,0); translate(187.5,0); translate(150,0); translate(112.5,0); translate(75,0); translate(37.5,0); translate(0,0)"`
            )
            expect(items.at(1).prop('x')).toEqual(0)
            expect(items.at(1).prop('y')).toEqual(110)
        })
    })

    describe('colors', () => {
        it('should support custom colors', () => {
            const wrapper = mount(
                <Bullet
                    width={300}
                    height={300}
                    data={sampleData}
                    rangeColors={['#aaa', '#bbb', '#ccc']}
                    measureColors={['#ddd']}
                    markerColors={['#eee']}
                />
            )
            const rects = wrapper.find('BulletRectsItem')

            expect(rects.at(0).prop('data').color).toEqual('#aaa')
            expect(rects.at(1).prop('data').color).toEqual('#bbb')
            expect(rects.at(2).prop('data').color).toEqual('#ccc')
            expect(rects.at(3).prop('data').color).toEqual('#ddd')

            const markers = wrapper.find('BulletMarkersItem')

            expect(markers.at(0).prop('data').color).toEqual('#eee')
        })
    })

    describe('interactivity', () => {
        it('should support onRangeClick handler', () => {
            const onRangeClick = jest.fn()
            const wrapper = mount(
                <Bullet width={300} height={300} data={sampleData} onRangeClick={onRangeClick} />
            )

            wrapper.find('BulletRectsItem').at(0).simulate('click')

            expect(onRangeClick).toHaveBeenCalledTimes(1)
            expect(onRangeClick).toHaveBeenCalledWith(
                {
                    color: 'rgb(65, 125, 224)',
                    id: 'A',
                    index: 0,
                    v0: 0,
                    v1: 10,
                },
                expect.any(Object)
            )
        })

        it('should support onMeasureClick handler', () => {
            const onMeasureClick = jest.fn()
            const wrapper = mount(
                <Bullet
                    width={300}
                    height={300}
                    data={sampleData}
                    onMeasureClick={onMeasureClick}
                />
            )

            wrapper.find('BulletRectsItem').at(3).simulate('click')

            expect(onMeasureClick).toHaveBeenCalledTimes(1)
            expect(onMeasureClick).toHaveBeenCalledWith(
                {
                    color: 'rgb(173, 10, 129)',
                    id: 'A',
                    index: 0,
                    v0: 0,
                    v1: 30,
                },
                expect.any(Object)
            )
        })

        it('should support onMarkerClick handler', () => {
            const onMarkerClick = jest.fn()
            const wrapper = mount(
                <Bullet width={300} height={300} data={sampleData} onMarkerClick={onMarkerClick} />
            )

            wrapper.find('BulletMarkersItem').at(0).simulate('click')

            expect(onMarkerClick).toHaveBeenCalledTimes(1)
            expect(onMarkerClick).toHaveBeenCalledWith(
                {
                    color: 'rgb(243, 105, 163)',
                    id: 'A',
                    index: 0,
                    value: 20,
                },
                expect.any(Object)
            )
        })
    })

    describe('tooltip', () => {
        it('should render a tooltip when hovering a range', () => {
            const wrapper = mount(<Bullet width={300} height={300} data={sampleData} />)

            expect(wrapper.find('TooltipWrapper').exists()).toBeFalsy()

            wrapper.find('BulletRectsItem').at(0).simulate('mouseenter')

            const tooltip = wrapper.find('TooltipWrapper')

            expect(tooltip.exists()).toBeTruthy()
            expect(tooltip.text()).toEqual('0 to 10')
        })

        it('should render a tooltip when hovering a measure', () => {
            const wrapper = mount(<Bullet width={300} height={300} data={sampleData} />)

            expect(wrapper.find('TooltipWrapper').exists()).toBeFalsy()

            wrapper.find('BulletRectsItem').at(3).simulate('mouseenter')

            const tooltip = wrapper.find('TooltipWrapper')

            expect(tooltip.exists()).toBeTruthy()
            expect(tooltip.text()).toEqual('30')
        })

        it('should render a tooltip when hovering a marker', () => {
            const wrapper = mount(<Bullet width={300} height={300} data={sampleData} />)

            expect(wrapper.find('TooltipWrapper').exists()).toBeFalsy()

            wrapper.find('BulletMarkersItem').at(0).simulate('mouseenter')

            const tooltip = wrapper.find('TooltipWrapper')

            expect(tooltip.exists()).toBeTruthy()
            expect(tooltip.text()).toEqual('20')
        })
    })

    describe('custom components', () => {
        it('should support a custom title component', () => {
            const wrapper = mount(<Bullet width={300} height={300} data={sampleDataWithTitle} />)

            expect(wrapper.find(CustomTitle).exists()).toBeTruthy()
        })

        it('should support a custom range component', () => {
            const CustomRange = () => null

            const wrapper = mount(
                <Bullet width={300} height={300} data={sampleData} rangeComponent={CustomRange} />
            )

            const customRange = wrapper.find(CustomRange)
            const { animatedProps: _animatedProps, ...props } = customRange.at(0).props()

            expect(props).toMatchInlineSnapshot(`
                Object {
                  "color": "rgba(65, 125, 224, 1)",
                  "data": Object {
                    "color": "rgb(65, 125, 224)",
                    "index": 0,
                    "v0": 0,
                    "v1": 10,
                  },
                  "height": 80,
                  "index": 0,
                  "onClick": [Function],
                  "onMouseEnter": [Function],
                  "onMouseLeave": [Function],
                  "onMouseMove": [Function],
                  "width": 75,
                  "x": 0,
                  "y": 0,
                }
            `)
        })

        it('should support a custom measure component', () => {
            const CustomMeasure = () => null

            const wrapper = mount(
                <Bullet
                    width={300}
                    height={300}
                    data={sampleData}
                    measureComponent={CustomMeasure}
                />
            )

            const customMeasure = wrapper.find(CustomMeasure)
            const { animatedProps: _animatedProps, ...props } = customMeasure.at(0).props()

            expect(props).toMatchInlineSnapshot(`
                Object {
                  "color": "rgba(173, 10, 129, 1)",
                  "data": Object {
                    "color": "rgb(173, 10, 129)",
                    "index": 0,
                    "v0": 0,
                    "v1": 30,
                  },
                  "height": 32,
                  "index": 0,
                  "onClick": [Function],
                  "onMouseEnter": [Function],
                  "onMouseLeave": [Function],
                  "onMouseMove": [Function],
                  "width": 225,
                  "x": 0,
                  "y": 0,
                }
            `)
        })

        it('should support a custom marker component', () => {
            const CustomMarker = () => null

            const wrapper = mount(
                <Bullet width={300} height={300} data={sampleData} markerComponent={CustomMarker} />
            )

            const customMarker = wrapper.find(CustomMarker)
            const { animatedProps: _animatedProps, ...props } = customMarker.at(0).props()

            expect(props).toMatchInlineSnapshot(`
                Object {
                  "color": "rgb(243, 105, 163)",
                  "data": Object {
                    "color": "rgb(243, 105, 163)",
                    "index": 0,
                    "value": 20,
                  },
                  "index": 0,
                  "onClick": [Function],
                  "onMouseEnter": [Function],
                  "onMouseLeave": [Function],
                  "onMouseMove": [Function],
                  "rotation": 0,
                  "size": 48,
                  "value": 20,
                  "x": 150,
                  "y": 40,
                }
            `)
        })
    })
})
