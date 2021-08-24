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

        const nodeA = nodes.at(0).prop<ScatterPlotNodeData<{ x: number; y: number }>>('node').data
        expect(nodeA.x).toBe(0)
        expect(nodeA.formattedX).toBe('x: 0')

        const nodeB = nodes.at(1).prop<ScatterPlotNodeData<{ x: number; y: number }>>('node').data
        expect(nodeB.x).toBe(1)
        expect(nodeB.formattedX).toBe('x: 1')

        const nodeC = nodes.at(2).prop<ScatterPlotNodeData<{ x: number; y: number }>>('node').data
        expect(nodeC.x).toBe(2)
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

        const nodeA = nodes.at(0).prop<ScatterPlotNodeData<{ x: string; y: number }>>('node').data
        expect(nodeA.x).toBe('A')
        expect(nodeA.formattedX).toBe('value: A')

        const nodeB = nodes.at(1).prop<ScatterPlotNodeData<{ x: string; y: number }>>('node').data
        expect(nodeB.x).toBe('B')
        expect(nodeB.formattedX).toBe('value: B')

        const nodeC = nodes.at(2).prop<ScatterPlotNodeData<{ x: string; y: number }>>('node').data
        expect(nodeC.x).toBe('C')
        expect(nodeC.formattedX).toBe('value: C')
    })

    it('should support date values for x', () => {})

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

        const nodeA = nodes.at(0).prop<ScatterPlotNodeData<{ x: number; y: number }>>('node').data
        expect(nodeA.y).toBe(0)
        expect(nodeA.formattedY).toBe('y: 0')

        const nodeB = nodes.at(1).prop<ScatterPlotNodeData<{ x: number; y: number }>>('node').data
        expect(nodeB.y).toBe(1)
        expect(nodeB.formattedY).toBe('y: 1')

        const nodeC = nodes.at(2).prop<ScatterPlotNodeData<{ x: number; y: number }>>('node').data
        expect(nodeC.y).toBe(2)
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

        const nodeA = nodes.at(0).prop<ScatterPlotNodeData<{ x: number; y: string }>>('node').data
        expect(nodeA.y).toBe('A')
        expect(nodeA.formattedY).toBe('value: A')

        const nodeB = nodes.at(1).prop<ScatterPlotNodeData<{ x: number; y: string }>>('node').data
        expect(nodeB.y).toBe('B')
        expect(nodeB.formattedY).toBe('value: B')

        const nodeC = nodes.at(2).prop<ScatterPlotNodeData<{ x: number; y: string }>>('node').data
        expect(nodeC.y).toBe('C')
        expect(nodeC.formattedY).toBe('value: C')
    })

    it('should support date values for y', () => {})
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
                    key: 'z',
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
                nodeId="id"
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
    it('should support annotations', () => {})

    it('should support markers', () => {})
})

describe('accessibility', () => {})
