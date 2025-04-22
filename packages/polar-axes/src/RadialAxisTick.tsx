import { animated, to } from '@react-spring/web'
import { useTheme, sanitizeSvgTextStyle } from '@nivo/core'
import { RadialAxisTickProps } from './types'

export const RadialAxisTick = ({
    label,
    textAnchor,
    animated: animatedProps,
}: RadialAxisTickProps) => {
    const theme = useTheme()
    const textStyle = theme.axis.ticks.text
    const sanitizedTextStyle = sanitizeSvgTextStyle(textStyle)

    return (
        <animated.g
            opacity={animatedProps.opacity}
            transform={to(
                [animatedProps.y, animatedProps.rotation],
                (y, rotation) => `translate(${y}, 0) rotate(${rotation})`
            )}
        >
            <animated.line x2={animatedProps.length} style={theme.axis.ticks.line} />
            {textStyle.outlineWidth > 0 && (
                <animated.text
                    dx={animatedProps.textX}
                    textAnchor={textAnchor}
                    dominantBaseline="central"
                    style={sanitizedTextStyle}
                    strokeWidth={textStyle.outlineWidth * 2}
                    stroke={textStyle.outlineColor}
                    strokeLinejoin="round"
                    opacity={textStyle.outlineOpacity}
                >
                    {label}
                </animated.text>
            )}
            <animated.text
                dx={animatedProps.textX}
                textAnchor={textAnchor}
                dominantBaseline="central"
                style={sanitizedTextStyle}
            >
                {label}
            </animated.text>
        </animated.g>
    )
}
