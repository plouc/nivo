/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { AnnotationDatum, AnnotationItem, Dimensions, Position } from './types'
import { Theme } from '@nivo/core'

type AnnotationNoteFn = (
    ctx: CanvasContext,
    props: Position & { datum: AnnotationDatum; theme: Theme }
) => void

interface Extra {
    computed: {
        points: number[][]
        text: number[]
    }
    datum: AnnotationDatum
    note: AnnotationNoteFn | string
}

interface Props {
    annotations: Array<AnnotationItem & Position & Dimensions & Extra>
    theme: Theme
}

type CanvasContext = CanvasRenderingContext2D

const drawPoints = (ctx: CanvasContext, points: number[][]) => {
    points.forEach(([x, y], index) => {
        if (index === 0) {
            ctx.moveTo(x, y)
        } else {
            ctx.lineTo(x, y)
        }
    })
}

export const renderAnnotationsToCanvas = (ctx: CanvasContext, { annotations, theme }: Props) => {
    if (annotations.length === 0) return

    const { link, outline, symbol, text } = theme.annotations

    ctx.save()
    annotations.forEach(annotation => {
        if ((link.outlineWidth ?? 0) > 0) {
            ctx.lineCap = 'square'
            if (link.outlineColor) {
                ctx.strokeStyle = link.outlineColor
            }
            ctx.lineWidth = Number(link.strokeWidth) + Number(link.outlineWidth) * 2
            ctx.beginPath()
            drawPoints(ctx, annotation.computed.points)
            ctx.stroke()
            ctx.lineCap = 'butt'
        }

        if (annotation.type === 'circle' && (outline.outlineWidth ?? 0) > 0) {
            if (outline.outlineColor) {
                ctx.strokeStyle = outline.outlineColor
            }
            ctx.lineWidth = Number(outline.strokeWidth) + Number(outline.outlineWidth) * 2
            ctx.beginPath()
            ctx.arc(annotation.x, annotation.y, (annotation.size ?? 0) / 2, 0, 2 * Math.PI)
            ctx.stroke()
        }
        if (annotation.type === 'dot' && (symbol.outlineWidth ?? 0) > 0) {
            if (symbol.outlineColor) {
                ctx.strokeStyle = symbol.outlineColor
            }
            ctx.lineWidth = Number(symbol.outlineWidth) * 2
            ctx.beginPath()
            ctx.arc(annotation.x, annotation.y, (annotation.size ?? 0) / 2, 0, 2 * Math.PI)
            ctx.stroke()
        }
        if (annotation.type === 'rect' && (outline.outlineWidth ?? 0) > 0) {
            if (outline.outlineColor) {
                ctx.strokeStyle = outline.outlineColor
            }
            ctx.lineWidth = Number(outline.strokeWidth) + Number(outline.outlineWidth) * 2
            ctx.beginPath()
            ctx.rect(
                annotation.x - annotation.width / 2,
                annotation.y - annotation.height / 2,
                annotation.width,
                annotation.height
            )
            ctx.stroke()
        }

        if (link.stroke) {
            ctx.strokeStyle = link.stroke
        }
        if (link.strokeWidth) {
            ctx.lineWidth = Number(link.strokeWidth)
        }
        ctx.beginPath()
        drawPoints(ctx, annotation.computed.points)
        ctx.stroke()

        if (annotation.type === 'circle') {
            if (outline.stroke) {
                ctx.strokeStyle = outline.stroke
            }
            if (outline.strokeWidth) {
                ctx.lineWidth = Number(outline.strokeWidth)
            }
            ctx.beginPath()
            ctx.arc(annotation.x, annotation.y, annotation.size / 2, 0, 2 * Math.PI)
            ctx.stroke()
        }
        if (annotation.type === 'dot') {
            if (symbol.fill) {
                ctx.fillStyle = symbol.fill
            }
            ctx.beginPath()
            ctx.arc(annotation.x, annotation.y, annotation.size / 2, 0, 2 * Math.PI)
            ctx.fill()
        }
        if (annotation.type === 'rect') {
            if (outline.stroke) {
                ctx.strokeStyle = outline.stroke
            }
            if (outline.strokeWidth) {
                ctx.lineWidth = Number(outline.strokeWidth)
            }

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
            ctx.font = `${text.fontSize}px ${text.fontFamily}`
            if (text.fill) {
                ctx.fillStyle = text.fill
            }
            if (text.outlineColor) {
                ctx.strokeStyle = text.outlineColor
            }
            ctx.lineWidth = Number(text.outlineWidth) * 2
            if ((text.outlineWidth ?? 0) > 0) {
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
