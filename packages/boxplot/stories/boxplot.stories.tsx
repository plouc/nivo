import { Meta } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { generateBoxPlotData } from '@nivo/generators'
// @ts-ignore
import { BoxPlot, ResponsiveBoxPlot } from '../src'
import { action } from '@storybook/addon-actions'

export default {
    component: BoxPlot,
    title: 'BoxPlot',
    decorators: [withKnobs],
} as Meta

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

const commonProps = {
    width: 640,
    height: 420,
    margin: { top: 40, right: 110, bottom: 60, left: 80 },
    data: generateBoxPlotData([
        { group: 'Alpha', subgroup: 'A', mu: 5, sd: 1, n: 20 },
        { group: 'Alpha', subgroup: 'B', mu: 6, sd: 1, n: 20 },
        { group: 'Beta', subgroup: 'A', mu: 8, sd: 1.4, n: 20 },
        { group: 'Beta', subgroup: 'B', mu: 7.5, sd: 1.4, n: 20 },
        { group: 'Gamma', subgroup: 'A', mu: 5, sd: 1, n: 20 },
        { group: 'Gamma', subgroup: 'B', mu: 8.2, sd: 1, n: 20 },
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

export const Default = () => {
    return (
        <div>
            <BoxPlot
                data={simpleProps.data}
                height={420}
                width={320}
                margin={{ top: 40, right: 110, bottom: 40, left: 80 }}
            />
            <p style={{ maxWidth: 640 }}>
                The BoxPlot component expects input as a list of raw data objects. The component
                computes summary statistics using quantiles, and then draws a chart based on the
                summary statistics.
            </p>
        </div>
    )
}

export const Vertical = () => <BoxPlot {...simpleProps} colorBy={'group'} />

export const Horizontal = () => (
    <BoxPlot
        {...simpleProps}
        layout="horizontal"
        colorBy={'group'}
        width={simpleProps.height}
        height={simpleProps.width}
        margin={{ top: 60, right: 20, bottom: 160, left: 80 }}
        enableGridY={true}
        enableGridX={true}
        legends={[
            {
                anchor: 'bottom',
                dataFrom: 'groups',
                direction: 'row',
                itemHeight: 20,
                itemWidth: 80,
                translateY: 70,
                translateX: 0,
            },
        ]}
    />
)

export const GroupedVertical = () => (
    <BoxPlot
        {...commonProps}
        animate={false}
        layout="vertical"
        legends={[
            {
                anchor: 'bottom-right',
                dataFrom: 'subGroups',
                direction: 'column',
                itemHeight: 20,
                itemWidth: 80,
                translateY: 0,
                translateX: 100,
            },
        ]}
    />
)

const subGroupNames = { A: 'cases', B: 'controls' }
export const GroupedHorizontal = () => (
    <BoxPlot
        {...commonProps}
        layout="horizontal"
        width={commonProps.width}
        height={commonProps.width * 0.6}
        margin={{ top: 60, right: 20, bottom: 160, left: 80 }}
        enableGridY={true}
        enableGridX={true}
        legendLabel={datum => subGroupNames[datum.subGroup]}
        legends={[
            {
                anchor: 'bottom',
                dataFrom: 'subGroups',
                direction: 'row',
                itemHeight: 20,
                itemWidth: 120,
                translateY: 80,
                translateX: 0,
            },
        ]}
    />
)

const customColors = { Alpha: '#dd4444', Beta: '#44aaaa', Gamma: '#4466dd' }
export const ColorsAndFills = () => (
    <BoxPlot
        {...simpleProps}
        colors={({ group }) => customColors[group]}
        layout={'vertical'}
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
)

export const AxisLabels = () => (
    <BoxPlot
        {...simpleProps}
        layout={'horizontal'}
        width={500}
        height={400}
        margin={{ top: 60, right: 20, bottom: 160, left: 100 }}
        colorBy={'group'}
        enableGridY={false}
        enableGridX={true}
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
)

export const LogScale = () => {
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
}

export const GroupsWithoutData = () => (
    <BoxPlot
        {...simpleProps}
        data={simpleProps.data.filter(datum => datum.group != 'Beta')}
        layout={'vertical'}
        colorBy={'group'}
    />
)

export const SubGroupsWithoutData = () => (
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
                dataFrom: 'subGroups',
                direction: 'column',
                itemHeight: 20,
                itemWidth: 80,
                translateY: 0,
                translateX: 100,
            },
        ]}
    />
)

export const CustomQuantiles = () => (
    <BoxPlot {...simpleProps} quantiles={[0, 0.25, 0.5, 0.75, 1.0]} layout={'vertical'} />
)

export const WhiskerEnds = () => <BoxPlot {...simpleProps} whiskerEndWidth={0.5} />

export const MarkersAndAnnotations = () => (
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
                size: 10,
            },
        ]}
    />
)

export const Themed = () => (
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
)

export const PreComputed = () => {
    const quantiles = [0.1, 0.25, 0.5, 0.75, 0.9]
    return (
        <div>
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
            <p style={{ maxWidth: 640 }}>
                This chart is drawn using pre-computed summary statistics. The pre-computed
                representation requires: minimum value, maximum value, values representing whiskers,
                values representing box bounds, median, mean, and the number of data points (n).
            </p>
        </div>
    )
}

export const MouseEvents = () => (
    <div>
        <BoxPlot
            {...commonProps}
            animate={false}
            layout="vertical"
            onClick={action('onClick')}
            onMouseEnter={action('onMouseEnter')}
            onMouseLeave={action('onMouseLeave')}
        />
        <p style={{ maxWidth: 640 }}>This chart handles mouse events - check 'Actions'.</p>
    </div>
)

const Wrapper = props => <div {...props} style={{ height: '480px', width: '320px' }} />
export const Responsive = () => {
    return (
        <div>
            <Wrapper>
                <ResponsiveBoxPlot
                    data={simpleProps.data}
                    margin={{ top: 40, right: 110, bottom: 40, left: 80 }}
                />
            </Wrapper>
            <p>This chart takes its size from its parent container.</p>
        </div>
    )
}
