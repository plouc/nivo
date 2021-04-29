/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleBand } from 'd3-scale'

/**
 * Generates indexed scale.
 *
 * @param {Array.<Object>} data
 * @param {Function}       getIndex
 * @param {Array.<number>} range
 * @param {number}         padding
 * @Param {scalePropType}  indexScale
 * @returns {Function}
 */
export const getIndexScale = (data, getIndex, range, padding, indexScale) => {
    return scaleBand()
        .domain(data.map(getIndex))
        .range(range)
        .round(Boolean(indexScale.round))
        .padding(padding)
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
