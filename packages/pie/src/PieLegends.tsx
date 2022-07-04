import { BoxLegendSvg } from '@nivo/legends'
import { CompletePieSvgProps, ComputedDatum, DatumId } from './types'

interface PieLegendsProps<RawDatum> {
    width: number
    height: number
    legends: CompletePieSvgProps<RawDatum>['legends']
    data: Omit<ComputedDatum<RawDatum>, 'arc'>[]
    toggleSerie: (id: DatumId) => void
}

const PieLegends = <RawDatum,>({
    width,
    height,
    legends,
    data,
    toggleSerie,
}: PieLegendsProps<RawDatum>) => {
    console.log('PieLegend')
    return (
        <>
            {legends.map((legend, i) => {
                console.log('legend', legend)
                return (
                    <BoxLegendSvg
                        key={i} // pas bo
                        {...legend}
                        containerWidth={width}
                        containerHeight={height}
                        data={legend.data ?? data}
                        toggleSerie={legend.toggleSerie ? toggleSerie : undefined}
                    />
                )
            })}
        </>
    )
}

export default PieLegends
