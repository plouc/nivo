/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'

export interface GridLineProps extends React.SVGProps<SVGLineElement> {
    key: string
    x1: number
    x2: number
    y1: number
    y2: number
}

// Using any because it's also possible to pass styles from the theme,
// which uses generic CSS properties for now
export const GridLine = (props: GridLineProps) => <line {...(props as any)} />
