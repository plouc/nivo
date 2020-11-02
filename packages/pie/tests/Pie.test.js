import React from 'react'
import TestRenderer from 'react-test-renderer'
import Pie from '../src/Pie'
import PieSlice from '../src/PieSlice'

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
    describe('data', () => {
        it('should use default id and value properties', () => {
            const pie = TestRenderer.create(<Pie width={400} height={400} data={sampleData} />)
            const pieInstance = pie.root

            const slices = pieInstance.findAllByType(PieSlice)

            expect(slices[0].props.data.id).toEqual('A')
            expect(slices[0].props.data.value).toEqual(30)
            expect(slices[0].props.data.formattedValue).toEqual(30)

            expect(slices[1].props.data.id).toEqual('B')
            expect(slices[1].props.data.value).toEqual(20)
            expect(slices[1].props.data.formattedValue).toEqual(20)

            expect(slices[2].props.data.id).toEqual('C')
            expect(slices[2].props.data.value).toEqual(50)
            expect(slices[2].props.data.formattedValue).toEqual(50)
        })

        it('should use custom id and value accessors expressed as path', () => {
            const pie = TestRenderer.create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleDataWithCustomProps}
                    id="name"
                    value="attributes.volume"
                />
            )

            const pieInstance = pie.root

            const slices = pieInstance.findAllByType(PieSlice)

            expect(slices[0].props.data.id).toEqual('A')
            expect(slices[0].props.data.value).toEqual(30)
            expect(slices[0].props.data.formattedValue).toEqual(30)

            expect(slices[1].props.data.id).toEqual('B')
            expect(slices[1].props.data.value).toEqual(20)
            expect(slices[1].props.data.formattedValue).toEqual(20)

            expect(slices[2].props.data.id).toEqual('C')
            expect(slices[2].props.data.value).toEqual(50)
            expect(slices[2].props.data.formattedValue).toEqual(50)
        })

        it('should use custom id and value accessors expressed as functions', () => {
            const pie = TestRenderer.create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleDataWithCustomProps}
                    id={d => d.name}
                    value={d => d.attributes.volume}
                />
            )

            const pieInstance = pie.root

            const slices = pieInstance.findAllByType(PieSlice)

            expect(slices[0].props.data.id).toEqual('A')
            expect(slices[0].props.data.value).toEqual(30)
            expect(slices[0].props.data.formattedValue).toEqual(30)

            expect(slices[1].props.data.id).toEqual('B')
            expect(slices[1].props.data.value).toEqual(20)
            expect(slices[1].props.data.formattedValue).toEqual(20)

            expect(slices[2].props.data.id).toEqual('C')
            expect(slices[2].props.data.value).toEqual(50)
            expect(slices[2].props.data.formattedValue).toEqual(50)
        })

        it('should support custom value formatting', () => {
            const pie = TestRenderer.create(
                <Pie width={400} height={400} data={sampleData} valueFormat=" >-$.2f" />
            )
            const pieInstance = pie.root

            const slices = pieInstance.findAllByType(PieSlice)

            expect(slices[0].props.data.id).toEqual('A')
            expect(slices[0].props.data.value).toEqual(30)
            expect(slices[0].props.data.formattedValue).toEqual('$30.00')

            expect(slices[1].props.data.id).toEqual('B')
            expect(slices[1].props.data.value).toEqual(20)
            expect(slices[1].props.data.formattedValue).toEqual('$20.00')

            expect(slices[2].props.data.id).toEqual('C')
            expect(slices[2].props.data.value).toEqual(50)
            expect(slices[2].props.data.formattedValue).toEqual('$50.00')
        })

        it('should support sorting data by value', () => {
            const pie = TestRenderer.create(
                <Pie width={400} height={400} data={sampleData} sortByValue />
            )
            const pieInstance = pie.root

            const slices = pieInstance.findAllByType(PieSlice)

            const slice30 = slices[0]
            const slice20 = slices[1]
            const slice50 = slices[2]

            expect(slice50.props.data.arc.startAngle).toEqual(0)
            expect(slice30.props.data.arc.startAngle).toBeGreaterThan(0)
            expect(slice20.props.data.arc.startAngle).toBeGreaterThan(
                slice30.props.data.arc.startAngle
            )
        })
    })

    describe('layout', () => {
        it('should support donut charts', () => {})

        it('should support padAngle', () => {})

        it('should support cornerRadius', () => {})

        it('should support custom start and end angles', () => {})

        it('should support optimizing space usage via the fit property', () => {})
    })

    describe('colors', () => {
        it('should use colors from scheme', () => {
            const pie = TestRenderer.create(
                <Pie width={400} height={400} data={sampleData} colors={{ scheme: 'accent' }} />
            )
            const pieInstance = pie.root

            const slices = pieInstance.findAllByType(PieSlice)

            expect(slices[0].props.data.id).toEqual('A')
            expect(slices[0].props.data.color).toEqual('#7fc97f')

            expect(slices[1].props.data.id).toEqual('B')
            expect(slices[1].props.data.color).toEqual('#beaed4')

            expect(slices[2].props.data.id).toEqual('C')
            expect(slices[2].props.data.color).toEqual('#fdc086')
        })

        it('should allow to use colors from data using a path', () => {
            const pie = TestRenderer.create(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    colors={{ datum: 'data.nested.color' }}
                />
            )
            const pieInstance = pie.root

            const slices = pieInstance.findAllByType(PieSlice)

            expect(slices[0].props.data.id).toEqual('A')
            expect(slices[0].props.data.color).toEqual('#ff5500')

            expect(slices[1].props.data.id).toEqual('B')
            expect(slices[1].props.data.color).toEqual('#ffdd00')

            expect(slices[2].props.data.id).toEqual('C')
            expect(slices[2].props.data.color).toEqual('#99cc44')
        })

        it('should allow to use colors from data using a function', () => {
            const pie = TestRenderer.create(
                <Pie width={400} height={400} data={sampleData} colors={d => d.data.color} />
            )
            const pieInstance = pie.root

            const slices = pieInstance.findAllByType(PieSlice)

            expect(slices[0].props.data.id).toEqual('A')
            expect(slices[0].props.data.color).toEqual('#ff5500')

            expect(slices[1].props.data.id).toEqual('B')
            expect(slices[1].props.data.color).toEqual('#ffdd00')

            expect(slices[2].props.data.id).toEqual('C')
            expect(slices[2].props.data.color).toEqual('#99cc44')
        })
    })

    describe('patterns & gradients', () => {
        it('should support patterns', () => {})

        it('should support gradients', () => {})
    })

    describe('legends', () => {
        it('should render legends', () => {})
    })

    describe('interactivity', () => {
        it('should support onClick handler', () => {})

        it('should support onMouseEnter handler', () => {})

        it('should support onMouseMove handler', () => {})

        it('should support onMouseLeave handler', () => {})
    })

    describe('tooltip', () => {
        it('should render a tooltip when hovering a slice', () => {})

        it('should allow to override the default tooltip', () => {})
    })

    describe('layers', () => {
        it('should support disabling a layer', () => {})

        it('should support adding a custom layer', () => {})
    })
})
