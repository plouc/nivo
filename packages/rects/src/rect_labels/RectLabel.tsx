import { CSSProperties } from 'react'
import { animated, SpringValue, Interpolation } from '@react-spring/web'
import { useTheme } from '@nivo/theming'
import { Text } from '@nivo/text'
import { DatumWithRectAndColor } from '../types'

const staticStyle: CSSProperties = {
    pointerEvents: 'none',
}

export interface RectLabelProps<TDatum extends DatumWithRectAndColor> {
    datum: TDatum
    label: string
    style: {
        progress: SpringValue<number>
        x: SpringValue<number>
        y: SpringValue<number>
        transform: Interpolation<string>
        width: SpringValue<number>
        height: SpringValue<number>
        opacity: SpringValue<number>
        textColor: string
    }
}

export const RectLabel = <TDatum extends DatumWithRectAndColor>({
    label,
    style,
}: RectLabelProps<TDatum>) => {
    const theme = useTheme()

    return (
        <animated.g transform={style.transform} opacity={style.progress} style={staticStyle}>
            <Text
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    ...theme.labels.text,
                    fill: style.textColor,
                }}
            >
                {label}
            </Text>
        </animated.g>
    )
}
