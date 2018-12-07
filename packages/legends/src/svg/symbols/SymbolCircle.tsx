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

export const SymbolCircle: React.SFC<SymbolProps> = React.memo(
    ({
        x,
        y,
        size,
        fill,
        borderWidth = symbolDefaultProps.borderWidth,
        borderColor = symbolDefaultProps.borderColor,
    }) => {
        return (
            <circle
                r={size / 2}
                cx={x + size / 2}
                cy={y + size / 2}
                fill={fill}
                strokeWidth={borderWidth}
                stroke={borderColor}
                style={{
                    pointerEvents: 'none',
                }}
            />
        )
    }
)

SymbolCircle.propTypes = { ...symbolPropTypes }
