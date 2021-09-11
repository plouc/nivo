import { animated } from '@react-spring/web'
import { useTheme } from '@nivo/core'
import { CircularAxisTickProps } from './types'

export const CircularAxisTick = ({ label, animated: animatedProps }: CircularAxisTickProps) => {
    const theme = useTheme()

    return (
        <animated.g opacity={animatedProps.opacity}>
            <animated.line
                x1={animatedProps.x1}
                y1={animatedProps.y1}
                x2={animatedProps.x2}
                y2={animatedProps.y2}
                style={theme.axis.ticks.line}
            />
            <animated.text
                dx={animatedProps.textX}
                dy={animatedProps.textY}
                dominantBaseline="central"
                style={theme.axis.ticks.text}
                textAnchor="middle"
            >
                {label}
            </animated.text>
        </animated.g>
    )
}
