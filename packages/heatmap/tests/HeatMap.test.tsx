import { mount } from 'enzyme'
import { Globals, SpringValue } from '@react-spring/web'
import { Axes, Grid } from '@nivo/axes'
import { Annotation } from '@nivo/annotations'
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

it('should render a basic heatmap chart', () => {
    const wrapper = mount(<HeatMap {...baseProps} />)

    dataPoints.forEach(datum => {
        const cell = wrapper.find(`g[data-testid='cell.${datum.id}']`)
        expect(cell.exists()).toBeTruthy()

        const cellRect = cell.find('rect').parent()
        expect(cellRect.prop<SpringValue<number>>('width').get()).toEqual(100)
        expect(cellRect.prop<SpringValue<number>>('height').get()).toEqual(100)
    })
})

describe('force square cells', () => {
    const expectedSquareSize = 100

    CELL_SHAPES.forEach(shape => {
        describe(shape, () => {
            it('cells should have square dimensions', () => {
                const wrapper = mount(
                    <HeatMap {...baseProps} cellComponent={shape} width={2000} forceSquare />
                )

                dataPoints.forEach(datum => {
                    const cell = wrapper.find(`g[data-testid='cell.${datum.id}']`)
                    const cellShape = cell.find(shape).parent()

                    if (shape === 'rect') {
                        expect(cellShape.prop<SpringValue<number>>('width').get()).toEqual(
                            expectedSquareSize
                        )
                        expect(cellShape.prop<SpringValue<number>>('height').get()).toEqual(
                            expectedSquareSize
                        )
                    } else {
                        expect(cellShape.prop<SpringValue<number>>('r').get() * 2).toEqual(
                            expectedSquareSize
                        )
                    }
                })
            })
        })
    })
})

describe('size variation', () => {
    // use simpler data for easier assertions
    const sizeVariationData = [
        {
            id: 'A',
            data: [
                { x: 'X', y: 5 },
                { x: 'Y', y: 10 },
            ],
        },
        {
            id: 'B',
            data: [
                { x: 'X', y: 7.5 },
                { x: 'Y', y: 10 },
            ],
        },
    ]

    CELL_SHAPES.forEach(shape => {
        describe(shape, () => {
            const cellIdAndValues: { id: string; value: number }[] = []
            sizeVariationData.forEach(serie => {
                serie.data.forEach(datum => {
                    cellIdAndValues.push({
                        id: `${serie.id}.${datum.x}`,
                        value: datum.y,
                    })
                })
            })

            it('0~1 range using default min/max values', () => {
                const wrapper = mount(
                    <HeatMap
                        {...baseProps}
                        cellComponent={shape}
                        data={sizeVariationData}
                        width={200}
                        height={200}
                        sizeVariation={{ sizes: [0, 1] }}
                    />
                )

                cellIdAndValues.forEach(datum => {
                    const cell = wrapper.find(`g[data-testid='cell.${datum.id}']`)
                    const cellShape = cell.find(shape).parent()

                    const expectedSize = (datum.value - 5) * 10 * 2
                    if (shape === 'rect') {
                        expect(cellShape.prop<SpringValue<number>>('width').get()).toEqual(
                            expectedSize
                        )
                        expect(cellShape.prop<SpringValue<number>>('height').get()).toEqual(
                            expectedSize
                        )
                    } else {
                        expect(cellShape.prop<SpringValue<number>>('r').get() * 2).toEqual(
                            expectedSize
                        )
                    }
                })
            })

            it('0~1 range using custom min/max values', () => {
                const wrapper = mount(
                    <HeatMap
                        {...baseProps}
                        cellComponent={shape}
                        data={sizeVariationData}
                        width={200}
                        height={200}
                        sizeVariation={{
                            values: [0, 10],
                            sizes: [0, 1],
                        }}
                    />
                )

                cellIdAndValues.forEach(datum => {
                    const cell = wrapper.find(`g[data-testid='cell.${datum.id}']`)
                    const cellShape = cell.find(shape).parent()

                    const expectedSize = datum.value * 10
                    if (shape === 'rect') {
                        expect(cellShape.prop<SpringValue<number>>('width').get()).toEqual(
                            expectedSize
                        )
                        expect(cellShape.prop<SpringValue<number>>('height').get()).toEqual(
                            expectedSize
                        )
                    } else {
                        expect(cellShape.prop<SpringValue<number>>('r').get() * 2).toEqual(
                            expectedSize
                        )
                    }
                })
            })

            it('custom range using custom min/max values', () => {
                const wrapper = mount(
                    <HeatMap
                        {...baseProps}
                        cellComponent={shape}
                        data={sizeVariationData}
                        width={200}
                        height={200}
                        sizeVariation={{
                            values: [0, 10],
                            sizes: [0.5, 1],
                        }}
                    />
                )

                cellIdAndValues.forEach(datum => {
                    const cell = wrapper.find(`g[data-testid='cell.${datum.id}']`)
                    const cellShape = cell.find(shape).parent()

                    const expectedSize = (0.5 + datum.value * 0.05) * 100
                    if (shape === 'rect') {
                        expect(cellShape.prop<SpringValue<number>>('width').get()).toEqual(
                            expectedSize
                        )
                        expect(cellShape.prop<SpringValue<number>>('height').get()).toEqual(
                            expectedSize
                        )
                    } else {
                        expect(cellShape.prop<SpringValue<number>>('r').get() * 2).toEqual(
                            expectedSize
                        )
                    }
                })
            })
        })
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

            describe('active/inactive', () => {
                it('should support single cell hover target', () => {
                    const wrapper = mount(
                        <HeatMap
                            {...baseProps}
                            activeOpacity={1}
                            inactiveOpacity={0}
                            hoverTarget="cell"
                        />
                    )

                    const hoveredCell = wrapper.find(`g[data-testid='cell.B.Y']`)
                    hoveredCell.simulate('mouseenter')

                    const activeCellIds = ['B.Y']
                    dataPoints.forEach(datum => {
                        const cell = wrapper.find(`g[data-testid='cell.${datum.id}']`).parent()
                        if (activeCellIds.includes(datum.id)) {
                            expect(cell.prop<SpringValue<number>>('opacity').get()).toEqual(1)
                        } else {
                            expect(cell.prop<SpringValue<number>>('opacity').get()).toEqual(0)
                        }
                    })
                })

                it('should support row hover target', () => {
                    const wrapper = mount(
                        <HeatMap
                            {...baseProps}
                            activeOpacity={1}
                            inactiveOpacity={0}
                            hoverTarget="row"
                        />
                    )

                    const hoveredCell = wrapper.find(`g[data-testid='cell.B.Y']`)
                    hoveredCell.simulate('mouseenter')

                    const activeCellIds = ['B.X', 'B.Y', 'B.Z']
                    dataPoints.forEach(datum => {
                        const cell = wrapper.find(`g[data-testid='cell.${datum.id}']`).parent()
                        if (activeCellIds.includes(datum.id)) {
                            expect(cell.prop<SpringValue<number>>('opacity').get()).toEqual(1)
                        } else {
                            expect(cell.prop<SpringValue<number>>('opacity').get()).toEqual(0)
                        }
                    })
                })

                it('should support column hover target', () => {
                    const wrapper = mount(
                        <HeatMap
                            {...baseProps}
                            activeOpacity={1}
                            inactiveOpacity={0}
                            hoverTarget="column"
                        />
                    )

                    const hoveredCell = wrapper.find(`g[data-testid='cell.B.Y']`)
                    hoveredCell.simulate('mouseenter')

                    const activeCellIds = ['A.Y', 'B.Y', 'C.Y']
                    dataPoints.forEach(datum => {
                        const cell = wrapper.find(`g[data-testid='cell.${datum.id}']`).parent()
                        if (activeCellIds.includes(datum.id)) {
                            expect(cell.prop<SpringValue<number>>('opacity').get()).toEqual(1)
                        } else {
                            expect(cell.prop<SpringValue<number>>('opacity').get()).toEqual(0)
                        }
                    })
                })

                it('should support rowColumn hover target', () => {
                    const wrapper = mount(
                        <HeatMap
                            {...baseProps}
                            activeOpacity={1}
                            inactiveOpacity={0}
                            hoverTarget="rowColumn"
                        />
                    )

                    const hoveredCell = wrapper.find(`g[data-testid='cell.B.Y']`)
                    hoveredCell.simulate('mouseenter')

                    const activeCellIds = ['B.X', 'B.Y', 'B.Z', 'A.Y', 'C.Y']
                    dataPoints.forEach(datum => {
                        const cell = wrapper.find(`g[data-testid='cell.${datum.id}']`).parent()
                        if (activeCellIds.includes(datum.id)) {
                            expect(cell.prop<SpringValue<number>>('opacity').get()).toEqual(1)
                        } else {
                            expect(cell.prop<SpringValue<number>>('opacity').get()).toEqual(0)
                        }
                    })
                })
            })
        })
    })
})

