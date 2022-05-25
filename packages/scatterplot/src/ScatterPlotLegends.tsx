import { BoxLegendSvg } from '@nivo/legends'
import { ScatterPlotLegendsProps } from './types'

export const ScatterPlotLegends = ({
    width,
    height,
    legends,
    toggleSerie,
}: ScatterPlotLegendsProps) => (
    <>
        {legends.map(([legend, data], i) => (
            <BoxLegendSvg
                key={i}
                {...legend}
                containerWidth={width}
                containerHeight={height}
                data={legend.data ?? data}
                toggleSerie={legend.toggleSerie && toggleSerie}
            />
        ))}
    </>
)
