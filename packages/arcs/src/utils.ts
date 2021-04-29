import { useMemo } from 'react'
import { radiansToDegrees } from '@nivo/core'
import { DatumWithArc } from './types'

/**
 * Make sure an angle (expressed in radians)
 * always falls in the range 0~2*PI.
 */
export const getNormalizedAngle = (angle: number) => {
    let normalizedAngle = angle % (Math.PI * 2)
    if (normalizedAngle < 0) {
        normalizedAngle += Math.PI * 2
    }

    return normalizedAngle
}

/**
 * Filter out arcs with a length below `skipAngle`.
 */
export const filterDataBySkipAngle = <Datum extends DatumWithArc>(
    data: Datum[],
    skipAngle: number
) =>
    data.filter(
        datum => Math.abs(radiansToDegrees(datum.arc.endAngle - datum.arc.startAngle)) >= skipAngle
    )

/**
 * Memoized version of `filterDataBySkipAngle`.
 */
export const useFilteredDataBySkipAngle = <Datum extends DatumWithArc>(
    data: Datum[],
    skipAngle: number
) => useMemo(() => filterDataBySkipAngle(data, skipAngle), [data, skipAngle])
