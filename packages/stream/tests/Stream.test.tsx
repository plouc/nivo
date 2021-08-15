import { mount } from 'enzyme'
import { Stream, StreamLayerDatum, StreamSvgProps } from '../src'

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
    const CustomLayer = () => <g />

    it('should support custom layers', () => {
        const wrapper = mount(
            <Stream<TestDatum>
                {...commonProps}
                layers={['grid', 'axes', 'layers', CustomLayer]}
            />
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
