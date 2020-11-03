import React from 'react'
import { mount } from 'enzyme'
import Pie from '../src/Pie'

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
            const wrapper = mount(<Pie width={400} height={400} data={sampleData} />)

            const slices = wrapper.find('PieSlice')
            expect(slices).toHaveLength(sampleData.length)

            expect(slices.at(0).prop('datum').id).toEqual('A')
            expect(slices.at(0).prop('datum').value).toEqual(30)
            expect(slices.at(0).prop('datum').formattedValue).toEqual(30)

            expect(slices.at(1).prop('datum').id).toEqual('B')
            expect(slices.at(1).prop('datum').value).toEqual(20)
            expect(slices.at(1).prop('datum').formattedValue).toEqual(20)

            expect(slices.at(2).prop('datum').id).toEqual('C')
            expect(slices.at(2).prop('datum').value).toEqual(50)
            expect(slices.at(2).prop('datum').formattedValue).toEqual(50)
        })

        it('should use custom id and value accessors expressed as path', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleDataWithCustomProps}
                    id="name"
                    value="attributes.volume"
                />
            )

            const slices = wrapper.find('PieSlice')
            expect(slices).toHaveLength(sampleData.length)

            expect(slices.at(0).prop('datum').id).toEqual('A')
            expect(slices.at(0).prop('datum').value).toEqual(30)
            expect(slices.at(0).prop('datum').formattedValue).toEqual(30)

            expect(slices.at(1).prop('datum').id).toEqual('B')
            expect(slices.at(1).prop('datum').value).toEqual(20)
            expect(slices.at(1).prop('datum').formattedValue).toEqual(20)

            expect(slices.at(2).prop('datum').id).toEqual('C')
            expect(slices.at(2).prop('datum').value).toEqual(50)
            expect(slices.at(2).prop('datum').formattedValue).toEqual(50)
        })

        it('should use custom id and value accessors expressed as functions', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleDataWithCustomProps}
                    id={d => d.name}
                    value={d => d.attributes.volume}
                />
            )

            const slices = wrapper.find('PieSlice')
            expect(slices).toHaveLength(sampleData.length)

            expect(slices.at(0).prop('datum').id).toEqual('A')
            expect(slices.at(0).prop('datum').value).toEqual(30)
            expect(slices.at(0).prop('datum').formattedValue).toEqual(30)

            expect(slices.at(1).prop('datum').id).toEqual('B')
            expect(slices.at(1).prop('datum').value).toEqual(20)
            expect(slices.at(1).prop('datum').formattedValue).toEqual(20)

            expect(slices.at(2).prop('datum').id).toEqual('C')
            expect(slices.at(2).prop('datum').value).toEqual(50)
            expect(slices.at(2).prop('datum').formattedValue).toEqual(50)
        })

        it('should support custom value formatting', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} valueFormat=" >-$.2f" />
            )

            const slices = wrapper.find('PieSlice')
            expect(slices).toHaveLength(sampleData.length)

            expect(slices.at(0).prop('datum').id).toEqual('A')
            expect(slices.at(0).prop('datum').value).toEqual(30)
            expect(slices.at(0).prop('datum').formattedValue).toEqual('$30.00')

            expect(slices.at(1).prop('datum').id).toEqual('B')
            expect(slices.at(1).prop('datum').value).toEqual(20)
            expect(slices.at(1).prop('datum').formattedValue).toEqual('$20.00')

            expect(slices.at(2).prop('datum').id).toEqual('C')
            expect(slices.at(2).prop('datum').value).toEqual(50)
            expect(slices.at(2).prop('datum').formattedValue).toEqual('$50.00')
        })

        it('should support sorting data by value', () => {
            const wrapper = mount(<Pie width={400} height={400} data={sampleData} sortByValue />)

            const slices = wrapper.find('PieSlice')
            expect(slices).toHaveLength(sampleData.length)

            const slice30 = slices.at(0)
            const slice20 = slices.at(1)
            const slice50 = slices.at(2)

            expect(slice50.prop('datum').arc.startAngle).toEqual(0)
            expect(slice30.prop('datum').arc.startAngle).toBeGreaterThan(0)
            expect(slice20.prop('datum').arc.startAngle).toBeGreaterThan(
                slice30.prop('datum').arc.startAngle
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
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} colors={{ scheme: 'accent' }} />
            )

            const slices = wrapper.find('PieSlice')
            expect(slices).toHaveLength(sampleData.length)

            expect(slices.at(0).prop('datum').id).toEqual('A')
            expect(slices.at(0).prop('datum').color).toEqual('#7fc97f')

            expect(slices.at(1).prop('datum').id).toEqual('B')
            expect(slices.at(1).prop('datum').color).toEqual('#beaed4')

            expect(slices.at(2).prop('datum').id).toEqual('C')
            expect(slices.at(2).prop('datum').color).toEqual('#fdc086')
        })

        it('should allow to use colors from data using a path', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    colors={{ datum: 'data.nested.color' }}
                />
            )

            const slices = wrapper.find('PieSlice')
            expect(slices).toHaveLength(sampleData.length)

            expect(slices.at(0).prop('datum').id).toEqual('A')
            expect(slices.at(0).prop('datum').color).toEqual('#ff5500')

            expect(slices.at(1).prop('datum').id).toEqual('B')
            expect(slices.at(1).prop('datum').color).toEqual('#ffdd00')

            expect(slices.at(2).prop('datum').id).toEqual('C')
            expect(slices.at(2).prop('datum').color).toEqual('#99cc44')
        })

        it('should allow to use colors from data using a function', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} colors={d => d.data.color} />
            )

            const slices = wrapper.find('PieSlice')
            expect(slices).toHaveLength(sampleData.length)

            expect(slices.at(0).prop('datum').id).toEqual('A')
            expect(slices.at(0).prop('datum').color).toEqual('#ff5500')

            expect(slices.at(1).prop('datum').id).toEqual('B')
            expect(slices.at(1).prop('datum').color).toEqual('#ffdd00')

            expect(slices.at(2).prop('datum').id).toEqual('C')
            expect(slices.at(2).prop('datum').color).toEqual('#99cc44')
        })
    })

    describe('patterns & gradients', () => {
        it('should support patterns', () => {})

        it('should support gradients', () => {})
    })

    describe('slice labels', () => {
        it('should render labels when enabled', () => {
            const wrapper = mount(<Pie width={400} height={400} data={sampleData} />)

            const labels = wrapper.find('PieSliceLabels').find('g')
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels.at(index).find('text').text()).toEqual(`${datum.value}`)
            })
        })

        it('should allow to disable labels', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} enableSliceLabels={false} />
            )
            expect(wrapper.find('PieSliceLabels')).toHaveLength(0)
        })

        it('should use formattedValue', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} valueFormat=" >-$.2f" />
            )

            const labels = wrapper.find('PieSliceLabels').find('g')
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels.at(index).find('text').text()).toEqual(`$${datum.value}.00`)
            })
        })

        it('should allow to change the label accessor using a path', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} sliceLabel="id" />
            )

            const labels = wrapper.find('PieSliceLabels').find('g')
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels.at(index).find('text').text()).toEqual(datum.id)
            })
        })

        it('should allow to change the label accessor using a function', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    sliceLabel={datum => `${datum.id} - ${datum.value}`}
                />
            )

            const labels = wrapper.find('PieSliceLabels').find('g')
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels.at(index).find('text').text()).toEqual(`${datum.id} - ${datum.value}`)
            })
        })
    })

    describe('radial labels', () => {
        it('should render labels when enabled', () => {
            const wrapper = mount(<Pie width={400} height={400} data={sampleData} />)

            const parent = wrapper.find('PieRadialLabels')

            const paths = parent.find('path')
            expect(paths).toHaveLength(sampleData.length)

            const labels = parent.find('text')
            expect(labels).toHaveLength(sampleData.length)
            sampleData.forEach((datum, index) => {
                expect(labels.at(index).find('text').text()).toEqual(datum.id)
            })
        })

        it('should allow to disable labels', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} enableRadialLabels={false} />
            )
            expect(wrapper.find('PieRadialLabels')).toHaveLength(0)
        })

        it('should allow to change the label accessor using a path', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} radialLabel="value" />
            )

            const labels = wrapper.find('PieRadialLabels').find('text')
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels.at(index).find('text').text()).toEqual(`${datum.value}`)
            })
        })

        it('should allow to change the label accessor using a function', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    radialLabel={datum => `${datum.id} - ${datum.value}`}
                />
            )

            const labels = wrapper.find('PieRadialLabels').find('text')
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels.at(index).find('text').text()).toEqual(`${datum.id} - ${datum.value}`)
            })
        })
    })

    describe('legends', () => {
        it('should render legends', () => {})
    })

    describe('interactivity', () => {
        it('should support onClick handler', () => {
            const onClick = jest.fn()
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} onClick={onClick} />
            )

            wrapper.find('PieSlice').at(0).simulate('click')

            expect(onClick).toHaveBeenCalledTimes(1)
            const [datum] = onClick.mock.calls[0]
            expect(datum.id).toEqual('A')
        })

        it('should support onMouseEnter handler', () => {
            const onMouseEnter = jest.fn()
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} onMouseEnter={onMouseEnter} />
            )

            wrapper.find('PieSlice').at(1).simulate('mouseenter')

            expect(onMouseEnter).toHaveBeenCalledTimes(1)
            const [datum] = onMouseEnter.mock.calls[0]
            expect(datum.id).toEqual('B')
        })

        it('should support onMouseMove handler', () => {
            const onMouseMove = jest.fn()
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} onMouseMove={onMouseMove} />
            )

            wrapper.find('PieSlice').at(2).simulate('mousemove')

            expect(onMouseMove).toHaveBeenCalledTimes(1)
            const [datum] = onMouseMove.mock.calls[0]
            expect(datum.id).toEqual('C')
        })

        it('should support onMouseLeave handler', () => {
            const onMouseLeave = jest.fn()
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} onMouseLeave={onMouseLeave} />
            )

            wrapper.find('PieSlice').at(0).simulate('mouseleave')

            expect(onMouseLeave).toHaveBeenCalledTimes(1)
            const [datum] = onMouseLeave.mock.calls[0]
            expect(datum.id).toEqual('A')
        })

        it('should allow to completely disable interactivity', () => {
            const onClick = jest.fn()
            const onMouseEnter = jest.fn()
            const onMouseMove = jest.fn()
            const onMouseLeave = jest.fn()

            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    isInteractive={false}
                />
            )

            wrapper.find('PieSlice').at(0).simulate('click')
            wrapper.find('PieSlice').at(0).simulate('mouseenter')
            wrapper.find('PieSlice').at(0).simulate('mousemove')
            wrapper.find('PieSlice').at(0).simulate('mouseleave')

            expect(onClick).not.toHaveBeenCalled()
            expect(onMouseEnter).not.toHaveBeenCalled()
            expect(onMouseMove).not.toHaveBeenCalled()
            expect(onMouseLeave).not.toHaveBeenCalled()

            wrapper.find('PieSlice').forEach(slice => {
                const shape = slice.find('path')
                expect(shape.prop('onClick')).toBeUndefined()
                expect(shape.prop('onMouseEnter')).toBeUndefined()
                expect(shape.prop('onMouseMove')).toBeUndefined()
                expect(shape.prop('onMouseLeave')).toBeUndefined()
            })
        })
    })

    describe('tooltip', () => {
        it('should render a tooltip when hovering a slice', () => {})

        it('should allow to override the default tooltip', () => {})
    })

    describe('layers', () => {
        it('should support disabling a layer', () => {
            const wrapper = mount(<Pie width={400} height={400} data={sampleData} />)
            expect(wrapper.find('PieSlice')).toHaveLength(3)

            wrapper.setProps({ layers: ['radialLabels', 'sliceLabels', 'legends'] })
            expect(wrapper.find('PieSlice')).toHaveLength(0)
        })

        it('should support adding a custom layer', () => {
            const CustomLayer = () => null

            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    innerRadius={0.5}
                    layers={['slices', 'radialLabels', 'sliceLabels', 'legends', CustomLayer]}
                />
            )

            const customLayer = wrapper.find(CustomLayer)

            expect(customLayer.prop('dataWithArc')).toHaveLength(3)
            expect(customLayer.prop('centerX')).toEqual(200)
            expect(customLayer.prop('centerY')).toEqual(200)
            expect(customLayer.prop('arcGenerator')).toBeDefined()
            expect(customLayer.prop('radius')).toEqual(200)
            expect(customLayer.prop('innerRadius')).toEqual(100)
        })
    })
})
