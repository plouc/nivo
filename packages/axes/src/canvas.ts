import { degreesToRadians } from '@nivo/core'
import { Theme, PartialTheme, extendAxisTheme } from '@nivo/theming'
import { setCanvasFont, drawCanvasText } from '@nivo/text'
import { ScaleValue, AnyScale, TicksSpec } from '@nivo/scales'
import { defaultAxisProps } from './defaults'
import { computeCartesianTicks, getFormatter, computeGridLines } from './compute'
import { positions } from './props'
import { AxisLegendPosition, CanvasAxisProps, ValueFormatter } from './types'

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
        tickSize = defaultAxisProps.tickSize,
        tickPadding = defaultAxisProps.tickPadding,
        tickRotation = defaultAxisProps.tickRotation,
        format: _format,
        legend,
        legendPosition = defaultAxisProps.legendPosition,
        legendOffset = defaultAxisProps.legendOffset,
        theme,
        style,
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
        theme: Theme
        style?: PartialTheme['axis']
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

    const axisTheme = extendAxisTheme(theme.axis, style)

    ctx.textAlign = textAlign
    ctx.textBaseline = textBaseline

    setCanvasFont(ctx, axisTheme.ticks.text)

    const domainLineWidth = axisTheme.domain.line.strokeWidth ?? 0
    if (typeof domainLineWidth !== 'string' && domainLineWidth > 0) {
        ctx.lineWidth = domainLineWidth
        ctx.lineCap = 'square'

        if (axisTheme.domain.line.stroke) {
            ctx.strokeStyle = axisTheme.domain.line.stroke
        }

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(axis === 'x' ? length : 0, axis === 'x' ? 0 : length)
        ctx.stroke()
    }

    const format = typeof _format === 'function' ? _format : (value: unknown) => `${value}`

    const tickLineWidth = axisTheme.ticks.line.strokeWidth ?? 0
    const shouldRenderTickLine = typeof tickLineWidth !== 'string' && tickLineWidth > 0
    ticks.forEach(tick => {
        if (shouldRenderTickLine) {
            ctx.lineWidth = tickLineWidth
            ctx.lineCap = 'square'

            if (axisTheme.ticks.line.stroke) {
                ctx.strokeStyle = axisTheme.ticks.line.stroke
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

        drawCanvasText(ctx, axisTheme.ticks.text, `${value}`)

        ctx.fillText(`${value}`, 0, 0)
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
        setCanvasFont(ctx, axisTheme.legend.text)

        if (axisTheme.legend.text.fill) {
            ctx.fillStyle = axisTheme.legend.text.fill
        }

        ctx.textAlign = textAlign
        ctx.textBaseline = 'middle'
        drawCanvasText(ctx, axisTheme.legend.text, legend)
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
        top?: CanvasAxisProps<X> | null
        right?: CanvasAxisProps<Y> | null
        bottom?: CanvasAxisProps<X> | null
        left?: CanvasAxisProps<Y> | null
        theme: Theme
    }
) => {
    const axes = { top, right, bottom, left }

    positions.forEach(position => {
        const axis = axes[position] as typeof position extends 'bottom' | 'top'
            ? CanvasAxisProps<X> | undefined
            : CanvasAxisProps<Y> | undefined

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
