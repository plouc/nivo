import { useSpring, animated } from '@react-spring/web'
import { useMotionConfig, useTheme } from '@nivo/core'

export const RectAnnotationOutline = ({
    x,
    y,
    width,
    height,
}: {
    x: number
    y: number
    width: number
    height: number
}) => {
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
}
