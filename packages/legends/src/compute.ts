/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { isNumber, isPlainObject } from 'lodash'
import { LegendAnchor, LegendDirection, LegendItemDirection } from './props'

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
}: {
    itemCount: number
    itemWidth: number
    itemHeight: number
    direction: LegendDirection
    itemsSpacing: number
    padding: any
}): {
    width: number
    height: number
    padding: {
        top: number
        right: number
        bottom: number
        left: number
    }
} => {
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
    const spacing = (itemCount - 1) * itemsSpacing
    if (direction === LegendDirection.Row) {
        width = itemWidth * itemCount + spacing + horizontalPadding
    } else if (direction === LegendDirection.Column) {
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
        case LegendAnchor.Top:
            x += (containerWidth - width) / 2
            break

        case LegendAnchor.TopRight:
            x += containerWidth - width
            break

        case LegendAnchor.Right:
            x += containerWidth - width
            y += (containerHeight - height) / 2
            break

        case LegendAnchor.BottomRight:
            x += containerWidth - width
            y += containerHeight - height
            break

        case LegendAnchor.Bottom:
            x += (containerWidth - width) / 2
            y += containerHeight - height
            break

        case LegendAnchor.BottomLeft:
            y += containerHeight - height
            break

        case LegendAnchor.Left:
            y += (containerHeight - height) / 2
            break

        case LegendAnchor.Center:
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
        case LegendItemDirection.LeftToRight:
            symbolX = 0
            symbolY = (height - symbolSize) / 2

            labelY = height / 2
            labelAlignment = 'middle'
            if (justify === true) {
                labelX = width
                labelAnchor = 'end'
            } else {
                labelX = symbolSize + symbolSpacing
                labelAnchor = 'start'
            }
            break

        case LegendItemDirection.RightToLeft:
            symbolX = width - symbolSize
            symbolY = (height - symbolSize) / 2

            labelY = height / 2
            labelAlignment = 'middle'
            if (justify === true) {
                labelX = 0
                labelAnchor = 'start'
            } else {
                labelX = width - symbolSize - symbolSpacing
                labelAnchor = 'end'
            }
            break

        case LegendItemDirection.TopToBottom:
            symbolX = (width - symbolSize) / 2
            symbolY = 0

            labelX = width / 2

            labelAnchor = 'middle'
            if (justify === true) {
                labelY = height
                labelAlignment = 'baseline'
            } else {
                labelY = symbolSize + symbolSpacing
                labelAlignment = 'hanging'
            }
            break

        case LegendItemDirection.BottomToTop:
            symbolX = (width - symbolSize) / 2
            symbolY = height - symbolSize

            labelX = width / 2
            labelAnchor = 'middle'
            if (justify === true) {
                labelY = 0
                labelAlignment = 'hanging'
            } else {
                labelY = height - symbolSize - symbolSpacing
                labelAlignment = 'baseline'
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
