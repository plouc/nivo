/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import * as PropTypes from 'prop-types'
import { DotsTheme, dotsThemePropType } from '../../theming'
import DotsItemSymbol from './DotsItemSymbol'

export const DotsItemDefaultProps = {
    symbol: DotsItemSymbol,
    labelTextAnchor: 'middle',
    labelYOffset: -12,
}

export interface DotsItemProps {
    x: number
    y: number
    size: number
    color: string
    borderWidth: number
    borderColor: string
    symbol?: React.FunctionComponent<{
        size: number
        color: string
        borderWidth: number
        borderColor: string
    }>
    label: string | number
    labelTextAnchor?: string
    labelYOffset?: number
    theme: {
        dots?: DotsTheme
    }
}

const DotsItem: React.SFC<DotsItemProps> = React.memo<DotsItemProps>(
    ({
        x,
        y,
        symbol = DotsItemDefaultProps.symbol,
        size,
        color,
        borderWidth,
        borderColor,
        label,
        labelTextAnchor = DotsItemDefaultProps.labelTextAnchor,
        labelYOffset = DotsItemDefaultProps.labelYOffset,
        theme,
    }) => (
        <g transform={`translate(${x}, ${y})`} style={{ pointerEvents: 'none' }}>
            {React.createElement(symbol, {
                size,
                color,
                borderWidth,
                borderColor,
            })}
            {label && (
                <text textAnchor={labelTextAnchor} y={labelYOffset} style={theme.dots.text}>
                    {label}
                </text>
            )}
        </g>
    )
)

export default DotsItem

DotsItem.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    symbol: PropTypes.func.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelTextAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
    labelYOffset: PropTypes.number.isRequired,
    theme: PropTypes.shape({
        dots: dotsThemePropType.isRequired,
    }).isRequired,
}
