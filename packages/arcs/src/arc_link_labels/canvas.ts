import {
    // @ts-ignore
    textPropsByEngine,
    CompleteTheme,
} from '@bitbloom/nivo-core'
import { DatumWithArcAndColor } from '../types'
import { ArcLinkLabel } from './types'

type DatumId = string | number

function intersects(a: DOMRect, b?: DOMRect): boolean {
    if (!b) return false
    if (a.left > b.right) return false
    if (a.top > b.bottom) return false
    if (a.right < b.left) return false
    if (a.bottom < b.top) return false
    return true
}

export const drawCanvasArcLinkLabels = <Datum extends DatumWithArcAndColor>(
    ctx: CanvasRenderingContext2D,
    labels: ArcLinkLabel<Datum>[],
    theme: CompleteTheme,
    strokeWidth: number,
    activeId?: DatumId
) => {
    ctx.textBaseline = 'middle'
    ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

    const opacity = activeId === undefined ? 1 : 0.5
    const dimensions: { [key: string]: DOMRect } = {}
    const avoid: DOMRect[] = []

    labels.forEach(label => {
        ctx.fillStyle = label.textColor
        ctx.textAlign = textPropsByEngine.canvas.align[label.textAnchor]

        const textMetrics = ctx.measureText(`${label.label}`)
        const spacing = 1
        let left = label.x - textMetrics.actualBoundingBoxLeft
        let top = label.y - Math.abs(textMetrics.actualBoundingBoxAscent) - spacing
        let right = label.x + textMetrics.actualBoundingBoxRight
        let bottom = label.y + Math.abs(textMetrics.actualBoundingBoxDescent)

        label.points.forEach((point, index) => {
            if (index === 0) return
            left = Math.min(left, point.x)
            right = Math.max(right, point.x)
            top = Math.min(top, point.y)
            bottom = Math.max(bottom, point.y)
        })

        const bounds = new DOMRect(left, top, right - left, bottom - top)

        dimensions[label.data.id] = bounds

        if (label.data.id == activeId) {
            avoid.push(bounds)
        }
    })

    labels.forEach(label => {
        const bounds = dimensions[label.data.id]

        if (label.data.id !== activeId &&
            avoid.reduce((found: boolean, rect: DOMRect) => found || intersects(bounds, rect), false)) {
            return;
        }

        avoid.push(bounds)

        ctx.fillStyle = label.textColor
        ctx.globalAlpha = label.data.id === activeId ? 1 : opacity
        ctx.textAlign = textPropsByEngine.canvas.align[label.textAnchor]
        ctx.fillText(`${label.label}`, label.x, label.y)

        ctx.beginPath()
        ctx.strokeStyle = label.linkColor
        ctx.lineWidth = strokeWidth
        label.points.forEach((point, index) => {
            if (index === 0) ctx.moveTo(point.x, point.y)
            else ctx.lineTo(point.x, point.y)
        })
        ctx.stroke()
    })

    ctx.globalAlpha = 1
}
