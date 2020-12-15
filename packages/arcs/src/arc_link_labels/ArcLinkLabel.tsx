import React from 'react'
import { useTheme } from '@nivo/core'
import { SpringValue, Interpolation, animated } from 'react-spring'
import { DatumWithArcAndColor } from '../types'

export interface ArcLinkLabelProps<Datum extends DatumWithArcAndColor> {
    datum: Datum
    label: string
    style: {
        path: Interpolation<string>
        thickness: number
        textPosition: Interpolation<string>
        textAnchor: Interpolation<'start' | 'end'>
        linkColor: SpringValue<string>
        opacity: SpringValue<number>
        textColor: SpringValue<string>
    }
}

export const ArcLinkLabel = <Datum extends DatumWithArcAndColor>({
    label,
    style,
}: ArcLinkLabelProps<Datum>) => {
    const theme = useTheme()

    return (
        <animated.g opacity={style.opacity}>
            <animated.path
                fill="none"
                stroke={style.linkColor}
                strokeWidth={style.thickness}
                d={style.path}
            />
            <animated.text
                transform={style.textPosition}
                textAnchor={style.textAnchor}
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
