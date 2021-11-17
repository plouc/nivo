import { degreesToRadians, CompleteTheme } from '@nivo/core'
import { ScaleValue, AnyScale, TicksSpec } from '@nivo/scales'
import { computeCartesianTicks, getFormatter, computeGridLines } from './compute'
import { positions } from './props'
import { AxisLegendPosition, CanvasAxisProp, ValueFormatter } from './types'

export const renderAxisToCanvas = <Value extends ScaleValue>(
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
        format: _format,

        legend,
        legendPosition = 'end',
        legendOffset = 0,

        theme,
    }: {
        axis: 'x' | 'y'
        scale: AnyScale
        x?: number
        y?: number
        length: number
        ticksPosition: 'before' | 'after'
        tickValues?: TicksSpec<Value>
        tickSize?: number
        tickPadding?: number
        tickRotation?: number
        format?: string | ValueFormatter<Value>
        legend?: string
        legendPosition?: AxisLegendPosition
        legendOffset?: number
        theme: CompleteTheme
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
    ctx.font = `${theme.axis.ticks.text.fontWeight ? `${theme.axis.ticks.text.fontWeight} ` : ''}${
        theme.axis.ticks.text.fontSize
    }px ${theme.axis.ticks.text.fontFamily}`

    if ((theme.axis.domain.line.strokeWidth ?? 0) > 0) {
        ctx.lineWidth = Number(theme.axis.domain.line.strokeWidth)
        ctx.lineCap = 'square'

        if (theme.axis.domain.line.stroke) {
            ctx.strokeStyle = theme.axis.domain.line.stroke
        }

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(axis === 'x' ? length : 0, axis === 'x' ? 0 : length)
        ctx.stroke()
    }

    const format = typeof _format === 'function' ? _format : (value: unknown) => `${value}`

    ticks.forEach(tick => {
        if ((theme.axis.ticks.line.strokeWidth ?? 0) > 0) {
            ctx.lineWidth = Number(theme.axis.ticks.line.strokeWidth)
            ctx.lineCap = 'square'

            if (theme.axis.ticks.line.stroke) {
                ctx.strokeStyle = theme.axis.ticks.line.stroke
            }

            ctx.beginPath()
            ctx.moveTo(tick.x, tick.y)
            ctx.lineTo(tick.x + tick.lineX, tick.y + tick.lineY)
            ctx.stroke()
        }

        const value = format(tick.value)

        ctx.save()
        ctx.translate(tick.x + tick.textX, tick.y + tick.textY)
        ctx.rotate(degreesToRadians(tickRotation))

        if (theme.axis.ticks.text.fill) {
            ctx.fillStyle = theme.axis.ticks.text.fill
        }

        ctx.fillText(String(value), 0, 0)
        ctx.restore()
    })

    if (legend !== undefined) {
        let legendX = 0
        let legendY = 0
        let legendRotation = 0
        let textAlign: CanvasTextAlign = 'center'

        if (axis === 'y') {
            legendRotation = -90
            legendX = legendOffset
            if (legendPosition === 'start') {
                textAlign = 'start'
                legendY = length
            } else if (legendPosition === 'middle') {
                textAlign = 'center'
                legendY = length / 2
            } else if (legendPosition === 'end') {
                textAlign = 'end'
            }
        } else {
            legendY = legendOffset
            if (legendPosition === 'start') {
                textAlign = 'start'
            } else if (legendPosition === 'middle') {
                textAlign = 'center'
                legendX = length / 2
            } else if (legendPosition === 'end') {
                textAlign = 'end'
                legendX = length
            }
        }

        ctx.translate(legendX, legendY)
        ctx.rotate(degreesToRadians(legendRotation))
        ctx.font = `${
            theme.axis.legend.text.fontWeight ? `${theme.axis.legend.text.fontWeight} ` : ''
        }${theme.axis.legend.text.fontSize}px ${theme.axis.legend.text.fontFamily}`

        if (theme.axis.legend.text.fill) {
            ctx.fillStyle = theme.axis.legend.text.fill
        }

        ctx.textAlign = textAlign
        ctx.textBaseline = 'middle'
        ctx.fillText(legend, 0, 0)
    }

    ctx.restore()
}

export const renderAxesToCanvas = <X extends ScaleValue, Y extends ScaleValue>(
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
        xScale: AnyScale
        yScale: AnyScale
        width: number
        height: number
        top?: CanvasAxisProp<X> | null
        right?: CanvasAxisProp<Y> | null
        bottom?: CanvasAxisProp<X> | null
        left?: CanvasAxisProp<Y> | null
        theme: CompleteTheme
    }
) => {
    const axes = { top, right, bottom, left }

    positions.forEach(position => {
        const axis = axes[position] as typeof position extends 'bottom' | 'top'
            ? CanvasAxisProp<X> | undefined
            : CanvasAxisProp<Y> | undefined

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

export const renderGridLinesToCanvas = <Value extends ScaleValue>(
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
        scale: AnyScale
        axis: 'x' | 'y'
        values?: TicksSpec<Value>
    }
) => {
    const lines = computeGridLines({ width, height, scale, axis, values })

    lines.forEach(line => {
        ctx.beginPath()
        ctx.moveTo(line.x1, line.y1)
        ctx.lineTo(line.x2, line.y2)
        ctx.stroke()
    })
}
