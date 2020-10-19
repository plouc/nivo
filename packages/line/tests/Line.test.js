import React from 'react'
import { mount } from 'enzyme'
import Line from '../src/Line'
import SlicesItem from '../src/SlicesItem'
import renderer from 'react-test-renderer'

it('should render a basic line chart', () => {
    const data = [
        {
            id: 'A',
            data: [
                { x: 0, y: 3 },
                { x: 1, y: 7 },
                { x: 2, y: 11 },
                { x: 3, y: 9 },
                { x: 4, y: 8 },
            ],
        },
    ]
    const component = renderer.create(<Line width={500} height={300} data={data} animate={false} />)

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should support multiple lines', () => {
    const data = [
        {
            id: 'A',
            data: [
                { x: 0, y: 3 },
                { x: 1, y: 7 },
                { x: 2, y: 11 },
                { x: 3, y: 9 },
                { x: 4, y: 8 },
            ],
        },
        {
            id: 'B',
            data: [
                { x: 0, y: 1 },
                { x: 1, y: 3 },
                { x: 2, y: 5 },
                { x: 3, y: 7 },
                { x: 4, y: 11 },
            ],
        },
    ]
    const component = renderer.create(<Line width={500} height={300} data={data} animate={false} />)

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

it('should create slice for each x value', () => {
    const data = [
        {
            id: 'A',
            data: [
                { x: 0, y: 3 },
                { x: 1, y: 7 },
                { x: 2, y: 11 },
                { x: 3, y: 9 },
                { x: 4, y: 8 },
            ],
        },
    ]
    const wrapper = mount(
        <Line width={500} height={300} data={data} enableSlices="x" animate={false} />
    )

    const slices = wrapper.find(SlicesItem)
    expect(slices).toHaveLength(5)
    expect(slices.at(0).prop('slice').id).toBe(0)
    expect(slices.at(1).prop('slice').id).toBe(125)
    expect(slices.at(2).prop('slice').id).toBe(250)
    expect(slices.at(3).prop('slice').id).toBe(375)
    expect(slices.at(4).prop('slice').id).toBe(500)
})

it('should have left and bottom axis by default', () => {
    const data = [
        {
            id: 'A',
            data: [
                { x: 0, y: 3 },
                { x: 1, y: 7 },
                { x: 2, y: 11 },
                { x: 3, y: 9 },
                { x: 4, y: 8 },
            ],
        },
    ]
    const wrapper = mount(<Line width={500} height={300} data={data} animate={false} />)

    const axes = wrapper.find('Axis')
    expect(axes).toHaveLength(2)
    expect(axes.at(0).prop('axis')).toBe('x')
    expect(axes.at(1).prop('axis')).toBe('y')
})

describe('curve interpolation', () => {
    const curveInterpolations = [
        'basis',
        'cardinal',
        'catmullRom',
        'linear',
        'monotoneX',
        'monotoneY',
        'natural',
        'step',
        'stepAfter',
        'stepBefore',
    ]
    const data = [
        {
            id: 'default',
            data: [
                { x: 0, y: 3 },
                { x: 1, y: 7 },
                { x: 2, y: 11 },
                { x: 3, y: 9 },
                { x: 4, y: 8 },
            ],
        },
    ]
    for (const curveInterpolation of curveInterpolations) {
        it(`should support ${curveInterpolation} curve interpolation`, () => {
            const component = renderer.create(
                <Line
                    width={500}
                    height={300}
                    data={data}
                    curve={curveInterpolation}
                    axisLeft={undefined}
                    axisBottom={undefined}
                    isInteractive={false}
                    enableStackTooltip={false}
                    animate={false}
                    enableDots={false}
                    enableGridX={false}
                    enableGridY={false}
                />
            )

            const tree = component.toJSON()
            expect(tree).toMatchSnapshot()
        })
    }
})
