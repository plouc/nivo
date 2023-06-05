import { createLinearScale } from '@bitbloom/nivo-scales'
import { useMemo } from 'react'
import { Datum, CommonBulletProps } from './types'

export const useEnhancedData = (
    data: Datum[],
    {
        layout,
        maxValue,
        minValue,
        reverse,
        height,
        width,
    }: Pick<CommonBulletProps, 'layout' | 'reverse' | 'height' | 'width'> &
        Record<'maxValue' | 'minValue', number | undefined>
) => {
    return useMemo(
        () =>
            data.map(d => {
                const all = [...d.ranges, ...d.measures, ...(d.markers ?? [])]
                const max = maxValue ?? Math.max(...all)
                const min = minValue ?? Math.min(...all)

                const scale = createLinearScale(
                    { clamp: true, min, max, type: 'linear' },
                    { all, max, min },
                    layout === 'horizontal' ? width : height,
                    layout === 'horizontal' ? (reverse ? 'y' : 'x') : reverse ? 'x' : 'y'
                )

                return {
                    ...d,
                    scale,
                }
            }),
        [data, height, layout, maxValue, minValue, reverse, width]
    )
}
