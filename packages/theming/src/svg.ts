import { TextStyle } from './types'

/**
 * Cleanup theme text style so that all properties
 * are valid for an SVG text element.
 */
export const sanitizeSvgTextStyle = (
    style: TextStyle
): Omit<TextStyle, 'outlineWidth' | 'outlineColor' | 'outlineOpacity'> => {
    const { outlineWidth, outlineColor, outlineOpacity, ...sanitized } = style

    return sanitized
}
