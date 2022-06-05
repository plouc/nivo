import { BoxLegendSvg, BoxLegendSpec, LegendDatum } from '@nivo/legends'

interface BarLegendsProps {
    width: number
    height: number
    legends: [BoxLegendSpec, LegendDatum[]][]
    toggleSerie: (id: string | number) => void
}

export const BarLegends = ({ width, height, legends, toggleSerie }: BarLegendsProps) => (
    <>
        {legends.map(([legend, data], i) => (
            <BoxLegendSvg
                key={i}
                {...legend}
                containerWidth={width}
                containerHeight={height}
                data={data}
                toggleSerie={legend.toggleSerie ? toggleSerie : undefined}
            />
        ))}
    </>
)
