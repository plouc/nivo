import { ScaleBandSpec, ScaleBand, computeScale } from '@nivo/scales'

/**
 * Generates indexed scale.
 */
export const getIndexScale = (
    groups: string[],
    padding: number,
    indexScale: ScaleBandSpec,
    size: number,
    axis: 'x' | 'y'
) => {
    return (
        computeScale(indexScale, { all: groups, min: 0, max: 0 }, size, axis) as ScaleBand<string>
    ).padding(padding)
}
