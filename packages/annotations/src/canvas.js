/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const drawPoints = (ctx, points) => {
    points.forEach(([x, y], index) => {
        if (index === 0) {
            ctx.moveTo(x, y)
        } else {
            ctx.lineTo(x, y)
        }
    })
}

export const renderAnnotationsToCanvas = (ctx, { annotations, theme }) => {
    if (annotations.length === 0) return

    ctx.save()
    annotations.forEach(annotation => {
        if (theme.annotations.link.outlineWidth > 0) {
            ctx.lineCap = 'square'
            ctx.strokeStyle = theme.annotations.link.outlineColor
            ctx.lineWidth =
                theme.annotations.link.strokeWidth + theme.annotations.link.outlineWidth * 2
            ctx.beginPath()
            drawPoints(ctx, annotation.computed.points)
            ctx.stroke()
            ctx.lineCap = 'butt'
        }

        if (annotation.type === 'circle' && theme.annotations.outline.outlineWidth > 0) {
            ctx.strokeStyle = theme.annotations.outline.outlineColor
            ctx.lineWidth =
                theme.annotations.outline.strokeWidth + theme.annotations.outline.outlineWidth * 2
            ctx.beginPath()
            ctx.arc(annotation.x, annotation.y, annotation.size / 2, 0, 2 * Math.PI)
            ctx.stroke()
        }
        if (annotation.type === 'dot' && theme.annotations.symbol.outlineWidth > 0) {
            ctx.strokeStyle = theme.annotations.symbol.outlineColor
            ctx.lineWidth = theme.annotations.symbol.outlineWidth * 2
            ctx.beginPath()
            ctx.arc(annotation.x, annotation.y, annotation.size / 2, 0, 2 * Math.PI)
            ctx.stroke()
        }
        if (annotation.type === 'rect' && theme.annotations.outline.outlineWidth > 0) {
            ctx.strokeStyle = theme.annotations.outline.outlineColor
            ctx.lineWidth =
                theme.annotations.outline.strokeWidth + theme.annotations.outline.outlineWidth * 2
            ctx.beginPath()
            ctx.rect(
                annotation.x - annotation.width / 2,
                annotation.y - annotation.height / 2,
                annotation.width,
                annotation.height
            )
            ctx.stroke()
        }

        ctx.strokeStyle = theme.annotations.link.stroke
        ctx.lineWidth = theme.annotations.link.strokeWidth
        ctx.beginPath()
        drawPoints(ctx, annotation.computed.points)
        ctx.stroke()

        if (annotation.type === 'circle') {
            ctx.strokeStyle = theme.annotations.outline.stroke
            ctx.lineWidth = theme.annotations.outline.strokeWidth
            ctx.beginPath()
            ctx.arc(annotation.x, annotation.y, annotation.size / 2, 0, 2 * Math.PI)
            ctx.stroke()
        }
        if (annotation.type === 'dot') {
            ctx.fillStyle = theme.annotations.symbol.fill
            ctx.beginPath()
            ctx.arc(annotation.x, annotation.y, annotation.size / 2, 0, 2 * Math.PI)
            ctx.fill()
        }
        if (annotation.type === 'rect') {
            ctx.strokeStyle = theme.annotations.outline.stroke
            ctx.lineWidth = theme.annotations.outline.strokeWidth
            ctx.beginPath()
            ctx.rect(
                annotation.x - annotation.width / 2,
                annotation.y - annotation.height / 2,
                annotation.width,
                annotation.height
            )
            ctx.stroke()
        }

        if (typeof annotation.note === 'function') {
            annotation.note(ctx, {
                datum: annotation.datum,
                x: annotation.computed.text[0],
                y: annotation.computed.text[1],
                theme,
            })
        } else {
            ctx.font = `${theme.annotations.text.fontSize}px ${theme.annotations.text.fontFamily}`
            ctx.fillStyle = theme.annotations.text.fill
            ctx.strokeStyle = theme.annotations.text.outlineColor
            ctx.lineWidth = theme.annotations.text.outlineWidth * 2
            if (theme.annotations.text.outlineWidth > 0) {
                ctx.lineJoin = 'round'
                ctx.strokeText(
                    annotation.note,
                    annotation.computed.text[0],
                    annotation.computed.text[1]
                )
                ctx.lineJoin = 'miter'
            }
            ctx.fillText(annotation.note, annotation.computed.text[0], annotation.computed.text[1])
        }
    })
    ctx.restore()
}
