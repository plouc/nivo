import { animated, useTransition } from '@react-spring/web'
import { useTheme, useMotionConfig } from '@nivo/core'
import { WaffleGridAxisDataX, WaffleGridAxisTickX } from './types'

const transitionTrail = 60

export const WaffleGridAxisX = ({ axis }: { axis: WaffleGridAxisDataX }) => {
    const theme = useTheme()
    const { springConfig } = useMotionConfig()

    const y = axis.y2 + 10

    const transitions = useTransition<
        WaffleGridAxisTickX,
        {
            rotation: string
            position: string
            opacity: number
        }
    >(axis.ticks, {
        keys: tick => tick.id,
        from: tick => ({
            rotation: `rotate(-45)`,
            position: `translate(${tick.x + tick.width / 2 - 100}, ${y})`,
            opacity: 0,
        }),
        enter: tick => ({
            rotation: `rotate(-90)`,
            position: `translate(${tick.x + tick.width / 2}, ${y})`,
            opacity: 1,
        }),
        update: tick => ({
            rotation: `rotate(-90)`,
            position: `translate(${tick.x + tick.width / 2}, ${y})`,
            opacity: 1,
        }),
        leave: tick => ({
            rotation: `rotate(-135)`,
            position: `translate(${tick.x + tick.width / 2}, ${y + 100})`,
            opacity: 0,
        }),
        trail: transitionTrail,
        config: springConfig,
    })

    return (
        <>
            {transitions(({ position, rotation, opacity }, tick) => {
                return (
                    <animated.g opacity={opacity} transform={position}>
                        <animated.g transform={rotation}>
                            <text
                                textAnchor="end"
                                dominantBaseline="middle"
                                style={theme.axis.ticks.text}
                            >
                                {tick.id}
                            </text>
                        </animated.g>
                    </animated.g>
                )
            })}
        </>
    )
}
