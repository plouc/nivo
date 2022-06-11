import { scaleLinear } from 'd3-scale'
import { getValueFormatter } from '@nivo/core'
import { computeContinuousColorScaleColorStops } from '@nivo/colors'
import {
    BoxLegendProps,
    ContinuousColorsLegendInnerSpec,
    LegendAnchor,
    LegendDatum,
    LegendData,
    LegendItemDirection,
} from './types'
import { continuousColorsLegendDefaults } from './defaults'

const isObject = <T>(item: unknown): item is T =>
    typeof item === 'object' && !Array.isArray(item) && item !== null

const zeroPadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
}

export const getLegendTitleDatum = (title: undefined | string): LegendDatum => ({
    id: '' + title,
    label: '' + title,
    symbol: null,
})

export const computeDimensions = ({
    direction,
    itemsSpacing,
    padding: _padding,
    itemWidth,
    itemHeight,
    data,
}: Pick<BoxLegendProps, 'direction' | 'padding'> &
    Record<'itemsSpacing' | 'itemWidth' | 'itemHeight', number> & { data: LegendData }) => {
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

    // basic distance between adjacent items
    const baseStep = direction === 'row' ? itemWidth + itemsSpacing : itemHeight + itemsSpacing
    // compare i-th item to (i-1)-th item
    // calculate additional spacing to accommodate large symbols
    const baseSpacing = direction === 'row' ? itemWidth : itemHeight
    const additionalSpacing = data.slice(1).map((datum, i) => {
        const interDistance = (datum.size ?? 0) + (data[i].size ?? 0)
        return Math.max(0, interDistance / 2 - baseSpacing)
    })
    const lastDatumSize = data[data.length - 1]?.size ?? 0
    additionalSpacing.push(Math.max(0, lastDatumSize / 2 - baseSpacing / 2))

    let x = padding.left
    let y = padding.top
    const itemCoordinates = Array<[number, number]>()
    if (direction === 'row') {
        additionalSpacing.forEach(v => {
            itemCoordinates.push([x, y])
            x += baseStep + v
        })
    } else {
        additionalSpacing.forEach(v => {
            itemCoordinates.push([x, y])
            y += baseStep + v
        })
    }

    const width = x + padding.right + (direction === 'column' ? itemWidth : 0)
    const height = y + padding.bottom + (direction === 'row' ? itemHeight : 0)

    return { width, height, padding, itemCoordinates }
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

export const computeContinuousColorsLegend = ({
    scale,
    ticks,
    length = continuousColorsLegendDefaults.length,
    thickness = continuousColorsLegendDefaults.thickness,
    direction = continuousColorsLegendDefaults.direction,
    tickPosition = continuousColorsLegendDefaults.tickPosition,
    tickSize = continuousColorsLegendDefaults.tickSize,
    tickSpacing = continuousColorsLegendDefaults.tickSpacing,
    tickOverlap = continuousColorsLegendDefaults.tickOverlap,
    tickFormat = continuousColorsLegendDefaults.tickFormat,
    title,
    titleAlign = continuousColorsLegendDefaults.titleAlign,
    titleOffset = continuousColorsLegendDefaults.titleOffset,
}: ContinuousColorsLegendInnerSpec) => {
    // left to right for `row`, bottom to top for `column`
    const domain = direction === 'column' ? [...scale.domain()].reverse() : scale.domain()

    const positionScale = scaleLinear().domain(domain)
    if (domain.length === 2) {
        // sequential, quantize
        positionScale.range([0, length])
    } else if (domain.length === 3) {
        // diverging
        positionScale.range([0, length / 2, length])
    }

    let values: number[]
    if ('thresholds' in scale) {
        // quantize
        values = [domain[0], ...scale.thresholds(), domain[1]]
    } else {
        // sequential, diverging
        // typescript definitions for ScaleSequential and ScaleDiverging claim that those objects
        // do not have a ticks() property. However, the actual objects produced by d3-scale do
        // have it. Suppress ts checks here until the discrepancy is resolved.
        // @ts-ignore
        values = scale.ticks(ticks)
    }
    values = Array.isArray(ticks) ? ticks : values

    const colorStops = computeContinuousColorScaleColorStops(scale, 32)

    const formatValue = getValueFormatter(tickFormat)

    const computedTicks: {
        x1: number
        y1: number
        x2: number
        y2: number
        text: string
        textX: number
        textY: number
        textHorizontalAlign: 'start' | 'middle' | 'end'
        textVerticalAlign: 'alphabetic' | 'central' | 'hanging'
    }[] = []

    let width: number
    let height: number

    const gradientX1 = 0
    let gradientY1 = 0
    let gradientX2 = 0
    const gradientY2 = 0

    let titleX: number
    let titleY: number
    let titleRotation: number
    let titleVerticalAlign: 'alphabetic' | 'hanging'

    if (direction === 'row') {
        width = length
        height = thickness

        gradientX2 = 1

        let y1: number
        let y2: number

        let textY: number
        const textHorizontalAlign = 'middle'
        let textVerticalAlign: 'alphabetic' | 'hanging'

        titleRotation = 0
        if (titleAlign === 'start') {
            titleX = 0
        } else if (titleAlign === 'middle') {
            titleX = length / 2
        } else {
            titleX = length
        }

        if (tickPosition === 'before') {
            y1 = -tickSize
            y2 = tickOverlap ? thickness : 0

            textY = -tickSize - tickSpacing
            textVerticalAlign = 'alphabetic'

            titleY = thickness + titleOffset
            titleVerticalAlign = 'hanging'
        } else {
            y1 = tickOverlap ? 0 : thickness
            y2 = thickness + tickSize

            textY = y2 + tickSpacing
            textVerticalAlign = 'hanging'

            titleY = -titleOffset
            titleVerticalAlign = 'alphabetic'
        }

        values.forEach(value => {
            const x = positionScale(value)

            computedTicks.push({
                x1: x,
                y1,
                x2: x,
                y2,
                text: formatValue(value),
                textX: x,
                textY,
                textHorizontalAlign,
                textVerticalAlign,
            })
        })
    } else {
        width = thickness
        height = length

        gradientY1 = 1

        let x1: number
        let x2: number

        let textX: number
        let textHorizontalAlign: 'start' | 'end'
        const textVerticalAlign = 'central'

        titleRotation = -90
        if (titleAlign === 'start') {
            titleY = length
        } else if (titleAlign === 'middle') {
            titleY = length / 2
        } else {
            titleY = 0
        }

        if (tickPosition === 'before') {
            x1 = -tickSize
            x2 = tickOverlap ? thickness : 0

            textX = x1 - tickSpacing
            textHorizontalAlign = 'end'

            titleX = thickness + titleOffset
            titleVerticalAlign = 'hanging'
        } else {
            x1 = tickOverlap ? 0 : thickness
            x2 = thickness + tickSize

            textX = x2 + tickSpacing
            textHorizontalAlign = 'start'

            titleX = -titleOffset
            titleVerticalAlign = 'alphabetic'
        }

        values.forEach(value => {
            const y = positionScale(value)

            computedTicks.push({
                x1,
                y1: y,
                x2,
                y2: y,
                text: formatValue(value),
                textX,
                textY: y,
                textHorizontalAlign,
                textVerticalAlign,
            })
        })
    }

    return {
        width,
        height,
        gradientX1,
        gradientY1,
        gradientX2,
        gradientY2,
        colorStops,
        ticks: computedTicks,
        titleText: title,
        titleX,
        titleY,
        titleRotation,
        titleHorizontalAlign: titleAlign,
        titleVerticalAlign,
    }
}
