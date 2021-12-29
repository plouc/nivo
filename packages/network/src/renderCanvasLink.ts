import { InputNode, ComputedLink } from './types'

export const renderCanvasLink = <Node extends InputNode>(
    ctx: CanvasRenderingContext2D,
    link: ComputedLink<Node>
) => {
    ctx.strokeStyle = link.color
    ctx.lineWidth = link.thickness

    ctx.beginPath()
    ctx.moveTo(link.source.x, link.source.y)
    ctx.lineTo(link.target.x, link.target.y)
    ctx.stroke()
}
