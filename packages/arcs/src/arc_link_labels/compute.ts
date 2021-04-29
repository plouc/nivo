import { positionFromAngle } from '@nivo/core'
import { Arc, Point } from '../types'
import { getNormalizedAngle } from '../utils'
import { ArcLink } from './types'

/**
 * Compute text anchor for a given arc.
 *
 * `computeArcLink` already computes a `side`, but when using
 * `react-spring`, you cannot have a single interpolation
 * returning several output values, so we need to compute
 * them in separate interpolations.
 */
export const computeArcLinkTextAnchor = (arc: Arc): 'start' | 'end' => {
    const centerAngle = getNormalizedAngle(
        arc.startAngle + (arc.endAngle - arc.startAngle) / 2 - Math.PI / 2
    )

    if (centerAngle < Math.PI / 2 || centerAngle > Math.PI * 1.5) {
        return 'start'
    }

    return 'end'
}

/**
 * Compute the link of a single arc, returning its points,
 * please note that points coordinates are relative to
 * the center of the arc.
 */
export const computeArcLink = (
    arc: Arc,
    offset: number,
    diagonalLength: number,
    straightLength: number
): ArcLink => {
    const centerAngle = getNormalizedAngle(
        arc.startAngle + (arc.endAngle - arc.startAngle) / 2 - Math.PI / 2
    )
    const point0: Point = positionFromAngle(centerAngle, arc.outerRadius + offset)
    const point1: Point = positionFromAngle(centerAngle, arc.outerRadius + offset + diagonalLength)

    let side: ArcLink['side']
    let point2: Point
    if (centerAngle < Math.PI / 2 || centerAngle > Math.PI * 1.5) {
        side = 'after'
        point2 = {
            x: point1.x + straightLength,
            y: point1.y,
        }
    } else {
        side = 'before'
        point2 = {
            x: point1.x - straightLength,
            y: point1.y,
        }
    }

    return {
        side,
        points: [point0, point1, point2],
    }
}
