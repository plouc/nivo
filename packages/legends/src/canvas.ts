/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Theme } from '@nivo/core'
import { computeDimensions, computePositionFromAnchor, computeItemLayout } from './compute'
import {
    LegendAnchor,
    LegendDatum,
    LegendDirection,
    LegendItemDirection,
    LegendPadding,
} from './props'

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
        itemDirection = 'left-to-right',
        itemTextColor = '#000000',
        symbolSize = 16,
        symbolSpacing = 8,
        theme,
    }: {
        data: LegendDatum[]
        containerWidth: number
        containerHeight: number
        translateX?: number
        translateY?: number
        anchor: LegendAnchor
        direction: LegendDirection
        padding?: LegendPadding
        justify?: boolean
        itemsSpacing?: number
        itemWidth: number
        itemHeight: number
        itemDirection?: LegendItemDirection
        itemTextColor?: string
        symbolSize?: number
        symbolSpacing?: number
        theme: Theme
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
    if (direction === 'row') {
        xStep = itemWidth + itemsSpacing
    } else {
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

        ctx.textAlign = (textPropsMapping.align as any)[labelAnchor]
        ctx.textBaseline = (textPropsMapping.baseline as any)[labelAlignment]
        ctx.fillStyle = itemTextColor || (theme.legends.text.fill as string)
        ctx.fillText(`${d.label}`, itemX + labelX, itemY + labelY)
    })

    ctx.restore()
}
