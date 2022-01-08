import { generateXYSeries, sets } from '@nivo/generators'
import { Data } from './types'

export const getLightData = () =>
    generateXYSeries({
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
    }) as Data

export const getHeavyData = () =>
    generateXYSeries({
        serieIds: sets.countryCodes.slice(0, 26),
        x: {
            values: sets.names,
        },
        y: {
            length: NaN,
            min: -100_000,
            max: 100_000,
            round: true,
        },
    }) as Data
