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
import { useSpring, animated } from 'react-spring'
import { useMotionConfig, useTheme } from '@nivo/core'

const RectAnnotationOutline = memo(({ x, y, width, height }) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {theme.annotations.outline.outlineWidth > 0 && (
                <animated.rect
                    x={animatedProps.x}
                    y={animatedProps.y}
                    width={animatedProps.width}
                    height={animatedProps.height}
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
            <animated.rect
                x={animatedProps.x}
                y={animatedProps.y}
                width={animatedProps.width}
                height={animatedProps.height}
                style={theme.annotations.outline}
            />
        </>
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
