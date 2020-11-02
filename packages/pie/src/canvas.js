/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { textPropsByEngine } from '@nivo/core'
import { computeRadialLabels } from './compute'

export const drawSliceLabels = (ctx, labels, theme) => {
    console.log({
        ctx,
        labels,
        theme,
    })
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

    labels.forEach(label => {
        ctx.save()
        ctx.translate(label.x, label.y)
        ctx.fillStyle = label.textColor
        ctx.fillText(label.label, 0, 0)
        ctx.restore()
    })
}

export const drawRadialLabels = (
    ctx,
    arcs,
    {
        radius,
        getLabel,
        skipAngle,
        linkOffset,
        linkDiagonalLength,
        linkHorizontalLength,
        linkStrokeWidth,
        textXOffset,
        getTextColor,
        getLinkColor,
        theme,
    }
) => {
    const radialLabels = computeRadialLabels(arcs, {
        getLabel,
        radius,
        skipAngle,
        linkOffset,
        linkDiagonalLength,
        linkHorizontalLength,
        textXOffset,
    })

    ctx.textBaseline = 'middle'
    ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

    radialLabels.forEach(label => {
        const dataWithColor = {
            ...label.arc.data,
            color: label.arc.color,
        }

        ctx.save()
        ctx.translate(label.position.x, label.position.y)
        ctx.fillStyle = getTextColor(dataWithColor, theme)
        ctx.textAlign = textPropsByEngine.canvas.align[label.align]
        ctx.fillText(label.text, 0, 0)
        ctx.restore()

        ctx.beginPath()
        ctx.strokeStyle = getLinkColor(dataWithColor, theme)
        ctx.lineWidth = linkStrokeWidth
        label.line.forEach((point, index) => {
            if (index === 0) ctx.moveTo(point.x, point.y)
            else ctx.lineTo(point.x, point.y)
        })
        if (linkStrokeWidth > 0) ctx.stroke()
    })
}
