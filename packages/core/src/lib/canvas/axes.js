/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { computeAxisTicks, computeGridLines } from '../cartesian/axes'
import { degreesToRadians } from '../polar'

const horizontalPositions = ['top', 'bottom']
const positions = ['top', 'right', 'bottom', 'left']

export const renderAxisToCanvas = (
    ctx,
    {
        width,
        height,
        position,
        scale,

        tickSize = 5,
        tickPadding = 5,
        tickRotation = 0,
        format,

        theme,
    }
) => {
    const { x, y, ticks, textAlign, textBaseline } = computeAxisTicks({
        width,
        height,
        position,
        scale,
        tickSize,
        tickPadding,
        tickRotation,
        engine: 'canvas',
    })

    ctx.save()
    ctx.translate(x, y)
    ctx.textAlign = textAlign
    ctx.textBaseline = textBaseline
    ctx.font = `${theme.axis.ticks.text.fontSize}px sans-serif`

    ticks.forEach(tick => {
        ctx.lineWidth = theme.axis.ticks.line.strokeWidth
        ctx.strokeStyle = theme.axis.ticks.line.stroke
        ctx.beginPath()
        ctx.moveTo(tick.x, tick.y)
        ctx.lineTo(tick.x + tick.lineX, tick.y + tick.lineY)
        ctx.stroke()

        const value = format !== undefined ? format(tick.value) : tick.value

        ctx.save()
        ctx.translate(tick.x + tick.textX, tick.y + tick.textY)
        ctx.rotate(degreesToRadians(tickRotation))
        ctx.fillStyle = theme.axis.ticks.text.fill
        ctx.fillText(value, 0, 0)
        ctx.restore()
    })

    ctx.restore()
}

export const renderAxesToCanvas = (
    ctx,
    {
        xScale,
        yScale,
        width,
        height,

        top,
        right,
        bottom,
        left,

        theme,
    }
) => {
    const axes = { top, right, bottom, left }

    positions.map(position => {
        if (!axes[position]) return null

        const axis = axes[position]
        const scale = horizontalPositions.includes(position) ? xScale : yScale

        renderAxisToCanvas(ctx, {
            ...axis,
            width,
            height,
            position,
            scale,
            theme,
        })
    })
}

export const renderGridLinesToCanvas = (ctx, { width, height, scale, axis, theme }) => {
    const lines = computeGridLines({ width, height, scale, axis })

    ctx.strokeStyle = theme.grid.line.stroke
    ctx.lineWidth = theme.grid.line.strokeWidth

    lines.forEach(line => {
        ctx.beginPath()
        ctx.moveTo(line.x1, line.y1)
        ctx.lineTo(line.x2, line.y2)
        ctx.stroke()
    })
}
