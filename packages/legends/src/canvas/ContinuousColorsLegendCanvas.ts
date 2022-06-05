import { degreesToRadians } from '@nivo/core'
import { computePositionFromAnchor, computeContinuousColorsLegend } from '../compute'
import { LegendContainerProps, ContinuousColorsLegendProps, ThemeProps } from '../types'
import { continuousColorsLegendDefaults } from '../defaults'

export const renderContinuousColorLegendToCanvas = (
    ctx: CanvasRenderingContext2D,
    {
        containerWidth,
        containerHeight,
        anchor,
        translateX = 0,
        translateY = 0,
        scale,
        length = continuousColorsLegendDefaults.length,
        thickness = continuousColorsLegendDefaults.thickness,
        direction = continuousColorsLegendDefaults.direction,
        ticks: _ticks,
        tickPosition = continuousColorsLegendDefaults.tickPosition,
        tickSize = continuousColorsLegendDefaults.tickSize,
        tickSpacing = continuousColorsLegendDefaults.tickSpacing,
        tickOverlap = continuousColorsLegendDefaults.tickOverlap,
        tickFormat = continuousColorsLegendDefaults.tickFormat,
        title,
        titleAlign = continuousColorsLegendDefaults.titleAlign,
        titleOffset = continuousColorsLegendDefaults.titleOffset,

        theme,
    }: LegendContainerProps & ContinuousColorsLegendProps & ThemeProps
) => {
    const {
        width,
        height,
        gradientX1,
        gradientY1,
        gradientX2,
        gradientY2,
        colorStops,
        ticks,
        titleText,
        titleX,
        titleY,
        titleRotation,
        titleVerticalAlign,
        titleHorizontalAlign,
    } = computeContinuousColorsLegend({
        scale,
        ticks: _ticks,
        length,
        thickness,
        direction,
        tickPosition,
        tickSize,
        tickSpacing,
        tickOverlap,
        tickFormat,
        title,
        titleAlign,
        titleOffset,
    })

    const { x, y } = computePositionFromAnchor({
        anchor,
        translateX,
        translateY,
        containerWidth,
        containerHeight,
        width,
        height,
    })

    const initialStyles = {
        font: ctx.font,
        textAlign: ctx.textAlign,
        textBaseline: ctx.textBaseline,
    }

    ctx.save()
    ctx.translate(x, y)

    const gradient = ctx.createLinearGradient(
        gradientX1 * width,
        gradientY1 * height,
        gradientX2 * width,
        gradientY2 * height
    )
    colorStops.forEach(colorStop => {
        gradient.addColorStop(colorStop.offset, colorStop.stopColor)
    })

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    ctx.font = `${
        theme.legends.ticks.text.fontWeight ? `${theme.legends.ticks.text.fontWeight} ` : ''
    }${theme.legends.ticks.text.fontSize}px ${theme.legends.ticks.text.fontFamily}`

    ticks.forEach(tick => {
        if ((theme.legends.ticks.line.strokeWidth ?? 0) > 0) {
            ctx.lineWidth = Number(theme.axis.ticks.line.strokeWidth)
            if (theme.axis.ticks.line.stroke) {
                ctx.strokeStyle = theme.axis.ticks.line.stroke
            }
            ctx.lineCap = 'square'

            ctx.beginPath()
            ctx.moveTo(tick.x1, tick.y1)
            ctx.lineTo(tick.x2, tick.y2)
            ctx.stroke()
        }

        if (theme.legends.ticks.text.fill) {
            ctx.fillStyle = theme.legends.ticks.text.fill
        }
        ctx.textAlign = tick.textHorizontalAlign === 'middle' ? 'center' : tick.textHorizontalAlign
        ctx.textBaseline = tick.textVerticalAlign === 'central' ? 'middle' : tick.textVerticalAlign

        ctx.fillText(tick.text, tick.textX, tick.textY)
    })

    if (titleText) {
        ctx.save()
        ctx.translate(titleX, titleY)
        ctx.rotate(degreesToRadians(titleRotation))

        ctx.font = `${
            theme.legends.title.text.fontWeight ? `${theme.legends.title.text.fontWeight} ` : ''
        }${theme.legends.title.text.fontSize}px ${theme.legends.title.text.fontFamily}`
        if (theme.legends.title.text.fill) {
            ctx.fillStyle = theme.legends.title.text.fill
        }
        ctx.textAlign = titleHorizontalAlign === 'middle' ? 'center' : titleHorizontalAlign
        ctx.textBaseline = titleVerticalAlign

        ctx.fillText(titleText, 0, 0)

        ctx.restore()
    }

    ctx.restore()

    ctx.font = initialStyles.font
    ctx.textAlign = initialStyles.textAlign
    ctx.textBaseline = initialStyles.textBaseline
}
