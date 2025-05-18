import { roundedRect } from '@nivo/canvas'
import { drawCanvasText } from '@nivo/text'
import { BarDatum, RenderBarProps } from './types'

export const renderBar = <D extends BarDatum>(
    ctx: CanvasRenderingContext2D,
    {
        bar: { color, height, width, x, y },
        borderColor,
        borderRadius,
        borderWidth,
        label,
        shouldRenderLabel,
        labelStyle,
        labelX,
        labelY,
        textAnchor,
    }: RenderBarProps<D>
) => {
    ctx.fillStyle = color
    if (borderWidth > 0) {
        ctx.strokeStyle = borderColor
        ctx.lineWidth = borderWidth
    }

    ctx.beginPath()
    roundedRect(ctx, x, y, width, height, Math.min(borderRadius, height))
    ctx.fill()

    if (borderWidth > 0) {
        ctx.stroke()
    }

    if (shouldRenderLabel) {
        ctx.textBaseline = 'middle'
        ctx.textAlign = textAnchor === 'middle' ? 'center' : textAnchor
        drawCanvasText(ctx, labelStyle, label, x + labelX, y + labelY)
    }
}
