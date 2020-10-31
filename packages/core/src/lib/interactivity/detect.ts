/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Computes distance between two points.
 */
export const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    let deltaX = x2 - x1
    let deltaY = y2 - y1

    deltaX *= deltaX
    deltaY *= deltaY

    return Math.sqrt(deltaX + deltaY)
}

/**
 * Computes angle (radians) between two points.
 */
export const getAngle = (x1: number, y1: number, x2: number, y2: number) => {
    const angle = Math.atan2(y2 - y1, x2 - x1) - Math.PI / 2

    return angle > 0 ? angle : Math.PI * 2 + angle
}

/**
 * Check if cursor is in given rectangle.
 */
export const isCursorInRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    cursorX: number,
    cursorY: number
) => x <= cursorX && cursorX <= x + width && y <= cursorY && cursorY <= y + height

/**
 * Check if cursor is in given ring.
 */
export const isCursorInRing = (
    centerX: number,
    centerY: number,
    radius: number,
    innerRadius: number,
    cursorX: number,
    cursorY: number
) => {
    const distance = getDistance(cursorX, cursorY, centerX, centerY)

    return distance < radius && distance > innerRadius
}

/**
 * Search for an arc being under cursor.
 */
export const getHoveredArc = (
    centerX: number,
    centerY: number,
    radius: number,
    innerRadius: number,
    arcs: Array<{
        startAngle: number
        endAngle: number
    }>,
    cursorX: number,
    cursorY: number
) => {
    if (!isCursorInRing(centerX, centerY, radius, innerRadius, cursorX, cursorY)) {
        return null
    }

    const cursorAngle = getAngle(cursorX, cursorY, centerX, centerY)

    return arcs.find(
        ({ startAngle, endAngle }) => cursorAngle >= startAngle && cursorAngle < endAngle
    )
}
