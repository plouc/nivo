/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import isNumber from 'lodash/isNumber'
import isPlainObject from 'lodash/isPlainObject'
import {
    ANCHOR_BOTTOM,
    ANCHOR_BOTTOM_LEFT,
    ANCHOR_BOTTOM_RIGHT,
    ANCHOR_CENTER,
    ANCHOR_LEFT,
    ANCHOR_RIGHT,
    ANCHOR_TOP,
    ANCHOR_TOP_RIGHT,
    DIRECTION_BOTTOM_TO_TOP,
    DIRECTION_COLUMN,
    DIRECTION_LEFT_TO_RIGHT,
    DIRECTION_RIGHT_TO_LEFT,
    DIRECTION_ROW,
    DIRECTION_TOP_TO_BOTTOM,
} from './constants'

const zeroPadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
}

export const computeDimensions = ({
    direction,
    itemsSpacing,
    padding: _padding,
    itemCount,
    itemWidth,
    itemHeight,
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

export const computePositionFromAnchor = ({
    anchor,
    translateX,
    translateY,
    containerWidth,
    containerHeight,
    width,
    height,
}) => {
    let x = translateX
    let y = translateY

    switch (anchor) {
        case ANCHOR_TOP:
            x += (containerWidth - width) / 2
            break

        case ANCHOR_TOP_RIGHT:
            x += containerWidth - width
            break

        case ANCHOR_RIGHT:
            x += containerWidth - width
            y += (containerHeight - height) / 2
            break

        case ANCHOR_BOTTOM_RIGHT:
            x += containerWidth - width
            y += containerHeight - height
            break

        case ANCHOR_BOTTOM:
            x += (containerWidth - width) / 2
            y += containerHeight - height
            break

        case ANCHOR_BOTTOM_LEFT:
            y += containerHeight - height
            break

        case ANCHOR_LEFT:
            y += (containerHeight - height) / 2
            break

        case ANCHOR_CENTER:
            x += (containerWidth - width) / 2
            y += (containerHeight - height) / 2
            break
    }

    return { x, y }
}

export const computeItemLayout = ({
    direction,
    justify,
    symbolSize,
    symbolSpacing,
    width,
    height,
}) => {
    let symbolX
    let symbolY

    let labelX
    let labelY
    let labelAnchor
    let labelAlignment

    switch (direction) {
        case DIRECTION_LEFT_TO_RIGHT:
            symbolX = 0
            symbolY = (height - symbolSize) / 2

            labelY = height / 2
            labelAlignment = 'central'
            if (justify === true) {
                labelX = width
                labelAnchor = 'end'
            } else {
                labelX = symbolSize + symbolSpacing
                labelAnchor = 'start'
            }
            break

        case DIRECTION_RIGHT_TO_LEFT:
            symbolX = width - symbolSize
            symbolY = (height - symbolSize) / 2

            labelY = height / 2
            labelAlignment = 'central'
            if (justify === true) {
                labelX = 0
                labelAnchor = 'start'
            } else {
                labelX = width - symbolSize - symbolSpacing
                labelAnchor = 'end'
            }
            break

        case DIRECTION_TOP_TO_BOTTOM:
            symbolX = (width - symbolSize) / 2
            symbolY = 0

            labelX = width / 2

            labelAnchor = 'middle'
            if (justify === true) {
                labelY = height
                labelAlignment = 'alphabetic'
            } else {
                labelY = symbolSize + symbolSpacing
                labelAlignment = 'text-before-edge'
            }
            break

        case DIRECTION_BOTTOM_TO_TOP:
            symbolX = (width - symbolSize) / 2
            symbolY = height - symbolSize

            labelX = width / 2
            labelAnchor = 'middle'
            if (justify === true) {
                labelY = 0
                labelAlignment = 'text-before-edge'
            } else {
                labelY = height - symbolSize - symbolSpacing
                labelAlignment = 'alphabetic'
            }
            break
    }

    return {
        symbolX,
        symbolY,

        labelX,
        labelY,
        labelAnchor,
        labelAlignment,
    }
}
