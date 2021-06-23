import { createLinearScale } from '@nivo/scales'
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

                const scale = createLinearScale(
                    { type: 'linear' },
                    { all, max, min },
                    layout === 'horizontal' ? width : height,
                    layout === 'horizontal' ? (reverse ? 'y' : 'x') : reverse ? 'x' : 'y'
                )

                return {
                    ...d,
                    scale,
                }
            }),
        [data, height, layout, reverse, width]
    )
}
