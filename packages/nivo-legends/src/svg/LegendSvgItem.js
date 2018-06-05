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
import { computeItemLayout } from '../compute'
import {
    SymbolCircle,
    SymbolDiamond,
    SymbolHalfCircle,
    SymbolSquare,
    SymbolTriangle,
} from './symbols'
import { legendEffectsProp } from '../props'

const symbolByShape = {
    circle: SymbolCircle,
    diamond: SymbolDiamond,
    halfCircle: SymbolHalfCircle,
    square: SymbolSquare,
    triangle: SymbolTriangle,
}

class LegendSvgItem extends Component {
    static propTypes = {
        data: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            color: PropTypes.string.isRequired,
            fill: PropTypes.string,
        }).isRequired,

        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,

        symbolSize: PropTypes.number.isRequired,
        symbolSpacing: PropTypes.number.isRequired,
        symbolShape: PropTypes.oneOfType([
            PropTypes.oneOf(Object.keys(symbolByShape)),
            PropTypes.func,
        ]).isRequired,
        symbolBorderWidth: PropTypes.number.isRequired,
        symbolBorderColor: PropTypes.string.isRequired,
        background: PropTypes.string,
        opacity: PropTypes.number.isRequired,
        textColor: PropTypes.string.isRequired,

        direction: PropTypes.oneOf([
            DIRECTION_LEFT_TO_RIGHT,
            DIRECTION_RIGHT_TO_LEFT,
            DIRECTION_TOP_TO_BOTTOM,
            DIRECTION_BOTTOM_TO_TOP,
        ]).isRequired,
        justify: PropTypes.bool.isRequired,

        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,

        effects: legendEffectsProp.isRequired,
    }

    static defaultProps = {
        direction: DIRECTION_LEFT_TO_RIGHT,
        justify: false,
        symbolSize: 16,
        symbolSpacing: 8,
        symbolShape: 'square',
        opacity: 1,
        symbolBorderWidth: 0,
        symbolBorderColor: '#333333',
        effects: [],
    }

    constructor(props) {
        super(props)

        this.state = {
            style: {},
        }
    }

    handleClick = event => {
        const { onClick, data } = this.props
        if (!onClick) return

        onClick(data, event)
    }

    handleMouseEnter = event => {
        const { onMouseEnter, data, effects } = this.props

        const hoverEffects = effects.filter(effect => effect.match === 'hover')
        if (hoverEffects.length > 0) {
            const style = hoverEffects.reduce(
                (acc, effect) => ({
                    ...acc,
                    ...effect.style,
                }),
                {}
            )

            this.setState({ style })
        }

        if (!onMouseEnter) return
        onMouseEnter(data, event)
    }

    handleMouseLeave = () => {
        this.setState({ style: {} })

        const { onMouseLeave, data } = this.props
        if (!onMouseLeave) return

        onMouseLeave(data, event)
    }

    render() {
        const {
            data,
            x,
            y,
            width,
            height,
            symbolSize,
            symbolSpacing,
            symbolShape,
            symbolBorderWidth,
            symbolBorderColor,
            background,
            opacity,
            textColor,
            direction,
            justify,
        } = this.props
        const { style } = this.state

        const { symbolX, symbolY, labelX, labelY, labelAnchor, labelAlignment } = computeItemLayout(
            {
                direction,
                justify,
                symbolSize,
                symbolSpacing,
                width,
                height,
            }
        )

        const Symbol = symbolByShape[symbolShape]

        return (
            <g
                transform={`translate(${x},${y})`}
                style={{ opacity: style.opacity !== undefined ? style.opacity : opacity }}
            >
                <rect
                    width={width}
                    height={height}
                    fill={style.background || background || 'transparent'}
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={this.handleClick}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                />
                <Symbol
                    x={symbolX}
                    y={symbolY}
                    size={symbolSize}
                    fill={data.fill || data.color}
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
                        fill: style.textColor || textColor,
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

export default LegendSvgItem
