/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import get from 'lodash/get'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isPlainObject from 'lodash/isPlainObject'
import { scaleLinear } from 'd3-scale'

export const getNodeSizeGenerator = size => {
    if (typeof size === 'function') return size
    if (isNumber(size)) return () => size
    if (isPlainObject(size)) {
        if (!isString(size.key)) {
            throw new Error(
                'symbolSize is invalid, key should be a string pointing to the property to use to determine node size'
            )
        }
        if (!Array.isArray(size.values) || size.values.length !== 2) {
            throw new Error(
                'symbolSize is invalid, values spec should be an array containing two values, min and max'
            )
        }
        if (!Array.isArray(size.sizes) || size.sizes.length !== 2) {
            throw new Error(
                'symbolSize is invalid, sizes spec should be an array containing two values, min and max'
            )
        }

        const sizeScale = scaleLinear()
            .domain([size.values[0], size.values[1]])
            .range([size.sizes[0], size.sizes[1]])

        return d => sizeScale(get(d, size.key))
    }

    throw new Error('symbolSize is invalid, it should be either a function, a number or an object')
}

export const computePoints = ({ series, formatX, formatY }) => {
    return series.reduce(
        (agg, serie) => [
            ...agg,
            ...serie.data.map((d, i) => ({
                index: agg.length + i,
                id: `${serie.id}.${i}`,
                x: d.position.x,
                y: d.position.y,
                data: {
                    ...d.data,
                    id: `${serie.id}.${i}`,
                    serieId: serie.id,
                    formattedX: formatX(d.data.x),
                    formattedY: formatY(d.data.y),
                },
            })),
        ],
        []
    )
}

export const computeLegendData = ({ series }) => {
    return series.map(serie => ({
        id: serie.id,
        label: serie.id,
        //color: getColor({ serie }),
    }))
}
