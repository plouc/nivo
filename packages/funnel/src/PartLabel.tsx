import { useSpring, animated } from '@react-spring/web'
import { useTheme, useMotionConfig } from '@nivo/core'
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
            <animated.text
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    ...theme.labels.text,
                    fill: animatedProps.color,
                    pointerEvents: 'none',
                }}
            >
                {part.formattedValue}
            </animated.text>
        </animated.g>
    )
}
