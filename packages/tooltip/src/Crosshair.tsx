import React, { memo } from 'react'
import { CrosshairLine } from './CrosshairLine'
import { CrosshairType } from './types'

interface CrosshairProps {
    width: number
    height: number
    type: CrosshairType
    x: number
    y: number
}

export const Crosshair = memo(({ width, height, type, x, y }: CrosshairProps) => {
    let xLine
    let yLine
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
            {xLine && <CrosshairLine x0={xLine.x0} x1={xLine.x1} y0={xLine.y0} y1={xLine.y1} />}
            {yLine && <CrosshairLine x0={yLine.x0} x1={yLine.x1} y0={yLine.y0} y1={yLine.y1} />}
        </>
    )
})

Crosshair.displayName = 'Crosshair'
