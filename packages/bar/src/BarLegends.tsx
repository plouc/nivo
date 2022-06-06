import { BoxLegendSvg, BoxLegendSpec, LegendData } from '@nivo/legends'

interface BarLegendsProps {
    width: number
    height: number
    legends: [BoxLegendSpec, LegendData][]
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
