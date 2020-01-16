/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { PropsWithChildren } from 'react'
import { Defs, DefSpec } from './defs'
import { useTheme } from '../theming'

interface SvgWrapperProps {
    width: number
    height: number
    margin: {
        top: number
        left: number
    }
    defs?: DefSpec[]
}

export const SvgWrapper = ({
    width,
    height,
    margin,
    defs,
    children,
}: PropsWithChildren<SvgWrapperProps>) => {
    const theme = useTheme()

    return (
        <svg xmlns="http://www.w3.org/2000/svg" role="img" width={width} height={height}>
            <Defs defs={defs} />
            <rect width={width} height={height} fill={theme.background} />
            <g transform={`translate(${margin.left},${margin.top})`}>{children}</g>
        </svg>
    )
}
