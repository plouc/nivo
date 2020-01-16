/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { computeDimensions, computePositionFromAnchor } from '../compute'
import {
    LegendDatum,
    LegendEffect,
    LegendMouseEventHandler,
    LegendPadding,
    LegendAnchor,
    LegendDirection,
    LegendItemDirection,
} from '../props'
import { LegendSvg } from './LegendSvg'
import { LegendSymbolShape } from './symbols'

export interface BoxLegendSvgProps {
    data: LegendDatum[]
    containerWidth: number
    containerHeight: number
    translateX?: number
    translateY?: number
    anchor: LegendAnchor
    direction: LegendDirection
    padding?: LegendPadding
    justify?: boolean
    itemWidth: number
    itemHeight: number
    itemDirection?: LegendItemDirection
    itemsSpacing?: number
    itemTextColor?: string
    itemBackground?: string
    itemOpacity?: number
    symbolShape?: LegendSymbolShape
    symbolSize?: number
    symbolSpacing?: number
    symbolBorderWidth?: number
    symbolBorderColor?: string
    onClick?: LegendMouseEventHandler
    onMouseEnter?: LegendMouseEventHandler
    onMouseLeave?: LegendMouseEventHandler
    effects?: LegendEffect[]
}

export const BoxLegendSvg = ({
    data,
    containerWidth,
    containerHeight,
    translateX = 0,
    translateY = 0,
    anchor,
    direction,
    padding = 0,
    justify,
    itemsSpacing = 0,
    itemWidth,
    itemHeight,
    itemDirection,
    itemTextColor,
    itemBackground,
    itemOpacity,
    symbolShape,
    symbolSize,
    symbolSpacing,
    symbolBorderWidth,
    symbolBorderColor,
    onClick,
    onMouseEnter,
    onMouseLeave,
    effects,
}: BoxLegendSvgProps) => {
    const { width, height } = computeDimensions({
        itemCount: data.length,
        itemsSpacing,
        itemWidth,
        itemHeight,
        direction,
        padding,
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

    return (
        <LegendSvg
            data={data}
            x={x}
            y={y}
            direction={direction}
            padding={padding}
            justify={justify}
            effects={effects}
            itemsSpacing={itemsSpacing}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            itemDirection={itemDirection}
            itemTextColor={itemTextColor}
            itemBackground={itemBackground}
            itemOpacity={itemOpacity}
            symbolShape={symbolShape}
            symbolSize={symbolSize}
            symbolSpacing={symbolSpacing}
            symbolBorderWidth={symbolBorderWidth}
            symbolBorderColor={symbolBorderColor}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    )
}
