import { NetworkComputedNode, NetworkInputNode } from './types'

export const renderCanvasNode = <N extends NetworkInputNode>(
    ctx: CanvasRenderingContext2D,
    node: NetworkComputedNode<N>
) => {
    ctx.fillStyle = node.color
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI)
    ctx.fill()

    if (node.borderWidth > 0) {
        ctx.strokeStyle = node.borderColor
        ctx.lineWidth = node.borderWidth
        ctx.stroke()
    }
}
