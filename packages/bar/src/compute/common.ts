import { ScaleBandSpec, ScaleBand, computeScale } from '@nivo/scales'

/**
 * Generates indexed scale.
 */
export const getIndexScale = <RawDatum>(
    data: RawDatum[],
    getIndex: (datum: RawDatum) => string,
    padding: number,
    indexScale: ScaleBandSpec,
    size: number,
    axis: 'x' | 'y'
) => {
    return (computeScale(
        indexScale,
        { all: data.map(getIndex), min: 0, max: 0 },
        size,
        axis
    ) as ScaleBand<string>).padding(padding)
}

/**
 * This method ensures all the provided keys exist in the entire series.
 */
export const normalizeData = <RawDatum>(data: RawDatum[], keys: string[]) =>
    data.map(
        item =>
            ({
                ...keys.reduce<Record<string, unknown>>((acc, key) => {
                    acc[key] = null
                    return acc
                }, {}),
                ...item,
            } as RawDatum)
    )

export const filterNullValues = <RawDatum extends Record<string, unknown>>(data: RawDatum) =>
    Object.keys(data).reduce<Record<string, unknown>>((acc, key) => {
        if (data[key]) {
            acc[key] = data[key]
        }
        return acc
    }, {}) as Exclude<RawDatum, null | undefined | false | '' | 0>
