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
    }
) =>
    arcs
        .filter(arc => skipAngle === 0 || arc.angleDeg > skipAngle)
        .map(arc => {
            const angle = absoluteAngleRadians(midAngle(arc) - Math.PI / 2)
            const positionA = positionFromAngle(angle, radius + linkOffset)
            const positionB = positionFromAngle(angle, radius + linkOffset + linkDiagonalLength)

            let positionC
            let labelPosition
            let textAlign

            if (
                absoluteAngleDegrees(radiansToDegrees(angle)) < 90 ||
                absoluteAngleDegrees(radiansToDegrees(angle)) >= 270
            ) {
                positionC = { x: positionB.x + linkHorizontalLength, y: positionB.y }
                labelPosition = {
                    x: positionB.x + linkHorizontalLength + textXOffset,
                    y: positionB.y,
                }
                textAlign = 'left'
            } else {
                positionC = { x: positionB.x - linkHorizontalLength, y: positionB.y }
                labelPosition = {
                    x: positionB.x - linkHorizontalLength - textXOffset,
                    y: positionB.y,
                }
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
