import { scaleLinear } from 'd3-scale'
import { useMemo } from 'react'
import { Datum, CommonBulletProps } from './types'

export const useEnhancedData = (
    data: Datum[],
    {
        layout,
        reverse,
        height,
        width,
		minValue,
    }: Pick<CommonBulletProps, 'layout' | 'reverse' | 'height' | 'width'>
) => {
    return useMemo(
        () =>
            data.map(d => {
                const all = [...d.ranges, ...d.measures, ...(d.markers ?? [])]

                const max = Math.max(...all)

                const min = Math.min(...all, minValue)

                const scale = scaleLinear().domain([min, max])

                if (layout === 'horizontal') {
                    scale.range(reverse === true ? [width, minValue] : [minValue, width])
                } else {
                    scale.range(reverse === true ? [minValue, height] : [height, minValue])
                }

                return {
                    ...d,
                    scale,
                }
            }),
        [data, height, layout, reverse, width]
    )
}
