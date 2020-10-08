import { useSpring, animated } from '@react-spring/web'
import { useMotionConfig } from '@bitbloom/nivo-core'

export interface StreamDotsItemProps {
    x: number
    y: number
    size: number
    color: string
    borderWidth: number
    borderColor: string
}

export const StreamDotsItem = ({
    x,
    y,
    size,
    color,
    borderWidth,
    borderColor,
}: StreamDotsItemProps) => {
    const { animate, config: springConfig } = useMotionConfig()
    const animatedProps = useSpring({
        x,
        y,
        radius: size * 0.5,
        color,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.circle
            cx={animatedProps.x}
            cy={animatedProps.y}
            r={animatedProps.radius}
            fill={animatedProps.color}
            strokeWidth={borderWidth}
            stroke={borderColor}
        />
    )
}
