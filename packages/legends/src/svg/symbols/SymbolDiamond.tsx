import React from 'react'
import { SymbolProps } from './types'

export const SymbolDiamond = ({
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
                    L${size * 0.8} ${size / 2}
                    L${size / 2} ${size}
                    L${size * 0.2} ${size / 2}
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
