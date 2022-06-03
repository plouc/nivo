import { BoxLegendSvg } from '@nivo/legends'
import { LegendProps } from '@nivo/legends'
import { SwarmPlotLegendData } from './types'

interface SwarmPlotLegendsProps {
    width: number
    height: number
    legends: [LegendProps, SwarmPlotLegendData[]][]
}

export const SwarmPlotLegends = ({ width, height, legends }: SwarmPlotLegendsProps) => (
    <>
        {legends.map(([legend, data], i) => (
            <BoxLegendSvg
                key={i}
                {...legend}
                containerWidth={width}
                containerHeight={height}
                data={data}
            />
        ))}
    </>
)
