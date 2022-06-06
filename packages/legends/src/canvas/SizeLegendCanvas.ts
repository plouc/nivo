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

    /**
    const allData = title ? [getLegendTitleDatum(title)].concat(data) : data

    const { width, height, itemCoordinates } = computeDimensions({
        itemWidth,
        itemHeight,
        itemsSpacing,
        direction,
        padding,
        data: allData,
    })
    const { x, y } = computePositionFromAnchor({
        anchor,
        translateX,
        translateY,
        containerWidth,
        containerHeight,
        width,
        height,
    })

    ctx.save()
    ctx.translate(x, y)
    allData.forEach((data, i) => {
        renderBoxLegendItemToCanvas(ctx, {
            data,
            x: itemCoordinates[i][0],
            y: itemCoordinates[i][1],
            width: itemWidth,
            height: itemHeight,
            direction: itemDirection,
            justify,
            textColor: itemTextColor,
            symbolSize,
            symbolSpacing,
            symbolShape: symbolShape as SymbolShapeCanvas,
            symbolBorderWidth,
            symbolBorderColor,
            theme,
        })
    })
    ctx.restore()
     **/
}
