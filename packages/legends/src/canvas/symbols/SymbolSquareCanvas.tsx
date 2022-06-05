import { SymbolProps } from '../../types'

export const renderSymbolSquareToCanvas = (
    ctx: CanvasRenderingContext2D,
    { x, y, size, fill, opacity = 1, borderWidth = 0, borderColor = 'transparent' }: SymbolProps
) => {
    ctx.save()
    ctx.globalAlpha = opacity
    ctx.lineWidth = borderWidth
    ctx.fillStyle = fill ?? 'black'
    ctx.strokeStyle = borderColor
    ctx.beginPath()
    ctx.rect(x - size / 2, y - size / 2, size, size)
    ctx.closePath()
    ctx.fill()
    if (borderWidth) ctx.stroke()
    ctx.restore()
}
