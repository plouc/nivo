/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import getMin from 'lodash/min'
import getMax from 'lodash/max'
import { scaleLinear } from 'd3-scale'

export const computeLinearScale = (id, data, { min, max, axis, range }) => {
    let domainMin = min
    if (domainMin === 'auto') {
        domainMin = getMin(data.map(serie => getMin(serie.map(d => d[axis]))))
    }

    let domainMax = max
    if (domainMax === 'auto') {
        domainMax = getMax(data.map(serie => getMax(serie.map(d => d[axis]))))
    }

    return scaleLinear()
        .domain([domainMin, domainMax])
        .range(range)
}

export const computeLinearScaleX = (id, data, props) =>
    computeLinearScale(id, data, {
        ...props,
        axis: 'x',
        range: [0, props.width],
    })

export const computeLinearScaleY = (id, data, props) =>
    computeLinearScale(id, data, {
        ...props,
        axis: 'y',
        range: [props.height, 0],
    })
