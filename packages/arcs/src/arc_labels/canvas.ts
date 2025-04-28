import { Theme } from '@nivo/theming'
import { setCanvasFont, drawCanvasText } from '@nivo/text'
import { DatumWithArcAndColor } from '../types'
import { ArcLabel } from './useArcLabels'

export const drawCanvasArcLabels = <Datum extends DatumWithArcAndColor>(
    ctx: CanvasRenderingContext2D,
    labels: ArcLabel<Datum>[],
    theme: Theme
) => {
    setCanvasFont(ctx, theme.labels.text)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    labels.forEach(label => {
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
    })
}
