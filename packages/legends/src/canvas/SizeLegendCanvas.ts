import { ThemeProps, SizeLegendProps } from '../types'
import { renderBoxLegendToCanvas } from './BoxLegendCanvas'

// TO DO - implement an interface that takes a scale
export const renderSizeLegendToCanvas = (
    ctx: CanvasRenderingContext2D,
    {
        containerWidth,
        containerHeight,
        anchor,
        translateX = 0,
        translateY = 0,

        data,
        title,
        direction,
        padding = 0,
        justify = false,

        // items
        itemsSpacing = 0,
        itemWidth,
        itemHeight,
        itemDirection = 'left-to-right',
        itemTextColor,

        // symbol
        symbolShape = 'circle',
        symbolSize = 16,
        symbolSpacing = 8,
        symbolBorderColor,
        symbolBorderWidth,

        theme,
    }: SizeLegendProps & ThemeProps
) => {
    renderBoxLegendToCanvas(ctx, {
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

        // items
        itemsSpacing,
        itemWidth,
        itemHeight,
        itemDirection,
        itemTextColor,

        // symbol
        symbolShape,
        symbolSize,
        symbolSpacing,
        symbolBorderColor,
        symbolBorderWidth,

        theme,
    })
}
