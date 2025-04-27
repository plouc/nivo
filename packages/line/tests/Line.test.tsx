import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { DotsItem, LineCurveFactoryId } from '@nivo/core'
import { Axis } from '@nivo/axes'
import { Line } from '../src'
import { LINE_UNIQUE_ID_PREFIX } from '../src/hooks'
import { Lines } from '../src/Lines'
import { SlicesItem } from '../src/SlicesItem'

// Handle useId mocks
let id = 0
beforeEach(() => {
    id = 0
})
const generateId = () => `${LINE_UNIQUE_ID_PREFIX}${++id}`

jest.mock('lodash/uniqueId.js', () => generateId)

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
    renderer.create(<Line width={500} height={300} data={data} animate={false} />)
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
    renderer.create(<Line width={500} height={300} data={data} animate={false} />)
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

it('should hide single line charts by default given their id', () => {
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
                { x: 0, y: 4 },
                { x: 2, y: 8 },
                { x: 3, y: 12 },
                { x: 4, y: 10 },
                { x: 5, y: 9 },
            ],
        },
        {
            id: 'C',
            data: [
                { x: 0, y: 5 },
                { x: 2, y: 9 },
                { x: 3, y: 13 },
                { x: 4, y: 11 },
                { x: 5, y: 10 },
            ],
        },
    ]
    const wrapper = mount(
        <Line
            width={500}
            height={300}
            data={data}
            enableSlices="x"
            animate={false}
            initialHiddenIds={['B']}
        />
    )

    const lines = wrapper.find(Lines)
    expect(lines).toHaveLength(1)
})

it('should hide multiple line charts by default given their ids', () => {
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
                { x: 0, y: 4 },
                { x: 2, y: 8 },
                { x: 3, y: 12 },
                { x: 4, y: 10 },
                { x: 5, y: 9 },
            ],
        },
        {
            id: 'C',
            data: [
                { x: 0, y: 5 },
                { x: 2, y: 9 },
                { x: 3, y: 13 },
                { x: 4, y: 11 },
                { x: 5, y: 10 },
            ],
        },
    ]
    const wrapper = mount(
        <Line
            width={500}
            height={300}
            data={data}
            enableSlices="x"
            animate={false}
            initialHiddenIds={['B', 'C']}
        />
    )

    const lines = wrapper.find(Lines)
    expect(lines).toHaveLength(1)
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

it('should display the label for each points', () => {
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
        <Line
            width={500}
            height={300}
            data={data}
            animate={false}
            pointLabel={'data.yFormatted'}
            enablePointLabel
        />
    )

    const dotsItem = wrapper.find(DotsItem)
    expect(dotsItem).toHaveLength(5)
    expect(dotsItem.at(0).prop('label')).toBe('3')
    expect(dotsItem.at(1).prop('label')).toBe('7')
    expect(dotsItem.at(2).prop('label')).toBe('11')
    expect(dotsItem.at(3).prop('label')).toBe('9')
    expect(dotsItem.at(4).prop('label')).toBe('8')
})

it('should call the custom label callback for each point', () => {
    const serieAData = [
        { x: 0, y: 3 },
        { x: 1, y: 7 },
        { x: 2, y: 11 },
        { x: 3, y: 9 },
        { x: 4, y: 8 },
    ]
    const data = [
        {
            id: 'A',
            data: serieAData,
        },
    ]

    const pointLabelFn = jest.fn(point => point.data.yFormatted)

    renderer.create(
        <Line
            width={500}
            height={300}
            data={data}
            animate={false}
            pointLabel={pointLabelFn}
            enablePointLabel
        />
    )

    expect(pointLabelFn).toHaveBeenCalledTimes(5)

    for (let i = 0; i < serieAData.length; ++i) {
        const currentData = serieAData[i]
        expect(pointLabelFn).toHaveBeenCalledWith({
            id: `A.${i}`,
            absIndex: i,
            indexInSeries: i,
            seriesIndex: 0,
            seriesId: 'A',
            seriesColor: expect.any(String),
            x: expect.any(Number),
            y: expect.any(Number),
            color: expect.any(String),
            borderColor: expect.any(String),
            data: {
                x: currentData.x,
                y: currentData.y,
                yFormatted: String(currentData.y),
                xFormatted: String(currentData.x),
            },
        })
    }
})

