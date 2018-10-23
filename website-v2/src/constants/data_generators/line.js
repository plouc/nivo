import { generateSeries } from '@nivo/generators'

export const line = () => ({
    data: generateSeries(
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
            'others',
        ]
    ),
})
