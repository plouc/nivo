/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash/isFunction'
import { useTheme } from '@nivo/core'
import { datumPropType, symbolPropTypes, interactivityPropTypes } from '../props'
import { computeItemLayout } from '../compute'
import { SymbolCircle, SymbolDiamond, SymbolSquare, SymbolTriangle } from './symbols'

const symbolByShape = {
    circle: SymbolCircle,
    diamond: SymbolDiamond,
    square: SymbolSquare,
    triangle: SymbolTriangle,
}

const LegendSvgItem = ({
    x,
    y,
    width,
    height,
    data,
    direction,
    justify,
    textColor,
    background,
    opacity,

    symbolShape,
    symbolSize,
    symbolSpacing,
    symbolBorderWidth,
    symbolBorderColor,

    onClick,
    onMouseEnter,
    onMouseLeave,

    effects,
}) => {
    const [style, setStyle] = useState({})
    const theme = useTheme()

    const handleClick = useCallback(event => onClick && onClick(data, event), [onClick, data])
    const handleMouseEnter = useCallback(
        event => {
            if (effects.length > 0) {
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

            if (onMouseEnter === undefined) return
            onMouseEnter(data, event)
        },
        [onMouseEnter, data, effects]
    )
    const handleMouseLeave = useCallback(() => {
        if (effects.length > 0) {
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

        if (onMouseLeave === undefined) return
        onMouseLeave(data, event)
    }, [onMouseLeave, data, effects])

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

    let Symbol
    if (isFunction(symbolShape)) {
        Symbol = symbolShape
    } else {
        Symbol = symbolByShape[symbolShape]
    }

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
            {React.createElement(Symbol, {
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
                    fill: style.itemTextColor || theme.legends.text.fill || textColor,
                    dominantBaseline: labelAlignment,
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
                x={labelX}
                y={labelY}
            >
                {data.label}
            </text>
        </g>
    )
}

LegendSvgItem.displayName = 'LegendSvgItem'
LegendSvgItem.propTypes = {
    data: datumPropType.isRequired,

    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    textColor: PropTypes.string,
    background: PropTypes.string,
    opacity: PropTypes.number,

    direction: PropTypes.oneOf(['left-to-right', 'right-to-left', 'top-to-bottom', 'bottom-to-top'])
        .isRequired,
    justify: PropTypes.bool.isRequired,

    ...symbolPropTypes,
    ...interactivityPropTypes,
}
LegendSvgItem.defaultProps = {
    direction: 'left-to-right',
    justify: false,

    textColor: 'black',
    background: 'transparent',
    opacity: 1,

    symbolShape: 'square',
    symbolSize: 16,
    symbolSpacing: 8,
    symbolBorderWidth: 0,
    symbolBorderColor: 'transparent',

    effects: [],
}

export default LegendSvgItem
