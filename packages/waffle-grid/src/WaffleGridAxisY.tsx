import { animated, config, useTransition } from '@react-spring/web'
import { useTheme } from '@nivo/core'
import { WaffleGridAxisDataY, WaffleGridAxisTickY } from './types'

const transitionConfig = config.stiff
const transitionTrail = 60

export const WaffleGridAxisY = ({ axis }: { axis: WaffleGridAxisDataY }) => {
    const theme = useTheme()

    const x = axis.x - 10

    const transitions = useTransition<
        WaffleGridAxisTickY,
        {
            rotation: string
            position: string
            opacity: number
        }
    >(axis.ticks, {
        keys: tick => tick.id,
        from: tick => ({
            rotation: `rotate(45)`,
            position: `translate(${x - 100}, ${tick.y + tick.height / 2})`,
            opacity: 0,
        }),
        enter: tick => ({
            rotation: `rotate(0)`,
            position: `translate(${x}, ${tick.y + tick.height / 2})`,
            opacity: 1,
        }),
        update: tick => ({
            rotation: `rotate(0)`,
            position: `translate(${x}, ${tick.y + tick.height / 2})`,
            opacity: 1,
        }),
        leave: tick => ({
            rotation: `rotate(-45)`,
            position: `translate(${x + 100}, ${tick.y + tick.height / 2 + 100})`,
            opacity: 0,
        }),
        trail: transitionTrail,
        config: transitionConfig,
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
