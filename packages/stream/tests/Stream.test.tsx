import { mount } from 'enzyme'
import { Stream } from '../src'
import { Bar } from '@nivo/bar'

type TestDatum = {
    A: number
    B: number
    C: number
    extra?: string
}

it('should render a basic stream chart', () => {
    const wrapper = mount(
        <Stream<TestDatum>
            width={500}
            height={300}
            data={[
                { A: 10, B: 20, C: 30 },
                { A: 20, B: 10, C: 30 },
                { A: 30, B: 10, C: 20 },
            ]}
            keys={['A', 'B', 'C']}
            animate={false}
        />
    )

    expect(wrapper.find('StreamLayer')).toHaveLength(3)
})

describe('accessibility', () => {
    it('should forward root aria properties to the SVG element', () => {
        const wrapper = mount(
            <Stream<TestDatum>
                width={500}
                height={300}
                data={[
                    { A: 10, B: 20, C: 30 },
                    { A: 20, B: 10, C: 30 },
                    { A: 30, B: 10, C: 20 },
                ]}
                keys={['A', 'B', 'C']}
                animate={false}
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