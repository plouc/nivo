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

/**
 * Check if cursor is in given ring.
 *
 * @param {number} centerX
 * @param {number} centerY
 * @param {number} radius
 * @param {number} innerRadius
 * @param {number} cursorX
 * @param {number} cursorY
 * @return {boolean}
 */
export const isCursorInRing = (centerX, centerY, radius, innerRadius, cursorX, cursorY) => {
    const distance = getDistance(cursorX, cursorY, centerX, centerY)

    return distance < radius && distance > innerRadius
}

/**
 * Search for an arc being under cursor.
 *
 * @param {number}         centerX
 * @param {number}         centerY
 * @param {number}         radius
 * @param {number}         innerRadius
 * @param {Array.<Object>} arcs
 * @param {number}         cursorX
 * @param {number}         cursorY
 * @return {*}
 */
export const getHoveredArc = (centerX, centerY, radius, innerRadius, arcs, cursorX, cursorY) => {
    if (!isCursorInRing(centerX, centerY, radius, innerRadius, cursorX, cursorY)) return null

    const cursorAngle = getAngle(cursorX, cursorY, centerX, centerY)

    return arcs.find(
        ({ startAngle, endAngle }) => cursorAngle >= startAngle && cursorAngle < endAngle
    )
}
