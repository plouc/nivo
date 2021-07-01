/**
 * Computes distance between two points.
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {number}
 */
export const getDistance = (x1, y1, x2, y2) => {
    let deltaX = x2 - x1
    let deltaY = y2 - y1

    deltaX *= deltaX
    deltaY *= deltaY

    return Math.sqrt(deltaX + deltaY)
}

/**
 * Computes angle (radians) between two points.
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {number}
 */
export const getAngle = (x1, y1, x2, y2) => {
    const angle = Math.atan2(y2 - y1, x2 - x1) - Math.PI / 2

    return angle > 0 ? angle : Math.PI * 2 + angle
}

/**
 * Check if cursor is in given rectangle.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} cursorX
 * @param {number} cursorY
 * @return {boolean}
 */
export const isCursorInRect = (x, y, width, height, cursorX, cursorY) =>
    x <= cursorX && cursorX <= x + width && y <= cursorY && cursorY <= y + height