describe('layers', () => {
    it('custom order', () => {
        const wrapper = mount(<HeatMap {...baseProps} layers={['cells', 'axes', 'grid']} />)

        const layers = wrapper.find('svg > g').children()
        expect(layers).toHaveLength(3)
        expect(layers.at(0).is('HeatMapCells')).toBeTruthy()
        expect(layers.at(1).is(Axes)).toBeTruthy()
        expect(layers.at(2).is(Grid)).toBeTruthy()
    })

    it('custom layer', () => {
        const CustomLayer = () => null
        const wrapper = mount(<HeatMap {...baseProps} layers={[CustomLayer]} />)

        const customLayer = wrapper.find(CustomLayer)
        expect(customLayer.exists()).toBeTruthy()

        const customLayerProps = customLayer.props()
        expect(customLayerProps).toHaveProperty('cells')
        expect(customLayerProps).toHaveProperty('activeCell')
        expect(customLayerProps).toHaveProperty('setActiveCell')
    })
})

describe('annotations', () => {
    it('annotation using id', () => {
        const annotatedCellId = 'B.Y'
        const wrapper = mount(
            <HeatMap
                {...baseProps}
                annotations={[
                    {
                        type: 'circle',
                        match: { id: annotatedCellId },
                        note: 'Note',
                        noteX: 160,
                        noteY: 36,
                    },
                ]}
            />
        )

        const annotation = wrapper.find(Annotation)
        expect(annotation.exists()).toBeTruthy()

        const annotatedCell = wrapper.find(`g[data-testid='cell.${annotatedCellId}']`)
        const [cellX, cellY] = Array.from(
            annotatedCell.prop<string>('transform').match(/translate\(([0-9.]+), ([0-9.]+)\)/)!
        )
            .slice(1)
            .map(Number)

        expect(annotation.find('circle').first().prop('cx')).toEqual(cellX)
        expect(annotation.find('circle').first().prop('cy')).toEqual(cellY)
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
