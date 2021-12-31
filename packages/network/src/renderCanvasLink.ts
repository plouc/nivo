import { InputNode, ComputedLink, InputLink } from './types'

export const renderCanvasLink = <Node extends InputNode, Link extends InputLink>(
    ctx: CanvasRenderingContext2D,
    link: ComputedLink<Node, Link>
) => {
    ctx.strokeStyle = link.color
    ctx.lineWidth = link.thickness

    ctx.beginPath()
    ctx.moveTo(link.source.x, link.source.y)
    ctx.lineTo(link.target.x, link.target.y)
    ctx.stroke()
}
