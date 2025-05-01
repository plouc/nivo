import { useTheme } from '@nivo/core'
import { animated, Interpolation, SpringValue } from '@react-spring/web'
import { CSSProperties } from 'react'
import { DatumWithRectAndColor } from '../types'

const staticStyle: CSSProperties = {
    pointerEvents: 'none',
}

export interface RectLabelProps<TDatum extends DatumWithRectAndColor> {
    datum: TDatum
    label: string
    style: {
        progress: SpringValue<number>
        textColor: string
        transform: Interpolation<string>
    }
}

export const RectLabel = <TDatum extends DatumWithRectAndColor>({
    label,
    style,
}: RectLabelProps<TDatum>) => {
    const theme = useTheme()

    return (
        <animated.g transform={style.transform} opacity={style.progress} style={staticStyle}>
            <animated.text
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    ...theme.labels.text,
                    fill: style.textColor,
                }}
            >
                {label}
            </animated.text>
        </animated.g>
    )
}
