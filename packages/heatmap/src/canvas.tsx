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
        ctx.fillStyle = labelTextColor
        ctx.font = `${theme.labels.text.fontWeight ? `${theme.labels.text.fontWeight} ` : ''}${
            theme.labels.text.fontSize
        }px ${theme.labels.text.fontFamily}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(label, x, y)
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
        ctx.fillStyle = labelTextColor
        ctx.font = `${theme.labels.text.fontWeight ? `${theme.labels.text.fontWeight} ` : ''}${
            theme.labels.text.fontSize
        }px ${theme.labels.text.fontFamily}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(label, x, y)
    }

    ctx.restore()
}
