import React from 'react'
import { SymbolProps } from './types'

export const SymbolCircle = ({
    x,
    y,
    size,
    fill,
    borderWidth = 0,
    borderColor = 'transparent',
}: SymbolProps) => {
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
