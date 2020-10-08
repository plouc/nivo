import { BoxLegendSvg } from '@bitbloom/nivo-legends'
import { BarLegendProps, LegendData } from './types'

interface BarLegendsProps {
    width: number
    height: number
    legends: [BarLegendProps, LegendData[]][]
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
                data={legend.data ?? data}
                toggleSerie={
                    legend.toggleSerie && legend.dataFrom === 'keys' ? toggleSerie : undefined
                }
            />
        ))}
    </>
)
