import { useSprings, animated } from '@react-spring/web'
import { useTheme, useMotionConfig } from '@nivo/core'
import { InheritedColorConfig } from '@nivo/colors'
import { BumpComputedSerie, BumpDatum, BumpLabel } from './types'
import { useBumpSeriesLabels } from './hooks'

interface LineLabelsProps<D extends BumpDatum> {
    series: BumpComputedSerie<D>[]
    getLabel: BumpLabel
    position: 'start' | 'end'
    padding: number
    color: InheritedColorConfig<BumpComputedSerie<D>>
}

export const LinesLabels = <D extends BumpDatum>({
    series,
    getLabel,
    position,
    padding,
    color,
}: LineLabelsProps<D>) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const labels = useBumpSeriesLabels<D>({
        series,
        getLabel,
        position,
        padding,
        color,
    })

    const springs = useSprings<{
        x: number
        y: number
        opacity: number
    }>(
        labels.length,
        labels.map(label => ({
            x: label.x,
            y: label.y,
            opacity: label.opacity,
            config: springConfig,
            immediate: !animate,
        }))
    )

    return (
        <>
            {springs.map((animatedProps, index) => {
                const label = labels[index]

                return (
                    <animated.text
                        key={label.id}
                        x={animatedProps.x}
                        y={animatedProps.y}
                        textAnchor={label.textAnchor}
                        dominantBaseline="central"
                        opacity={animatedProps.opacity}
                        style={{
                            ...theme.labels.text,
                            fill: label.color,
                        }}
                    >
                        {label.label}
                    </animated.text>
                )
            })}
        </>
    )
}
