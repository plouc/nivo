/**
 * Cleanup theme text style so that all properties
 * are valid for an SVG text element.
 *
 * @param {TextStyle} style
 */
export const sanitizeSvgTextStyle = style => {
    const { outlineWidth, outlineColor, outlineOpacity, ...sanitized } = style

    return sanitized
}
