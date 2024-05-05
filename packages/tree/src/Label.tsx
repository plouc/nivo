import { animated, to } from '@react-spring/web'
import { useTheme } from '@nivo/core'
import { LabelComponentProps } from './types'

export const Label = <Datum,>({ label, animatedProps }: LabelComponentProps<Datum>) => {
    const theme = useTheme()

    return (
        <animated.g
            transform={to([animatedProps.x, animatedProps.y], (x, y) => `translate(${x}, ${y})`)}
            style={{
                pointerEvents: 'none',
            }}
        >
            <animated.g transform={animatedProps.rotation.to(rotation => `rotate(${rotation})`)}>
                {theme.labels.text.outlineWidth > 0 && (
                    <text
                        style={{
                            ...theme.labels.text,
                            fill: theme.labels.text.outlineColor,
                        }}
                        stroke={theme.labels.text.outlineColor}
                        strokeWidth={theme.labels.text.outlineWidth}
                        strokeLinejoin="round"
                        textAnchor={label.textAnchor}
                        dominantBaseline={label.baseline}
                    >
                        {label.label}
                    </text>
                )}
                <text
                    style={theme.labels.text}
                    textAnchor={label.textAnchor}
                    dominantBaseline={label.baseline}
                >
                    {label.label}
                </text>
            </animated.g>
        </animated.g>
    )
}
