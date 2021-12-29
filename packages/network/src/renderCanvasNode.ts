import { ComputedNode, InputNode } from './types'

export const renderCanvasNode = <Node extends InputNode>(
    ctx: CanvasRenderingContext2D,
    node: ComputedNode<Node>
) => {
    ctx.fillStyle = node.color
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI)
    ctx.fill()

    if (node.borderWidth > 0) {
        ctx.strokeStyle = node.borderColor
        ctx.lineWidth = node.borderWidth
        ctx.stroke()
    }
}
