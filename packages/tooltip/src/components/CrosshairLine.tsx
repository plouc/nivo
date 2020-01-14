/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { CSSProperties, memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { useTheme, useMotionConfig } from '@nivo/core'

interface CrosshairLineProps {
    x0: number
    x1: number
    y0: number
    y1: number
}

export const CrosshairLine = memo(({ x0, x1, y0, y1 }: CrosshairLineProps) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()
    const style: CSSProperties = useMemo(
        () => ({
            ...theme.crosshair.line,
            pointerEvents: 'none',
        }),
        [theme.crosshair.line]
    )

    const animatedProps = useSpring({
        x1: x0,
        x2: x1,
        y1: y0,
        y2: y1,
        config: springConfig,
        immediate: !animate,
    })

    return <animated.line {...animatedProps} fill="none" style={style} />
})
