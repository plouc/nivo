/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    DIRECTION_LEFT_TO_RIGHT,
    DIRECTION_RIGHT_TO_LEFT,
    DIRECTION_TOP_TO_BOTTOM,
    DIRECTION_BOTTOM_TO_TOP,
} from '../constants'
import { symbolPropTypes, interactivityPropTypes } from '../props'
import { computeItemLayout } from '../compute'
import { SymbolCircle, SymbolDiamond, SymbolSquare, SymbolTriangle } from './symbols'

const symbolByShape = {
    circle: SymbolCircle,
    diamond: SymbolDiamond,
    square: SymbolSquare,
    triangle: SymbolTriangle,
}

export default class LegendSvgItem extends Component {
    static propTypes = {
        data: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            fill: PropTypes.string,
        }).isRequired,

        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,

        textColor: PropTypes.string,
        background: PropTypes.string,
        opacity: PropTypes.number,

        direction: PropTypes.oneOf([
            DIRECTION_LEFT_TO_RIGHT,
            DIRECTION_RIGHT_TO_LEFT,
            DIRECTION_TOP_TO_BOTTOM,
            DIRECTION_BOTTOM_TO_TOP,
        ]).isRequired,
        justify: PropTypes.bool.isRequired,

        ...symbolPropTypes,
        ...interactivityPropTypes,
    }

    static defaultProps = {
        direction: DIRECTION_LEFT_TO_RIGHT,
        justify: false,

        textColor: 'black',
        background: 'transparent',
        opacity: 1,

        // symbol
        symbolSize: 16,
        symbolSpacing: 8,
        symbolShape: 'square',
        symbolBorderWidth: 0,
        symbolBorderColor: 'transparent',

        effects: [],
    }

    state = {
        style: {},
    }

    handleClick = event => {
        const { onClick, data } = this.props

        if (onClick === undefined) return
        onClick(data, event)
    }

    handleMouseEnter = event => {
        const { onMouseEnter, data, effects } = this.props

        if (effects.length > 0) {
            const applyEffects = effects.filter(({ on }) => on === 'hover')
            const style = applyEffects.reduce(
                (acc, effect) => ({
                    ...acc,
                    ...effect.style,
                }),
                {}
            )
            this.setState({ style })
        }

        if (onMouseEnter === undefined) return
        onMouseEnter(data, event)
    }

    handleMouseLeave = () => {
        const { onMouseLeave, data, effects } = this.props

        if (effects.length > 0) {
            const applyEffects = effects.filter(({ on }) => on !== 'hover')
            const style = applyEffects.reduce(
                (acc, effect) => ({
                    ...acc,
                    ...effect.style,
                }),
                {}
            )
            this.setState({ style })
        }

        if (onMouseLeave === undefined) return
        onMouseLeave(data, event)
    }

    render() {
        const {
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
            // symbol
            symbolSize,
            symbolSpacing,
            symbolShape,
            symbolBorderWidth,
            symbolBorderColor,
            // interactivity
            onClick,
            onMouseEnter,
            onMouseLeave,
        } = this.props
        const { style } = this.state

        const { symbolX, symbolY, labelX, labelY, labelAnchor, labelAlignment } = computeItemLayout(
            {
                direction,
                justify,
                symbolSize: style.symbolSize || symbolSize,
                symbolSpacing,
                width,
                height,
            }
        )

        const isInteractive = [onClick, onMouseEnter, onMouseLeave].some(
            handler => handler !== undefined
        )

        const Symbol = symbolByShape[symbolShape]

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
                    onClick={this.handleClick}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                />
                <Symbol
                    x={symbolX}
                    y={symbolY}
                    size={style.symbolSize || symbolSize}
                    fill={data.fill}
                    borderWidth={
                        style.symbolBorderWidth !== undefined
                            ? style.symbolBorderWidth
                            : symbolBorderWidth
                    }
                    borderColor={style.symbolBorderColor || symbolBorderColor}
                />
                <text
                    textAnchor={labelAnchor}
                    style={{
                        fill: style.itemTextColor || textColor,
                        alignmentBaseline: labelAlignment,
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
}
