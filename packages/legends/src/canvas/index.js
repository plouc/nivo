/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { computeDimensions, computePositionFromAnchor, computeItemLayout } from '../compute'
import BoxLegendSvg from '../svg/BoxLegendSvg'
import LegendSvg from '../svg/LegendSvg'
import LegendSvgItem from '../svg/LegendSvgItem'
import { DIRECTION_COLUMN, DIRECTION_ROW } from '../constants'

const textPropsMapping = {
    align: {
        start: 'left',
        middle: 'center',
        end: 'right',
    },
    baseline: {
        hanging: 'top',
        middle: 'middle',
        central: 'middle',
        baseline: 'bottom',
    },
}

export const renderLegendToCanvas = (
    ctx,
    {
        data,

        containerWidth,
        containerHeight,
        translateX = BoxLegendSvg.defaultProps.translateX,
        translateY = BoxLegendSvg.defaultProps.translateY,
        anchor,
        direction,
        padding: _padding = LegendSvg.defaultProps.padding,
        justify = LegendSvgItem.defaultProps.justify,

        // items
        itemsSpacing = LegendSvg.defaultProps.itemsSpacing,
        itemWidth,
        itemHeight,
        itemDirection = LegendSvgItem.defaultProps.direction,
        itemTextColor = LegendSvg.defaultProps.textColor,

        // symbol
        symbolSize = LegendSvgItem.defaultProps.symbolSize,
        symbolSpacing = LegendSvgItem.defaultProps.symbolSpacing,
        // @todo add support for shapes
        // symbolShape = LegendSvgItem.defaultProps.symbolShape,

        theme,
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
    if (direction === DIRECTION_ROW) {
        xStep = itemWidth + itemsSpacing
    } else if (direction === DIRECTION_COLUMN) {
        yStep = itemHeight + itemsSpacing
    }

    ctx.save()
    ctx.translate(x, y)

    ctx.font = `${theme.legends.text.fontSize}px ${theme.legends.text.fontFamily || 'sans-serif'}`

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
        ctx.fillStyle = itemTextColor || theme.legends.text.fill
        ctx.fillText(d.label, itemX + labelX, itemY + labelY)
    })

    ctx.restore()
}
