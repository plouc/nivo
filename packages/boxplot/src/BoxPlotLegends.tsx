import { BoxLegendSvg } from '@nivo/legends'
import { BoxPlotLegendProps, LegendData } from './types'

interface BoxPlotLegendsProps {
    width: number
    height: number
    legends: [BoxPlotLegendProps, LegendData[]][]
}

export const BoxPlotLegends = ({ width, height, legends }: BoxPlotLegendsProps) => (
    <>
        {legends.map(([legend, data], i) => (
            <BoxLegendSvg
                key={i}
                {...legend}
                containerWidth={width}
                containerHeight={height}
                data={legend.data ?? data}
            />
        ))}
    </>
)
