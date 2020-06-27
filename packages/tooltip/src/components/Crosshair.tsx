/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import { CrosshairLine } from './CrosshairLine'

type CrosshairType =
    | 'x'
    | 'y'
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'
    | 'cross'

interface CrosshairProps {
    type?: CrosshairType
    width: number
    height: number
    x: number
    y: number
}

interface Line {
    x0: number
    x1: number
    y0: number
    y1: number
}

export const Crosshair = memo(({ width, height, type = 'cross', x, y }: CrosshairProps) => {
    let xLine: Line | undefined = undefined
    let yLine: Line | undefined = undefined
    if (type === 'cross') {
        xLine = { x0: x, x1: x, y0: 0, y1: height }
        yLine = { x0: 0, x1: width, y0: y, y1: y }
    } else if (type === 'top-left') {
        xLine = { x0: x, x1: x, y0: 0, y1: y }
        yLine = { x0: 0, x1: x, y0: y, y1: y }
    } else if (type === 'top') {
        xLine = { x0: x, x1: x, y0: 0, y1: y }
    } else if (type === 'top-right') {
        xLine = { x0: x, x1: x, y0: 0, y1: y }
        yLine = { x0: x, x1: width, y0: y, y1: y }
    } else if (type === 'right') {
        yLine = { x0: x, x1: width, y0: y, y1: y }
    } else if (type === 'bottom-right') {
        xLine = { x0: x, x1: x, y0: y, y1: height }
        yLine = { x0: x, x1: width, y0: y, y1: y }
    } else if (type === 'bottom') {
        xLine = { x0: x, x1: x, y0: y, y1: height }
    } else if (type === 'bottom-left') {
        xLine = { x0: x, x1: x, y0: y, y1: height }
        yLine = { x0: 0, x1: x, y0: y, y1: y }
    } else if (type === 'left') {
        yLine = { x0: 0, x1: x, y0: y, y1: y }
    } else if (type === 'x') {
        xLine = { x0: x, x1: x, y0: 0, y1: height }
    } else if (type === 'y') {
        yLine = { x0: 0, x1: width, y0: y, y1: y }
    }

    return (
        <>
            {xLine !== undefined && (
                <CrosshairLine x0={xLine.x0} x1={xLine.x1} y0={xLine.y0} y1={xLine.y1} />
            )}
            {yLine !== undefined && (
                <CrosshairLine x0={yLine.x0} x1={yLine.x1} y0={yLine.y0} y1={yLine.y1} />
            )}
        </>
    )
})

Crosshair.displayName = 'Crosshair'
