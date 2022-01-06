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
 * @param {number | string}  label
 */
export const renderRect = (
    ctx,
    { enableLabels, theme },
    { x, y, width, height, color, opacity, labelTextColor, label }
) => {
    ctx.save()
    ctx.globalAlpha = opacity

    ctx.fillStyle = color
    ctx.fillRect(x - width / 2, y - height / 2, width, height)

    if (enableLabels === true) {
        ctx.fillStyle = labelTextColor
        ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`
        ctx.fillText(label, x, y)
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
 * @param {number | string}  label
 */
export const renderCircle = (
    ctx,
    { enableLabels, theme },
    { x, y, width, height, color, opacity, labelTextColor, label }
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
        ctx.fillText(label, x, y)
    }

    ctx.restore()
}
