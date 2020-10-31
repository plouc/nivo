/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { computeDimensions } from '../compute'
import {
    LegendDatum,
    LegendEffect,
    LegendMouseEventHandler,
    LegendPadding,
    LegendDirection,
    LegendItemDirection,
} from '../props'
import { LegendSvgItem } from './LegendSvgItem'
import { LegendSymbolShape } from './symbols'

export interface LegendSvgProps {
    data: LegendDatum[]
    x: number
    y: number
    direction: LegendDirection
    padding?: LegendPadding
    justify?: boolean
    itemsSpacing?: number
    itemWidth: number
    itemHeight: number
    itemDirection?: LegendItemDirection
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

export const LegendSvg = ({
    data,
    x,
    y,
    direction,
    padding: _padding = 0,
    justify = false,
    effects,
    itemWidth,
    itemHeight,
    itemDirection = 'left-to-right',
    itemsSpacing = 0,
    itemTextColor = '#000000',
    itemBackground = 'transparent',
    itemOpacity = 1,
    symbolShape,
    symbolSize,
    symbolSpacing,
    symbolBorderWidth,
    symbolBorderColor,
    onClick,
    onMouseEnter,
    onMouseLeave,
}: LegendSvgProps) => {
    const { padding } = computeDimensions({
        itemCount: data.length,
        itemWidth,
        itemHeight,
        itemsSpacing,
        direction,
        padding: _padding,
    })

    let xStep = 0
    let yStep = 0
    if (direction === 'row') {
        xStep = itemWidth + itemsSpacing
    } else {
        yStep = itemHeight + itemsSpacing
    }

    return (
        <g transform={`translate(${x},${y})`}>
            {data.map((datum, i) => (
                <LegendSvgItem
                    key={datum.id}
                    data={datum}
                    x={i * xStep + padding.left}
                    y={i * yStep + padding.top}
                    width={itemWidth}
                    height={itemHeight}
                    direction={itemDirection}
                    justify={justify}
                    effects={effects}
                    textColor={itemTextColor}
                    background={itemBackground}
                    opacity={itemOpacity}
                    symbolShape={symbolShape}
                    symbolSize={symbolSize}
                    symbolSpacing={symbolSpacing}
                    symbolBorderWidth={symbolBorderWidth}
                    symbolBorderColor={symbolBorderColor}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            ))}
        </g>
    )
}
