/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'
import { useMotionConfig, useTheme } from '@nivo/core'

const DotAnnotationOutline = memo(({ x, y, size }) => {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()

    if (!animate) {
        return (
            <>
                {theme.annotations.outline.outlineWidth > 0 && (
                    <circle
                        cx={x}
                        cy={y}
                        r={size / 2}
                        style={{
                            ...theme.annotations.outline,
                            fill: 'none',
                            strokeWidth: theme.annotations.outline.outlineWidth * 2,
                            stroke: theme.annotations.outline.outlineColor,
                        }}
                    />
                )}
                <circle cx={x} cy={y} r={size / 2} style={theme.annotations.symbol} />
            </>
        )
    }

    return (
        <Motion
            style={{
                x: spring(x, springConfig),
                y: spring(y, springConfig),
                size: spring(size, springConfig),
            }}
        >
            {interpolated => (
                <>
                    {theme.annotations.outline.outlineWidth > 0 && (
                        <circle
                            cx={interpolated.x}
                            cy={interpolated.y}
                            r={interpolated.size / 2}
                            style={{
                                ...theme.annotations.outline,
                                fill: 'none',
                                strokeWidth: theme.annotations.outline.outlineWidth * 2,
                                stroke: theme.annotations.outline.outlineColor,
                            }}
                        />
                    )}
                    <circle
                        cx={interpolated.x}
                        cy={interpolated.y}
                        r={interpolated.size / 2}
                        style={theme.annotations.symbol}
                    />
                </>
            )}
        </Motion>
    )
})

DotAnnotationOutline.displayName = 'DotAnnotationOutline'
DotAnnotationOutline.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
}
DotAnnotationOutline.defaultProps = {
    size: 4,
}

export default DotAnnotationOutline
