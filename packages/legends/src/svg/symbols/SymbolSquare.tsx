import { SymbolProps } from './types'

export const SymbolSquare = ({
    x,
    y,
    size,
    fill,
    opacity = 1,
    borderWidth = 0,
    borderColor = 'transparent',
}: SymbolProps) => {
    return (
        <rect
            x={x}
            y={y}
            fill={fill}
            opacity={opacity}
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
