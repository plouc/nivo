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

        // ticks
        tickSize = 5,
        tickPadding = 5,
        tickRotation = 0,
        format,
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

    ticks.forEach(tick => {
        ctx.beginPath()
        ctx.moveTo(tick.x, tick.y)
        ctx.lineTo(tick.x + tick.lineX, tick.y + tick.lineY)
        ctx.stroke()

        const value = format !== undefined ? format(tick.value) : tick.value

        ctx.save()
        ctx.translate(tick.x + tick.textX, tick.y + tick.textY)
        ctx.rotate(degreesToRadians(tickRotation))
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

        // axes
        top,
        right,
        bottom,
        left,
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
        })
    })
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number}                   width
 * @param {number}                   height
 * @param {number}                   scale
 * @param {('x'|'y')}                axis
 */
export const renderGridLinesToCanvas = (ctx, { width, height, scale, axis }) => {
    const lines = computeGridLines({ width, height, scale, axis })

    lines.forEach(line => {
        ctx.beginPath()
        ctx.moveTo(line.x1, line.y1)
        ctx.lineTo(line.x2, line.y2)
        ctx.stroke()
    })
}
