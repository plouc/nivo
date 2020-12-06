import { getDistance, getAngle } from '@nivo/core'
import { Arc } from './types'

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
export const findArcUnderCursor = <A extends Arc = Arc>(
    centerX: number,
    centerY: number,
    radius: number,
    innerRadius: number,
    arcs: A[],
    cursorX: number,
    cursorY: number
): A | undefined => {
    if (!isCursorInRing(centerX, centerY, radius, innerRadius, cursorX, cursorY)) {
        return undefined
    }

    const cursorAngle = getAngle(cursorX, cursorY, centerX, centerY)

    return arcs.find(
        ({ startAngle, endAngle }) => cursorAngle >= startAngle && cursorAngle < endAngle
    )
}
