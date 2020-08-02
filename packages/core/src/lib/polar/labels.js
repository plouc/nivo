/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { positionFromAngle, radiansToDegrees } from './utils'
import { textPropsByEngine } from '../bridge'

/**
 * @param {number} radius
 * @param {number} angle          angle (radians)
 * @param {number} [rotation=0]   label rotation (degrees)
 * @param {string} [engine='svg'] one of: 'svg', 'canvas'
 * @return {{ x: number, y: number, rotate: number, align: string, baseline: string }}
 */
export const getPolarLabelProps = (radius, angle, rotation, engine = 'svg') => {
    const textProps = textPropsByEngine[engine]

    const { x, y } = positionFromAngle(angle - Math.PI / 2, radius)

    let rotate = radiansToDegrees(angle)
    let align = textProps.align.center
    let baseline = textProps.baseline.bottom

    if (rotation > 0) {
        align = textProps.align.right
        baseline = textProps.baseline.center
    } else if (rotation < 0) {
        align = textProps.align.left
        baseline = textProps.baseline.center
    }

    // reverse labels after 180°
    if (rotation !== 0 && rotate > 180) {
        rotate -= 180
        align = align === textProps.align.right ? textProps.align.left : textProps.align.right
    }

    rotate += rotation

    return { x, y, rotate, align, baseline }
}
