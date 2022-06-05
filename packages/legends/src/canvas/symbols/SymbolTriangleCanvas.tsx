import { SymbolProps } from '../../types'

export const renderSymbolTriangleToCanvas = (
    ctx: CanvasRenderingContext2D,
    {
        x,
        y,
        size,
        fill,
    }: //opacity = 1,
    //borderWidth = 0,
    //borderColor = 'transparent',
    SymbolProps
) => {
    ctx.beginPath()
    ctx.moveTo(x + 0, y - size / 2)
    ctx.lineTo(x + size / 2, y + size / 2)
    ctx.lineTo(x - size / 2, y + size / 2)
    ctx.fillStyle = fill ?? 'black'
    ctx.fill()
}
