/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { boxAlignment, boxDimensions, xyCoordinates } from './types'

export const alignBox = (
    box: boxDimensions,
    container: boxDimensions,
    alignment: boxAlignment
): xyCoordinates => {
    const deltaX = container.width - box.width
    const deltaY = container.height - box.height

    let x = 0
    let y = 0
    if (alignment === 'center') {
        x = deltaX / 2
        y = deltaY / 2
    }
    if (alignment === 'top') {
        x = deltaX / 2
    }
    if (alignment === 'top-right') {
        x = deltaX
    }
    if (alignment === 'right') {
        x = deltaX
        y = deltaY / 2
    }
    if (alignment === 'bottom-right') {
        x = deltaX
        y = deltaY
    }
    if (alignment === 'bottom') {
        x = deltaX / 2
        y = deltaY
    }
    if (alignment === 'bottom-left') {
        y = deltaY
    }
    if (alignment === 'left') {
        y = deltaY / 2
    }

    return [x, y]
}
