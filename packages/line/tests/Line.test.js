import { mount } from 'enzyme'
import { Axis } from '@nivo/axes'
import Line from '../src/Line'
import { LINE_UNIQUE_ID_PREFIX } from '../src/hooks'
import SlicesItem from '../src/SlicesItem'
import renderer from 'react-test-renderer'

// Handle useId mocks
let id = 0
beforeEach(() => {
    id = 0
})
const generateId = () => `${LINE_UNIQUE_ID_PREFIX}${++id}`

jest.mock('lodash/uniqueId', () => generateId)

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
    expect(slices.at(0).prop('slice').x).toBe(0)
    expect(slices.at(1).prop('slice').x).toBe(125)
    expect(slices.at(2).prop('slice').x).toBe(250)
    expect(slices.at(3).prop('slice').x).toBe(375)
    expect(slices.at(4).prop('slice').x).toBe(500)
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

    const axes = wrapper.find(Axis)
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

describe('mouse events on slices', () => {
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
    const baseProps = {
        width: 500,
        height: 300,
        data: data,
        animate: false,
        enableSlices: 'x',
    }

    it('should call onMouseEnter', () => {
        const onMouseEnter = jest.fn()
        const wrapper = mount(<Line {...baseProps} onMouseEnter={onMouseEnter} />)
        wrapper.find(`[data-ref='slice:${LINE_UNIQUE_ID_PREFIX}1:0']`).simulate('mouseenter', {
            clientX: 100,
            clientY: 100,
        })
        expect(onMouseEnter).toHaveBeenCalledTimes(1)
    })

    it('should call onMouseMove', () => {
        const onMouseMove = jest.fn()
        const wrapper = mount(<Line {...baseProps} onMouseMove={onMouseMove} />)
        wrapper.find(`[data-ref='slice:${LINE_UNIQUE_ID_PREFIX}1:0']`).simulate('mousemove', {
            clientX: 100,
            clientY: 100,
        })
        expect(onMouseMove).toHaveBeenCalledTimes(1)
    })

    it('should call onMouseLeave', () => {
        const onMouseLeave = jest.fn()
        const wrapper = mount(<Line {...baseProps} onMouseLeave={onMouseLeave} />)
        wrapper.find(`[data-ref='slice:${LINE_UNIQUE_ID_PREFIX}1:0']`).simulate('mouseleave')
        expect(onMouseLeave).toHaveBeenCalledTimes(1)
    })

    it('should call onClick', () => {
        const onClick = jest.fn()
        const wrapper = mount(<Line {...baseProps} onClick={onClick} />)
        wrapper.find(`[data-ref='slice:${LINE_UNIQUE_ID_PREFIX}1:0']`).simulate('click')
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})

describe('touch events with useMesh', () => {
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
    const baseProps = {
        width: 500,
        height: 300,
        data: data,
        animate: false,
        useMesh: true,
        enableTouchCrosshair: true,
    }

    it('should call onTouchStart', () => {
        const onTouchStart = jest.fn()
        const wrapper = mount(<Line {...baseProps} onTouchStart={onTouchStart} />)
        wrapper.find(`[data-ref='mesh-interceptor']`).simulate('touchstart', {
            touches: [{ clientX: 50, clientY: 50 }],
        })
        expect(onTouchStart).toHaveBeenCalledTimes(1)
    })

    it('should call onTouchMove', () => {
        const onTouchMove = jest.fn()
        const wrapper = mount(<Line {...baseProps} onTouchMove={onTouchMove} />)
        wrapper.find(`[data-ref='mesh-interceptor']`).simulate('touchmove', {
            touches: [{ clientX: 50, clientY: 50 }],
        })
        expect(onTouchMove).toHaveBeenCalledTimes(1)
    })

    it('should call onTouchEnd', () => {
        const onTouchEnd = jest.fn()
        const wrapper = mount(<Line {...baseProps} onTouchEnd={onTouchEnd} />)
        wrapper
            .find(`[data-ref='mesh-interceptor']`)
            .simulate('touchstart', {
                touches: [{ clientX: 50, clientY: 50 }],
            })
            .simulate('touchend')
        expect(onTouchEnd).toHaveBeenCalledTimes(1)
    })
})

describe('touch events with slices', () => {
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
    const baseProps = {
        width: 500,
        height: 300,
        data: data,
        animate: false,
        enableSlices: 'x',
    }

    it('should call onTouchStart', () => {
        const onTouchStart = jest.fn()
        const wrapper = mount(<Line {...baseProps} onTouchStart={onTouchStart} />)
        wrapper.find(`[data-ref='slice:${LINE_UNIQUE_ID_PREFIX}1:0']`).simulate('touchstart')
        expect(onTouchStart).toHaveBeenCalledTimes(1)
    })

    it('should call onTouchMove', () => {
        const onTouchMove = jest.fn()
        // Enzyme doesn't support this, so we mock it
        document.elementFromPoint = jest.fn(() => {
            const rect = document.createElement('rect')
            rect.setAttribute('data-ref', `slice:${LINE_UNIQUE_ID_PREFIX}1:1`)
            return rect
        })
        const wrapper = mount(<Line {...baseProps} onTouchMove={onTouchMove} />)
        wrapper.find(`[data-ref='slice:${LINE_UNIQUE_ID_PREFIX}1:0']`).simulate('touchmove', {
            touches: [{ clientX: 50, clientY: 50 }],
        })
        expect(onTouchMove).toHaveBeenCalledTimes(1)
    })

    it('should call onTouchEnd', () => {
        const onTouchEnd = jest.fn()
        const wrapper = mount(<Line {...baseProps} onTouchEnd={onTouchEnd} />)
        wrapper.find(`[data-ref='slice:${LINE_UNIQUE_ID_PREFIX}1:0']`).simulate('touchend')
        expect(onTouchEnd).toHaveBeenCalledTimes(1)
    })
})
