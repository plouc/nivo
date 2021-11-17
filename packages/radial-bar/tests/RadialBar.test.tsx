import { mount } from 'enzyme'
import { degreesToRadians } from '@nivo/core'
import { DatumWithArcAndColor } from '@nivo/arcs'
// @ts-ignore
import { RadialBar, RadialBarSvgProps, ComputedBar, RadialBarTooltipProps } from '../src'

const baseProps: RadialBarSvgProps = {
    width: 600,
    height: 600,
    startAngle: 0,
    endAngle: 270,
    data: [
        { id: 'Combini', data: [{ x: 'Fruits', y: 10 }] },
        { id: 'Online', data: [{ x: 'Fruits', y: 20 }] },
        { id: 'Supermarket', data: [{ x: 'Fruits', y: 30 }] },
    ],
    animate: false,
}

const stackedData: RadialBarSvgProps['data'] = [
    {
        id: 'Combini',
        data: [
            { x: 'Fruits', y: 10 },
            { x: 'Vegetables', y: 10 },
            { x: 'Meat', y: 10 },
        ],
    },
    {
        id: 'Online',
        data: [
            { x: 'Fruits', y: 20 },
            { x: 'Vegetables', y: 20 },
            { x: 'Meat', y: 20 },
        ],
    },
    {
        id: 'Supermarket',
        data: [
            { x: 'Fruits', y: 30 },
            { x: 'Vegetables', y: 30 },
            { x: 'Meat', y: 30 },
        ],
    },
]

it('should render a basic radial bar chart', () => {
    const wrapper = mount(<RadialBar {...baseProps} />)

    const bars = wrapper.find('RadialBarArcs').find('ArcShape')
    expect(bars).toHaveLength(3)

    const bar0 = bars.at(0)
    const datum0 = bar0.prop<ComputedBar>('datum')
    expect(datum0.id).toBe('Combini.Fruits')
    expect(datum0.groupId).toBe('Combini')
    expect(datum0.category).toBe('Fruits')
    expect(datum0.value).toBe(10)
    expect(datum0.arc.startAngle).toBe(0)
    expect(datum0.arc.endAngle).toBe(degreesToRadians(90))
    expect(datum0.color).toBe('#e8c1a0')

    const bar1 = bars.at(1)
    const datum1 = bar1.prop<ComputedBar>('datum')
    expect(datum1.id).toBe('Online.Fruits')
    expect(datum1.groupId).toBe('Online')
    expect(datum1.category).toBe('Fruits')
    expect(datum1.value).toBe(20)
    expect(datum1.arc.startAngle).toBe(0)
    expect(datum1.arc.endAngle).toBe(degreesToRadians(180))
    expect(datum1.color).toBe('#e8c1a0')

    const bar2 = bars.at(2)
    const datum2 = bar2.prop<ComputedBar>('datum')
    expect(datum2.id).toBe('Supermarket.Fruits')
    expect(datum2.groupId).toBe('Supermarket')
    expect(datum2.category).toBe('Fruits')
    expect(datum2.value).toBe(30)
    expect(datum2.arc.startAngle).toBe(0)
    expect(datum2.arc.endAngle).toBe(degreesToRadians(270))
    expect(datum1.color).toBe('#e8c1a0')
})

describe('data', () => {
    it('should support value formatting via d3 format', () => {
        const wrapper = mount(<RadialBar {...baseProps} valueFormat=">-.2f" />)

        const bars = wrapper.find('RadialBarArcs').find('ArcShape')
        expect(bars).toHaveLength(3)

        expect(bars.at(0).prop<ComputedBar>('datum').formattedValue).toBe('10.00')
        expect(bars.at(1).prop<ComputedBar>('datum').formattedValue).toBe('20.00')
        expect(bars.at(2).prop<ComputedBar>('datum').formattedValue).toBe('30.00')
    })

    it('should support value formatting via custom function', () => {
        const wrapper = mount(<RadialBar {...baseProps} valueFormat={value => `${value}%`} />)

        const bars = wrapper.find('RadialBarArcs').find('ArcShape')
        expect(bars).toHaveLength(3)

        expect(bars.at(0).prop<ComputedBar>('datum').formattedValue).toBe('10%')
        expect(bars.at(1).prop<ComputedBar>('datum').formattedValue).toBe('20%')
        expect(bars.at(2).prop<ComputedBar>('datum').formattedValue).toBe('30%')
    })
})

describe('tooltip', () => {
    it('should show a tooltip with category, groupId and formatted value', () => {
        const wrapper = mount(<RadialBar {...baseProps} valueFormat=">-.2f" />)

        const bars = wrapper.find('RadialBarArcs').find('ArcShape')
        expect(bars).toHaveLength(3)

        bars.at(0).find('path').simulate('mouseenter')
        let tooltip = wrapper.find('RadialBarTooltip')
        expect(tooltip.text()).toBe('Fruits - Combini: 10.00')

        bars.at(1).find('path').simulate('mouseenter')
        tooltip = wrapper.find('RadialBarTooltip')
        expect(tooltip.text()).toBe('Fruits - Online: 20.00')

        bars.at(2).find('path').simulate('mouseenter')
        tooltip = wrapper.find('RadialBarTooltip')
        expect(tooltip.text()).toBe('Fruits - Supermarket: 30.00')
    })

    it('should support a custom tooltip', () => {
        const CustomTooltip = ({ bar }: RadialBarTooltipProps) => (
            <div>
                {bar.groupId} -&gt; {bar.category} -&gt; {bar.formattedValue}
            </div>
        )
        const wrapper = mount(
            <RadialBar {...baseProps} valueFormat={value => `${value}%`} tooltip={CustomTooltip} />
        )

        const bars = wrapper.find('RadialBarArcs').find('ArcShape')
        expect(bars).toHaveLength(3)

        bars.at(0).find('path').simulate('mouseenter')
        let tooltip = wrapper.find(CustomTooltip)
        expect(tooltip.text()).toBe('Combini -> Fruits -> 10%')

        bars.at(1).find('path').simulate('mouseenter')
        tooltip = wrapper.find(CustomTooltip)
        expect(tooltip.text()).toBe('Online -> Fruits -> 20%')

        bars.at(2).find('path').simulate('mouseenter')
        tooltip = wrapper.find(CustomTooltip)
        expect(tooltip.text()).toBe('Supermarket -> Fruits -> 30%')
    })
})

