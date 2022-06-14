import { memo } from 'react'
import { PatternDotsProps, PatternSquaresSpec } from './types'

export const PatternSquares = memo(
    ({
        id,
        background = '#000000',
        color = '#000000',
        size = 0,
        padding = 0,
        stagger = false,
    }: PatternDotsProps) => {
        let fullSize = size + padding
        const halfPadding = padding / 2
        if (stagger === true) {
            fullSize = size * 2 + padding * 2
        }

        return (
            <pattern id={id} width={fullSize} height={fullSize} patternUnits="userSpaceOnUse">
                <rect width={fullSize} height={fullSize} fill={background} />
                <rect x={halfPadding} y={halfPadding} width={size} height={size} fill={color} />
                {stagger && (
                    <rect
                        x={padding * 1.5 + size}
                        y={padding * 1.5 + size}
                        width={size}
                        height={size}
                        fill={color}
                    />
                )}
            </pattern>
        )
    }
)

export const patternSquaresDef = (id: string, options = {}) =>
    ({
        id,
        type: 'patternSquares',
        ...options,
    } as PatternSquaresSpec)