/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { generatePointsSerie } from '@nivo/generators'

export default () => {
    const keys = ['A', 'B', 'C', 'D', 'E']

    return keys.map((key, i) => {
        return {
            id: key,
            data: generatePointsSerie({
                x1: 100,
                xStep: 10,
                y0: Math.random() * 80,
                y1: Math.random() * 80,
                yRand: 3,
                easing: 'random',
            }),
        }
    })
}
