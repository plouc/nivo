import React from 'react'
import { animated } from 'react-spring'
import { useTheme } from '@nivo/core'
import { AxisTickProps } from '../types'

export const AxisTick = <Value extends string | number | Date>({
    value: _value,
    format,
    lineX,
    lineY,
    onClick,
    textBaseline,
    textAnchor,
    animatedProps,
}: AxisTickProps<Value>) => {
    const theme = useTheme()

    let value = _value
    if (format !== undefined) {
        value = format(value)
    }

    const gStyle = {
        cursor: onClick ? 'pointer' : undefined,
        opacity: animatedProps.opacity,
    }

    return (
        <animated.g
            transform={animatedProps.transform}
            {...(onClick ? { onClick: e => onClick(e, value) } : {})}
            style={gStyle}
        >
            <line x1={0} x2={lineX} y1={0} y2={lineY} style={theme.axis.ticks.line} />
            <animated.text
                dominantBaseline={textBaseline}
                textAnchor={textAnchor}
                transform={animatedProps.textTransform}
                style={theme.axis.ticks.text}
            >
                {value}
            </animated.text>
        </animated.g>
    )
}
