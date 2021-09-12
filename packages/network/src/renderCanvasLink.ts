import { NetworkInputNode, ComputedLink } from './types'

export const renderCanvasLink = <N extends NetworkInputNode>(
    ctx: CanvasRenderingContext2D,
    link: ComputedLink<N>
) => {
    ctx.strokeStyle = link.color
    ctx.lineWidth = link.thickness

    ctx.beginPath()
    ctx.moveTo(link.source.x, link.source.y)
    ctx.lineTo(link.target.x, link.target.y)
    ctx.stroke()
}
