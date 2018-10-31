/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export const getCursorPositionFromElement = (el, event) => {
    const { clientX, clientY } = event
    const bounds = el.getBoundingClientRect()

    return [clientX - bounds.left, clientY - bounds.top]
}

export const rectContainsPoint = (x, y, width, height, pointX, pointY) => {
    return x <= pointX && pointX <= x + width
        && y <= pointY && pointY <= y + height
}

export const createBrushPointsFilter = getPosition => (selection, points) => {
    if (!selection) return []

    return points.filter(point => {
        const [x, y] = getPosition(point)

        return rectContainsPoint(
            selection.x,
            selection.y,
            selection.width,
            selection.height,
            x,
            y
        )
    })
}