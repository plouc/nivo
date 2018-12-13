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

const ids = ['serie A', 'serie B', 'serie C', 'serie D', 'serie E', 'serie F', 'serie G']

const generateDataSet = size => {
    return range(size).map(() => {
        return {
            value: random(0, 500),
        }
    })
}

export const generateLightDataSet = () => {
    return ids.slice(0, 3).map(id => ({
        id,
        data: generateDataSet(100),
    }))
}

export const generateHeavyDataSet = () => {
    return ids.map(id => ({
        id,
        data: generateDataSet(260),
    }))
}
