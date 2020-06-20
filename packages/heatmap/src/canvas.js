/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Render heatmap rect cell.
 *
 * @param {Object}  ctx
 * @param {boolean} enableLabels
 * @param {number}  x
 * @param {number}  y
 * @param {number}  width
 * @param {number}  height
 * @param {string}  color
 * @param {number}  opacity
 * @param {string}  labelTextColor
 * @param {number}  value
 */
export const renderRect = (
    ctx,
    { enableLabels, theme },
    { x, y, width, height, color, opacity, labelTextColor, value }
) => {
    ctx.save()
    ctx.globalAlpha = opacity

    ctx.fillStyle = color
    ctx.fillRect(x - width / 2, y - height / 2, width, height)

    if (enableLabels === true) {
        ctx.fillStyle = labelTextColor
        ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`
        ctx.fillText(value, x, y)
    }

    ctx.restore()
}

/**
 * Render heatmap circle cell.
 *
 * @param {Object}  ctx
 * @param {boolean} enableLabels
 * @param {number}  x
 * @param {number}  y
 * @param {number}  width
 * @param {number}  height
 * @param {string}  color
 * @param {number}  opacity
 * @param {string}  labelTextColor
 * @param {number}  value
 */
export const renderCircle = (
    ctx,
    { enableLabels, theme },
    { x, y, width, height, color, opacity, labelTextColor, value }
) => {
    ctx.save()
    ctx.globalAlpha = opacity

    const radius = Math.min(width, height) / 2

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()

    if (enableLabels === true) {
        ctx.fillStyle = labelTextColor
        ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`
        ctx.fillText(value, x, y)
    }

    ctx.restore()
}
