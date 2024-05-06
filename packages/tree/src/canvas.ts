import { degreesToRadians } from '@nivo/core'
import { drawCanvasText } from '@nivo/text'
import { LinkCanvasRendererProps, NodeCanvasRendererProps, LabelCanvasRendererProps } from './types'

export const renderNode = <Datum>(
    ctx: CanvasRenderingContext2D,
    { node }: NodeCanvasRendererProps<Datum>
) => {
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI)
    ctx.fillStyle = node.color
    ctx.fill()
}

export const renderLink = <Datum>(
    ctx: CanvasRenderingContext2D,
    { link, linkGenerator }: LinkCanvasRendererProps<Datum>
) => {
    ctx.strokeStyle = link.color
    ctx.lineWidth = link.thickness
    ctx.beginPath()
    linkGenerator({
        source: [link.source.x, link.source.y],
        target: [link.target.x, link.target.y],
    })
    ctx.stroke()
}

export const renderLabel = <Datum>(
    ctx: CanvasRenderingContext2D,
    { label, theme }: LabelCanvasRendererProps<Datum>
) => {
    ctx.save()

    ctx.translate(label.x, label.y)
    ctx.rotate(degreesToRadians(label.rotation))

    ctx.textBaseline = 'middle'
    ctx.textAlign = label.textAnchor === 'middle' ? 'center' : label.textAnchor
    ctx.fillStyle = '#000'

    drawCanvasText(ctx, theme.labels.text, label.label)

    ctx.restore()
}
