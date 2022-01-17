import {
    ResponsiveParallelCoordinates,
    ResponsiveParallelCoordinatesCanvas,
} from '@nivo/parallel-coordinates'
import { generateParallelCoordinatesData } from '@nivo/generators'
import { useChart } from '../hooks'

const props = {
    margin: { top: 50, right: 60, bottom: 50, left: 60 },
    theme: {
        axis: {
            ticks: {
                line: { stroke: '#889eae', strokeWidth: 2, strokeLinecap: 'square' },
            },
            domain: {
                line: { stroke: '#889eae', strokeWidth: 2, strokeLinecap: 'square' },
            },
        },
    },
    variables: [
        {
            key: 'temp',
            type: 'linear',
            min: 'auto',
            max: 'auto',
            ticksPosition: 'before',
            legend: 'temperature',
            legendPosition: 'start',
            legendOffset: 20,
        },
        {
            key: 'cost',
            type: 'linear',
            min: 0,
            max: 'auto',
            ticksPosition: 'before',
            legend: 'cost',
            legendPosition: 'start',
            legendOffset: 20,
        },
        {
            key: 'color',
            type: 'point',
            padding: 1,
            values: ['red', 'yellow', 'green'],
            legend: 'color',
            legendPosition: 'start',
            legendOffset: -20,
        },
        {
            key: 'target',
            type: 'point',
            padding: 0,
            values: ['A', 'B', 'C', 'D', 'E'],
            legend: 'target',
            legendPosition: 'start',
            legendOffset: -20,
        },
        {
            key: 'volume',
            type: 'linear',
            min: 0,
            max: 'auto',
            legend: 'volume',
            legendPosition: 'start',
            legendOffset: -20,
        },
    ],
}

export function ParallelCoordinates() {
    const [data, flavor] = useChart(() => generateParallelCoordinatesData({ size: 32 }))

    if (flavor === 'canvas') {
        return <ResponsiveParallelCoordinatesCanvas data={data} {...props} />
    }

    return <ResponsiveParallelCoordinates data={data} {...props} />
}
