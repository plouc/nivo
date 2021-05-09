import { BoxLegendSvgProps, LegendAnchor, LegendItemDirection } from './types'

const isObject = <T>(item: unknown): item is T =>
    typeof item === 'object' && !Array.isArray(item) && item !== null

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
}: Pick<BoxLegendSvgProps, 'direction' | 'padding'> &
    Record<'itemsSpacing' | 'itemCount' | 'itemWidth' | 'itemHeight', number>) => {
    if (typeof _padding !== 'number' && !isObject(_padding)) {
        throw new Error('Invalid property padding, must be one of: number, object')
    }

    const padding =
        typeof _padding === 'number'
            ? {
                  top: _padding,
                  right: _padding,
                  bottom: _padding,
                  left: _padding,
              }
            : {
                  ...zeroPadding,
                  ..._padding,
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
}: { anchor: LegendAnchor } & Record<
    'translateX' | 'translateY' | 'containerWidth' | 'containerHeight' | 'width' | 'height',
    number
>) => {
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
} & Record<'symbolSize' | 'symbolSpacing' | 'width' | 'height', number>) => {
    let symbolX
    let symbolY

    let labelX
    let labelY
    let labelAnchor: 'start' | 'middle' | 'end'
    let labelAlignment: 'alphabetic' | 'central' | 'text-before-edge'

    switch (direction) {
        case 'left-to-right':
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

        case 'right-to-left':
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

        case 'top-to-bottom':
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

        case 'bottom-to-top':
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
