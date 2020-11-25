import React from 'react'
import { SpringValues, animated } from 'react-spring'
import { useTheme } from '@nivo/core'

export const GridLine = ({
    animatedProps,
}: {
    animatedProps: SpringValues<{
        opacity: number
        x1: number
        x2: number
        y1: number
        y2: number
    }>
}) => {
    const theme = useTheme()

    return <animated.line {...animatedProps} {...(theme.grid.line as unknown)} />
}
