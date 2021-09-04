import { useSpring, animated } from '@react-spring/web'
import { useTheme, useMotionConfig } from '@nivo/core'
import { SeparatorProps as SeparatorType } from './types'

interface SeparatorProps {
    separator: SeparatorType
}

export const Separator = ({ separator }: SeparatorProps) => {
    const theme = useTheme()
    const { animate, config: motionConfig } = useMotionConfig()

    const animatedProps = useSpring({
        x1: separator.x0,
        x2: separator.x1,
        y1: separator.y0,
        y2: separator.y1,
        config: motionConfig,
        immediate: !animate,
    })

    return (
        <animated.line
            x1={animatedProps.x1}
            x2={animatedProps.x2}
            y1={animatedProps.y1}
            y2={animatedProps.y2}
            fill="none"
            {...(theme.grid.line as any)}
        />
    )
}
