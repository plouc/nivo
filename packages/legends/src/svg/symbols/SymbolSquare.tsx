import React from 'react'
import { SymbolProps } from './types'

export const SymbolSquare = ({
    x,
    y,
    size,
    fill,
    borderWidth = 0,
    borderColor = 'transparent',
}: SymbolProps) => {
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
