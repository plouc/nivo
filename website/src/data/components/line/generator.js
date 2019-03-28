/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { generateSeries } from '@nivo/generators'

export const generateData = () =>
    generateSeries(
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
    )
