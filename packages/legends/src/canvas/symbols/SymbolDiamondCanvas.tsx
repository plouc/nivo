import { SymbolProps } from '../../types'

export const renderSymbolDiamondToCanvas = (
    ctx: CanvasRenderingContext2D,
    { x, y, size, fill, opacity = 1, borderWidth = 0, borderColor = 'transparent' }: SymbolProps
) => {
    ctx.save()
    ctx.globalAlpha = opacity
    ctx.lineWidth = borderWidth
    ctx.fillStyle = fill ?? 'black'
    ctx.strokeStyle = borderColor
    ctx.beginPath()
    ctx.moveTo(x + 0, y - size / 2)
    ctx.lineTo(x + size * 0.4, y)
    ctx.lineTo(x + 0, y + size / 2)
    ctx.lineTo(x - size * 0.4, y)
    ctx.closePath()
    if (borderWidth) ctx.stroke()
    ctx.fill()
    ctx.restore()
}
