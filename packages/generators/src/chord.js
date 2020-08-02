/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import range from 'lodash/range'
import random from 'lodash/random'
import { names } from './sets'

export const generateChordData = ({
    keys = names,
    size = 7,
    minValue = 0,
    maxValue = 2000,
} = {}) => {
    const maxSize = Math.min(keys.length, size)
    const selectedKeys = keys.slice(0, maxSize)

    const matrix = range(maxSize).map(() =>
        range(maxSize).map(() => {
            if (Math.random() < 0.66) return random(minValue, maxValue / 4)
            return random(minValue, maxValue)
        })
    )

    return { matrix, keys: selectedKeys }
}
