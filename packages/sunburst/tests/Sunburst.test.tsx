import React from 'react'
import { mount } from 'enzyme'
// @ts-ignore
import { linearGradientDef, patternDotsDef } from '@nivo/core'
import { Sunburst } from '../src'

interface CustomSampleData {
    name: string
    color: string
    attributes?: {
        volume: number
    }
    children?: CustomSampleData[]
}

const sampleData = {
    id: 'root',
    color: '#abcdef',
    children: [
        {
            id: 'A',
            color: '#ff5500',
            children: [
                {
                    id: 'A-1',
                    color: '#bbddcc',
                    children: [
                        {
                            id: 'A-1-I',
                            value: 60,
                            color: '#ffaacc',
                        },
                    ],
                },
                {
                    id: 'A-2',
                    value: 50,
                    color: '#cc99dd',
                },
            ],
        },
        {
            id: 'B',
            value: 20,
            color: '#ffdd00',
        },
    ],
}

const sampleDataWithCustomProps = {
    name: 'root',
    color: '#abcdef',
    children: [
        {
            name: 'A',
            color: '#ff5500',
            children: [
                {
                    name: 'A-1',
                    color: '#bbddcc',
                    children: [
                        {
                            name: 'A-1-I',
                            attributes: {
                                volume: 60,
                            },
                            color: '#ffaacc',
                        },
                    ],
                },
                {
                    name: 'A-2',
                    attributes: {
                        volume: 50,
                    },
                    color: '#cc99dd',
                },
            ],
        },
        {
            name: 'B',
            attributes: {
                volume: 20,
            },
            color: '#ffdd00',
        },
    ],
}

