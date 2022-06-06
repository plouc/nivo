import { SizeLegendProps } from '../types'
import { BoxLegendSvg } from './BoxLegendSvg'

// TO DO - implement an interface that takes a scale
export const SizeLegendSvg = ({
    containerWidth,
    containerHeight,
    anchor,
    translateX = 0,
    translateY = 0,

    data,
    title,
    direction,
    padding = 0,
    justify,

    itemsSpacing = 0,
    itemWidth,
    itemHeight,
    itemDirection,
    itemTextColor,
    itemBackground,
    itemOpacity,

    symbolShape = 'circle',
    symbolSize = 10, // here used to allocate space, actual symbol size will be variable
    symbolSpacing,
    symbolBorderWidth,
    symbolBorderColor,
}: SizeLegendProps) => {
    return BoxLegendSvg({
        containerWidth,
        containerHeight,
        anchor,
        translateX,
        translateY,

        data,
        title,
        direction,
        padding,
        justify,

        itemsSpacing,
        itemWidth,
        itemHeight,
        itemDirection,
        itemTextColor,
        itemBackground,
        itemOpacity,

        symbolShape,
        symbolSize,
        symbolSpacing,
        symbolBorderWidth,
        symbolBorderColor,

        toggleSerie: undefined,
    })
}
