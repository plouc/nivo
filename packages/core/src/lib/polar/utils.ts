export const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180

export const radiansToDegrees = (radians: number) => (180 * radians) / Math.PI

export const midAngle = (arc: { startAngle: number; endAngle: number }) =>
    arc.startAngle + (arc.endAngle - arc.startAngle) / 2

export const positionFromAngle = (angle: number, distance: number) => ({
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
})

/** Ensure an angle (in degrees) is in [0, 360] */
export const normalizeAngle = (angle: number) => {
    if (angle < 0) {
        return 360 - (-angle % 360)
    }
    return angle % 360
}

/**
 * Ensure the absolute difference between start and end angles
 * is at most given length.
 *
 * @param startAngle - in degrees
 * @param endAngle   - in degrees
 * @param length     - in degrees
 *
 * @returns {[number, number]}
 */
export const clampArc = (startAngle: number, endAngle: number, length = 360) => {
    let clampedEndAngle = endAngle
    if (Math.abs(endAngle - startAngle) > length) {
        clampedEndAngle = startAngle + (endAngle > startAngle ? length : -length)
    }
    return [startAngle, clampedEndAngle]
}
