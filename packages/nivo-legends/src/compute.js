/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { isNumber, isPlainObject } from 'lodash'
import { DIRECTION_COLUMN, DIRECTION_ROW } from './constants'

const zeroPadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
}

export const computeDimensions = ({
    itemCount,
    itemWidth,
    itemHeight,
    direction,
    itemsSpacing,
    padding: _padding,
}) => {
    let padding
    if (isNumber(_padding)) {
        padding = {
            top: _padding,
            right: _padding,
            bottom: _padding,
            left: _padding,
        }
    } else if (isPlainObject(_padding)) {
        padding = {
            ...zeroPadding,
            ..._padding,
        }
    } else {
        throw new TypeError(`Invalid property padding, must be one of: number, object`)
    }

    const horizontalPadding = padding.left + padding.right
    const verticalPadding = padding.top + padding.bottom
    let width = itemWidth + horizontalPadding
    let height = itemHeight + verticalPadding
    let spacing = (itemCount - 1) * itemsSpacing
    if (direction === DIRECTION_ROW) {
        width = itemWidth * itemCount + spacing + horizontalPadding
    } else if (direction === DIRECTION_COLUMN) {
        height = itemHeight * itemCount + spacing + verticalPadding
    }

    return { width, height, padding }
}
