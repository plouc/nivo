import { useMemo } from 'react'
import { radiansToDegrees, positionFromAngle, degreesToRadians } from '@nivo/core'
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

export const svgEllipticalArcCommand = (
    radius: number,
    largeArcFlag: 0 | 1,
    sweepFlag: 0 | 1,
    x: number,
    y: number
) =>
    [
        'A',
        radius,
        radius,
        0, // x-axis-rotation
        largeArcFlag,
        sweepFlag,
        x,
        y,
    ].join(' ')

export const generateSvgArc = (
    radius: number,
    originalStartAngle: number,
    originalEndAngle: number
): string => {
    const startAngle = Math.min(originalStartAngle, originalEndAngle)
    const endAngle = Math.max(originalStartAngle, originalEndAngle)

    const start = positionFromAngle(degreesToRadians(endAngle), radius)
    const end = positionFromAngle(degreesToRadians(startAngle), radius)

    // we have a full circle, we cannot use a single elliptical arc
    // to draw it, so we use 2 in that case.
    if (endAngle - startAngle >= 360) {
        const mid = positionFromAngle(degreesToRadians(startAngle + 180), radius)

        return [
            `M ${start.x} ${start.y}`,
            svgEllipticalArcCommand(radius, 1, 1, mid.x, mid.y),
            `M ${start.x} ${start.y}`,
            svgEllipticalArcCommand(radius, 1, 0, mid.x, mid.y),
        ].join(' ')
    }

    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1

    return [
        `M ${start.x} ${start.y}`,
        svgEllipticalArcCommand(radius, largeArcFlag, 0, end.x, end.y),
    ].join(' ')
}
