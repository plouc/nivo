import { generateXYSeries } from '@nivo/generators'

export const sampleData = generateXYSeries({
    serieIds: ['Japan', 'France', 'US', 'Germany', 'Norway', 'Iceland', 'UK', 'Vietnam'],
    x: {
        values: ['Train', 'Subway', 'Bus', 'Car', 'Boat', 'Moto', 'Moped', 'Bicycle', 'Others'],
    },
    y: {
        length: NaN,
        min: -100_000,
        max: 100_000,
        round: true,
    },
})
