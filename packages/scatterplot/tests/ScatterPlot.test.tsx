import { mount } from 'enzyme'
// @ts-ignore
import { ScatterPlot, ScatterPlotNodeData } from '../src'

type TestDatum = {
    id: number
    x: number
    y: number
}

const sampleData: TestDatum[] = [
    { id: 0, x: 0, y: 9 },
    { id: 1, x: 7, y: 13 },
    { id: 2, x: 22, y: 18 },
    { id: 3, x: 33, y: 23 },
    { id: 4, x: 45, y: 31 },
]

const baseProps = {
    width: 500,
    height: 300,
    data: [{ id: 'default', data: sampleData }],
    animate: false,
}

it('should render a basic scatterplot chart', () => {
    const wrapper = mount(<ScatterPlot<TestDatum> {...baseProps} />)

    const nodes = wrapper.find('Node')
    expect(nodes).toHaveLength(5)
})

describe('data', () => {
    it('should allow to render several series', () => {
        const wrapper = mount(
            <ScatterPlot<TestDatum>
                {...baseProps}
                data={[
                    { id: 'default', data: sampleData },
                    { id: 'extra', data: sampleData },
                ]}
            />
        )

        const nodes = wrapper.find('Node')
        expect(nodes).toHaveLength(10)
    })

    it('should support numeric values for x', () => {
        const wrapper = mount(
            <ScatterPlot<{ x: number; y: number }>
                {...baseProps}
                xFormat={v => `x: ${v}`}
                data={[
                    {
                        id: baseProps.data[0].id,
                        data: [
                            { x: 0, y: 10 },
                            { x: 1, y: 10 },
                            { x: 2, y: 10 },
                        ],
                    },
                ]}
            />
        )

        const nodes = wrapper.find('Node')
        expect(nodes).toHaveLength(3)

        const nodeA = nodes.at(0).prop<ScatterPlotNodeData<{ x: number; y: number }>>('node')
        expect(nodeA.x).toBe(0)
        expect(nodeA.xValue).toBe(0)
        expect(nodeA.formattedX).toBe('x: 0')

        const nodeB = nodes.at(1).prop<ScatterPlotNodeData<{ x: number; y: number }>>('node')
        expect(nodeB.x).toBe(250)
        expect(nodeB.xValue).toBe(1)
        expect(nodeB.formattedX).toBe('x: 1')

        const nodeC = nodes.at(2).prop<ScatterPlotNodeData<{ x: number; y: number }>>('node')
        expect(nodeC.x).toBe(500)
        expect(nodeC.xValue).toBe(2)
        expect(nodeC.formattedX).toBe('x: 2')
    })

    it('should support categorical values for x', () => {
        const wrapper = mount(
            <ScatterPlot<{ x: string; y: number }>
                {...baseProps}
                xScale={{
                    type: 'point',
                }}
                xFormat={v => `value: ${v}`}
                data={[
                    {
                        id: baseProps.data[0].id,
                        data: [
                            { x: 'A', y: 10 },
                            { x: 'B', y: 10 },
                            { x: 'C', y: 10 },
                        ],
                    },
                ]}
            />
        )

        const nodes = wrapper.find('Node')
        expect(nodes).toHaveLength(3)

        const nodeA = nodes.at(0).prop<ScatterPlotNodeData<{ x: string; y: number }>>('node')
        expect(nodeA.x).toBe(0)
        expect(nodeA.xValue).toBe('A')
        expect(nodeA.formattedX).toBe('value: A')

        const nodeB = nodes.at(1).prop<ScatterPlotNodeData<{ x: string; y: number }>>('node')
        expect(nodeB.x).toBe(250)
        expect(nodeB.xValue).toBe('B')
        expect(nodeB.formattedX).toBe('value: B')

        const nodeC = nodes.at(2).prop<ScatterPlotNodeData<{ x: string; y: number }>>('node')
        expect(nodeC.x).toBe(500)
        expect(nodeC.xValue).toBe('C')
        expect(nodeC.formattedX).toBe('value: C')
    })

    it('should support string date values for x', () => {
        const wrapper = mount(
            <ScatterPlot<{ x: string; y: number }>
                {...baseProps}
                data={[
                    {
                        id: baseProps.data[0].id,
                        data: [
                            { x: '2020-10-1', y: 10 },
                            { x: '2020-10-2', y: 20 },
                            { x: '2020-10-3', y: 30 },
                        ],
                    },
                ]}
                xScale={{
                    type: 'time',
                    format: '%Y-%m-%d',
                }}
                xFormat={'time:%Y-%m-%d'}
                axisLeft={null}
                axisBottom={{
                    tickValues: 'every 1 day',
                    format: '%Y-%m-%d',
                }}
            />
        )

        const nodes = wrapper.find('Node')
        expect(nodes).toHaveLength(3)

        const nodeA = nodes.at(0).prop<ScatterPlotNodeData<{ x: string; y: number }>>('node')
        expect(nodeA.x).toBe(0)
        expect(nodeA.xValue).toStrictEqual(new Date('2020-10-01T00:00:00.000Z'))
        expect(nodeA.formattedX).toBe('2020-10-01')

        const nodeB = nodes.at(1).prop<ScatterPlotNodeData<{ x: string; y: number }>>('node')
        expect(nodeB.x).toBe(250)
        expect(nodeB.xValue).toStrictEqual(new Date('2020-10-02T00:00:00.000Z'))
        expect(nodeB.formattedX).toBe('2020-10-02')

        const nodeC = nodes.at(2).prop<ScatterPlotNodeData<{ x: string; y: number }>>('node')
        expect(nodeC.x).toBe(500)
        expect(nodeC.xValue).toStrictEqual(new Date('2020-10-03T00:00:00.000Z'))
        expect(nodeC.formattedX).toBe('2020-10-03')

        const ticks = wrapper.find('Memo(Axis)').find('Memo(AxisTick)')
        expect(ticks).toHaveLength(3)
        expect(ticks.at(0).text()).toBe('2020-10-01')
        expect(ticks.at(1).text()).toBe('2020-10-02')
        expect(ticks.at(2).text()).toBe('2020-10-03')
    })

    it('should support date values for x', () => {
        const wrapper = mount(
            <ScatterPlot<{ x: Date; y: number }>
                {...baseProps}
                data={[
                    {
                        id: baseProps.data[0].id,
                        data: [
                            { x: new Date('2020-10-01T00:00:00.000Z'), y: 10 },
                            { x: new Date('2020-10-02T00:00:00.000Z'), y: 20 },
                            { x: new Date('2020-10-03T00:00:00.000Z'), y: 30 },
                        ],
                    },
                ]}
                xScale={{ type: 'time' }}
                xFormat={'time:%Y-%m-%d'}
                axisLeft={null}
                axisBottom={{
                    tickValues: 'every 1 day',
                    format: '%Y-%m-%d',
                }}
            />
        )

        const nodes = wrapper.find('Node')
        expect(nodes).toHaveLength(3)

        const nodeA = nodes.at(0).prop<ScatterPlotNodeData<{ x: Date; y: number }>>('node')
        expect(nodeA.x).toBe(0)
        expect(nodeA.xValue).toStrictEqual(new Date('2020-10-01T00:00:00.000Z'))
        expect(nodeA.formattedX).toBe('2020-10-01')

        const nodeB = nodes.at(1).prop<ScatterPlotNodeData<{ x: Date; y: number }>>('node')
        expect(nodeB.x).toBe(250)
        expect(nodeB.xValue).toStrictEqual(new Date('2020-10-02T00:00:00.000Z'))
        expect(nodeB.formattedX).toBe('2020-10-02')

        const nodeC = nodes.at(2).prop<ScatterPlotNodeData<{ x: Date; y: number }>>('node')
        expect(nodeC.x).toBe(500)
        expect(nodeC.xValue).toStrictEqual(new Date('2020-10-03T00:00:00.000Z'))
        expect(nodeC.formattedX).toBe('2020-10-03')

        const ticks = wrapper.find('Memo(Axis)').find('Memo(AxisTick)')
        expect(ticks).toHaveLength(3)
        expect(ticks.at(0).text()).toBe('2020-10-01')
        expect(ticks.at(1).text()).toBe('2020-10-02')
        expect(ticks.at(2).text()).toBe('2020-10-03')
    })

    it('should support numeric values for y', () => {
        const wrapper = mount(
            <ScatterPlot<{ x: number; y: number }>
                {...baseProps}
                yFormat={v => `y: ${v}`}
                data={[
                    {
                        id: baseProps.data[0].id,
                        data: [
                            { x: 10, y: 0 },
                            { x: 20, y: 1 },
                            { x: 30, y: 2 },
                        ],
                    },
                ]}
            />
        )

        const nodes = wrapper.find('Node')
        expect(nodes).toHaveLength(3)

        const nodeA = nodes.at(0).prop<ScatterPlotNodeData<{ x: number; y: number }>>('node')
        expect(nodeA.y).toBe(300)
        expect(nodeA.yValue).toBe(0)
        expect(nodeA.formattedY).toBe('y: 0')

        const nodeB = nodes.at(1).prop<ScatterPlotNodeData<{ x: number; y: number }>>('node')
        expect(nodeB.y).toBe(150)
        expect(nodeB.yValue).toBe(1)
        expect(nodeB.formattedY).toBe('y: 1')

        const nodeC = nodes.at(2).prop<ScatterPlotNodeData<{ x: number; y: number }>>('node')
        expect(nodeC.y).toBe(0)
        expect(nodeC.yValue).toBe(2)
        expect(nodeC.formattedY).toBe('y: 2')
    })

    it('should support categorical values for y', () => {
        const wrapper = mount(
            <ScatterPlot<{ x: number; y: string }>
                {...baseProps}
                yScale={{
                    type: 'point',
                }}
                yFormat={v => `value: ${v}`}
                data={[
                    {
                        id: baseProps.data[0].id,
                        data: [
                            { x: 10, y: 'A' },
                            { x: 20, y: 'B' },
                            { x: 30, y: 'C' },
                        ],
                    },
                ]}
            />
        )

        const nodes = wrapper.find('Node')
        expect(nodes).toHaveLength(3)

        const nodeA = nodes.at(0).prop<ScatterPlotNodeData<{ x: number; y: string }>>('node')
        expect(nodeA.y).toBe(0)
        expect(nodeA.yValue).toBe('A')
        expect(nodeA.formattedY).toBe('value: A')

        const nodeB = nodes.at(1).prop<ScatterPlotNodeData<{ x: number; y: string }>>('node')
        expect(nodeB.y).toBe(150)
        expect(nodeB.yValue).toBe('B')
        expect(nodeB.formattedY).toBe('value: B')

        const nodeC = nodes.at(2).prop<ScatterPlotNodeData<{ x: number; y: string }>>('node')
        expect(nodeC.y).toBe(300)
        expect(nodeC.yValue).toBe('C')
        expect(nodeC.formattedY).toBe('value: C')
    })

    it('should support string date values for y', () => {
        const wrapper = mount(
            <ScatterPlot<{ x: number; y: string }>
                {...baseProps}
                data={[
                    {
                        id: baseProps.data[0].id,
                        data: [
                            { x: 10, y: '2020-10-1' },
                            { x: 20, y: '2020-10-2' },
                            { x: 30, y: '2020-10-3' },
                        ],
                    },
                ]}
                yScale={{
                    type: 'time',
                    format: '%Y-%m-%d',
                }}
                yFormat={'time:%Y-%m-%d'}
                axisBottom={null}
                axisLeft={{
                    tickValues: 'every 1 day',
                    format: '%Y-%m-%d',
                }}
            />
        )

        const nodes = wrapper.find('Node')
        expect(nodes).toHaveLength(3)

        const nodeA = nodes.at(0).prop<ScatterPlotNodeData<{ x: number; y: string }>>('node')
        expect(nodeA.y).toBe(0)
        expect(nodeA.yValue).toStrictEqual(new Date('2020-10-01T00:00:00.000Z'))
        expect(nodeA.formattedY).toBe('2020-10-01')

        const nodeB = nodes.at(1).prop<ScatterPlotNodeData<{ x: number; y: string }>>('node')
        expect(nodeB.y).toBe(150)
        expect(nodeB.yValue).toStrictEqual(new Date('2020-10-02T00:00:00.000Z'))
        expect(nodeB.formattedY).toBe('2020-10-02')

        const nodeC = nodes.at(2).prop<ScatterPlotNodeData<{ x: number; y: string }>>('node')
        expect(nodeC.y).toBe(300)
        expect(nodeC.yValue).toStrictEqual(new Date('2020-10-03T00:00:00.000Z'))
        expect(nodeC.formattedY).toBe('2020-10-03')

        const ticks = wrapper.find('Memo(Axis)').find('Memo(AxisTick)')
        expect(ticks).toHaveLength(3)
        expect(ticks.at(0).text()).toBe('2020-10-01')
        expect(ticks.at(1).text()).toBe('2020-10-02')
        expect(ticks.at(2).text()).toBe('2020-10-03')
    })

    it('should support date values for y', () => {
        const wrapper = mount(
            <ScatterPlot<{ x: number; y: Date }>
                {...baseProps}
                data={[
                    {
                        id: baseProps.data[0].id,
                        data: [
                            { x: 10, y: new Date('2020-10-01T00:00:00.000Z') },
                            { x: 20, y: new Date('2020-10-02T00:00:00.000Z') },
                            { x: 30, y: new Date('2020-10-03T00:00:00.000Z') },
                        ],
                    },
                ]}
                yScale={{ type: 'time' }}
                yFormat={'time:%Y-%m-%d'}
                axisBottom={null}
                axisLeft={{
                    tickValues: 'every 1 day',
                    format: '%Y-%m-%d',
                }}
            />
        )

        const nodes = wrapper.find('Node')
        expect(nodes).toHaveLength(3)

        const nodeA = nodes.at(0).prop<ScatterPlotNodeData<{ x: number; y: Date }>>('node')
        expect(nodeA.y).toBe(0)
        expect(nodeA.yValue).toStrictEqual(new Date('2020-10-01T00:00:00.000Z'))
        expect(nodeA.formattedY).toBe('2020-10-01')

        const nodeB = nodes.at(1).prop<ScatterPlotNodeData<{ x: number; y: Date }>>('node')
        expect(nodeB.y).toBe(150)
        expect(nodeB.yValue).toStrictEqual(new Date('2020-10-02T00:00:00.000Z'))
        expect(nodeB.formattedY).toBe('2020-10-02')

        const nodeC = nodes.at(2).prop<ScatterPlotNodeData<{ x: number; y: Date }>>('node')
        expect(nodeC.y).toBe(300)
        expect(nodeC.yValue).toStrictEqual(new Date('2020-10-03T00:00:00.000Z'))
        expect(nodeC.formattedY).toBe('2020-10-03')

        const ticks = wrapper.find('Memo(Axis)').find('Memo(AxisTick)')
        expect(ticks).toHaveLength(3)
        expect(ticks.at(0).text()).toBe('2020-10-01')
        expect(ticks.at(1).text()).toBe('2020-10-02')
        expect(ticks.at(2).text()).toBe('2020-10-03')
    })
})

