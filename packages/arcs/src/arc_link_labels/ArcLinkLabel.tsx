import React from 'react'
import { SpringValue, Interpolation, animated } from 'react-spring'
import { DatumWithArcAndColor } from '../types'

export interface ArcLinkLabelProps<Datum extends DatumWithArcAndColor> {
    datum: Datum
    style: {
        linkColor: SpringValue<string>
        thickness: number
        opacity: SpringValue<number>
        path: Interpolation<string>
    }
}

export const ArcLinkLabel = <Datum extends DatumWithArcAndColor>({
    style,
}: ArcLinkLabelProps<Datum>) => {
    return (
        <animated.path
            fill="none"
            stroke={style.linkColor}
            strokeWidth={style.thickness}
            opacity={style.opacity}
            d={style.path}
        />
    )
}
