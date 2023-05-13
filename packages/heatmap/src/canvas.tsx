import { setCanvasFont, drawCanvasText } from '@nivo/text'
import { CellCanvasRendererProps, HeatMapDatum } from './types'

export const renderRect = <Datum extends HeatMapDatum>(
    ctx: CanvasRenderingContext2D,
    {
        cell: { x, y, width, height, color, borderColor, opacity, labelTextColor, label },
        borderWidth,
        enableLabels,
        theme,
    }: CellCanvasRendererProps<Datum>
) => {
    ctx.save()
    ctx.globalAlpha = opacity

    ctx.fillStyle = color
    if (borderWidth > 0) {
        ctx.strokeStyle = borderColor
        ctx.lineWidth = borderWidth
    }

    ctx.fillRect(x - width / 2, y - height / 2, width, height)
    if (borderWidth > 0) {
        ctx.strokeRect(x - width / 2, y - height / 2, width, height)
    }

    if (enableLabels) {
        setCanvasFont(ctx, theme.labels.text)
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        drawCanvasText(
            ctx,
            {
                ...theme.labels.text,
                fill: labelTextColor,
            },
            label,
            x,
            y
        )
    }

    ctx.restore()
}

export const renderCircle = <Datum extends HeatMapDatum>(
    ctx: CanvasRenderingContext2D,
    {
        cell: { x, y, width, height, color, borderColor, opacity, labelTextColor, label },
        borderWidth,
        enableLabels,
        theme,
    }: CellCanvasRendererProps<Datum>
) => {
    ctx.save()
    ctx.globalAlpha = opacity

    const radius = Math.min(width, height) / 2

    ctx.fillStyle = color
    if (borderWidth > 0) {
        ctx.strokeStyle = borderColor
        ctx.lineWidth = borderWidth
    }

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)

    ctx.fill()
    if (borderWidth > 0) {
        ctx.stroke()
    }

    if (enableLabels) {
        setCanvasFont(ctx, theme.labels.text)
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        drawCanvasText(
            ctx,
            {
                ...theme.labels.text,
                fill: labelTextColor,
            },
            label,
            x,
            y
        )
    }

    ctx.restore()
}
