import { CompleteTheme } from '@nivo/core'
import { DatumWithArcAndColor } from '../types'
import { ArcLabel } from './useArcLabels'

export const drawCanvasArcLabels = <Datum extends DatumWithArcAndColor>(
    ctx: CanvasRenderingContext2D,
    labels: ArcLabel<Datum>[],
    theme: CompleteTheme
) => {
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

    labels.forEach(label => {
        ctx.fillStyle = label.textColor
        ctx.fillText(`${label.label}`, label.x, label.y)
    })
}
