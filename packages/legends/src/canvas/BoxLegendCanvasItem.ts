import { computeItemLayout } from '../compute'
import { BoxLegendItemProps, LegendDatum, SymbolShapeCanvas, ThemeProps } from '../types'
import {
    renderSymbolCircleToCanvas,
    renderSymbolDiamondToCanvas,
    renderSymbolTriangleToCanvas,
    renderSymbolInvertedTriangleToCanvas,
    renderSymbolSquareToCanvas,
} from './symbols'
import { getInheritedColorGenerator } from '@nivo/colors'

const textAlignMapping = {
    start: 'left',
    middle: 'center',
    end: 'right',
} as const

const symbolByShape = {
    circle: renderSymbolCircleToCanvas,
    diamond: renderSymbolDiamondToCanvas,
    square: renderSymbolSquareToCanvas,
    triangle: renderSymbolTriangleToCanvas,
    invertedTriangle: renderSymbolInvertedTriangleToCanvas,
}

type BoxLegendCanvasItemProps = Omit<
    BoxLegendItemProps,
    | 'background'
    | 'opacity'
    | 'onClick'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'toggleSerie'
    | 'effects'
> & {
    symbolShape: SymbolShapeCanvas
}

export const renderBoxLegendItemToCanvas = (
    ctx: CanvasRenderingContext2D,
    {
        x,
        y,
        width,
        height,
        data,
        direction = 'left-to-right',
        justify = false,
        textColor,

        // symbol
        symbolShape = 'square',
        symbolSize = 16,
        symbolSpacing = 8,
        symbolBorderWidth,
        symbolBorderColor = 'transparent',

        theme,
    }: BoxLegendCanvasItemProps & ThemeProps
) => {
    const itemSize = symbolSize

    const { symbolX, symbolY, labelX, labelY, labelAnchor, labelAlignment } = computeItemLayout({
        direction,
        justify,
        symbolSize: itemSize,
        symbolSpacing,
        width,
        height,
    })

    const getBorderColor = getInheritedColorGenerator<LegendDatum>(symbolBorderColor, theme)
    const symbol = (data.symbol as SymbolShapeCanvas) ?? symbolShape
    const symbolFunction = typeof symbol === 'function' ? symbol : symbolByShape[symbol]

    ctx.save()
    if (data.symbol !== null) {
        symbolFunction(ctx, {
            id: data.id,
            x: x + symbolX + itemSize / 2,
            y: y + symbolY + itemSize / 2,
            size: itemSize,
            fill: data.color ?? data.fill ?? '#000000',
            borderWidth: symbolBorderWidth,
            borderColor: getBorderColor(data),
        })
    }

    ctx.font = `${theme.legends.text.fontSize}px ${theme.legends.text.fontFamily || 'sans-serif'}`
    ctx.textAlign = textAlignMapping[labelAnchor]
    if (labelAlignment === 'central') {
        ctx.textBaseline = 'middle'
    }
    ctx.fillStyle = textColor ?? theme.legends.text.fill ?? 'black'
    ctx.fillText(String(data.label), x + (data.symbol === null ? symbolX : labelX), y + labelY)
    ctx.restore()
}
