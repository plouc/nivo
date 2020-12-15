import React from 'react'
import { mount } from 'enzyme'
import { animated } from 'react-spring'
import { radiansToDegrees } from '@nivo/core'
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
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} animate={false} />
            )

            const arcs = wrapper.find('ArcShape')
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs.at(0).prop('datum').id).toEqual('A')
            expect(arcs.at(0).prop('datum').value).toEqual(30)
            expect(arcs.at(0).prop('datum').formattedValue).toEqual('30')

            expect(arcs.at(1).prop('datum').id).toEqual('B')
            expect(arcs.at(1).prop('datum').value).toEqual(20)
            expect(arcs.at(1).prop('datum').formattedValue).toEqual('20')

            expect(arcs.at(2).prop('datum').id).toEqual('C')
            expect(arcs.at(2).prop('datum').value).toEqual(50)
            expect(arcs.at(2).prop('datum').formattedValue).toEqual('50')
        })

        it('should use custom id and value accessors expressed as path', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleDataWithCustomProps}
                    id="name"
                    value="attributes.volume"
                    animate={false}
                />
            )

            const arcs = wrapper.find('ArcShape')
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs.at(0).prop('datum').id).toEqual('A')
            expect(arcs.at(0).prop('datum').value).toEqual(30)
            expect(arcs.at(0).prop('datum').formattedValue).toEqual('30')

            expect(arcs.at(1).prop('datum').id).toEqual('B')
            expect(arcs.at(1).prop('datum').value).toEqual(20)
            expect(arcs.at(1).prop('datum').formattedValue).toEqual('20')

            expect(arcs.at(2).prop('datum').id).toEqual('C')
            expect(arcs.at(2).prop('datum').value).toEqual(50)
            expect(arcs.at(2).prop('datum').formattedValue).toEqual('50')
        })

        it('should use custom id and value accessors expressed as functions', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleDataWithCustomProps}
                    id={d => d.name}
                    value={d => d.attributes.volume}
                    animate={false}
                />
            )

            const arcs = wrapper.find('ArcShape')
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs.at(0).prop('datum').id).toEqual('A')
            expect(arcs.at(0).prop('datum').value).toEqual(30)
            expect(arcs.at(0).prop('datum').formattedValue).toEqual('30')

            expect(arcs.at(1).prop('datum').id).toEqual('B')
            expect(arcs.at(1).prop('datum').value).toEqual(20)
            expect(arcs.at(1).prop('datum').formattedValue).toEqual('20')

            expect(arcs.at(2).prop('datum').id).toEqual('C')
            expect(arcs.at(2).prop('datum').value).toEqual(50)
            expect(arcs.at(2).prop('datum').formattedValue).toEqual('50')
        })

        it('should support custom value formatting', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    valueFormat=" >-$.2f"
                    animate={false}
                />
            )

            const arcs = wrapper.find('ArcShape')
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs.at(0).prop('datum').id).toEqual('A')
            expect(arcs.at(0).prop('datum').value).toEqual(30)
            expect(arcs.at(0).prop('datum').formattedValue).toEqual('$30.00')

            expect(arcs.at(1).prop('datum').id).toEqual('B')
            expect(arcs.at(1).prop('datum').value).toEqual(20)
            expect(arcs.at(1).prop('datum').formattedValue).toEqual('$20.00')

            expect(arcs.at(2).prop('datum').id).toEqual('C')
            expect(arcs.at(2).prop('datum').value).toEqual(50)
            expect(arcs.at(2).prop('datum').formattedValue).toEqual('$50.00')
        })

        it('should support sorting data by value', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} sortByValue animate={false} />
            )

            const arcs = wrapper.find('ArcShape')
            expect(arcs).toHaveLength(sampleData.length)

            const arc30 = arcs.at(0)
            const arc20 = arcs.at(1)
            const arc50 = arcs.at(2)

            expect(arc50.prop('datum').arc.startAngle).toEqual(0)
            expect(arc30.prop('datum').arc.startAngle).toBeGreaterThan(0)
            expect(arc20.prop('datum').arc.startAngle).toBeGreaterThan(
                arc30.prop('datum').arc.startAngle
            )
        })
    })

    describe('layout', () => {
        it('should support donut charts', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} innerRadius={0.5} animate={false} />
            )

            // we can use a slice to check computed radii
            const arc = wrapper.find('ArcShape').at(0)
            expect(arc.prop('datum').arc.innerRadius).toEqual(100)
            expect(arc.prop('datum').arc.outerRadius).toEqual(200)
        })

        it('should support padAngle', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} padAngle={10} animate={false} />
            )

            const arcs = wrapper.find('ArcShape')
            expect(arcs).toHaveLength(sampleData.length)
            arcs.forEach(arc => {
                expect(radiansToDegrees(arc.prop('datum').arc.padAngle)).toEqual(10)
            })
        })

        it('should support cornerRadius', () => {
            // using a custom layer to inspect the `arcGenerator`
            const CustomLayer = () => null
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    cornerRadius={3}
                    layers={[CustomLayer]}
                    animate={false}
                />
            )

            const layer = wrapper.find(CustomLayer)
            expect(layer.exists()).toBeTruthy()
            expect(layer.prop('arcGenerator').cornerRadius()()).toEqual(3)
        })

        it('should support custom start and end angles', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    innerRadius={0.5}
                    startAngle={90}
                    endAngle={180}
                    animate={false}
                />
            )

            const arcs = wrapper.find('ArcShape')
            expect(arcs).toHaveLength(sampleData.length)
            expect(radiansToDegrees(arcs.at(0).prop('datum').arc.startAngle)).toEqual(90)
            expect(radiansToDegrees(arcs.at(2).prop('datum').arc.endAngle)).toEqual(180)
        })

        it('should support optimizing space usage via the fit property', () => {
            const wrapper = mount(
                <Pie
                    width={800}
                    height={400}
                    data={sampleData}
                    innerRadius={0.5}
                    startAngle={-90}
                    endAngle={90}
                    fit
                    animate={false}
                />
            )

            // we can use a slice to check computed radii
            const arc = wrapper.find('ArcShape').at(0)
            expect(arc.prop('datum').arc.innerRadius).toEqual(200)
            expect(arc.prop('datum').arc.outerRadius).toEqual(400)
        })
    })

    describe('colors', () => {
        it('should use colors from scheme', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    colors={{ scheme: 'accent' }}
                    animate={false}
                />
            )

            const arcs = wrapper.find('ArcShape')
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs.at(0).prop('datum').id).toEqual('A')
            expect(arcs.at(0).prop('datum').color).toEqual('#7fc97f')

            expect(arcs.at(1).prop('datum').id).toEqual('B')
            expect(arcs.at(1).prop('datum').color).toEqual('#beaed4')

            expect(arcs.at(2).prop('datum').id).toEqual('C')
            expect(arcs.at(2).prop('datum').color).toEqual('#fdc086')
        })

        it('should allow to use colors from data using a path', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    colors={{ datum: 'data.nested.color' }}
                    animate={false}
                />
            )

            const arcs = wrapper.find('ArcShape')
            expect(arcs).toHaveLength(sampleData.length)

            expect(arcs.at(0).prop('datum').id).toEqual('A')
            expect(arcs.at(0).prop('datum').color).toEqual('#ff5500')

            expect(arcs.at(1).prop('datum').id).toEqual('B')
            expect(arcs.at(1).prop('datum').color).toEqual('#ffdd00')

            expect(arcs.at(2).prop('datum').id).toEqual('C')
            expect(arcs.at(2).prop('datum').color).toEqual('#99cc44')
        })

        it('should allow to use colors from data using a function', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    colors={d => d.data.color}
                    animate={false}
                />
            )

            const slices = wrapper.find('ArcShape')
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
        it('should support patterns', () => {
            // @todo
        })

        it('should support gradients', () => {
            // @todo
        })
    })

    describe('arc labels', () => {
        it('should render labels when enabled', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} animate={false} />
            )

            expect(wrapper.find('ArcLabelsLayer').exists()).toBeTruthy()
            const labels = wrapper.find('ArcLabel')
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels.at(index).find('text').text()).toEqual(`${datum.value}`)
            })
        })

        it('should allow to disable labels', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    enableArcLabels={false}
                    animate={false}
                />
            )
            expect(wrapper.find('ArcLabelsLayer').exists()).toBeFalsy()
        })

        it('should use formattedValue', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    valueFormat=" >-$.2f"
                    animate={false}
                />
            )

            const labels = wrapper.find('ArcLabel')
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels.at(index).find('text').text()).toEqual(`$${datum.value}.00`)
            })
        })

        it('should allow to change the label accessor using a path', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} arcLabel="id" animate={false} />
            )

            const labels = wrapper.find('ArcLabel')
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
                    arcLabel={datum => `${datum.id} - ${datum.value}`}
                    animate={false}
                />
            )

            const labels = wrapper.find('ArcLabel')
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels.at(index).find('text').text()).toEqual(`${datum.id} - ${datum.value}`)
            })
        })

        it('should allow to customize the label component', () => {
            const CustomArcLabel = () => <span />
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    arcLabelComponent={CustomArcLabel}
                    animate={false}
                />
            )

            const labels = wrapper.find(CustomArcLabel)
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels.at(index).prop('label')).toEqual(`${datum.value}`)
            })
        })
    })

    describe('arc link labels', () => {
        it('should render labels when enabled', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} animate={false} />
            )

            expect(wrapper.find('ArcLinkLabelsLayer').exists()).toBeTruthy()
            const labels = wrapper.find('ArcLinkLabel')
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels.at(index).find('text').text()).toEqual(datum.id)
            })
        })

        it('should allow to disable labels', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    enableArcLinkLabels={false}
                    animate={false}
                />
            )
            expect(wrapper.find('ArcLinkLabelsLayer').exists()).toBeFalsy()
        })

        it('should allow to change the label accessor using a path', () => {
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    arcLinkLabel="value"
                    animate={false}
                />
            )

            const labels = wrapper.find('ArcLinkLabel')
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
                    arcLinkLabel={datum => `${datum.id} - ${datum.value}`}
                    animate={false}
                />
            )

            const labels = wrapper.find('ArcLinkLabel')
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels.at(index).find('text').text()).toEqual(`${datum.id} - ${datum.value}`)
            })
        })

        it('should allow to customize the label component', () => {
            const CustomArcLinkLabel = () => null
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    arcLinkLabelComponent={CustomArcLinkLabel}
                    animate={false}
                />
            )

            const labels = wrapper.find(CustomArcLinkLabel)
            expect(labels).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                expect(labels.at(index).prop('label')).toEqual(datum.id)
            })
        })
    })

    describe('legends', () => {
        it('should render legends', () => {
            const wrapper = mount(
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
                    animate={false}
                />
            )

            const legendItems = wrapper.find('LegendSvgItem')
            expect(legendItems).toHaveLength(sampleData.length)

            sampleData.forEach((datum, index) => {
                const legendItem = legendItems.at(index)
                expect(legendItem.text()).toEqual(datum.id)
                expect(legendItem.find('SymbolSquare').find('rect').prop('fill')).toEqual(
                    datum.color
                )
            })
        })
    })

    describe('interactivity', () => {
        it('should support onClick handler', () => {
            const onClick = jest.fn()
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} onClick={onClick} animate={false} />
            )

            wrapper.find('ArcShape').at(0).simulate('click')

            expect(onClick).toHaveBeenCalledTimes(1)
            const [datum] = onClick.mock.calls[0]
            expect(datum.id).toEqual('A')
        })

        it('should support onMouseEnter handler', () => {
            const onMouseEnter = jest.fn()
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    onMouseEnter={onMouseEnter}
                    animate={false}
                />
            )

            wrapper.find('ArcShape').at(1).simulate('mouseenter')

            expect(onMouseEnter).toHaveBeenCalledTimes(1)
            const [datum] = onMouseEnter.mock.calls[0]
            expect(datum.id).toEqual('B')
        })

        it('should support onMouseMove handler', () => {
            const onMouseMove = jest.fn()
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    onMouseMove={onMouseMove}
                    animate={false}
                />
            )

            wrapper.find('ArcShape').at(2).simulate('mousemove')

            expect(onMouseMove).toHaveBeenCalledTimes(1)
            const [datum] = onMouseMove.mock.calls[0]
            expect(datum.id).toEqual('C')
        })

        it('should support onMouseLeave handler', () => {
            const onMouseLeave = jest.fn()
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    onMouseLeave={onMouseLeave}
                    animate={false}
                />
            )

            wrapper.find('ArcShape').at(0).simulate('mouseleave')

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
                    animate={false}
                />
            )

            const slice = wrapper.find('ArcShape').at(0)
            slice.simulate('click')
            slice.simulate('mouseenter')
            slice.simulate('mousemove')
            slice.simulate('mouseleave')

            expect(onClick).not.toHaveBeenCalled()
            expect(onMouseEnter).not.toHaveBeenCalled()
            expect(onMouseMove).not.toHaveBeenCalled()
            expect(onMouseLeave).not.toHaveBeenCalled()

            wrapper.find('ArcShape').forEach(slice => {
                const shape = slice.find('path')
                expect(shape.prop('onClick')).toBeUndefined()
                expect(shape.prop('onMouseEnter')).toBeUndefined()
                expect(shape.prop('onMouseMove')).toBeUndefined()
                expect(shape.prop('onMouseLeave')).toBeUndefined()
            })
        })
    })

    describe('tooltip', () => {
        it('should render a tooltip when hovering a slice', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} animate={false} />
            )

            expect(wrapper.find('PieTooltip').exists()).toBeFalsy()

            wrapper.find('ArcShape').at(1).simulate('mouseenter')

            const tooltip = wrapper.find('PieTooltip')
            expect(tooltip.exists()).toBeTruthy()
            expect(tooltip.text()).toEqual(`${sampleData[1].id}: ${sampleData[1].value}`)
        })

        it('should allow to override the default tooltip', () => {
            const CustomTooltip = ({ datum }) => <span>{datum.id}</span>
            const wrapper = mount(
                <Pie
                    width={400}
                    height={400}
                    data={sampleData}
                    tooltip={CustomTooltip}
                    animate={false}
                />
            )

            wrapper.find('ArcShape').at(1).simulate('mouseenter')

            expect(wrapper.find(CustomTooltip).exists()).toBeTruthy()
        })
    })

    describe('layers', () => {
        it('should support disabling a layer', () => {
            const wrapper = mount(
                <Pie width={400} height={400} data={sampleData} animate={false} />
            )
            expect(wrapper.find('ArcShape')).toHaveLength(3)

            wrapper.setProps({ layers: ['radialLabels', 'sliceLabels', 'legends'] })
            expect(wrapper.find('ArcShape')).toHaveLength(0)
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
                    animate={false}
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
