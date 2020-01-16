/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { isNumber, isPlainObject } from 'lodash'
import { LegendDirection, LegendAnchor, LegendItemDirection, LegendPadding } from './props'

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
}: {
    direction: LegendDirection
    itemsSpacing: number
    padding: LegendPadding
    itemCount: number
    itemWidth: number
    itemHeight: number
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
        throw new TypeError(`Invalid padding property, must be one of: number, object`)
    }

    const horizontalPadding = padding.left + padding.right
    const verticalPadding = padding.top + padding.bottom
    let width = itemWidth + horizontalPadding
    let height = itemHeight + verticalPadding
    const spacing = (itemCount - 1) * itemsSpacing
    if (direction === 'row') {
        width = itemWidth * itemCount + spacing + horizontalPadding
    } else if (direction === 'column') {
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
}: {
    anchor: LegendAnchor
    translateX: number
    translateY: number
    containerWidth: number
    containerHeight: number
    width: number
    height: number
}) => {
    let x = translateX
    let y = translateY

    switch (anchor) {
        case 'top':
            x += (containerWidth - width) / 2
            break

        case 'top-right':
            x += containerWidth - width
            break

        case 'right':
            x += containerWidth - width
            y += (containerHeight - height) / 2
            break

        case 'bottom-right':
            x += containerWidth - width
            y += containerHeight - height
            break

        case 'bottom':
            x += (containerWidth - width) / 2
            y += containerHeight - height
            break

        case 'bottom-left':
            y += containerHeight - height
            break

        case 'left':
            y += (containerHeight - height) / 2
            break

        case 'center':
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
}: {
    direction: LegendItemDirection
    justify: boolean
    symbolSize: number
    symbolSpacing: number
    width: number
    height: number
}) => {
    let symbolX
    let symbolY

    let labelX
    let labelY
    let labelAnchor
    let labelAlignment

    switch (direction) {
        case 'left-to-right':
            symbolX = 0
            symbolY = (height - symbolSize) / 2

            labelY = height / 2
            labelAlignment = 'central'
            if (justify) {
                labelX = width
                labelAnchor = 'end'
            } else {
                labelX = symbolSize + symbolSpacing
                labelAnchor = 'start'
            }
            break

        case 'right-to-left':
            symbolX = width - symbolSize
            symbolY = (height - symbolSize) / 2

            labelY = height / 2
            labelAlignment = 'central'
            if (justify) {
                labelX = 0
                labelAnchor = 'start'
            } else {
                labelX = width - symbolSize - symbolSpacing
                labelAnchor = 'end'
            }
            break

        case 'top-to-bottom':
            symbolX = (width - symbolSize) / 2
            symbolY = 0

            labelX = width / 2

            labelAnchor = 'middle'
            if (justify) {
                labelY = height
                labelAlignment = 'alphabetic'
            } else {
                labelY = symbolSize + symbolSpacing
                labelAlignment = 'text-before-edge'
            }
            break

        case 'bottom-to-top':
            symbolX = (width - symbolSize) / 2
            symbolY = height - symbolSize

            labelX = width / 2
            labelAnchor = 'middle'
            if (justify) {
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
