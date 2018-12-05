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
import { Theme } from '../../theming'

const horizontalPositions = ['top', 'bottom']
const positions = ['top', 'right', 'bottom', 'left']

export const renderAxisToCanvas = (
    ctx: CanvasRenderingContext2D,
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
    }: {
        width: number
        height: number
        position: string
        scale: any
        tickSize: number
        tickPadding: number
        tickRotation: number
        format?: any
        theme: Theme
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
    ctx.textAlign = textAlign as CanvasTextAlign
    ctx.textBaseline = textBaseline as CanvasTextBaseline
    ctx.font = `${theme.axis.ticks.text.fontSize}px sans-serif`

    ticks.forEach(tick => {
        ctx.lineWidth = theme.axis.ticks.line.strokeWidth as number
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
    ctx: CanvasRenderingContext2D,
    { xScale, yScale, width, height, top, right, bottom, left, theme }
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

export const renderGridLinesToCanvas = (
    ctx: CanvasRenderingContext2D,
    {
        width,
        height,
        scale,
        axis,
    }: {
        width: number
        height: number
        scale: any
        axis: 'x' | 'y'
    }
) => {
    const lines = computeGridLines({ width, height, scale, axis })

    lines.forEach(line => {
        ctx.beginPath()
        ctx.moveTo(line.x1, line.y1)
        ctx.lineTo(line.x2, line.y2)
        ctx.stroke()
    })
}
