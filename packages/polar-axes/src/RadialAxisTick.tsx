import { animated, to } from '@react-spring/web'
import { Text } from '@nivo/text'
import { RadialAxisTickProps } from './types'

export const RadialAxisTick = ({
    label,
    textAnchor,
    theme,
    animated: animatedProps,
}: RadialAxisTickProps) => {
    return (
        <animated.g
            opacity={animatedProps.opacity}
            transform={to(
                [animatedProps.y, animatedProps.rotation],
                (y, rotation) => `translate(${y}, 0) rotate(${rotation})`
            )}
        >
            <animated.line x2={animatedProps.length} style={theme.ticks.line} />
            <Text
                dx={animatedProps.textX}
                textAnchor={textAnchor}
                dominantBaseline="central"
                style={theme.ticks.text}
            >
                {label}
            </Text>
        </animated.g>
    )
}
