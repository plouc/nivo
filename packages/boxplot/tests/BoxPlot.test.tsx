import { mount } from 'enzyme'
import { BoxPlot, BoxPlotDatum, BoxPlotItemProps, BoxPlotTooltipProps } from '../src'
import { BoxPlotCustomLayerProps, ComputedBoxPlotSummary } from '../dist/types'
import { Globals, SpringValue } from '@react-spring/web'

// beforeAll and afterAll - required to test spring values that change via animations
beforeAll(() => {
    Globals.assign({ skipAnimation: true })
})
afterAll(() => {
    Globals.assign({ skipAnimation: false })
})

// data with three groups
const dataGroups = [
    { group: 'Alpha', value: 1 },
    { group: 'Alpha', value: 5 },
    { group: 'Beta', value: 2 },
    { group: 'Beta', value: 10 },
    { group: 'Gamma', value: 3 },
    { group: 'Gamma', value: 2 },
]
// dataset with two groups and two subgroups
const dataSubGroups = [
    { group: 'Alpha', type: 'A', value: 10 },
    { group: 'Alpha', type: 'A', value: 10.5 },
    { group: 'Alpha', type: 'B', value: 11 },
    { group: 'Alpha', type: 'B', value: 11.5 },
    { group: 'Beta', type: 'A', value: 12 },
    { group: 'Beta', type: 'B', value: 13 },
]

const minimalProps = {
    width: 500,
    height: 300,
    animate: false,
}

it('renders a basic boxplot chart', () => {
    const wrapper = mount(<BoxPlot {...minimalProps} data={dataGroups} />)
    expect(wrapper.find('BoxPlotItem')).toHaveLength(3)
})

describe('layout', () => {
    it('renders a chart even when data is empty', () => {
        const wrapper = mount(<BoxPlot {...minimalProps} data={[]} />)
        expect(wrapper.find('svg')).toHaveLength(1)
        expect(wrapper.find('BoxPlotLegends')).toHaveLength(1)
        expect(wrapper.find('BoxPlotItem')).toHaveLength(0)
    })

    it('renders a chart using only data relevant to targeted groups', () => {
        const wrapper = mount(
            <BoxPlot {...minimalProps} data={dataGroups} groups={['Alpha', 'Beta']} />
        )
        expect(wrapper.find('BoxPlotItem')).toHaveLength(2)
    })

    it('extracts values and groups from custom keys', () => {
        const wrapper = mount(
            <BoxPlot
                {...minimalProps}
                groupBy={'g'}
                value="v"
                data={[
                    { g: 'A', v: 1 },
                    { g: 'B', v: 2 },
                    { g: 'B', v: 3 },
                    { g: 'A', v: 4 },
                    { g: 'A', v: 2.5 },
                ]}
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

    it('allows a horizontal layout', () => {
        const wrapper = mount(
            <BoxPlot
                {...minimalProps}
                layout="horizontal"
                groups={['A', 'B']}
                data={[
                    { group: 'A', value: 1 },
                    { group: 'A', value: 2 },
                    { group: 'B', value: 5 },
                    { group: 'B', value: 10 },
                ]}
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
        const wrapper = mount(<BoxPlot {...minimalProps} subGroupBy="type" data={dataSubGroups} />)
        // there should be 2 boxes for group "Alpha" and 2 boxes for group "Beta"
        expect(wrapper.find('BoxPlotItem')).toHaveLength(4)
    })

    it('displays legends in order specified by subgroups', () => {
        // prepare a dataset of with (group Alpha, subgroup B) and (group Beta, subgroup A)
        const data = dataSubGroups.filter(d => {
            if (d.group === 'Alpha' && d.type === 'B') return true
            if (d.group === 'Beta' && d.type === 'A') return true
            return false
        })
        const wrapper = mount(
            <BoxPlot
                {...minimalProps}
                data={data}
                subGroups={['A', 'B']}
                subGroupBy="type"
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        itemHeight: 20,
                        itemWidth: 80,
                        translateY: 0,
                        translateX: 100,
                    },
                ]}
            />
        )
        expect(wrapper.find('BoxPlotItem')).toHaveLength(2)
        const legend = wrapper.find('BoxPlotLegends').at(0)
        expect(legend.exists()).toBeTruthy()
        const legendText = legend.find('text')
        // order of text elements should match the subgroups provided in the props
        expect(legendText.at(0).text()).toBe('A')
        expect(legendText.at(1).text()).toBe('B')
    })

    it('allows multiple legends', () => {
        const wrapper = mount(
            <BoxPlot
                {...minimalProps}
                data={dataSubGroups}
                subGroupBy="type"
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        itemHeight: 20,
                        itemWidth: 80,
                        translateY: 0,
                        translateX: 100,
                    },
                    {
                        anchor: 'top-right',
                        direction: 'column',
                        itemHeight: 20,
                        itemWidth: 80,
                        translateY: 0,
                        translateX: 100,
                        data: [
                            { id: 'X', label: 'Another', color: '#ff0000' },
                            { id: 'Y', label: 'Legend', color: '#000000' },
                        ],
                    },
                ]}
            />
        )
        // two legend components with 4 color boxes and labels in total
        const legends = wrapper.find('BoxPlotLegends')
        expect(legends.children()).toHaveLength(2)
        const legendText = legends.find('text')
        expect(legendText).toHaveLength(4)
        const expectedText = ['A', 'B', 'Another', 'Legend']
        expectedText.forEach((text, i) => {
            expect(legendText.at(i).text()).toBe(text)
        })
    })

    it('allows custom colors via custom functions', () => {
        const customColors = { Alpha: '#00ff00', Beta: '#0000ff', Gamma: '#ff0000' }
        const expected = ['rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)', 'rgba(255, 0, 0, 1)']
        const wrapper = mount(
            <BoxPlot
                {...minimalProps}
                data={dataGroups}
                colors={({ group }) => customColors[group]}
            />
        )
        const boxes = wrapper.find('BoxPlotItem').find('rect')
        boxes.forEach((rect, i) => {
            expect(rect.prop('fill')).toBe(expected[i])
        })
    })

    it('allows custom colors via arrays', () => {
        const customColors = ['#00ff00', '#0000ff', '#ff0000']
        const expected = ['rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)', 'rgba(255, 0, 0, 1)']
        const wrapper = mount(
            <BoxPlot {...minimalProps} data={dataGroups} colors={customColors} colorBy={'group'} />
        )
        const boxes = wrapper.find('BoxPlotItem').find('rect')
        boxes.forEach((rect, i) => {
            expect(rect.prop('fill')).toBe(expected[i])
        })
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
                {...minimalProps}
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
                        direction: 'column',
                        itemWidth: 80,
                        itemHeight: 20,
                    },
                ]}
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
})

