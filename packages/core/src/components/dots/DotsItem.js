/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import DotsItemSymbol from './DotsItemSymbol'

const DotsItem = ({
    x,
    y,
    symbol,
    size,
    color,
    borderWidth,
    borderColor,
    label,
    labelTextAnchor,
    labelYOffset,
    theme,
}) => (
    <g transform={`translate(${x}, ${y})`} style={{ pointerEvents: 'none' }}>
        {React.createElement(symbol, {
            size: size,
            color: color,
            borderWidth: borderWidth,
            borderColor: borderColor,
        })}
        {label && (
            <text
                textAnchor={labelTextAnchor}
                y={labelYOffset}
                style={{
                    fontSize: theme.dots.fontSize,
                    fill: theme.dots.textColor,
                }}
            >
                {label}
            </text>
        )}
    </g>
)

DotsItem.propTypes = {
    // position
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,

    // style
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    symbol: PropTypes.func.isRequired,

    // label
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelTextAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
    labelYOffset: PropTypes.number.isRequired,

    // theming
    theme: PropTypes.shape({
        dots: PropTypes.shape({
            textColor: PropTypes.string.isRequired,
            fontSize: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}

export const DotsItemDefaultProps = {
    symbol: DotsItemSymbol,

    // label
    labelTextAnchor: 'middle',
    labelYOffset: -12,
}

DotsItem.defaultProps = DotsItemDefaultProps

export default pure(DotsItem)
