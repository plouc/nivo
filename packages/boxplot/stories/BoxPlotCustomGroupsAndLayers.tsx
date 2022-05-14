import { BoxPlot, BoxPlotCustomLayerProps } from '../src'

const q5 = [0.1, 0.25, 0.5, 0.75, 0.9]

const addUniformNoise = (values, scale) => values.map(v => v + (Math.random() - 0.5) * scale)

// prepare a dataset summary with many groups, some of which meant to be colored the same
const dataCustomGroups = [
    {
        group: 'Control',
        values: [1.2, 1.4, 1.8, 2.4, 3.1],
        extrema: [0.5, 5],
    },
    {
        group: 'Alpha 1',
        values: [3, 3.5, 4, 4.5, 5.0],
        extrema: [2, 6],
    },
    {
        group: 'Alpha 2',
        values: [2.8, 3.3, 3.8, 4.3, 5.5],
        extrema: [2, 6.6],
    },
    {
        group: 'Alpha 3',
        values: [2.4, 3.2, 3.7, 4.5, 5.5],
        extrema: [2, 6],
    },
    {
        group: 'Beta 1',
        values: [1.3, 2.3, 2.8, 3.2, 4.0],
        extrema: [1, 5],
    },
    {
        group: 'Beta 2',
        values: [1.4, 2.4, 2.9, 3.6, 4.2],
        extrema: [1, 5],
    },
].map(x => {
    x.values = addUniformNoise(x.values, 0.7).sort((a, b) => a - b)
    x.values[2] = (x.values[1] + x.values[3]) / 2
    x.mean = x.values[2]
    x.extrema = addUniformNoise(x.extrema, 0.5)
    x.n = 10
    x.subGroup = ''
    x.quantiles = q5
    return x
})

const customGroupColor = d => {
    if (d.group === 'Control') return '#e8c1a0'
    if (d.group.startsWith('Alpha')) return '#f47560'
    if (d.group.startsWith('Beta')) return '#f1e15b'
    return '#222222'
}

const customGroupLabel = d => {
    if (d.group.startsWith('Alpha')) return 'Group Alpha'
    if (d.group.startsWith('Beta')) return 'Group Beta'
    return 'Control'
}

const BackgroundLayer = ({ xScale, innerHeight, padding }: BoxPlotCustomLayerProps<unknown>) => {
    const xUnitWidth = xScale('Alpha 2') - xScale('Alpha 1')
    const gap = (xUnitWidth * padding) / 2
    return (
        <>
            <rect
                x={xScale('Alpha 1') - gap}
                y={0}
                width={xScale('Beta 1') - xScale('Alpha 1')}
                height={innerHeight}
                fill="#f6f6f6"
            />
        </>
    )
}

export const BoxPlotCustomGroupsAndLayers = () => {
    return (
        <BoxPlot
            width={400}
            height={420}
            margin={{ top: 40, right: 110, bottom: 60, left: 80 }}
            padding={0.2}
            data={dataCustomGroups}
            groups={['Control', 'Alpha 1', 'Alpha 2', 'Alpha 3', 'Beta 1', 'Beta 2']}
            layers={[BackgroundLayer, 'grid', 'axes', 'boxPlots', 'annotations', 'legends']}
            colors={customGroupColor}
            legendLabel={customGroupLabel}
            subGroups={[]}
            minValue={0}
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
            axisBottom={{
                tickSize: 5,
                tickPadding: 10,
                tickRotation: 40,
            }}
        />
    )
}
