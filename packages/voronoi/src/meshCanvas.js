export const renderVoronoiToCanvas = (ctx, voronoi) => {
    ctx.save()

    ctx.globalAlpha = 0.75
    ctx.beginPath()
    voronoi.render(ctx)
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.restore()
}

export const renderVoronoiCellToCanvas = (ctx, voronoi, index) => {
    ctx.save()

    ctx.globalAlpha = 0.35
    ctx.beginPath()
    voronoi.renderCell(index, ctx)
    ctx.fillStyle = 'red'
    ctx.fill()

    ctx.restore()
}