describe('layers', () => {
    it('shows axis labels', () => {
        const wrapper = mount(
            <BoxPlot
                width={500}
                height={300}
                data={dataGroups}
                animate={false}
                axisTop={{ legend: 'Chart title' }}
            />
        )
        const textComponents = wrapper.find('text')
        const title = textComponents.filterWhere(d => d.text() === 'Chart title')
        expect(title).toHaveLength(1)
    })

    it('toggles visibility of axes', () => {
        const wrapper = mount(
            <BoxPlot
                {...minimalProps}
                data={dataGroups}
                axisTop={{ legend: 'Chart title' }}
                layers={['boxPlots']}
            />
        )
        // even though an axis has a legend, the layers toggle axes off
        const textComponents = wrapper.find('text')
        const title = textComponents.filterWhere(d => d.text() === 'Chart title')
        expect(title).toHaveLength(0)
    })

    it('displays a custom layer', () => {
        // custom layer print a text label
        const customLayer = (props: BoxPlotCustomLayerProps<BoxPlotDatum>) => {
            return (
                <text x={10} y={10}>
                    {props.layout}
                </text>
            )
        }
        const wrapper = mount(
            <BoxPlot {...minimalProps} data={dataGroups} layers={['boxPlots', customLayer]} />
        )
        // even though an axis has a legend, the layers toggle axes off
        const textComponents = wrapper.find('text')
        const customText = textComponents.filterWhere(d => d.text() === 'vertical')
        expect(customText).toHaveLength(1)
    })
})

