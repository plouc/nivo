import { SymbolProps } from '../../types'

export const renderSymbolCircleToCanvas = (
    ctx: CanvasRenderingContext2D,
    { x, y, size, fill, opacity = 1, borderWidth = 0, borderColor = 'transparent' }: SymbolProps
) => {
    ctx.save()
    ctx.globalAlpha = opacity
    ctx.lineWidth = borderWidth
    ctx.fillStyle = fill ?? 'black'
    ctx.strokeStyle = borderColor
    ctx.beginPath()
    ctx.arc(x, y, size / 2, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
    if (borderWidth) ctx.stroke()
    ctx.restore()
}