describe('nodes', () => {
    it('should allow to customize node size', () => {
        const wrapper = mount(<ScatterPlot<TestDatum> {...baseProps} nodeSize={12} />)

        const nodes = wrapper.find('Node')
        expect(nodes).toHaveLength(5)
        nodes.forEach(node => {
            expect(node.prop<ScatterPlotNodeData<TestDatum>>('node').size).toBe(12)
        })
    })

    it('should allow to use a varying node size', () => {
        const wrapper = mount(
            <ScatterPlot<{ x: number; y: number; z: number }>
                {...baseProps}
                useMesh={false}
                data={[
                    {
                        id: 'default',
                        data: [
                            { x: 0, y: 0, z: 3 },
                            { x: 1, y: 1, z: 5 },
                            { x: 2, y: 2, z: 8 },
                        ],
                    },
                ]}
                nodeSize={{
                    key: 'data.z',
                    values: [0, 10],
                    sizes: [0, 20],
                }}
            />
        )

        const nodes = wrapper.find('Node')
        expect(nodes).toHaveLength(3)
        expect(
            nodes.at(0).prop<ScatterPlotNodeData<{ x: number; y: number; z: number }>>('node').size
        ).toBe(6)
        expect(
            nodes.at(1).prop<ScatterPlotNodeData<{ x: number; y: number; z: number }>>('node').size
        ).toBe(10)
        expect(
            nodes.at(2).prop<ScatterPlotNodeData<{ x: number; y: number; z: number }>>('node').size
        ).toBe(16)
    })

    it('should allow to use a custom node', () => {
        const CustomNode = () => <g />

        const wrapper = mount(<ScatterPlot<TestDatum> {...baseProps} nodeComponent={CustomNode} />)

        const nodes = wrapper.find(CustomNode)
        expect(nodes).toHaveLength(5)
        nodes.forEach(node => {
            const nodeProp = node.prop<ScatterPlotNodeData<TestDatum>>('node')
            expect(nodeProp).toBeDefined()
            expect(nodeProp.x).toBeDefined()
            expect(nodeProp.y).toBeDefined()
            expect(nodeProp.size).toBe(9)
            expect(nodeProp.color).toBeDefined()
            expect(node.prop('blendMode')).toBe('normal')
            expect(node.prop('onMouseEnter')).toBeDefined()
            expect(node.prop('onMouseMove')).toBeDefined()
            expect(node.prop('onMouseLeave')).toBeDefined()
        })
    })

    it('should allow to specify the nodeId property', () => {
        const ids = ['a', 'b', 'c', 'd', 'e']
        const wrapper = mount(
            <ScatterPlot<{ id: string; x: number; y: number }>
                {...baseProps}
                data={[
                    {
                        id: 'default',
                        data: sampleData.map(data => ({ ...data, id: ids[data.id] })),
                    },
                ]}
                nodeId="data.id"
            />
        )

        const nodes = wrapper.find('Node')
        expect(nodes).toHaveLength(5)
        nodes.forEach((node, index) => {
            expect(node.prop<ScatterPlotNodeData<TestDatum>>('node').id).toBe(ids[index])
        })
    })
})

