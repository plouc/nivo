import { useSpring, animated } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { Text } from '@nivo/text'
import { FunnelDatum, FunnelPart } from './types'

interface PartLabelProps<D extends FunnelDatum> {
    part: FunnelPart<D>
}

export const PartLabel = <D extends FunnelDatum>({ part }: PartLabelProps<D>) => {
    const theme = useTheme()
    const { animate, config: motionConfig } = useMotionConfig()

    const animatedProps = useSpring({
        transform: `translate(${part.x}, ${part.y})`,
        color: part.labelColor,
        config: motionConfig,
        immediate: !animate,
    })

    return (
        <animated.g transform={animatedProps.transform}>
            <Text
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    ...theme.labels.text,
                    fill: animatedProps.color,
                    pointerEvents: 'none',
                }}
            >
                {part.formattedValue}
            </Text>
        </animated.g>
    )
}
