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
    valueFormat = (v: any) => v,
    separator = ' - ',
}: {
    scale: any
    domain?: Array<string | number>
    reverse?: boolean
    valueFormat?: any
    separator?: string
}) => {
    return useMemo(() => {
        const domain = overriddenDomain || (scale.range() as Array<string | number>)

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
        if (reverse === true) {
            items.reverse()
        }

        return items
    }, [overriddenDomain, scale, reverse])
}
