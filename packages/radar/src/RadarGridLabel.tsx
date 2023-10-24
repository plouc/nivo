import { animated } from '@react-spring/web'
import { useTheme } from '@nivo/theming'
import { Text } from '@nivo/text'
import { GridLabelProps } from './types'

export const RadarGridLabel = ({ id, anchor, animated: animatedProps }: GridLabelProps) => {
    const theme = useTheme()

    return (
        <animated.g transform={animatedProps.transform}>
            <Text style={theme.axis.ticks.text} dominantBaseline="central" textAnchor={anchor}>
                {id}
            </Text>
        </animated.g>
    )
}
