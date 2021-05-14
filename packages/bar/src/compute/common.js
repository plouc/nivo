/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { computeScale } from '@nivo/scales'

/**
 * Generates indexed scale.
 *
 * @param {Array.<Object>} data
 * @param {Function}       getIndex
 * @param {number}         padding
 * @Param {scalePropType}  indexScale
 * @Param {number}         size
 * @Param {'x' | 'y'}      axis
 * @returns {Function}
 */
export const getIndexScale = (data, getIndex, padding, indexScale, size, axis) => {
    return computeScale(
        indexScale,
        { all: data.map(getIndex), min: 0, max: 0 },
        size,
        axis
    ).padding(padding)
}

export const normalizeData = (data, keys) =>
    data.map(item => ({
        ...keys.reduce((acc, key) => {
            acc[key] = null
            return acc
        }, {}),
        ...item,
    }))

export const filterNullValues = data =>
    Object.keys(data).reduce((acc, key) => {
        if (data[key]) {
            acc[key] = data[key]
        }
        return acc
    }, {})