describe('Sunburst', () => {
    describe('data', () => {
        it('should use default id and value properties', () => {
            const wrapper = mount(<Sunburst width={400} height={400} data={sampleData} />)

            const slices = wrapper.find('SunburstArc')
            expect(slices).toHaveLength(5)

            expect(slices.at(0).prop('node').data.id).toEqual('A')
            expect(slices.at(0).prop('node').data.value).toEqual(110)

            expect(slices.at(1).prop('node').data.id).toEqual('B')
            expect(slices.at(1).prop('node').data.value).toEqual(20)

            expect(slices.at(2).prop('node').data.id).toEqual('A-1')
            expect(slices.at(2).prop('node').data.value).toEqual(60)

            expect(slices.at(3).prop('node').data.id).toEqual('A-2')
            expect(slices.at(3).prop('node').data.value).toEqual(50)

            expect(slices.at(4).prop('node').data.id).toEqual('A-1-I')
            expect(slices.at(4).prop('node').data.value).toEqual(60)
        })

        it('should use custom id and value accessors expressed as path', () => {
            const wrapper = mount(
                <Sunburst
                    width={400}
                    height={400}
                    data={sampleDataWithCustomProps}
                    id="name"
                    value="attributes.volume"
                />
            )

            const slices = wrapper.find('SunburstArc')
            expect(slices).toHaveLength(5)

            expect(slices.at(0).prop('node').data.id).toEqual('A')
            expect(slices.at(0).prop('node').data.value).toEqual(110)

            expect(slices.at(1).prop('node').data.id).toEqual('B')
            expect(slices.at(1).prop('node').data.value).toEqual(20)

            expect(slices.at(2).prop('node').data.id).toEqual('A-1')
            expect(slices.at(2).prop('node').data.value).toEqual(60)

            expect(slices.at(3).prop('node').data.id).toEqual('A-2')
            expect(slices.at(3).prop('node').data.value).toEqual(50)

            expect(slices.at(4).prop('node').data.id).toEqual('A-1-I')
            expect(slices.at(4).prop('node').data.value).toEqual(60)
        })

        it('should use custom id and value accessors expressed as functions', () => {
            const wrapper = mount(
                <Sunburst<CustomSampleData>
                    width={400}
                    height={400}
                    data={sampleDataWithCustomProps}
                    id={d => d.name}
                    value={d => d.attributes?.volume ?? 0}
                />
            )

            const slices = wrapper.find('SunburstArc')
            expect(slices).toHaveLength(5)

            expect(slices.at(0).prop('node').data.id).toEqual('A')
            expect(slices.at(0).prop('node').data.value).toEqual(110)

            expect(slices.at(1).prop('node').data.id).toEqual('B')
            expect(slices.at(1).prop('node').data.value).toEqual(20)

            expect(slices.at(2).prop('node').data.id).toEqual('A-1')
            expect(slices.at(2).prop('node').data.value).toEqual(60)

            expect(slices.at(3).prop('node').data.id).toEqual('A-2')
            expect(slices.at(3).prop('node').data.value).toEqual(50)

            expect(slices.at(4).prop('node').data.id).toEqual('A-1-I')
            expect(slices.at(4).prop('node').data.value).toEqual(60)
        })
    })

    describe('layout', () => {
        it('should support cornerRadius', () => {
            const wrapper = mount(
                <Sunburst width={400} height={400} data={sampleData} cornerRadius={3} />
            )

            const layer = wrapper.find('SunburstArc').first()
            expect(layer.exists()).toBeTruthy()
            expect(layer.prop('arcGenerator').cornerRadius()()).toEqual(3)
        })
    })

    describe('colors', () => {
        it('should use colors from scheme', () => {
            const wrapper = mount(
                <Sunburst
                    width={400}
                    height={400}
                    data={sampleData}
                    colors={{ scheme: 'accent' }}
                />
            )

            const slices = wrapper.find('SunburstArc')
            expect(slices).toHaveLength(5)

            expect(slices.at(0).prop('node').data.id).toEqual('A')
            expect(slices.at(0).prop('node').data.color).toEqual('#7fc97f')

            expect(slices.at(1).prop('node').data.id).toEqual('B')
            expect(slices.at(1).prop('node').data.color).toEqual('#beaed4')

            expect(slices.at(2).prop('node').data.id).toEqual('A-1')
            expect(slices.at(2).prop('node').data.color).toEqual('#7fc97f')

            expect(slices.at(3).prop('node').data.id).toEqual('A-2')
            expect(slices.at(3).prop('node').data.color).toEqual('#7fc97f')

            expect(slices.at(4).prop('node').data.id).toEqual('A-1-I')
            expect(slices.at(4).prop('node').data.color).toEqual('#7fc97f')
        })

        it('should allow to use colors from data using a path', () => {
            const wrapper = mount(
                <Sunburst width={400} height={400} data={sampleData} colors={{ datum: 'color' }} />
            )

            const slices = wrapper.find('SunburstArc')
            expect(slices).toHaveLength(5)

            expect(slices.at(0).prop('node').data.id).toEqual('A')
            expect(slices.at(0).prop('node').data.color).toEqual('#ff5500')

            expect(slices.at(1).prop('node').data.id).toEqual('B')
            expect(slices.at(1).prop('node').data.color).toEqual('#ffdd00')

            expect(slices.at(2).prop('node').data.id).toEqual('A-1')
            expect(slices.at(2).prop('node').data.color).toEqual('#ff5500')

            expect(slices.at(3).prop('node').data.id).toEqual('A-2')
            expect(slices.at(3).prop('node').data.color).toEqual('#ff5500')

            expect(slices.at(4).prop('node').data.id).toEqual('A-1-I')
            expect(slices.at(4).prop('node').data.color).toEqual('#ff5500')
        })

        it('should allow to use colors from data using a function', () => {
            const wrapper = mount(
                <Sunburst width={400} height={400} data={sampleData} colors={d => d.color} />
            )

            const slices = wrapper.find('SunburstArc')
            expect(slices).toHaveLength(5)

            expect(slices.at(0).prop('node').data.id).toEqual('A')
            expect(slices.at(0).prop('node').data.color).toEqual('#ff5500')

            expect(slices.at(1).prop('node').data.id).toEqual('B')
            expect(slices.at(1).prop('node').data.color).toEqual('#ffdd00')

            expect(slices.at(2).prop('node').data.id).toEqual('A-1')
            expect(slices.at(2).prop('node').data.color).toEqual('#ff5500')

            expect(slices.at(3).prop('node').data.id).toEqual('A-2')
            expect(slices.at(3).prop('node').data.color).toEqual('#ff5500')

            expect(slices.at(4).prop('node').data.id).toEqual('A-1-I')
            expect(slices.at(4).prop('node').data.color).toEqual('#ff5500')
        })
    })

    describe('patterns & gradients', () => {
        it('should support patterns', () => {
            const wrapper = mount(
                <Sunburst
                    width={400}
                    height={400}
                    data={sampleData}
                    defs={[
                        patternDotsDef('pattern', {
                            background: 'inherit',
                            color: '#ffffff',
                            size: 1,
                            padding: 4,
                            stagger: true,
                        }),
                    ]}
                    fill={[{ match: { id: 'A' }, id: 'pattern' }]}
                />
            )

            const slices = wrapper.find('SunburstArc')
            expect(slices).toHaveLength(5)

            expect(slices.at(0).prop('node').data.id).toEqual('A')
            expect(slices.at(0).prop('node').data.fill).toEqual('url(#pattern.bg.#e8c1a0)')

            const svg = wrapper.find('SvgWrapper')
            expect(svg.at(0).prop('defs')).toEqual([
                {
                    background: 'inherit',
                    color: '#ffffff',
                    id: 'pattern',
                    padding: 4,
                    size: 1,
                    stagger: true,
                    type: 'patternDots',
                },
                {
                    background: '#e8c1a0',
                    color: '#ffffff',
                    id: 'pattern.bg.#e8c1a0',
                    padding: 4,
                    size: 1,
                    stagger: true,
                    type: 'patternDots',
                },
            ])
        })

        it('should support gradients', () => {
            const wrapper = mount(
                <Sunburst
                    width={400}
                    height={400}
                    data={sampleData}
                    defs={[
                        linearGradientDef('gradient', [
                            { offset: 0, color: '#ffffff' },
                            { offset: 15, color: 'inherit' },
                            { offset: 100, color: 'inherit' },
                        ]),
                    ]}
                    fill={[{ match: { id: 'A' }, id: 'gradient' }]}
                />
            )

            const slices = wrapper.find('SunburstArc')
            expect(slices).toHaveLength(5)

            expect(slices.at(0).prop('node').data.id).toEqual('A')
            expect(slices.at(0).prop('node').data.fill).toEqual(
                'url(#gradient.1.#e8c1a0.2.#e8c1a0)'
            )

            const svg = wrapper.find('SvgWrapper')
            expect(svg.at(0).prop('defs')).toEqual([
                {
                    colors: [
                        { color: '#ffffff', offset: 0 },
                        { color: 'inherit', offset: 15 },
                        { color: 'inherit', offset: 100 },
                    ],
                    id: 'gradient',
                    type: 'linearGradient',
                },
                {
                    colors: [
                        { color: '#ffffff', offset: 0 },
                        { color: '#e8c1a0', offset: 15 },
                        { color: '#e8c1a0', offset: 100 },
                    ],
                    id: 'gradient.1.#e8c1a0.2.#e8c1a0',
                    type: 'linearGradient',
                },
            ])
        })
    })

    describe('slice labels', () => {
        it('should be disabled by default', () => {
            const wrapper = mount(<Sunburst width={400} height={400} data={sampleData} />)
            expect(wrapper.find('SliceLabels')).toHaveLength(0)
        })

        it('should render labels when enabled', () => {
            const wrapper = mount(
                <Sunburst width={400} height={400} data={sampleData} enableSliceLabels />
            )

            const labels = wrapper.find('SunburstLabels').find('g')
            expect(labels).toHaveLength(2)

            expect(labels.at(0).find('text').text()).toEqual('84.62%')
            expect(labels.at(1).find('text').text()).toEqual('15.38%')
        })

        it('should use formattedValue', () => {
            const wrapper = mount(
                <Sunburst
                    width={400}
                    height={400}
                    data={sampleData}
                    enableSliceLabels
                    valueFormat=" >-$.2f"
                />
            )

            const label = wrapper.find('SunburstLabels')
            const labels = label.find('g')
            expect(labels).toHaveLength(2)

            const nodes = label
                .at(0)
                .prop('nodes')
                .filter(node => node.depth === 1)

            expect(nodes).toHaveLength(2)

            expect(nodes[0].data.id).toEqual('A')
            expect(nodes[0].data.value).toEqual(110)
            expect(nodes[0].data.formattedValue).toEqual('$110.00')

            expect(nodes[1].data.id).toEqual('B')
            expect(nodes[1].data.value).toEqual(20)
            expect(nodes[1].data.formattedValue).toEqual('$20.00')

            expect(labels.at(0).find('text').text()).toEqual('$110.00')
            expect(labels.at(1).find('text').text()).toEqual('$20.00')
        })

        it('should allow to change the label accessor using a path', () => {
            const wrapper = mount(
                <Sunburst
                    width={400}
                    height={400}
                    data={sampleData}
                    enableSliceLabels
                    sliceLabel="id"
                />
            )

            const labels = wrapper.find('SunburstLabels').find('g')
            expect(labels).toHaveLength(2)

            expect(labels.at(0).find('text').text()).toEqual('A')
            expect(labels.at(1).find('text').text()).toEqual('B')
        })

        it('should allow to change the label accessor using a function', () => {
            const wrapper = mount(
                <Sunburst
                    width={400}
                    height={400}
                    data={sampleData}
                    enableSliceLabels
                    sliceLabel={datum => `${datum.id} - ${datum.value}`}
                />
            )

            const labels = wrapper.find('SunburstLabels').find('g')
            expect(labels).toHaveLength(2)

            expect(labels.at(0).find('text').text()).toEqual('A - 110')
            expect(labels.at(1).find('text').text()).toEqual('B - 20')
        })
    })

    describe('interactivity', () => {
        it('should support onClick handler', () => {
            const onClick = jest.fn()
            const wrapper = mount(
                <Sunburst width={400} height={400} data={sampleData} onClick={onClick} />
            )

            wrapper.find('SunburstArc').at(0).simulate('click')

            expect(onClick).toHaveBeenCalledTimes(1)
            const [datum] = onClick.mock.calls[0]
            expect(datum.id).toEqual('A')
        })

        it('should support onMouseEnter handler', () => {
            const onMouseEnter = jest.fn()
            const wrapper = mount(
                <Sunburst width={400} height={400} data={sampleData} onMouseEnter={onMouseEnter} />
            )

            wrapper.find('SunburstArc').at(1).simulate('mouseenter')

            expect(onMouseEnter).toHaveBeenCalledTimes(1)
            const [datum] = onMouseEnter.mock.calls[0]
            expect(datum.id).toEqual('B')
        })

        it('should support onMouseMove handler', () => {
            const onMouseMove = jest.fn()
            const wrapper = mount(
                <Sunburst width={400} height={400} data={sampleData} onMouseMove={onMouseMove} />
            )

            wrapper.find('SunburstArc').at(2).simulate('mousemove')

            expect(onMouseMove).toHaveBeenCalledTimes(1)
            const [datum] = onMouseMove.mock.calls[0]
            expect(datum.id).toEqual('A-1')
        })

        it('should support onMouseLeave handler', () => {
            const onMouseLeave = jest.fn()
            const wrapper = mount(
                <Sunburst width={400} height={400} data={sampleData} onMouseLeave={onMouseLeave} />
            )

            wrapper.find('SunburstArc').at(0).simulate('mouseleave')

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
                <Sunburst
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

            wrapper.find('SunburstArc').at(0).simulate('click')
            wrapper.find('SunburstArc').at(0).simulate('mouseenter')
            wrapper.find('SunburstArc').at(0).simulate('mousemove')
            wrapper.find('SunburstArc').at(0).simulate('mouseleave')

            expect(onClick).not.toHaveBeenCalled()
            expect(onMouseEnter).not.toHaveBeenCalled()
            expect(onMouseMove).not.toHaveBeenCalled()
            expect(onMouseLeave).not.toHaveBeenCalled()

            wrapper.find('SunburstArc').forEach(slice => {
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
            const wrapper = mount(<Sunburst width={400} height={400} data={sampleData} />)

            expect(wrapper.find('SunburstTooltip').exists()).toBeFalsy()

            wrapper.find('SunburstArc').at(1).simulate('mouseenter')

            const tooltip = wrapper.find('SunburstTooltip')
            expect(tooltip.exists()).toBeTruthy()
            expect(tooltip.text()).toEqual('B: 15.38%')
        })

        it('should allow to override the default tooltip', () => {
            const CustomTooltip = ({ id }) => <span>{id}</span>
            const wrapper = mount(
                <Sunburst width={400} height={400} data={sampleData} tooltip={CustomTooltip} />
            )

            wrapper.find('SunburstArc').at(1).simulate('mouseenter')

            const tooltip = wrapper.find(CustomTooltip)
            expect(tooltip.exists()).toBeTruthy()
            expect(tooltip.text()).toEqual('B')
        })
    })

    describe('layers', () => {
        it('should support disabling a layer', () => {
            const wrapper = mount(<Sunburst width={400} height={400} data={sampleData} />)
            expect(wrapper.find('SunburstArc')).toHaveLength(5)

            wrapper.setProps({ layers: ['sliceLabels'] })
            expect(wrapper.find('SunburstArc')).toHaveLength(0)
        })

        it('should support adding a custom layer', () => {
            const CustomLayer = () => null

            const wrapper = mount(
                <Sunburst
                    width={400}
                    height={400}
                    data={sampleData}
                    layers={['slices', 'sliceLabels', CustomLayer]}
                />
            )

            const customLayer = wrapper.find(CustomLayer)

            expect(customLayer.prop('nodes')).toHaveLength(5)
            expect(customLayer.prop('centerX')).toEqual(200)
            expect(customLayer.prop('centerY')).toEqual(200)
            expect(customLayer.prop('arcGenerator')).toBeDefined()
            expect(customLayer.prop('radius')).toEqual(200)
        })
    })
})
