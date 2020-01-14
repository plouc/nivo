/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

interface Box {
    x: number
    y: number
    width: number
    height: number
}

export const boxAlignments = [
    'center',
    'top-left',
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left',
]

type BoxAlignment =
    | 'center'
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'

/**
 * Align a box inside another containing box and returns x, y positions.
 */
export const alignBox = (box: Box, container: Box, alignment: BoxAlignment) => {
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
