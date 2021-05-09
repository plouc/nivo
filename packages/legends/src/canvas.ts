import { computeDimensions, computePositionFromAnchor, computeItemLayout } from './compute'
import { LegendCanvasProps } from './types'

const textAlignMapping = {
    start: 'left',
    middle: 'center',
    end: 'right',
} as const

export const renderLegendToCanvas = (
    ctx: CanvasRenderingContext2D,
    {
        data,

        containerWidth,
        containerHeight,
        translateX = 0,
        translateY = 0,
        anchor,
        direction,
        padding: _padding = 0,
        justify = false,

        // items
        itemsSpacing = 0,
        itemWidth,
        itemHeight,
        itemDirection = 'left-to-right',
        itemTextColor,

        // symbol
        symbolSize = 16,
        symbolSpacing = 8,
        // @todo add support for shapes
        // symbolShape = LegendSvgItem.defaultProps.symbolShape,

        theme,
    }: LegendCanvasProps
) => {
    const { width, height, padding } = computeDimensions({
        itemCount: data.length,
        itemWidth,
        itemHeight,
        itemsSpacing,
        direction,
        padding: _padding,
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

    const xStep = direction === 'row' ? itemWidth + itemsSpacing : 0
    const yStep = direction === 'column' ? itemHeight + itemsSpacing : 0

    ctx.save()
    ctx.translate(x, y)

    ctx.font = `${theme.legends.text.fontSize}px ${theme.legends.text.fontFamily || 'sans-serif'}`

    data.forEach((d, i) => {
        const itemX = i * xStep + padding.left
        const itemY = i * yStep + padding.top

        const { symbolX, symbolY, labelX, labelY, labelAnchor, labelAlignment } = computeItemLayout(
            {
                direction: itemDirection,
                justify,
                symbolSize,
                symbolSpacing,
                width: itemWidth,
                height: itemHeight,
            }
        )

        ctx.fillStyle = d.color ?? 'black'
        ctx.fillRect(itemX + symbolX, itemY + symbolY, symbolSize, symbolSize)

        ctx.textAlign = textAlignMapping[labelAnchor]

        if (labelAlignment === 'central') {
            ctx.textBaseline = 'middle'
        }

        ctx.fillStyle = itemTextColor ?? theme.legends.text.fill ?? 'black'
        ctx.fillText(String(d.label), itemX + labelX, itemY + labelY)
    })

    ctx.restore()
}
