import { ResponsiveScatterPlot, ResponsiveScatterPlotCanvas } from '@nivo/scatterplot'
import { random, range } from '../utils'
import { useChart } from '../hooks'

const suffix = (suffix: 'cm' | 'kg') => (value: unknown) => `${value} ${suffix}`
const cm = suffix('cm')
const kg = suffix('kg')

const props = {
    axisBottom: {
        format: kg,
        legend: 'weight',
        legendOffset: 55,
        legendPosition: 'middle' as 'middle',
        tickPadding: 5,
        tickSize: 5,
    },
    axisLeft: {
        format: cm,
        legend: 'size',
        legendOffset: -55,
        legendPosition: 'middle' as 'middle',
        tickPadding: 5,
        tickSize: 5,
    },
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 130,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            itemDirection: 'left-to-right',
            symbolSize: 12,
            symbolShape: 'circle',
        } as const,
    ],
    margin: { top: 60, right: 140, bottom: 70, left: 60 },
    xFormat: kg,
    yFormat: cm,
}

const generateData = () =>
    ['group A', 'group B', 'group C', 'group D', 'group E'].map(id => ({
        id,
        data: range(0, 50).map(() => ({
            x: random(0, 100),
            y: random(0, 120),
        })),
    }))

export function ScatterPlot() {
    const [data, flavor] = useChart(generateData)

    if (flavor === 'canvas') {
        return <ResponsiveScatterPlotCanvas data={data} {...props} />
    }

    return <ResponsiveScatterPlot data={data} {...props} />
}
