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

CrosshairLine.displayName = 'CrosshairLine'
CrosshairLine.propTypes = {
    x0: PropTypes.number.isRequired,
    x1: PropTypes.number.isRequired,
    y0: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
}

export default CrosshairLine
