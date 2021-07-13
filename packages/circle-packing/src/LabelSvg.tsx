import React from 'react'
import { animated } from 'react-spring'
import { useTheme } from '@bitbloom/nivo-core'
import { LabelProps } from './types'

export const LabelSvg = <RawDatum,>({ node, label, style }: LabelProps<RawDatum>) => {
    const theme = useTheme()

    return (
        <animated.text
            key={node.id}
            x={style.x}
            y={style.y}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
                ...theme.labels.text,
                fill: style.textColor,
                opacity: style.opacity,
                pointerEvents: 'none',
            }}
        >
            {label}
        </animated.text>
    )
}
