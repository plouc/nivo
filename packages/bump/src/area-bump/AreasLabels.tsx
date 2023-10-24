import { useSprings } from '@react-spring/web'
import { useMotionConfig } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { InheritedColorConfig } from '@nivo/colors'
import { Text } from '@nivo/text'
import {
    AreaBumpComputedSerie,
    AreaBumpDatum,
    AreaBumpLabel,
    AreaBumpSerieExtraProps,
} from './types'
import { useAreaBumpSeriesLabels } from './hooks'

interface AreaLabelsProps<Datum extends AreaBumpDatum, ExtraProps extends AreaBumpSerieExtraProps> {
    getLabel: Exclude<AreaBumpLabel<Datum, ExtraProps>, false>
    series: AreaBumpComputedSerie<Datum, ExtraProps>[]
    position: 'start' | 'end'
    padding: number
    color: InheritedColorConfig<AreaBumpComputedSerie<Datum, ExtraProps>>
}

export const AreasLabels = <
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
>({
    getLabel,
    series,
    position,
    padding,
    color,
}: AreaLabelsProps<Datum, ExtraProps>) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const labels = useAreaBumpSeriesLabels<Datum, ExtraProps>({
        getLabel,
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
