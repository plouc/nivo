import { mount } from 'enzyme'
import { BoxPlot, BoxPlotDatum, BoxPlotItemProps } from '../src'
import { ComputedBoxPlotSummary } from '../dist/types'

it('renders a basic boxplot chart', () => {
    const wrapper = mount(
        <BoxPlot
            width={500}
            height={300}
            data={[
                { group: 'Alpha', value: 1 },
                { group: 'Beta', value: 2 },
                { group: 'Gamma', value: 3 },
            ]}
            animate={false}
        />
    )
    expect(wrapper.find('BoxPlotItem')).toHaveLength(3)
})

it('renders a chart using only data relevant to targeted groups', () => {
    const wrapper = mount(
        <BoxPlot
            width={500}
            height={300}
            data={[
                { group: 'Alpha', value: 1 },
                { group: 'Beta', value: 2 },
                { group: 'Gamma', value: 3 },
            ]}
            groups={['Alpha', 'Beta']}
            animate={false}
        />
    )
    expect(wrapper.find('BoxPlotItem')).toHaveLength(2)
})

it('extracts values and groups from custom keys', () => {
    const wrapper = mount(
        <BoxPlot
            width={500}
            height={300}
            groupBy={'g'}
            value="v"
            data={[
                { g: 'A', v: 1 },
                { g: 'B', v: 2 },
                { g: 'B', v: 3 },
                { g: 'A', v: 4 },
                { g: 'A', v: 2.5 },
            ]}
            animate={false}
        />
    )
    // there are two groups ["A", "B"]
    const items = wrapper.find('BoxPlotItem')
    expect(items).toHaveLength(2)

    // the first box should be based on [1, 2.5, 4]
    // so the extrema should be [1, 4] and median should be [2.5]
    const boxPlotA = items.at(0).prop('boxPlot') as ComputedBoxPlotSummary
    expect(boxPlotA.data.extrema[0]).toBe(1)
    expect(boxPlotA.data.extrema[1]).toBe(4)
    expect(boxPlotA.data.n).toBe(3)
    expect(boxPlotA.data.values[2]).toBe(2.5)

    // the second box should be based on [2, 3]
    const boxPlotB = items.at(1).prop('boxPlot') as ComputedBoxPlotSummary
    expect(boxPlotB.data.extrema[0]).toBe(2)
    expect(boxPlotB.data.extrema[1]).toBe(3)
    expect(boxPlotB.data.n).toBe(2)
})

it('should allow horizontal layout', () => {
    const wrapper = mount(
        <BoxPlot
            width={500}
            height={300}
            layout="horizontal"
            groups={['A', 'B']}
            data={[
                { group: 'A', value: 1 },
                { group: 'A', value: 2 },
                { group: 'B', value: 5 },
                { group: 'B', value: 10 },
            ]}
            animate={false}
        />
    )
    // in a horizontal layout, the bars should all have the same height
    const props = wrapper.find('BoxPlotItem').map(item => {
        const {
            boxPlot: { height },
        } = item.props() as unknown as BoxPlotItemProps<BoxPlotDatum>
        return height
    })
    expect(new Set(props).size).toBe(1)
})

it('allows subgroups', () => {
    const wrapper = mount(
        <BoxPlot
            width={500}
            height={300}
            subGroupBy="type"
            data={[
                { group: 'A', type: 't1', value: 10 },
                { group: 'A', type: 't1', value: 10.5 },
                { group: 'A', type: 't2', value: 11 },
                { group: 'A', type: 't2', value: 11.5 },
                { group: 'B', type: 't1', value: 12 },
                { group: 'B', type: 't2', value: 13 },
            ]}
            animate={false}
        />
    )
    // there should be 2 boxes for group "A" and 2 boxes for group "B"
    expect(wrapper.find('BoxPlotItem')).toHaveLength(4)
})

it('accepts data in pre-summarized format', () => {
    const wrapper = mount(
        <BoxPlot
            width={500}
            height={300}
            layout={'horizontal'}
            enableLabel={false}
            groups={['A', 'B']}
            data={[
                {
                    group: 'A',
                    subGroup: '',
                    quantiles: [0.1, 0.25, 0.5, 0.75, 1.0],
                    values: [1.5, 2, 2.5, 3, 3.5],
                    extrema: [1, 5],
                    mean: 4.5,
                    n: 12,
                },
                {
                    group: 'B',
                    subGroup: '',
                    quantiles: [0.1, 0.25, 0.5, 0.75, 0.9],
                    values: [2.5, 3, 3.5, 5, 5.5],
                    extrema: [2, 7],
                    mean: 3.9,
                    n: 24,
                },
            ]}
            animate={false}
        />
    )
    // there should be a box for group "A" and a box for group "B"
    const items = wrapper.find('BoxPlotItem')
    expect(items).toHaveLength(2)

    // in a horizontal layout, the second boxplot should be wider
    // they should both have the same height
    const boxPlotA = items.at(0).prop('boxPlot') as ComputedBoxPlotSummary
    const boxPlotB = items.at(1).prop('boxPlot') as ComputedBoxPlotSummary
    expect(boxPlotA.width).toBeGreaterThan(1)
    expect(boxPlotB.width).toBeGreaterThan(boxPlotA.width)
    expect(boxPlotB.height).toBe(boxPlotA.height)
})

it('creates custom grouped legends', () => {
    const customLabel = d => {
        if (d.group === 'B') return 'Group B'
        return 'Control'
    }
    const wrapper = mount(
        <BoxPlot
            width={500}
            height={300}
            layout={'horizontal'}
            groups={['A', 'B', 'C']}
            subGroups={[]}
            data={[
                {
                    group: 'A',
                    subGroup: '',
                    quantiles: [0.1, 0.25, 0.5, 0.75, 1.0],
                    values: [1.5, 2, 2.5, 3, 3.5],
                    extrema: [1, 5],
                    mean: 4.5,
                    n: 12,
                },
                {
                    group: 'B',
                    subGroup: '',
                    quantiles: [0.1, 0.25, 0.5, 0.75, 0.9],
                    values: [2.5, 3, 3.5, 5, 5.5],
                    extrema: [2, 7],
                    mean: 3.9,
                    n: 24,
                },
                {
                    group: 'C',
                    subGroup: '',
                    quantiles: [0.1, 0.25, 0.5, 0.75, 0.9],
                    values: [2.5, 3, 3.5, 5, 5.5],
                    extrema: [2, 7],
                    mean: 3.9,
                    n: 24,
                },
            ]}
            legendLabel={customLabel}
            legends={[
                {
                    anchor: 'bottom-right',
                    dataFrom: customLabel,
                    direction: 'column',
                    itemWidth: 80,
                    itemHeight: 20,
                },
            ]}
            animate={false}
        />
    )
    // there should be a component with legends
    const legend = wrapper.find('BoxPlotLegends')
    expect(legend).toHaveLength(1)
    // there should be two <text> elements for 'Control' and 'Group B'
    const legendText = legend.find('text')
    expect(legendText).toHaveLength(2)
    // the data has three groups ['A', 'B', 'C'] and the custom label
    // should translate those groups to ['Control', 'Group B', 'Control']
    // so the legend text fields should be 'Control' and 'Group B'
    expect(legendText.at(0).text()).toBe('Control')
    expect(legendText.at(1).text()).toBe('Group B')
})
