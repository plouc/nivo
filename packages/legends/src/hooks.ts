import { useMemo } from 'react'

type Scale = {
    (value: number): number
    invertExtent: (value: number) => [number, number]
    range: () => number[]
}

export const useQuantizeColorScaleLegendData = ({
    scale,
    domain: overriddenDomain,
    reverse = false,
    valueFormat = v => v,
    separator = ' - ',
}: {
    scale: Scale
    domain?: number[]
    reverse?: boolean
    valueFormat?: <T, U>(value: T) => T | U
    separator?: string
}) => {
    return useMemo(() => {
        const domain = overriddenDomain ?? scale.range()

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
