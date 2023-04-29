import type { Meta, StoryObj } from '@storybook/react'
import { generateBoxPlotData } from '@nivo/generators'
import { BoxPlot, ResponsiveBoxPlot } from '@nivo/boxplot'
// import { action } from '@storybook/addon-actions'
import { BoxPlotCustomGroupsAndLayers } from './BoxPlotCustomGroupsAndLayers'

const meta: Meta<typeof BoxPlot> = {
    title: 'BoxPlot',
    component: BoxPlot,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BoxPlot>

const simpleProps = {
    width: 320,
    height: 420,
    margin: { top: 40, right: 110, bottom: 40, left: 80 },
    data: generateBoxPlotData([
        { group: 'Alpha', mu: 5, sd: 1, n: 20 },
        { group: 'Beta', mu: 7, sd: 1.4, n: 20 },
        { group: 'Gamma', mu: 9, sd: 1.8, n: 20 },
    ]),
    groupBy: 'group',
    groups: ['Alpha', 'Beta', 'Gamma'],
    padding: 0.2,
    borderWidth: 2,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 0.4]],
    },
    whiskerColor: {
        from: 'color',
    },
    medianColor: {
        from: 'color',
        modifiers: [['darker', 1.0]],
    },
    medianWidth: 4,
    whiskerWidth: 3,
}
const simplePropsHorizontal = {
    width: 500,
    height: 380,
    margin: { top: 60, right: 20, bottom: 180, left: 80 },
    layout: 'horizontal',
    enableGridY: false,
    enableGridX: true,
}
const commonProps = {
    width: 600,
    height: 420,
    margin: { top: 40, right: 110, bottom: 60, left: 80 },
    data: generateBoxPlotData([
        { group: 'Alpha', subgroup: 'A', mu: 5, sd: 1, n: 20 },
        { group: 'Alpha', subgroup: 'B', mu: 6, sd: 1, n: 20 },
        { group: 'Beta', subgroup: 'A', mu: 8, sd: 1.4, n: 20 },
        { group: 'Beta', subgroup: 'B', mu: 7.5, sd: 1.4, n: 20 },
        { group: 'Gamma', subgroup: 'A', mu: 5, sd: 1, n: 20 },
        { group: 'Gamma', subgroup: 'B', mu: 7.2, sd: 1.8, n: 20 },
        { group: 'Delta', subgroup: 'A', mu: 5, sd: 1, n: 20 },
        { group: 'Delta', subgroup: 'B', mu: 6, sd: 1, n: 20 },
    ]),
    groupBy: 'group',
    groups: ['Alpha', 'Beta', 'Gamma', 'Delta'],
    subGroupBy: 'subgroup',
    subGroups: ['A', 'B'],
    colorBy: 'subGroup',
    padding: 0.2,
}

/**
 * The BoxPlot component expects input as a list of raw data objects. The component
 * computes summary statistics using quantiles, and then draws a chart based on the
 * summary statistics.
 */
export const Basic: Story = {
    render: () => (
        <BoxPlot
            data={simpleProps.data}
            height={420}
            width={320}
            margin={{ top: 40, right: 110, bottom: 40, left: 80 }}
        />
    ),
}

export const Vertical = {
    render: () => (
        <BoxPlot
            {...simpleProps}
            colorBy={'group'}
            axisTop={{
                tickSize: 0,
                tickValues: [''],
                legend: 'Chart title',
                legendPosition: 'middle',
                legendOffset: -20,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Arbitrary units (a.u.)',
                legendPosition: 'middle',
                legendOffset: -50,
            }}
        />
    ),
}

export const Horizontal: Story = {
    render: () => (
        <BoxPlot
            {...simpleProps}
            {...simplePropsHorizontal}
            colorBy={'group'}
            enableGridY={true}
            enableGridX={true}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    itemHeight: 20,
                    itemWidth: 80,
                    translateY: 90,
                    translateX: 0,
                },
            ]}
            axisTop={{
                tickSize: 0,
                tickValues: [''],
                legend: 'Chart title',
                legendPosition: 'middle',
                legendOffset: -20,
            }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Arbitrary units (a.u.)',
                legendPosition: 'end',
                legendOffset: 40,
            }}
        />
    ),
}

export const GroupedVertical = {
    render: () => (
        <BoxPlot
            {...commonProps}
            animate={true}
            layout="vertical"
            padding={0.3}
            innerPadding={2}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    itemHeight: 20,
                    itemWidth: 80,
                    translateY: 0,
                    translateX: 100,
                },
            ]}
        />
    ),
}

