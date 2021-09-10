import { animated, to } from '@react-spring/web'
import { useTheme } from '@nivo/core'
import { RadialAxisTickProps } from './types'

export const RadialAxisTick = ({
    label,
    textAnchor,
    animated: animatedProps,
}: RadialAxisTickProps) => {
    const theme = useTheme()

    return (
        <animated.g
            opacity={animatedProps.opacity}
            transform={to(
                [animatedProps.y, animatedProps.rotation],
                (y, rotation) => `translate(${y}, 0) rotate(${rotation})`
            )}
        >
            <animated.line x2={animatedProps.length} style={theme.axis.ticks.line} />
            <animated.text
                dx={animatedProps.textX}
                textAnchor={textAnchor}
                dominantBaseline="central"
                style={theme.axis.ticks.text}
            >
                {label}
            </animated.text>
        </animated.g>
    )
}
