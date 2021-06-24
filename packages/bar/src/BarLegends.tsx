import { BoxLegendSvg } from '@nivo/legends'
import { BarCommonProps, LegendData } from './types'

interface BarLegendsProps<RawDatum> {
    width: number
    height: number
    legends: BarCommonProps<RawDatum>['legends']
    data: LegendData[]
    toggleSerie: (id: string | number) => void
}

export const BarLegends = <RawDatum,>({
    width,
    height,
    legends,
    data,
    toggleSerie,
}: BarLegendsProps<RawDatum>) => {
    return (
        <>
            {legends.map((legend, i) => (
                <BoxLegendSvg
                    key={i}
                    {...legend}
                    containerWidth={width}
                    containerHeight={height}
                    data={legend.data ?? data}
                    toggleSerie={legend.toggleSerie ? toggleSerie : undefined}
                />
            ))}
        </>
    )
}
