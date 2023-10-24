import { TextStyle } from '@nivo/theming'

export const setCanvasFont = (ctx: CanvasRenderingContext2D, style: TextStyle) => {
    ctx.font = `${style.fontWeight ? `${style.fontWeight} ` : ''}${style.fontSize}px ${
        style.fontFamily
    }`
}

export const drawCanvasText = (
    ctx: CanvasRenderingContext2D,
    style: TextStyle,
    text: string,
    x = 0,
    y = 0
) => {
    if (style.outlineWidth > 0) {
        ctx.strokeStyle = style.outlineColor
        ctx.lineWidth = style.outlineWidth * 2
        ctx.lineJoin = 'round'
        ctx.strokeText(text, x, y)
    }

    ctx.fillStyle = style.fill
    ctx.fillText(text, x, y)
}
