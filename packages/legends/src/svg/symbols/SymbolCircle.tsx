import { SymbolProps } from './types'

export const SymbolCircle = ({
    x,
    y,
    size,
    fill,
    opacity = 1,
    borderWidth = 0,
    borderColor = 'transparent',
}: SymbolProps) => {
    return (
        <circle
            r={size / 2}
            cx={x}
            cy={y}
            fill={fill}
            opacity={opacity}
            strokeWidth={borderWidth}
            stroke={borderColor}
            style={{
                pointerEvents: 'none',
            }}
        />
    )
}
