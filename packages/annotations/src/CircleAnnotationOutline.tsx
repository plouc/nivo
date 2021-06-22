import { useSpring, animated } from '@react-spring/web'
import { useMotionConfig, useTheme } from '@nivo/core'

export const CircleAnnotationOutline = ({ x, y, size }: { x: number; y: number; size: number }) => {
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
}
