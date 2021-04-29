import { positionFromAngle, degreesToRadians } from '@nivo/core'

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
    centerX: number,
    centerY: number,
    radius: number,
    // in degrees
    startAngle: number,
    // in degrees
    endAngle: number,
    includeCenter = true
) => {
    let points: [number, number][] = []

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

    points = points.map(([x, y]) => [centerX + x, centerY + y])
    if (includeCenter === true) {
        points.push([centerX, centerY])
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
