import React from 'react'
import { SymbolProps } from './types'

export const SymbolTriangle = ({
    x,
    y,
    size,
    fill,
    borderWidth = 0,
    borderColor = 'transparent',
}: SymbolProps) => {
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
