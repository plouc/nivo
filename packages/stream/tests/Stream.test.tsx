import { mount } from 'enzyme'
// @ts-ignore
import { Stream, StreamLayerData, StreamLayerDatum, StreamSliceData, StreamSvgProps } from '../src'

type TestDatum = {
    A: number
    B: number
    C: number
    extra?: string
}

const commonProps: StreamSvgProps<TestDatum> = {
    width: 500,
    height: 300,
    data: [
        { A: 10, B: 20, C: 30 },
        { A: 20, B: 10, C: 30 },
        { A: 30, B: 10, C: 20 },
    ],
    keys: ['A', 'B', 'C'],
    animate: false,
}

it('should render a basic stream chart', () => {
    const wrapper = mount(<Stream<TestDatum> {...commonProps} />)

    expect(wrapper.find('StreamLayer')).toHaveLength(3)
})

describe('layers', () => {
    it('should support custom layers', () => {
        const CustomLayer = () => <g />

        const wrapper = mount(
            <Stream<TestDatum> {...commonProps} layers={['grid', 'axes', 'layers', CustomLayer]} />
        )

        const customLayer = wrapper.find(CustomLayer)

        expect(customLayer.exists()).toBe(true)
        expect(typeof customLayer.prop('xScale')).toBe('function')
        expect(typeof customLayer.prop('yScale')).toBe('function')
        expect(Array.isArray(customLayer.prop('layers'))).toBe(true)
        expect(Array.isArray(customLayer.prop('slices'))).toBe(true)
    })
})

describe('dots', () => {
    it('should not render dots by default', () => {
        const wrapper = mount(<Stream<TestDatum> {...commonProps} />)

        const dots = wrapper.find('StreamDots')
        expect(dots.exists()).toBe(false)
    })

    it('should allow to render dots', () => {
        const wrapper = mount(<Stream<TestDatum> {...commonProps} enableDots />)

        const dots = wrapper.find('StreamDotsItem')
        expect(dots.length).toBe(9)
    })

    it('should allow to customize dot size with a static value', () => {
        const wrapper = mount(<Stream<TestDatum> {...commonProps} enableDots dotSize={32} />)

        const dots = wrapper.find('StreamDotsItem')
        expect(dots.length).toBe(9)

        dots.forEach(dot => {
            expect(dot.prop('size')).toBe(32)
        })
    })

    it('should allow to customize dot size with a dynamic value', () => {
        const wrapper = mount(
            <Stream<TestDatum>
                {...commonProps}
                enableDots
                // set dot size according to datum value
                dotSize={datum => datum.value}
            />
        )

        const dots = wrapper.find('StreamDotsItem')
        expect(dots.length).toBe(9)

        dots.forEach(dot => {
            expect(dot.prop('size')).toBe(dot.prop<StreamLayerDatum>('datum').value)
        })
    })
})

describe('tooltip', () => {
    it('should show a tooltip when hovering a layer', () => {
        const wrapper = mount(<Stream<TestDatum> {...commonProps} />)

        expect(wrapper.find('LayerTooltip').exists()).toBe(false)

        wrapper.find('StreamLayer').at(0).find('path').simulate('mouseEnter')
        const tooltip = wrapper.find('LayerTooltip')
        expect(tooltip.exists()).toBe(true)

        const layerData = tooltip.prop<StreamLayerData>('layer')
        expect(layerData.id).toBe(commonProps.keys[0])
    })

    it('should allow to use a custom tooltip', () => {
        const CustomTooltip = () => <div />

        const wrapper = mount(<Stream<TestDatum> {...commonProps} tooltip={CustomTooltip} />)

        wrapper.find('StreamLayer').at(0).find('path').simulate('mouseEnter')
        expect(wrapper.find(CustomTooltip).exists()).toBe(true)
    })

    it('should have stack tooltip enabled by default', () => {
        const wrapper = mount(<Stream<TestDatum> {...commonProps} />)

        const slices = wrapper.find('StreamSlices')
        expect(slices.exists()).toBe(true)

        const sliceRect = slices.find('StreamSlicesItem').at(0).find('rect')
        expect(sliceRect.exists()).toBe(true)

        sliceRect.simulate('mouseEnter')
        const tooltip = wrapper.find('StackTooltip')
        expect(tooltip.exists()).toBe(true)

        const sliceData = tooltip.prop<StreamSliceData>('slice')
        expect(sliceData.index).toBe(0)
        expect(sliceData.x).toBe(0)

        const expectedData = [
            { layerId: 'C', value: 30 },
            { layerId: 'B', value: 20 },
            { layerId: 'A', value: 10 },
        ]
        expectedData.forEach((expectedDatum, index) => {
            expect(sliceData.stack[index].layerId).toBe(expectedDatum.layerId)
            expect(sliceData.stack[index].value).toBe(expectedDatum.value)
        })
    })

    it('should allow to use a custom stack tooltip', () => {
        const CustomStackTooltip = () => <div />

        const wrapper = mount(
            <Stream<TestDatum> {...commonProps} stackTooltip={CustomStackTooltip} />
        )

        wrapper
            .find('StreamSlices')
            .find('StreamSlicesItem')
            .at(0)
            .find('rect')
            .simulate('mouseEnter')
        expect(wrapper.find(CustomStackTooltip).exists()).toBe(true)
    })

    it('should allow to disable stack tooltip', () => {
        const wrapper = mount(<Stream<TestDatum> {...commonProps} enableStackTooltip={false} />)

        expect(wrapper.find('StreamSlices').exists()).toBe(false)
    })

    it('should disable tooltip and stack tooltip when `isInteractive` is false', () => {
        const wrapper = mount(<Stream<TestDatum> {...commonProps} isInteractive={false} />)

        wrapper.find('StreamLayer').at(0).find('path').simulate('mouseEnter')
        expect(wrapper.find('LayerTooltip').exists()).toBe(false)

        expect(wrapper.find('StreamSlices').exists()).toBe(false)
    })
})

describe('accessibility', () => {
    it('should forward root aria properties to the SVG element', () => {
        const wrapper = mount(
            <Stream<TestDatum>
                {...commonProps}
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
