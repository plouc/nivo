import { memo } from 'react'
import { PatternDotsProps, PatternDotsSpec } from './types'

export const PatternDots = memo(
    ({ id, background, color, size, padding, stagger }: PatternDotsProps) => {
        let fullSize = size + padding
        const radius = size / 2
        const halfPadding = padding / 2
        if (stagger === true) {
            fullSize = size * 2 + padding * 2
        }

        return (
            <pattern id={id} width={fullSize} height={fullSize} patternUnits="userSpaceOnUse">
                <rect width={fullSize} height={fullSize} fill={background} />
                <circle
                    cx={halfPadding + radius}
                    cy={halfPadding + radius}
                    r={radius}
                    fill={color}
                />
                {stagger && (
                    <circle
                        cx={padding * 1.5 + size + radius}
                        cy={padding * 1.5 + size + radius}
                        r={radius}
                        fill={color}
                    />
                )}
            </pattern>
        )
    }
)
//PatternDots.displayName = 'PatternDots'

export const patternDotsDef = (id: string, options = {}) =>
    ({
        id,
        type: 'patternDots',
        ...options,
    } as PatternDotsSpec)
