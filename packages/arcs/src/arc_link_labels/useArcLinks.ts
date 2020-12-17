import { useMemo } from 'react'
import { radiansToDegrees } from '@nivo/core'
import { DatumWithArc } from '../types'
import { ArcLinkWithDatum } from './types'
import { computeArcLink } from './compute'

/**
 * Compute links for an array of data containing arcs.
 *
 * This is typically used to create labels for arcs,
 * and it's used for the `useArcLinkLabels` hook.
 */
export const useArcLinks = <
    Datum extends DatumWithArc,
    ExtraProps extends Record<string, any> = Record<string, any>
>({
    data,
    skipAngle = 0,
    offset = 0.5,
    diagonalLength,
    straightLength,
    computeExtraProps = () => ({} as ExtraProps),
}: {
    data: Datum[]
    // arcs with a length below this (end angle - start angle in degrees)
    // are going to be excluded, this can typically be used to avoid having
    // overlapping labels.
    skipAngle?: number
    // offset from arc outer radius in pixels
    offset?: number
    // length of the diagonal segment of the link
    diagonalLength: number
    // length of the straight segment of the link
    straightLength: number
    // this can be used to append extra properties to the links,
    // can be used to compute a color/label for example.
    computeExtraProps?: (datum: ArcLinkWithDatum<Datum>) => ExtraProps
}): (ArcLinkWithDatum<Datum> & ExtraProps)[] => {
    const links = useMemo(
        () =>
            data
                // filter out arcs with a length below `skipAngle`
                .filter(
                    datum =>
                        Math.abs(radiansToDegrees(datum.arc.endAngle - datum.arc.startAngle)) >=
                        skipAngle
                )
                // compute the link for each eligible arc
                .map(datum => ({
                    ...computeArcLink(datum.arc, offset, diagonalLength, straightLength),
                    data: datum,
                })),
        [data, skipAngle, offset, diagonalLength, straightLength]
    )

    // splitting memoization of links and extra props can be more efficient,
    // this way if only `computeExtraProps` changes, we skip links computation.
    return useMemo(
        () =>
            links.map(link => ({
                ...computeExtraProps(link),
                ...link,
            })),
        [links, computeExtraProps]
    )
}
