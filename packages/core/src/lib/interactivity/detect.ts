/** Computes distance between two points */
export const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    let deltaX = x2 - x1
    let deltaY = y2 - y1

    deltaX *= deltaX
    deltaY *= deltaY

    return Math.sqrt(deltaX + deltaY)
}

/** Computes angle (radians) between two points. */
export const getAngle = (x1: number, y1: number, x2: number, y2: number) => {
    const angle = Math.atan2(y2 - y1, x2 - x1) - Math.PI / 2

    return angle > 0 ? angle : Math.PI * 2 + angle
}

/** Check if cursor is in given rectangle. */
export const isCursorInRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    cursorX: number,
    cursorY: number
) => x <= cursorX && cursorX <= x + width && y <= cursorY && cursorY <= y + height
