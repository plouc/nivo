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
    }: Pick<CommonBulletProps, 'layout' | 'reverse' | 'height' | 'width'>
) => {
    return useMemo(
        () =>
            data.map(d => {
                const all = [...d.ranges, ...d.measures, ...(d.markers ?? [])]

                const max = Math.max(...all)

                const min = Math.min(...all, 0)

                const scale = scaleLinear().domain([min, max])

                if (layout === 'horizontal') {
                    scale.range(reverse === true ? [width, 0] : [0, width])
                } else {
                    scale.range(reverse === true ? [0, height] : [height, 0])
                }

                return {
                    ...d,
                    scale,
                }
            }),
        [data, height, layout, reverse, width]
    )
}
