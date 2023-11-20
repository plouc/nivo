import { create, act } from 'react-test-renderer'
import { Globals } from '@react-spring/web'
import { linearGradientDef, radiansToDegrees } from '@nivo/core'
import {
    ArcShape,
    ArcLabelsLayer,
    ArcLabelComponent as ArcLabel,
    ArcLinkLabelsLayer,
    ArcLinkLabelComponent as ArcLinkLabel,
} from '@nivo/arcs'
import { LegendSvgItem, SymbolSquare } from '@nivo/legends'
// @ts-ignore
import { Pie } from '../src/index'

const sampleData = [
    {
        id: 'A',
        value: 30,
        color: '#ff5500',
    },
    {
        id: 'B',
        value: 20,
        color: '#ffdd00',
    },
    {
        id: 'C',
        value: 50,
        color: '#99cc44',
    },
] as const

const sampleGradientData = [
    linearGradientDef('gradientA', [
        {
            offset: 0,
            color: '#e8c1a0',
        },
        {
            offset: 100,
            color: '#ff5500',
            opacity: 0,
        },
    ]),
    linearGradientDef('gradientB', [
        {
            offset: 0,
            color: '#f47560',
        },
        {
            offset: 100,
            color: '#f47560',
            opacity: 0,
        },
    ]),
    linearGradientDef('gradientC', [
        {
            offset: 0,
            color: '#f1e15b',
        },
        {
            offset: 100,
            color: '#f1e15b',
            opacity: 0,
        },
    ]),
]

sampleData.forEach(datum => {
    datum.nested = {
        color: datum.color,
    }
})

const sampleDataWithCustomProps = sampleData.map(datum => ({
    name: datum.id,
    attributes: {
        volume: datum.value,
    },
}))