it('should display a custom legendNode for marker', () => {
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
    const markers = [
        {
            axis: 'x',
            lineStyle: {
                stroke: 'lightblue',
                strokeWidth: 5,
            },
            legendPosition: 'top',
            legendNode: (
                <foreignObject x={0} y={0} width={32} height={32}>
                    <div>😎</div>
                </foreignObject>
            ),
        },
    ]

    renderer.create(
        <Line width={500} height={300} data={data} animate={false} markers={markers as any[]} />
    )
})

describe('curve interpolation', () => {
    const curveInterpolations: LineCurveFactoryId[] = [
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
            renderer.create(
                <Line
                    width={500}
                    height={300}
                    data={data}
                    curve={curveInterpolation}
                    axisLeft={undefined}
                    axisBottom={undefined}
                    isInteractive={false}
                    animate={false}
                    enableGridX={false}
                    enableGridY={false}
                />
            )
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
        enableSlices: 'x' as const,
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

    it('should call onMouseDown', () => {
        const onMouseDown = jest.fn()
        const wrapper = mount(<Line {...baseProps} onMouseDown={onMouseDown} />)
        wrapper.find(`[data-ref='slice:${LINE_UNIQUE_ID_PREFIX}1:0']`).simulate('mousedown')
        expect(onMouseDown).toHaveBeenCalledTimes(1)
    })

    it('should call onMouseUp', () => {
        const onMouseUp = jest.fn()
        const wrapper = mount(<Line {...baseProps} onMouseUp={onMouseUp} />)
        wrapper.find(`[data-ref='slice:${LINE_UNIQUE_ID_PREFIX}1:0']`).simulate('mouseup')
        expect(onMouseUp).toHaveBeenCalledTimes(1)
    })

    it('should call onClick', () => {
        const onClick = jest.fn()
        const wrapper = mount(<Line {...baseProps} onClick={onClick} />)
        wrapper.find(`[data-ref='slice:${LINE_UNIQUE_ID_PREFIX}1:0']`).simulate('click')
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should call onDoubleClick', () => {
        const onDoubleClick = jest.fn()
        const wrapper = mount(<Line {...baseProps} onDoubleClick={onDoubleClick} />)
        wrapper.find(`[data-ref='slice:${LINE_UNIQUE_ID_PREFIX}1:0']`).simulate('dblclick')
        expect(onDoubleClick).toHaveBeenCalledTimes(1)
    })
})

describe('events with useMesh', () => {
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

    it('should not throw onMouseEnter on empty data', () => {
        const onMouseEnter = jest.fn()
        const wrapper = mount(<Line {...baseProps} data={[]} onMouseEnter={onMouseEnter} />)
        expect(() =>
            wrapper.find(`[data-ref='mesh-interceptor']`).simulate('mouseenter', {
                clientX: 50,
                clientY: 50,
            })
        ).not.toThrow()
        wrapper.unmount()
    })

    it('should call onTouchStart', () => {
        const onTouchStart = jest.fn()
        const wrapper = mount(<Line {...baseProps} onTouchStart={onTouchStart} />)
        wrapper.find(`[data-ref='mesh-interceptor']`).simulate('touchstart', {
            touches: [{ clientX: 50, clientY: 50 }],
        })
        expect(onTouchStart).toHaveBeenCalledTimes(1)
        wrapper.unmount()
    })

    it('should call onTouchMove', () => {
        const onTouchMove = jest.fn()
        const wrapper = mount(<Line {...baseProps} onTouchMove={onTouchMove} />)
        wrapper.find(`[data-ref='mesh-interceptor']`).simulate('touchmove', {
            touches: [{ clientX: 50, clientY: 50 }],
        })
        expect(onTouchMove).toHaveBeenCalledTimes(1)
        wrapper.unmount()
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
        wrapper.unmount()
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
        useMesh: false,
        enableSlices: 'x' as const,
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
