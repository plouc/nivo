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
                M0 ${-size / 2}
                L${size / 2} ${size / 2}
                L${-size / 2} ${size / 2}
                L0 ${-size / 2}
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