describe('Pie', () => {
    beforeAll(() => {
        Globals.assign({ skipAnimation: true })
    })

    afterAll(() => {
        Globals.assign({ skipAnimation: false })
    })

    describe('data', () => {
        it('should use default id and value properties', () => {
            const instance = create(<Pie width={400} height={400} data={sampleData} />).root

            const arcs = instance.findAllByType(ArcShape)
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs[0].props.datum.id).toEqual('A')
            expect(arcs[0].props.datum.value).toEqual(30)
            expect(arcs[0].props.datum.formattedValue).toEqual('30')

            expect(arcs[1].props.datum.id).toEqual('B')
            expect(arcs[1].props.datum.value).toEqual(20)
            expect(arcs[1].props.datum.formattedValue).toEqual('20')

            expect(arcs[2].props.datum.id).toEqual('C')
            expect(arcs[2].props.datum.value).toEqual(50)
            expect(arcs[2].props.datum.formattedValue).toEqual('50')
        })

        it('should use custom id and value accessors expressed as path', () => {
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleDataWithCustomProps}
                    id="name"
                    value="attributes.volume"
                />
            ).root

            const arcs = instance.findAllByType(ArcShape)
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs[0].props.datum.id).toEqual('A')
            expect(arcs[0].props.datum.value).toEqual(30)
            expect(arcs[0].props.datum.formattedValue).toEqual('30')

            expect(arcs[1].props.datum.id).toEqual('B')
            expect(arcs[1].props.datum.value).toEqual(20)
            expect(arcs[1].props.datum.formattedValue).toEqual('20')

            expect(arcs[2].props.datum.id).toEqual('C')
            expect(arcs[2].props.datum.value).toEqual(50)
            expect(arcs[2].props.datum.formattedValue).toEqual('50')
        })

        it('should use custom id and value accessors expressed as functions', () => {
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleDataWithCustomProps}
                    id={d => d.name}
                    value={d => d.attributes.volume}
                />
            ).root

            const arcs = instance.findAllByType(ArcShape)
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs[0].props.datum.id).toEqual('A')
            expect(arcs[0].props.datum.value).toEqual(30)
            expect(arcs[0].props.datum.formattedValue).toEqual('30')

            expect(arcs[1].props.datum.id).toEqual('B')
            expect(arcs[1].props.datum.value).toEqual(20)
            expect(arcs[1].props.datum.formattedValue).toEqual('20')

            expect(arcs[2].props.datum.id).toEqual('C')
            expect(arcs[2].props.datum.value).toEqual(50)
            expect(arcs[2].props.datum.formattedValue).toEqual('50')
        })

        it('should support custom value formatting', () => {
            const instance = create(
                <Pie width={400} height={400} data={sampleData} valueFormat=" >-$.2f" />
            ).root

            const arcs = instance.findAllByType(ArcShape)
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs[0].props.datum.id).toEqual('A')
            expect(arcs[0].props.datum.value).toEqual(30)
            expect(arcs[0].props.datum.formattedValue).toEqual('$30.00')

            expect(arcs[1].props.datum.id).toEqual('B')
            expect(arcs[1].props.datum.value).toEqual(20)
            expect(arcs[1].props.datum.formattedValue).toEqual('$20.00')

            expect(arcs[2].props.datum.id).toEqual('C')
            expect(arcs[2].props.datum.value).toEqual(50)
            expect(arcs[2].props.datum.formattedValue).toEqual('$50.00')
        })

        it('should support sorting data by value', () => {
            const instance = create(
                <Pie width={400} height={400} data={sampleData} sortByValue />
            ).root

            const arcs = instance.findAllByType(ArcShape)
            expect(arcs).toHaveLength(sampleData.length)

            const arc30 = arcs[0]
            const arc20 = arcs[1]
            const arc50 = arcs[2]

            expect(arc50.props.datum.arc.startAngle).toEqual(0)
            expect(arc30.props.datum.arc.startAngle).toBeGreaterThan(0)
            expect(arc20.props.datum.arc.startAngle).toBeGreaterThan(
                arc30.props.datum.arc.startAngle
            )
        })
    })

    describe('layout', () => {
        it('should support donut charts', () => {
            const instance = create(
                <Pie width={400} height={400} data={sampleData} innerRadius={0.5} />
            ).root

            const arcs = instance.findAllByType(ArcShape)
            expect(arcs).toHaveLength(sampleData.length)

            // we can use a slice to check computed radii
            expect(arcs[0].props.datum.arc.innerRadius).toEqual(100)
            expect(arcs[0].props.datum.arc.outerRadius).toEqual(200)
        })

        it('should support padAngle', () => {
            const instance = create(
                <Pie width={400} height={400} data={sampleData} padAngle={10} />
            ).root

            const arcs = instance.findAllByType(ArcShape)
            expect(arcs).toHaveLength(sampleData.length)
            arcs.forEach(arc => {
                expect(radiansToDegrees(arc.props.datum.arc.padAngle)).toEqual(10)
            })
        })

        it('should support cornerRadius', () => {
            // using a custom layer to inspect the `arcGenerator`
            const CustomLayer = () => null
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    cornerRadius={3}
                    layers={[CustomLayer]}
                />
            ).root

            const layer = instance.findByType(CustomLayer)
            expect(layer.props.arcGenerator.cornerRadius()()).toEqual(3)
        })

        it('should support custom start and end angles', () => {
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    innerRadius={0.5}
                    startAngle={90}
                    endAngle={180}
                />
            ).root

            const arcs = instance.findAllByType(ArcShape)
            expect(arcs).toHaveLength(sampleData.length)

            expect(radiansToDegrees(arcs[0].props.datum.arc.startAngle)).toEqual(90)
            expect(radiansToDegrees(arcs[2].props.datum.arc.endAngle)).toEqual(180)
        })

        it('should support optimizing space usage via the fit property', () => {
            const instance = create(
                <Pie
                    width={800}
                    height={400}
                    data={sampleData}
                    innerRadius={0.5}
                    startAngle={-90}
                    endAngle={90}
                    fit
                />
            ).root

            const arcs = instance.findAllByType(ArcShape)
            expect(arcs).toHaveLength(sampleData.length)

            // we can use a slice to check computed radii
            expect(arcs[0].props.datum.arc.innerRadius).toEqual(200)
            expect(arcs[0].props.datum.arc.outerRadius).toEqual(400)
        })
    })

    describe('colors', () => {
        it('should use colors from scheme', () => {
            const instance = create(
                <Pie width={400} height={400} data={sampleData} colors={{ scheme: 'accent' }} />
            ).root

            const arcs = instance.findAllByType(ArcShape)
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs[0].props.datum.id).toEqual('A')
            expect(arcs[0].props.datum.color).toEqual('#7fc97f')

            expect(arcs[1].props.datum.id).toEqual('B')
            expect(arcs[1].props.datum.color).toEqual('#beaed4')

            expect(arcs[2].props.datum.id).toEqual('C')
            expect(arcs[2].props.datum.color).toEqual('#fdc086')
        })

        it('should allow to use colors from data using a path', () => {
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    colors={{ datum: 'data.nested.color' }}
                />
            ).root

            const arcs = instance.findAllByType(ArcShape)
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs[0].props.datum.id).toEqual('A')
            expect(arcs[0].props.datum.color).toEqual('#ff5500')

            expect(arcs[1].props.datum.id).toEqual('B')
            expect(arcs[1].props.datum.color).toEqual('#ffdd00')

            expect(arcs[2].props.datum.id).toEqual('C')
            expect(arcs[2].props.datum.color).toEqual('#99cc44')
        })

        it('should allow to use colors from data using a function', () => {
            const instance = create(
                <Pie width={400} height={400} data={sampleData} colors={d => d.data.color} />
            ).root

            const arcs = instance.findAllByType(ArcShape)
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs[0].props.datum.id).toEqual('A')
            expect(arcs[0].props.datum.color).toEqual('#ff5500')

            expect(arcs[1].props.datum.id).toEqual('B')
            expect(arcs[1].props.datum.color).toEqual('#ffdd00')

            expect(arcs[2].props.datum.id).toEqual('C')
            expect(arcs[2].props.datum.color).toEqual('#99cc44')
        })
    })

    describe('patterns & gradients', () => {
        it('should support patterns', () => {
            // @todo
        })

        it('should support gradients', () => {
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    defs={sampleGradientData}
                    fill={[
                        { match: { id: 'A' }, id: 'gradientA' },
                        { match: { id: 'B' }, id: 'gradientB' },
                        { match: { id: 'C' }, id: 'gradientC' },
                    ]}
                />
            ).root

            const arcs = instance.findAllByType(ArcShape)
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs[0].props.datum.id).toEqual('A')
            expect(arcs[0].props.datum.fill).toEqual('url(#gradientA)')

            expect(arcs[1].props.datum.id).toEqual('B')
            expect(arcs[1].props.datum.fill).toEqual('url(#gradientB)')

            expect(arcs[2].props.datum.id).toEqual('C')
            expect(arcs[2].props.datum.fill).toEqual('url(#gradientC)')
        })
    })

    describe('arc labels', () => {
        it('should render labels when enabled', () => {
            const instance = create(<Pie width={400} height={400} data={sampleData} />).root

            instance.findByType(ArcLabelsLayer)

            const labels = instance.findAllByType(ArcLabel)
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels[index].findByType('text').props.children).toEqual(`${datum.value}`)
            })
        })

        it('should allow to disable labels', () => {
            const instance = create(
                <Pie width={400} height={400} data={sampleData} enableArcLabels={false} />
            ).root

            expect(instance.findAllByType(ArcLabelsLayer)).toHaveLength(0)
        })

        it('should use formattedValue', () => {
            const instance = create(
                <Pie width={400} height={400} data={sampleData} valueFormat=" >-$.2f" />
            ).root

            const labels = instance.findAllByType(ArcLabel)
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels[index].findByType('text').children[0]).toEqual(`$${datum.value}.00`)
            })
        })

        it('should allow to change the label accessor using a path', () => {
            const instance = create(
                <Pie width={400} height={400} data={sampleData} arcLabel="id" />
            ).root

            const labels = instance.findAllByType(ArcLabel)
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels[index].findByType('text').children[0]).toEqual(datum.id)
            })
        })

        it('should allow to change the label accessor using a function', () => {
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    arcLabel={datum => `${datum.id} - ${datum.value}`}
                />
            ).root

            const labels = instance.findAllByType(ArcLabel)
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels[index].findByType('text').children[0]).toEqual(
                    `${datum.id} - ${datum.value}`
                )
            })
        })

        it('should allow to customize the label component', () => {
            const CustomArcLabel = () => <span />
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    arcLabelsComponent={CustomArcLabel}
                />
            ).root

            const labels = instance.findAllByType(CustomArcLabel)
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels[index].props.label).toEqual(`${datum.value}`)
            })
        })
    })

    describe('arc link labels', () => {
        it('should render labels when enabled', () => {
            const instance = create(<Pie width={400} height={400} data={sampleData} />).root

            instance.findByType(ArcLinkLabelsLayer)
            const labels = instance.findAllByType(ArcLinkLabel)
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels[index].findByType('text').children[0]).toEqual(datum.id)
            })
        })

        it('should allow to disable labels', () => {
            const instance = create(
                <Pie width={400} height={400} data={sampleData} enableArcLinkLabels={false} />
            ).root

            expect(instance.findAllByType(ArcLinkLabelsLayer)).toHaveLength(0)
        })

        it('should allow to change the label accessor using a path', () => {
            const instance = create(
                <Pie width={400} height={400} data={sampleData} arcLinkLabel="value" />
            ).root

            const labels = instance.findAllByType(ArcLinkLabel)
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels[index].findByType('text').children[0]).toEqual(`${datum.value}`)
            })
        })

        it('should allow to change the label accessor using a function', () => {
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    arcLinkLabel={datum => `${datum.id} - ${datum.value}`}
                />
            ).root

            const labels = instance.findAllByType(ArcLinkLabel)
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels[index].findByType('text').children[0]).toEqual(
                    `${datum.id} - ${datum.value}`
                )
            })
        })

        it('should allow to customize the label component', () => {
            const CustomArcLinkLabel = () => null
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    arcLinkLabelComponent={CustomArcLinkLabel}
                />
            ).root

            const labels = instance.findAllByType(CustomArcLinkLabel)
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels[index].props.label).toEqual(datum.id)
            })
        })
    })

    describe('legends', () => {
        it('should render legends', () => {
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    colors={{ datum: 'data.color' }}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            itemWidth: 100,
                            itemHeight: 20,
                        },
                    ]}
                />
            ).root

            const legendItems = instance.findAllByType(LegendSvgItem)
            expect(legendItems).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                const legendItem = legendItems[index]
                expect(legendItem.findByType('text').children[0]).toEqual(datum.id)
                expect(legendItem.findByType(SymbolSquare).findByType('rect').props.fill).toEqual(
                    datum.color
                )
            })
        })

        it('should use legend.data if provided', () => {
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    colors={{ datum: 'data.color' }}
                    legends={[
                        {
                            anchor: 'bottom',
                            data: sampleData.map((data, index) => ({
                                ...data,
                                label: `${data.id}.${index}`,
                            })),
                            direction: 'row',
                            itemWidth: 100,
                            itemHeight: 20,
                        },
                    ]}
                />
            ).root

            const legendItems = instance.findAllByType(LegendSvgItem)
            expect(legendItems).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                const legendItem = legendItems[index]
                expect(legendItem.findByType('text').children[0]).toEqual(`${datum.id}.${index}`)
                expect(legendItem.findByType(SymbolSquare).findByType('rect').props.fill).toEqual(
                    datum.color
                )
            })
        })

        it('should toggle series via legend', async () => {
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            toggleSerie: true,
                            itemWidth: 100,
                            itemHeight: 20,
                        },
                    ]}
                />
            ).root

            expect(instance.findAllByType(ArcShape)).toHaveLength(sampleData.length)

            const legendItem = instance.findAllByType(LegendSvgItem)[0]
            await act(() => {
                legendItem.findAllByType('rect')[0].props.onClick()
            })

            expect(instance.findAllByType(ArcShape)).toHaveLength(sampleData.length - 1)
        })
    })

    describe('interactivity', () => {
        it('should support onClick handler', async () => {
            const onClick = jest.fn()
            const instance = create(
                <Pie width={400} height={400} data={sampleData} onClick={onClick} />
            ).root

            await act(() => {
                instance.findAllByType(ArcShape)[0].findByType('path').props.onClick()
            })

            expect(onClick).toHaveBeenCalledTimes(1)
            const [datum] = onClick.mock.calls[0]
            expect(datum.id).toEqual('A')
        })

        // @todo: Fix this test due to the use of `getBoundingClientRect`.
        xit('should support onMouseEnter handler', async () => {
            const onMouseEnter = jest.fn()
            const instance = create(
                <Pie width={400} height={400} data={sampleData} onMouseEnter={onMouseEnter} />
            ).root

            await act(() => {
                instance.findAllByType(ArcShape)[0].findByType('path').props.onMouseEnter()
            })

            expect(onMouseEnter).toHaveBeenCalledTimes(1)
            const [datum] = onMouseEnter.mock.calls[0]
            expect(datum.id).toEqual('B')
        })

        // @todo: Fix this test due to the use of `getBoundingClientRect`.
        xit('should support onMouseMove handler', async () => {
            const onMouseMove = jest.fn()
            const instance = create(
                <Pie width={400} height={400} data={sampleData} onMouseMove={onMouseMove} />
            ).root

            await act(() => {
                instance.findAllByType(ArcShape)[0].findByType('path').props.onMouseMove()
            })

            expect(onMouseMove).toHaveBeenCalledTimes(1)
            const [datum] = onMouseMove.mock.calls[0]
            expect(datum.id).toEqual('C')
        })

        it('should support onMouseLeave handler', async () => {
            const onMouseLeave = jest.fn()
            const instance = create(
                <Pie width={400} height={400} data={sampleData} onMouseLeave={onMouseLeave} />
            ).root

            await act(() => {
                instance.findAllByType(ArcShape)[0].findByType('path').props.onMouseLeave()
            })

            expect(onMouseLeave).toHaveBeenCalledTimes(1)
            const [datum] = onMouseLeave.mock.calls[0]
            expect(datum.id).toEqual('A')
        })

        it('should allow to completely disable interactivity', async () => {
            const instance = create(
                <Pie width={400} height={400} data={sampleData} isInteractive={false} />
            ).root

            instance.findAllByType(ArcShape).forEach(arc => {
                const path = arc.findByType('path')
                expect(path.props.onClick).toBeUndefined()
                expect(path.props.onMouseEnter).toBeUndefined()
                expect(path.props.onMouseMove).toBeUndefined()
                expect(path.props.onMouseLeave).toBeUndefined()
            })
        })

        describe('activeId', () => {
            it('should allow to define a default activeId', () => {
                const instance = create(
                    <Pie
                        width={400}
                        height={400}
                        data={sampleData}
                        activeOuterRadiusOffset={10}
                        defaultActiveId={sampleData[1].id}
                    />
                ).root

                const arcs = instance.findAllByType(ArcShape)
                expect(arcs).toHaveLength(sampleData.length)

                expect(arcs[0].props.datum.id).toEqual(sampleData[0].id)
                expect(arcs[0].props.datum.arc.outerRadius).toEqual(200)

                expect(arcs[1].props.datum.id).toEqual(sampleData[1].id)
                expect(arcs[1].props.datum.arc.outerRadius).toEqual(210)

                expect(arcs[2].props.datum.id).toEqual(sampleData[2].id)
                expect(arcs[2].props.datum.arc.outerRadius).toEqual(200)
            })

            xit('should allow to control the activeId externally', () => {})
        })
    })

    describe('tooltip', () => {
        // @todo: Fix this test due to the use of `getBoundingClientRect`.
        xit('should render a tooltip when hovering a slice', async () => {
            const instance = create(<Pie width={400} height={400} data={sampleData} />).root

            expect(instance.findAllByType('PieTooltip')).toHaveLength(0)

            await act(() => {
                instance.findAllByType(ArcShape)[1].findByType('path').props.onMouseEnter()
            })

            expect(instance.findAllByType('PieTooltip')).toHaveLength(1)
            const tooltip = instance.findAllByType('PieTooltip')[0]
            expect(tooltip.children).toEqual(`${sampleData[1].id}: ${sampleData[1].value}`)
        })

        // @todo: Fix this test due to the use of `getBoundingClientRect`.
        xit('should allow to override the default tooltip', async () => {
            const CustomTooltip = ({ datum }) => <span>{datum.id}</span>
            const instance = create(
                <Pie width={400} height={400} data={sampleData} tooltip={CustomTooltip} />
            ).root

            await act(() => {
                instance.findAllByType(ArcShape)[1].findByType('path').props.onMouseEnter()
            })

            expect(instance.findAllByType(CustomTooltip)).toHaveLength(1)
        })
    })

    describe('layers', () => {
        it('should support disabling a layer', () => {
            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    layers={['arcLinkLabels', 'arcLabels', 'legends']}
                />
            ).root

            expect(instance.findAllByType(ArcShape)).toHaveLength(0)
        })

        it('should support adding a custom layer', () => {
            const CustomLayer = () => null

            const instance = create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    innerRadius={0.5}
                    layers={['arcs', 'arcLinkLabels', 'arcLabels', 'legends', CustomLayer]}
                />
            ).root

            const customLayer = instance.findByType(CustomLayer)

            expect(customLayer.props.dataWithArc).toHaveLength(3)
            expect(customLayer.props.centerX).toEqual(200)
            expect(customLayer.props.centerY).toEqual(200)
            expect(customLayer.props.arcGenerator).toBeDefined()
            expect(customLayer.props.radius).toEqual(200)
            expect(customLayer.props.innerRadius).toEqual(100)
        })
    })
})
