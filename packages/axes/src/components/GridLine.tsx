/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { animated } from 'react-spring'
import { useTheme } from '@nivo/core'

export interface GridLineProps {
    animatedProps: Record<string, unknown>
}

export const GridLine = ({ animatedProps }: GridLineProps) => {
    const theme = useTheme()

    return <animated.line {...animatedProps} {...theme.grid.line} />
}
