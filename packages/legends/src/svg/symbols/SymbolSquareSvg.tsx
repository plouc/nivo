import { SymbolProps } from '../../types'

export const SymbolSquareSvg = ({
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
            x={x - size / 2}
            y={y - size / 2}
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
