import { SymbolProps } from '../../types'

export const renderSymbolCircleToCanvas = (
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
    //console.log('render circle ' + [x, y, size, fill])
    ctx.beginPath()
    ctx.arc(x, y, size / 2, 0, 2 * Math.PI)
    ctx.fillStyle = fill ?? 'black'
    ctx.fill()
}
