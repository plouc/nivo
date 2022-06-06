import { useState, useCallback } from 'react'
import * as React from 'react'
import { useTheme } from '@nivo/core'
import { BoxLegendItemProps, LegendDatum, SymbolShapeSvg } from '../types'
import { computeItemLayout } from '../compute'
import {
    SymbolCircleSvg,
    SymbolDiamondSvg,
    SymbolSquareSvg,
    SymbolTriangleSvg,
    SymbolInvertedTriangleSvg,
} from './symbols'
import { useInheritedColor } from '@nivo/colors'

type Style = Partial<{
    itemBackground: string
    itemOpacity: number
    itemTextColor: string
    symbolBorderColor: string
    symbolBorderWidth: number
    symbolSize: number
}>

const symbolByShape = {
    circle: SymbolCircleSvg,
    diamond: SymbolDiamondSvg,
    square: SymbolSquareSvg,
    triangle: SymbolTriangleSvg,
    invertedTriangle: SymbolInvertedTriangleSvg,
}

type BoxLegendSvgItemProps = Omit<BoxLegendItemProps, 'symbolShape'> & {
    symbolShape: SymbolShapeSvg
}

export const BoxLegendSvgItem = ({
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
}: BoxLegendSvgItemProps) => {
    const [style, setStyle] = useState<Style>({})
    const theme = useTheme()

    const getBorderColor = useInheritedColor<LegendDatum>(
        style.symbolBorderColor ?? symbolBorderColor,
        theme
    )

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

    const itemSize = style.symbolSize ?? symbolSize
    const { symbolX, symbolY, labelX, labelY, labelAnchor, labelAlignment } = computeItemLayout({
        direction,
        justify,
        symbolSize: itemSize,
        symbolSpacing,
        width,
        height,
    })

    const isInteractive =
        data.symbol !== null &&
        [onClick, onMouseEnter, onMouseLeave, toggleSerie].some(handler => handler !== undefined)

    const symbol = data.symbol ?? symbolShape
    const SymbolComponent = typeof symbol === 'function' ? symbol : symbolByShape[symbol]

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
            {data.symbol !== null
                ? React.createElement(SymbolComponent, {
                      id: data.id,
                      x: symbolX + itemSize / 2,
                      y: symbolY + itemSize / 2,
                      size: data.size ?? itemSize,
                      fill: data.fill ?? data.color ?? 'black',
                      borderWidth: style.symbolBorderWidth ?? symbolBorderWidth,
                      borderColor: getBorderColor(data),
                      ...(data.hidden ? theme.legends.hidden.symbol : undefined),
                  })
                : null}
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
                x={data.symbol === null ? symbolX : labelX}
                y={labelY}
            >
                {data.label}
            </text>
        </g>
    )
}
