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

export const SymbolSquare: React.SFC<SymbolProps> = React.memo(
    ({
        x,
        y,
        size,
        fill,
        borderWidth = symbolDefaultProps.borderWidth,
        borderColor = symbolDefaultProps.borderColor,
    }) => {
        return (
            <rect
                x={x}
                y={y}
                fill={fill}
                strokeWidth={borderWidth}
                stroke={borderColor}
                width={size}
                height={size}
                style={{
                    pointerEvents: 'none',
                }}
            />
        )
    }
)

SymbolSquare.propTypes = { ...symbolPropTypes }
