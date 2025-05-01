import { useSprings } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { InheritedColorConfig } from '@nivo/colors'
import { Text } from '@nivo/text'
import { BumpComputedSerie, BumpDatum, BumpLabel, BumpSerieExtraProps } from './types'
import { useBumpSeriesLabels } from './hooks'

interface LineLabelsProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> {
    series: BumpComputedSerie<Datum, ExtraProps>[]
    getLabel: Exclude<BumpLabel<Datum, ExtraProps>, false>
    position: 'start' | 'end'
    padding: number
    color: InheritedColorConfig<BumpComputedSerie<Datum, ExtraProps>>
}

export const LinesLabels = <Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>({
    series,
    getLabel,
    position,
    padding,
    color,
}: LineLabelsProps<Datum, ExtraProps>) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const labels = useBumpSeriesLabels<Datum, ExtraProps>({
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
                    <Text
                        data-testid={`label.${position}.${label.serie.id}`}
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
                    </Text>
                )
            })}
        </>
    )
}