describe('tooltip', () => {
    it('should have a tooltip by default', () => {
        const wrapper = mount(<ScatterPlot<TestDatum> {...baseProps} />)

        let tooltip = wrapper.find('Tooltip').at(1)
        expect(tooltip.exists()).toBe(false)

        const node = wrapper.find('Node').at(2)
        node.find('circle').simulate('mouseenter')

        tooltip = wrapper.find('Tooltip').at(1)
        expect(tooltip.exists()).toBe(true)
        expect(tooltip.text()).toBe('default: x: 22, y: 18')
    })

    it('should allow to disable tooltip by disabling interactivity', () => {
        const wrapper = mount(<ScatterPlot<TestDatum> {...baseProps} isInteractive={false} />)

        wrapper.find('Node').at(2).find('circle').simulate('mouseenter')
        expect(wrapper.find('Tooltip').exists()).toBe(false)
    })

    it('should support a custom tooltip component', () => {
        const CustomTooltip = () => <div />
        const wrapper = mount(<ScatterPlot<TestDatum> {...baseProps} tooltip={CustomTooltip} />)

        let tooltip = wrapper.find(CustomTooltip)
        expect(tooltip.exists()).toBe(false)

        const node = wrapper.find('Node').at(2)
        node.find('circle').simulate('mouseenter')

        tooltip = wrapper.find(CustomTooltip)
        expect(tooltip.exists()).toBe(true)
        expect(tooltip.prop('node')).toBe(node.prop('node'))
    })
})

