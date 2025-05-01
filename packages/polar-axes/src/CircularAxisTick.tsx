import { animated } from '@react-spring/web'
import { Text } from '@nivo/text'
import { CircularAxisTickProps } from './types'

export const CircularAxisTick = ({
    label,
    theme,
    animated: animatedProps,
}: CircularAxisTickProps) => {
    return (
        <animated.g opacity={animatedProps.opacity}>
            <animated.line
                x1={animatedProps.x1}
                y1={animatedProps.y1}
                x2={animatedProps.x2}
                y2={animatedProps.y2}
                style={theme.ticks.line}
            />
            <Text
                dx={animatedProps.textX}
                dy={animatedProps.textY}
                dominantBaseline="central"
                style={theme.ticks.text}
                textAnchor="middle"
            >
                {label}
            </Text>
        </animated.g>
    )
}
