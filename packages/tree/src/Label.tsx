import { animated, to } from '@react-spring/web'
import { useTheme } from '@nivo/theming'
import { Text } from '@nivo/text'
import { LabelComponentProps } from './types'

export const Label = <Datum,>({ label, animatedProps }: LabelComponentProps<Datum>) => {
    const theme = useTheme()

    return (
        <animated.g
            data-testid={`label.${label.id}`}
            transform={to([animatedProps.x, animatedProps.y], (x, y) => `translate(${x},${y})`)}
        >
            <animated.g transform={animatedProps.rotation.to(rotation => `rotate(${rotation})`)}>
                <Text
                    data-testid={`label.${label.id}.label`}
                    style={theme.labels.text}
                    textAnchor={label.textAnchor}
                    dominantBaseline={label.baseline}
                >
                    {label.label}
                </Text>
            </animated.g>
        </animated.g>
    )
}