describe('event handlers', () => {
    const eventHandlers = [
        { handler: 'onMouseEnter', simulated: 'mouseenter', tooltipExpected: true },
        { handler: 'onMouseMove', simulated: 'mousemove', tooltipExpected: true },
        { handler: 'onMouseLeave', simulated: 'mouseleave', tooltipExpected: false },
        { handler: 'onClick', simulated: 'click', tooltipExpected: false },
    ]

    eventHandlers.forEach(eventHandler => {
        it(`should support ${eventHandler.handler}`, () => {
            const mock = jest.fn()
            const wrapper = mount(
                <ScatterPlot<TestDatum>
                    {...{
                        ...baseProps,
                        [eventHandler.handler]: mock,
                    }}
                />
            )

            const node = wrapper.find('Node').at(1)
            node.find('circle').simulate(eventHandler.simulated)

            expect(mock).toHaveBeenCalledTimes(1)
            const [datum] = mock.mock.calls[0]
            expect(datum.id).toBe('default.1')

            const tooltip = wrapper.find('Tooltip').at(1)
            if (eventHandler.tooltipExpected) {
                expect(tooltip.exists()).toBe(true)
                expect(tooltip.text()).toBe('default: x: 7, y: 13')
            } else {
                expect(tooltip.exists()).toBe(false)
            }
        })

        it(`should disable ${eventHandler.handler} when non interactive`, () => {
            const mock = jest.fn()
            const wrapper = mount(
                <ScatterPlot<TestDatum>
                    {...{
                        ...baseProps,
                        [eventHandler.handler]: mock,
                    }}
                    isInteractive={false}
                />
            )

            wrapper.find('Node').at(1).find('circle').simulate(eventHandler.simulated)
            expect(mock).not.toHaveBeenCalled()
        })
    })
})

