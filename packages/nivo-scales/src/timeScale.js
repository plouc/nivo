/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import uniq from 'lodash/uniq'
import { scaleTime } from 'd3-scale'

/**
 * Add auto date conversion to d3 `timeScale`,
 * it helps to be able to pas raw data without having
 * to deal with Date objects and pre-process the data.
 *
 * @param {Object} scale
 *
 * @return {Object}
 */
const enhanceScale = scale => {
    const enhancedScale = function(dateStr) {
        return scale(new Date(dateStr))
    }

    // @todo: fix copy()
    Object.keys(scale).forEach(key => {
        enhancedScale[key] = scale[key].bind(scale)
    })

    return enhancedScale
}

/**
 * Compute a time scale from config and data set.
 *
 * @param {Array.<Array>}  data
 * @param {'auto'|string}  min
 * @param {'auto'|string}  max
 * @param {string|number}  property
 * @param {Array.<number>} range
 *
 * @return {Object}
 */
export const computeTimeScale = ({ data, min = 'auto', max = 'auto', property, range }) => {
    let domainMin = min !== 'auto' ? new Date(min) : min
    let domainMax = max !== 'auto' ? new Date(max) : max

    if (min === 'auto' || max === 'auto') {
        const allDates = uniq(
            data.reduce((agg, serie) => [...agg, ...serie.map(d => d[property])], [])
        )
            .map(dateStr => new Date(dateStr))
            .sort((a, b) => b - a)
            .reverse()

        if (min === 'auto') domainMin = allDates[0]
        if (max === 'auto') domainMax = allDates[allDates.length - 1]
    }

    const scale = scaleTime()
        .domain([domainMin, domainMax])
        .range(range)

    return enhanceScale(scale)
}
