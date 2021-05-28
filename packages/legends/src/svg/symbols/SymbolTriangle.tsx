import React from 'react'
import { SymbolProps } from './types'

export const SymbolTriangle = ({
    x,
    y,
    size,
    fill,
    opacity = 1,
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
                opacity={opacity}
                strokeWidth={borderWidth}
                stroke={borderColor}
                style={{
                    pointerEvents: 'none',
                }}
            />
        </g>
    )
}