const subGroupNames = { A: 'controls', B: 'cases' }
export const GroupedHorizontal: Story = {
    render: () => (
        <BoxPlot
            {...commonProps}
            layout="horizontal"
            width={commonProps.width}
            height={commonProps.width * 0.75}
            margin={{ top: 60, right: 20, bottom: 160, left: 80 }}
            enableGridY={true}
            enableGridX={true}
            padding={0.2}
            innerPadding={2}
            legendLabel={datum => subGroupNames[datum.subGroup]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    itemHeight: 20,
                    itemWidth: 120,
                    translateY: 80,
                    translateX: 0,
                },
            ]}
        />
    ),
}

const customColors = { Alpha: '#dd4444', Beta: '#44aaaa', Gamma: '#4466dd' }
export const ColorsAndFiles: Story = {
    render: () => (
        <BoxPlot
            {...simpleProps}
            {...simplePropsHorizontal}
            colors={({ group }) => customColors[group]}
            colorBy={'group'}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#ee6060',
                    rotation: -45,
                    lineWidth: 5,
                    spacing: 10,
                },
            ]}
            fill={[
                {
                    match: {
                        group: 'Alpha',
                    },
                    id: 'lines',
                },
                {
                    match: {
                        group: 'Gamma',
                    },
                    id: 'dots',
                },
            ]}
        />
    ),
}

export const LogScale: Story = {
    render: () => {
        // transform existing data by exponentiation
        const transformedData = simpleProps.data.map(d => {
            const result = { ...d }
            result.value = Math.pow(10, (d.value - 6) * 0.5)
            return result
        })
        // manually construct positions of major tick marks
        const min = transformedData.reduce((acc, d) => Math.min(acc, d.value), Infinity)
        const max = transformedData.reduce((acc, d) => Math.max(acc, d.value), -Infinity)
        const logMin = Math.floor(Math.log10(min))
        const logMax = Math.ceil(Math.log10(max))
        const numValues = Math.round(logMax - logMin + 1)
        const logValues = Array(numValues)
            .fill(0)
            .map((_, i) => i + logMin)

        return (
            <BoxPlot
                {...simpleProps}
                data={transformedData}
                colorBy={'group'}
                enableGridY={true}
                enableGridX={false}
                valueScale={{ type: 'log' }}
                quantiles={[0.01, 0.25, 0.5, 0.75, 0.99]}
                gridYValues={logValues.map(v => Math.pow(10, v))}
                minValue={Math.pow(10, logMin)}
                maxValue={Math.pow(10, logMax)}
                axisLeft={{
                    tickSize: 5,
                    tickValues: logValues.map(v => Math.pow(10, v)),
                    tickPadding: 5,
                    tickRotation: 0,
                }}
            />
        )
    },
}

/**
 * The first chart shows three groups in three different colors. The second chart is
 * configured to show the same three groups, but it is passed a subset data for just two
 * out of the three groups. It automatically uses the same color scheme for the three
 * groups.
 */
export const GroupsWithoutData: Story = {
    render: () => (
        <div style={{ display: 'flex' }}>
            <BoxPlot
                {...simpleProps}
                data={simpleProps.data}
                layout={'vertical'}
                colorBy={'group'}
            />
            <BoxPlot
                {...simpleProps}
                data={simpleProps.data.filter(datum => datum.group != 'Beta')}
                layout={'vertical'}
                colorBy={'group'}
            />
        </div>
    ),
}

export const SubGroupsWithoutData: Story = {
    render: () => (
        <BoxPlot
            {...commonProps}
            data={commonProps.data.filter(datum => {
                if (datum.group === 'Beta' && datum.subgroup === 'B') return false
                if (datum.group === 'Gamma') return false
                if (datum.group === 'Alpha' && datum.subgroup === 'A') return false
                return true
            })}
            layout={'vertical'}
            colorBy={'subGroup'}
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
    ),
}

/**
 * These charts display the same data. On the left, whiskers represent [10%-90%]
 * quantiles
 * (default). On the right, whiskers instead show [min-max] intervals.
 * (Hover on the boxes and compare the data summaries).
 */
export const CustomQuantiles: Story = {
    render: () => (
        <div style={{ display: 'flex' }}>
            <BoxPlot {...simpleProps} quantiles={[0.1, 0.25, 0.5, 0.75, 0.9]} layout={'vertical'} />
            <BoxPlot {...simpleProps} quantiles={[0, 0.25, 0.5, 0.75, 1.0]} layout={'vertical'} />
        </div>
    ),
}

export const WhiskerEnds: Story = {
    render: () => <BoxPlot {...simpleProps} {...simplePropsHorizontal} whiskerEndSize={0.5} />,
}

