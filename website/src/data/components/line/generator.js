/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import range from 'lodash/range'
import { generateSeries } from '@nivo/generators'

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
        ]
    )
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
        range(121)
    )
}
