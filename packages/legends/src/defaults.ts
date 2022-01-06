import { ContinuousColorsLegendProps } from './types'

export const continuousColorsLegendDefaults: {
    length: NonNullable<ContinuousColorsLegendProps['length']>
    thickness: NonNullable<ContinuousColorsLegendProps['thickness']>
    direction: NonNullable<ContinuousColorsLegendProps['direction']>
    tickPosition: NonNullable<ContinuousColorsLegendProps['tickPosition']>
    tickSize: NonNullable<ContinuousColorsLegendProps['tickSize']>
    tickSpacing: NonNullable<ContinuousColorsLegendProps['tickSpacing']>
    tickOverlap: NonNullable<ContinuousColorsLegendProps['tickOverlap']>
    tickFormat: NonNullable<ContinuousColorsLegendProps['tickFormat']>
    titleAlign: NonNullable<ContinuousColorsLegendProps['titleAlign']>
    titleOffset: NonNullable<ContinuousColorsLegendProps['titleOffset']>
} = {
    length: 200,
    thickness: 16,
    direction: 'row',
    tickPosition: 'after',
    tickSize: 4,
    tickSpacing: 3,
    tickOverlap: false,
    tickFormat: (value: number) => `${value}`,
    titleAlign: 'start',
    titleOffset: 4,
}
