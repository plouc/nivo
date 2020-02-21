/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {
    absoluteAngleRadians,
    absoluteAngleDegrees,
    midAngle,
    positionFromAngle,
    radiansToDegrees,
} from '@nivo/core'

export const computeRadialLabels = (
    arcs,
    {
        getLabel,
        radius,
        skipAngle,
        linkOffset,
        linkDiagonalLength,
        linkHorizontalLength,
        textXOffset,
        noClip,
        margin
    }
) => {
    return arcs
        .filter(arc => skipAngle === 0 || arc.angleDeg > skipAngle)
        .map(arc => {
            const angle = absoluteAngleRadians(midAngle(arc) - Math.PI / 2)
            const pTest = positionFromAngle(angle, radius + linkOffset + linkDiagonalLength)
            const vis = !noClip || Math.abs(pTest.y) + 5 < radius + (pTest.y < 0 ? margin.top : margin.bottom)
            const horz = linkHorizontalLength * (vis ? 1 : 2)

            const positionA = positionFromAngle(angle, radius + (vis ? linkOffset : -radius / 12))
            const positionB = positionFromAngle(
                angle,
                radius + (vis ? linkOffset + linkDiagonalLength : -radius / 12)
            )
            const positionC = { ...positionB }
            const labelPosition = { ...positionB }

            let textAlign
            const deg = absoluteAngleDegrees(radiansToDegrees(angle))
            if (deg < 90 || deg >= 270) {
                positionC.x += horz
                labelPosition.x += horz + textXOffset
                textAlign = 'left'
            } else {
                positionC.x -= horz
                labelPosition.x -= horz + textXOffset
                textAlign = 'right'
            }

            return {
                arc,
                text: getLabel(arc.data),
                position: labelPosition,
                align: textAlign,
                line: [positionA, positionB, positionC],
            }
        })
}
