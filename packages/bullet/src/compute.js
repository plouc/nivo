/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import last from 'lodash/last'

export const stackValues = (values, colorScale, useAverage = false) => {
    const normalized = [...values].filter(v => v !== 0).sort((a, b) => a - b)

    return normalized.reduce((acc, v1, index) => {
        const v0 = last(acc) !== undefined ? last(acc).v1 : 0
        let sequentialValue = useAverage === true ? v0 + (v1 - v0) / 2 : v1

        return [
            ...acc,
            {
                index,
                v0,
                v1,
                color: colorScale(colorScale.type === 'sequential' ? sequentialValue : index),
            },
        ]
    }, [])
}

export const getComputeRect = ({ layout, reverse, scale, height }) => {
    if (layout === 'horizontal') {
        if (reverse === true) {
            return d => {
                const x = scale(d.v1)
                const w = scale(d.v0) - x

                return { x, y: 0, width: w, height }
            }
        }

        return d => {
            const x = scale(d.v0)
            const w = scale(d.v1) - x

            return { x, y: 0, width: w, height }
        }
    }

    if (reverse === true) {
        return d => {
            const y = scale(d.v0)
            const h = scale(d.v1) - y

            return { x: 0, y, width: height, height: h }
        }
    }

    return d => {
        const y = scale(d.v1)
        const h = scale(d.v0) - y

        return { x: 0, y, width: height, height: h }
    }
}

export const computeRects = ({ data, layout, reverse, scale, height }) => {
    const computeRect = getComputeRect({
        layout,
        reverse,
        scale,
        height,
    })

    return data.map(d => ({
        data: d,
        ...computeRect(d),
    }))
}
