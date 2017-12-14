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
    const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
    const gaps = {
        C: [[50, 80]],
        H: [[110, 140]],
        L: [[130, 160]],
    }

    return keys.map((key, i) => ({
        id: `item ${key}`,
        data: generatePointsSerie({
            x1: 200,
            xStep: 1,
            y0: Math.random() * 80,
            y1: Math.random() * 80,
            yRand: Math.random() * 2,
            easing: 'random',
            xGaps: gaps[key] || [],
        }),
    }))
}
