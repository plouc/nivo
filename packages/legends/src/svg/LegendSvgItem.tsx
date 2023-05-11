import { useState, useCallback } from 'react'
import * as React from 'react'
import { useTheme } from '@nivo/theming'
import { LegendSvgItemProps } from '../types'
import { computeItemLayout } from '../compute'
import { SymbolCircle, SymbolDiamond, SymbolSquare, SymbolTriangle } from './symbols'

type Style = Partial<{
    itemBackground: string
    itemOpacity: number
    itemTextColor: string
    symbolBorderColor: string
    symbolBorderWidth: number
    symbolSize: number
}>

const symbolByShape = {
    circle: SymbolCircle,
    diamond: SymbolDiamond,
    square: SymbolSquare,
    triangle: SymbolTriangle,
}

export const LegendSvgItem = ({
    x,
    y,
    width,
    height,
    data,
    direction = 'left-to-right',
    justify = false,
    textColor,
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
    toggleSerie,

    effects,
}: LegendSvgItemProps) => {
    const [style, setStyle] = useState<Style>({})
    const theme = useTheme()

    const handleMouseEnter = useCallback(
        (event: React.MouseEvent<SVGRectElement>) => {
            if (effects) {
                const applyEffects = effects.filter(({ on }) => on === 'hover')
                const style = applyEffects.reduce(
                    (acc, effect) => ({
                        ...acc,
                        ...effect.style,
                    }),
                    {}
                )
                setStyle(style)
            }

            onMouseEnter?.(data, event)
        },
        [onMouseEnter, data, effects]
    )
    const handleMouseLeave = useCallback(
        (event: React.MouseEvent<SVGRectElement>) => {
            if (effects) {
                const applyEffects = effects.filter(({ on }) => on !== 'hover')
                const style = applyEffects.reduce(
                    (acc, effect) => ({
                        ...acc,
                        ...effect.style,
                    }),
                    {}
                )
                setStyle(style)
            }

            onMouseLeave?.(data, event)
        },
        [onMouseLeave, data, effects]
    )

    const { symbolX, symbolY, labelX, labelY, labelAnchor, labelAlignment } = computeItemLayout({
        direction,
        justify,
        symbolSize: style.symbolSize ?? symbolSize,
        symbolSpacing,
        width,
        height,
    })

    const isInteractive = [onClick, onMouseEnter, onMouseLeave, toggleSerie].some(
        handler => handler !== undefined
    )

    const SymbolShape = typeof symbolShape === 'function' ? symbolShape : symbolByShape[symbolShape]

    return (
        <g
            transform={`translate(${x},${y})`}
            style={{
                opacity: style.itemOpacity ?? opacity,
            }}
        >
            <rect
                width={width}
                height={height}
                fill={style.itemBackground ?? background}
                style={{
                    cursor: isInteractive ? 'pointer' : 'auto',
                }}
                onClick={event => {
                    onClick?.(data, event)
                    toggleSerie?.(data.id)
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            {React.createElement(SymbolShape, {
                id: data.id,
                x: symbolX,
                y: symbolY,
                size: style.symbolSize ?? symbolSize,
                fill: data.fill ?? data.color ?? 'black',
                borderWidth: style.symbolBorderWidth ?? symbolBorderWidth,
                borderColor: style.symbolBorderColor ?? symbolBorderColor,
                ...(data.hidden ? theme.legends.hidden.symbol : undefined),
            })}
            <text
                textAnchor={labelAnchor}
                style={{
                    ...theme.legends.text,
                    fill: style.itemTextColor ?? textColor ?? theme.legends.text.fill ?? 'black',
                    dominantBaseline: labelAlignment,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    ...(data.hidden ? theme.legends.hidden.text : undefined),
                }}
                x={labelX}
                y={labelY}
            >
                {data.label}
            </text>
        </g>
    )
}
