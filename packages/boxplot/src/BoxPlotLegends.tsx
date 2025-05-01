import { BoxLegendSvg, LegendProps } from '@nivo/legends'
import { LegendData } from './types'

interface BoxPlotLegendsProps {
    width: number
    height: number
    legends: [LegendProps, LegendData[]][]
}

export const BoxPlotLegends = ({ width, height, legends }: BoxPlotLegendsProps) => (
    <>
        {legends.map(([legend, data], i) => {
            // Advanced feature:
            // Allow a legend spec to carry its own custom content via 'legend.data'
            // Or fallback on content provided via 'data'
            return (
                <BoxLegendSvg
                    key={i}
                    {...legend}
                    containerWidth={width}
                    containerHeight={height}
                    data={legend.data ?? data}
                />
            )
        })}
    </>
)
