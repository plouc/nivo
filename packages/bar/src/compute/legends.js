/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { uniqBy } from 'lodash'

export const getLegendDataForKeys = (bars, layout, direction, groupMode, reverse) => {
    const data = uniqBy(
        bars.map(bar => ({
            id: bar.data.id,
            label: bar.data.id,
            color: bar.color,
            fill: bar.data.fill,
        })),
        ({ id }) => id
    )

    if (
        (layout === 'vertical' &&
            groupMode === 'stacked' &&
            direction === 'column' &&
            reverse !== true) ||
        (layout === 'horizontal' && groupMode === 'stacked' && reverse === true)
    ) {
        data.reverse()
    }

    return data
}

export const getLegendDataForIndexes = bars => {
    return uniqBy(
        bars.map(bar => ({
            id: bar.data.indexValue,
            label: bar.data.indexValue,
            color: bar.color,
            fill: bar.data.fill,
        })),
        ({ id }) => id
    )
}

export const getLegendData = ({ from, bars, layout, direction, groupMode, reverse }) => {
    if (from === 'indexes') {
        return getLegendDataForIndexes(bars)
    }

    return getLegendDataForKeys(bars, layout, direction, groupMode, reverse)
}
