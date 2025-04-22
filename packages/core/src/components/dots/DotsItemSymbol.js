import { memo } from 'react'

const DotsItemSymbol = ({ size, color, borderWidth, borderColor }) => (
    <circle
        r={size / 2}
        fill={color}
        stroke={borderColor}
        strokeWidth={borderWidth}
        style={{ pointerEvents: 'none' }}
    />
)

export default memo(DotsItemSymbol)
