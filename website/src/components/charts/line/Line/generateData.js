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
    const gaps = {
        A: [[50, 80]],
        C: [[130, 160]],
    }

    return keys.map(key => ({
        id: `item ${key}`,
        data: generatePointsSerie({
            x0: 0,
            x1: 200,
            xStep: 10,
            y0: Math.random() * 80,
            y1: Math.random() * 80,
            yRand: 3,
            easing: 'random',
            xGaps: gaps[key] || [],
        }).map(d => ({
            ...d,
            y: d.y < 0 ? 0 : d.y,
        })),
    }))
}
