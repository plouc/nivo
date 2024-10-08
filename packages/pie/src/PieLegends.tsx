import { BoxLegendSvg } from '@nivo/legends'
import { CompletePieSvgProps, DatumId, LegendDatum } from './types'

interface PieLegendsProps<RawDatum> {
    width: number
    height: number
    legends: CompletePieSvgProps<RawDatum>['legends']
    data: LegendDatum<RawDatum>[]
    toggleSerie: (id: DatumId) => void
}

export const PieLegends = <RawDatum,>({
    width,
    height,
    legends,
    data,
    toggleSerie,
}: PieLegendsProps<RawDatum>) => {
    return (
        <>
            {legends.map((legend, i: number) => (
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
