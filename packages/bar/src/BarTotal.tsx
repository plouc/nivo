import { useTheme } from '@nivo/core'
import { SpringValue, animated } from '@react-spring/web'

interface Props {
    value: number
    labelOpacity: SpringValue<number>
    x: SpringValue<number>
    y: SpringValue<number>
}

export const BarTotal = ({ value, labelOpacity, x, y }: Props) => {
    const theme = useTheme()
    return (
        <animated.text
            x={x}
            y={y}
            fillOpacity={labelOpacity}
            style={{
                ...theme.labels.text,
                pointerEvents: 'none',
                fill: theme.text.fill,
            }}
            fontWeight="bold"
            fontSize={theme.labels.text.fontSize}
            fontFamily={theme.labels.text.fontFamily}
            textAnchor="middle"
            alignmentBaseline="middle"
        >
            {value}
        </animated.text>
    )
}
