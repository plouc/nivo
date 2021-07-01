import { ScaleLinear, scaleLinear } from 'd3-scale'
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

                const scale = scaleLinear().domain([min, max]) as ScaleLinear<
                    number,
                    number,
                    never
                > & { type: 'linear' }

                if (layout === 'horizontal') {
                    scale.range(reverse === true ? [width, 0] : [0, width])
                } else {
                    scale.range(reverse === true ? [0, height] : [height, 0])
                }

                // Add our type property
                ;(scale as any).type = 'linear'

                return {
                    ...d,
                    scale,
                }
            }),
        [data, height, layout, reverse, width]
    )
}
