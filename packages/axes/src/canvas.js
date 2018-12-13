/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { degreesToRadians } from './utils'
import { computeCartesianTicks, getFormatter } from './compute'

export const renderAxisToCanvas = (
    ctx,
    {
        axis,
        scale,
        x = 0,
        y = 0,
        length,

        ticksPosition,
        tickValues,
        tickSize = 5,
        tickPadding = 5,
        tickRotation = 0,
        format,

        // @todo implement legend support
        // legend,
        // legendPosition = 'end',
        // legendOffset = 0,

        theme,
    }
) => {
    const { ticks, textAlign, textBaseline } = computeCartesianTicks({
        axis,
        scale,
        ticksPosition,
        tickValues,
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

    if (theme.axis.domain.line.strokeWidth > 0) {
        ctx.strokeStyle = theme.axis.domain.line.stroke
        ctx.lineWidth = theme.axis.domain.line.strokeWidth
        ctx.lineCap = 'square'
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(axis === 'x' ? length : 0, axis === 'x' ? 0 : length)
        ctx.stroke()
    }

    ticks.forEach(tick => {
        ctx.strokeStyle = theme.axis.ticks.line.stroke
        ctx.lineWidth = theme.axis.ticks.line.strokeWidth
        ctx.lineCap = 'square'
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

const positions = ['top', 'right', 'bottom', 'left']

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

    positions.forEach(position => {
        const axis = axes[position]

        if (!axis) return null

        const isXAxis = position === 'top' || position === 'bottom'
        const ticksPosition = position === 'top' || position === 'left' ? 'before' : 'after'
        const scale = isXAxis ? xScale : yScale
        const format = getFormatter(axis.format, scale)

        renderAxisToCanvas(ctx, {
            ...axis,
            axis: isXAxis ? 'x' : 'y',
            x: position === 'right' ? width : 0,
            y: position === 'bottom' ? height : 0,
            scale,
            format,
            length: isXAxis ? width : height,
            ticksPosition,
            theme,
        })
    })
}
