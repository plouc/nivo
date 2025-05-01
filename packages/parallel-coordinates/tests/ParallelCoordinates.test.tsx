import { create } from 'react-test-renderer'
import { LegendSvg, LegendSvgItem, LegendProps } from '@nivo/legends'
import { ParallelCoordinates } from '../src'
import { ParallelCoordinatesLine } from '../src/svg/ParallelCoordinatesLine'

const testVariables = [
    {
        id: 'cost',
        value: 'cost' as const,
    },
    {
        id: 'weight',
        value: 'weight' as const,
    },
    {
        id: 'volume',
        value: 'volume' as const,
    },
]
const testData = [
    {
        id: 'A',
        cost: 10,
        weight: 20,
        volume: 30,
    },
    {
        id: 'B',
        cost: 110,
        weight: 120,
        volume: 130,
    },
    {
        id: 'C',
        cost: 210,
        weight: 220,
        volume: 230,
    },
]
const testDataGrouped = [
    {
        group: 'group_0',
        id: 'A',
        cost: 10,
        weight: 20,
        volume: 30,
    },
    {
        group: 'group_0',
        id: 'B',
        cost: 40,
        weight: 50,
        volume: 60,
    },
    {
        group: 'group_1',
        id: 'A',
        cost: 110,
        weight: 120,
        volume: 130,
    },
    {
        group: 'group_1',
        id: 'B',
        cost: 140,
        weight: 150,
        volume: 160,
    },
]

describe('<Waffle />', () => {
    it('should render a basic parallel coordinates chart in SVG', () => {
        const component = create(
            <ParallelCoordinates
                width={500}
                height={300}
                data={testData}
                variables={testVariables}
                animate={false}
                testIdPrefix="chart"
            />
        ).root

        const lines = component.findAllByType(ParallelCoordinatesLine)
        expect(lines).toHaveLength(testData.length)
    })

    describe('style', () => {
        it('should color lines individually in non-grouped mode', () => {
            const colors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)']
            const component = create(
                <ParallelCoordinates
                    width={500}
                    height={300}
                    data={testData}
                    variables={testVariables}
                    colors={colors}
                    animate={false}
                    testIdPrefix="chart"
                />
            ).root

            const lines = component.findAllByType(ParallelCoordinatesLine)
            expect(lines).toHaveLength(testData.length)

            expect(lines[0].findByType('path').props.stroke).toEqual(colors[0])
            expect(lines[1].findByType('path').props.stroke).toEqual(colors[1])
            expect(lines[2].findByType('path').props.stroke).toEqual(colors[2])
        })

        it('should color lines depending on their group in grouped mode', () => {
            const colors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)']
            const component = create(
                <ParallelCoordinates
                    width={500}
                    height={300}
                    data={testDataGrouped}
                    variables={testVariables}
                    groupBy="group"
                    colors={colors}
                    animate={false}
                    testIdPrefix="chart"
                />
            ).root

            const lines = component.findAllByType(ParallelCoordinatesLine)
            expect(lines).toHaveLength(testDataGrouped.length)

            expect(lines[0].findByType('path').props.stroke).toEqual(colors[0])
            expect(lines[1].findByType('path').props.stroke).toEqual(colors[0])
            expect(lines[2].findByType('path').props.stroke).toEqual(colors[1])
            expect(lines[3].findByType('path').props.stroke).toEqual(colors[1])
        })
    })

    describe('legends', () => {
        const legends: LegendProps[] = [
            {
                anchor: 'top-left',
                direction: 'column',
                itemWidth: 100,
                itemHeight: 20,
            },
        ]

        it('should render a legend for each datum in non-grouped mode', () => {
            const component = create(
                <ParallelCoordinates
                    width={500}
                    height={300}
                    data={testData}
                    variables={testVariables}
                    legends={legends}
                    animate={false}
                    testIdPrefix="chart"
                />
            ).root

            const legend = component.findByType(LegendSvg)

            const legendItems = legend.findAllByType(LegendSvgItem)
            expect(legendItems).toHaveLength(testData.length)

            expect(legendItems[0].props.data.id).toEqual('A')
            expect(legendItems[1].props.data.id).toEqual('B')
            expect(legendItems[2].props.data.id).toEqual('C')
        })

        it('should render a legend for each group in grouped mode', () => {
            const component = create(
                <ParallelCoordinates
                    width={500}
                    height={300}
                    data={testDataGrouped}
                    groupBy="group"
                    variables={testVariables}
                    legends={legends}
                    animate={false}
                    testIdPrefix="chart"
                />
            ).root

            const legend = component.findByType(LegendSvg)

            const legendItems = legend.findAllByType(LegendSvgItem)
            expect(legendItems).toHaveLength(2)

            expect(legendItems[0].props.data.id).toEqual('group_0')
            expect(legendItems[1].props.data.id).toEqual('group_1')
        })
    })

    describe('accessibility', () => {
        it('should support aria attributes for the root SVG element', () => {
            const component = create(
                <ParallelCoordinates
                    width={500}
                    height={300}
                    data={testData}
                    variables={testVariables}
                    ariaLabel="AriaLabel"
                    ariaLabelledBy="AriaLabelledBy"
                    ariaDescribedBy="AriaDescribedBy"
                    animate={false}
                    testIdPrefix="chart"
                />
            ).root

            const svg = component.findByType('svg')

            expect(svg.props['aria-label']).toBe('AriaLabel')
            expect(svg.props['aria-labelledby']).toBe('AriaLabelledBy')
            expect(svg.props['aria-describedby']).toBe('AriaDescribedBy')
        })
    })
})