describe('style', () => {
    it('custom colors array', () => {
        const colors = ['#ff0000', '#00ff00', '#0000ff']
        const wrapper = mount(<RadialBar {...baseProps} data={stackedData} colors={colors} />)

        const bars = wrapper.find('RadialBarArcs').find('ArcShape')
        expect(bars).toHaveLength(9)

        expect(bars.at(0).prop<ComputedBar>('datum').color).toBe('#ff0000')
        expect(bars.at(1).prop<ComputedBar>('datum').color).toBe('#00ff00')
        expect(bars.at(2).prop<ComputedBar>('datum').color).toBe('#0000ff')

        expect(bars.at(3).prop<ComputedBar>('datum').color).toBe('#ff0000')
        expect(bars.at(4).prop<ComputedBar>('datum').color).toBe('#00ff00')
        expect(bars.at(5).prop<ComputedBar>('datum').color).toBe('#0000ff')

        expect(bars.at(6).prop<ComputedBar>('datum').color).toBe('#ff0000')
        expect(bars.at(7).prop<ComputedBar>('datum').color).toBe('#00ff00')
        expect(bars.at(8).prop<ComputedBar>('datum').color).toBe('#0000ff')
    })

    it('custom colors function using groupId', () => {
        const colorMapping = {
            Combini: '#ff0000',
            Online: '#00ff00',
            Supermarket: '#0000ff',
        }
        const wrapper = mount(
            <RadialBar
                {...baseProps}
                colors={d => colorMapping[d.groupId as keyof typeof colorMapping]}
            />
        )

        const bars = wrapper.find('RadialBarArcs').find('ArcShape')
        expect(bars).toHaveLength(3)

        expect(bars.at(0).prop<ComputedBar>('datum').color).toBe('#ff0000')
        expect(bars.at(1).prop<ComputedBar>('datum').color).toBe('#00ff00')
        expect(bars.at(2).prop<ComputedBar>('datum').color).toBe('#0000ff')
    })

    it('custom colors from data', () => {
        const wrapper = mount(
            <RadialBar
                {...baseProps}
                data={[
                    { id: 'Combini', data: [{ x: 'Fruits', y: 10, color: '#ff0000' }] },
                    { id: 'Online', data: [{ x: 'Fruits', y: 20, color: '#00ff00' }] },
                    { id: 'Supermarket', data: [{ x: 'Fruits', y: 30, color: '#0000ff' }] },
                ]}
                colors={{ datum: 'data.color' }}
            />
        )

        const bars = wrapper.find('RadialBarArcs').find('ArcShape')
        expect(bars).toHaveLength(3)

        expect(bars.at(0).prop<ComputedBar>('datum').color).toBe('#ff0000')
        expect(bars.at(1).prop<ComputedBar>('datum').color).toBe('#00ff00')
        expect(bars.at(2).prop<ComputedBar>('datum').color).toBe('#0000ff')
    })
})

describe('tracks', () => {
    it('should show tracks by default', () => {
        const wrapper = mount(<RadialBar {...baseProps} />)

        const tracks = wrapper.find('RadialBarTracks').find('ArcShape')
        expect(tracks).toHaveLength(3)

        const datum0 = tracks.at(0).prop<DatumWithArcAndColor>('datum')
        expect(datum0.arc.startAngle).toBe(0)
        expect(datum0.arc.endAngle).toBe(degreesToRadians(270))
        expect(datum0.color).toBe('rgba(0, 0, 0, .15)')

        const datum1 = tracks.at(1).prop<DatumWithArcAndColor>('datum')
        expect(datum1.arc.startAngle).toBe(0)
        expect(datum1.arc.endAngle).toBe(degreesToRadians(270))
        expect(datum1.color).toBe('rgba(0, 0, 0, .15)')

        const datum2 = tracks.at(2).prop<DatumWithArcAndColor>('datum')
        expect(datum2.arc.startAngle).toBe(0)
        expect(datum2.arc.endAngle).toBe(degreesToRadians(270))
        expect(datum2.color).toBe('rgba(0, 0, 0, .15)')
    })

    it('should allow disabling tracks', () => {
        const wrapper = mount(<RadialBar {...baseProps} enableTracks={false} />)

        expect(wrapper.find('RadialBarTracks').exists()).toBe(false)
    })

    it('should allow to customize tracks color', () => {
        const wrapper = mount(<RadialBar {...baseProps} tracksColor="#ff0000" />)

        const tracks = wrapper.find('RadialBarTracks').find('ArcShape')
        expect(tracks).toHaveLength(3)

        expect(tracks.at(0).prop<DatumWithArcAndColor>('datum').color).toBe('#ff0000')
        expect(tracks.at(1).prop<DatumWithArcAndColor>('datum').color).toBe('#ff0000')
        expect(tracks.at(2).prop<DatumWithArcAndColor>('datum').color).toBe('#ff0000')
    })
})

describe('accessibility', () => {
    it('should forward root aria properties to the SVG element', () => {
        const wrapper = mount(
            <RadialBar
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
