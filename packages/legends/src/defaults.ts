import { BoxLegendSvgProps, ContinuousColorsLegendProps } from './types'

export const legendDefaults: {
    translateX: NonNullable<BoxLegendSvgProps['translateX']>
    translateY: NonNullable<BoxLegendSvgProps['translateY']>
    padding: NonNullable<BoxLegendSvgProps['padding']>
    itemsSpacing: NonNullable<BoxLegendSvgProps['itemsSpacing']>
    itemDirection: NonNullable<BoxLegendSvgProps['itemDirection']>
    justify: NonNullable<BoxLegendSvgProps['justify']>
    symbolShape: NonNullable<BoxLegendSvgProps['symbolShape']>
    symbolSize: NonNullable<BoxLegendSvgProps['symbolSize']>
    symbolSpacing: NonNullable<BoxLegendSvgProps['symbolSpacing']>
} = {
    translateX: 0,
    translateY: 0,
    padding: 0,
    itemsSpacing: 0,
    itemDirection: 'left-to-right',
    justify: false,
    symbolShape: 'square',
    symbolSize: 16,
    symbolSpacing: 8,
}

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
