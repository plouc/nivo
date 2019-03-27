/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'

export const useQuantizeColorScaleLegendData = ({
    scale,
    domain: overriddenDomain,
    reverse = false,
    valueFormat = v => v,
    separator = ' - ',
}) => {
    return useMemo(() => {
        const domain = overriddenDomain || scale.range()

        const items = domain.map((domainValue, index) => {
            const [start, end] = scale.invertExtent(domainValue)

            return {
                id: domainValue,
                index,
                extent: [start, end],
                label: `${valueFormat(start)}${separator}${valueFormat(end)}`,
                value: scale(start),
                color: domainValue,
            }
        })
        if (reverse === true) items.reverse()

        return items
    }, [overriddenDomain, scale, reverse])
}
