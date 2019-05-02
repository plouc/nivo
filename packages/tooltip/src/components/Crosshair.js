/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'
import { useTheme, useMotionConfig } from '@nivo/core'
import { crosshairPropTypes } from '../props'

const CrosshairLine = memo(({ x0, x1, y0, y1 }) => {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()
    const style = useMemo(
        () => ({
            ...theme.crosshair.line,
            pointerEvents: 'none',
        }),
        [theme.crosshair.line]
    )

    if (animate !== true) {
        return <line x1={x0} x2={x1} y1={y0} y2={y1} fill="none" style={style} />
    }

    return (
        <Motion
            style={{
                x0: spring(x0, springConfig),
                x1: spring(x1, springConfig),
                y0: spring(y0, springConfig),
                y1: spring(y1, springConfig),
            }}
        >
            {line => (
                <line
                    x1={line.x0}
                    x2={line.x1}
                    y1={line.y0}
                    y2={line.y1}
                    fill="none"
                    style={style}
                />
            )}
        </Motion>
    )
})

const Crosshair = memo(({ width, height, type, x, y, animate, motionStiffness, motionDamping }) => {
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
            {xLine && (
                <CrosshairLine
                    x0={xLine.x0}
                    x1={xLine.x1}
                    y0={xLine.y0}
                    y1={xLine.y1}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                />
            )}
            {yLine && (
                <CrosshairLine
                    x0={yLine.x0}
                    x1={yLine.x1}
                    y0={yLine.y0}
                    y1={yLine.y1}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                />
            )}
        </>
    )
})

Crosshair.displayName = 'Crosshair'
Crosshair.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    type: crosshairPropTypes.type.isRequired,
}
Crosshair.defaultProps = {
    type: 'cross',
}

export default Crosshair
