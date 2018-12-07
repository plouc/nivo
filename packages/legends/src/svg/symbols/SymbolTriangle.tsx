/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as React from 'react'
import { symbolPropTypes, symbolDefaultProps, SymbolProps } from './props'

export const SymbolTriangle: React.SFC<SymbolProps> = React.memo(
    ({
        x,
        y,
        size,
        fill,
        borderWidth = symbolDefaultProps.borderWidth,
        borderColor = symbolDefaultProps.borderColor,
    }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <path
                    d={`
            M${size / 2} 0
            L${size} ${size}
            L0 ${size}
            L${size / 2} 0
        `}
                    fill={fill}
                    strokeWidth={borderWidth}
                    stroke={borderColor}
                    style={{
                        pointerEvents: 'none',
                    }}
                />
            </g>
        )
    }
)

SymbolTriangle.propTypes = { ...symbolPropTypes }
