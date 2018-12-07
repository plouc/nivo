/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { computeDimensions, computePositionFromAnchor, computeItemLayout } from '../compute'
import { LegendSvgItem } from '../svg/LegendSvgItem'
import { Direction } from '../props'

const textPropsMapping = {
    align: {
        start: 'left',
        middle: 'center',
        end: 'right',
    },
    baseline: {
        hanging: 'top',
        middle: 'middle',
        baseline: 'bottom',
    },
}

export const renderLegendToCanvas = (
    ctx: CanvasRenderingContext2D,
    {
        data,
        containerWidth,
        containerHeight,
        translateX = 0,
        translateY = 0,
        anchor,
        direction,
        padding: _padding = 0,
        justify = false,
        itemsSpacing = 0,
        itemWidth,
        itemHeight,
        itemDirection = LegendSvgItem.defaultProps.direction,
        itemTextColor = '#000000',
        symbolSize = LegendSvgItem.defaultProps.symbolSize,
        symbolSpacing = LegendSvgItem.defaultProps.symbolSpacing,
        // @todo add support for shapes
        // symbolShape = LegendSvgItem.defaultProps.symbolShape,
    }
) => {
    const { width, height, padding } = computeDimensions({
        itemCount: data.length,
        itemWidth,
        itemHeight,
        itemsSpacing,
        direction,
        padding: _padding,
    })

    const { x, y } = computePositionFromAnchor({
        anchor,
        translateX,
        translateY,
        containerWidth,
        containerHeight,
        width,
        height,
    })

    let xStep = 0
    let yStep = 0
    if (direction === Direction.Row) {
        xStep = itemWidth + itemsSpacing
    } else if (direction === Direction.Column) {
        yStep = itemHeight + itemsSpacing
    }

    ctx.save()
    ctx.translate(x, y)

    data.forEach((d, i) => {
        const itemX = i * xStep + padding.left
        const itemY = i * yStep + padding.top

        const { symbolX, symbolY, labelX, labelY, labelAnchor, labelAlignment } = computeItemLayout(
            {
                direction: itemDirection,
                justify,
                symbolSize,
                symbolSpacing,
                width: itemWidth,
                height: itemHeight,
            }
        )

        ctx.fillStyle = d.color
        ctx.fillRect(itemX + symbolX, itemY + symbolY, symbolSize, symbolSize)

        ctx.textAlign = textPropsMapping.align[labelAnchor]
        ctx.textBaseline = textPropsMapping.baseline[labelAlignment]
        ctx.fillStyle = itemTextColor
        ctx.fillText(d.label, itemX + labelX, itemY + labelY)
    })

    ctx.restore()
}
