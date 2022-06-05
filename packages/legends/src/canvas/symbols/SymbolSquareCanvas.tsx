import { SymbolProps } from '../../types'

export const renderSymbolSquareToCanvas = (
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
    //console.log('render square ' + [x, y, size, fill])
    ctx.fillStyle = fill ?? 'black'
    ctx.fillRect(x - size / 2, y - size / 2, size, size)
}
