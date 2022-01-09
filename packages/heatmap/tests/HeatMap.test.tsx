import { mount } from 'enzyme'
import { Globals } from '@react-spring/web'
// @ts-ignore
import { HeatMap, HeatMapSvgProps, DefaultHeatMapDatum } from '../src'

const baseProps: HeatMapSvgProps<DefaultHeatMapDatum, Record<string, unknown>> = {
    width: 300,
    height: 300,
    data: [
        {
            id: 'A',
            data: [
                { x: 'X', y: 1 },
                { x: 'Y', y: 2 },
                { x: 'Z', y: 3 },
            ],
        },
        {
            id: 'B',
            data: [
                { x: 'X', y: 3 },
                { x: 'Y', y: 2 },
                { x: 'Z', y: 1 },
            ],
        },
        {
            id: 'C',
            data: [
                { x: 'X', y: 2 },
                { x: 'Y', y: 2 },
                { x: 'Z', y: 2 },
            ],
        },
    ],
}

const dataPoints: {
    id: string
    data: DefaultHeatMapDatum
}[] = []
baseProps.data.forEach(serie => {
    serie.data.forEach(datum => {
        dataPoints.push({
            id: `${serie.id}.${datum.x}`,
            data: datum,
        })
    })
})

const CELL_SHAPES = ['rect', 'circle'] as const

beforeAll(() => {
    Globals.assign({ skipAnimation: true })
})

afterAll(() => {
    Globals.assign({ skipAnimation: false })
})

it('should render a basic heamap chart', () => {
    const wrapper = mount(<HeatMap {...baseProps} />)

    dataPoints.forEach(datum => {
        expect(wrapper.find(`g[data-testid='cell.${datum.id}']`).exists()).toBeTruthy()
    })
})

describe('interactivity', () => {
    CELL_SHAPES.forEach(shape => {
        describe(shape, () => {
            it('onClick', () => {
                const onClick = jest.fn()
                const wrapper = mount(
                    <HeatMap {...baseProps} cellComponent={shape} onClick={onClick} />
                )

                dataPoints.forEach(datum => {
                    wrapper.find(`g[data-testid='cell.${datum.id}']`).simulate('click')

                    expect(onClick).toHaveBeenCalledTimes(1)
                    const [data] = onClick.mock.calls[0]
                    expect(data.id).toEqual(datum.id)
                    expect(data.data).toEqual(datum.data)

                    onClick.mockClear()
                })
            })

            it('onMouseEnter', () => {
                const onMouseEnter = jest.fn()
                const wrapper = mount(
                    <HeatMap {...baseProps} cellComponent={shape} onMouseEnter={onMouseEnter} />
                )

                dataPoints.forEach(datum => {
                    wrapper.find(`g[data-testid='cell.${datum.id}']`).simulate('mouseenter')

                    expect(onMouseEnter).toHaveBeenCalledTimes(1)
                    const [data] = onMouseEnter.mock.calls[0]
                    expect(data.id).toEqual(datum.id)
                    expect(data.data).toEqual(datum.data)

                    onMouseEnter.mockClear()
                })
            })

            it('onMouseMove handler', () => {
                const onMouseMove = jest.fn()
                const wrapper = mount(
                    <HeatMap {...baseProps} cellComponent={shape} onMouseMove={onMouseMove} />
                )

                dataPoints.forEach(datum => {
                    wrapper.find(`g[data-testid='cell.${datum.id}']`).simulate('mousemove')

                    expect(onMouseMove).toHaveBeenCalledTimes(1)
                    const [data] = onMouseMove.mock.calls[0]
                    expect(data.id).toEqual(datum.id)
                    expect(data.data).toEqual(datum.data)

                    onMouseMove.mockClear()
                })
            })

            it('onMouseLeave handler', () => {
                const onMouseLeave = jest.fn()
                const wrapper = mount(
                    <HeatMap {...baseProps} cellComponent={shape} onMouseLeave={onMouseLeave} />
                )

                dataPoints.forEach(datum => {
                    wrapper.find(`g[data-testid='cell.${datum.id}']`).simulate('mouseleave')

                    expect(onMouseLeave).toHaveBeenCalledTimes(1)
                    const [data] = onMouseLeave.mock.calls[0]
                    expect(data.id).toEqual(datum.id)
                    expect(data.data).toEqual(datum.data)

                    onMouseLeave.mockClear()
                })
            })

            it('disabled if non interactive', () => {
                const onClick = jest.fn()
                const onMouseEnter = jest.fn()
                const onMouseMove = jest.fn()
                const onMouseLeave = jest.fn()

                const wrapper = mount(
                    <HeatMap
                        {...baseProps}
                        cellComponent={shape}
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                        isInteractive={false}
                    />
                )

                dataPoints.forEach(datum => {
                    const cell = wrapper.find(`g[data-testid='cell.${datum.id}']`)

                    cell.simulate('mouseenter')
                    expect(onMouseEnter).not.toHaveBeenCalled()

                    cell.simulate('mousemove')
                    expect(onMouseMove).not.toHaveBeenCalled()

                    cell.simulate('mouseleave')
                    expect(onMouseLeave).not.toHaveBeenCalled()

                    cell.simulate('click')
                    expect(onClick).not.toHaveBeenCalled()
                })
            })
        })
    })
})

describe('layers', () => {
    it('custom order', () => {
        /*
        const wrapper = mount(<Network {...baseProps} layers={['nodes', 'links']} />)

        const layers = wrapper.find('svg > g').children()
        expect(layers.at(0).is('NetworkNodes')).toBeTruthy()
        expect(layers.at(1).is('NetworkLinks')).toBeTruthy()
        */
    })

    it('custom layer', () => {
        /*
        const CustomLayer = () => null
        const wrapper = mount(<Network {...baseProps} layers={[CustomLayer]} />)

        const customLayer = wrapper.find(CustomLayer)
        expect(customLayer.exists()).toBeTruthy()

        const customLayerProps = customLayer.props()
        expect(customLayerProps).toHaveProperty('nodes')
        expect(customLayerProps).toHaveProperty('links')
        expect(customLayerProps).toHaveProperty('activeNodeIds')
        expect(customLayerProps).toHaveProperty('setActiveNodeIds')
        */
    })
})

describe('annotations', () => {
    it('rect annotation using id', () => {
        /*
        const annotatedNodeId = 'C'
        const wrapper = mount(
            <Network
                {...baseProps}
                annotations={[
                    {
                        type: 'circle',
                        match: {
                            id: annotatedNodeId,
                        },
                        note: 'Note',
                        noteX: 160,
                        noteY: 36,
                    },
                ]}
            />
        )

        const annotation = wrapper.find(Annotation)
        expect(annotation.exists()).toBeTruthy()

        const annotatedNode = wrapper.find(`circle[data-testid='node.${annotatedNodeId}']`)
        const [nodeX, nodeY] = Array.from(
            annotatedNode.prop('transform').match(/translate\(([0-9.]+),([0-9.]+)\)/)
        )
            .slice(1)
            .map(Number)

        expect(annotation.find('circle').first().prop('cx')).toEqual(nodeX)
        expect(annotation.find('circle').first().prop('cy')).toEqual(nodeY)
        */
    })
})

describe('accessibility', () => {
    it('aria properties', () => {
        const wrapper = mount(
            <HeatMap
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