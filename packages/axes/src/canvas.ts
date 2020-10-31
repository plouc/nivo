/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Theme } from '@nivo/core'
import { degreesToRadians } from './utils'
import { computeCartesianTicks, getFormatter, computeGridLines, TicksSpec } from './compute'
import { AxisLegendPosition, AxisProp } from './components'

export interface CanvasAxisProp<Value extends number | string | Date>
    extends Omit<AxisProp<Value>, 'legend'> {
    legend?: string
}

export const renderAxisToCanvas = <Value extends number | string | Date>(
    ctx: CanvasRenderingContext2D,
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
        legend,
        legendPosition = 'end',
        legendOffset = 0,
        theme,
    }: {
        axis: 'x' | 'y'
        scale: any
        x?: number
        y?: number
        length: number
        ticksPosition: 'before' | 'after'
        tickValues?: TicksSpec<Value>
        tickSize?: number
        tickPadding?: number
        tickRotation?: number
        format?: any
        legend?: string
        legendPosition?: AxisLegendPosition
        legendOffset?: number
        theme: Theme
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

    ctx.textAlign = textAlign as CanvasTextAlign
    ctx.textBaseline = textBaseline as CanvasTextBaseline
    ctx.font = `${theme.axis.ticks.text.fontSize}px ${theme.axis.ticks.text.fontFamily}`

    if ((theme.axis.domain.line.strokeWidth as number) > 0) {
        ctx.lineWidth = theme.axis.domain.line.strokeWidth as number
        ctx.lineCap = 'square'
        ctx.strokeStyle = theme.axis.domain.line.stroke as string
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(axis === 'x' ? length : 0, axis === 'x' ? 0 : length)
        ctx.stroke()
    }

    ticks.forEach(tick => {
        if ((theme.axis.ticks.line.strokeWidth as number) > 0) {
            ctx.lineWidth = theme.axis.ticks.line.strokeWidth as number
            ctx.lineCap = 'square'
            ctx.strokeStyle = theme.axis.ticks.line.stroke as string
            ctx.beginPath()
            ctx.moveTo(tick.x, tick.y)
            ctx.lineTo(tick.x + tick.lineX, tick.y + tick.lineY)
            ctx.stroke()
        }

        const value = format !== undefined ? format(tick.value) : tick.value

        ctx.save()
        ctx.translate(tick.x + tick.textX, tick.y + tick.textY)
        ctx.rotate(degreesToRadians(tickRotation))
        ctx.fillStyle = theme.axis.ticks.text.fill as string
        ctx.fillText(value, 0, 0)
        ctx.restore()
    })

    if (legend !== undefined) {
        let legendX = 0
        let legendY = 0
        let legendRotation = 0
        let computedTextAlign: CanvasTextAlign = 'start'

        if (axis === 'y') {
            legendRotation = -90
            legendX = legendOffset
            if (legendPosition === 'start') {
                computedTextAlign = 'start'
                legendY = length
            } else if (legendPosition === 'middle') {
                computedTextAlign = 'center'
                legendY = length / 2
            } else if (legendPosition === 'end') {
                computedTextAlign = 'end'
            }
        } else {
            legendY = legendOffset
            if (legendPosition === 'start') {
                computedTextAlign = 'start'
            } else if (legendPosition === 'middle') {
                computedTextAlign = 'center'
                legendX = length / 2
            } else if (legendPosition === 'end') {
                computedTextAlign = 'end'
                legendX = length
            }
        }

        ctx.translate(legendX, legendY)
        ctx.rotate(degreesToRadians(legendRotation))
        ctx.font = `${
            theme.axis.legend.text.fontWeight ? `${theme.axis.legend.text.fontWeight} ` : ''
        }${theme.axis.legend.text.fontSize}px ${theme.axis.legend.text.fontFamily}`
        ctx.fillStyle = theme.axis.legend.text.fill as string
        ctx.textAlign = computedTextAlign
        ctx.textBaseline = 'middle'
        ctx.fillText(legend, 0, 0)
    }

    ctx.restore()
}

export const renderAxesToCanvas = <
    X extends number | string | Date,
    Y extends number | string | Date
>(
    ctx: CanvasRenderingContext2D,
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
    }: {
        xScale: any
        yScale: any
        width: number
        height: number
        top?: CanvasAxisProp<X>
        right?: CanvasAxisProp<Y>
        bottom?: CanvasAxisProp<X>
        left?: CanvasAxisProp<Y>
        theme: Theme
    }
) => {
    if (top) {
        renderAxisToCanvas<X>(ctx, {
            ...top,
            axis: 'x',
            scale: xScale,
            format: getFormatter(top.format, xScale),
            length: width,
            ticksPosition: 'before',
            theme,
        })
    }

    if (right) {
        renderAxisToCanvas<Y>(ctx, {
            ...right,
            axis: 'y',
            scale: yScale,
            x: width,
            format: getFormatter(right.format, yScale),
            length: height,
            ticksPosition: 'after',
            theme,
        })
    }

    if (bottom) {
        renderAxisToCanvas<X>(ctx, {
            ...bottom,
            axis: 'x',
            scale: xScale,
            y: height,
            format: getFormatter(bottom.format, yScale),
            length: width,
            ticksPosition: 'after',
            theme,
        })
    }

    if (left) {
        renderAxisToCanvas<Y>(ctx, {
            ...left,
            axis: 'y',
            scale: yScale,
            format: getFormatter(left.format, yScale),
            length: height,
            ticksPosition: 'before',
            theme,
        })
    }
}

export const renderGridLinesToCanvas = <Value extends number | string | Date>(
    ctx: CanvasRenderingContext2D,
    {
        width,
        height,
        scale,
        axis,
        values,
    }: {
        width: number
        height: number
        scale: any
        axis: 'x' | 'y'
        values?: TicksSpec<Value>
    }
) => {
    const lines = computeGridLines<Value>({ width, height, scale, axis, values })

    lines.forEach(line => {
        ctx.beginPath()
        ctx.moveTo(line.x1, line.y1)
        ctx.lineTo(line.x2, line.y2)
        ctx.stroke()
    })
}
