import range from 'lodash/range.js'
import { generateSeries } from '@nivo/generators'

export interface LineSampleSeries {
    id: string
    data: Array<{ x: string | number; y: number }>
}

export const generateLightDataSet = () => {
    return generateSeries(
        ['japan', 'france', 'us', 'germany', 'norway'],
        [
            'plane',
            'helicopter',
            'boat',
            'train',
            'subway',
            'bus',
            'car',
            'moto',
            'bicycle',
            'horse',
            'skateboard',
            'others',
        ],
        { withColors: false }
    ) as Array<{
        id: string
        data: Array<{ x: string; y: number }>
    }>
}

export const generateHeavyDataSet = () => {
    return generateSeries(
        [
            'japan',
            'brazil',
            'france',
            'us',
            'germany',
            'norway',
            'china',
            'algeria',
            'mexico',
            'finland',
            'australia',
        ],
        range(121),
        { withColors: false }
    ) as Array<{
        id: string
        data: Array<{ x: number; y: number }>
    }>
}
