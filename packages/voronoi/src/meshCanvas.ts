import { Delaunay, Voronoi } from 'd3-delaunay'

export const renderVoronoiToCanvas = (
    ctx: CanvasRenderingContext2D,
    voronoi: Voronoi<Delaunay.Point>
) => {
    ctx.save()

    ctx.globalAlpha = 0.75
    ctx.beginPath()
    voronoi.render(ctx)
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.restore()
}

export const renderVoronoiCellToCanvas = (
    ctx: CanvasRenderingContext2D,
    voronoi: Voronoi<Delaunay.Point>,
    index: number
) => {
    ctx.save()

    ctx.globalAlpha = 0.35
    ctx.beginPath()
    voronoi.renderCell(index, ctx)
    ctx.fillStyle = 'red'
    ctx.fill()

    ctx.restore()
}