describe('annotations', () => {
    it('should support annotations', () => {
        const wrapper = mount(
            <ScatterPlot<TestDatum>
                {...baseProps}
                layers={['nodes', 'annotations']}
                isInteractive={false}
                annotations={[
                    {
                        match: d => d.index === 2,
                        type: 'circle',
                        note: 'annotation',
                        noteX: 350,
                        noteY: 50,
                    },
                ]}
            />
        )

        const annotation = wrapper.find('Annotation')
        expect(annotation.exists()).toBe(true)

        const node = wrapper.find('Node').at(2)

        expect(annotation.prop('datum')).toBe(node.prop('node'))
        expect(annotation.prop('x')).toBe(node.prop<ScatterPlotNodeData<TestDatum>>('node').x)
        expect(annotation.prop('y')).toBe(node.prop<ScatterPlotNodeData<TestDatum>>('node').y)
        expect(annotation.prop('size')).toBe(node.prop<ScatterPlotNodeData<TestDatum>>('node').size)
        expect(annotation.prop('width')).toBe(
            node.prop<ScatterPlotNodeData<TestDatum>>('node').size
        )
        expect(annotation.prop('height')).toBe(
            node.prop<ScatterPlotNodeData<TestDatum>>('node').size
        )
    })

    it('should support markers', () => {
        const wrapper = mount(
            <ScatterPlot<TestDatum>
                {...baseProps}
                markers={[
                    { axis: 'x', value: 22.5, legend: 'x marker' },
                    { axis: 'y', value: 15.5, legend: 'y marker' },
                ]}
            />
        )

        const markers = wrapper.find('CartesianMarkersItem')
        expect(markers.length).toBe(2)

        const xMarker = markers.at(0)
        expect(xMarker.prop('axis')).toBe('x')
        expect(xMarker.prop('value')).toBe(22.5)
        expect(xMarker.prop('width')).toBe(500)
        expect(xMarker.prop('height')).toBe(300)
        expect(xMarker.find('g').prop('transform')).toBe('translate(250, 0)')
        expect(xMarker.find('line').prop('y1')).toBe(0)
        expect(xMarker.find('line').prop('y2')).toBe(300)
        expect(xMarker.find('text').text()).toBe('x marker')

        const yMarker = markers.at(1)
        expect(yMarker.prop('axis')).toBe('y')
        expect(yMarker.prop('value')).toBe(15.5)
        expect(yMarker.prop('width')).toBe(500)
        expect(yMarker.prop('height')).toBe(300)
        expect(yMarker.find('g').prop('transform')).toBe('translate(0, 150)')
        expect(yMarker.find('line').prop('x1')).toBe(0)
        expect(yMarker.find('line').prop('x2')).toBe(500)
        expect(yMarker.find('text').text()).toBe('y marker')
    })
})

describe('accessibility', () => {
    it('should forward root aria properties to the SVG element', () => {
        const wrapper = mount(
            <ScatterPlot<TestDatum>
                {...baseProps}
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
})
