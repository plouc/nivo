import {
    // @ts-ignore
    textPropsByEngine,
} from '@nivo/core'
import { Theme } from '@nivo/theming'
import { setCanvasFont, drawCanvasText } from '@nivo/text'
import { DatumWithArcAndColor } from '../types'
import { ArcLinkLabel } from './types'

export const drawCanvasArcLinkLabels = <Datum extends DatumWithArcAndColor>(
    ctx: CanvasRenderingContext2D,
    labels: ArcLinkLabel<Datum>[],
    theme: Theme,
    strokeWidth: number
) => {
    ctx.textBaseline = 'middle'
    setCanvasFont(ctx, theme.labels.text)

    labels.forEach(label => {
        ctx.textAlign = textPropsByEngine.canvas.align[label.textAnchor]
        drawCanvasText(
            ctx,
            {
                ...theme.labels.text,
                fill: label.textColor,
            },
            String(label.label),
            label.x,
            label.y
        )

        ctx.beginPath()
        ctx.strokeStyle = label.linkColor
        ctx.lineWidth = strokeWidth
        label.points.forEach((point, index) => {
            if (index === 0) ctx.moveTo(point.x, point.y)
            else ctx.lineTo(point.x, point.y)
        })
        ctx.stroke()
    })
}
