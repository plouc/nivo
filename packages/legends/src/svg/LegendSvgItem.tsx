/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback, MouseEvent } from 'react'
import { isFunction } from 'lodash'
import { useTheme } from '@nivo/core'
import { computeItemLayout } from '../compute'
import { LegendDatum, LegendEffect, LegendMouseEventHandler, LegendItemDirection } from '../props'
import { LegendSymbolShape, symbolByShape } from './symbols'

export interface LegendSvgItemProps {
    data: LegendDatum
    x: number
    y: number
    width: number
    height: number
    textColor?: string
    background?: string
    opacity?: number
    direction?: LegendItemDirection
    justify?: boolean
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

export const LegendSvgItem = ({
    x,
    y,
    width,
    height,
    data,
    direction = 'left-to-right',
    justify = false,
    textColor = '#000000',
    background = 'transparent',
    opacity = 1,
    symbolShape = 'square',
    symbolSize = 16,
    symbolSpacing = 8,
    symbolBorderWidth = 0,
    symbolBorderColor = 'transparent',
    onClick,
    onMouseEnter,
    onMouseLeave,
    effects = [],
}: LegendSvgItemProps) => {
    const [style, setStyle] = useState<LegendEffect['style']>({})
    const theme = useTheme()

    const handleClick = useCallback(event => onClick && onClick(data, event), [onClick, data])
    const handleMouseEnter = useCallback(
        (event: MouseEvent) => {
            if (effects.length > 0) {
                const applyEffects = effects.filter(({ on }) => on === 'hover')
                const enterStyle = applyEffects.reduce(
                    (acc: LegendEffect['style'], effect) => ({
                        ...acc,
                        ...effect.style,
                    }),
                    {}
                )
                setStyle(enterStyle)
            }

            if (onMouseEnter === undefined) {
                return
            }
            onMouseEnter(data, event)
        },
        [onMouseEnter, data, effects]
    )
    const handleMouseLeave = useCallback(
        (event: MouseEvent) => {
            if (effects.length > 0) {
                const applyEffects = effects.filter(({ on }) => on !== 'hover')
                const leaveStyle = applyEffects.reduce(
                    (acc: LegendEffect['style'], effect) => ({
                        ...acc,
                        ...effect.style,
                    }),
                    {}
                )
                setStyle(leaveStyle)
            }

            if (onMouseLeave === undefined) {
                return
            }
            onMouseLeave(data, event)
        },
        [onMouseLeave, data, effects]
    )

    const { symbolX, symbolY, labelX, labelY, labelAnchor, labelAlignment } = computeItemLayout({
        direction,
        justify,
        symbolSize: style.symbolSize || symbolSize,
        symbolSpacing,
        width,
        height,
    })

    const isInteractive = [onClick, onMouseEnter, onMouseLeave].some(
        handler => handler !== undefined
    )

    const symbol = isFunction(symbolShape) ? symbolShape : symbolByShape[symbolShape]

    return (
        <g
            transform={`translate(${x},${y})`}
            style={{
                opacity: style.itemOpacity !== undefined ? style.itemOpacity : opacity,
            }}
        >
            <rect
                width={width}
                height={height}
                fill={style.itemBackground || background}
                style={{
                    cursor: isInteractive ? 'pointer' : 'auto',
                }}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            {React.createElement(symbol, {
                id: data.id,
                x: symbolX,
                y: symbolY,
                size: style.symbolSize || symbolSize,
                fill: data.fill || data.color,
                borderWidth:
                    style.symbolBorderWidth !== undefined
                        ? style.symbolBorderWidth
                        : symbolBorderWidth,
                borderColor: style.symbolBorderColor || symbolBorderColor,
            })}
            <text
                textAnchor={labelAnchor}
                style={{
                    ...theme.legends.text,
                    fill: style.itemTextColor || textColor,
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
                dominantBaseline={labelAlignment}
                x={labelX}
                y={labelY}
            >
                {data.label}
            </text>
        </g>
    )
}
