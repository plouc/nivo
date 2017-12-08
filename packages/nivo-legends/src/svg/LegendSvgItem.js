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
import { SymbolCircle, SymbolDiamond, SymbolSquare, SymbolTriangle } from './symbols'

const symbolByShape = {
    circle: SymbolCircle,
    diamond: SymbolDiamond,
    square: SymbolSquare,
    triangle: SymbolTriangle,
}

class LegendSvgItem extends Component {
    render() {
        const {
            x,
            y,
            width,
            height,
            symbolSize,
            symbolSpacing,
            symbolShape,
            label,
            fill,
            direction,
            justify,
        } = this.props

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
            <g transform={`translate(${x},${y})`}>
                <Symbol x={symbolX} y={symbolY} size={symbolSize} fill={fill} />
                <text
                    textAnchor={labelAnchor}
                    style={{ fill: 'black', alignmentBaseline: labelAlignment }}
                    x={labelX}
                    y={labelY}
                >
                    {label}
                </text>
            </g>
        )
    }

    static propTypes = {
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

        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        fill: PropTypes.string.isRequired,

        direction: PropTypes.oneOf([
            DIRECTION_LEFT_TO_RIGHT,
            DIRECTION_RIGHT_TO_LEFT,
            DIRECTION_TOP_TO_BOTTOM,
            DIRECTION_BOTTOM_TO_TOP,
        ]).isRequired,
        justify: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        direction: DIRECTION_LEFT_TO_RIGHT,
        justify: false,
        symbolSize: 16,
        symbolSpacing: 8,
        symbolShape: 'square',
    }
}

export default LegendSvgItem
