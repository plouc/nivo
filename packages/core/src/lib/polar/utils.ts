/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export const TWO_PI = Math.PI * 2

export const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180

export const radiansToDegrees = (radians: number) => (180 * radians) / Math.PI

export const midAngle = (arc: { startAngle: number; endAngle: number }) =>
    arc.startAngle + (arc.endAngle - arc.startAngle) / 2

export const positionFromAngle = (angle: number, distance: number) => ({
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
})

/**
 * Normalize given angle (degrees) in the 0~360 range.
 *
 * @param {number} angle
 *
 * @return {number}
 */
export const absoluteAngleDegrees = (angle: number) => {
    let absAngle = angle % 360
    if (absAngle < 0) {
        absAngle += 360
    }

    return absAngle
}

export const absoluteAngleRadians = (angle: number) =>
    angle - TWO_PI * Math.floor((angle + Math.PI) / TWO_PI)

/**
 * Computes the bounding box for a circle arc.
 *
 * Assumptions:
 *   - Anywhere the arc intersects an axis will be a max or a min.
 *   - If the arc doesn't intersect an axis, then the center
 *     will be one corner of the bounding rectangle,
 *     and this is the only case when it will be.
 *   - The only other possible extreme points of the sector to consider
 *     are the endpoints of the radii.
 *
 * This script was built within the help of this answer on stackoverflow:
 *   https://stackoverflow.com/questions/1336663/2d-bounding-box-of-a-sector
 */
export const computeArcBoundingBox = (
    // circle x origin
    ox: number,
    // circle y origin
    oy: number,
    // circle radius
    radius: number,
    // arc start angle
    startAngle: number,
    // arc end angle
    endAngle: number,
    // if true, include the center
    includeCenter = true
) => {
    let points: Array<[number, number]> = []

    const p0 = positionFromAngle(degreesToRadians(startAngle), radius)
    points.push([p0.x, p0.y])

    const p1 = positionFromAngle(degreesToRadians(endAngle), radius)
    points.push([p1.x, p1.y])

    for (
        let angle = Math.round(Math.min(startAngle, endAngle));
        angle <= Math.round(Math.max(startAngle, endAngle));
        angle++
    ) {
        if (angle % 90 === 0) {
            const p = positionFromAngle(degreesToRadians(angle), radius)
            points.push([p.x, p.y])
        }
    }

    points = points.map(([x, y]) => [ox + x, oy + y])
    if (includeCenter) {
        points.push([ox, oy])
    }

    const xs = points.map(([x]) => x)
    const ys = points.map(([, y]) => y)

    const x0 = Math.min(...xs)
    const x1 = Math.max(...xs)

    const y0 = Math.min(...ys)
    const y1 = Math.max(...ys)

    return {
        points,
        x: x0,
        y: y0,
        width: x1 - x0,
        height: y1 - y0,
    }
}
