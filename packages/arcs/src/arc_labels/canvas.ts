import { CompleteTheme } from '@bitbloom/nivo-core'
import { DatumWithArcAndColor } from '../types'
import { intersects } from '../utils'
import { ArcLabel } from './useArcLabels'

export const drawCanvasArcLabels = <Datum extends DatumWithArcAndColor>(
    ctx: CanvasRenderingContext2D,
    labels: ArcLabel<Datum>[],
    theme: CompleteTheme
) => {
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

    const dimensions: { [key: string]: DOMRect } = {}

    labels.forEach(label => {
        ctx.fillStyle = label.textColor
        const textMetrics = ctx.measureText(`${label.label}`)
        const spacing = 1
        let left = label.x - textMetrics.actualBoundingBoxLeft
        let top = label.y - Math.abs(textMetrics.actualBoundingBoxAscent) - spacing
        let right = label.x + textMetrics.actualBoundingBoxRight
        let bottom = label.y + Math.abs(textMetrics.actualBoundingBoxDescent)
        const bounds = new DOMRect(left, top, right - left, bottom - top)

        dimensions[label.data.id] = bounds
    })

    const avoid: DOMRect[] = []

    labels.forEach(label => {
        const bounds = dimensions[label.data.id]

        if (avoid.reduce((found: boolean, rect: DOMRect) => found || intersects(bounds, rect), false)) {
            return;
        }

        avoid.push(bounds)

        ctx.fillStyle = label.textColor
        ctx.fillText(`${label.label}`, label.x, label.y)
    })
}
