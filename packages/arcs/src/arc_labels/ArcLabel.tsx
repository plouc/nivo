import React, { CSSProperties } from 'react'
import { SpringValue, Interpolation, animated } from 'react-spring'
import { useTheme } from '@nivo/core'
import { DatumWithArcAndColor } from '../types'

const staticStyle: CSSProperties = {
    pointerEvents: 'none',
}

export interface ArcLabelProps<Datum extends DatumWithArcAndColor> {
    datum: Datum
    label: string
    style: {
        progress: SpringValue<number>
        transform: Interpolation<string>
        textColor: string
    }
}

export const ArcLabel = <Datum extends DatumWithArcAndColor>({
    label,
    style,
}: ArcLabelProps<Datum>) => {
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
