import { useSprings, animated } from '@react-spring/web'
import { useTheme, useMotionConfig } from '@nivo/core'
import { InheritedColorConfig } from '@nivo/colors'
import { AreaBumpComputedSerie, AreaBumpDatum, AreaBumpLabel } from './types'
import { useAreaBumpSeriesLabels } from './hooks'

interface AreaLabelsProps<D extends AreaBumpDatum> {
    label: Exclude<AreaBumpLabel<D>, false>
    series: AreaBumpComputedSerie<D>[]
    position: 'start' | 'end'
    padding: number
    color: InheritedColorConfig<AreaBumpComputedSerie<D>>
}

export const AreasLabels = <D extends AreaBumpDatum>({
    label,
    series,
    position,
    padding,
    color,
}: AreaLabelsProps<D>) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const labels = useAreaBumpSeriesLabels<D>({
        label,
        series,
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
