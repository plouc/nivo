/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