describe('interactivity', () => {
    // these tests copied with little edits from the pie package

    it('supports onClick handler', () => {
        const onClick = jest.fn()
        const wrapper = mount(<BoxPlot {...minimalProps} data={dataGroups} onClick={onClick} />)
        wrapper.find('BoxPlotItem').at(0).simulate('click')
        expect(onClick).toHaveBeenCalledTimes(1)
        const [datum] = onClick.mock.calls[0]
        expect(datum.group).toEqual('Alpha')
    })

    it('supports onMouseEnter handler', () => {
        const onMouseEnter = jest.fn()
        const wrapper = mount(
            <BoxPlot {...minimalProps} data={dataGroups} onMouseEnter={onMouseEnter} />
        )
        wrapper.find('BoxPlotItem').at(1).simulate('mouseenter')
        expect(onMouseEnter).toHaveBeenCalledTimes(1)
        const [datum] = onMouseEnter.mock.calls[0]
        expect(datum.group).toEqual('Beta')
    })

    it('supports onMouseLeave handler', () => {
        const onMouseLeave = jest.fn()
        const wrapper = mount(
            <BoxPlot {...minimalProps} data={dataGroups} onMouseLeave={onMouseLeave} />
        )
        wrapper.find('BoxPlotItem').at(0).simulate('mouseleave')
        expect(onMouseLeave).toHaveBeenCalledTimes(1)
        const [datum] = onMouseLeave.mock.calls[0]
        expect(datum.group).toEqual('Alpha')
    })

    it('allows to completely disable interactivity', () => {
        const onClick = jest.fn()
        const onMouseEnter = jest.fn()
        const onMouseLeave = jest.fn()
        const wrapper = mount(
            <BoxPlot
                {...minimalProps}
                data={dataGroups}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                isInteractive={false}
            />
        )
        const boxPlot = wrapper.find('BoxPlotItem').at(0)
        boxPlot.simulate('click')
        boxPlot.simulate('mouseenter')
        boxPlot.simulate('mouseleave')
        expect(onClick).not.toHaveBeenCalled()
        expect(onMouseEnter).not.toHaveBeenCalled()
        expect(onMouseLeave).not.toHaveBeenCalled()
    })

    it('displays a tooltip when hovering a slice', () => {
        const wrapper = mount(<BoxPlot {...minimalProps} data={dataGroups} />)
        expect(wrapper.find('BoxPlotTooltip').exists()).toBeFalsy()
        wrapper.find('BoxPlotItem').at(0).simulate('mouseenter')
        const tooltip = wrapper.find('BoxPlotTooltip')
        expect(tooltip.exists()).toBeTruthy()
        expect(tooltip.find('div').length).toBeGreaterThan(4)
        expect(tooltip.find('strong').length).toBeGreaterThan(4)
    })

    it('allows use of custom tooltip', () => {
        const CustomTooltip = (props: BoxPlotTooltipProps) => <span>{props.label}</span>
        const wrapper = mount(
            <BoxPlot {...minimalProps} data={dataGroups} tooltip={CustomTooltip} />
        )
        expect(wrapper.find('CustomTooltip').exists()).toBeFalsy()
        wrapper.find('BoxPlotItem').at(1).simulate('mouseenter')
        const tooltip = wrapper.find('CustomTooltip')
        expect(tooltip.exists()).toBeTruthy()
        expect(tooltip.text()).toBe('Beta')
    })

    it('customizes tooltip with language translation', () => {
        const wrapper = mount(
            <BoxPlot
                {...minimalProps}
                data={dataGroups}
                theme={{
                    translation: {
                        Summary: 'Replaced 1',
                        Quantiles: 'Replaced 2',
                        Irrelevant: 'Replaced 3',
                    },
                }}
            />
        )
        wrapper.find('BoxPlotItem').at(2).simulate('mouseenter')
        const tooltip = wrapper.find('BoxPlotTooltip')
        const divText = tooltip.find('div').map(d => d.text())
        expect(divText).toContain('Replaced 1')
        expect(divText).toContain('Replaced 2')
        expect(divText).not.toContain('Replaced 3')
    })

    it('supports setting opacity for active group and subgroup', () => {
        const wrapper = mount(
            <BoxPlot
                {...minimalProps}
                data={dataSubGroups}
                subGroupBy="type"
                opacity={0.8}
                activeOpacity={1}
                inactiveOpacity={0.2}
            />
        )
        const ids = ['boxplot.0.0', 'boxplot.0.1', 'boxplot.1.0', 'boxplot.1.1']
        ids.forEach(id => {
            const item = wrapper.find(`g[data-key='${id}']`).parent()
            expect(item.prop<SpringValue<number>>('opacity').get()).toEqual(0.8)
        })
        // mouse on group Alpha, type B -> expect group Beta, type A to be inactive
        wrapper.find("g[data-key='boxplot.0.1']").simulate('mouseenter')
        let expectedInactive = 'boxplot.1.0'
        ids.forEach(id => {
            const item = wrapper.find(`g[data-key='${id}']`).parent()
            const opacity = item.prop('opacity').get()
            if (id === expectedInactive) {
                expect(opacity).toEqual(0.2)
            } else {
                expect(opacity).toEqual(1)
            }
        })
        // mouse to group Beta, type A -> expect group Alpha, type B to be inactive
        wrapper.find("g[data-key='boxplot.0.1']").simulate('mouseleave')
        wrapper.find("g[data-key='boxplot.1.0']").simulate('mouseenter')
        expectedInactive = 'boxplot.0.1'
        ids.forEach(id => {
            const item = wrapper.find(`g[data-key='${id}']`).parent()
            const opacity = item.prop('opacity').get()
            if (id === expectedInactive) {
                expect(opacity).toEqual(0.2)
            } else {
                expect(opacity).toEqual(1)
            }
        })
    })
})

describe('accessibility', () => {
    // these copied with little edits from the Bar package

    it('forwards root aria properties to the SVG element', () => {
        const wrapper = mount(
            <BoxPlot
                {...minimalProps}
                data={dataGroups}
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

    it('adds aria attributes to boxplots', () => {
        const wrapper = mount(
            <BoxPlot
                {...minimalProps}
                data={dataGroups}
                boxPlotAriaLabel={() => 'BoxPlotAriaLabel'}
                boxPlotAriaLabelledBy={() => 'BoxPlotAriaLabelledBy'}
                boxPlotAriaDescribedBy={() => 'BoxPlotAriaDescribedBy'}
            />
        )
        wrapper
            .find('BoxPlotItem')
            .find('g')
            .forEach(boxPlot => {
                expect(boxPlot.prop('aria-label')).toBe('BoxPlotAriaLabel')
                expect(boxPlot.prop('aria-labelledby')).toBe('BoxPlotAriaLabelledBy')
                expect(boxPlot.prop('aria-describedby')).toBe('BoxPlotAriaDescribedBy')
            })
    })
})
