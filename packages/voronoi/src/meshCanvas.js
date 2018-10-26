export const renderVoronoiToCanvas = (ctx, voronoi) => {
    ctx.save()

    ctx.globalAlpha = 0.75
    ctx.beginPath()
    voronoi.render(ctx)
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 0.5
    ctx.stroke()

    ctx.restore()
}

export const renderVoronoiCellToCanvas = (ctx, voronoi, index) => {
    ctx.save()

    ctx.globalAlpha = 0.25
    ctx.beginPath()
    voronoi.renderCell(index, ctx)
    ctx.fillStyle = 'red'
    ctx.fill()

    ctx.restore()
}
