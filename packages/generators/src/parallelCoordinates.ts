/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { random, range, shuffle } from 'lodash'

export const generateParallelCoordinatesData = ({
    size = 26,
    keys = [
        { key: 'temp', random: [-10, 40] as [number, number] },
        { key: 'cost', random: [200, 400000] as [number, number] },
        { key: 'color', shuffle: ['red', 'yellow', 'green'] },
        { key: 'target', shuffle: ['A', 'B', 'C', 'D', 'E'] },
        { key: 'volume', random: [0.2, 7.6] as [number, number] },
    ],
} = {}): Record<string, any> => {
    const datumGenerator = () =>
        keys.reduce((acc, key) => {
            let value
            if (key.random !== undefined) {
                value = random(...key.random)
            } else if (key.shuffle !== undefined) {
                value = shuffle(key.shuffle)[0]
            }

            return { ...acc, [key.key]: value }
        }, {})

    return range(size).map(datumGenerator)
}
