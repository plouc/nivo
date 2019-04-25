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

const RectAnnotationOutline = memo(({ x, y, width, height }) => {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()

    if (!animate) {
        return (
            <>
                {theme.annotations.outline.outlineWidth > 0 && (
                    <rect
                        x={x - width / 2}
                        y={y - height / 2}
                        width={width}
                        height={height}
                        style={{
                            ...theme.annotations.outline,
                            fill: 'none',
                            strokeWidth:
                                theme.annotations.outline.strokeWidth +
                                theme.annotations.outline.outlineWidth * 2,
                            stroke: theme.annotations.outline.outlineColor,
                        }}
                    />
                )}
                <rect
                    x={x - width / 2}
                    y={y - height / 2}
                    width={width}
                    height={height}
                    style={theme.annotations.outline}
                />
            </>
        )
    }

    return (
        <Motion
            style={{
                x: spring(x - width / 2, springConfig),
                y: spring(y - height / 2, springConfig),
                width: spring(width, springConfig),
                height: spring(height, springConfig),
            }}
        >
            {interpolated => (
                <>
                    {theme.annotations.outline.outlineWidth > 0 && (
                        <rect
                            x={interpolated.x}
                            y={interpolated.y}
                            width={interpolated.width}
                            height={interpolated.height}
                            style={{
                                ...theme.annotations.outline,
                                fill: 'none',
                                strokeWidth:
                                    theme.annotations.outline.strokeWidth +
                                    theme.annotations.outline.outlineWidth * 2,
                                stroke: theme.annotations.outline.outlineColor,
                            }}
                        />
                    )}
                    <rect
                        x={interpolated.x}
                        y={interpolated.y}
                        width={interpolated.width}
                        height={interpolated.height}
                        style={theme.annotations.outline}
                    />
                </>
            )}
        </Motion>
    )
})

RectAnnotationOutline.displayName = 'RectAnnotationOutline'
RectAnnotationOutline.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default RectAnnotationOutline
