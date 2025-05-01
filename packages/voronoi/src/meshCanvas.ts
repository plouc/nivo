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

export const renderDelaunayPointsToCanvas = (
    ctx: CanvasRenderingContext2D,
    delaunay: Delaunay<Delaunay.Point>,
    radius: number
) => {
    ctx.save()

    ctx.globalAlpha = 0.15
    ctx.beginPath()
    delaunay.renderPoints(ctx, radius)
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
    ctx.fillStyle = 'pink'
    ctx.fill()

    ctx.restore()
}

export const renderDebugToCanvas = (
    ctx: CanvasRenderingContext2D,
    {
        delaunay,
        voronoi,
        detectionRadius,
        index,
    }: {
        delaunay: Delaunay<Delaunay.Point>
        voronoi: Voronoi<Delaunay.Point>
        detectionRadius: number
        index: number | null
    }
) => {
    renderVoronoiToCanvas(ctx, voronoi)

    if (detectionRadius < Infinity) {
        renderDelaunayPointsToCanvas(ctx, delaunay, detectionRadius)
    }

    if (index !== null) {
        renderVoronoiCellToCanvas(ctx, voronoi, index)
    }
}