export const MarkersAndAnnotations: Story = {
    render: () => (
        <BoxPlot
            {...commonProps}
            markers={[
                {
                    axis: 'y',
                    value: 4.5,
                    lineStyle: {
                        stroke: '#000000',
                        strokeWidth: 2,
                        strokeDasharray: '8 6',
                    },
                    legend: 'y marker',
                    legendPosition: 'right',
                    legendOrientation: 'horizontal',
                },
            ]}
            annotations={[
                {
                    type: 'rect',
                    match: { group: 'Gamma', subGroup: 'B' },
                    noteX: 50,
                    noteY: -20,
                    offset: 3,
                    noteTextOffset: 0,
                    noteWidth: 0,
                    note: 'an annotation',
                },
            ]}
            legends={[
                {
                    anchor: 'top-right',
                    direction: 'column',
                    itemHeight: 20,
                    itemWidth: 80,
                    translateY: 0,
                    translateX: 100,
                },
            ]}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Arbitrary units (a.u.)',
                legendPosition: 'middle',
                legendOffset: -50,
            }}
        />
    ),
}

export const Themed: Story = {
    render: () => (
        <div
            style={{
                maxWidth: '900px',
                backgroundColor: '#222',
                padding: '24px 32p',
            }}
        >
            <BoxPlot
                {...commonProps}
                borderWidth={0}
                whiskerColor={{
                    from: 'color',
                }}
                medianWidth={5}
                medianColor={{
                    from: 'color',
                    modifiers: [['brighter', 0.6]],
                }}
                theme={{
                    tooltip: {
                        container: {
                            fontSize: 18,
                            padding: 12,
                        },
                    },
                    axis: {
                        ticks: {
                            line: {
                                stroke: '#444444',
                            },
                            text: {
                                fill: '#999999',
                            },
                        },
                    },
                    grid: {
                        line: {
                            stroke: '#444444',
                        },
                    },
                }}
            />
        </div>
    ),
}

/**
 * A color function assigns the same color to several of the boxes. Another function
 * generates custom legend labels. The legend displays as many labels as there are distinct
 * colors.
 * A custom layer provides a background for a subset of the boxes.
 */
export const CustomGroups: Story = {
    render: () => <BoxPlotCustomGroupsAndLayers />,
}

/**
 * This chart uses a custom-made legend. All the labels and colors are specified
 * independently of the data.
 */
export const CustomLegend: Story = {
    render: () => (
        <BoxPlot
            {...simpleProps}
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    itemHeight: 20,
                    itemWidth: 80,
                    translateY: 0,
                    translateX: 100,
                    data: [
                        { id: 'A', label: 'Look', color: '#faa6ff' },
                        { id: 'B', label: "I'm custom", color: '#30bced' },
                    ],
                },
            ]}
        />
    ),
}

/**
 * This chart uses pre-computed summary statistics. The pre-computed representation
 * requires: minimum value, maximum value, values representing whiskers, values
 * representing box bounds, median, mean, and the number of data points (n).
 */
export const PreComputed: Story = {
    render: () => {
        const quantiles = [0.1, 0.25, 0.5, 0.75, 0.9]
        return (
            <BoxPlot
                width={320}
                height={420}
                margin={{ top: 40, right: 110, bottom: 40, left: 80 }}
                enableLabel={false}
                subGroups={[]}
                padding={0.6}
                data={[
                    {
                        group: 'A',
                        subGroup: '',
                        quantiles: quantiles,
                        values: [1.5, 2, 2.5, 3, 3.5],
                        extrema: [1, 5],
                        mean: 2.5,
                        n: 100,
                    },
                    {
                        group: 'B',
                        subGroup: '',
                        quantiles: quantiles,
                        values: [2.5, 3, 3.5, 4, 4.5],
                        extrema: [2, 7],
                        mean: 3.75,
                        n: 200,
                    },
                ]}
            />
        )
    },
}

/**
 * This chart handles mouse events - check 'Actions'.
 */
export const MouseEvents: Story = {
    render: () => (
        <BoxPlot
            {...commonProps}
            animate={false}
            layout="vertical"
            // onClick={action('onClick')}
            // onMouseEnter={action('onMouseEnter')}
            // onMouseLeave={action('onMouseLeave')}
        />
    ),
}

/**
 * The tooltips are presented in French. (Hover the mouse over the boxplots).
 */
export const Translations: Story = {
    render: () => (
        <BoxPlot
            {...simpleProps}
            theme={{
                translation: {
                    n: 'n',
                    Summary: 'Résumé',
                    mean: 'moyenne',
                    min: 'min',
                    max: 'max',
                    Quantiles: 'Quantiles',
                },
            }}
        />
    ),
}

/**
 * This chart takes its size from its parent container.
 */
export const Responsive: Story = {
    render: () => {
        return (
            <div style={{ height: '480px', width: '320px' }}>
                <ResponsiveBoxPlot
                    data={simpleProps.data}
                    margin={{ top: 40, right: 110, bottom: 40, left: 80 }}
                />
            </div>
        )
    },
}
