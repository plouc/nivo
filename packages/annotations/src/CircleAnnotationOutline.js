import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from '@react-spring/web'
import { useMotionConfig, useTheme } from '@nivo/core'

const CircleAnnotationOutline = memo(({ x, y, size }) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        x,
        y,
        radius: size / 2,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <>
            {theme.annotations.outline.outlineWidth > 0 && (
                <animated.circle
                    cx={animatedProps.x}
                    cy={animatedProps.y}
                    r={animatedProps.radius}
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
            <animated.circle
                cx={animatedProps.x}
                cy={animatedProps.y}
                r={animatedProps.radius}
                style={theme.annotations.outline}
            />
        </>
    )
})

CircleAnnotationOutline.displayName = 'CircleAnnotationOutline'
CircleAnnotationOutline.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
}

export default CircleAnnotationOutline
