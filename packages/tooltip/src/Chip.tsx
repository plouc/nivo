import React, { CSSProperties, memo } from 'react'

interface ChipProps {
    size?: number
    color: string
    style?: CSSProperties
}

export const Chip = memo<ChipProps>(({ size = 12, color, style = {} }) => (
    <span style={{ display: 'block', width: size, height: size, background: color, ...style }} />
))
